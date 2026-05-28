package com.velqora.platform.inventory.movement.dto;

import com.velqora.platform.inventory.enums.StockMovementType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.util.UUID;

public record CreateStockMovementRequest(
        @NotNull(message = "Company ID is required")
        UUID companyId,

        @NotNull(message = "Product ID is required")
        UUID productId,

        UUID sourceWarehouseId,
        UUID destinationWarehouseId,

        @NotNull(message = "Movement type is required")
        StockMovementType movementType,

        @NotNull(message = "Quantity is required")
        @Positive(message = "Quantity must be greater than zero")
        BigDecimal quantity,

        String referenceType,
        String referenceNumber,
        String reason
) {
}