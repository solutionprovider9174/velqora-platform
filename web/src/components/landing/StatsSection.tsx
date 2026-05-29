const STATS = [
  { v: '10,000+', l: 'Active users' },
  { v: '98.6%', l: 'On-time delivery' },
  { v: '150+', l: 'Countries served' },
  { v: '€2.1B+', l: 'Freight managed' },
  { v: '15+', l: 'Languages' },
  { v: '24/7', l: 'Expert support' },
]

export function StatsSection() {
  return (
    <section className="bg-navy-950 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
          {STATS.map(s => (
            <div key={s.l} className="border-r border-white/5 last:border-r-0 px-2">
              <div className="text-lg sm:text-2xl font-black text-white">{s.v}</div>
              <div className="text-2xs sm:text-xs text-slate-400 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
