package com.velqora.platform.dashboard;

import com.velqora.platform.branch.BranchRepository;
import com.velqora.platform.company.CompanyRepository;
import com.velqora.platform.dashboard.dto.DashboardOverviewResponse;
import com.velqora.platform.dashboard.dto.LowStockItemResponse;
import com.velqora.platform.dashboard.dto.StatusCountResponse;
import com.velqora.platform.equipment.EquipmentAssetRepository;
import com.velqora.platform.inventory.balance.InventoryBalanceRepository;
import com.velqora.platform.inventory.product.ProductRepository;
import com.velqora.platform.inventory.warehouse.WarehouseRepository;
import com.velqora.platform.logistics.shipment.ShipmentRepository;
import com.velqora.platform.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class DashboardService {

    private final CompanyRepository companyRepository;
    private final BranchRepository branchRepository;
    private final UserRepository userRepository;
    private final ShipmentRepository shipmentRepository;
    private final WarehouseRepository warehouseRepository;
    private final ProductRepository productRepository;
    private final InventoryBalanceRepository inventoryBalanceRepository;
    private final EquipmentAssetRepository equipmentAssetRepository;

    public DashboardService(
            CompanyRepository companyRepository,
            BranchRepository branchRepository,
            UserRepository userRepository,
            ShipmentRepository shipmentRepository,
            WarehouseRepository warehouseRepository,
            ProductRepository productRepository,
            InventoryBalanceRepository inventoryBalanceRepository,
            EquipmentAssetRepository equipmentAssetRepository
    ) {
        this.companyRepository = companyRepository;
        this.branchRepository = branchRepository;
        this.userRepository = userRepository;
        this.shipmentRepository = shipmentRepository;
        this.warehouseRepository = warehouseRepository;
        this.productRepository = productRepository;
        this.inventoryBalanceRepository = inventoryBalanceRepository;
        this.equipmentAssetRepository = equipmentAssetRepository;
    }

    @Transactional(readOnly = true)
    public DashboardOverviewResponse overview(UUID companyId, UUID branchId) {
        long companies = companyId == null ? companyRepository.count() : 1;
        long branches = companyId == null ? branchRepository.count() : branchRepository.countByCompanyId(companyId);
        long users = companyId == null ? userRepository.count() : userRepository.countByCompanyId(companyId);
        long shipments = shipmentRepository.countDashboardShipments(companyId, branchId);
        long warehouses = companyId == null ? warehouseRepository.count() : warehouseRepository.countByCompanyId(companyId);
        long products = companyId == null ? productRepository.count() : productRepository.countByCompanyId(companyId);
        long inventoryBalances = companyId == null ? inventoryBalanceRepository.count() : inventoryBalanceRepository.findByCompanyId(companyId).size();
        long lowStockItems = inventoryBalanceRepository.countLowStock(companyId);
        long equipmentAssets = equipmentAssetRepository.countDashboardEquipment(companyId);

        return new DashboardOverviewResponse(
                companies,
                branches,
                users,
                shipments,
                warehouses,
                products,
                inventoryBalances,
                lowStockItems,
                equipmentAssets
        );
    }

    @Transactional(readOnly = true)
    public List<StatusCountResponse> shipmentStatusSummary(UUID companyId) {
        return shipmentRepository.countByStatus(companyId)
                .stream()
                .map(row -> new StatusCountResponse(
                        String.valueOf(row[0]),
                        (Long) row[1]
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<StatusCountResponse> equipmentStatusSummary(UUID companyId) {
        return equipmentAssetRepository.countByStatus(companyId)
                .stream()
                .map(row -> new StatusCountResponse(
                        String.valueOf(row[0]),
                        (Long) row[1]
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<LowStockItemResponse> lowStock(UUID companyId, int limit) {
        return inventoryBalanceRepository.findLowStock(companyId)
                .stream()
                .limit(limit)
                .map(LowStockItemResponse::from)
                .toList();
    }
}