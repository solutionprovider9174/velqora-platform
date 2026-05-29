'use client'
import type { Metadata } from 'next'
import { useState } from 'react'
import { Search, Filter, Plus, MoreVertical, Eye, Edit, RefreshCw, Calendar, X as XIcon } from 'lucide-react'

const ROWS = [
  { id:'SHP-00412', customer:'Gulf Freight LLC', ref:'GF-2024-0091', origin:'Dubai, UAE', dest:'Riyadh, KSA', status:'In Transit', priority:'High', carrier:'DHL Express', tracking:'DHL-848921', planned:'2024-02-15' },
  { id:'SHP-00411', customer:'EuroTrans GmbH', ref:'ET-2024-0082', origin:'Jeddah, KSA', dest:'Dammam, KSA', status:'Delivered', priority:'Normal', carrier:'Aramex', tracking:'AMX-771234', planned:'2024-02-14' },
  { id:'SHP-00410', customer:'AsiaCargo Co.', ref:'AC-2024-0067', origin:'Riyadh, KSA', dest:'Muscat, OM', status:'Ready', priority:'Normal', carrier:'FedEx', tracking:'FDX-552901', planned:'2024-02-16' },
  { id:'SHP-00409', customer:'Nordic Shipping', ref:'NS-2024-0044', origin:'Abu Dhabi', dest:'Kuwait', status:'Delayed', priority:'Urgent', carrier:'DHL Express', tracking:'DHL-848920', planned:'2024-02-13' },
  { id:'SHP-00408', customer:'Mediterranean Co.', ref:'MC-2024-0031', origin:'Kuwait City', dest:'Manama, BH', status:'Dispatched', priority:'Normal', carrier:'Aramex', tracking:'AMX-771201', planned:'2024-02-15' },
  { id:'SHP-00407', customer:'Pacific Trade', ref:'PT-2024-0029', origin:'Doha', dest:'Salalah', status:'Created', priority:'Low', carrier:'—', tracking:'—', planned:'2024-02-17' },
]
const BADGE: Record<string, string> = {
  'Created':'badge-gray','Ready':'badge-info','Dispatched':'badge-indigo','In Transit':'badge-brand',
  'Delayed':'badge-danger','Delivered':'badge-success','Cancelled':'badge-danger','Returned':'badge-slate'
}
const PRIO: Record<string,string> = { Low:'badge-gray', Normal:'badge-info', High:'badge-warning', Urgent:'badge-danger' }
const STATUSES = ['All','Created','Ready','Dispatched','In Transit','Delayed','Delivered','Cancelled','Returned']

export default function ShipmentsPage() {
  const [activeStatus, setActiveStatus] = useState('All')
  const [showDrawer, setShowDrawer] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Shipments</h1>
          <p className="page-subtitle">Manage shipment workflows, delivery tracking, carrier references, and operational exceptions.</p>
        </div>
        <button onClick={() => setShowDrawer(true)} className="btn-primary">
          <Plus size={15} /> New Shipment
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { l:'Total Shipments', v:'1,284', c:'text-brand-700 bg-brand-50' },
          { l:'In Transit', v:'486', c:'text-info bg-info/10' },
          { l:'Delivered', v:'712', c:'text-success bg-success/10' },
          { l:'Delayed', v:'23', c:'text-danger bg-danger/10' },
          { l:'Ready for Dispatch', v:'68', c:'text-indigo-700 bg-indigo-50' },
        ].map(s => (
          <div key={s.l} className={`rounded-xl p-3 sm:p-4 text-center ${s.c}`}>
            <p className="text-lg sm:text-xl font-black">{s.v}</p>
            <p className="text-xs mt-0.5 opacity-80">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="card p-3 sm:p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex items-center gap-2 bg-surface-secondary border border-border rounded-btn px-3 py-2 flex-1 min-w-0">
            <Search size={14} className="text-text-disabled flex-shrink-0" />
            <input
              placeholder="Search by shipment number, customer, destination, or tracking reference..."
              className="outline-none text-sm bg-transparent w-full text-text-primary placeholder:text-text-disabled"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select className="text-xs sm:text-sm border border-border rounded-btn px-2 py-2 bg-white text-text-secondary">
              <option>All Companies</option><option>Velqora Enterprises</option><option>Velqora EU</option>
            </select>
            <select className="text-xs sm:text-sm border border-border rounded-btn px-2 py-2 bg-white text-text-secondary">
              <option>All Branches</option><option>Dubai HQ</option><option>Riyadh</option>
            </select>
            <select className="text-xs sm:text-sm border border-border rounded-btn px-2 py-2 bg-white text-text-secondary">
              <option>All Priority</option><option>Urgent</option><option>High</option><option>Normal</option><option>Low</option>
            </select>
            <button className="btn-outline text-xs sm:text-sm gap-1"><Calendar size={13} /> Date</button>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mt-3 overflow-x-auto">
          {STATUSES.map(f => (
            <button key={f} onClick={() => setActiveStatus(f)}
              className={`text-xs px-3 py-1.5 rounded-btn border transition-colors whitespace-nowrap ${activeStatus===f?'bg-brand-600 text-white border-brand-600':'border-border text-text-secondary hover:border-brand-400 hover:text-brand-600 bg-white'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-base min-w-[720px]">
            <thead>
              <tr>
                <th className="table-th"><input type="checkbox" className="rounded" /></th>
                <th className="table-th">Shipment No.</th>
                <th className="table-th">Customer</th>
                <th className="table-th hidden md:table-cell">Route</th>
                <th className="table-th">Status</th>
                <th className="table-th">Priority</th>
                <th className="table-th hidden lg:table-cell">Carrier</th>
                <th className="table-th hidden xl:table-cell">Tracking Ref.</th>
                <th className="table-th hidden lg:table-cell">Planned</th>
                <th className="table-th"></th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(r => (
                <tr key={r.id} className="table-row">
                  <td className="table-td"><input type="checkbox" className="rounded" /></td>
                  <td className="table-td">
                    <a href={`/shipments/${r.id}`} className="font-semibold text-brand-700 hover:underline text-xs sm:text-sm">{r.id}</a>
                    <p className="text-2xs text-text-disabled">{r.ref}</p>
                  </td>
                  <td className="table-td text-xs">{r.customer}</td>
                  <td className="table-td text-text-secondary text-xs hidden md:table-cell">{r.origin} → {r.dest}</td>
                  <td className="table-td"><span className={`${BADGE[r.status]} badge`}><span className="w-1.5 h-1.5 rounded-full bg-current" />{r.status}</span></td>
                  <td className="table-td"><span className={`${PRIO[r.priority]} badge`}>{r.priority}</span></td>
                  <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{r.carrier}</td>
                  <td className="table-td text-text-secondary text-xs hidden xl:table-cell">{r.tracking}</td>
                  <td className="table-td text-text-secondary text-xs hidden lg:table-cell whitespace-nowrap">{r.planned}</td>
                  <td className="table-td relative">
                    <button onClick={() => setOpenMenu(openMenu === r.id ? null : r.id)} className="text-text-disabled hover:text-brand-600 p-1">
                      <MoreVertical size={15} />
                    </button>
                    {openMenu === r.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-card-lg border border-border py-1 z-20">
                        <button className="w-full px-3 py-2 text-left text-sm text-text-primary hover:bg-surface-secondary flex items-center gap-2"><Eye size={13} /> View Details</button>
                        <button className="w-full px-3 py-2 text-left text-sm text-text-primary hover:bg-surface-secondary flex items-center gap-2"><Edit size={13} /> Edit Shipment</button>
                        <button className="w-full px-3 py-2 text-left text-sm text-text-primary hover:bg-surface-secondary flex items-center gap-2"><RefreshCw size={13} /> Update Status</button>
                        <button className="w-full px-3 py-2 text-left text-sm text-text-primary hover:bg-surface-secondary flex items-center gap-2"><Calendar size={13} /> View Timeline</button>
                        <hr className="my-1 border-border" />
                        <button className="w-full px-3 py-2 text-left text-sm text-danger hover:bg-surface-secondary flex items-center gap-2"><XIcon size={13} /> Cancel Shipment</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 sm:p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-text-secondary">Showing 6 of 1,284 shipments</span>
          <div className="flex gap-1.5">
            {['←','1','2','3','→'].map(p => (
              <button key={p} className={`text-xs px-2.5 py-1.5 rounded border ${p==='1'?'bg-brand-600 text-white border-brand-600':'border-border text-text-secondary hover:border-brand-400'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {showDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowDrawer(false)} />
          <div className="relative bg-white w-full sm:max-w-md h-full overflow-y-auto shadow-2xl">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="text-base font-bold text-text-primary">Create New Shipment</h3>
              <button onClick={() => setShowDrawer(false)} className="p-1 text-text-disabled hover:text-text-primary"><XIcon size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="input-label">Company</label><select className="input"><option>Velqora Enterprises</option></select></div>
                <div><label className="input-label">Branch</label><select className="input"><option>Dubai HQ</option></select></div>
              </div>
              <div><label className="input-label">Customer Name</label><input className="input" placeholder="Enter customer name" /></div>
              <div><label className="input-label">Customer Reference</label><input className="input" placeholder="CUST-REF-001" /></div>
              <div><label className="input-label">Origin Address</label><input className="input" placeholder="Pickup location" /></div>
              <div><label className="input-label">Destination Address</label><input className="input" placeholder="Delivery location" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="input-label">City</label><input className="input" placeholder="City" /></div>
                <div><label className="input-label">Country</label><select className="input"><option>UAE</option><option>KSA</option><option>Oman</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="input-label">Priority</label><select className="input"><option>Normal</option><option>Low</option><option>High</option><option>Urgent</option></select></div>
                <div><label className="input-label">Carrier</label><input className="input" placeholder="DHL, Aramex..." /></div>
              </div>
              <div><label className="input-label">Tracking Reference</label><input className="input" placeholder="Carrier tracking number" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="input-label">Planned Dispatch</label><input type="date" className="input" /></div>
                <div><label className="input-label">Planned Delivery</label><input type="date" className="input" /></div>
              </div>
              <div><label className="input-label">Notes</label><textarea className="input resize-none" rows={3} placeholder="Optional notes..."></textarea></div>
            </div>
            <div className="p-5 border-t border-border flex gap-2 sticky bottom-0 bg-white">
              <button className="btn-outline flex-1" onClick={() => setShowDrawer(false)}>Cancel</button>
              <button className="btn-primary flex-1">Create Shipment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
