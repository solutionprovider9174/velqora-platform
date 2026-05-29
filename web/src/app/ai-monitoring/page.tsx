'use client'
import { useState } from 'react'
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import {
  Bot, TrendingUp, Route, Package, Wrench, Truck, DollarSign,
  ShieldAlert, MessageSquare, FileText, Zap, Send, Sparkles
} from 'lucide-react'

type Tab = 'overview' | 'demand' | 'route' | 'inventory' | 'maintenance' | 'delay' | 'cost' | 'risk' | 'assistant' | 'reports' | 'automation'

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id:'overview',    label:'Overview',                icon:Sparkles },
  { id:'demand',      label:'Demand Forecasting',      icon:TrendingUp },
  { id:'route',       label:'Route Optimization',      icon:Route },
  { id:'inventory',   label:'Inventory Forecasting',   icon:Package },
  { id:'maintenance', label:'Maintenance Prediction',  icon:Wrench },
  { id:'delay',       label:'Shipment Delay',          icon:Truck },
  { id:'cost',        label:'Cost Optimization',       icon:DollarSign },
  { id:'risk',        label:'Finance Risk',            icon:ShieldAlert },
  { id:'assistant',   label:'AI Assistant',            icon:MessageSquare },
  { id:'reports',     label:'AI Reports',              icon:FileText },
  { id:'automation',  label:'Workflow Automation',     icon:Zap },
]

const DEMAND = ['W1','W2','W3','W4','W5','W6','W7','W8'].map((w,i)=>({
  w,
  actual: i<4 ? 420 + Math.round(Math.sin(i)*30) : null,
  forecast: 430 + Math.round(Math.sin(i*0.5)*40 + i*15),
  upper: 500 + i*20,
  lower: 380 + i*10,
}))

const ALERTS = [
  { icon:'📦', title:'Low stock risk detected',     desc:'Battery Module 48V — stockout predicted in 4 days',     time:'2m',  sev:'badge-danger',  cat:'Inventory' },
  { icon:'🚚', title:'Delayed shipment predicted',  desc:'SHP-00409 — 87% delay probability (customs hold)',      time:'18m', sev:'badge-warning', cat:'Shipment' },
  { icon:'🏭', title:'Capacity warning',            desc:'WH-03 Jeddah will reach 95% in ~3 days',                time:'1h',  sev:'badge-warning', cat:'Warehouse' },
  { icon:'🔧', title:'Maintenance prediction',      desc:'VH-TRK-031 engine failure risk in next 600km',          time:'3h',  sev:'badge-danger',  cat:'Maintenance' },
  { icon:'💰', title:'Payment risk detected',       desc:'AsiaCargo Co. — late payment probability 73%',          time:'5h',  sev:'badge-warning', cat:'Finance' },
]

const RECS = [
  { priority:'High',   title:'Reorder Battery Module 48V',     impact:'Avoids €18K stockout cost',           action:'Create PO' },
  { priority:'High',   title:'Reroute VH-TRK-022 via Aramco',  impact:'Saves €140 + avoids delay',           action:'Apply' },
  { priority:'Medium', title:'Transfer 80 units WH-03→WH-02',  impact:'Balances capacity',                   action:'Initiate' },
  { priority:'Low',    title:'Renegotiate INS-005 with Allianz',impact:'€420 lower premium',                 action:'Compare' },
]
const PC: Record<string,string> = { High:'badge-danger', Medium:'badge-warning', Low:'badge-info' }

const DELAY_PREDS = [
  { ship:'SHP-00409', route:'Abu Dhabi → Kuwait', risk:87, reason:'Customs hold at border',          eta:'Delayed 4h' },
  { ship:'SHP-00412', route:'Dubai → Riyadh',     risk:24, reason:'Light traffic, weather clear',    eta:'On time' },
  { ship:'SHP-00410', route:'Riyadh → Muscat',    risk:42, reason:'Driver hours-of-service limit',   eta:'Risk: 1h delay' },
  { ship:'SHP-00408', route:'Kuwait → Manama',    risk:18, reason:'All clear',                        eta:'On time' },
]

const MAINT_PRED = [
  { vehicle:'VH-TRK-031', component:'Engine', failure:92, action:'Service immediately', kmLeft:600,  cost:4800 },
  { vehicle:'VH-TRK-022', component:'Brakes', failure:64, action:'Schedule in 2 weeks', kmLeft:3200, cost:1200 },
  { vehicle:'VH-TRK-014', component:'Tires',  failure:48, action:'Monitor',             kmLeft:8400, cost:1800 },
  { vehicle:'VH-VAN-003', component:'Battery',failure:28, action:'No action',           kmLeft:14000,cost:280 },
]

const COST_OPS = [
  { area:'Fuel costs',        current:'€18.4K/mo', potential:'€16.2K/mo', savings:'€2.2K', pct:12 },
  { area:'Carrier fees',      current:'€42K/mo',   potential:'€38.5K/mo', savings:'€3.5K', pct:8 },
  { area:'Warehouse labor',   current:'€28K/mo',   potential:'€26.8K/mo', savings:'€1.2K', pct:4 },
  { area:'Insurance premiums',current:'€2.4K/mo',  potential:'€2.0K/mo',  savings:'€420',  pct:18 },
]

const RISKS = [
  { customer:'AsiaCargo Co.',     risk:73, amount:'€48K', days:62,  flag:'High late-payment probability' },
  { customer:'Mediterranean Co.', risk:42, amount:'€173K',days:35,  flag:'Increased order volume' },
  { customer:'Novaport SRL',      risk:38, amount:'€8K',  days:28,  flag:'Recently past due' },
  { customer:'Gulf Freight LLC',  risk:12, amount:'€50K', days:14,  flag:'Strong payment history' },
]

const ROUTES_AI = [
  { route:'Dubai → Riyadh',         km:1400, time:'14h', saved:'€180', co2:'-12%' },
  { route:'Jeddah → Dammam',        km:1300, time:'13h', saved:'€220', co2:'-18%' },
  { route:'Abu Dhabi → Kuwait',     km:1100, time:'11h', saved:'€140', co2:'-9%' },
  { route:'Riyadh 12-stop last-mile',km:340, time:'5h',  saved:'€60',  co2:'-22%' },
]

const REPORTS_GEN = [
  { name:'Q2 Operations Summary',     desc:'Auto-generated quarterly executive report',           date:'2024-05-29', status:'Ready' },
  { name:'Fleet Utilization Analysis',desc:'AI analysis of vehicle usage and recommendations',    date:'2024-05-28', status:'Ready' },
  { name:'Inventory Health Audit',    desc:'Stock movement patterns and anomaly detection',       date:'2024-05-27', status:'Generating' },
  { name:'Finance Risk Assessment',   desc:'Customer payment risk and AR aging analysis',         date:'2024-05-26', status:'Ready' },
]

const WORKFLOWS = [
  { name:'Auto-reorder low stock',          trigger:'Stock < reorder level', action:'Create PO + notify supplier',     runs:142, status:'Active' },
  { name:'Delayed shipment alert',          trigger:'Predicted delay > 60%',   action:'Email customer + ops team',       runs:38,  status:'Active' },
  { name:'Predictive maintenance booking',  trigger:'Failure risk > 80%',      action:'Schedule service + assign tech',  runs:24,  status:'Active' },
  { name:'Invoice payment reminder',        trigger:'Invoice 7 days overdue',  action:'Send reminder + flag CSM',        runs:88,  status:'Active' },
  { name:'Route re-optimization',           trigger:'Traffic delay detected',  action:'Recalc route + notify driver',    runs:64,  status:'Active' },
  { name:'Cycle count scheduling',          trigger:'Bin variance > 5%',       action:'Schedule recount',                runs:18,  status:'Paused' },
]

const SBADGE: Record<string,string> = { Ready:'badge-success', Generating:'badge-warning', Active:'badge-success', Paused:'badge-gray' }

export default function AiMonitoringPage() {
  const [tab, setTab] = useState<Tab>('overview')
  const [chatInput, setChatInput] = useState('')
  const [chatMessages] = useState([
    { role:'user',      text:'Which shipments are at risk of delay this week?' },
    { role:'assistant', text:'I found 2 shipments with elevated delay risk:\n\n• SHP-00409 (Abu Dhabi → Kuwait): 87% risk — customs hold at Kuwait border, ETA +4h.\n• SHP-00410 (Riyadh → Muscat): 42% risk — driver HoS limit approaching.\n\nWant me to draft customer notifications or reassign the second to a different driver?' },
    { role:'user',      text:'Show me the AR risk for AsiaCargo Co.' },
    { role:'assistant', text:'AsiaCargo Co. — Outstanding: €48K across 4 invoices. Oldest invoice 62 days past due. Payment-risk score: 73/100 (HIGH). Recommended actions: pause new shipments, contact AR team, consider payment plan. I can also surface their historical payment behavior over the last 12 months if helpful.' },
  ])

  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2">AI Operations Center <span className="badge bg-indigo-100 text-indigo-700 border border-indigo-200">Preview</span></h1>
          <p className="page-subtitle">Forecasting, anomaly detection, predictive maintenance, AI assistant, and workflow automation across all modules.</p>
        </div>
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
        <>
          <div className="card p-4 sm:p-5 flex items-start gap-4 border-l-4 border-indigo-600">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <Bot size={22} className="text-indigo-600"/>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-text-primary">AI Operational Summary</h2>
              <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                Inventory demand will likely <strong className="text-text-primary">rise 18% next week</strong>. Two shipments are at high delay risk. One vehicle (VH-TRK-031) needs urgent service to avoid breakdown. AR risk elevated for AsiaCargo Co. (€48K outstanding, 62d overdue).
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="badge-danger badge">5 critical alerts</span>
                <span className="badge-warning badge">4 recommendations</span>
                <span className="badge bg-indigo-100 text-indigo-700">3 forecasts ready</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <div className="card overflow-hidden">
              <div className="p-4 sm:p-5 pb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-text-primary">Operational Alerts &amp; Anomalies</h3>
                <span className="badge-danger badge">{ALERTS.length} active</span>
              </div>
              {ALERTS.map((a,i)=>(
                <div key={i} className="flex items-start gap-3 px-4 sm:px-5 py-3 border-t border-border hover:bg-surface-secondary">
                  <span className="text-base flex-shrink-0">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-text-primary">{a.title}</p>
                      <span className="text-2xs text-text-disabled whitespace-nowrap">{a.time}</span>
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5">{a.desc}</p>
                    <span className={`${a.sev} badge mt-1.5`}>{a.cat}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="card p-4 sm:p-5">
              <h3 className="text-sm font-bold text-text-primary mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                {RECS.map(r=>(
                  <div key={r.title} className="border border-border rounded-xl p-3 hover:border-indigo-300 transition-colors">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm font-semibold text-text-primary">{r.title}</p>
                      <span className={`${PC[r.priority]} badge flex-shrink-0`}>{r.priority}</span>
                    </div>
                    <p className="text-xs text-text-secondary">{r.impact}</p>
                    <button className="text-xs text-indigo-600 border border-indigo-200 rounded-btn px-3 py-1 hover:bg-indigo-50 mt-2">{r.action}</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {tab === 'demand' && (
        <div className="card p-4 sm:p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-text-primary">Demand Forecasting</h3>
              <p className="text-xs text-text-secondary mt-0.5">8-week prediction with confidence interval</p>
            </div>
            <span className="badge bg-indigo-100 text-indigo-700">Model: ARIMA + ML</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={DEMAND}>
              <defs>
                <linearGradient id="conf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.2}/><stop offset="100%" stopColor="#8B5CF6" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false}/>
              <XAxis dataKey="w" tick={{fontSize:11,fill:'#94A3B8'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'#94A3B8'}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
              <Legend wrapperStyle={{fontSize:12}}/>
              <Area type="monotone" dataKey="upper" stroke="#C4B5FD" strokeWidth={1} fill="url(#conf)" name="Upper bound"/>
              <Area type="monotone" dataKey="lower" stroke="#C4B5FD" strokeWidth={1} fill="#FFFFFF" name="Lower bound"/>
              <Line type="monotone" dataKey="actual"   stroke="#1D4ED8" strokeWidth={2.5} dot={{r:3}} name="Actual" connectNulls={false}/>
              <Line type="monotone" dataKey="forecast" stroke="#8B5CF6" strokeWidth={2.5} strokeDasharray="5 3" dot={{r:3}} name="Forecast"/>
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l:'Confidence', v:'89%',  c:'text-success' },
              { l:'MAPE',       v:'4.2%', c:'text-info' },
              { l:'Trend',      v:'+18%', c:'text-success' },
              { l:'Seasonality',v:'High', c:'text-warning' },
            ].map(s=>(
              <div key={s.l} className="bg-surface-secondary rounded-lg p-3">
                <p className="text-2xs text-text-secondary">{s.l}</p>
                <p className={`text-lg font-black ${s.c}`}>{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'route' && (
        <div className="card p-4 sm:p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-text-primary">Route Optimization AI</h3>
              <p className="text-xs text-text-secondary mt-0.5">Today's AI-optimized routes with savings</p>
            </div>
            <span className="badge bg-indigo-100 text-indigo-700">Saved €600 today</span>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[600px]">
              <thead><tr>
                <th className="table-th">Route</th>
                <th className="table-th">Distance</th>
                <th className="table-th">Time</th>
                <th className="table-th">Savings</th>
                <th className="table-th">CO₂ Reduction</th>
              </tr></thead>
              <tbody>
                {ROUTES_AI.map((r,i)=>(
                  <tr key={i} className="table-row">
                    <td className="table-td font-semibold text-text-primary text-xs sm:text-sm">{r.route}</td>
                    <td className="table-td text-text-secondary text-xs">{r.km} km</td>
                    <td className="table-td text-text-secondary text-xs">{r.time}</td>
                    <td className="table-td"><span className="badge-success badge">{r.saved}</span></td>
                    <td className="table-td"><span className="badge bg-emerald-100 text-emerald-700">{r.co2}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'inventory' && (
        <div className="card p-4 sm:p-5">
          <h3 className="text-sm font-bold text-text-primary mb-3">Inventory Forecasting</h3>
          <p className="text-xs text-text-secondary mb-4">AI-predicted stockouts and recommended reorder dates per SKU</p>
          <div className="space-y-3">
            {[
              { sku:'SKU-44190', name:'Battery Module 48V',  stockout:'4 days',  reorder:'Today',     conf:94 },
              { sku:'SKU-31802', name:'DC Cable Roll 10mm',  stockout:'8 days',  reorder:'In 2 days', conf:88 },
              { sku:'SKU-50041', name:'Inverter Spare Fuse', stockout:'12 days', reorder:'In 6 days', conf:81 },
              { sku:'SKU-44821', name:'Solar Inverter 5kW',  stockout:'48 days', reorder:'In 30 days',conf:92 },
            ].map(s=>(
              <div key={s.sku} className="border border-border rounded-xl p-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{s.name}</p>
                    <p className="text-2xs text-text-disabled">{s.sku}</p>
                  </div>
                  <span className="badge bg-indigo-100 text-indigo-700">{s.conf}% conf.</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-text-disabled">Predicted stockout</p>
                    <p className="font-bold text-danger">{s.stockout}</p>
                  </div>
                  <div>
                    <p className="text-text-disabled">Recommended reorder</p>
                    <p className="font-bold text-success">{s.reorder}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'maintenance' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border"><h3 className="text-sm font-bold text-text-primary">Predictive Maintenance</h3></div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Vehicle</th>
                <th className="table-th">Component</th>
                <th className="table-th">Failure Risk</th>
                <th className="table-th hidden sm:table-cell">Km Remaining</th>
                <th className="table-th hidden md:table-cell">Service Cost</th>
                <th className="table-th">Action</th>
              </tr></thead>
              <tbody>
                {MAINT_PRED.map((m,i)=>(
                  <tr key={i} className="table-row">
                    <td className="table-td font-semibold text-brand-700 text-xs">{m.vehicle}</td>
                    <td className="table-td text-text-secondary text-xs">{m.component}</td>
                    <td className="table-td">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${m.failure>=80?'bg-danger':m.failure>=50?'bg-warning':'bg-success'}`} style={{width:`${m.failure}%`}}/>
                        </div>
                        <span className="text-xs font-bold">{m.failure}%</span>
                      </div>
                    </td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{m.kmLeft.toLocaleString()} km</td>
                    <td className="table-td font-bold hidden md:table-cell">€{m.cost.toLocaleString()}</td>
                    <td className="table-td text-xs">{m.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'delay' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border"><h3 className="text-sm font-bold text-text-primary">Shipment Delay Prediction</h3></div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Shipment</th>
                <th className="table-th hidden sm:table-cell">Route</th>
                <th className="table-th">Delay Risk</th>
                <th className="table-th hidden md:table-cell">AI Reason</th>
                <th className="table-th">ETA Status</th>
              </tr></thead>
              <tbody>
                {DELAY_PREDS.map((d,i)=>(
                  <tr key={i} className="table-row">
                    <td className="table-td font-mono text-brand-700 text-xs">{d.ship}</td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{d.route}</td>
                    <td className="table-td">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${d.risk>=70?'bg-danger':d.risk>=40?'bg-warning':'bg-success'}`} style={{width:`${d.risk}%`}}/>
                        </div>
                        <span className="text-xs font-bold">{d.risk}%</span>
                      </div>
                    </td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{d.reason}</td>
                    <td className="table-td"><span className={`badge ${d.risk>=70?'badge-danger':d.risk>=40?'badge-warning':'badge-success'}`}>{d.eta}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'cost' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary">Cost Optimization Opportunities</h3>
            <span className="badge-success badge">Total potential: €7.3K/mo</span>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Area</th>
                <th className="table-th">Current</th>
                <th className="table-th hidden sm:table-cell">Potential</th>
                <th className="table-th">Savings</th>
                <th className="table-th hidden md:table-cell">Reduction</th>
              </tr></thead>
              <tbody>
                {COST_OPS.map((c,i)=>(
                  <tr key={i} className="table-row">
                    <td className="table-td font-semibold text-text-primary text-xs sm:text-sm">{c.area}</td>
                    <td className="table-td text-text-secondary">{c.current}</td>
                    <td className="table-td text-text-secondary hidden sm:table-cell">{c.potential}</td>
                    <td className="table-td font-bold text-success">{c.savings}</td>
                    <td className="table-td hidden md:table-cell"><span className="badge-success badge">-{c.pct}%</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'risk' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border"><h3 className="text-sm font-bold text-text-primary">Finance Risk Detection</h3></div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Customer</th>
                <th className="table-th">Risk Score</th>
                <th className="table-th hidden sm:table-cell">Outstanding</th>
                <th className="table-th hidden md:table-cell">Days Past Due</th>
                <th className="table-th hidden lg:table-cell">AI Flag</th>
              </tr></thead>
              <tbody>
                {RISKS.map((r,i)=>(
                  <tr key={i} className="table-row">
                    <td className="table-td font-semibold text-text-primary text-xs sm:text-sm">{r.customer}</td>
                    <td className="table-td">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${r.risk>=70?'bg-danger':r.risk>=40?'bg-warning':'bg-success'}`} style={{width:`${r.risk}%`}}/>
                        </div>
                        <span className="text-xs font-bold">{r.risk}</span>
                      </div>
                    </td>
                    <td className="table-td font-bold hidden sm:table-cell">{r.amount}</td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{r.days}d</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{r.flag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'assistant' && (
        <div className="card overflow-hidden flex flex-col" style={{ minHeight: 500 }}>
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center"><Bot size={18}/></div>
            <div>
              <h3 className="text-sm font-bold text-text-primary">Velqora AI Assistant</h3>
              <p className="text-2xs text-text-secondary">Ask anything about your operations, shipments, inventory, finance, or fleet</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((m,i)=>(
              <div key={i} className={`flex gap-2 ${m.role==='user'?'justify-end':'justify-start'}`}>
                {m.role==='assistant' && <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0"><Bot size={14}/></div>}
                <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm whitespace-pre-line ${m.role==='user'?'bg-brand-600 text-white':'bg-surface-secondary text-text-primary'}`}>
                  {m.text}
                </div>
                {m.role==='user' && <div className="w-7 h-7 rounded-full bg-brand-600 text-white text-2xs font-bold flex items-center justify-center flex-shrink-0">AK</div>}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Ask Velqora AI anything..." className="input flex-1"/>
              <button className="btn-primary"><Send size={14}/></button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {['Generate Q2 report','Top 5 customers by revenue','Why is SHP-00409 delayed?','Predict next week demand'].map(s=>(
                <button key={s} className="text-2xs px-2 py-1 rounded-full bg-surface-secondary text-text-secondary hover:bg-surface-tertiary border border-border">{s}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'reports' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary">AI Report Generation</h3>
            <button className="btn-primary text-xs">+ Generate New Report</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[600px]">
              <thead><tr>
                <th className="table-th">Report</th>
                <th className="table-th hidden sm:table-cell">Description</th>
                <th className="table-th hidden md:table-cell">Generated</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {REPORTS_GEN.map((r,i)=>(
                  <tr key={i} className="table-row">
                    <td className="table-td font-semibold text-text-primary text-xs sm:text-sm">{r.name}</td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{r.desc}</td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{r.date}</td>
                    <td className="table-td"><span className={`${SBADGE[r.status]} badge`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'automation' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary">AI Workflow Automation</h3>
            <button className="btn-primary text-xs">+ New Workflow</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[800px]">
              <thead><tr>
                <th className="table-th">Workflow</th>
                <th className="table-th hidden sm:table-cell">Trigger</th>
                <th className="table-th hidden md:table-cell">Action</th>
                <th className="table-th">Runs</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {WORKFLOWS.map((w,i)=>(
                  <tr key={i} className="table-row">
                    <td className="table-td font-semibold text-text-primary text-xs sm:text-sm">{w.name}</td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{w.trigger}</td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{w.action}</td>
                    <td className="table-td text-text-secondary text-xs">{w.runs}</td>
                    <td className="table-td"><span className={`${SBADGE[w.status]} badge`}>{w.status}</span></td>
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
