export default function DriversPage() {
  return (
    <div className="responsive-page">
      <div>
        <h1 className="page-title flex items-center gap-2">Driver Management <span className="badge bg-slate-100 text-slate-600 border border-slate-200">Roadmap</span></h1>
        <p className="page-subtitle">Manage driver profiles, availability, shipment assignments, and compliance readiness.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon:'👤', title:'Driver Profiles', desc:'Personal records and licenses' },
          { icon:'📅', title:'Availability Tracking', desc:'Schedule and shift management' },
          { icon:'🚛', title:'Shipment Assignment', desc:'Assign drivers to shipments' },
          { icon:'📋', title:'Compliance Documents', desc:'Licenses, certifications, training' },
        ].map(c => (
          <div key={c.title} className="card p-5">
            <div className="text-3xl mb-3">{c.icon}</div>
            <h3 className="text-sm font-bold text-text-primary">{c.title}</h3>
            <p className="text-xs text-text-secondary mt-1">{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="card p-6 text-center bg-brand-50/30 border border-brand-100">
        <p className="text-4xl mb-3">👥</p>
        <h2 className="text-base font-bold text-text-primary">Driver Management Coming Soon</h2>
        <p className="text-sm text-text-secondary mt-2 max-w-md mx-auto">Driver profiles, availability tracking, vehicle assignment, and shipment assignment will be added as part of the future fleet operations module.</p>
      </div>
    </div>
  )
}
