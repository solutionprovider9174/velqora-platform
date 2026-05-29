const FEATURES = [
  {
    badge: 'Real-time visibility',
    title: 'Know where every shipment is, always.',
    desc: 'Live status tracking, automated updates, and predictive ETA for every shipment. Reduce customer enquiries by 60% with proactive notifications.',
    points: ['Live shipment status', 'Event timeline & audit log', 'Automated delay alerts', 'Predictive ETA with AI'],
    icon: 'ti-map-2',
    iconBg: 'bg-brand-50',
    iconColor: 'text-brand-600',
    reverse: false,
  },
  {
    badge: 'AI-powered insights',
    title: 'Let AI handle the complexity.',
    desc: "Velqora's AI engine forecasts demand, detects anomalies, flags low stock risks, and recommends operational actions before problems escalate.",
    points: ['Inventory demand forecasting', 'Anomaly detection', 'Low stock recommendations', 'Operational risk alerts'],
    icon: 'ti-brain',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    reverse: true,
  },
  {
    badge: 'Global operations',
    title: 'Built for the world. Ready for your market.',
    desc: 'Support for 15+ languages, 12+ currencies, regional compliance, and SaaS multi-company structure — whether you operate in Rotterdam, Dubai, or Singapore.',
    points: ['15+ language UI', '12+ currency support', 'Multi-company SaaS', 'Regional compliance'],
    icon: 'ti-world',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    reverse: false,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Platform Features</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-900 mb-3 sm:mb-4">Built for modern logistics</h2>
          <p className="text-sm sm:text-lg text-text-secondary max-w-2xl mx-auto">Every feature designed around real operational needs of logistics and renewable energy teams worldwide.</p>
        </div>
        <div className="space-y-16 sm:space-y-24">
          {FEATURES.map((f) => (
            <div key={f.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${f.reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <div>
                <span className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">{f.badge}</span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-navy-900 mb-3">{f.title}</h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-5">{f.desc}</p>
                <ul className="space-y-2">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-text-primary">
                      <div className="w-5 h-5 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
                        <i className="ti ti-check text-brand-600 text-sm" />
                      </div>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-surface-secondary rounded-2xl p-8 sm:p-12 flex items-center justify-center min-h-[240px]">
                <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-3xl ${f.iconBg} ${f.iconColor} flex items-center justify-center shadow-lg`}>
                  <i className={`ti ${f.icon} text-6xl sm:text-7xl`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
