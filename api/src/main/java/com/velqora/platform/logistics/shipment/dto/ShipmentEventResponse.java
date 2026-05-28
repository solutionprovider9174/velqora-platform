package com.velqora.platform.logistics.shipment.dto;

import com.velqora.platform.logistics.enums.ShipmentStatus;
import com.velqora.platform.logistics.shipment.ShipmentEvent;

import java.time.LocalDateTime;
import java.util.UUID;

public record ShipmentEventResponse(
        UUID id,
        ShipmentStatus status,
        String eventType,
        String description,
        String location,
        UUID createdBy,
        LocalDateTime createdAt
) {

    public static ShipmentEventResponse from(ShipmentEvent event) {
        return new ShipmentEventResponse(
                event.getId(),
                event.getStatus(),
                event.getEventType(),
                event.getDescription(),
                event.getLocation(),
                event.getCreatedBy() != null ? event.getCreatedBy().getId() : null,
                event.getCreatedAt()
        );
    }
}