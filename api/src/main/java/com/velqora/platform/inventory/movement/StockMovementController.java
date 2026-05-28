package com.velqora.platform.inventory.movement;

import com.velqora.platform.inventory.movement.dto.CreateStockMovementRequest;
import com.velqora.platform.inventory.movement.dto.StockMovementResponse;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/inventory/stock-movements")
@PreAuthorize("hasAnyRole('SUPER_ADMIN', 'COMPANY_ADMIN', 'BRANCH_MANAGER', 'OPERATIONS_USER')")
public class StockMovementController {

    private final StockMovementService stockMovementService;

    public StockMovementController(StockMovementService stockMovementService) {
        this.stockMovementService = stockMovementService;
    }

    @PostMapping
    public StockMovementResponse create(@Valid @RequestBody CreateStockMovementRequest request) {
        return stockMovementService.create(request);
    }

    @GetMapping
    public List<StockMovementResponse> findAll(
            @RequestParam(required = false) UUID companyId,
            @RequestParam(required = false) UUID productId,
            @RequestParam(required = false) UUID warehouseId
    ) {
        return stockMovementService.findAll(companyId, productId, warehouseId);
    }
}