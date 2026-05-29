'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts'
import { Truck, MapPin, User, Route, Fuel, Wrench, Shield, FileText, Disc, AlertTriangle, Award, TrendingUp } from 'lucide-react'

type Tab = 'overview' | 'gps' | 'drivers' | 'vehicles' | 'routes' | 'fuel' | 'fuel-cost' | 'maintenance' | 'insurance' | 'documents' | 'tires' | 'breakdown' | 'scorecards'

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id:'overview',    label:'Overview',         icon:Truck },
  { id:'gps',         label:'GPS Tracking',     icon:MapPin },
  { id:'drivers',     label:'Driver Assignment',icon:User },
  { id:'vehicles',    label:'Vehicle Assignment',icon:Truck },
  { id:'routes',      label:'Route Optimization',icon:Route },
  { id:'fuel',        label:'Fuel Consumption', icon:Fuel },
  { id:'fuel-cost',   label:'Fuel Cost',        icon:TrendingUp },
  { id:'maintenance', label:'Maintenance',      icon:Wrench },
  { id:'insurance',   label:'Insurance',        icon:Shield },
  { id:'documents',   label:'Documents',        icon:FileText },
  { id:'tires',       label:'Tire Management',  icon:Disc },
  { id:'breakdown',   label:'Breakdown',        icon:AlertTriangle },
  { id:'scorecards',  label:'Driver Scorecards',icon:Award },
]

const VEHICLES = [
  { id:'VH-TRK-014', plate:'NL-87-FK-12', type:'Truck',  make:'Volvo FH16',   year:2022, driver:'M. Al-Rashid',  route:'Dubai → Riyadh',  fuel:82, status:'On Route',  speed:94, mileage:142800 },
  { id:'VH-TRK-007', plate:'NL-43-PQ-08', type:'Truck',  make:'Scania R500',  year:2021, driver:'Unassigned',    route:'Idle — Jeddah',   fuel:65, status:'Idle',      speed:0,  mileage:198400 },
  { id:'VH-TRK-022', plate:'NL-91-LM-44', type:'Truck',  make:'MAN TGX',      year:2023, driver:'K. Mansoor',    route:'AbuDhabi→Kuwait', fuel:21, status:'Fuel Alert',speed:87, mileage:88200 },
  { id:'VH-VAN-003', plate:'NL-22-XY-19', type:'Van',    make:'MB Sprinter',  year:2023, driver:'S. Al-Farsi',   route:'Riyadh last-mile',fuel:67, status:'On Route',  speed:62, mileage:42100 },
  { id:'VH-TRK-031', plate:'NL-67-RT-91', type:'Truck',  make:'DAF XF',       year:2020, driver:'J. Pieters',    route:'Maintenance bay', fuel:45, status:'Maintenance',speed:0, mileage:284500 },
]

const FUEL_DATA = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m,i)=>({
  month:m, consumption: 8500 + Math.round(Math.sin(i*0.5)*1200 + i*100), cost: 12800 + Math.round(Math.sin(i*0.5)*1800 + i*200)
}))

const DRIVERS = [
  { id:'D-001', name:'M. Al-Rashid',  license:'DL-2024-0014', expiry:'2026-08-12', vehicle:'VH-TRK-014', score:94, trips:142, status:'Available' },
  { id:'D-002', name:'K. Mansoor',    license:'DL-2024-0022', expiry:'2025-03-22', vehicle:'VH-TRK-022', score:88, trips:118, status:'On Trip' },
  { id:'D-003', name:'S. Al-Farsi',   license:'DL-2024-0003', expiry:'2026-11-04', vehicle:'VH-VAN-003', score:91, trips:284, status:'On Trip' },
  { id:'D-004', name:'J. Pieters',    license:'DL-2024-0031', expiry:'2024-09-18', vehicle:'VH-TRK-031', score:76, trips:98,  status:'Off Duty' },
  { id:'D-005', name:'F. El-Amin',    license:'DL-2024-0045', expiry:'2025-12-30', vehicle:'—',          score:82, trips:64,  status:'Available' },
]

const MAINTENANCE = [
  { id:'MNT-2041', vehicle:'VH-TRK-031', type:'Engine overhaul',      due:'2024-06-15', status:'In Progress', cost:4800 },
  { id:'MNT-2040', vehicle:'VH-TRK-014', type:'Oil change',           due:'2024-06-02', status:'Scheduled',   cost:280 },
  { id:'MNT-2039', vehicle:'VH-TRK-007', type:'Brake inspection',     due:'2024-06-08', status:'Scheduled',   cost:420 },
  { id:'MNT-2038', vehicle:'VH-VAN-003', type:'Tire rotation',        due:'2024-05-28', status:'Completed',   cost:180 },
  { id:'MNT-2037', vehicle:'VH-TRK-022', type:'Transmission service', due:'2024-07-12', status:'Scheduled',   cost:1200 },
]

const INSURANCE = [
  { id:'INS-001', vehicle:'VH-TRK-014', policy:'POL-2024-014', provider:'Allianz',    coverage:'Comprehensive', expiry:'2025-03-15', premium:4800, status:'Active' },
  { id:'INS-002', vehicle:'VH-TRK-007', policy:'POL-2024-007', provider:'AXA',        coverage:'Comprehensive', expiry:'2024-06-30', premium:4200, status:'Expiring' },
  { id:'INS-003', vehicle:'VH-TRK-022', policy:'POL-2024-022', provider:'Allianz',    coverage:'Comprehensive', expiry:'2025-11-22', premium:5200, status:'Active' },
  { id:'INS-004', vehicle:'VH-VAN-003', policy:'POL-2024-003', provider:'Generali',   coverage:'Third Party',   expiry:'2025-01-08', premium:1800, status:'Active' },
  { id:'INS-005', vehicle:'VH-TRK-031', policy:'POL-2024-031', provider:'Zurich',     coverage:'Comprehensive', expiry:'2024-05-20', premium:5800, status:'Expired' },
]

const TIRES = [
  { vehicle:'VH-TRK-014', position:'Front Left',  brand:'Michelin', installed:'2024-01-15', km:42800, wear:42, status:'Good' },
  { vehicle:'VH-TRK-014', position:'Front Right', brand:'Michelin', installed:'2024-01-15', km:42800, wear:44, status:'Good' },
  { vehicle:'VH-TRK-007', position:'Rear Left',   brand:'Bridgestone', installed:'2023-08-22', km:88200, wear:82, status:'Replace Soon' },
  { vehicle:'VH-TRK-022', position:'Front Left',  brand:'Continental', installed:'2023-11-08', km:34500, wear:28, status:'Good' },
  { vehicle:'VH-VAN-003', position:'Rear Right',  brand:'Pirelli',  installed:'2024-02-04', km:18200, wear:18, status:'Excellent' },
]

const BREAKDOWNS = [
  { id:'BD-1042', vehicle:'VH-TRK-031', date:'2024-05-22', issue:'Engine overheating',  location:'A4 highway, near Utrecht',     cost:2800, status:'Repaired' },
  { id:'BD-1041', vehicle:'VH-TRK-007', date:'2024-05-14', issue:'Battery failure',     location:'Jeddah port',                  cost:420,  status:'Repaired' },
  { id:'BD-1040', vehicle:'VH-VAN-003', date:'2024-04-30', issue:'Flat tire',           location:'Riyadh ring road',             cost:180,  status:'Repaired' },
  { id:'BD-1039', vehicle:'VH-TRK-022', date:'2024-04-12', issue:'AdBlue sensor fault', location:'Dubai DIC',                    cost:340,  status:'Repaired' },
]

const SCORECARDS = [
  { driver:'M. Al-Rashid',  trips:142, safety:96, fuel:94, punctuality:92, overall:94, grade:'A' },
  { driver:'S. Al-Farsi',   trips:284, safety:92, fuel:88, punctuality:94, overall:91, grade:'A' },
  { driver:'K. Mansoor',    trips:118, safety:88, fuel:85, punctuality:90, overall:88, grade:'B' },
  { driver:'F. El-Amin',    trips:64,  safety:84, fuel:82, punctuality:80, overall:82, grade:'B' },
  { driver:'J. Pieters',    trips:98,  safety:78, fuel:74, punctuality:76, overall:76, grade:'C' },
]

const SB: Record<string,string> = { 'On Route':'badge-info','Idle':'badge-gray','Maintenance':'badge-warning','Offline':'badge-slate','Fuel Alert':'badge-danger','Available':'badge-success','On Trip':'badge-info','Off Duty':'badge-gray','In Progress':'badge-warning','Scheduled':'badge-info','Completed':'badge-success','Active':'badge-success','Expiring':'badge-warning','Expired':'badge-danger','Good':'badge-success','Excellent':'badge-success','Replace Soon':'badge-warning','Repaired':'badge-success' }

export default function FleetPage() {
  const [tab, setTab] = useState<Tab>('overview')

  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2">Fleet Operations <span className="badge bg-warning/10 text-warning border border-warning/20">Preview</span></h1>
          <p className="page-subtitle">Complete fleet ERP — GPS tracking, drivers, routes, fuel, maintenance, insurance, tires, and performance scorecards.</p>
        </div>
        <button className="btn-primary text-xs sm:text-sm">+ Add Vehicle</button>
      </div>

      <div className="card overflow-hidden">
        <div className="flex overflow-x-auto border-b border-border">
          {TABS.map(t => {
            const Icon = t.icon
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap ${t.id===tab?'border-brand-600 text-brand-700 font-semibold bg-brand-50':'border-transparent text-text-secondary hover:text-text-primary'}`}>
                <Icon size={14}/>{t.label}
              </button>
            )
          })}
        </div>
      </div>

      {tab === 'overview' && (
        <>
          <div className="kpi-grid-6">
            {[
              { l:'Total Vehicles',     v:'42', c:'bg-brand-50 text-brand-700' },
              { l:'Active Vehicles',    v:'38', c:'bg-success/10 text-success' },
              { l:'On Route',           v:'24', c:'bg-info/10 text-info' },
              { l:'Maintenance Due',    v:'3',  c:'bg-warning/10 text-warning' },
              { l:'Total Drivers',      v:'56', c:'bg-purple-50 text-purple-700' },
              { l:'Avg Fleet Utilization', v:'87%', c:'bg-indigo-50 text-indigo-700' },
            ].map(k=>(
              <div key={k.l} className={`rounded-xl p-3 sm:p-4 ${k.c}`}>
                <div className="text-xl sm:text-2xl font-black">{k.v}</div>
                <div className="text-2xs sm:text-xs mt-0.5 opacity-80">{k.l}</div>
              </div>
            ))}
          </div>
          <div className="card p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-text-primary">Live Fleet Map</h3>
              <span className="badge-info badge">Future Integration</span>
            </div>
            <div className="bg-surface-secondary rounded-xl h-48 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border">
              <span className="text-5xl">🗺️</span>
              <p className="text-sm text-text-secondary text-center px-4">Live GPS map will display vehicle positions, routes, and geofences when a map provider (Google Maps / Mapbox) is connected.</p>
            </div>
          </div>
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-border"><h3 className="text-sm font-bold text-text-primary">Active Fleet</h3></div>
            <div className="overflow-x-auto">
              <table className="table-base min-w-[800px]">
                <thead><tr>
                  <th className="table-th">Vehicle ID</th>
                  <th className="table-th">Plate</th>
                  <th className="table-th hidden sm:table-cell">Make & Year</th>
                  <th className="table-th hidden md:table-cell">Driver</th>
                  <th className="table-th hidden lg:table-cell">Current Route</th>
                  <th className="table-th">Fuel</th>
                  <th className="table-th hidden xl:table-cell">Mileage</th>
                  <th className="table-th">Status</th>
                </tr></thead>
                <tbody>
                  {VEHICLES.map(v=>(
                    <tr key={v.id} className="table-row">
                      <td className="table-td font-semibold text-brand-700 text-xs">{v.id}</td>
                      <td className="table-td font-mono text-xs">{v.plate}</td>
                      <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{v.make} ({v.year})</td>
                      <td className="table-td text-text-secondary text-xs hidden md:table-cell">{v.driver}</td>
                      <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{v.route}</td>
                      <td className="table-td w-28 sm:w-36">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${v.fuel<30?'bg-danger':v.fuel<50?'bg-warning':'bg-success'}`} style={{width:`${v.fuel}%`}}/>
                          </div>
                          <span className={`text-2xs font-semibold w-8 text-right ${v.fuel<30?'text-danger':'text-text-primary'}`}>{v.fuel}%</span>
                        </div>
                      </td>
                      <td className="table-td text-text-secondary text-xs hidden xl:table-cell">{v.mileage.toLocaleString()} km</td>
                      <td className="table-td"><span className={`${SB[v.status]} badge`}>{v.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === 'gps' && (
        <div className="card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-text-primary">Real-Time GPS Tracking</h3>
              <p className="text-xs text-text-secondary mt-0.5">Live vehicle locations, geofences, and route history</p>
            </div>
            <span className="badge-info badge">Future Integration</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-surface-secondary rounded-xl h-72 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border">
              <span className="text-5xl">🛰️</span>
              <p className="text-sm text-text-secondary text-center px-4">GPS provider integration (Google Maps, Mapbox, Geotab) will render live vehicle positions and tracking.</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-text-secondary uppercase">Live Activity</p>
              {VEHICLES.filter(v=>v.status==='On Route').map(v=>(
                <div key={v.id} className="border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-brand-700">{v.id}</p>
                    <span className="badge-success badge text-2xs">{v.speed} km/h</span>
                  </div>
                  <p className="text-2xs text-text-secondary mt-1">{v.route}</p>
                  <p className="text-2xs text-text-disabled">Driver: {v.driver}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'drivers' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary">Driver Assignment</h3>
            <button className="btn-primary text-xs">+ Assign Driver</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Driver</th>
                <th className="table-th">License</th>
                <th className="table-th hidden sm:table-cell">License Expiry</th>
                <th className="table-th hidden md:table-cell">Vehicle</th>
                <th className="table-th">Score</th>
                <th className="table-th hidden lg:table-cell">Trips</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {DRIVERS.map(d=>(
                  <tr key={d.id} className="table-row">
                    <td className="table-td">
                      <p className="font-semibold text-text-primary text-xs sm:text-sm">{d.name}</p>
                      <p className="text-2xs text-text-disabled">{d.id}</p>
                    </td>
                    <td className="table-td font-mono text-xs">{d.license}</td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{d.expiry}</td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{d.vehicle}</td>
                    <td className="table-td"><span className={`font-bold ${d.score>=90?'text-success':d.score>=80?'text-info':'text-warning'}`}>{d.score}</span></td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{d.trips}</td>
                    <td className="table-td"><span className={`${SB[d.status]} badge`}>{d.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'vehicles' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary">Vehicle Assignment</h3>
            <button className="btn-primary text-xs">+ Assign Vehicle</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Vehicle</th>
                <th className="table-th">Type</th>
                <th className="table-th hidden sm:table-cell">Make</th>
                <th className="table-th hidden md:table-cell">Assigned Driver</th>
                <th className="table-th hidden lg:table-cell">Current Route</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {VEHICLES.map(v=>(
                  <tr key={v.id} className="table-row">
                    <td className="table-td font-semibold text-brand-700 text-xs">{v.id}</td>
                    <td className="table-td text-text-secondary text-xs">{v.type}</td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{v.make}</td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{v.driver}</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{v.route}</td>
                    <td className="table-td"><span className={`${SB[v.status]} badge`}>{v.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'routes' && (
        <div className="card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-text-primary">AI Route Optimization</h3>
              <p className="text-xs text-text-secondary mt-0.5">Optimal route calculation with traffic, fuel, and delivery windows</p>
            </div>
            <span className="badge-purple badge">AI-Powered</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border border-border rounded-xl p-4">
              <p className="text-xs font-bold text-text-secondary uppercase mb-2">Today's Optimization</p>
              <div className="space-y-3">
                {[
                  { route:'Dubai → Riyadh',         km:1400, time:'14h',  saved:'€180' },
                  { route:'Jeddah → Dammam',        km:1300, time:'13h',  saved:'€220' },
                  { route:'AbuDhabi → Kuwait',      km:1100, time:'11h',  saved:'€140' },
                  { route:'Riyadh last-mile (12 stops)', km:340,  time:'5h',   saved:'€60' },
                ].map((r,i)=>(
                  <div key={i} className="flex items-center justify-between text-xs border-b border-border pb-2 last:border-0">
                    <div>
                      <p className="font-semibold text-text-primary">{r.route}</p>
                      <p className="text-2xs text-text-disabled">{r.km} km · {r.time}</p>
                    </div>
                    <span className="badge-success badge">Saved {r.saved}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <p className="text-xs font-bold text-purple-700 uppercase mb-2">AI Recommendations</p>
              <ul className="space-y-2 text-xs text-purple-900">
                <li className="flex items-start gap-2"><span>💡</span> Consolidate VH-TRK-014 + VH-TRK-022 — save 240km on Dubai-Riyadh corridor</li>
                <li className="flex items-start gap-2"><span>⛽</span> Schedule refueling at Aramco station (km 540) — €0.08/L cheaper</li>
                <li className="flex items-start gap-2"><span>🕐</span> Depart 30min earlier to avoid Jeddah port congestion 14:00-16:00</li>
                <li className="flex items-start gap-2"><span>📦</span> Add 2 last-mile stops to Riyadh van — no impact on ETA</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {tab === 'fuel' && (
        <>
          <div className="kpi-grid-4">
            {[
              { l:'Total Consumption MTD', v:'8,420 L', c:'bg-warning/10 text-warning' },
              { l:'Avg per Vehicle',       v:'201 L',   c:'bg-brand-50 text-brand-700' },
              { l:'Most Efficient',        v:'VH-VAN-003', c:'bg-success/10 text-success' },
              { l:'Least Efficient',       v:'VH-TRK-031', c:'bg-danger/10 text-danger' },
            ].map(k=>(
              <div key={k.l} className={`rounded-xl p-3 sm:p-4 ${k.c}`}>
                <div className="text-base sm:text-xl font-black">{k.v}</div>
                <div className="text-2xs sm:text-xs mt-0.5 opacity-80">{k.l}</div>
              </div>
            ))}
          </div>
          <div className="card p-4 sm:p-5">
            <h3 className="text-sm font-bold text-text-primary mb-3">Fuel Consumption Trend</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={FUEL_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false}/>
                <XAxis dataKey="month" tick={{fontSize:11,fill:'#94A3B8'}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:'#94A3B8'}} axisLine={false} tickLine={false} tickFormatter={(v)=>`${v/1000}K L`}/>
                <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
                <Bar dataKey="consumption" fill="#F59E0B" radius={[3,3,0,0]} name="Liters"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {tab === 'fuel-cost' && (
        <>
          <div className="kpi-grid-4">
            {[
              { l:'Fuel Cost MTD',       v:'€18.4K', c:'bg-danger/10 text-danger' },
              { l:'Cost per km',         v:'€0.18',  c:'bg-warning/10 text-warning' },
              { l:'YTD Spent',           v:'€186K',  c:'bg-brand-50 text-brand-700' },
              { l:'Savings vs Budget',   v:'-4.2%',  c:'bg-success/10 text-success' },
            ].map(k=>(
              <div key={k.l} className={`rounded-xl p-3 sm:p-4 ${k.c}`}>
                <div className="text-base sm:text-xl font-black">{k.v}</div>
                <div className="text-2xs sm:text-xs mt-0.5 opacity-80">{k.l}</div>
              </div>
            ))}
          </div>
          <div className="card p-4 sm:p-5">
            <h3 className="text-sm font-bold text-text-primary mb-3">Fuel Cost Analysis</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={FUEL_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false}/>
                <XAxis dataKey="month" tick={{fontSize:11,fill:'#94A3B8'}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:'#94A3B8'}} axisLine={false} tickLine={false} tickFormatter={(v)=>`€${(v/1000).toFixed(0)}K`}/>
                <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
                <Line type="monotone" dataKey="cost" stroke="#EF4444" strokeWidth={2.5} dot={{r:4,fill:'#EF4444'}} name="Cost (€)"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {tab === 'maintenance' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary">Maintenance Planning</h3>
            <button className="btn-primary text-xs">+ Schedule Service</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Job ID</th>
                <th className="table-th">Vehicle</th>
                <th className="table-th">Type</th>
                <th className="table-th hidden sm:table-cell">Due Date</th>
                <th className="table-th text-right">Cost</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {MAINTENANCE.map(m=>(
                  <tr key={m.id} className="table-row">
                    <td className="table-td font-mono text-brand-700 text-xs">{m.id}</td>
                    <td className="table-td font-semibold text-text-primary text-xs">{m.vehicle}</td>
                    <td className="table-td text-xs">{m.type}</td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{m.due}</td>
                    <td className="table-td text-right font-bold">€{m.cost.toLocaleString()}</td>
                    <td className="table-td"><span className={`${SB[m.status]} badge`}>{m.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'insurance' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border"><h3 className="text-sm font-bold text-text-primary">Insurance Policies</h3></div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[800px]">
              <thead><tr>
                <th className="table-th">Policy</th>
                <th className="table-th">Vehicle</th>
                <th className="table-th hidden sm:table-cell">Provider</th>
                <th className="table-th hidden md:table-cell">Coverage</th>
                <th className="table-th hidden lg:table-cell">Expiry</th>
                <th className="table-th text-right">Premium</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {INSURANCE.map(p=>(
                  <tr key={p.id} className="table-row">
                    <td className="table-td font-mono text-brand-700 text-xs">{p.policy}</td>
                    <td className="table-td font-semibold text-text-primary text-xs">{p.vehicle}</td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{p.provider}</td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{p.coverage}</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{p.expiry}</td>
                    <td className="table-td text-right font-bold">€{p.premium.toLocaleString()}</td>
                    <td className="table-td"><span className={`${SB[p.status]} badge`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'documents' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title:'Vehicle Registrations', count:42, expiring:2, icon:'📋' },
            { title:'Driver Licenses',       count:56, expiring:3, icon:'🪪' },
            { title:'Insurance Policies',    count:42, expiring:2, icon:'🛡️' },
            { title:'MOT Certificates',      count:42, expiring:4, icon:'🔧' },
            { title:'Permits & Authorisations', count:18, expiring:1, icon:'📜' },
            { title:'Cargo Insurance',       count:24, expiring:0, icon:'📦' },
          ].map(d=>(
            <div key={d.title} className="card p-4">
              <div className="flex items-start justify-between mb-2">
                <span className="text-3xl">{d.icon}</span>
                {d.expiring>0 && <span className="badge-warning badge">{d.expiring} expiring</span>}
              </div>
              <p className="text-sm font-bold text-text-primary">{d.title}</p>
              <p className="text-2xs text-text-disabled mt-1">{d.count} documents stored</p>
              <button className="text-xs text-brand-600 font-semibold mt-2 hover:underline">Manage →</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'tires' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border"><h3 className="text-sm font-bold text-text-primary">Tire Management</h3></div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Vehicle</th>
                <th className="table-th">Position</th>
                <th className="table-th hidden sm:table-cell">Brand</th>
                <th className="table-th hidden md:table-cell">Installed</th>
                <th className="table-th">Km Driven</th>
                <th className="table-th">Wear</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {TIRES.map((t,i)=>(
                  <tr key={i} className="table-row">
                    <td className="table-td font-semibold text-brand-700 text-xs">{t.vehicle}</td>
                    <td className="table-td text-text-secondary text-xs">{t.position}</td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{t.brand}</td>
                    <td className="table-td text-text-secondary text-xs hidden md:table-cell">{t.installed}</td>
                    <td className="table-td text-xs">{t.km.toLocaleString()}</td>
                    <td className="table-td">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${t.wear>75?'bg-danger':t.wear>50?'bg-warning':'bg-success'}`} style={{width:`${t.wear}%`}}/>
                        </div>
                        <span className="text-2xs font-semibold">{t.wear}%</span>
                      </div>
                    </td>
                    <td className="table-td"><span className={`${SB[t.status]} badge`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'breakdown' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border"><h3 className="text-sm font-bold text-text-primary">Breakdown Management</h3></div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">ID</th>
                <th className="table-th">Vehicle</th>
                <th className="table-th hidden sm:table-cell">Date</th>
                <th className="table-th">Issue</th>
                <th className="table-th hidden lg:table-cell">Location</th>
                <th className="table-th text-right">Cost</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {BREAKDOWNS.map(b=>(
                  <tr key={b.id} className="table-row">
                    <td className="table-td font-mono text-brand-700 text-xs">{b.id}</td>
                    <td className="table-td font-semibold text-text-primary text-xs">{b.vehicle}</td>
                    <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{b.date}</td>
                    <td className="table-td text-xs">{b.issue}</td>
                    <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{b.location}</td>
                    <td className="table-td text-right font-bold">€{b.cost.toLocaleString()}</td>
                    <td className="table-td"><span className={`${SB[b.status]} badge`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'scorecards' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border"><h3 className="text-sm font-bold text-text-primary">Driver Performance Scorecards</h3></div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Driver</th>
                <th className="table-th">Trips</th>
                <th className="table-th hidden sm:table-cell">Safety</th>
                <th className="table-th hidden md:table-cell">Fuel</th>
                <th className="table-th hidden lg:table-cell">Punctuality</th>
                <th className="table-th">Overall</th>
                <th className="table-th">Grade</th>
              </tr></thead>
              <tbody>
                {SCORECARDS.map(s=>(
                  <tr key={s.driver} className="table-row">
                    <td className="table-td font-semibold text-text-primary text-xs sm:text-sm">{s.driver}</td>
                    <td className="table-td text-text-secondary text-xs">{s.trips}</td>
                    <td className="table-td hidden sm:table-cell"><span className="font-bold text-text-primary">{s.safety}</span></td>
                    <td className="table-td hidden md:table-cell"><span className="font-bold text-text-primary">{s.fuel}</span></td>
                    <td className="table-td hidden lg:table-cell"><span className="font-bold text-text-primary">{s.punctuality}</span></td>
                    <td className="table-td">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${s.overall>=90?'bg-success':s.overall>=80?'bg-info':'bg-warning'}`} style={{width:`${s.overall}%`}}/>
                        </div>
                        <span className="text-xs font-bold">{s.overall}</span>
                      </div>
                    </td>
                    <td className="table-td"><span className={`badge ${s.grade==='A'?'badge-success':s.grade==='B'?'badge-info':'badge-warning'}`}>{s.grade}</span></td>
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
