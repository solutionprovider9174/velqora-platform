'use client'
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, AlertTriangle, Bot, Truck, Fuel, Wrench, Smile, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const fmtEUR = (n: number) => '€' + (n >= 1000 ? (n/1000).toFixed(0) + 'K' : n.toString())

const REV = ['Jan','Feb','Mar','Apr','May','Jun'].map((m,i) => ({ m, v: 180000 + Math.round(Math.sin(i*0.6)*40000 + i*15000) }))
const PROFIT = ['Jan','Feb','Mar','Apr','May','Jun'].map((m,i) => ({ m, v: 60000 + Math.round(Math.sin(i*0.7)*15000 + i*4000) }))
const CASH = ['W1','W2','W3','W4'].map((m,i) => ({ m, inflow: 80000+i*12000, outflow: 60000+i*8000 }))

export function RevenueWidget() {
  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-text-secondary font-medium">Revenue</p>
          <p className="text-2xl font-black text-text-primary mt-0.5">€3.15M</p>
          <p className="text-xs text-success font-semibold mt-1 flex items-center gap-1"><TrendingUp size={11}/> +18% YoY</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-success/10 text-success flex items-center justify-center"><TrendingUp size={18}/></div>
      </div>
      <ResponsiveContainer width="100%" height={56}>
        <AreaChart data={REV}>
          <defs><linearGradient id="grev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10B981" stopOpacity={0.4}/><stop offset="100%" stopColor="#10B981" stopOpacity={0}/></linearGradient></defs>
          <Area type="monotone" dataKey="v" stroke="#10B981" strokeWidth={2} fill="url(#grev)"/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ProfitWidget() {
  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-text-secondary font-medium">Net Profit</p>
          <p className="text-2xl font-black text-text-primary mt-0.5">€574K</p>
          <p className="text-xs text-success font-semibold mt-1 flex items-center gap-1"><TrendingUp size={11}/> +24% YoY</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center"><TrendingUp size={18}/></div>
      </div>
      <ResponsiveContainer width="100%" height={56}>
        <LineChart data={PROFIT}>
          <Line type="monotone" dataKey="v" stroke="#1D4ED8" strokeWidth={2} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function CashFlowWidget() {
  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-text-secondary font-medium">Cash Flow</p>
          <p className="text-2xl font-black text-text-primary mt-0.5">€1.24M</p>
          <p className="text-xs text-success font-semibold mt-1 flex items-center gap-1"><TrendingUp size={11}/> +€86K this month</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center"><TrendingUp size={18}/></div>
      </div>
      <ResponsiveContainer width="100%" height={56}>
        <BarChart data={CASH}>
          <Bar dataKey="inflow" fill="#10B981" radius={[2,2,0,0]}/>
          <Bar dataKey="outflow" fill="#EF4444" radius={[2,2,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function CriticalAlertsWidget() {
  const alerts = [
    { sev:'critical', icon:'🚨', title:'WH-03 Jeddah at 95% capacity', sub:'Projected to be full in 18h',         time:'2m'  },
    { sev:'critical', icon:'⛽', title:'VH-TRK-022 fuel at 21%',          sub:'Mid-route Abu Dhabi → Kuwait',         time:'8m'  },
    { sev:'high',     icon:'📦', title:'Battery Module 48V — 38 units',  sub:'Below reorder, stockout in ~4 days', time:'14m' },
    { sev:'high',     icon:'⏱️', title:'SHP-00409 delayed 4 hours',      sub:'Customs hold at Kuwait border',        time:'1h'  },
    { sev:'medium',   icon:'🔧', title:'EQ-SOLAR-0001 inspection',       sub:'Past due 2 days',                      time:'2h'  },
  ]
  return (
    <div className="card overflow-hidden">
      <div className="p-4 sm:p-5 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-1.5"><AlertTriangle size={15} className="text-danger"/> Critical Alerts</h3>
          <p className="text-xs text-text-secondary mt-0.5">Requires immediate attention</p>
        </div>
        <span className="badge-danger badge">{alerts.length} active</span>
      </div>
      <div>
        {alerts.map((a,i)=>(
          <div key={i} className="flex items-start gap-3 px-4 sm:px-5 py-3 border-t border-border hover:bg-surface-secondary">
            <div className={`w-8 h-8 rounded-btn flex items-center justify-center text-base flex-shrink-0 ${a.sev==='critical'?'bg-danger/10':a.sev==='high'?'bg-warning/10':'bg-info/10'}`}>{a.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-text-primary">{a.title}</p>
                <span className="text-2xs text-text-disabled whitespace-nowrap">{a.time}</span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">{a.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AiRecommendationsWidget() {
  const recs = [
    { priority:'High',   icon:'🧠', title:'Reorder Battery Module 48V now',     impact:'Avoids €18K stockout cost',         action:'Create PO' },
    { priority:'High',   icon:'🚛', title:'Reroute VH-TRK-022 via Aramco fuel', impact:'Saves €140 + avoids delay',         action:'Apply' },
    { priority:'Medium', icon:'⚖️', title:'Transfer 80 units WH-03 → WH-02',    impact:'Balances capacity, frees 12%',      action:'Initiate' },
    { priority:'Medium', icon:'📊', title:'Bundle 12 last-mile Riyadh stops',   impact:'Cuts route cost 22%',               action:'Optimize' },
    { priority:'Low',    icon:'💡', title:'Renew INS-005 with Allianz',         impact:'€420 lower premium',                action:'Compare' },
  ]
  const PC: Record<string,string> = { High:'badge-danger', Medium:'badge-warning', Low:'badge-info' }
  return (
    <div className="card overflow-hidden">
      <div className="p-4 sm:p-5 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-1.5"><Bot size={15} className="text-indigo-600"/> AI Recommendations</h3>
          <p className="text-xs text-text-secondary mt-0.5">Smart actions based on live data</p>
        </div>
        <span className="badge bg-indigo-100 text-indigo-700">5 ready</span>
      </div>
      <div>
        {recs.map((r,i)=>(
          <div key={i} className="flex items-start gap-3 px-4 sm:px-5 py-3 border-t border-border hover:bg-surface-secondary">
            <span className="text-xl flex-shrink-0">{r.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-text-primary">{r.title}</p>
                <span className={`${PC[r.priority]} badge flex-shrink-0`}>{r.priority}</span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">{r.impact}</p>
              <button className="text-xs text-indigo-600 font-semibold mt-1 hover:underline">{r.action} →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DriverPerformanceWidget() {
  const drivers = [
    { name:'M. Al-Rashid', score:94, grade:'A' },
    { name:'S. Al-Farsi',  score:91, grade:'A' },
    { name:'K. Mansoor',   score:88, grade:'B' },
    { name:'F. El-Amin',   score:82, grade:'B' },
  ]
  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-text-secondary font-medium">Driver Performance</p>
          <p className="text-2xl font-black text-text-primary mt-0.5">88 <span className="text-sm text-text-secondary font-medium">avg</span></p>
          <p className="text-xs text-success font-semibold mt-1 flex items-center gap-1"><TrendingUp size={11}/> +3 pts MoM</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center"><Truck size={18}/></div>
      </div>
      <div className="space-y-1.5 mt-3">
        {drivers.map(d=>(
          <div key={d.name} className="flex items-center gap-2">
            <span className="text-2xs text-text-secondary truncate flex-1">{d.name}</span>
            <div className="w-16 h-1 bg-surface-tertiary rounded-full overflow-hidden">
              <div className={`h-full ${d.score>=90?'bg-success':d.score>=80?'bg-info':'bg-warning'}`} style={{width:`${d.score}%`}}/>
            </div>
            <span className="text-2xs font-bold w-4 text-right">{d.grade}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FuelConsumptionWidget() {
  const data = ['M','T','W','T','F','S','S'].map((d,i)=>({ d, v: 1100+Math.round(Math.sin(i)*200+i*40) }))
  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-text-secondary font-medium">Fuel Consumption</p>
          <p className="text-2xl font-black text-text-primary mt-0.5">8,420 <span className="text-sm text-text-secondary font-medium">L</span></p>
          <p className="text-xs text-warning font-semibold mt-1 flex items-center gap-1"><TrendingUp size={11}/> +6.2% WoW</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-warning/10 text-warning flex items-center justify-center"><Fuel size={18}/></div>
      </div>
      <ResponsiveContainer width="100%" height={56}>
        <BarChart data={data}>
          <Bar dataKey="v" fill="#F59E0B" radius={[2,2,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-2xs text-text-disabled mt-1">€0.18/km · Last 7 days</p>
    </div>
  )
}

export function MaintenanceDueWidget() {
  const items = [
    { v:'VH-TRK-031', t:'Engine overhaul',  d:'Today',     sev:'danger' },
    { v:'VH-TRK-014', t:'Oil change',       d:'In 3 days', sev:'warning' },
    { v:'VH-TRK-007', t:'Brake inspection', d:'In 8 days', sev:'info' },
  ]
  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-text-secondary font-medium">Maintenance Due</p>
          <p className="text-2xl font-black text-text-primary mt-0.5">3 <span className="text-sm text-text-secondary font-medium">items</span></p>
          <p className="text-xs text-danger font-semibold mt-1 flex items-center gap-1">1 overdue</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center"><Wrench size={18}/></div>
      </div>
      <div className="space-y-2 mt-2">
        {items.map((it,i)=>(
          <div key={i} className="flex items-center justify-between gap-2 border-t border-border pt-2 first:border-0 first:pt-0">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-brand-700">{it.v}</p>
              <p className="text-2xs text-text-secondary truncate">{it.t}</p>
            </div>
            <span className={`badge text-2xs ${it.sev==='danger'?'badge-danger':it.sev==='warning'?'badge-warning':'badge-info'}`}>{it.d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CustomerSatisfactionWidget() {
  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-text-secondary font-medium">Customer Satisfaction</p>
          <p className="text-2xl font-black text-text-primary mt-0.5">4.7<span className="text-sm text-text-secondary font-medium">/5</span></p>
          <p className="text-xs text-success font-semibold mt-1 flex items-center gap-1"><TrendingUp size={11}/> +0.2 vs Q1</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-success/10 text-success flex items-center justify-center"><Smile size={18}/></div>
      </div>
      <div className="space-y-1.5 mt-3">
        {[
          { l:'On-time delivery', v:98 },
          { l:'Product quality',  v:96 },
          { l:'Support response', v:92 },
          { l:'Communication',    v:89 },
        ].map(s=>(
          <div key={s.l} className="flex items-center gap-2">
            <span className="text-2xs text-text-secondary truncate flex-1">{s.l}</span>
            <div className="w-16 h-1 bg-surface-tertiary rounded-full overflow-hidden">
              <div className="h-full bg-success" style={{width:`${s.v}%`}}/>
            </div>
            <span className="text-2xs font-bold w-7 text-right">{s.v}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RealTimeMapWidget() {
  return (
    <div className="card overflow-hidden">
      <div className="p-4 sm:p-5 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-1.5"><MapPin size={15} className="text-brand-600"/> Real-Time Fleet Map</h3>
          <p className="text-xs text-text-secondary mt-0.5">Live positions across active routes</p>
        </div>
        <span className="badge bg-info/10 text-info">Future Integration</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        <div className="lg:col-span-2 bg-gradient-to-br from-brand-50 to-indigo-50 relative" style={{ minHeight: 280 }}>
          <svg viewBox="0 0 400 280" className="w-full h-full">
            {/* Stylized continents outline */}
            <path d="M 50 80 Q 90 60 130 80 T 220 90 Q 260 100 290 80 L 320 110 Q 280 130 240 125 T 150 115 Q 100 110 50 80 Z" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="0.8" opacity="0.7"/>
            <path d="M 180 150 Q 220 145 260 160 T 340 175 L 360 210 Q 320 220 280 215 T 200 200 Q 170 180 180 150 Z" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="0.8" opacity="0.7"/>
            {/* Routes */}
            <path d="M 100 90 Q 180 120 240 100" stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="4 3" fill="none"/>
            <path d="M 240 100 Q 290 140 300 180" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 3" fill="none"/>
            <path d="M 200 170 Q 250 190 280 200" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 3" fill="none"/>
            {/* Vehicle dots */}
            <circle cx="100" cy="90" r="5" fill="#1D4ED8"><animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/></circle>
            <circle cx="180" cy="105" r="4" fill="#1D4ED8"/>
            <circle cx="240" cy="100" r="5" fill="#10B981"/>
            <circle cx="290" cy="155" r="4" fill="#10B981"><animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/></circle>
            <circle cx="300" cy="180" r="5" fill="#EF4444"/>
            <circle cx="250" cy="190" r="4" fill="#F59E0B"><animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/></circle>
            {/* Labels */}
            <text x="105" y="80" fontSize="8" fill="#1E40AF" fontWeight="700">Rotterdam</text>
            <text x="245" y="92" fontSize="8" fill="#1E40AF" fontWeight="700">Dubai</text>
            <text x="305" y="172" fontSize="8" fill="#B45309" fontWeight="700">Riyadh</text>
            <text x="255" y="205" fontSize="8" fill="#92400E" fontWeight="700">Jeddah</text>
          </svg>
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-lg px-3 py-2 text-2xs">
            <p className="font-bold text-text-primary mb-1">Active Routes</p>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand-600"/><span className="text-text-secondary">In transit (24)</span></div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-success"/><span className="text-text-secondary">On schedule (18)</span></div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-warning"/><span className="text-text-secondary">Delayed (3)</span></div>
          </div>
        </div>
        <div className="p-4 sm:p-5 border-l border-border space-y-2 overflow-y-auto" style={{ maxHeight: 280 }}>
          <p className="text-xs font-bold text-text-secondary uppercase">Live Activity</p>
          {[
            { id:'VH-TRK-014', loc:'A4 km 142', speed:'94 km/h', eta:'14:30', tag:'badge-success' },
            { id:'VH-TRK-022', loc:'E11 km 88', speed:'87 km/h', eta:'17:00', tag:'badge-danger'  },
            { id:'VH-VAN-003', loc:'Riyadh ring', speed:'62 km/h', eta:'12:45', tag:'badge-success' },
            { id:'VH-TRK-031', loc:'WH-02 bay', speed:'idle',     eta:'maint.',tag:'badge-warning' },
          ].map(v=>(
            <div key={v.id} className="border border-border rounded-lg p-2.5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-brand-700">{v.id}</p>
                <span className={`${v.tag} badge text-2xs`}>{v.speed}</span>
              </div>
              <p className="text-2xs text-text-secondary truncate">📍 {v.loc}</p>
              <p className="text-2xs text-text-disabled">ETA: {v.eta}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
