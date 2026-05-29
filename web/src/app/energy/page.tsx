export default function EnergyPage() {
  return (
    <div className="responsive-page">
      <div>
        <h1 className="page-title flex items-center gap-2">Energy Systems <span className="badge bg-slate-100 text-slate-600 border border-slate-200">Roadmap</span></h1>
        <p className="page-subtitle">Monitor renewable energy equipment performance, IoT telemetry, battery status, and operational efficiency.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon:'☀️', title:'Solar Panels', desc:'Output and performance monitoring' },
          { icon:'⚡', title:'Hybrid Inverters', desc:'Conversion efficiency tracking' },
          { icon:'🔋', title:'Batteries', desc:'Charge/discharge cycles and health' },
          { icon:'🔌', title:'EV Chargers', desc:'Charging session and uptime' },
          { icon:'🌡️', title:'Heat Pumps', desc:'Thermal efficiency monitoring' },
          { icon:'💧', title:'Water Filtration', desc:'Flow rate and filter health' },
          { icon:'📡', title:'IoT Monitoring', desc:'Real-time device telemetry' },
          { icon:'🔧', title:'Maintenance', desc:'Predictive maintenance schedules' },
        ].map(c => (
          <div key={c.title} className="card p-5">
            <div className="text-3xl mb-3">{c.icon}</div>
            <h3 className="text-sm font-bold text-text-primary">{c.title}</h3>
            <p className="text-xs text-text-secondary mt-1">{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="card p-6 text-center bg-brand-50/30 border border-brand-100">
        <p className="text-4xl mb-3">☀️</p>
        <h2 className="text-base font-bold text-text-primary">Energy Monitoring Coming Soon</h2>
        <p className="text-sm text-text-secondary mt-2 max-w-md mx-auto">Renewable energy performance monitoring, IoT telemetry, battery health, and AI-based equipment insights will be added in a future phase.</p>
      </div>
    </div>
  )
}
