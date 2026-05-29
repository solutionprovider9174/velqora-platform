'use client'
import { useState } from 'react'
import { Check } from 'lucide-react'

const PLANS = [
  {
    name: 'Starter',
    desc: 'For small logistics teams',
    monthly: 49, annual: 39,
    features: ['Up to 5 users', '500 shipments/month', '2 warehouses', 'Basic reporting', '3 languages'],
    cta: 'Start free trial', highlight: false,
  },
  {
    name: 'Professional',
    desc: 'For growing operations',
    monthly: 149, annual: 119,
    features: ['Up to 25 users', 'Unlimited shipments', '10 warehouses', 'AI Monitoring preview', '15+ languages', 'Priority support', 'API access'],
    cta: 'Start free trial', highlight: true,
  },
  {
    name: 'Enterprise',
    desc: 'For global operations',
    custom: true,
    features: ['Unlimited users', 'Unlimited everything', 'Custom integrations', 'Dedicated CSM', 'SLA guarantee', 'On-premise option', 'White-label'],
    cta: 'Contact sales', highlight: false,
  },
]

export function PricingSection() {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Transparent pricing</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-900 mb-3">Simple, honest pricing</h2>
          <p className="text-sm sm:text-lg text-text-secondary mb-6">Start free. Scale as you grow. No hidden fees.</p>

          <div className="inline-flex bg-surface-tertiary rounded-full p-1">
            <button onClick={() => setAnnual(false)} className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all ${!annual ? 'bg-white text-text-primary shadow-sm' : 'text-text-secondary'}`}>Monthly</button>
            <button onClick={() => setAnnual(true)} className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all flex items-center gap-1.5 ${annual ? 'bg-white text-text-primary shadow-sm' : 'text-text-secondary'}`}>
              Annual <span className="text-2xs text-success font-bold">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {PLANS.map(p => (
            <div key={p.name} className={`relative rounded-2xl p-6 sm:p-7 ${p.highlight ? 'bg-white border-2 border-brand-600 shadow-card-lg' : 'bg-surface-secondary border border-border'}`}>
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-2xs font-bold px-3 py-1 rounded-full whitespace-nowrap">MOST POPULAR</span>
              )}
              <h3 className="text-sm font-bold text-navy-900">{p.name}</h3>
              <p className="text-xs text-text-secondary mb-4">{p.desc}</p>

              <div className="mb-5">
                {p.custom ? (
                  <p className="text-2xl sm:text-3xl font-black text-navy-900">Custom</p>
                ) : (
                  <p className="text-2xl sm:text-3xl font-black text-navy-900">
                    €{annual ? p.annual : p.monthly}<span className="text-sm font-normal text-text-secondary">/mo</span>
                  </p>
                )}
              </div>

              <ul className="space-y-2 mb-6">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs sm:text-sm text-text-primary">
                    <Check size={14} className="text-brand-600 flex-shrink-0 mt-0.5" />{f}
                  </li>
                ))}
              </ul>

              <button className={`w-full text-sm font-bold py-2.5 rounded-btn transition-colors ${p.highlight ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-white text-navy-900 border border-border hover:border-brand-400'}`}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
