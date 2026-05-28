package com.velqora.platform.inventory.balance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query("""
            select b from InventoryBalance b
            where (:companyId is null or b.company.id = :companyId)
              and b.quantityOnHand <= b.product.minimumStockLevel
            order by b.updatedAt desc
            """)
    List<InventoryBalance> findLowStock(@Param("companyId") UUID companyId);

    @Query("""
            select count(b) from InventoryBalance b
            where (:companyId is null or b.company.id = :companyId)
              and b.quantityOnHand <= b.product.minimumStockLevel
            """)
    long countLowStock(@Param("companyId") UUID companyId);
}