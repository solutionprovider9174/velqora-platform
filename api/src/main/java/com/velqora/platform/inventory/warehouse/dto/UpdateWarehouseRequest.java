package com.velqora.platform.inventory.warehouse.dto;

import com.velqora.platform.common.enums.Status;

import java.util.UUID;

public record UpdateWarehouseRequest(
        UUID branchId,
        String name,
        String code,
        String countryCode,
        String city,
        String address,
        Status status
) {
}