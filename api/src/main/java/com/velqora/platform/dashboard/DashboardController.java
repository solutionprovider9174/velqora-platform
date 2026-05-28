package com.velqora.platform.dashboard;

import com.velqora.platform.dashboard.dto.DashboardOverviewResponse;
import com.velqora.platform.dashboard.dto.LowStockItemResponse;
import com.velqora.platform.dashboard.dto.StatusCountResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/dashboard")
@PreAuthorize("hasAnyRole('SUPER_ADMIN', 'COMPANY_ADMIN', 'BRANCH_MANAGER', 'OPERATIONS_USER')")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/overview")
    public DashboardOverviewResponse overview(
            @RequestParam(required = false) UUID companyId,
            @RequestParam(required = false) UUID branchId
    ) {
        return dashboardService.overview(companyId, branchId);
    }

    @GetMapping("/logistics/status-summary")
    public List<StatusCountResponse> shipmentStatusSummary(
            @RequestParam(required = false) UUID companyId
    ) {
        return dashboardService.shipmentStatusSummary(companyId);
    }

    @GetMapping("/equipment/status-summary")
    public List<StatusCountResponse> equipmentStatusSummary(
            @RequestParam(required = false) UUID companyId
    ) {
        return dashboardService.equipmentStatusSummary(companyId);
    }

    @GetMapping("/inventory/low-stock")
    public List<LowStockItemResponse> lowStock(
            @RequestParam(required = false) UUID companyId,
            @RequestParam(defaultValue = "10") int limit
    ) {
        return dashboardService.lowStock(companyId, limit);
    }
}