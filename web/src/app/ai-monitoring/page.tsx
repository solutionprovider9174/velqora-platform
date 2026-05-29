'use client'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Bot, Sparkles, Package, Truck, Box, Warehouse } from 'lucide-react'

const FORECAST = ['W1','W2','W3','W4','W5','W6'].map((w,i)=>({week:w,actual:i<3?420-i*20:null,forecast:430+i*20}))
const ALERTS = [
  { icon:'📦', title:'Low stock risk detected', desc:'Battery Module 48V is below reorder level', time:'2 min ago', sev:'danger' },
  { icon:'⏱️', title:'Delayed shipment detected', desc:'Shipment SHP-00409 is currently delayed', time:'18 min ago', sev:'danger' },
  { icon:'🏭', title:'Warehouse capacity warning', desc:'WH-03 Jeddah is projected to reach 95% capacity', time:'1 hr ago', sev:'warning' },
  { icon:'🔧', title:'Equipment inspection needed', desc:'Asset EQ-SOLAR-0001 requires condition review', time:'2 hr ago', sev:'warning' },
  { icon:'📊', title:'Inventory movement anomaly', desc:'Outbound movement increased 28% vs last week', time:'4 hr ago', sev:'info' },
]
const RECS = [
  { priority:'High', title:'Reorder Battery Module 48V', impact:'Projected stockout in 4 days', action:'Create Reorder Task', icon: <Package size={16}/> },
  { priority:'Medium', title:'Transfer stock from WH-03 to WH-02', impact:'Balance inventory and reduce capacity pressure', action:'Initiate Transfer', icon: <Warehouse size={16}/> },
  { priority:'High', title:'Inspect equipment asset EQ-SOLAR-0001', impact:'Condition status requires review', action:'Open Asset Record', icon: <Box size={16}/> },
  { priority:'Low', title:'Review delayed shipments', impact:'2 shipments may need follow-up', action:'View Shipments', icon: <Truck size={16}/> },
]
const PC: Record<string,string> = { High:'badge-danger', Medium:'badge-warning', Low:'badge-info' }

export default function AiMonitoringPage() {
  return (
    <div className="responsive-page">
      <div className="page-header">
        <div className="flex items-start gap-3">
          <div>
            <h1 className="page-title flex items-center gap-2">AI Monitoring <span className="badge bg-warning/10 text-warning border border-warning/20">Preview</span></h1>
            <p className="page-subtitle">Monitor operational risks, low stock signals, shipment exceptions, and future AI recommendations.</p>
          </div>
        </div>
      </div>

      <div className="card p-4 sm:p-5 flex items-start gap-4 border-l-4 border-l-brand-600 bg-brand-50/30">
        <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
          <Bot size={24} className="text-brand-600" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-text-primary">AI Operational Summary</h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
            Inventory demand signals show a possible <strong className="text-text-primary">+18% increase next week</strong>. Battery Module 48V and DC Cable Roll are trending below reorder level. <strong className="text-text-primary">Two delayed shipments</strong> and <strong className="text-text-primary">one equipment inspection</strong> item require operational review.
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="badge-warning badge">3 actions needed</span>
            <span className="badge-info badge">2 forecasts ready</span>
            <span className="badge-danger badge">1 equipment alert</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <div className="card p-4 sm:p-5">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-text-primary">Inventory Demand Forecast</h3>
            <p className="text-xs text-text-secondary mt-0.5">Next 6 weeks — low stock and reorder prediction</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={FORECAST} margin={{top:4,right:8,left:-20,bottom:0}}>
              <defs>
                <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.2}/><stop offset="95%" stopColor="#1D4ED8" stopOpacity={0}/></linearGradient>
                <linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2}/><stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false}/>
              <XAxis dataKey="week" tick={{fontSize:11,fill:'#94A3B8'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'#94A3B8'}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{fontSize:12,borderRadius:8,border:'1px solid #E2E8F0'}}/>
              <Area type="monotone" dataKey="actual" stroke="#1D4ED8" fill="url(#ag1)" strokeWidth={2} name="Actual" connectNulls={false}/>
              <Area type="monotone" dataKey="forecast" stroke="#F59E0B" fill="url(#ag2)" strokeWidth={2} strokeDasharray="5 3" name="Forecast"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card overflow-hidden">
          <div className="p-4 sm:p-5 pb-0">
            <h3 className="text-sm font-bold text-text-primary">Operational Alerts &amp; Anomalies</h3>
            <p className="text-xs text-text-secondary mt-0.5">AI-detected operational events</p>
          </div>
          <div className="mt-4">
            {ALERTS.map(a => (
              <div key={a.title} className="flex items-start gap-3 px-4 sm:px-5 py-3 border-b border-border last:border-0 hover:bg-surface-secondary">
                <span className="text-base flex-shrink-0">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-text-primary">{a.title}</p>
                    <span className="text-2xs text-text-disabled whitespace-nowrap">{a.time}</span>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-text-primary">AI Recommendations</h3>
            <p className="text-xs text-text-secondary mt-0.5">Smart actions based on current operational data</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {RECS.map(r => (
            <div key={r.title} className="border border-border rounded-xl p-4 hover:border-brand-400 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">{r.icon}</div>
                <span className={`${PC[r.priority]} badge`}>{r.priority}</span>
              </div>
              <p className="text-sm font-semibold text-text-primary mt-2">{r.title}</p>
              <p className="text-xs text-text-secondary mt-1">{r.impact}</p>
              <button className="mt-3 text-xs text-brand-600 border border-brand-200 rounded-btn px-3 py-1.5 hover:bg-brand-50 transition-colors w-full">{r.action}</button>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4 sm:p-5 bg-brand-50/30 border border-brand-100">
        <div className="flex items-start gap-3">
          <Sparkles size={20} className="text-brand-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-text-primary">AI Monitoring Foundation</h3>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
              AI recommendations are currently based on operational rules and dashboard signals. Predictive AI models will be added progressively as operational data grows. Upcoming capabilities include demand forecasting, anomaly clustering, route optimisation, and intelligent equipment maintenance scheduling.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
