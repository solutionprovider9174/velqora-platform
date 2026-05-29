import { Plug, Check } from 'lucide-react'

const INTEGRATIONS = [
  { name: 'Velqora Backend API', cat: 'Core', desc: 'Java Spring Boot REST API connection', status: 'connected' },
  { name: 'ERP Systems', cat: 'Business Apps', desc: 'SAP, Oracle, Microsoft Dynamics integration', status: 'soon' },
  { name: 'Accounting Systems', cat: 'Finance', desc: 'QuickBooks, Xero, Sage integration', status: 'soon' },
  { name: 'CRM Systems', cat: 'Business Apps', desc: 'Salesforce, HubSpot, Pipedrive integration', status: 'soon' },
  { name: 'Inventory Systems', cat: 'Operations', desc: 'Connect with third-party WMS solutions', status: 'soon' },
  { name: 'Payment Providers', cat: 'Finance', desc: 'Stripe, Adyen, regional payment gateways', status: 'soon' },
  { name: 'GPS / Fleet Tracking', cat: 'Operations', desc: 'Google Maps, Mapbox, telematics providers', status: 'soon' },
  { name: 'IoT Device Gateway', cat: 'Telemetry', desc: 'Connect sensors, energy meters, asset monitoring', status: 'soon' },
  { name: 'AI Services', cat: 'AI', desc: 'OpenAI, Anthropic, custom ML model endpoints', status: 'soon' },
  { name: 'Email Provider', cat: 'Communication', desc: 'SendGrid, Postmark, AWS SES integration', status: 'planned' },
  { name: 'External APIs', cat: 'Developer', desc: 'Generic REST/GraphQL connector framework', status: 'soon' },
  { name: 'Webhooks', cat: 'Developer', desc: 'Outbound event notifications to your systems', status: 'soon' },
]

const STATUS: Record<string, { label: string; color: string }> = {
  connected: { label: 'Connected', color: 'badge-success' },
  planned:   { label: 'Planned',   color: 'badge-info' },
  soon:      { label: 'Coming Soon', color: 'badge-gray' },
}

export default function IntegrationsPage() {
  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2">Integrations <span className="badge bg-slate-100 text-slate-600 border border-slate-200">Roadmap</span></h1>
          <p className="page-subtitle">Connect Velqora with your existing ERP, CRM, accounting, payment, and IoT systems.</p>
        </div>
      </div>

      <div className="kpi-grid-4">
        {[
          { l: 'Connected', v: '1', c: 'text-success bg-success/10' },
          { l: 'Planned', v: '1', c: 'text-info bg-info/10' },
          { l: 'Coming Soon', v: '10', c: 'text-slate-700 bg-slate-100' },
          { l: 'Total Available', v: '12', c: 'text-brand-700 bg-brand-50' },
        ].map(k => (
          <div key={k.l} className={`rounded-xl p-3 sm:p-4 ${k.c}`}>
            <p className="text-xl sm:text-2xl font-black">{k.v}</p>
            <p className="text-xs mt-0.5 opacity-80">{k.l}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {INTEGRATIONS.map(i => (
          <div key={i.name} className="card p-4 hover:shadow-card-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center"><Plug size={18} /></div>
              <span className={`${STATUS[i.status].color} badge`}>
                {i.status === 'connected' && <Check size={10} />}
                {STATUS[i.status].label}
              </span>
            </div>
            <h4 className="text-sm font-bold text-text-primary">{i.name}</h4>
            <p className="text-2xs text-text-disabled uppercase tracking-wide mt-0.5">{i.cat}</p>
            <p className="text-xs text-text-secondary mt-2 leading-relaxed">{i.desc}</p>
            <button className={`mt-3 w-full text-xs border rounded-btn py-1.5 font-semibold transition-colors ${i.status==='connected' ? 'border-success text-success' : 'border-border text-text-secondary hover:border-brand-400 hover:text-brand-600'}`}>
              {i.status === 'connected' ? 'Configured' : 'Configure'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
