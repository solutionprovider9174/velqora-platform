'use client'
import { useState } from 'react'
import { Search, Plus, ArrowDown, ArrowUp, ArrowLeftRight, MoreVertical } from 'lucide-react'

const WH = [{ id:'all', label:'All Warehouses' },{ id:'WH-01', label:'Dubai WH-01' },{ id:'WH-02', label:'Riyadh WH-02' },{ id:'WH-03', label:'Jeddah WH-03' }]

const TABS = ['Stock Overview','Stock Movements','Low Stock'] as const

const INV = [
  { sku:'SKU-44821', name:'Solar inverter 5kW', cat:'Energy', qty:420, reserved:20, available:400, min:100, zone:'Zone A-3', status:'In Stock' },
  { sku:'SKU-44190', name:'Battery module 48V', cat:'Energy', qty:38, reserved:5, available:33, min:100, zone:'Zone A-4', status:'Low Stock' },
  { sku:'SKU-32011', name:'Mounting bracket set', cat:'Hardware', qty:1240, reserved:40, available:1200, min:200, zone:'Zone B-1', status:'In Stock' },
  { sku:'SKU-31802', name:'DC cable roll 10mm', cat:'Hardware', qty:12, reserved:0, available:12, min:50, zone:'Zone B-2', status:'Reorder' },
  { sku:'SKU-44305', name:'Solar panel 400W mono', cat:'Energy', qty:680, reserved:30, available:650, min:150, zone:'Zone C-1', status:'In Stock' },
]
const MOVEMENTS = [
  { type:'INBOUND', product:'Solar inverter 5kW', from:'—', to:'WH-01', qty:120, ref:'PO-2241', user:'Admin', date:'Today 10:14' },
  { type:'OUTBOUND', product:'Battery module 48V', from:'WH-01', to:'—', qty:18, ref:'SHP-00412', user:'Operator', date:'Today 11:05' },
  { type:'TRANSFER', product:'DC cable roll', from:'WH-01', to:'WH-02', qty:40, ref:'TRF-0088', user:'Admin', date:'Today 12:30' },
  { type:'INBOUND', product:'Mounting bracket', from:'—', to:'WH-01', qty:200, ref:'PO-2240', user:'Admin', date:'Today 13:45' },
  { type:'ADJUSTMENT', product:'Spare fuse', from:'WH-02', to:'WH-02', qty:-6, ref:'ADJ-0034', user:'Operator', date:'Today 14:10' },
]
const LOWSTOCK = [
  { sku:'SKU-44190', name:'Battery module 48V', wh:'WH-01 Dubai', qty:38, min:100, reorder:120, shortage:62 },
  { sku:'SKU-31802', name:'DC cable roll 10mm', wh:'WH-01 Dubai', qty:12, min:50, reorder:60, shortage:38 },
  { sku:'SKU-50041', name:'Inverter spare fuse', wh:'WH-02 Riyadh', qty:9, min:50, reorder:60, shortage:41 },
]

const SBADGE: Record<string,string> = { 'In Stock':'badge-success','Low Stock':'badge-danger','Reorder':'badge-warning','Out of Stock':'badge-danger' }
const MV_BADGE: Record<string,string> = { INBOUND:'badge-success', OUTBOUND:'badge-info', TRANSFER:'badge-purple', ADJUSTMENT:'badge-gray' }
const MV_LABEL: Record<string,string> = { INBOUND:'Received', OUTBOUND:'Dispatched', TRANSFER:'Transfer', ADJUSTMENT:'Adjustment' }

export default function WarehousePage() {
  const [activeWh, setActiveWh] = useState('WH-01')
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Stock Overview')
  const [showDrawer, setShowDrawer] = useState<null | 'receive' | 'transfer'>(null)

  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Warehouse Operations</h1>
          <p className="page-subtitle">Monitor warehouse capacity, product stock levels, low stock alerts, and inventory movements.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setShowDrawer('transfer')} className="btn-outline text-xs sm:text-sm"><ArrowLeftRight size={14} /> Transfer Stock</button>
          <button onClick={() => setShowDrawer('receive')} className="btn-primary text-xs sm:text-sm"><Plus size={14} /> Receive Stock</button>
        </div>
      </div>

      <div className="flex overflow-x-auto bg-white rounded-xl border border-border shadow-card">
        {WH.map(w => (
          <button key={w.id} onClick={() => setActiveWh(w.id)}
            className={`flex-shrink-0 px-4 py-3 text-sm border-b-2 transition-colors whitespace-nowrap ${w.id===activeWh?'border-brand-600 text-brand-700 font-semibold bg-brand-50':'border-transparent text-text-secondary hover:text-text-primary'}`}>
            {w.label}
          </button>
        ))}
      </div>

      <div className="kpi-grid-4">
        {[
          { l:'Total Units On Hand', v:'18,440', c:'text-brand-700 bg-brand-50' },
          { l:'Capacity Utilization', v:'74%', c:'text-success bg-success/10' },
          { l:'Stock Movements Today', v:'142', c:'text-warning bg-warning/10' },
          { l:'Low Stock Items', v:'7', c:'text-danger bg-danger/10' },
        ].map(k => (
          <div key={k.l} className={`rounded-xl p-3 sm:p-4 ${k.c}`}>
            <p className="text-xl sm:text-2xl font-black">{k.v}</p>
            <p className="text-xs mt-0.5 opacity-80">{k.l}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-0 border-b border-border bg-white rounded-t-card overflow-x-auto">
        {TABS.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`flex-shrink-0 px-5 py-3 text-sm border-b-2 transition-colors whitespace-nowrap ${t===activeTab?'border-brand-600 text-brand-700 font-semibold':'border-transparent text-text-secondary hover:text-text-primary'}`}>
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'Stock Overview' && (
        <div className="card overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-border flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center">
            <div className="flex items-center gap-2 bg-surface-secondary border border-border rounded-btn px-3 py-1.5 w-full sm:flex-1">
              <Search size={13} className="text-text-disabled" />
              <input placeholder="Search by SKU, product name, category, or warehouse..." className="bg-transparent text-sm outline-none w-full placeholder:text-text-disabled" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <select className="text-xs sm:text-sm border border-border rounded-btn px-2 py-1.5 bg-white text-text-secondary">
                <option>All Categories</option><option>Energy</option><option>Hardware</option><option>Spare parts</option>
              </select>
              <label className="flex items-center gap-1.5 text-xs text-text-secondary cursor-pointer">
                <input type="checkbox" className="rounded" /> Low stock only
              </label>
            </div>
            <span className="text-xs text-text-secondary">248 items</span>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[760px]">
              <thead>
                <tr>
                  <th className="table-th"><input type="checkbox" className="rounded" /></th>
                  <th className="table-th">Product</th>
                  <th className="table-th hidden sm:table-cell">SKU</th>
                  <th className="table-th hidden md:table-cell">Category</th>
                  <th className="table-th hidden xl:table-cell">Warehouse</th>
                  <th className="table-th">On Hand</th>
                  <th className="table-th hidden lg:table-cell">Available</th>
                  <th className="table-th hidden lg:table-cell">Min</th>
                  <th className="table-th">Status</th>
                  <th className="table-th"></th>
                </tr>
              </thead>
              <tbody>
                {INV.map(item => (
                  <tr key={item.sku} className="table-row">
                    <td className="table-td"><input type="checkbox" className="rounded" /></td>
                    <td className="table-td">
                      <p className="font-semibold text-text-primary text-xs sm:text-sm">{item.name}</p>
                      <p className="text-2xs text-text-disabled sm:hidden">{item.sku}</p>
                    </td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{item.sku}</td>
                    <td className="table-td hidden md:table-cell">
                      <span className={`badge ${item.cat==='Energy'?'badge-warning':item.cat==='Hardware'?'badge-info':'badge-success'}`}>{item.cat}</span>
                    </td>
                    <td className="table-td text-text-secondary text-xs hidden xl:table-cell">{item.zone}</td>
                    <td className="table-td">
                      <p className={`text-sm font-bold ${item.qty<item.min?'text-danger':'text-text-primary'}`}>{item.qty.toLocaleString()}</p>
                    </td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{item.available.toLocaleString()}</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{item.min}</td>
                    <td className="table-td"><span className={`${SBADGE[item.status]} badge`}><span className="w-1.5 h-1.5 rounded-full bg-current" />{item.status}</span></td>
                    <td className="table-td"><button className="text-text-disabled hover:text-brand-600"><MoreVertical size={15} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Stock Movements' && (
        <div className="card overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-border flex items-center justify-between">
            <span className="text-sm font-bold text-text-primary">Recent Stock Movements</span>
            <button className="text-xs text-brand-600 font-semibold hover:underline">Export CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[760px]">
              <thead>
                <tr>
                  <th className="table-th">Type</th>
                  <th className="table-th">Product</th>
                  <th className="table-th hidden md:table-cell">Source</th>
                  <th className="table-th hidden md:table-cell">Destination</th>
                  <th className="table-th">Qty</th>
                  <th className="table-th hidden lg:table-cell">Reference</th>
                  <th className="table-th hidden lg:table-cell">User</th>
                  <th className="table-th hidden xl:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {MOVEMENTS.map((m,i) => (
                  <tr key={i} className="table-row">
                    <td className="table-td"><span className={`${MV_BADGE[m.type]} badge`}>{MV_LABEL[m.type]}</span></td>
                    <td className="table-td font-medium text-text-primary text-xs sm:text-sm">{m.product}</td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{m.from}</td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{m.to}</td>
                    <td className="table-td font-bold" style={{color: m.qty>0?'#10B981':'#EF4444'}}>{m.qty>0?'+':''}{m.qty}</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{m.ref}</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{m.user}</td>
                    <td className="table-td text-text-secondary text-xs hidden xl:table-cell">{m.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Low Stock' && (
        <div className="card overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-border flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-text-primary">Low Stock Items</span>
              <p className="text-2xs text-text-secondary mt-0.5">Items below minimum stock level</p>
            </div>
            <button className="btn-primary text-xs">Bulk Reorder</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[600px]">
              <thead>
                <tr>
                  <th className="table-th">Product</th>
                  <th className="table-th hidden md:table-cell">Warehouse</th>
                  <th className="table-th">On Hand</th>
                  <th className="table-th hidden lg:table-cell">Min</th>
                  <th className="table-th hidden lg:table-cell">Reorder Level</th>
                  <th className="table-th">Shortage</th>
                  <th className="table-th"></th>
                </tr>
              </thead>
              <tbody>
                {LOWSTOCK.map(l => (
                  <tr key={l.sku} className="table-row">
                    <td className="table-td">
                      <p className="font-semibold text-text-primary text-xs sm:text-sm">{l.name}</p>
                      <p className="text-2xs text-text-disabled">{l.sku}</p>
                    </td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{l.wh}</td>
                    <td className="table-td"><span className="text-danger font-bold">{l.qty}</span></td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{l.min}</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{l.reorder}</td>
                    <td className="table-td font-bold text-warning">-{l.shortage}</td>
                    <td className="table-td"><button className="btn-primary text-xs px-3 py-1">Reorder</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowDrawer(null)} />
          <div className="relative bg-white w-full sm:max-w-md h-full overflow-y-auto shadow-2xl">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="text-base font-bold text-text-primary">{showDrawer === 'receive' ? 'Receive Stock' : 'Transfer Stock'}</h3>
              <button onClick={() => setShowDrawer(null)} className="p-1 text-text-disabled hover:text-text-primary">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div><label className="input-label">Company</label><select className="input"><option>Velqora Enterprises</option></select></div>
              <div><label className="input-label">Product</label><select className="input"><option>Solar inverter 5kW</option></select></div>
              {showDrawer === 'transfer' && (
                <div><label className="input-label">Source Warehouse</label><select className="input"><option>WH-01 Dubai</option></select></div>
              )}
              <div><label className="input-label">{showDrawer === 'transfer' ? 'Destination Warehouse' : 'Warehouse'}</label><select className="input"><option>WH-02 Riyadh</option></select></div>
              <div><label className="input-label">Quantity</label><input type="number" className="input" placeholder="0" /></div>
              <div><label className="input-label">Reference Number</label><input className="input" placeholder="PO-2024-001" /></div>
              <div><label className="input-label">Reason / Notes</label><textarea className="input resize-none" rows={3}></textarea></div>
            </div>
            <div className="p-5 border-t border-border flex gap-2 sticky bottom-0 bg-white">
              <button className="btn-outline flex-1" onClick={() => setShowDrawer(null)}>Cancel</button>
              <button className="btn-primary flex-1">{showDrawer === 'receive' ? 'Receive' : 'Transfer'} Stock</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
