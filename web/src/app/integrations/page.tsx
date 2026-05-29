'use client'
import { useState } from 'react'
import { Plug, Search, Check, ExternalLink } from 'lucide-react'

type Cat = 'all' | 'erp' | 'accounting' | 'crm' | 'ecommerce' | 'payment' | 'shipping' | 'maps' | 'core'

const CATEGORIES: { id: Cat; label: string }[] = [
  { id:'all',        label:'All' },
  { id:'core',       label:'Core' },
  { id:'erp',        label:'ERP' },
  { id:'accounting', label:'Accounting' },
  { id:'crm',        label:'CRM' },
  { id:'ecommerce',  label:'E-commerce' },
  { id:'payment',    label:'Payment' },
  { id:'shipping',   label:'Shipping' },
  { id:'maps',       label:'Maps' },
]

const INTEGRATIONS = [
  // Core
  { name:'Velqora Backend API', cat:'core', icon:'🔌', color:'bg-brand-100 text-brand-700',
    desc:'Java Spring Boot core REST API. Powers all platform modules.',
    status:'Connected', region:'Internal' },
  { name:'Email Provider', cat:'core', icon:'✉️', color:'bg-slate-100 text-slate-700',
    desc:'Transactional email — SendGrid, Mailgun, AWS SES, Postmark.',
    status:'Planned', region:'Global' },

  // ERP
  { name:'SAP', cat:'erp', icon:'🏢', color:'bg-blue-100 text-blue-700',
    desc:'Sync customers, products, inventory, orders, and financials with SAP S/4HANA or ECC.',
    status:'Coming Soon', region:'Enterprise' },
  { name:'Odoo', cat:'erp', icon:'🟣', color:'bg-purple-100 text-purple-700',
    desc:'Bi-directional sync of CRM, inventory, and accounting with Odoo Online or self-hosted.',
    status:'Coming Soon', region:'Global' },
  { name:'Oracle NetSuite', cat:'erp', icon:'🔴', color:'bg-red-100 text-red-700',
    desc:'Push transactions, invoices, and items to/from Oracle NetSuite cloud ERP.',
    status:'Coming Soon', region:'Enterprise' },
  { name:'Microsoft Dynamics 365', cat:'erp', icon:'🟦', color:'bg-blue-100 text-blue-700',
    desc:'Integrate finance, supply chain, and customer data with Dynamics 365 Finance & Operations.',
    status:'Coming Soon', region:'Enterprise' },

  // Accounting
  { name:'QuickBooks', cat:'accounting', icon:'📗', color:'bg-emerald-100 text-emerald-700',
    desc:'Sync invoices, payments, customers, and chart of accounts with QuickBooks Online.',
    status:'Coming Soon', region:'US / Global' },
  { name:'Xero', cat:'accounting', icon:'🌀', color:'bg-cyan-100 text-cyan-700',
    desc:'Cloud accounting integration — invoices, bills, contacts, and bank feeds.',
    status:'Coming Soon', region:'Global' },
  { name:'Exact Online', cat:'accounting', icon:'🟠', color:'bg-orange-100 text-orange-700',
    desc:'Dutch & Belgian accounting standard. Sync ledger, invoices, and tax filings.',
    status:'Coming Soon', region:'NL / BE' },
  { name:'AFAS', cat:'accounting', icon:'🟢', color:'bg-green-100 text-green-700',
    desc:'AFAS Profit integration for Dutch enterprises — ERP, HR, and accounting.',
    status:'Coming Soon', region:'NL' },

  // CRM
  { name:'Salesforce', cat:'crm', icon:'☁️', color:'bg-sky-100 text-sky-700',
    desc:'Sync accounts, contacts, opportunities, and shipment data with Salesforce CRM.',
    status:'Coming Soon', region:'Global' },
  { name:'HubSpot', cat:'crm', icon:'🧡', color:'bg-orange-100 text-orange-700',
    desc:'Connect deals, contacts, and customer lifecycle to Velqora customer records.',
    status:'Coming Soon', region:'Global' },

  // E-commerce
  { name:'Shopify', cat:'ecommerce', icon:'🛍️', color:'bg-green-100 text-green-700',
    desc:'Auto-create shipments from Shopify orders. Sync inventory levels and fulfilment status.',
    status:'Coming Soon', region:'Global' },
  { name:'WooCommerce', cat:'ecommerce', icon:'🌐', color:'bg-purple-100 text-purple-700',
    desc:'WordPress e-commerce integration. Pull orders, push tracking, manage inventory.',
    status:'Coming Soon', region:'Global' },

  // Payment
  { name:'Stripe', cat:'payment', icon:'💳', color:'bg-violet-100 text-violet-700',
    desc:'Accept card payments, manage subscriptions, automate invoice reconciliation.',
    status:'Coming Soon', region:'Global' },
  { name:'Mollie', cat:'payment', icon:'🅼', color:'bg-pink-100 text-pink-700',
    desc:'European payment provider — iDEAL, SEPA, credit cards, recurring billing.',
    status:'Coming Soon', region:'EU' },

  // Shipping carriers
  { name:'DHL', cat:'shipping', icon:'🟡', color:'bg-yellow-100 text-yellow-700',
    desc:'DHL Express tracking, label printing, and rate shopping for international shipments.',
    status:'Coming Soon', region:'Global' },
  { name:'UPS', cat:'shipping', icon:'🟫', color:'bg-amber-100 text-amber-700',
    desc:'UPS shipping rates, label generation, real-time tracking, and pickup scheduling.',
    status:'Coming Soon', region:'Global' },
  { name:'FedEx', cat:'shipping', icon:'🟣', color:'bg-indigo-100 text-indigo-700',
    desc:'FedEx Ship Manager API — rates, labels, tracking, and delivery confirmations.',
    status:'Coming Soon', region:'Global' },

  // Maps
  { name:'Google Maps', cat:'maps', icon:'🗺️', color:'bg-green-100 text-green-700',
    desc:'Maps, directions, geocoding, and live traffic for route optimization and fleet tracking.',
    status:'Coming Soon', region:'Global' },
]

const STATUS_BADGE: Record<string,string> = {
  'Connected':'badge-success', 'Planned':'badge-warning', 'Coming Soon':'badge-gray'
}

export default function IntegrationsPage() {
  const [cat, setCat] = useState<Cat>('all')
  const [search, setSearch] = useState('')

  const filtered = INTEGRATIONS.filter(i =>
    (cat === 'all' || i.cat === cat) &&
    (search === '' || i.name.toLowerCase().includes(search.toLowerCase()))
  )

  const connected = INTEGRATIONS.filter(i => i.status === 'Connected').length
  const planned   = INTEGRATIONS.filter(i => i.status === 'Planned').length
  const soon      = INTEGRATIONS.filter(i => i.status === 'Coming Soon').length

  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Integrations</h1>
          <p className="page-subtitle">Connect Velqora with your existing ERP, CRM, accounting, e-commerce, payment, shipping, and maps providers.</p>
        </div>
        <button className="btn-outline text-xs sm:text-sm">View API Docs</button>
      </div>

      <div className="kpi-grid-4">
        {[
          { l:'Total Integrations', v:INTEGRATIONS.length.toString(), c:'bg-brand-50 text-brand-700' },
          { l:'Connected',          v:connected.toString(),           c:'bg-success/10 text-success' },
          { l:'Planned',            v:planned.toString(),             c:'bg-warning/10 text-warning' },
          { l:'Roadmap',            v:soon.toString(),                c:'bg-slate-100 text-slate-700' },
        ].map(k=>(
          <div key={k.l} className={`rounded-xl p-3 sm:p-4 ${k.c}`}>
            <div className="text-xl sm:text-2xl font-black">{k.v}</div>
            <div className="text-2xs sm:text-xs mt-0.5 opacity-80">{k.l}</div>
          </div>
        ))}
      </div>

      <div className="card p-3 sm:p-4 flex flex-col lg:flex-row gap-3">
        <div className="flex items-center gap-2 bg-surface-secondary border border-border rounded-btn px-3 py-2 flex-1">
          <Search size={14} className="text-text-disabled"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search integrations…" className="bg-transparent text-sm outline-none w-full text-text-primary placeholder:text-text-disabled"/>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={()=>setCat(c.id)}
              className={`text-xs px-3 py-1.5 rounded-btn border transition-colors whitespace-nowrap ${cat===c.id?'bg-brand-600 text-white border-brand-600':'border-border text-text-secondary hover:border-brand-400 hover:text-brand-600 bg-white'}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filtered.map(i => (
          <div key={i.name} className="card p-4 sm:p-5 hover:shadow-card-md transition-shadow flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl ${i.color} flex items-center justify-center text-2xl`}>{i.icon}</div>
              <span className={`${STATUS_BADGE[i.status]} badge`}>
                {i.status === 'Connected' && <Check size={10}/>}{i.status}
              </span>
            </div>
            <h3 className="text-sm font-bold text-text-primary mb-1">{i.name}</h3>
            <p className="text-2xs text-text-disabled uppercase tracking-wide mb-2">{i.cat} · {i.region}</p>
            <p className="text-xs text-text-secondary leading-relaxed flex-1 mb-3">{i.desc}</p>
            <button className={`text-xs font-semibold py-2 rounded-btn transition-colors border flex items-center justify-center gap-1.5 ${i.status === 'Connected' ? 'border-success text-success bg-success/5 hover:bg-success/10' : 'border-border text-text-secondary hover:border-brand-400 hover:text-brand-600'}`}>
              {i.status === 'Connected' ? 'Configured' : 'Configure'} <ExternalLink size={11}/>
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card p-12 text-center">
          <Plug size={36} className="text-text-disabled mx-auto mb-3"/>
          <p className="text-sm text-text-secondary">No integrations match your search.</p>
        </div>
      )}

      <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 flex items-start gap-3">
        <Plug size={18} className="text-brand-600 flex-shrink-0 mt-0.5"/>
        <p className="text-xs text-brand-700">
          <strong>Open SaaS integration layer:</strong> All connectors support OAuth 2.0, webhook subscriptions, and configurable field mapping.
          Custom integrations can be built via the public REST API and webhook endpoints.
        </p>
      </div>
    </div>
  )
}
