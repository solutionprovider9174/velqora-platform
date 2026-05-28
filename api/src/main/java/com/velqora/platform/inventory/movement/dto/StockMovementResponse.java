package com.velqora.platform.inventory.movement.dto;

import com.velqora.platform.inventory.enums.StockMovementType;
import com.velqora.platform.inventory.movement.StockMovement;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record StockMovementResponse(
        UUID id,
        UUID companyId,
        String companyName,
        UUID productId,
        String sku,
        String productName,
        UUID sourceWarehouseId,
        String sourceWarehouseName,
        UUID destinationWarehouseId,
        String destinationWarehouseName,
        StockMovementType movementType,
        BigDecimal quantity,
        String referenceType,
        String referenceNumber,
        String reason,
        UUID createdBy,
        LocalDateTime createdAt
) {

    public static StockMovementResponse from(StockMovement movement) {
        return new StockMovementResponse(
                movement.getId(),
                movement.getCompany().getId(),
                movement.getCompany().getName(),
                movement.getProduct().getId(),
                movement.getProduct().getSku(),
                movement.getProduct().getName(),
                movement.getSourceWarehouse() != null ? movement.getSourceWarehouse().getId() : null,
                movement.getSourceWarehouse() != null ? movement.getSourceWarehouse().getName() : null,
                movement.getDestinationWarehouse() != null ? movement.getDestinationWarehouse().getId() : null,
                movement.getDestinationWarehouse() != null ? movement.getDestinationWarehouse().getName() : null,
                movement.getMovementType(),
                movement.getQuantity(),
                movement.getReferenceType(),
                movement.getReferenceNumber(),
                movement.getReason(),
                movement.getCreatedBy() != null ? movement.getCreatedBy().getId() : null,
                movement.getCreatedAt()
        );
    }
}