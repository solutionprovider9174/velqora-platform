package com.velqora.platform.logistics.shipment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ShipmentEventRepository extends JpaRepository<ShipmentEvent, UUID> {

    List<ShipmentEvent> findByShipmentIdOrderByCreatedAtDesc(UUID shipmentId);
}