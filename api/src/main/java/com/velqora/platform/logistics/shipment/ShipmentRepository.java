package com.velqora.platform.logistics.shipment;

import com.velqora.platform.logistics.enums.ShipmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ShipmentRepository extends JpaRepository<Shipment, UUID> {

    boolean existsByShipmentNumber(String shipmentNumber);

    @Query("""
            select s from Shipment s
            where (:companyId is null or s.company.id = :companyId)
              and (:branchId is null or s.branch.id = :branchId)
              and (:status is null or s.status = :status)
            order by s.createdAt desc
            """)
    Page<Shipment> search(
            @Param("companyId") UUID companyId,
            @Param("branchId") UUID branchId,
            @Param("status") ShipmentStatus status,
            Pageable pageable
    );

    @Query("""
            select count(s) from Shipment s
            where (:companyId is null or s.company.id = :companyId)
              and (:branchId is null or s.branch.id = :branchId)
            """)
    long countDashboardShipments(
            @Param("companyId") UUID companyId,
            @Param("branchId") UUID branchId
    );

    @Query("""
            select s.status, count(s) from Shipment s
            where (:companyId is null or s.company.id = :companyId)
            group by s.status
            """)
    List<Object[]> countByStatus(@Param("companyId") UUID companyId);
}