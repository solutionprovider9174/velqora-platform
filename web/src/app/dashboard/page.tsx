import type { Metadata } from 'next'
import {
  KpiCards, ShipmentStatusSummary, EquipmentLifecycleSummary,
  ShipmentVolumeChart, OperationalPerformance, OperationalExceptions,
  RecentEquipmentActivity, RecentShipments, LowStockItems,
  WarehouseCapacity, AiMonitoringPreview
} from '@/components/dashboard'
import {
  RevenueWidget, ProfitWidget, CashFlowWidget, AiRecommendationsWidget,
  CriticalAlertsWidget, DriverPerformanceWidget, FuelConsumptionWidget,
  MaintenanceDueWidget, CustomerSatisfactionWidget, RealTimeMapWidget
} from '@/components/dashboard/widgets'

export const metadata: Metadata = { title: 'Operations Command Center' }

export default function DashboardPage() {
  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Operations Command Center</h1>
          <p className="page-subtitle">Real-time enterprise overview — logistics, warehouse, fleet, finance, equipment, and AI insights.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge-success badge gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"/> Live</span>
          <button className="btn-outline text-xs">Refresh</button>
          <button className="btn-primary text-xs sm:text-sm">+ Quick action</button>
        </div>
      </div>

      <KpiCards />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <RevenueWidget />
        <ProfitWidget />
        <CashFlowWidget />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <CriticalAlertsWidget />
        <AiRecommendationsWidget />
      </div>

      <RealTimeMapWidget />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <DriverPerformanceWidget />
        <FuelConsumptionWidget />
        <MaintenanceDueWidget />
        <CustomerSatisfactionWidget />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <ShipmentStatusSummary />
        <EquipmentLifecycleSummary />
      </div>

      <ShipmentVolumeChart />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <OperationalPerformance />
        <OperationalExceptions />
        <RecentEquipmentActivity />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-2"><RecentShipments /></div>
        <LowStockItems />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <WarehouseCapacity />
        <AiMonitoringPreview />
      </div>
    </div>
  )
}
