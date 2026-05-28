package com.velqora.platform.logistics.shipment.dto;

import com.velqora.platform.logistics.enums.ShipmentPriority;
import com.velqora.platform.logistics.enums.ShipmentStatus;
import com.velqora.platform.logistics.shipment.Shipment;

import java.time.LocalDateTime;
import java.util.UUID;

public record ShipmentResponse(
        UUID id,
        UUID companyId,
        String companyName,
        UUID branchId,
        String branchName,
        String shipmentNumber,
        String customerName,
        String customerReference,
        String originAddress,
        String destinationAddress,
        String destinationCity,
        String destinationCountryCode,
        ShipmentStatus status,
        ShipmentPriority priority,
        String carrierName,
        String trackingReference,
        LocalDateTime plannedDispatchDate,
        LocalDateTime plannedDeliveryDate,
        LocalDateTime actualDeliveryDate,
        String notes,
        UUID createdBy,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static ShipmentResponse from(Shipment shipment) {
        return new ShipmentResponse(
                shipment.getId(),
                shipment.getCompany().getId(),
                shipment.getCompany().getName(),
                shipment.getBranch() != null ? shipment.getBranch().getId() : null,
                shipment.getBranch() != null ? shipment.getBranch().getName() : null,
                shipment.getShipmentNumber(),
                shipment.getCustomerName(),
                shipment.getCustomerReference(),
                shipment.getOriginAddress(),
                shipment.getDestinationAddress(),
                shipment.getDestinationCity(),
                shipment.getDestinationCountryCode(),
                shipment.getStatus(),
                shipment.getPriority(),
                shipment.getCarrierName(),
                shipment.getTrackingReference(),
                shipment.getPlannedDispatchDate(),
                shipment.getPlannedDeliveryDate(),
                shipment.getActualDeliveryDate(),
                shipment.getNotes(),
                shipment.getCreatedBy() != null ? shipment.getCreatedBy().getId() : null,
                shipment.getCreatedAt(),
                shipment.getUpdatedAt()
        );
    }
}