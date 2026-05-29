'use client'
import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import {
  DollarSign, TrendingUp, TrendingDown, FileText, Wallet, Receipt,
  CreditCard, PiggyBank, Calculator, Building2, Banknote, RefreshCw, BarChart3
} from 'lucide-react'

type Tab = 'overview' | 'gl' | 'ar' | 'ap' | 'pnl' | 'balance' | 'cashflow' | 'cost-centers' | 'budget' | 'tax' | 'invoices' | 'subscriptions' | 'reconciliation' | 'banking'

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'overview',       label: 'Overview',              icon: BarChart3 },
  { id: 'gl',             label: 'General Ledger',        icon: FileText },
  { id: 'ar',             label: 'Accounts Receivable',   icon: TrendingUp },
  { id: 'ap',             label: 'Accounts Payable',      icon: TrendingDown },
  { id: 'pnl',            label: 'Profit & Loss',         icon: BarChart3 },
  { id: 'balance',        label: 'Balance Sheet',         icon: Wallet },
  { id: 'cashflow',       label: 'Cash Flow',             icon: RefreshCw },
  { id: 'cost-centers',   label: 'Cost Centers',          icon: Building2 },
  { id: 'budget',         label: 'Budget',                icon: PiggyBank },
  { id: 'tax',            label: 'Tax',                   icon: Calculator },
  { id: 'invoices',       label: 'Invoices',              icon: Receipt },
  { id: 'subscriptions',  label: 'Subscriptions',         icon: CreditCard },
  { id: 'reconciliation', label: 'Reconciliation',        icon: Banknote },
  { id: 'banking',        label: 'Banking',               icon: DollarSign },
]

const REV_DATA = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m,i)=>({
  month:m,
  revenue: 180000 + Math.round(Math.sin(i*0.6)*40000 + i*8000),
  expenses: 120000 + Math.round(Math.cos(i*0.5)*20000 + i*5000),
  profit: 60000 + Math.round(Math.sin(i*0.7)*15000 + i*3000),
}))

const PNL = [
  { category:'Revenue', items:[
    { name:'Logistics services', amount:2450000, pct:78 },
    { name:'Warehouse storage', amount:480000, pct:15 },
    { name:'Equipment sales', amount:220000, pct:7 },
  ], total:3150000 },
  { category:'Cost of revenue', items:[
    { name:'Carrier costs', amount:980000, pct:62 },
    { name:'Warehouse labor', amount:340000, pct:21 },
    { name:'Equipment cost', amount:140000, pct:9 },
    { name:'Fuel & maintenance', amount:128000, pct:8 },
  ], total:1588000 },
  { category:'Operating expenses', items:[
    { name:'Salaries & benefits', amount:540000, pct:55 },
    { name:'Rent & utilities', amount:180000, pct:18 },
    { name:'IT & software', amount:120000, pct:12 },
    { name:'Marketing', amount:90000, pct:9 },
    { name:'Other', amount:58000, pct:6 },
  ], total:988000 },
]

const BS_ASSETS = [
  { name:'Cash & equivalents', amount:1240000 },
  { name:'Accounts receivable', amount:680000 },
  { name:'Inventory', amount:1850000 },
  { name:'Equipment & fleet', amount:3420000 },
  { name:'Property', amount:2100000 },
]
const BS_LIAB = [
  { name:'Accounts payable', amount:420000 },
  { name:'Short-term debt', amount:280000 },
  { name:'Long-term debt', amount:1850000 },
  { name:'Tax payable', amount:142000 },
]
const BS_EQUITY = [
  { name:'Share capital', amount:2000000 },
  { name:'Retained earnings', amount:4598000 },
]

const CASH_FLOW = ['Q1','Q2','Q3','Q4'].map((q,i)=>({
  quarter:q,
  operating: 320000 + i*40000,
  investing: -180000 - i*20000,
  financing: -80000 - i*10000,
  net: 60000 + i*10000,
}))

const COST_CENTERS = [
  { id:'CC-001', name:'Logistics Operations',     budget:540000, spent:482000, pct:89, status:'On Track' },
  { id:'CC-002', name:'Warehouse Management',     budget:380000, spent:412000, pct:108,status:'Over Budget' },
  { id:'CC-003', name:'Fleet & Maintenance',      budget:280000, spent:198000, pct:71, status:'On Track' },
  { id:'CC-004', name:'IT & Engineering',         budget:420000, spent:386000, pct:92, status:'On Track' },
  { id:'CC-005', name:'Sales & Marketing',        budget:240000, spent:264000, pct:110,status:'Over Budget' },
  { id:'CC-006', name:'Admin & Finance',          budget:180000, spent:142000, pct:79, status:'On Track' },
]

const INVOICES = [
  { no:'INV-2024-1142', customer:'Gulf Freight LLC',   amount:12500, cur:'EUR', issued:'2024-05-12', due:'2024-06-11', status:'Paid' },
  { no:'INV-2024-1141', customer:'EuroTrans GmbH',     amount:8200,  cur:'EUR', issued:'2024-05-14', due:'2024-06-13', status:'Pending' },
  { no:'INV-2024-1140', customer:'AsiaCargo Co.',      amount:22800, cur:'USD', issued:'2024-05-01', due:'2024-05-31', status:'Overdue' },
  { no:'INV-2024-1139', customer:'Nordic Shipping',    amount:5600,  cur:'EUR', issued:'2024-05-18', due:'2024-06-17', status:'Paid' },
  { no:'INV-2024-1138', customer:'Mediterranean Co.',  amount:9400,  cur:'EUR', issued:'2024-05-20', due:'2024-06-19', status:'Draft' },
]

const AR_AGING = [
  { bucket:'Current (0-30d)', amount:480000, pct:71 },
  { bucket:'31-60 days',      amount:120000, pct:18 },
  { bucket:'61-90 days',      amount:55000,  pct:8 },
  { bucket:'90+ days',        amount:25000,  pct:4 },
]

const AP_AGING = [
  { bucket:'Current (0-30d)', amount:298000, pct:71 },
  { bucket:'31-60 days',      amount:82000,  pct:20 },
  { bucket:'61-90 days',      amount:28000,  pct:7 },
  { bucket:'90+ days',        amount:12000,  pct:3 },
]

const TAX = [
  { jurisdiction:'Netherlands', type:'VAT 21%', period:'Q2 2024', amount:142000, status:'Due Soon' },
  { jurisdiction:'Germany',     type:'VAT 19%', period:'Q2 2024', amount:88000,  status:'Filed' },
  { jurisdiction:'UAE',         type:'VAT 5%',  period:'Q2 2024', amount:24000,  status:'Pending' },
  { jurisdiction:'Saudi Arabia',type:'VAT 15%', period:'Q2 2024', amount:36000,  status:'Pending' },
]

const SUBS = [
  { id:'SUB-001', customer:'Gulf Logistics Group', plan:'Enterprise', mrr:2400, status:'Active', renewal:'2024-12-01' },
  { id:'SUB-002', customer:'EuroFreight GmbH',     plan:'Professional', mrr:890, status:'Active', renewal:'2024-08-15' },
  { id:'SUB-003', customer:'Novaport SRL',         plan:'Starter', mrr:290, status:'Past Due', renewal:'2024-06-01' },
  { id:'SUB-004', customer:'AsiaCargo Co.',        plan:'Enterprise', mrr:2400, status:'Active', renewal:'2024-09-20' },
]

const BANK_ACCOUNTS = [
  { id:'BA-001', bank:'ABN AMRO',    iban:'NL91 ABNA 0417 1643 00', currency:'EUR', balance:842000, status:'Connected' },
  { id:'BA-002', bank:'Deutsche Bank',iban:'DE89 3704 0044 0532 0130 00', currency:'EUR', balance:218000, status:'Connected' },
  { id:'BA-003', bank:'Emirates NBD', iban:'AE07 0331 2345 6789 0123 456', currency:'AED', balance:1240000, status:'Pending' },
]

const SBADGE: Record<string,string> = { Paid:'badge-success', Pending:'badge-warning', Overdue:'badge-danger', Draft:'badge-gray', Cancelled:'badge-gray', 'On Track':'badge-success', 'Over Budget':'badge-danger', 'Due Soon':'badge-warning', Filed:'badge-success', Active:'badge-success', 'Past Due':'badge-danger', Connected:'badge-success', Reconciled:'badge-success', Disputed:'badge-danger' }

function fmtEUR(n: number) { return '€' + n.toLocaleString('en-EU', { maximumFractionDigits: 0 }) }

export default function FinancePage() {
  const [tab, setTab] = useState<Tab>('overview')

  const bsAssetsTotal = BS_ASSETS.reduce((s,b)=>s+b.amount,0)
  const bsLiabTotal = BS_LIAB.reduce((s,b)=>s+b.amount,0)
  const bsEquityTotal = BS_EQUITY.reduce((s,b)=>s+b.amount,0)

  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2">Finance &amp; Accounting <span className="badge bg-warning/10 text-warning border border-warning/20">Preview</span></h1>
          <p className="page-subtitle">Complete finance ERP — GL, AR/AP, P&amp;L, balance sheet, cash flow, budgeting, tax, invoicing, and banking.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="btn-outline text-xs sm:text-sm">Export</button>
          <button className="btn-primary text-xs sm:text-sm">+ New Invoice</button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="flex overflow-x-auto border-b border-border">
          {TABS.map(t => {
            const Icon = t.icon
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap ${t.id===tab?'border-brand-600 text-brand-700 font-semibold bg-brand-50':'border-transparent text-text-secondary hover:text-text-primary'}`}>
                <Icon size={14} />
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {tab === 'overview' && (
        <>
          <div className="kpi-grid-6">
            {[
              { l:'Total Revenue',      v:'€3.15M', d:'+18%', up:true,  c:'bg-success/10 text-success' },
              { l:'Total Expenses',     v:'€2.58M', d:'+12%', up:false, c:'bg-danger/10 text-danger' },
              { l:'Net Profit',         v:'€574K',  d:'+24%', up:true,  c:'bg-brand-50 text-brand-700' },
              { l:'Cash Balance',       v:'€1.24M', d:'+8%',  up:true,  c:'bg-indigo-50 text-indigo-700' },
              { l:'Outstanding AR',     v:'€680K',  d:'-3%',  up:true,  c:'bg-warning/10 text-warning' },
              { l:'Outstanding AP',     v:'€420K',  d:'+5%',  up:false, c:'bg-purple-50 text-purple-700' },
            ].map(k => (
              <div key={k.l} className={`rounded-xl p-3 sm:p-4 ${k.c}`}>
                <div className="text-xl sm:text-2xl font-black">{k.v}</div>
                <div className="text-2xs sm:text-xs mt-0.5 opacity-80">{k.l}</div>
                <div className={`text-2xs font-semibold mt-1 ${k.up?'text-success':'text-danger'}`}>{k.up?'↑':'↓'} {k.d}</div>
              </div>
            ))}
          </div>

          <div className="card p-4 sm:p-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-text-primary">Revenue, Expenses &amp; Profit</h3>
              <p className="text-xs text-text-secondary">12-month financial performance</p>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={REV_DATA} margin={{top:4,right:8,left:-10,bottom:0}}>
                <defs>
                  <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10B981" stopOpacity={0}/></linearGradient>
                  <linearGradient id="ge" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/><stop offset="95%" stopColor="#EF4444" stopOpacity={0}/></linearGradient>
                  <linearGradient id="gp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.3}/><stop offset="95%" stopColor="#1D4ED8" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false}/>
                <XAxis dataKey="month" tick={{fontSize:11,fill:'#94A3B8'}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:'#94A3B8'}} axisLine={false} tickLine={false} tickFormatter={(v)=>`€${(v/1000).toFixed(0)}K`}/>
                <Tooltip formatter={(v:number)=>fmtEUR(v)} contentStyle={{fontSize:12,borderRadius:8,border:'1px solid #E2E8F0'}}/>
                <Legend wrapperStyle={{fontSize:12,paddingTop:8}}/>
                <Area type="monotone" dataKey="revenue"  stroke="#10B981" fill="url(#gr)" strokeWidth={2} name="Revenue"/>
                <Area type="monotone" dataKey="expenses" stroke="#EF4444" fill="url(#ge)" strokeWidth={2} name="Expenses"/>
                <Area type="monotone" dataKey="profit"   stroke="#1D4ED8" fill="url(#gp)" strokeWidth={2} name="Net profit"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="card p-4 sm:p-5">
              <h3 className="text-sm font-bold text-text-primary mb-3">AR Aging</h3>
              {AR_AGING.map(b => (
                <div key={b.bucket} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-text-secondary">{b.bucket}</span>
                    <span className="font-bold text-text-primary">{fmtEUR(b.amount)}</span>
                  </div>
                  <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width:`${b.pct}%`, background: b.bucket.includes('90+')?'#EF4444':b.bucket.includes('61-90')?'#F59E0B':b.bucket.includes('31-60')?'#3B82F6':'#10B981' }}/>
                  </div>
                </div>
              ))}
            </div>
            <div className="card p-4 sm:p-5">
              <h3 className="text-sm font-bold text-text-primary mb-3">AP Aging</h3>
              {AP_AGING.map(b => (
                <div key={b.bucket} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-text-secondary">{b.bucket}</span>
                    <span className="font-bold text-text-primary">{fmtEUR(b.amount)}</span>
                  </div>
                  <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width:`${b.pct}%`, background: b.bucket.includes('90+')?'#EF4444':b.bucket.includes('61-90')?'#F59E0B':b.bucket.includes('31-60')?'#3B82F6':'#10B981' }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'gl' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm font-bold text-text-primary">General Ledger</h3>
            <div className="flex gap-2">
              <select className="text-xs border border-border rounded-btn px-2 py-1.5"><option>All accounts</option></select>
              <select className="text-xs border border-border rounded-btn px-2 py-1.5"><option>Last 30 days</option></select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Date</th>
                <th className="table-th">Reference</th>
                <th className="table-th">Account</th>
                <th className="table-th">Description</th>
                <th className="table-th text-right">Debit</th>
                <th className="table-th text-right">Credit</th>
                <th className="table-th text-right">Balance</th>
              </tr></thead>
              <tbody>
                {[
                  { d:'2024-05-29', r:'JE-1042', a:'1000 · Cash',                 desc:'Customer payment — Gulf Freight', db:'',       cr:'12,500',  bal:'852,500' },
                  { d:'2024-05-29', r:'JE-1041', a:'1200 · Accounts Receivable',  desc:'Invoice INV-1142 paid',            db:'',       cr:'12,500',  bal:'680,000' },
                  { d:'2024-05-28', r:'JE-1040', a:'5000 · Carrier Costs',        desc:'DHL invoice — May',                db:'8,200',  cr:'',        bal:'412,000' },
                  { d:'2024-05-28', r:'JE-1039', a:'2000 · Accounts Payable',     desc:'DHL invoice — May',                db:'',       cr:'8,200',   bal:'298,000' },
                  { d:'2024-05-27', r:'JE-1038', a:'1500 · Inventory',            desc:'Battery module receipt',           db:'24,000', cr:'',        bal:'1,850,000' },
                  { d:'2024-05-27', r:'JE-1037', a:'2000 · Accounts Payable',     desc:'Supplier invoice',                 db:'',       cr:'24,000',  bal:'306,200' },
                ].map((r,i)=>(
                  <tr key={i} className="table-row">
                    <td className="table-td text-xs">{r.d}</td>
                    <td className="table-td text-xs font-mono text-brand-700">{r.r}</td>
                    <td className="table-td text-xs">{r.a}</td>
                    <td className="table-td text-xs text-text-secondary">{r.desc}</td>
                    <td className="table-td text-xs text-right font-semibold">{r.db}</td>
                    <td className="table-td text-xs text-right font-semibold">{r.cr}</td>
                    <td className="table-td text-xs text-right font-bold">{r.bal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'ar' && (
        <>
          <div className="kpi-grid-4">
            {[
              { l:'Total Outstanding', v:'€680K', c:'bg-warning/10 text-warning' },
              { l:'Current',           v:'€480K', c:'bg-success/10 text-success' },
              { l:'31-60 days',        v:'€120K', c:'bg-info/10 text-info' },
              { l:'Overdue 90+',       v:'€25K',  c:'bg-danger/10 text-danger' },
            ].map(k=>(
              <div key={k.l} className={`rounded-xl p-3 sm:p-4 ${k.c}`}>
                <div className="text-xl sm:text-2xl font-black">{k.v}</div>
                <div className="text-2xs sm:text-xs mt-0.5 opacity-80">{k.l}</div>
              </div>
            ))}
          </div>
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-border"><h3 className="text-sm font-bold text-text-primary">Customer Receivables</h3></div>
            <div className="overflow-x-auto">
              <table className="table-base min-w-[700px]">
                <thead><tr>
                  <th className="table-th">Customer</th>
                  <th className="table-th">Invoices</th>
                  <th className="table-th">Current</th>
                  <th className="table-th">31-60</th>
                  <th className="table-th">61-90</th>
                  <th className="table-th">90+</th>
                  <th className="table-th text-right">Total</th>
                </tr></thead>
                <tbody>
                  {[
                    { c:'Gulf Freight LLC',  i:3, c0:42000, c1:8000,  c2:0,    c3:0,    t:50000 },
                    { c:'EuroTrans GmbH',    i:2, c0:18000, c1:0,     c2:0,    c3:0,    t:18000 },
                    { c:'AsiaCargo Co.',     i:4, c0:0,     c1:22000, c2:18000,c3:8000, t:48000 },
                    { c:'Nordic Shipping',   i:1, c0:5600,  c1:0,     c2:0,    c3:0,    t:5600 },
                    { c:'Mediterranean Co.', i:5, c0:124000,c1:32000, c2:12000,c3:5000, t:173000 },
                  ].map((r,i)=>(
                    <tr key={i} className="table-row">
                      <td className="table-td font-semibold text-text-primary text-xs sm:text-sm">{r.c}</td>
                      <td className="table-td text-text-secondary text-xs">{r.i} invoices</td>
                      <td className="table-td text-xs">{r.c0?fmtEUR(r.c0):'—'}</td>
                      <td className="table-td text-xs">{r.c1?fmtEUR(r.c1):'—'}</td>
                      <td className="table-td text-xs">{r.c2?fmtEUR(r.c2):'—'}</td>
                      <td className="table-td text-xs text-danger font-semibold">{r.c3?fmtEUR(r.c3):'—'}</td>
                      <td className="table-td text-right font-bold">{fmtEUR(r.t)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === 'ap' && (
        <>
          <div className="kpi-grid-4">
            {[
              { l:'Total Payable',     v:'€420K', c:'bg-purple-50 text-purple-700' },
              { l:'Due This Week',     v:'€68K',  c:'bg-warning/10 text-warning' },
              { l:'Overdue',           v:'€42K',  c:'bg-danger/10 text-danger' },
              { l:'Active Suppliers',  v:'48',    c:'bg-brand-50 text-brand-700' },
            ].map(k=>(
              <div key={k.l} className={`rounded-xl p-3 sm:p-4 ${k.c}`}>
                <div className="text-xl sm:text-2xl font-black">{k.v}</div>
                <div className="text-2xs sm:text-xs mt-0.5 opacity-80">{k.l}</div>
              </div>
            ))}
          </div>
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-border"><h3 className="text-sm font-bold text-text-primary">Supplier Payables</h3></div>
            <div className="overflow-x-auto">
              <table className="table-base min-w-[700px]">
                <thead><tr>
                  <th className="table-th">Supplier</th>
                  <th className="table-th">Bills</th>
                  <th className="table-th">Current</th>
                  <th className="table-th">31-60</th>
                  <th className="table-th">61-90</th>
                  <th className="table-th">90+</th>
                  <th className="table-th text-right">Total</th>
                </tr></thead>
                <tbody>
                  {[
                    { c:'DHL Express',          i:4, c0:42000, c1:0,     c2:0,    c3:0,    t:42000 },
                    { c:'Aramex',               i:3, c0:28000, c1:8000,  c2:0,    c3:0,    t:36000 },
                    { c:'Solar Tech Supply Co', i:2, c0:124000,c1:32000, c2:0,    c3:0,    t:156000 },
                    { c:'Industrial Hardware',  i:5, c0:48000, c1:18000, c2:12000,c3:0,    t:78000 },
                    { c:'Fuel & Energy Corp',   i:6, c0:56000, c1:24000, c2:16000,c3:12000,t:108000 },
                  ].map((r,i)=>(
                    <tr key={i} className="table-row">
                      <td className="table-td font-semibold text-text-primary text-xs sm:text-sm">{r.c}</td>
                      <td className="table-td text-text-secondary text-xs">{r.i} bills</td>
                      <td className="table-td text-xs">{r.c0?fmtEUR(r.c0):'—'}</td>
                      <td className="table-td text-xs">{r.c1?fmtEUR(r.c1):'—'}</td>
                      <td className="table-td text-xs">{r.c2?fmtEUR(r.c2):'—'}</td>
                      <td className="table-td text-xs text-danger font-semibold">{r.c3?fmtEUR(r.c3):'—'}</td>
                      <td className="table-td text-right font-bold">{fmtEUR(r.t)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === 'pnl' && (
        <div className="space-y-4">
          {PNL.map(section => (
            <div key={section.category} className="card overflow-hidden">
              <div className="p-4 border-b border-border bg-surface-secondary">
                <h3 className="text-sm font-bold text-text-primary">{section.category}</h3>
              </div>
              {section.items.map(item => (
                <div key={item.name} className="flex items-center justify-between p-4 border-b border-border last:border-0">
                  <div className="flex-1">
                    <p className="text-sm text-text-primary">{item.name}</p>
                    <div className="h-1 bg-surface-tertiary rounded-full overflow-hidden mt-2 max-w-xs">
                      <div className="h-full bg-brand-600 rounded-full" style={{ width:`${item.pct}%` }}/>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-bold text-text-primary">{fmtEUR(item.amount)}</p>
                    <p className="text-2xs text-text-disabled">{item.pct}%</p>
                  </div>
                </div>
              ))}
              <div className="p-4 bg-brand-50 flex items-center justify-between">
                <p className="text-sm font-bold text-brand-700">Total {section.category.toLowerCase()}</p>
                <p className="text-base font-black text-brand-700">{fmtEUR(section.total)}</p>
              </div>
            </div>
          ))}
          <div className="card p-4 sm:p-5 bg-success/5 border-success/30">
            <div className="flex items-center justify-between">
              <p className="text-base font-bold text-success">Net Profit</p>
              <p className="text-2xl font-black text-success">{fmtEUR(PNL[0].total - PNL[1].total - PNL[2].total)}</p>
            </div>
          </div>
        </div>
      )}

      {tab === 'balance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-border bg-surface-secondary"><h3 className="text-sm font-bold text-text-primary">Assets</h3></div>
            {BS_ASSETS.map(a=>(
              <div key={a.name} className="flex items-center justify-between p-3 border-b border-border last:border-0">
                <p className="text-sm text-text-secondary">{a.name}</p>
                <p className="text-sm font-bold text-text-primary">{fmtEUR(a.amount)}</p>
              </div>
            ))}
            <div className="p-3 bg-brand-50 flex items-center justify-between">
              <p className="text-sm font-bold text-brand-700">Total Assets</p>
              <p className="text-base font-black text-brand-700">{fmtEUR(bsAssetsTotal)}</p>
            </div>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div className="card overflow-hidden">
              <div className="p-4 border-b border-border bg-surface-secondary"><h3 className="text-sm font-bold text-text-primary">Liabilities</h3></div>
              {BS_LIAB.map(a=>(
                <div key={a.name} className="flex items-center justify-between p-3 border-b border-border last:border-0">
                  <p className="text-sm text-text-secondary">{a.name}</p>
                  <p className="text-sm font-bold text-text-primary">{fmtEUR(a.amount)}</p>
                </div>
              ))}
              <div className="p-3 bg-danger/10 flex items-center justify-between">
                <p className="text-sm font-bold text-danger">Total Liabilities</p>
                <p className="text-base font-black text-danger">{fmtEUR(bsLiabTotal)}</p>
              </div>
            </div>
            <div className="card overflow-hidden">
              <div className="p-4 border-b border-border bg-surface-secondary"><h3 className="text-sm font-bold text-text-primary">Equity</h3></div>
              {BS_EQUITY.map(a=>(
                <div key={a.name} className="flex items-center justify-between p-3 border-b border-border last:border-0">
                  <p className="text-sm text-text-secondary">{a.name}</p>
                  <p className="text-sm font-bold text-text-primary">{fmtEUR(a.amount)}</p>
                </div>
              ))}
              <div className="p-3 bg-success/10 flex items-center justify-between">
                <p className="text-sm font-bold text-success">Total Equity</p>
                <p className="text-base font-black text-success">{fmtEUR(bsEquityTotal)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'cashflow' && (
        <div className="card p-4 sm:p-5">
          <h3 className="text-sm font-bold text-text-primary mb-3">Quarterly Cash Flow</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={CASH_FLOW}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false}/>
              <XAxis dataKey="quarter" tick={{fontSize:11,fill:'#94A3B8'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'#94A3B8'}} axisLine={false} tickLine={false} tickFormatter={(v)=>`€${(v/1000).toFixed(0)}K`}/>
              <Tooltip formatter={(v:number)=>fmtEUR(v)} contentStyle={{fontSize:12,borderRadius:8}}/>
              <Legend wrapperStyle={{fontSize:12}}/>
              <Bar dataKey="operating" fill="#10B981" name="Operating" radius={[3,3,0,0]}/>
              <Bar dataKey="investing" fill="#F59E0B" name="Investing" radius={[3,3,0,0]}/>
              <Bar dataKey="financing" fill="#8B5CF6" name="Financing" radius={[3,3,0,0]}/>
              <Bar dataKey="net" fill="#1D4ED8" name="Net" radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab === 'cost-centers' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border"><h3 className="text-sm font-bold text-text-primary">Cost Centers</h3></div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Cost Center</th>
                <th className="table-th">Budget</th>
                <th className="table-th">Spent</th>
                <th className="table-th">Utilization</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {COST_CENTERS.map(c=>(
                  <tr key={c.id} className="table-row">
                    <td className="table-td">
                      <p className="font-semibold text-text-primary text-sm">{c.name}</p>
                      <p className="text-2xs text-text-disabled">{c.id}</p>
                    </td>
                    <td className="table-td text-text-secondary text-xs">{fmtEUR(c.budget)}</td>
                    <td className="table-td font-bold text-text-primary text-xs">{fmtEUR(c.spent)}</td>
                    <td className="table-td">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width:`${Math.min(c.pct,100)}%`, background: c.pct>100?'#EF4444':c.pct>85?'#F59E0B':'#10B981' }}/>
                        </div>
                        <span className={`text-xs font-bold ${c.pct>100?'text-danger':c.pct>85?'text-warning':'text-success'}`}>{c.pct}%</span>
                      </div>
                    </td>
                    <td className="table-td"><span className={`${SBADGE[c.status]} badge`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'budget' && (
        <div className="card p-4 sm:p-5">
          <h3 className="text-sm font-bold text-text-primary mb-4">Budget vs Actual — FY 2024</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={COST_CENTERS.map(c=>({name:c.name.split(' ')[0],Budget:c.budget,Spent:c.spent}))} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0"/>
              <XAxis type="number" tick={{fontSize:11,fill:'#94A3B8'}} tickFormatter={(v)=>`€${(v/1000).toFixed(0)}K`}/>
              <YAxis type="category" dataKey="name" tick={{fontSize:11,fill:'#475569'}} width={100}/>
              <Tooltip formatter={(v:number)=>fmtEUR(v)} contentStyle={{fontSize:12,borderRadius:8}}/>
              <Legend wrapperStyle={{fontSize:12}}/>
              <Bar dataKey="Budget" fill="#94A3B8" radius={[0,3,3,0]}/>
              <Bar dataKey="Spent" fill="#1D4ED8" radius={[0,3,3,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab === 'tax' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border"><h3 className="text-sm font-bold text-text-primary">Tax Obligations</h3></div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[600px]">
              <thead><tr>
                <th className="table-th">Jurisdiction</th>
                <th className="table-th">Type</th>
                <th className="table-th">Period</th>
                <th className="table-th text-right">Amount</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {TAX.map((t,i)=>(
                  <tr key={i} className="table-row">
                    <td className="table-td font-semibold text-text-primary">{t.jurisdiction}</td>
                    <td className="table-td text-text-secondary text-xs">{t.type}</td>
                    <td className="table-td text-text-secondary text-xs">{t.period}</td>
                    <td className="table-td text-right font-bold">{fmtEUR(t.amount)}</td>
                    <td className="table-td"><span className={`${SBADGE[t.status]} badge`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'invoices' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary">Invoices</h3>
            <button className="btn-primary text-xs">+ Create Invoice</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base min-w-[700px]">
              <thead><tr>
                <th className="table-th">Invoice No.</th>
                <th className="table-th">Customer</th>
                <th className="table-th">Issued</th>
                <th className="table-th">Due</th>
                <th className="table-th text-right">Amount</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {INVOICES.map(i=>(
                  <tr key={i.no} className="table-row">
                    <td className="table-td font-semibold text-brand-700 text-xs">{i.no}</td>
                    <td className="table-td text-text-primary text-xs sm:text-sm">{i.customer}</td>
                    <td className="table-td text-text-secondary text-xs">{i.issued}</td>
                    <td className="table-td text-text-secondary text-xs">{i.due}</td>
                    <td className="table-td text-right font-bold">{i.cur} {i.amount.toLocaleString()}</td>
                    <td className="table-td"><span className={`${SBADGE[i.status]} badge`}>{i.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'subscriptions' && (
        <>
          <div className="kpi-grid-4">
            {[
              { l:'Active Subscriptions', v:'48',     c:'bg-success/10 text-success' },
              { l:'Monthly Recurring',    v:'€18.4K', c:'bg-brand-50 text-brand-700' },
              { l:'Annual Recurring',     v:'€220K',  c:'bg-indigo-50 text-indigo-700' },
              { l:'Churn Rate',           v:'2.1%',   c:'bg-warning/10 text-warning' },
            ].map(k=>(
              <div key={k.l} className={`rounded-xl p-3 sm:p-4 ${k.c}`}>
                <div className="text-xl sm:text-2xl font-black">{k.v}</div>
                <div className="text-2xs sm:text-xs mt-0.5 opacity-80">{k.l}</div>
              </div>
            ))}
          </div>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table-base min-w-[700px]">
                <thead><tr>
                  <th className="table-th">Subscription</th>
                  <th className="table-th">Customer</th>
                  <th className="table-th">Plan</th>
                  <th className="table-th text-right">MRR</th>
                  <th className="table-th">Renewal</th>
                  <th className="table-th">Status</th>
                </tr></thead>
                <tbody>
                  {SUBS.map(s=>(
                    <tr key={s.id} className="table-row">
                      <td className="table-td font-mono text-brand-700 text-xs">{s.id}</td>
                      <td className="table-td text-xs sm:text-sm">{s.customer}</td>
                      <td className="table-td"><span className={`badge ${s.plan==='Enterprise'?'badge-purple':s.plan==='Professional'?'badge-info':'badge-gray'}`}>{s.plan}</span></td>
                      <td className="table-td text-right font-bold">€{s.mrr.toLocaleString()}/mo</td>
                      <td className="table-td text-text-secondary text-xs">{s.renewal}</td>
                      <td className="table-td"><span className={`${SBADGE[s.status]} badge`}>{s.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === 'reconciliation' && (
        <div className="space-y-4">
          <div className="kpi-grid-4">
            {[
              { l:'Reconciled', v:'1,248', c:'bg-success/10 text-success' },
              { l:'Pending',    v:'34',    c:'bg-warning/10 text-warning' },
              { l:'Disputed',   v:'4',     c:'bg-danger/10 text-danger' },
              { l:'Match Rate', v:'97%',   c:'bg-brand-50 text-brand-700' },
            ].map(k=>(
              <div key={k.l} className={`rounded-xl p-3 sm:p-4 ${k.c}`}>
                <div className="text-xl sm:text-2xl font-black">{k.v}</div>
                <div className="text-2xs sm:text-xs mt-0.5 opacity-80">{k.l}</div>
              </div>
            ))}
          </div>
          <div className="card p-4 sm:p-5">
            <h3 className="text-sm font-bold text-text-primary mb-3">Payment Reconciliation</h3>
            <p className="text-sm text-text-secondary mb-4">Automated matching between bank transactions, invoices, and customer payments. AI-assisted dispute resolution flags exceptions for review.</p>
            <div className="space-y-2">
              {[
                { match:'Auto-matched',    inv:'INV-1142', amt:'€12,500', bank:'ABN-2024-05-29-892', status:'Reconciled' },
                { match:'Auto-matched',    inv:'INV-1139', amt:'€5,600',  bank:'ABN-2024-05-28-721', status:'Reconciled' },
                { match:'Needs review',    inv:'INV-1140', amt:'$22,800', bank:'ABN-2024-05-29-901', status:'Pending' },
                { match:'Amount mismatch', inv:'INV-1138', amt:'€9,400',  bank:'ABN-2024-05-29-905', status:'Disputed' },
              ].map((r,i)=>(
                <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{r.inv} — {r.amt}</p>
                    <p className="text-2xs text-text-disabled">{r.bank} · {r.match}</p>
                  </div>
                  <span className={`${SBADGE[r.status]} badge`}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'banking' && (
        <>
          <div className="kpi-grid-4">
            {[
              { l:'Connected Accounts', v:'2',      c:'bg-success/10 text-success' },
              { l:'Total Balance',      v:'€1.24M', c:'bg-brand-50 text-brand-700' },
              { l:'Pending Transactions', v:'18',   c:'bg-warning/10 text-warning' },
              { l:'Last Sync',          v:'2m ago', c:'bg-indigo-50 text-indigo-700' },
            ].map(k=>(
              <div key={k.l} className={`rounded-xl p-3 sm:p-4 ${k.c}`}>
                <div className="text-xl sm:text-2xl font-black">{k.v}</div>
                <div className="text-2xs sm:text-xs mt-0.5 opacity-80">{k.l}</div>
              </div>
            ))}
          </div>
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-bold text-text-primary">Bank Accounts</h3>
              <button className="btn-primary text-xs">+ Connect Account</button>
            </div>
            <div className="overflow-x-auto">
              <table className="table-base min-w-[600px]">
                <thead><tr>
                  <th className="table-th">Bank</th>
                  <th className="table-th">IBAN</th>
                  <th className="table-th">Currency</th>
                  <th className="table-th text-right">Balance</th>
                  <th className="table-th">Status</th>
                </tr></thead>
                <tbody>
                  {BANK_ACCOUNTS.map(b=>(
                    <tr key={b.id} className="table-row">
                      <td className="table-td font-semibold text-text-primary">{b.bank}</td>
                      <td className="table-td font-mono text-2xs text-text-secondary">{b.iban}</td>
                      <td className="table-td"><span className="badge-info badge">{b.currency}</span></td>
                      <td className="table-td text-right font-bold">{b.currency} {b.balance.toLocaleString()}</td>
                      <td className="table-td"><span className={`${SBADGE[b.status]} badge`}>{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
