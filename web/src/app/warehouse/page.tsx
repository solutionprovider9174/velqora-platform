'use client'
import { useState } from 'react'
import { ScanLine, QrCode, MapPin, List, Package, PackageCheck, RefreshCw, Truck, ArrowLeftRight, Building2 } from 'lucide-react'

type Tab = 'overview' | 'movements' | 'lowstock' | 'barcode' | 'qr' | 'bins' | 'picking' | 'packing' | 'receiving' | 'putaway' | 'cycle-count' | 'cross-dock' | 'returns' | 'suppliers'

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id:'overview',    label:'Stock Overview', icon:Package },
  { id:'movements',   label:'Stock Movements',icon:ArrowLeftRight },
  { id:'lowstock',    label:'Low Stock',      icon:Package },
  { id:'barcode',     label:'Barcode Scanning',icon:ScanLine },
  { id:'qr',          label:'QR Scanning',    icon:QrCode },
  { id:'bins',        label:'Bin Locations',  icon:MapPin },
  { id:'picking',     label:'Picking Lists',  icon:List },
  { id:'packing',     label:'Packing Lists',  icon:PackageCheck },
  { id:'receiving',   label:'Receiving',      icon:Truck },
  { id:'putaway',     label:'Put-away',       icon:Package },
  { id:'cycle-count', label:'Cycle Counting', icon:RefreshCw },
  { id:'cross-dock',  label:'Cross Docking',  icon:ArrowLeftRight },
  { id:'returns',     label:'Returns',        icon:RefreshCw },
  { id:'suppliers',   label:'Suppliers',      icon:Building2 },
]

const WH = [
  { id:'ALL', label:'All Warehouses' },
  { id:'WH-01', label:'WH-01 Dubai Main' },
  { id:'WH-02', label:'WH-02 Riyadh Hub' },
  { id:'WH-03', label:'WH-03 Jeddah Depot' },
]

const STOCK = [
  { sku:'SKU-44821', name:'Solar Inverter 5kW',  cat:'Energy',  wh:'WH-01', bin:'A-01-03', onHand:420, available:380, min:100, status:'In Stock' },
  { sku:'SKU-44190', name:'Battery Module 48V',  cat:'Energy',  wh:'WH-01', bin:'A-02-01', onHand:38,  available:38,  min:100, status:'Low Stock' },
  { sku:'SKU-32011', name:'Mounting Bracket Set',cat:'Hardware',wh:'WH-02', bin:'B-04-12', onHand:1240,available:1240,min:200, status:'In Stock' },
  { sku:'SKU-31802', name:'DC Cable Roll 10mm',  cat:'Hardware',wh:'WH-02', bin:'B-04-13', onHand:12,  available:12,  min:50,  status:'Reorder' },
  { sku:'SKU-44305', name:'Solar Panel 400W',    cat:'Energy',  wh:'WH-03', bin:'C-01-05', onHand:680, available:620, min:150, status:'In Stock' },
  { sku:'SKU-50041', name:'Inverter Spare Fuse', cat:'Spare',   wh:'WH-03', bin:'C-08-22', onHand:9,   available:9,   min:50,  status:'Low Stock' },
]

const PICKING_LISTS = [
  { id:'PCK-2042', shipment:'SHP-00412', items:8,  picker:'Ahmed K.',  status:'In Progress',  priority:'High' },
  { id:'PCK-2041', shipment:'SHP-00410', items:14, picker:'Sara M.',   status:'Pending',      priority:'Normal' },
  { id:'PCK-2040', shipment:'SHP-00408', items:5,  picker:'Karim N.',  status:'Completed',    priority:'Normal' },
  { id:'PCK-2039', shipment:'SHP-00407', items:22, picker:'Layla A.',  status:'In Progress',  priority:'Urgent' },
]

const PACKING_LISTS = [
  { id:'PKG-1024', shipment:'SHP-00412', packages:3, weight:'128 kg', dimensions:'120x80x80', status:'Packed' },
  { id:'PKG-1023', shipment:'SHP-00411', packages:1, weight:'18 kg',  dimensions:'40x30x30',  status:'Sealed' },
  { id:'PKG-1022', shipment:'SHP-00410', packages:5, weight:'240 kg', dimensions:'pallet',    status:'In Progress' },
]

const RECEIVING = [
  { id:'RCV-3041', po:'PO-2024-1041', supplier:'Solar Tech Supply Co', wh:'WH-01', items:24, expected:'2024-05-29', status:'Receiving' },
  { id:'RCV-3040', po:'PO-2024-1040', supplier:'Battery Direct',       wh:'WH-02', items:12, expected:'2024-05-30', status:'Scheduled' },
  { id:'RCV-3039', po:'PO-2024-1039', supplier:'Industrial Hardware',  wh:'WH-01', items:48, expected:'2024-05-28', status:'Completed' },
  { id:'RCV-3038', po:'PO-2024-1038', supplier:'Cable & Wire Inc',     wh:'WH-03', items:18, expected:'2024-05-31', status:'Scheduled' },
]

const PUTAWAY = [
  { sku:'SKU-44821', name:'Solar Inverter 5kW',   qty:24, fromZone:'Receiving',   toBin:'A-01-03', operator:'Karim N.', status:'Done' },
  { sku:'SKU-44190', name:'Battery Module 48V',   qty:12, fromZone:'Receiving',   toBin:'A-02-01', operator:'Ahmed K.', status:'In Progress' },
  { sku:'SKU-32011', name:'Mounting Bracket Set', qty:48, fromZone:'Cross-dock',  toBin:'B-04-12', operator:'Layla A.', status:'Pending' },
]

const CYCLE_COUNTS = [
  { id:'CC-2024-042', zone:'Zone A',     items:124, counted:124, variance:0,  status:'Completed', date:'2024-05-28' },
  { id:'CC-2024-041', zone:'Zone B',     items:286, counted:284, variance:-2, status:'Completed', date:'2024-05-27' },
  { id:'CC-2024-040', zone:'Zone C',     items:184, counted:0,   variance:0,  status:'Scheduled', date:'2024-05-31' },
  { id:'CC-2024-039', zone:'Spare parts',items:520, counted:518, variance:-2, status:'Completed', date:'2024-05-25' },
]

const CROSS_DOCK = [
  { id:'XD-1042', inbound:'PO-2024-1041', outbound:'SHP-00412', items:8,  arrival:'09:00', dispatch:'14:30', status:'In Transit' },
  { id:'XD-1041', inbound:'PO-2024-1040', outbound:'SHP-00410', items:14, arrival:'11:00', dispatch:'15:00', status:'Scheduled' },
]

const RETURNS = [
  { id:'RTN-2024-042', shipment:'SHP-00405', customer:'Gulf Freight LLC',  items:2, reason:'Wrong model',     status:'Inspecting', value:1240 },
  { id:'RTN-2024-041', shipment:'SHP-00398', customer:'AsiaCargo Co.',     items:1, reason:'Damaged in transit',status:'Refunded',  value:680 },
  { id:'RTN-2024-040', shipment:'SHP-00391', customer:'EuroTrans GmbH',    items:5, reason:'Customer error',   status:'Restocked', value:340 },
]

const SUPPLIERS = [
  { id:'SUP-001', name:'Solar Tech Supply Co',   country:'Germany',     orders:48, ontime:96, status:'Active' },
  { id:'SUP-002', name:'Battery Direct',         country:'China',       orders:32, ontime:88, status:'Active' },
  { id:'SUP-003', name:'Industrial Hardware',    country:'Netherlands', orders:24, ontime:94, status:'Active' },
  { id:'SUP-004', name:'Cable & Wire Inc',       country:'Italy',       orders:18, ontime:92, status:'Active' },
  { id:'SUP-005', name:'Fuel & Energy Corp',     country:'UAE',         orders:12, ontime:78, status:'Review' },
]

const BINS = [
  { zone:'A', aisle:'01', shelf:'03', occupied:78, capacity:120, items:42 },
  { zone:'A', aisle:'02', shelf:'01', occupied:38, capacity:120, items:12 },
  { zone:'B', aisle:'04', shelf:'12', occupied:108,capacity:120, items:84 },
  { zone:'B', aisle:'04', shelf:'13', occupied:12, capacity:120, items:4 },
  { zone:'C', aisle:'01', shelf:'05', occupied:96, capacity:120, items:38 },
  { zone:'C', aisle:'08', shelf:'22', occupied:42, capacity:60,  items:18 },
]

const SB: Record<string,string> = { 'In Stock':'badge-success','Low Stock':'badge-danger','Reorder':'badge-warning','Out of Stock':'badge-gray','In Progress':'badge-info','Pending':'badge-warning','Completed':'badge-success','Done':'badge-success','Packed':'badge-info','Sealed':'badge-success','Receiving':'badge-info','Scheduled':'badge-info','Inspecting':'badge-warning','Refunded':'badge-info','Restocked':'badge-success','Active':'badge-success','Review':'badge-warning','In Transit':'badge-info' }
const PRIO: Record<string,string> = { Urgent:'badge-danger', High:'badge-warning', Normal:'badge-info', Low:'badge-gray' }

export default function WarehousePage() {
  const [activeWh, setActiveWh] = useState('ALL')
  const [tab, setTab] = useState<Tab>('overview')
  const [scanInput, setScanInput] = useState('')

  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Warehouse Operations</h1>
          <p className="page-subtitle">Complete WMS — barcode/QR scanning, bins, picking, packing, receiving, put-away, cycle counting, returns, suppliers.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="btn-outline text-xs sm:text-sm"><ScanLine size={14}/> Scan</button>
          <button className="btn-primary text-xs sm:text-sm">+ Receive Stock</button>
        </div>
      </div>

      <div className="flex overflow-x-auto bg-white rounded-xl border border-border shadow-card">
        {WH.map(w => (
          <button key={w.id} onClick={()=>setActiveWh(w.id)}
            className={`flex-shrink-0 px-4 py-2.5 text-sm border-b-2 transition-colors whitespace-nowrap ${w.id===activeWh?'border-brand-600 text-brand-700 font-semibold bg-brand-50':'border-transparent text-text-secondary hover:text-text-primary'}`}>
            {w.label}
          </button>
        ))}
      </div>

      <div className="kpi-grid-6">
        {[
          { l:'Total Units',     v:'18,440', c:'bg-brand-50 text-brand-700' },
          { l:'Capacity',        v:'74%',    c:'bg-success/10 text-success' },
          { l:'Movements Today', v:'142',    c:'bg-warning/10 text-warning' },
          { l:'Low Stock',       v:'7',      c:'bg-danger/10 text-danger' },
          { l:'Active Pickers',  v:'8',      c:'bg-indigo-50 text-indigo-700' },
          { l:'Bins Used',       v:'382/520',c:'bg-purple-50 text-purple-700' },
        ].map(k=>(
          <div key={k.l} className={`rounded-xl p-3 sm:p-4 ${k.c}`}>
            <div className="text-xl sm:text-2xl font-black">{k.v}</div>
            <div className="text-2xs sm:text-xs mt-0.5 opacity-80">{k.l}</div>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="flex overflow-x-auto border-b border-border">
          {TABS.map(t => {
            const Icon = t.icon
            return (
              <button key={t.id} onClick={()=>setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap ${t.id===tab?'border-brand-600 text-brand-700 font-semibold bg-brand-50':'border-transparent text-text-secondary hover:text-text-primary'}`}>
                <Icon size={14}/>{t.label}
              </button>
            )
          })}
        </div>
      </div>

      {tab === 'overview' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-base min-w-[800px]">
              <thead><tr>
                <th className="table-th">Product</th>
                <th className="table-th">SKU</th>
                <th className="table-th hidden sm:table-cell">Category</th>
                <th className="table-th hidden md:table-cell">Warehouse</th>
                <th className="table-th hidden lg:table-cell">Bin</th>
                <th className="table-th">On Hand</th>
                <th className="table-th hidden lg:table-cell">Available</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {STOCK.map(s=>(
                  <tr key={s.sku} className="table-row">
                    <td className="table-td font-semibold text-text-primary text-xs sm:text-sm">{s.name}</td>
                    <td className="table-td font-mono text-2xs text-text-disabled">{s.sku}</td>
                    <td className="table-td hidden sm:table-cell"><span className={`badge ${s.cat==='Energy'?'badge-warning':s.cat==='Hardware'?'badge-info':'badge-gray'}`}>{s.cat}</span></td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{s.wh}</td>
                    <td className="table-td font-mono text-2xs hidden lg:table-cell">{s.bin}</td>
                    <td className="table-td font-bold">{s.onHand}</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{s.available}</td>
                    <td className="table-td"><span className={`${SB[s.status]} badge`}>{s.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'movements' && (
        <div className="card p-4 sm:p-5">
          <p className="text-sm text-text-secondary">Full inbound, outbound, transfer, and adjustment history available via the Inventory Control module.</p>
        </div>
      )}

      {tab === 'lowstock' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-base min-w-[600px]">
              <thead><tr>
                <th className="table-th">SKU</th>
                <th className="table-th">Product</th>
                <th className="table-th hidden sm:table-cell">Warehouse</th>
                <th className="table-th">On Hand</th>
                <th className="table-th">Min</th>
                <th className="table-th hidden md:table-cell">Shortage</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {STOCK.filter(s=>s.status==='Low Stock'||s.status==='Reorder').map(s=>(
                  <tr key={s.sku} className="table-row">
                    <td className="table-td font-mono text-2xs text-text-disabled">{s.sku}</td>
                    <td className="table-td font-semibold text-text-primary text-xs sm:text-sm">{s.name}</td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{s.wh}</td>
                    <td className="table-td font-bold text-danger">{s.onHand}</td>
                    <td className="table-td text-text-secondary">{s.min}</td>
                    <td className="table-td font-bold text-danger hidden md:table-cell">{s.min - s.onHand}</td>
                    <td className="table-td"><span className={`${SB[s.status]} badge`}>{s.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'barcode' && (
        <div className="card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-text-primary">Barcode Scanning</h3>
              <p className="text-xs text-text-secondary mt-0.5">Scan product barcodes for instant lookup, receiving, picking, or stock counts</p>
            </div>
            <span className="badge-info badge">Mobile-Ready</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-brand-300 rounded-xl p-8 text-center bg-brand-50">
              <ScanLine size={48} className="mx-auto text-brand-600 mb-3"/>
              <p className="text-sm font-bold text-text-primary mb-1">Camera Scanner Ready</p>
              <p className="text-xs text-text-secondary mb-3">Point at a barcode to scan</p>
              <input value={scanInput} onChange={e=>setScanInput(e.target.value)} placeholder="Or type barcode manually..." className="input w-full max-w-xs mx-auto"/>
            </div>
            <div>
              <p className="text-xs font-bold text-text-secondary uppercase mb-2">Recent Scans</p>
              <div className="space-y-2">
                {[
                  { code:'5901234123457', sku:'SKU-44821', name:'Solar Inverter 5kW',  time:'2m ago',action:'Picked' },
                  { code:'5901234123458', sku:'SKU-44190', name:'Battery Module 48V',  time:'4m ago',action:'Received' },
                  { code:'5901234123459', sku:'SKU-32011', name:'Mounting Bracket Set',time:'8m ago',action:'Counted' },
                ].map((s,i)=>(
                  <div key={i} className="border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-2xs text-brand-700">{s.code}</p>
                      <span className="badge-success badge text-2xs">{s.action}</span>
                    </div>
                    <p className="text-sm font-semibold text-text-primary mt-1">{s.name}</p>
                    <p className="text-2xs text-text-disabled">{s.sku} · {s.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'qr' && (
        <div className="card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-text-primary">QR Code Scanning</h3>
              <p className="text-xs text-text-secondary mt-0.5">Scan bins, pallets, equipment serial numbers, and shipment labels</p>
            </div>
            <span className="badge-info badge">Mobile-Ready</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="border-2 border-dashed border-brand-300 rounded-xl p-6 text-center bg-brand-50">
              <QrCode size={48} className="mx-auto text-brand-600 mb-3"/>
              <p className="text-sm font-bold text-text-primary mb-1">QR Scanner Ready</p>
              <p className="text-xs text-text-secondary">Point at QR code</p>
            </div>
            {[
              { type:'Bin',       code:'BIN-A-01-03', name:'Zone A · Aisle 01 · Shelf 03', items:42 },
              { type:'Equipment', code:'EQ-SOLAR-0421', name:'Solar Inverter 5kW',          items:1 },
            ].map((q,i)=>(
              <div key={i} className="border border-border rounded-xl p-4">
                <span className="badge-purple badge mb-2">{q.type}</span>
                <p className="font-mono text-xs text-brand-700">{q.code}</p>
                <p className="text-sm font-semibold text-text-primary mt-1">{q.name}</p>
                <p className="text-2xs text-text-disabled mt-1">{q.items} item{q.items>1?'s':''}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'bins' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary">Bin Locations</h3>
            <button className="btn-outline text-xs">Print Labels</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[600px]">
              <thead><tr>
                <th className="table-th">Bin Location</th>
                <th className="table-th">Zone</th>
                <th className="table-th hidden sm:table-cell">Items</th>
                <th className="table-th">Capacity Used</th>
                <th className="table-th hidden md:table-cell">Available</th>
              </tr></thead>
              <tbody>
                {BINS.map((b,i)=>{
                  const pct = Math.round((b.occupied/b.capacity)*100)
                  return (
                    <tr key={i} className="table-row">
                      <td className="table-td font-mono text-xs text-brand-700">{b.zone}-{b.aisle}-{b.shelf}</td>
                      <td className="table-td"><span className={`badge ${b.zone==='A'?'badge-info':b.zone==='B'?'badge-success':'badge-warning'}`}>Zone {b.zone}</span></td>
                      <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{b.items}</td>
                      <td className="table-td">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${pct>90?'bg-danger':pct>70?'bg-warning':'bg-success'}`} style={{width:`${pct}%`}}/>
                          </div>
                          <span className="text-xs font-bold">{pct}%</span>
                        </div>
                      </td>
                      <td className="table-td text-text-secondary text-xs hidden md:table-cell">{b.capacity - b.occupied} units</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'picking' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary">Picking Lists</h3>
            <button className="btn-primary text-xs">+ Generate Pick</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Pick ID</th>
                <th className="table-th">Shipment</th>
                <th className="table-th hidden sm:table-cell">Items</th>
                <th className="table-th hidden md:table-cell">Picker</th>
                <th className="table-th">Priority</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {PICKING_LISTS.map(p=>(
                  <tr key={p.id} className="table-row">
                    <td className="table-td font-mono text-brand-700 text-xs">{p.id}</td>
                    <td className="table-td font-semibold text-text-primary text-xs">{p.shipment}</td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{p.items}</td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{p.picker}</td>
                    <td className="table-td"><span className={`${PRIO[p.priority]} badge`}>{p.priority}</span></td>
                    <td className="table-td"><span className={`${SB[p.status]} badge`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'packing' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary">Packing Lists</h3>
            <button className="btn-primary text-xs">+ Pack Shipment</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Pack ID</th>
                <th className="table-th">Shipment</th>
                <th className="table-th hidden sm:table-cell">Packages</th>
                <th className="table-th hidden md:table-cell">Weight</th>
                <th className="table-th hidden lg:table-cell">Dimensions</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {PACKING_LISTS.map(p=>(
                  <tr key={p.id} className="table-row">
                    <td className="table-td font-mono text-brand-700 text-xs">{p.id}</td>
                    <td className="table-td font-semibold text-text-primary text-xs">{p.shipment}</td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{p.packages}</td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{p.weight}</td>
                    <td className="table-td font-mono text-2xs hidden lg:table-cell">{p.dimensions}</td>
                    <td className="table-td"><span className={`${SB[p.status]} badge`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'receiving' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary">Receiving Schedule</h3>
            <button className="btn-primary text-xs">+ Schedule Receipt</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Receipt ID</th>
                <th className="table-th">PO</th>
                <th className="table-th hidden sm:table-cell">Supplier</th>
                <th className="table-th hidden md:table-cell">Warehouse</th>
                <th className="table-th hidden lg:table-cell">Items</th>
                <th className="table-th">Expected</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {RECEIVING.map(r=>(
                  <tr key={r.id} className="table-row">
                    <td className="table-td font-mono text-brand-700 text-xs">{r.id}</td>
                    <td className="table-td font-mono text-xs">{r.po}</td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{r.supplier}</td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{r.wh}</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{r.items}</td>
                    <td className="table-td text-text-secondary text-xs">{r.expected}</td>
                    <td className="table-td"><span className={`${SB[r.status]} badge`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'putaway' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border"><h3 className="text-sm font-bold text-text-primary">Put-away Tasks</h3></div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">SKU</th>
                <th className="table-th">Product</th>
                <th className="table-th">Qty</th>
                <th className="table-th hidden sm:table-cell">From</th>
                <th className="table-th hidden md:table-cell">To Bin</th>
                <th className="table-th hidden lg:table-cell">Operator</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {PUTAWAY.map((p,i)=>(
                  <tr key={i} className="table-row">
                    <td className="table-td font-mono text-2xs text-text-disabled">{p.sku}</td>
                    <td className="table-td font-semibold text-text-primary text-xs sm:text-sm">{p.name}</td>
                    <td className="table-td font-bold">{p.qty}</td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{p.fromZone}</td>
                    <td className="table-td font-mono text-xs hidden md:table-cell">{p.toBin}</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{p.operator}</td>
                    <td className="table-td"><span className={`${SB[p.status]} badge`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'cycle-count' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary">Cycle Counting</h3>
            <button className="btn-primary text-xs">+ Schedule Count</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Count ID</th>
                <th className="table-th">Zone</th>
                <th className="table-th hidden sm:table-cell">Items Expected</th>
                <th className="table-th hidden md:table-cell">Counted</th>
                <th className="table-th">Variance</th>
                <th className="table-th hidden lg:table-cell">Date</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {CYCLE_COUNTS.map(c=>(
                  <tr key={c.id} className="table-row">
                    <td className="table-td font-mono text-brand-700 text-xs">{c.id}</td>
                    <td className="table-td font-semibold text-text-primary text-xs">{c.zone}</td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{c.items}</td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{c.counted || '—'}</td>
                    <td className="table-td">
                      {c.variance === 0 ? <span className="badge-success badge">Match</span> :
                       <span className="badge-warning badge">{c.variance > 0 ? '+' : ''}{c.variance}</span>}
                    </td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{c.date}</td>
                    <td className="table-td"><span className={`${SB[c.status]} badge`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'cross-dock' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border"><h3 className="text-sm font-bold text-text-primary">Cross Docking</h3></div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Cross-Dock ID</th>
                <th className="table-th hidden sm:table-cell">Inbound PO</th>
                <th className="table-th hidden md:table-cell">Outbound Shipment</th>
                <th className="table-th">Items</th>
                <th className="table-th hidden lg:table-cell">Arrival</th>
                <th className="table-th hidden lg:table-cell">Dispatch</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {CROSS_DOCK.map(x=>(
                  <tr key={x.id} className="table-row">
                    <td className="table-td font-mono text-brand-700 text-xs">{x.id}</td>
                    <td className="table-td font-mono text-xs hidden sm:table-cell">{x.inbound}</td>
                    <td className="table-td font-mono text-xs hidden md:table-cell">{x.outbound}</td>
                    <td className="table-td font-bold">{x.items}</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{x.arrival}</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{x.dispatch}</td>
                    <td className="table-td"><span className={`${SB[x.status]} badge`}>{x.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'returns' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary">Returns Management (RMA)</h3>
            <button className="btn-primary text-xs">+ Create Return</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">RMA ID</th>
                <th className="table-th">Original Shipment</th>
                <th className="table-th hidden sm:table-cell">Customer</th>
                <th className="table-th hidden md:table-cell">Items</th>
                <th className="table-th hidden lg:table-cell">Reason</th>
                <th className="table-th text-right">Value</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {RETURNS.map(r=>(
                  <tr key={r.id} className="table-row">
                    <td className="table-td font-mono text-brand-700 text-xs">{r.id}</td>
                    <td className="table-td font-mono text-xs">{r.shipment}</td>
                    <td className="table-td text-text-primary text-xs hidden sm:table-cell">{r.customer}</td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{r.items}</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{r.reason}</td>
                    <td className="table-td text-right font-bold">€{r.value.toLocaleString()}</td>
                    <td className="table-td"><span className={`${SB[r.status]} badge`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'suppliers' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary">Supplier Management</h3>
            <button className="btn-primary text-xs">+ Add Supplier</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Supplier</th>
                <th className="table-th hidden sm:table-cell">Country</th>
                <th className="table-th">Orders</th>
                <th className="table-th hidden md:table-cell">On-Time Rate</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {SUPPLIERS.map(s=>(
                  <tr key={s.id} className="table-row">
                    <td className="table-td">
                      <p className="font-semibold text-text-primary text-xs sm:text-sm">{s.name}</p>
                      <p className="text-2xs text-text-disabled">{s.id}</p>
                    </td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{s.country}</td>
                    <td className="table-td text-text-secondary text-xs">{s.orders}</td>
                    <td className="table-td hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${s.ontime>=90?'bg-success':s.ontime>=80?'bg-info':'bg-warning'}`} style={{width:`${s.ontime}%`}}/>
                        </div>
                        <span className="text-xs font-bold">{s.ontime}%</span>
                      </div>
                    </td>
                    <td className="table-td"><span className={`${SB[s.status]} badge`}>{s.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
