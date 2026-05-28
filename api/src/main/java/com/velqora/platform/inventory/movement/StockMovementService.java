package com.velqora.platform.inventory.movement;

import com.velqora.platform.common.exception.BadRequestException;
import com.velqora.platform.common.exception.ResourceNotFoundException;
import com.velqora.platform.company.Company;
import com.velqora.platform.company.CompanyService;
import com.velqora.platform.inventory.balance.InventoryBalance;
import com.velqora.platform.inventory.balance.InventoryBalanceRepository;
import com.velqora.platform.inventory.enums.StockMovementType;
import com.velqora.platform.inventory.movement.dto.CreateStockMovementRequest;
import com.velqora.platform.inventory.movement.dto.StockMovementResponse;
import com.velqora.platform.inventory.product.Product;
import com.velqora.platform.inventory.product.ProductService;
import com.velqora.platform.inventory.warehouse.Warehouse;
import com.velqora.platform.inventory.warehouse.WarehouseService;
import com.velqora.platform.security.UserPrincipal;
import com.velqora.platform.user.User;
import com.velqora.platform.user.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class StockMovementService {

    private final StockMovementRepository stockMovementRepository;
    private final InventoryBalanceRepository inventoryBalanceRepository;
    private final CompanyService companyService;
    private final ProductService productService;
    private final WarehouseService warehouseService;
    private final UserService userService;

    public StockMovementService(
            StockMovementRepository stockMovementRepository,
            InventoryBalanceRepository inventoryBalanceRepository,
            CompanyService companyService,
            ProductService productService,
            WarehouseService warehouseService,
            UserService userService
    ) {
        this.stockMovementRepository = stockMovementRepository;
        this.inventoryBalanceRepository = inventoryBalanceRepository;
        this.companyService = companyService;
        this.productService = productService;
        this.warehouseService = warehouseService;
        this.userService = userService;
    }

    @Transactional
    public StockMovementResponse create(CreateStockMovementRequest request) {
        Company company = companyService.getCompany(request.companyId());
        Product product = productService.getProduct(request.productId());

        if (!product.getCompany().getId().equals(company.getId())) {
            throw new BadRequestException("Product does not belong to selected company");
        }

        Warehouse sourceWarehouse = request.sourceWarehouseId() != null
                ? warehouseService.getWarehouse(request.sourceWarehouseId())
                : null;

        Warehouse destinationWarehouse = request.destinationWarehouseId() != null
                ? warehouseService.getWarehouse(request.destinationWarehouseId())
                : null;

        validateWarehouses(company, sourceWarehouse, destinationWarehouse);
        applyMovement(company, product, sourceWarehouse, destinationWarehouse, request.movementType(), request.quantity());

        StockMovement movement = new StockMovement();
        movement.setCompany(company);
        movement.setProduct(product);
        movement.setSourceWarehouse(sourceWarehouse);
        movement.setDestinationWarehouse(destinationWarehouse);
        movement.setMovementType(request.movementType());
        movement.setQuantity(request.quantity());
        movement.setReferenceType(request.referenceType());
        movement.setReferenceNumber(request.referenceNumber());
        movement.setReason(request.reason());
        movement.setCreatedBy(getCurrentUser());

        return StockMovementResponse.from(stockMovementRepository.save(movement));
    }

    @Transactional(readOnly = true)
    public List<StockMovementResponse> findAll(UUID companyId, UUID productId, UUID warehouseId) {
        List<StockMovement> movements;

        if (productId != null) {
            movements = stockMovementRepository.findByProductIdOrderByCreatedAtDesc(productId);
        } else if (warehouseId != null) {
            movements = stockMovementRepository
                    .findBySourceWarehouseIdOrDestinationWarehouseIdOrderByCreatedAtDesc(warehouseId, warehouseId);
        } else if (companyId != null) {
            movements = stockMovementRepository.findByCompanyIdOrderByCreatedAtDesc(companyId);
        } else {
            movements = stockMovementRepository.findAll();
        }

        return movements.stream()
                .map(StockMovementResponse::from)
                .toList();
    }

    private void applyMovement(
            Company company,
            Product product,
            Warehouse sourceWarehouse,
            Warehouse destinationWarehouse,
            StockMovementType movementType,
            BigDecimal quantity
    ) {
        switch (movementType) {
            case INBOUND -> {
                if (destinationWarehouse == null) {
                    throw new BadRequestException("Destination warehouse is required for inbound movement");
                }
                increaseBalance(company, destinationWarehouse, product, quantity);
            }
            case OUTBOUND -> {
                if (sourceWarehouse == null) {
                    throw new BadRequestException("Source warehouse is required for outbound movement");
                }
                decreaseBalance(company, sourceWarehouse, product, quantity);
            }
            case TRANSFER -> {
                if (sourceWarehouse == null || destinationWarehouse == null) {
                    throw new BadRequestException("Source and destination warehouses are required for transfer");
                }
                if (sourceWarehouse.getId().equals(destinationWarehouse.getId())) {
                    throw new BadRequestException("Source and destination warehouses cannot be the same");
                }
                decreaseBalance(company, sourceWarehouse, product, quantity);
                increaseBalance(company, destinationWarehouse, product, quantity);
            }
            case ADJUSTMENT -> {
                if (destinationWarehouse == null) {
                    throw new BadRequestException("Destination warehouse is required for adjustment");
                }
                increaseBalance(company, destinationWarehouse, product, quantity);
            }
        }
    }

    private void increaseBalance(
            Company company,
            Warehouse warehouse,
            Product product,
            BigDecimal quantity
    ) {
        InventoryBalance balance = getOrCreateBalance(company, warehouse, product);
        balance.setQuantityOnHand(balance.getQuantityOnHand().add(quantity));
        inventoryBalanceRepository.save(balance);
    }

    private void decreaseBalance(
            Company company,
            Warehouse warehouse,
            Product product,
            BigDecimal quantity
    ) {
        InventoryBalance balance = getOrCreateBalance(company, warehouse, product);

        if (balance.getQuantityOnHand().compareTo(quantity) < 0) {
            throw new BadRequestException("Insufficient stock quantity");
        }

        balance.setQuantityOnHand(balance.getQuantityOnHand().subtract(quantity));
        inventoryBalanceRepository.save(balance);
    }

    private InventoryBalance getOrCreateBalance(
            Company company,
            Warehouse warehouse,
            Product product
    ) {
        return inventoryBalanceRepository
                .findByCompanyIdAndWarehouseIdAndProductId(
                        company.getId(),
                        warehouse.getId(),
                        product.getId()
                )
                .orElseGet(() -> {
                    InventoryBalance balance = new InventoryBalance();
                    balance.setCompany(company);
                    balance.setWarehouse(warehouse);
                    balance.setProduct(product);
                    balance.setQuantityOnHand(BigDecimal.ZERO);
                    balance.setReservedQuantity(BigDecimal.ZERO);
                    return inventoryBalanceRepository.save(balance);
                });
    }

    private void validateWarehouses(
            Company company,
            Warehouse sourceWarehouse,
            Warehouse destinationWarehouse
    ) {
        if (sourceWarehouse != null && !sourceWarehouse.getCompany().getId().equals(company.getId())) {
            throw new BadRequestException("Source warehouse does not belong to selected company");
        }

        if (destinationWarehouse != null && !destinationWarehouse.getCompany().getId().equals(company.getId())) {
            throw new BadRequestException("Destination warehouse does not belong to selected company");
        }
    }

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserPrincipal userPrincipal) {
            return userService.getUser(userPrincipal.getId());
        }

        return null;
    }
}