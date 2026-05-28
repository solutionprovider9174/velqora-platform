package com.velqora.platform.equipment.dto;

import com.velqora.platform.equipment.enums.EquipmentCondition;
import com.velqora.platform.equipment.enums.EquipmentStatus;

import java.time.LocalDate;
import java.util.UUID;

public record UpdateEquipmentAssetRequest(
        UUID branchId,
        UUID warehouseId,
        UUID productId,

        String serialNumber,
        String equipmentType,
        String manufacturer,
        String modelNumber,
        EquipmentStatus status,
        EquipmentCondition conditionStatus,
        String installLocation,
        LocalDate purchaseDate,
        LocalDate warrantyExpiryDate,
        String notes
) {
}