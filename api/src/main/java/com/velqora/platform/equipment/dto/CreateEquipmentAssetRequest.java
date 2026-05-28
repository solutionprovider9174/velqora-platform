package com.velqora.platform.equipment.dto;

import com.velqora.platform.equipment.enums.EquipmentCondition;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record CreateEquipmentAssetRequest(
        @NotNull(message = "Company ID is required")
        UUID companyId,

        UUID branchId,
        UUID warehouseId,
        UUID productId,

        @NotBlank(message = "Asset tag is required")
        String assetTag,

        String serialNumber,
        String equipmentType,
        String manufacturer,
        String modelNumber,
        EquipmentCondition conditionStatus,
        String installLocation,
        LocalDate purchaseDate,
        LocalDate warrantyExpiryDate,
        String notes
) {
}