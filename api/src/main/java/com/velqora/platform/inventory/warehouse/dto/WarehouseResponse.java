package com.velqora.platform.inventory.warehouse.dto;

import com.velqora.platform.common.enums.Status;
import com.velqora.platform.inventory.warehouse.Warehouse;

import java.time.LocalDateTime;
import java.util.UUID;

public record WarehouseResponse(
        UUID id,
        UUID companyId,
        String companyName,
        UUID branchId,
        String branchName,
        String name,
        String code,
        String countryCode,
        String city,
        String address,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static WarehouseResponse from(Warehouse warehouse) {
        return new WarehouseResponse(
                warehouse.getId(),
                warehouse.getCompany().getId(),
                warehouse.getCompany().getName(),
                warehouse.getBranch() != null ? warehouse.getBranch().getId() : null,
                warehouse.getBranch() != null ? warehouse.getBranch().getName() : null,
                warehouse.getName(),
                warehouse.getCode(),
                warehouse.getCountryCode(),
                warehouse.getCity(),
                warehouse.getAddress(),
                warehouse.getStatus(),
                warehouse.getCreatedAt(),
                warehouse.getUpdatedAt()
        );
    }
}