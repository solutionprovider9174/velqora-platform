import { BarChart2 } from 'lucide-react'

const REPORTS = [
  { icon:'📦', t:'Shipment Summary', d:'Delivery status, delayed shipments, shipment volume, and operational exceptions.', status:'active' },
  { icon:'🔄', t:'Inventory Movement Report', d:'Inbound, outbound, transfer, and adjustment movement history.', status:'active' },
  { icon:'⚠️', t:'Low Stock Report', d:'Products below minimum stock level and reorder thresholds.', status:'active' },
  { icon:'🏭', t:'Warehouse Capacity Report', d:'Warehouse stock levels, capacity usage, and location-based inventory visibility.', status:'active' },
  { icon:'🔧', t:'Equipment Asset Report', d:'Asset lifecycle status, serial numbers, warehouse location, and condition tracking.', status:'active' },
  { icon:'📊', t:'Operational Dashboard Summary', d:'Platform-wide summary of companies, branches, users, shipments, inventory, and equipment.', status:'active' },
  { icon:'🚛', t:'Fleet Utilization', d:'Vehicle usage, fuel consumption, and mileage analytics.', status:'roadmap' },
  { icon:'💰', t:'Finance Summary', d:'Invoices, payments, outstanding balances, multi-currency.', status:'roadmap' },
  { icon:'🤖', t:'AI Forecast Report', d:'Demand predictions and anomaly log.', status:'preview' },
]
const SB: Record<string,string> = { active:'badge-success', preview:'badge-warning', roadmap:'badge-gray' }
const SL: Record<string,string> = { active:'Active', preview:'Preview', roadmap:'Future' }

export default function ReportsPage() {
  return (
    <div className="responsive-page">
      <div>
        <h1 className="page-title">Reports</h1>
        <p className="page-subtitle">Generate operational reports for shipments, inventory, warehouses, equipment, and platform activity.</p>
      </div>

      <div className="card p-3 sm:p-4 flex flex-wrap gap-2 items-center">
        <span className="text-xs font-bold text-text-secondary">Filters:</span>
        <select className="text-xs sm:text-sm border border-border rounded-btn px-2 py-1.5 bg-white"><option>All Companies</option></select>
        <select className="text-xs sm:text-sm border border-border rounded-btn px-2 py-1.5 bg-white"><option>All Branches</option></select>
        <select className="text-xs sm:text-sm border border-border rounded-btn px-2 py-1.5 bg-white"><option>Last 30 days</option><option>Last 90 days</option><option>This year</option><option>Custom</option></select>
        <select className="text-xs sm:text-sm border border-border rounded-btn px-2 py-1.5 bg-white"><option>CSV</option><option>Excel</option><option>PDF</option></select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {REPORTS.map(r => (
          <div key={r.t} className="card-hover p-4 sm:p-5 group">
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{r.icon}</span>
              <span className={`${SB[r.status]} badge`}>{SL[r.status]}</span>
            </div>
            <h3 className="text-sm font-bold text-text-primary group-hover:text-brand-700 transition-colors">{r.t}</h3>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">{r.d}</p>
            <button className="mt-3 text-xs text-brand-600 font-semibold hover:underline flex items-center gap-1">
              <BarChart2 size={12} /> Generate Report →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
