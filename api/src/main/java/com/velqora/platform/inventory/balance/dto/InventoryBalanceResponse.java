package com.velqora.platform.inventory.balance.dto;

import com.velqora.platform.inventory.balance.InventoryBalance;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record InventoryBalanceResponse(
        UUID id,
        UUID companyId,
        String companyName,
        UUID warehouseId,
        String warehouseName,
        UUID productId,
        String sku,
        String productName,
        BigDecimal quantityOnHand,
        BigDecimal reservedQuantity,
        BigDecimal availableQuantity,
        BigDecimal minimumStockLevel,
        boolean lowStock,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static InventoryBalanceResponse from(InventoryBalance balance) {
        BigDecimal available = balance.getQuantityOnHand().subtract(balance.getReservedQuantity());
        boolean lowStock = balance.getQuantityOnHand()
                .compareTo(balance.getProduct().getMinimumStockLevel()) <= 0;

        return new InventoryBalanceResponse(
                balance.getId(),
                balance.getCompany().getId(),
                balance.getCompany().getName(),
                balance.getWarehouse().getId(),
                balance.getWarehouse().getName(),
                balance.getProduct().getId(),
                balance.getProduct().getSku(),
                balance.getProduct().getName(),
                balance.getQuantityOnHand(),
                balance.getReservedQuantity(),
                available,
                balance.getProduct().getMinimumStockLevel(),
                lowStock,
                balance.getCreatedAt(),
                balance.getUpdatedAt()
        );
    }
}