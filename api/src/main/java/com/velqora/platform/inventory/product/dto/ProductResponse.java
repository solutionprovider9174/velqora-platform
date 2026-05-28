package com.velqora.platform.inventory.product.dto;

import com.velqora.platform.common.enums.Status;
import com.velqora.platform.inventory.product.Product;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record ProductResponse(
        UUID id,
        UUID companyId,
        String companyName,
        String sku,
        String name,
        String description,
        String category,
        String unitOfMeasure,
        BigDecimal minimumStockLevel,
        BigDecimal reorderLevel,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static ProductResponse from(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getCompany().getId(),
                product.getCompany().getName(),
                product.getSku(),
                product.getName(),
                product.getDescription(),
                product.getCategory(),
                product.getUnitOfMeasure(),
                product.getMinimumStockLevel(),
                product.getReorderLevel(),
                product.getStatus(),
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }
}