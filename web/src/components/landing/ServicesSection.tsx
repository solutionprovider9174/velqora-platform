const SERVICES = [
  { icon: 'ti-truck-delivery', title: 'Logistics & Shipments', desc: 'Plan, execute and track every shipment with real-time visibility and event timelines.', color: 'from-blue-500 to-brand-600' },
  { icon: 'ti-building-warehouse', title: 'Warehouse Operations', desc: 'Multi-warehouse stock control, capacity monitoring, and live inventory movement.', color: 'from-violet-500 to-indigo-600' },
  { icon: 'ti-box', title: 'Inventory Control', desc: 'Product catalog, stock balances, low stock alerts, and full traceability foundation.', color: 'from-teal-500 to-cyan-600' },
  { icon: 'ti-solar-panel', title: 'Equipment Assets', desc: 'Lifecycle management for solar, batteries, inverters, chargers, and renewable equipment.', color: 'from-amber-500 to-orange-600' },
  { icon: 'ti-brain', title: 'AI Monitoring', desc: 'Operational alerts, anomaly detection, low-stock predictions, and AI recommendations.', color: 'from-purple-500 to-fuchsia-600' },
  { icon: 'ti-receipt', title: 'Finance & Billing', desc: 'Multi-currency invoicing readiness, payment tracking, and accounting integrations.', color: 'from-emerald-500 to-teal-600' },
  { icon: 'ti-database-import', title: 'Onboarding & Migration', desc: 'Import existing customer, supplier, product, and inventory data effortlessly.', color: 'from-rose-500 to-pink-600' },
  { icon: 'ti-plug', title: 'Integrations & API', desc: 'Connect ERP, CRM, accounting, payment, IoT, and external systems via REST API.', color: 'from-slate-500 to-slate-700' },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-20 lg:py-28 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Platform Modules</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-900 mb-3 sm:mb-4">An enterprise ERP — not just a delivery app</h2>
          <p className="text-sm sm:text-lg text-text-secondary max-w-2xl mx-auto">Logistics, inventory, warehouse, equipment, finance, and AI — all in one connected platform.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {SERVICES.map(s => (
            <div key={s.title} className="card-hover p-4 sm:p-6 group">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 sm:mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                <i className={`ti ${s.icon} text-white text-xl sm:text-2xl`} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-text-primary mb-2">{s.title}</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
