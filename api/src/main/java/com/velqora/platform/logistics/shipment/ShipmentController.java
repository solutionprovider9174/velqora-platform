package com.velqora.platform.logistics.shipment;

import com.velqora.platform.logistics.enums.ShipmentStatus;
import com.velqora.platform.logistics.shipment.dto.*;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/logistics/shipments")
@PreAuthorize("hasAnyRole('SUPER_ADMIN', 'COMPANY_ADMIN', 'BRANCH_MANAGER', 'OPERATIONS_USER')")
public class ShipmentController {

    private final ShipmentService shipmentService;

    public ShipmentController(ShipmentService shipmentService) {
        this.shipmentService = shipmentService;
    }

    @PostMapping
    public ShipmentResponse create(@Valid @RequestBody CreateShipmentRequest request) {
        return shipmentService.create(request);
    }

    @GetMapping
    public Page<ShipmentResponse> search(
            @RequestParam(required = false) UUID companyId,
            @RequestParam(required = false) UUID branchId,
            @RequestParam(required = false) ShipmentStatus status,
            Pageable pageable
    ) {
        return shipmentService.search(companyId, branchId, status, pageable);
    }

    @GetMapping("/{id}")
    public ShipmentResponse findById(@PathVariable UUID id) {
        return shipmentService.findById(id);
    }

    @PatchMapping("/{id}")
    public ShipmentResponse update(
            @PathVariable UUID id,
            @RequestBody UpdateShipmentRequest request
    ) {
        return shipmentService.update(id, request);
    }

    @PatchMapping("/{id}/status")
    public ShipmentResponse updateStatus(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateShipmentStatusRequest request
    ) {
        return shipmentService.updateStatus(id, request);
    }

    @GetMapping("/{id}/events")
    public List<ShipmentEventResponse> findEvents(@PathVariable UUID id) {
        return shipmentService.findEvents(id);
    }
}