package com.velqora.platform.equipment.dto;

import com.velqora.platform.equipment.EquipmentEvent;
import com.velqora.platform.equipment.enums.EquipmentCondition;
import com.velqora.platform.equipment.enums.EquipmentStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record EquipmentEventResponse(
        UUID id,
        EquipmentStatus status,
        EquipmentCondition conditionStatus,
        String eventType,
        String description,
        String location,
        UUID createdBy,
        LocalDateTime createdAt
) {

    public static EquipmentEventResponse from(EquipmentEvent event) {
        return new EquipmentEventResponse(
                event.getId(),
                event.getStatus(),
                event.getConditionStatus(),
                event.getEventType(),
                event.getDescription(),
                event.getLocation(),
                event.getCreatedBy() != null ? event.getCreatedBy().getId() : null,
                event.getCreatedAt()
        );
    }
}