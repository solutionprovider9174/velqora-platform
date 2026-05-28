package com.velqora.platform.dashboard.dto;

public record DashboardOverviewResponse(
        long companies,
        long branches,
        long users,
        long shipments,
        long warehouses,
        long products,
        long inventoryBalances,
        long lowStockItems,
        long equipmentAssets
) {
}