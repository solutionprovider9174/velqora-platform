package com.velqora.platform.inventory.movement;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StockMovementRepository extends JpaRepository<StockMovement, UUID> {

    List<StockMovement> findByCompanyIdOrderByCreatedAtDesc(UUID companyId);

    List<StockMovement> findByProductIdOrderByCreatedAtDesc(UUID productId);

    List<StockMovement> findBySourceWarehouseIdOrDestinationWarehouseIdOrderByCreatedAtDesc(
            UUID sourceWarehouseId,
            UUID destinationWarehouseId
    );
}