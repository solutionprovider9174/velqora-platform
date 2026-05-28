package com.velqora.platform.equipment.dto;

import com.velqora.platform.equipment.enums.EquipmentCondition;
import com.velqora.platform.equipment.enums.EquipmentStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateEquipmentStatusRequest(
        @NotNull(message = "Equipment status is required")
        EquipmentStatus status,

        EquipmentCondition conditionStatus,
        String description,
        String location
) {
}