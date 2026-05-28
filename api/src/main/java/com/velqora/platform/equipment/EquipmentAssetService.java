package com.velqora.platform.equipment;

import com.velqora.platform.branch.Branch;
import com.velqora.platform.branch.BranchService;
import com.velqora.platform.common.exception.BadRequestException;
import com.velqora.platform.common.exception.ResourceNotFoundException;
import com.velqora.platform.company.Company;
import com.velqora.platform.company.CompanyService;
import com.velqora.platform.equipment.dto.*;
import com.velqora.platform.equipment.enums.EquipmentCondition;
import com.velqora.platform.equipment.enums.EquipmentStatus;
import com.velqora.platform.inventory.product.Product;
import com.velqora.platform.inventory.product.ProductService;
import com.velqora.platform.inventory.warehouse.Warehouse;
import com.velqora.platform.inventory.warehouse.WarehouseService;
import com.velqora.platform.security.UserPrincipal;
import com.velqora.platform.user.User;
import com.velqora.platform.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class EquipmentAssetService {

    private final EquipmentAssetRepository equipmentAssetRepository;
    private final EquipmentEventRepository equipmentEventRepository;
    private final CompanyService companyService;
    private final BranchService branchService;
    private final WarehouseService warehouseService;
    private final ProductService productService;
    private final UserService userService;

    public EquipmentAssetService(
            EquipmentAssetRepository equipmentAssetRepository,
            EquipmentEventRepository equipmentEventRepository,
            CompanyService companyService,
            BranchService branchService,
            WarehouseService warehouseService,
            ProductService productService,
            UserService userService
    ) {
        this.equipmentAssetRepository = equipmentAssetRepository;
        this.equipmentEventRepository = equipmentEventRepository;
        this.companyService = companyService;
        this.branchService = branchService;
        this.warehouseService = warehouseService;
        this.productService = productService;
        this.userService = userService;
    }

    @Transactional
    public EquipmentAssetResponse create(CreateEquipmentAssetRequest request) {
        Company company = companyService.getCompany(request.companyId());

        if (equipmentAssetRepository.existsByCompanyIdAndAssetTag(company.getId(), request.assetTag())) {
            throw new BadRequestException("Asset tag already exists for this company");
        }

        if (request.serialNumber() != null &&
                equipmentAssetRepository.existsByCompanyIdAndSerialNumber(company.getId(), request.serialNumber())) {
            throw new BadRequestException("Serial number already exists for this company");
        }

        Branch branch = request.branchId() != null ? branchService.getBranch(request.branchId()) : null;
        Warehouse warehouse = request.warehouseId() != null ? warehouseService.getWarehouse(request.warehouseId()) : null;
        Product product = request.productId() != null ? productService.getProduct(request.productId()) : null;

        validateCompanyRelations(company, branch, warehouse, product);

        User currentUser = getCurrentUser();

        EquipmentAsset asset = new EquipmentAsset();
        asset.setCompany(company);
        asset.setBranch(branch);
        asset.setWarehouse(warehouse);
        asset.setProduct(product);
        asset.setAssetTag(request.assetTag());
        asset.setSerialNumber(request.serialNumber());
        asset.setEquipmentType(request.equipmentType());
        asset.setManufacturer(request.manufacturer());
        asset.setModelNumber(request.modelNumber());
        asset.setStatus(EquipmentStatus.IN_STOCK);
        asset.setConditionStatus(request.conditionStatus() != null ? request.conditionStatus() : EquipmentCondition.GOOD);
        asset.setInstallLocation(request.installLocation());
        asset.setPurchaseDate(request.purchaseDate());
        asset.setWarrantyExpiryDate(request.warrantyExpiryDate());
        asset.setNotes(request.notes());
        asset.setCreatedBy(currentUser);

        EquipmentAsset saved = equipmentAssetRepository.save(asset);

        createEvent(
                saved,
                saved.getStatus(),
                saved.getConditionStatus(),
                "EQUIPMENT_CREATED",
                "Equipment asset created",
                warehouse != null ? warehouse.getName() : null,
                currentUser
        );

        return EquipmentAssetResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public Page<EquipmentAssetResponse> search(
            UUID companyId,
            UUID warehouseId,
            UUID productId,
            EquipmentStatus status,
            Pageable pageable
    ) {
        return equipmentAssetRepository.search(companyId, warehouseId, productId, status, pageable)
                .map(EquipmentAssetResponse::from);
    }

    @Transactional(readOnly = true)
    public EquipmentAssetResponse findById(UUID id) {
        return EquipmentAssetResponse.from(getAsset(id));
    }

    @Transactional
    public EquipmentAssetResponse update(UUID id, UpdateEquipmentAssetRequest request) {
        EquipmentAsset asset = getAsset(id);

        Branch branch = asset.getBranch();
        Warehouse warehouse = asset.getWarehouse();
        Product product = asset.getProduct();

        if (request.branchId() != null) {
            branch = branchService.getBranch(request.branchId());
        }

        if (request.warehouseId() != null) {
            warehouse = warehouseService.getWarehouse(request.warehouseId());
        }

        if (request.productId() != null) {
            product = productService.getProduct(request.productId());
        }

        validateCompanyRelations(asset.getCompany(), branch, warehouse, product);

        if (request.serialNumber() != null && !request.serialNumber().equals(asset.getSerialNumber())) {
            if (equipmentAssetRepository.existsByCompanyIdAndSerialNumber(asset.getCompany().getId(), request.serialNumber())) {
                throw new BadRequestException("Serial number already exists for this company");
            }
            asset.setSerialNumber(request.serialNumber());
        }

        asset.setBranch(branch);
        asset.setWarehouse(warehouse);
        asset.setProduct(product);

        if (request.equipmentType() != null) asset.setEquipmentType(request.equipmentType());
        if (request.manufacturer() != null) asset.setManufacturer(request.manufacturer());
        if (request.modelNumber() != null) asset.setModelNumber(request.modelNumber());
        if (request.status() != null) asset.setStatus(request.status());
        if (request.conditionStatus() != null) asset.setConditionStatus(request.conditionStatus());
        if (request.installLocation() != null) asset.setInstallLocation(request.installLocation());
        if (request.purchaseDate() != null) asset.setPurchaseDate(request.purchaseDate());
        if (request.warrantyExpiryDate() != null) asset.setWarrantyExpiryDate(request.warrantyExpiryDate());
        if (request.notes() != null) asset.setNotes(request.notes());

        EquipmentAsset saved = equipmentAssetRepository.save(asset);

        createEvent(
                saved,
                saved.getStatus(),
                saved.getConditionStatus(),
                "EQUIPMENT_UPDATED",
                "Equipment asset updated",
                saved.getWarehouse() != null ? saved.getWarehouse().getName() : null,
                getCurrentUser()
        );

        return EquipmentAssetResponse.from(saved);
    }

    @Transactional
    public EquipmentAssetResponse updateStatus(UUID id, UpdateEquipmentStatusRequest request) {
        EquipmentAsset asset = getAsset(id);

        asset.setStatus(request.status());

        if (request.conditionStatus() != null) {
            asset.setConditionStatus(request.conditionStatus());
        }

        EquipmentAsset saved = equipmentAssetRepository.save(asset);

        createEvent(
                saved,
                saved.getStatus(),
                saved.getConditionStatus(),
                "STATUS_UPDATED",
                request.description() != null ? request.description() : "Equipment status updated",
                request.location(),
                getCurrentUser()
        );

        return EquipmentAssetResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public List<EquipmentEventResponse> findEvents(UUID assetId) {
        getAsset(assetId);

        return equipmentEventRepository.findByEquipmentAssetIdOrderByCreatedAtDesc(assetId)
                .stream()
                .map(EquipmentEventResponse::from)
                .toList();
    }

    public EquipmentAsset getAsset(UUID id) {
        return equipmentAssetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment asset not found"));
    }

    private void createEvent(
            EquipmentAsset asset,
            EquipmentStatus status,
            EquipmentCondition conditionStatus,
            String eventType,
            String description,
            String location,
            User createdBy
    ) {
        EquipmentEvent event = new EquipmentEvent();
        event.setEquipmentAsset(asset);
        event.setStatus(status);
        event.setConditionStatus(conditionStatus);
        event.setEventType(eventType);
        event.setDescription(description);
        event.setLocation(location);
        event.setCreatedBy(createdBy);

        equipmentEventRepository.save(event);
    }

    private void validateCompanyRelations(
            Company company,
            Branch branch,
            Warehouse warehouse,
            Product product
    ) {
        if (branch != null && !branch.getCompany().getId().equals(company.getId())) {
            throw new BadRequestException("Branch does not belong to selected company");
        }

        if (warehouse != null && !warehouse.getCompany().getId().equals(company.getId())) {
            throw new BadRequestException("Warehouse does not belong to selected company");
        }

        if (product != null && !product.getCompany().getId().equals(company.getId())) {
            throw new BadRequestException("Product does not belong to selected company");
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