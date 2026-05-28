package com.velqora.platform.logistics.shipment.dto;

import com.velqora.platform.logistics.enums.ShipmentStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateShipmentStatusRequest(
        @NotNull(message = "Shipment status is required")
        ShipmentStatus status,

        String description,
        String location
) {
}