package com.velqora.platform.dashboard.dto;

import com.velqora.platform.inventory.balance.InventoryBalance;

import java.math.BigDecimal;
import java.util.UUID;

public record LowStockItemResponse(
        UUID inventoryBalanceId,
        UUID companyId,
        String companyName,
        UUID warehouseId,
        String warehouseName,
        UUID productId,
        String sku,
        String productName,
        BigDecimal quantityOnHand,
        BigDecimal minimumStockLevel,
        BigDecimal reorderLevel
) {

    public static LowStockItemResponse from(InventoryBalance balance) {
        return new LowStockItemResponse(
                balance.getId(),
                balance.getCompany().getId(),
                balance.getCompany().getName(),
                balance.getWarehouse().getId(),
                balance.getWarehouse().getName(),
                balance.getProduct().getId(),
                balance.getProduct().getSku(),
                balance.getProduct().getName(),
                balance.getQuantityOnHand(),
                balance.getProduct().getMinimumStockLevel(),
                balance.getProduct().getReorderLevel()
        );
    }
}