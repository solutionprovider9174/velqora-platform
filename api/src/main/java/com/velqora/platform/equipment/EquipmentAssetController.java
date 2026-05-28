package com.velqora.platform.equipment;

import com.velqora.platform.equipment.dto.*;
import com.velqora.platform.equipment.enums.EquipmentStatus;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/equipment/assets")
@PreAuthorize("hasAnyRole('SUPER_ADMIN', 'COMPANY_ADMIN', 'BRANCH_MANAGER', 'OPERATIONS_USER')")
public class EquipmentAssetController {

    private final EquipmentAssetService equipmentAssetService;

    public EquipmentAssetController(EquipmentAssetService equipmentAssetService) {
        this.equipmentAssetService = equipmentAssetService;
    }

    @PostMapping
    public EquipmentAssetResponse create(@Valid @RequestBody CreateEquipmentAssetRequest request) {
        return equipmentAssetService.create(request);
    }

    @GetMapping
    public Page<EquipmentAssetResponse> search(
            @RequestParam(required = false) UUID companyId,
            @RequestParam(required = false) UUID warehouseId,
            @RequestParam(required = false) UUID productId,
            @RequestParam(required = false) EquipmentStatus status,
            Pageable pageable
    ) {
        return equipmentAssetService.search(companyId, warehouseId, productId, status, pageable);
    }

    @GetMapping("/{id}")
    public EquipmentAssetResponse findById(@PathVariable UUID id) {
        return equipmentAssetService.findById(id);
    }

    @PatchMapping("/{id}")
    public EquipmentAssetResponse update(
            @PathVariable UUID id,
            @RequestBody UpdateEquipmentAssetRequest request
    ) {
        return equipmentAssetService.update(id, request);
    }

    @PatchMapping("/{id}/status")
    public EquipmentAssetResponse updateStatus(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateEquipmentStatusRequest request
    ) {
        return equipmentAssetService.updateStatus(id, request);
    }

    @GetMapping("/{id}/events")
    public List<EquipmentEventResponse> findEvents(@PathVariable UUID id) {
        return equipmentAssetService.findEvents(id);
    }
}