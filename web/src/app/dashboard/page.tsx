import type { Metadata } from 'next'
import { KpiCards } from '@/components/dashboard/KpiCards'
import { ShipmentStatusSummary } from '@/components/dashboard/ShipmentStatusSummary'
import { EquipmentLifecycleSummary } from '@/components/dashboard/EquipmentLifecycleSummary'
import { ShipmentVolumeChart } from '@/components/dashboard/ShipmentVolumeChart'
import { OperationalPerformance } from '@/components/dashboard/OperationalPerformance'
import { OperationalExceptions } from '@/components/dashboard/OperationalExceptions'
import { RecentEquipmentActivity } from '@/components/dashboard/RecentEquipmentActivity'
import { RecentShipments } from '@/components/dashboard/RecentShipments'
import { LowStockItems } from '@/components/dashboard/LowStockItems'
import { WarehouseCapacity } from '@/components/dashboard/WarehouseCapacity'
import { AiMonitoringPreview } from '@/components/dashboard/AiMonitoringPreview'

export const metadata: Metadata = { title: 'Operations Control Tower' }

export default function DashboardPage() {
  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Operations Control Tower</h1>
          <p className="page-subtitle">Real-time overview of logistics, inventory, warehouse, and equipment operations.</p>
        </div>
        <div className="flex gap-2">
          <span className="badge-success badge"><span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /> Live</span>
          <span className="badge-brand badge">Velqora Enterprises</span>
        </div>
      </div>
      <KpiCards />
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <LowStockItems />
        <RecentShipments />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <WarehouseCapacity />
        <AiMonitoringPreview />
      </div>
    </div>
  )
}
