'use client'
import { useState } from 'react'
import { Plus, Upload, Search, MoreVertical } from 'lucide-react'

const TABS = ['Products','Balances','Stock Movements','Low Stock'] as const

const PRODUCTS = [
  { sku:'SKU-44821', name:'Solar inverter 5kW', cat:'Energy', unit:'pcs', min:100, reorder:150, status:'In Stock' },
  { sku:'SKU-44190', name:'Battery module 48V', cat:'Energy', unit:'pcs', min:100, reorder:120, status:'Low Stock' },
  { sku:'SKU-32011', name:'Mounting bracket set', cat:'Hardware', unit:'pcs', min:200, reorder:300, status:'In Stock' },
  { sku:'SKU-44305', name:'Solar panel 400W', cat:'Energy', unit:'pcs', min:150, reorder:250, status:'In Stock' },
]
const BALANCES = [
  { sku:'SKU-44821', name:'Solar inverter 5kW', wh:'WH-01 Dubai', qty:420, reserved:20, available:400, min:100, low:false },
  { sku:'SKU-44190', name:'Battery module 48V', wh:'WH-01 Dubai', qty:38, reserved:5, available:33, min:100, low:true },
  { sku:'SKU-32011', name:'Mounting bracket set', wh:'WH-02 Riyadh', qty:1240, reserved:40, available:1200, min:200, low:false },
  { sku:'SKU-31802', name:'DC cable roll 10mm', wh:'WH-01 Dubai', qty:12, reserved:0, available:12, min:50, low:true },
]
const MOVEMENTS = [
  { type:'INBOUND', product:'Solar inverter 5kW', from:'—', to:'WH-01', qty:120, refType:'Purchase', ref:'PO-2241', user:'Admin', date:'Today 10:14' },
  { type:'OUTBOUND', product:'Battery module 48V', from:'WH-01', to:'—', qty:18, refType:'Shipment', ref:'SHP-00412', user:'Operator', date:'Today 11:05' },
  { type:'TRANSFER', product:'DC cable roll', from:'WH-01', to:'WH-02', qty:40, refType:'Transfer', ref:'TRF-0088', user:'Admin', date:'Today 12:30' },
  { type:'ADJUSTMENT', product:'Spare fuse', from:'WH-02', to:'WH-02', qty:-6, refType:'Adjustment', ref:'ADJ-0034', user:'Operator', date:'Today 14:10' },
]
const LOWSTOCK = [
  { sku:'SKU-44190', name:'Battery module 48V', wh:'WH-01', qty:38, min:100, reorder:120, shortage:62 },
  { sku:'SKU-31802', name:'DC cable roll 10mm', wh:'WH-01', qty:12, min:50, reorder:60, shortage:38 },
  { sku:'SKU-50041', name:'Inverter spare fuse', wh:'WH-02', qty:9, min:50, reorder:60, shortage:41 },
]
const SBADGE: Record<string,string> = { 'In Stock':'badge-success','Low Stock':'badge-danger','Reorder':'badge-warning','Out of Stock':'badge-danger','Inactive':'badge-gray' }
const MV_BADGE: Record<string,string> = { INBOUND:'badge-success', OUTBOUND:'badge-info', TRANSFER:'badge-purple', ADJUSTMENT:'badge-gray' }
const MV_LABEL: Record<string,string> = { INBOUND:'Received', OUTBOUND:'Dispatched', TRANSFER:'Transfer', ADJUSTMENT:'Adjustment' }

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Products')

  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Inventory Control</h1>
          <p className="page-subtitle">Manage product catalog, stock balances, low stock items, and inventory movement history.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="btn-outline text-xs sm:text-sm"><Upload size={14} /> Import</button>
          <button className="btn-outline text-xs sm:text-sm"><Plus size={14} /> New Stock Movement</button>
          <button className="btn-primary text-xs sm:text-sm"><Plus size={14} /> Add Product</button>
        </div>
      </div>

      <div className="kpi-grid-6">
        {[
          { l:'Total Products', v:'2,348', c:'text-brand-700 bg-brand-50' },
          { l:'Inventory Balances', v:'18,440', c:'text-success bg-success/10' },
          { l:'Low Stock Items', v:'7', c:'text-danger bg-danger/10' },
          { l:'Movements Today', v:'142', c:'text-warning bg-warning/10' },
          { l:'Total Units', v:'48,920', c:'text-indigo-700 bg-indigo-50' },
          { l:'Reserved', v:'2,180', c:'text-purple-700 bg-purple-50' },
        ].map(k => (
          <div key={k.l} className={`rounded-xl p-3 ${k.c}`}>
            <p className="text-base sm:text-lg font-black">{k.v}</p>
            <p className="text-2xs mt-0.5 opacity-80">{k.l}</p>
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

      {activeTab === 'Products' && (
        <div className="card overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-border flex gap-3 items-center flex-wrap">
            <div className="flex items-center gap-2 bg-surface-secondary border border-border rounded-btn px-3 py-1.5 flex-1 min-w-0">
              <Search size={13} className="text-text-disabled" />
              <input placeholder="Search by SKU or product name..." className="bg-transparent text-sm outline-none w-full placeholder:text-text-disabled" />
            </div>
            <select className="text-xs sm:text-sm border border-border rounded-btn px-2 py-1.5 bg-white"><option>All Categories</option></select>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[640px]">
              <thead><tr>
                <th className="table-th">SKU</th>
                <th className="table-th">Product Name</th>
                <th className="table-th hidden md:table-cell">Category</th>
                <th className="table-th hidden lg:table-cell">Unit</th>
                <th className="table-th hidden lg:table-cell">Min Stock</th>
                <th className="table-th hidden xl:table-cell">Reorder Level</th>
                <th className="table-th">Status</th>
                <th className="table-th"></th>
              </tr></thead>
              <tbody>
                {PRODUCTS.map(p => (
                  <tr key={p.sku} className="table-row">
                    <td className="table-td font-semibold text-brand-700 text-xs sm:text-sm">{p.sku}</td>
                    <td className="table-td text-text-primary">{p.name}</td>
                    <td className="table-td hidden md:table-cell"><span className={`badge ${p.cat==='Energy'?'badge-warning':'badge-info'}`}>{p.cat}</span></td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{p.unit}</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{p.min}</td>
                    <td className="table-td text-text-secondary text-xs hidden xl:table-cell">{p.reorder}</td>
                    <td className="table-td"><span className={`${SBADGE[p.status]} badge`}><span className="w-1.5 h-1.5 rounded-full bg-current" />{p.status}</span></td>
                    <td className="table-td"><button className="text-text-disabled hover:text-brand-600"><MoreVertical size={15} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Balances' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-base min-w-[720px]">
              <thead><tr>
                <th className="table-th">Product</th>
                <th className="table-th hidden md:table-cell">Warehouse</th>
                <th className="table-th">On Hand</th>
                <th className="table-th hidden lg:table-cell">Reserved</th>
                <th className="table-th hidden lg:table-cell">Available</th>
                <th className="table-th hidden xl:table-cell">Min Stock</th>
                <th className="table-th">Status</th>
                <th className="table-th"></th>
              </tr></thead>
              <tbody>
                {BALANCES.map(b => (
                  <tr key={b.sku+b.wh} className="table-row">
                    <td className="table-td">
                      <p className="font-semibold text-text-primary text-xs sm:text-sm">{b.name}</p>
                      <p className="text-2xs text-text-disabled">{b.sku}</p>
                    </td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{b.wh}</td>
                    <td className="table-td"><span className={`text-sm font-bold ${b.low?'text-danger':'text-text-primary'}`}>{b.qty.toLocaleString()}</span></td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{b.reserved}</td>
                    <td className="table-td text-success font-semibold text-xs hidden lg:table-cell">{b.available.toLocaleString()}</td>
                    <td className="table-td text-text-secondary text-xs hidden xl:table-cell">{b.min}</td>
                    <td className="table-td"><span className={`${b.low?'badge-danger':'badge-success'} badge`}><span className="w-1.5 h-1.5 rounded-full bg-current" />{b.low?'Low Stock':'In Stock'}</span></td>
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
          <div className="overflow-x-auto">
            <table className="table-base min-w-[760px]">
              <thead><tr>
                <th className="table-th">Type</th>
                <th className="table-th">Product</th>
                <th className="table-th hidden md:table-cell">From</th>
                <th className="table-th hidden md:table-cell">To</th>
                <th className="table-th">Qty</th>
                <th className="table-th hidden lg:table-cell">Reference</th>
                <th className="table-th hidden xl:table-cell">User</th>
                <th className="table-th hidden lg:table-cell">Date</th>
              </tr></thead>
              <tbody>
                {MOVEMENTS.map((m,i) => (
                  <tr key={i} className="table-row">
                    <td className="table-td"><span className={`${MV_BADGE[m.type]} badge`}>{MV_LABEL[m.type]}</span></td>
                    <td className="table-td font-medium text-xs sm:text-sm">{m.product}</td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{m.from}</td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{m.to}</td>
                    <td className="table-td font-bold" style={{color: m.qty>0?'#10B981':'#EF4444'}}>{m.qty>0?'+':''}{m.qty}</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{m.refType} · {m.ref}</td>
                    <td className="table-td text-text-secondary text-xs hidden xl:table-cell">{m.user}</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{m.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Low Stock' && (
        <>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table-base min-w-[600px]">
                <thead><tr>
                  <th className="table-th">Product</th>
                  <th className="table-th hidden md:table-cell">Warehouse</th>
                  <th className="table-th">On Hand</th>
                  <th className="table-th hidden lg:table-cell">Min</th>
                  <th className="table-th hidden lg:table-cell">Reorder</th>
                  <th className="table-th">Shortage</th>
                  <th className="table-th"></th>
                </tr></thead>
                <tbody>
                  {LOWSTOCK.map(l => (
                    <tr key={l.sku} className="table-row">
                      <td className="table-td">
                        <p className="font-semibold text-text-primary text-xs sm:text-sm">{l.name}</p>
                        <p className="text-2xs text-text-disabled">{l.sku}</p>
                      </td>
                      <td className="table-td text-text-secondary text-xs hidden md:table-cell">{l.wh}</td>
                      <td className="table-td"><span className="text-danger font-bold">{l.qty}</span></td>
                      <td className="table-td text-xs hidden lg:table-cell">{l.min}</td>
                      <td className="table-td text-xs hidden lg:table-cell">{l.reorder}</td>
                      <td className="table-td font-bold text-warning">-{l.shortage}</td>
                      <td className="table-td"><button className="btn-primary text-xs px-3 py-1">Reorder</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card p-4 sm:p-5 border-l-4 border-l-brand-600 bg-brand-50/30">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="text-sm font-bold text-text-primary">AI Forecasting Preview</h3>
                <p className="text-xs text-text-secondary mt-1">Low stock forecasting and reorder recommendations will be added in a future AI monitoring phase. Predictive models will use historical stock movements and demand signals.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
