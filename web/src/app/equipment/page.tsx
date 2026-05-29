'use client'
import { Plus, MoreVertical, Search } from 'lucide-react'

const ASSETS = [
  { id:'EQ-SOLAR-0124', name:'Solar Panel 400W', serial:'SP-2024-0124', type:'Solar Panel', loc:'Site A · Dubai', status:'Installed', condition:'Good' },
  { id:'EQ-INV-0044', name:'Hybrid Inverter 5kW', serial:'INV-2024-0044', type:'Inverter', loc:'WH-01 Dubai', status:'In Stock', condition:'New' },
  { id:'EQ-BAT-0238', name:'Lithium Battery 48V', serial:'BAT-2024-0238', type:'Battery', loc:'Site B · Riyadh', status:'Installed', condition:'Good' },
  { id:'EQ-INV-0038', name:'Hybrid Inverter 3kW', serial:'INV-2024-0038', type:'Inverter', loc:'Site C · Jeddah', status:'Maintenance', condition:'Needs Inspection' },
  { id:'EQ-HP-0009', name:'Heat Pump 12kW', serial:'HP-2024-0009', type:'Heat Pump', loc:'Site D · Muscat', status:'Installed', condition:'Excellent' },
  { id:'EQ-EV-0021', name:'EV Charger 22kW', serial:'EV-2024-0021', type:'EV Charger', loc:'Site E · Dubai', status:'Inspection Due', condition:'Fair' },
]
const SBADGE: Record<string,string> = { 'Installed':'badge-success','In Stock':'badge-info','Maintenance':'badge-warning','Retired':'badge-gray','Inspection Due':'badge-danger' }

export default function EquipmentPage() {
  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Equipment Assets</h1>
          <p className="page-subtitle">Track asset lifecycle, serial numbers, warehouse location, installations, and condition status.</p>
        </div>
        <button className="btn-primary text-xs sm:text-sm"><Plus size={14} /> Register Asset</button>
      </div>

      <div className="kpi-grid-6">
        {[
          { l:'Total Assets', v:'1,284', c:'text-brand-700 bg-brand-50' },
          { l:'Installed', v:'845', c:'text-success bg-success/10' },
          { l:'In Stock', v:'312', c:'text-info bg-info/10' },
          { l:'Maintenance', v:'67', c:'text-warning bg-warning/10' },
          { l:'Inspection Due', v:'32', c:'text-danger bg-danger/10' },
          { l:'Retired', v:'28', c:'text-slate-700 bg-slate-100' },
        ].map(k => (
          <div key={k.l} className={`rounded-xl p-3 ${k.c}`}>
            <p className="text-base sm:text-lg font-black">{k.v}</p>
            <p className="text-2xs mt-0.5 opacity-80">{k.l}</p>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-border flex gap-3 items-center flex-wrap">
          <div className="flex items-center gap-2 bg-surface-secondary border border-border rounded-btn px-3 py-1.5 flex-1 min-w-0">
            <Search size={13} className="text-text-disabled" />
            <input placeholder="Search by asset ID, serial number, or location..." className="bg-transparent text-sm outline-none w-full placeholder:text-text-disabled" />
          </div>
          <select className="text-xs sm:text-sm border border-border rounded-btn px-2 py-1.5 bg-white"><option>All Types</option><option>Solar Panel</option><option>Inverter</option><option>Battery</option><option>Heat Pump</option><option>EV Charger</option></select>
          <select className="text-xs sm:text-sm border border-border rounded-btn px-2 py-1.5 bg-white"><option>All Statuses</option></select>
        </div>
        <div className="overflow-x-auto">
          <table className="table-base min-w-[720px]">
            <thead><tr>
              <th className="table-th">Asset ID</th>
              <th className="table-th">Name</th>
              <th className="table-th hidden sm:table-cell">Serial Number</th>
              <th className="table-th hidden md:table-cell">Type</th>
              <th className="table-th hidden lg:table-cell">Location</th>
              <th className="table-th">Status</th>
              <th className="table-th hidden xl:table-cell">Condition</th>
              <th className="table-th"></th>
            </tr></thead>
            <tbody>
              {ASSETS.map(a => (
                <tr key={a.id} className="table-row">
                  <td className="table-td font-semibold text-brand-700 text-xs sm:text-sm">{a.id}</td>
                  <td className="table-td text-text-primary">{a.name}</td>
                  <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{a.serial}</td>
                  <td className="table-td text-text-secondary text-xs hidden md:table-cell">{a.type}</td>
                  <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{a.loc}</td>
                  <td className="table-td"><span className={`${SBADGE[a.status]} badge`}><span className="w-1.5 h-1.5 rounded-full bg-current" />{a.status}</span></td>
                  <td className="table-td text-text-secondary text-xs hidden xl:table-cell">{a.condition}</td>
                  <td className="table-td"><button className="text-text-disabled hover:text-brand-600"><MoreVertical size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
