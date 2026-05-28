package com.velqora.platform.inventory.warehouse.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CreateWarehouseRequest(
        @NotNull(message = "Company ID is required")
        UUID companyId,

        UUID branchId,

        @NotBlank(message = "Warehouse name is required")
        String name,

        @NotBlank(message = "Warehouse code is required")
        String code,

        String countryCode,
        String city,
        String address
) {
}