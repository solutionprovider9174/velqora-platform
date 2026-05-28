package com.velqora.platform.equipment;

import com.velqora.platform.equipment.enums.EquipmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface EquipmentAssetRepository extends JpaRepository<EquipmentAsset, UUID> {

    boolean existsByCompanyIdAndAssetTag(UUID companyId, String assetTag);

    boolean existsByCompanyIdAndSerialNumber(UUID companyId, String serialNumber);

    @Query("""
            select e from EquipmentAsset e
            where (:companyId is null or e.company.id = :companyId)
              and (:warehouseId is null or e.warehouse.id = :warehouseId)
              and (:productId is null or e.product.id = :productId)
              and (:status is null or e.status = :status)
            order by e.createdAt desc
            """)
    Page<EquipmentAsset> search(
            @Param("companyId") UUID companyId,
            @Param("warehouseId") UUID warehouseId,
            @Param("productId") UUID productId,
            @Param("status") EquipmentStatus status,
            Pageable pageable
    );

    @Query("""
            select count(e) from EquipmentAsset e
            where (:companyId is null or e.company.id = :companyId)
            """)
    long countDashboardEquipment(@Param("companyId") UUID companyId);

    @Query("""
            select e.status, count(e) from EquipmentAsset e
            where (:companyId is null or e.company.id = :companyId)
            group by e.status
            """)
    List<Object[]> countByStatus(@Param("companyId") UUID companyId);
}