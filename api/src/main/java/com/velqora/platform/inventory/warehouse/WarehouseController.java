package com.velqora.platform.inventory.warehouse;

import com.velqora.platform.inventory.warehouse.dto.CreateWarehouseRequest;
import com.velqora.platform.inventory.warehouse.dto.UpdateWarehouseRequest;
import com.velqora.platform.inventory.warehouse.dto.WarehouseResponse;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/inventory/warehouses")
@PreAuthorize("hasAnyRole('SUPER_ADMIN', 'COMPANY_ADMIN', 'BRANCH_MANAGER', 'OPERATIONS_USER')")
public class WarehouseController {

    private final WarehouseService warehouseService;

    public WarehouseController(WarehouseService warehouseService) {
        this.warehouseService = warehouseService;
    }

    @PostMapping
    public WarehouseResponse create(@Valid @RequestBody CreateWarehouseRequest request) {
        return warehouseService.create(request);
    }

    @GetMapping
    public List<WarehouseResponse> findAll(@RequestParam(required = false) UUID companyId) {
        return warehouseService.findAll(companyId);
    }

    @GetMapping("/{id}")
    public WarehouseResponse findById(@PathVariable UUID id) {
        return warehouseService.findById(id);
    }

    @PatchMapping("/{id}")
    public WarehouseResponse update(
            @PathVariable UUID id,
            @RequestBody UpdateWarehouseRequest request
    ) {
        return warehouseService.update(id, request);
    }
}