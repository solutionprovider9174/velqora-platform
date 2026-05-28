package com.velqora.platform.inventory.balance;

import com.velqora.platform.inventory.balance.dto.InventoryBalanceResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/inventory/balances")
@PreAuthorize("hasAnyRole('SUPER_ADMIN', 'COMPANY_ADMIN', 'BRANCH_MANAGER', 'OPERATIONS_USER')")
public class InventoryBalanceController {

    private final InventoryBalanceService inventoryBalanceService;

    public InventoryBalanceController(InventoryBalanceService inventoryBalanceService) {
        this.inventoryBalanceService = inventoryBalanceService;
    }

    @GetMapping
    public List<InventoryBalanceResponse> findAll(
            @RequestParam(required = false) UUID companyId,
            @RequestParam(required = false) UUID warehouseId
    ) {
        return inventoryBalanceService.findAll(companyId, warehouseId);
    }
}