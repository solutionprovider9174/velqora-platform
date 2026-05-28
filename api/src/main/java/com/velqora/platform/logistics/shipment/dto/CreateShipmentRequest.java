package com.velqora.platform.logistics.shipment.dto;

import com.velqora.platform.logistics.enums.ShipmentPriority;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.UUID;

public record CreateShipmentRequest(
        @NotNull(message = "Company ID is required")
        UUID companyId,

        UUID branchId,

        String customerName,
        String customerReference,

        String originAddress,
        String destinationAddress,
        String destinationCity,
        String destinationCountryCode,

        ShipmentPriority priority,

        String carrierName,
        String trackingReference,

        LocalDateTime plannedDispatchDate,
        LocalDateTime plannedDeliveryDate,

        String notes
) {
}