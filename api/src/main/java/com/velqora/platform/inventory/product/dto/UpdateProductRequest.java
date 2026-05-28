package com.velqora.platform.inventory.product.dto;

import com.velqora.platform.common.enums.Status;

import java.math.BigDecimal;

public record UpdateProductRequest(
        String name,
        String description,
        String category,
        String unitOfMeasure,
        BigDecimal minimumStockLevel,
        BigDecimal reorderLevel,
        Status status
) {
}