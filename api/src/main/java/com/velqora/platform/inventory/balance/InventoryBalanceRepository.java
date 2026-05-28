package com.velqora.platform.inventory.balance;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InventoryBalanceRepository extends JpaRepository<InventoryBalance, UUID> {

    List<InventoryBalance> findByCompanyId(UUID companyId);

    List<InventoryBalance> findByWarehouseId(UUID warehouseId);

    Optional<InventoryBalance> findByCompanyIdAndWarehouseIdAndProductId(
            UUID companyId,
            UUID warehouseId,
            UUID productId
    );
}