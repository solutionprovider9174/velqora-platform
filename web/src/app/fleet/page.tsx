import { Plus, Search, MoreVertical } from 'lucide-react'

const VEHS = [
  { id:'VH-TRK-014', type:'Truck', make:'Volvo FH16', driver:'M. Al-Rashid', route:'Dubai → Riyadh', fuel:82, status:'On Route', speed:'94 km/h' },
  { id:'VH-TRK-007', type:'Truck', make:'Scania R500', driver:'Unassigned', route:'Idle — Jeddah', fuel:65, status:'Idle', speed:'—' },
  { id:'VH-TRK-022', type:'Truck', make:'MAN TGX', driver:'K. Mansoor', route:'Abu Dhabi → Kuwait', fuel:21, status:'Fuel Alert', speed:'87 km/h' },
  { id:'VH-VAN-003', type:'Van', make:'Mercedes Sprinter', driver:'S. Al-Farsi', route:'Last-mile Riyadh', fuel:67, status:'On Route', speed:'62 km/h' },
]
const SB: Record<string,string> = { 'Available':'badge-success','On Route':'badge-info','Idle':'badge-gray','Maintenance':'badge-warning','Offline':'badge-danger','Fuel Alert':'badge-danger' }

export default function FleetPage() {
  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2">Fleet Monitoring <span className="badge bg-slate-100 text-slate-600 border border-slate-200">Roadmap</span></h1>
          <p className="page-subtitle">Monitor vehicle availability, route status, fuel levels, and maintenance readiness.</p>
        </div>
        <button className="btn-primary text-xs sm:text-sm"><Plus size={14} /> Add Vehicle</button>
      </div>

      <div className="kpi-grid-4">
        {[
          { l:'Active Vehicles', v:'38 / 42', c:'text-brand-700 bg-brand-50' },
          { l:'Vehicles On Route', v:'24', c:'text-info bg-info/10' },
          { l:'Average Fuel Level', v:'64%', c:'text-warning bg-warning/10' },
          { l:'Maintenance Due', v:'3', c:'text-danger bg-danger/10' },
        ].map(k => (
          <div key={k.l} className={`rounded-xl p-3 sm:p-4 ${k.c}`}>
            <p className="text-xl sm:text-2xl font-black">{k.v}</p>
            <p className="text-xs mt-0.5 opacity-80">{k.l}</p>
          </div>
        ))}
      </div>

      <div className="card p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-text-primary">Live Fleet Map</h3>
          <span className="badge-info badge">Future Integration</span>
        </div>
        <div className="bg-surface-secondary rounded-xl h-40 sm:h-52 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border">
          <span className="text-5xl">🗺️</span>
          <p className="text-sm text-text-secondary text-center px-4">GPS and route tracking will be connected once fleet telemetry or map provider integration is enabled.</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-border flex gap-3 items-center flex-wrap">
          <span className="text-sm font-bold text-text-primary">Fleet Vehicles</span>
          <div className="flex items-center gap-2 bg-surface-secondary border border-border rounded-btn px-3 py-1.5 flex-1 min-w-0">
            <Search size={13} className="text-text-disabled" />
            <input placeholder="Search by vehicle ID, model, driver, route, or status..." className="bg-transparent text-sm outline-none w-full placeholder:text-text-disabled" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-base min-w-[720px]">
            <thead><tr>
              <th className="table-th">Vehicle ID</th>
              <th className="table-th hidden sm:table-cell">Type</th>
              <th className="table-th">Make & Model</th>
              <th className="table-th hidden md:table-cell">Driver</th>
              <th className="table-th hidden lg:table-cell">Route</th>
              <th className="table-th">Fuel</th>
              <th className="table-th hidden xl:table-cell">Speed</th>
              <th className="table-th">Status</th>
              <th className="table-th"></th>
            </tr></thead>
            <tbody>
              {VEHS.map(v => (
                <tr key={v.id} className="table-row">
                  <td className="table-td font-semibold text-brand-700 text-xs sm:text-sm">{v.id}</td>
                  <td className="table-td text-xs hidden sm:table-cell">{v.type}</td>
                  <td className="table-td text-text-primary text-xs sm:text-sm">{v.make}</td>
                  <td className="table-td text-text-secondary text-xs hidden md:table-cell">{v.driver}</td>
                  <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{v.route}</td>
                  <td className="table-td w-28 sm:w-36">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${v.fuel<30?'bg-danger':v.fuel<50?'bg-warning':'bg-success'}`} style={{width:`${v.fuel}%`}} />
                      </div>
                      <span className={`text-xs font-semibold w-8 text-right ${v.fuel<30?'text-danger':'text-text-primary'}`}>{v.fuel}%</span>
                    </div>
                  </td>
                  <td className="table-td text-text-secondary text-xs hidden xl:table-cell">{v.speed}</td>
                  <td className="table-td"><span className={`${SB[v.status]} badge`}><span className="w-1.5 h-1.5 rounded-full bg-current"/>{v.status}</span></td>
                  <td className="table-td"><button className="text-text-disabled hover:text-brand-600"><MoreVertical size={15}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
