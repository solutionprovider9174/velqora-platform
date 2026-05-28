package com.velqora.platform.inventory.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.UUID;

public record CreateProductRequest(
        @NotNull(message = "Company ID is required")
        UUID companyId,

        @NotBlank(message = "SKU is required")
        String sku,

        @NotBlank(message = "Product name is required")
        String name,

        String description,
        String category,
        String unitOfMeasure,
        BigDecimal minimumStockLevel,
        BigDecimal reorderLevel
) {
}