'use client'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import {
  Truck, AlertTriangle, Package, Box, Warehouse, ShoppingBag,
  Building2, Users, FileWarning, Activity, ArrowRight, Bot, Sparkles
} from 'lucide-react'
import Link from 'next/link'

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`card p-4 sm:p-5 ${className}`}>{children}</div>
}
function CardHead({ title, subtitle, action }: { title: React.ReactNode; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-4 gap-3">
      <div>
        <h3 className="text-sm font-bold text-text-primary">{title}</h3>
        {subtitle && <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

/* ── KPI Cards ── */
export function KpiCards() {
  const kpis = [
    { label: 'Active Shipments', value: '486', delta: '+12.5%', up: true, icon: <Truck size={18} />, bg: 'bg-brand-50', ic: 'text-brand-600' },
    { label: 'Delayed Shipments', value: '23', delta: '+4.2%', up: false, icon: <AlertTriangle size={18} />, bg: 'bg-danger/10', ic: 'text-danger' },
    { label: 'Low Stock Items', value: '7', delta: '+2', up: false, icon: <Package size={18} />, bg: 'bg-warning/10', ic: 'text-warning' },
    { label: 'Equipment Assets', value: '1,284', delta: '+8.1%', up: true, icon: <Box size={18} />, bg: 'bg-indigo-50', ic: 'text-indigo-600' },
    { label: 'Warehouses', value: '8', delta: '3 active', up: true, icon: <Warehouse size={18} />, bg: 'bg-success/10', ic: 'text-success' },
    { label: 'Products', value: '2,348', delta: '+24', up: true, icon: <ShoppingBag size={18} />, bg: 'bg-purple-50', ic: 'text-purple-600' },
  ]
  return (
    <div className="kpi-grid-6">
      {kpis.map(k => (
        <div key={k.label} className="card p-3 sm:p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className={`w-9 h-9 rounded-xl ${k.bg} ${k.ic} flex items-center justify-center flex-shrink-0`}>{k.icon}</div>
            <span className={`text-xs font-semibold ${k.up ? 'text-success' : 'text-danger'}`}>{k.delta}</span>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-text-primary leading-none">{k.value}</p>
            <p className="text-xs text-text-secondary mt-1.5 truncate">{k.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Shipment Status Summary ── */
const SHIPMENT_STATUSES = [
  { label: 'Created', count: 124, color: '#94A3B8', pct: 25 },
  { label: 'Ready for Dispatch', count: 68, color: '#3B82F6', pct: 14 },
  { label: 'In Transit', count: 198, color: '#1D4ED8', pct: 41 },
  { label: 'Delayed', count: 23, color: '#EF4444', pct: 5 },
  { label: 'Delivered', count: 712, color: '#10B981', pct: 13 },
  { label: 'Cancelled', count: 11, color: '#475569', pct: 2 },
]
export function ShipmentStatusSummary() {
  return (
    <Card>
      <CardHead title="Shipment Status Overview" subtitle="Current distribution across all workflows" />
      <div className="flex h-7 rounded-btn overflow-hidden mb-4 gap-0.5">
        {SHIPMENT_STATUSES.map(s => (
          <div key={s.label} style={{ width: `${s.pct}%`, background: s.color }} className="transition-all" title={`${s.label}: ${s.count}`} />
        ))}
      </div>
      <div className="space-y-2.5">
        {SHIPMENT_STATUSES.map(s => (
          <div key={s.label} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
              <span className="text-text-secondary truncate">{s.label}</span>
            </div>
            <span className="font-bold text-text-primary">{s.count}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ── Equipment Lifecycle Summary ── */
const EQUIPMENT_STATES = [
  { name: 'Installed', value: 845, color: '#10B981' },
  { name: 'In Stock', value: 312, color: '#1D4ED8' },
  { name: 'Maintenance', value: 67, color: '#F59E0B' },
  { name: 'Retired', value: 28, color: '#94A3B8' },
  { name: 'Inspection Due', value: 32, color: '#EF4444' },
]
export function EquipmentLifecycleSummary() {
  return (
    <Card>
      <CardHead title="Equipment Lifecycle Status" subtitle="Asset distribution by current state" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div className="relative">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={EQUIPMENT_STATES} cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={3} dataKey="value">
                {EQUIPMENT_STATES.map(d => <Cell key={d.name} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-black text-text-primary">1,284</span>
            <span className="text-2xs text-text-secondary">Total Assets</span>
          </div>
        </div>
        <div className="space-y-2">
          {EQUIPMENT_STATES.map(s => (
            <div key={s.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <span className="text-text-secondary truncate">{s.name}</span>
              </div>
              <span className="font-bold text-text-primary">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

/* ── Shipment Volume Chart ── */
const VOLUME_DATA = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => ({
  month: m, shipped: 40 + Math.round(Math.sin(i * 0.7) * 15 + i), delivered: 30 + Math.round(Math.cos(i * 0.5) * 12 + i * 0.8),
}))
export function ShipmentVolumeChart() {
  return (
    <Card>
      <CardHead title="Shipment Volume & Delivery Trend" subtitle="12-month operational performance"
        action={<span className="badge-brand badge">+15% vs last year</span>} />
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={VOLUME_DATA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} cursor={{ fill: 'rgba(29,78,216,0.04)' }} />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Bar dataKey="shipped" fill="#F59E0B" radius={[3, 3, 0, 0]} maxBarSize={28} name="Shipped" />
          <Line dataKey="delivered" stroke="#1D4ED8" strokeWidth={2} dot={{ fill: '#1D4ED8', r: 3 }} name="Delivered" />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  )
}

/* ── Operational Performance ── */
export function OperationalPerformance() {
  const rows = [
    { label: 'Shipments Delivered', value: '712', delta: '+12.5%', up: true, icon: <Truck size={14} /> },
    { label: 'Delayed Shipments', value: '23', delta: '+4', up: false, icon: <AlertTriangle size={14} /> },
    { label: 'Low Stock Items', value: '7', delta: '+2', up: false, icon: <Package size={14} /> },
    { label: 'Stock Movements Today', value: '142', delta: '+18%', up: true, icon: <Activity size={14} /> },
    { label: 'Equipment Installed', value: '845', delta: '+24', up: true, icon: <Box size={14} /> },
    { label: 'Open Exceptions', value: '12', delta: '-3', up: true, icon: <FileWarning size={14} /> },
  ]
  return (
    <Card>
      <CardHead title="Operational Performance" subtitle="Key metrics across operations" />
      <div className="space-y-3">
        {rows.map(r => (
          <div key={r.label} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-btn bg-surface-secondary flex items-center justify-center text-text-secondary flex-shrink-0">{r.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-text-secondary truncate">{r.label}</p>
              <p className={`text-xs font-semibold ${r.up ? 'text-success' : 'text-danger'}`}>{r.delta}</p>
            </div>
            <span className="text-sm font-bold text-text-primary whitespace-nowrap">{r.value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ── Operational Exceptions ── */
export function OperationalExceptions() {
  const items = [
    { icon: '⚠️', title: 'Low stock', count: 7, color: 'text-warning bg-warning/10' },
    { icon: '⏱️', title: 'Delayed shipments', count: 23, color: 'text-danger bg-danger/10' },
    { icon: '🔧', title: 'Equipment inspection needed', count: 32, color: 'text-amber-700 bg-amber-100' },
    { icon: '📦', title: 'Warehouse capacity warning', count: 2, color: 'text-warning bg-warning/10' },
    { icon: '📋', title: 'Missing tracking reference', count: 5, color: 'text-slate-700 bg-slate-100' },
  ]
  return (
    <Card>
      <CardHead title="Operational Exceptions" subtitle="Items requiring attention"
        action={<span className="badge-danger badge">{items.reduce((s, i) => s + i.count, 0)} total</span>} />
      <div className="space-y-2.5">
        {items.map(i => (
          <div key={i.title} className="flex items-center gap-3 p-2.5 rounded-btn hover:bg-surface-secondary cursor-pointer transition-colors">
            <div className={`w-8 h-8 rounded-btn flex items-center justify-center text-base ${i.color} flex-shrink-0`}>{i.icon}</div>
            <p className="text-sm text-text-primary flex-1 min-w-0 truncate">{i.title}</p>
            <span className="text-sm font-bold text-text-primary">{i.count}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ── Recent Equipment Activity ── */
export function RecentEquipmentActivity() {
  const events = [
    { icon: '✅', title: 'Solar panel installed', sub: 'EQ-SOLAR-0124 · Site A', time: '12 min ago' },
    { icon: '🔧', title: 'Inverter inspection scheduled', sub: 'EQ-INV-0044', time: '45 min ago' },
    { icon: '📦', title: 'Battery module received', sub: 'EQ-BAT-0238 · WH-01', time: '1 hr ago' },
    { icon: '⚠️', title: 'Maintenance flag raised', sub: 'EQ-INV-0038', time: '2 hr ago' },
    { icon: '✅', title: 'Heat pump commissioned', sub: 'EQ-HP-0009', time: '3 hr ago' },
  ]
  return (
    <Card>
      <CardHead title="Recent Equipment Activity" subtitle="Lifecycle events traceability"
        action={<Link href="/equipment" className="text-xs text-brand-600 font-semibold hover:underline">View all</Link>} />
      <div className="space-y-3">
        {events.map(e => (
          <div key={e.title} className="flex items-start gap-3">
            <span className="text-lg flex-shrink-0 mt-0.5">{e.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{e.title}</p>
              <p className="text-xs text-text-secondary truncate">{e.sub}</p>
            </div>
            <span className="text-2xs text-text-disabled whitespace-nowrap">{e.time}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ── Recent Shipments ── */
const SHIPMENTS = [
  { id: 'SHP-00412', customer: 'Gulf Freight LLC', origin: 'Dubai', dest: 'Riyadh', status: 'In Transit', priority: 'High', planned: 'Today 14:30' },
  { id: 'SHP-00411', customer: 'EuroTrans GmbH', origin: 'Jeddah', dest: 'Dammam', status: 'Delivered', priority: 'Normal', planned: 'Today 11:00' },
  { id: 'SHP-00410', customer: 'AsiaCargo Co.', origin: 'Riyadh', dest: 'Muscat', status: 'Ready', priority: 'Normal', planned: 'Tomorrow' },
  { id: 'SHP-00409', customer: 'Nordic Shipping', origin: 'Abu Dhabi', dest: 'Kuwait', status: 'Delayed', priority: 'Urgent', planned: 'Delayed' },
]
const STATUS_BADGE: Record<string, string> = {
  'Created':'badge-gray','Ready':'badge-info','Dispatched':'badge-indigo','In Transit':'badge-brand',
  'Delayed':'badge-danger','Delivered':'badge-success','Cancelled':'badge-danger','Returned':'badge-slate'
}
const PRIORITY_BADGE: Record<string, string> = {
  Low:'badge-gray', Normal:'badge-info', High:'badge-warning', Urgent:'badge-danger'
}
export function RecentShipments() {
  return (
    <div className="card overflow-hidden">
      <div className="p-4 sm:p-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-text-primary">Recent Shipments</h3>
          <p className="text-xs text-text-secondary mt-0.5">Latest operational records</p>
        </div>
        <Link href="/shipments" className="text-xs text-brand-600 font-semibold hover:underline flex items-center gap-1">
          View all <ArrowRight size={12} />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table-base min-w-[600px]">
          <thead>
            <tr>
              <th className="table-th">Shipment No.</th>
              <th className="table-th">Customer</th>
              <th className="table-th hidden md:table-cell">Route</th>
              <th className="table-th">Status</th>
              <th className="table-th">Priority</th>
              <th className="table-th hidden lg:table-cell">Planned Delivery</th>
            </tr>
          </thead>
          <tbody>
            {SHIPMENTS.map(s => (
              <tr key={s.id} className="table-row">
                <td className="table-td"><span className="font-semibold text-brand-700">{s.id}</span></td>
                <td className="table-td text-xs">{s.customer}</td>
                <td className="table-td text-text-secondary text-xs hidden md:table-cell">{s.origin} → {s.dest}</td>
                <td className="table-td"><span className={`${STATUS_BADGE[s.status]} badge`}><span className="w-1.5 h-1.5 rounded-full bg-current" />{s.status}</span></td>
                <td className="table-td"><span className={`${PRIORITY_BADGE[s.priority]} badge`}>{s.priority}</span></td>
                <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{s.planned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ── Low Stock Items ── */
export function LowStockItems() {
  const items = [
    { sku: 'SKU-44190', name: 'Battery module 48V', onHand: 38, min: 100, warehouse: 'WH-01 Dubai' },
    { sku: 'SKU-31802', name: 'DC cable roll 10mm', onHand: 12, min: 50, warehouse: 'WH-01 Dubai' },
    { sku: 'SKU-50041', name: 'Inverter spare fuse', onHand: 9, min: 50, warehouse: 'WH-02 Riyadh' },
    { sku: 'SKU-22014', name: 'Mounting hardware', onHand: 22, min: 80, warehouse: 'WH-03 Jeddah' },
  ]
  return (
    <div className="card overflow-hidden">
      <div className="p-4 sm:p-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-text-primary">Low Stock Items</h3>
          <p className="text-xs text-text-secondary mt-0.5">Below minimum threshold</p>
        </div>
        <Link href="/inventory" className="text-xs text-brand-600 font-semibold hover:underline flex items-center gap-1">
          View all <ArrowRight size={12} />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table-base min-w-[480px]">
          <thead>
            <tr>
              <th className="table-th">Product</th>
              <th className="table-th hidden md:table-cell">Warehouse</th>
              <th className="table-th">On Hand</th>
              <th className="table-th">Min</th>
              <th className="table-th"></th>
            </tr>
          </thead>
          <tbody>
            {items.map(i => (
              <tr key={i.sku} className="table-row">
                <td className="table-td">
                  <p className="font-semibold text-text-primary text-xs">{i.name}</p>
                  <p className="text-2xs text-text-disabled">{i.sku}</p>
                </td>
                <td className="table-td text-text-secondary text-xs hidden md:table-cell">{i.warehouse}</td>
                <td className="table-td"><span className="text-danger font-bold">{i.onHand}</span></td>
                <td className="table-td text-text-secondary text-xs">{i.min}</td>
                <td className="table-td"><button className="text-xs text-brand-600 hover:underline font-semibold whitespace-nowrap">Reorder</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ── Warehouse Capacity ── */
export function WarehouseCapacity() {
  const wh = [
    { id: 'WH-01', name: 'Dubai', pct: 74, units: '18,440', movements: 142, lowStock: 3, color: '#1D4ED8' },
    { id: 'WH-02', name: 'Riyadh', pct: 52, units: '12,180', movements: 87, lowStock: 2, color: '#10B981' },
    { id: 'WH-03', name: 'Jeddah', pct: 88, units: '18,300', movements: 156, lowStock: 2, color: '#F59E0B' },
  ]
  return (
    <Card>
      <CardHead title="Warehouse Capacity" subtitle="Capacity, inventory and movement overview"
        action={<Link href="/warehouse" className="text-xs text-brand-600 font-semibold hover:underline">Manage</Link>} />
      <div className="space-y-4">
        {wh.map(w => (
          <div key={w.id} className="border border-border rounded-card p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-bold text-text-primary">{w.name} ({w.id})</p>
                <p className="text-2xs text-text-secondary">{w.units} units · {w.movements} movements today · {w.lowStock} low stock</p>
              </div>
              <span className="text-base font-bold" style={{ color: w.color }}>{w.pct}%</span>
            </div>
            <div className="h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${w.pct}%`, background: w.color }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ── AI Monitoring Preview ── */
export function AiMonitoringPreview() {
  const insights = [
    { icon: '📦', text: '7 low stock items may require reorder', sev: 'warning' },
    { icon: '⏱️', text: '23 delayed shipments detected', sev: 'danger' },
    { icon: '🔧', text: '2 equipment assets need inspection', sev: 'amber' },
    { icon: '📊', text: 'Inventory demand trending +18% next week', sev: 'info' },
  ]
  return (
    <Card className="border-l-4 border-l-brand-600">
      <CardHead
        title={<span className="flex items-center gap-2"><Bot size={16} className="text-brand-600" /> AI Monitoring Preview</span>}
        subtitle="Operational signals from current data"
        action={<span className="badge bg-warning/10 text-warning border border-warning/20">Preview</span>}
      />
      <div className="space-y-2.5">
        {insights.map(i => (
          <div key={i.text} className="flex items-center gap-3 p-2.5 rounded-btn bg-surface-secondary">
            <span className="text-lg flex-shrink-0">{i.icon}</span>
            <p className="text-sm text-text-primary flex-1">{i.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-brand-50 border border-brand-100 rounded-btn flex items-start gap-2">
        <Sparkles size={14} className="text-brand-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-brand-700">
          <strong>Forecasting engine coming soon.</strong> Predictive AI models will be added progressively as operational data grows.
        </p>
      </div>
      <Link href="/ai-monitoring" className="mt-3 text-xs text-brand-600 hover:underline font-semibold flex items-center gap-1">
        Open AI Monitoring <ArrowRight size={12} />
      </Link>
    </Card>
  )
}
