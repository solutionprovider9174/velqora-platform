const TESTIMONIALS = [
  {
    quote: "Velqora transformed our operations. We reduced delivery delays by 40% in the first month. The multi-warehouse view alone saved us hours every day.",
    name: 'Sarah Chen', role: 'VP Operations, EuroFreight GmbH',
    avatar: 'SC', bg: '#1D4ED8',
  },
  {
    quote: "The multi-currency and multi-language support was a game changer for our international expansion into 8 new markets this year.",
    name: 'Ahmed Al-Mansouri', role: 'CEO, Gulf Logistics Group',
    avatar: 'AA', bg: '#059669',
  },
  {
    quote: "Finally a logistics platform that works the way our team thinks. The equipment lifecycle tracking is incredible.",
    name: 'Maria Rossi', role: 'Head of Supply Chain, Novaport SRL',
    avatar: 'MR', bg: '#7C3AED',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Trusted worldwide</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-900 mb-3">What our customers say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="card p-5 sm:p-6">
              <div className="text-amber-500 mb-3 text-sm tracking-widest">★★★★★</div>
              <p className="text-sm text-text-secondary leading-relaxed italic mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: t.bg }}>{t.avatar}</div>
                <div>
                  <p className="text-sm font-bold text-navy-900">{t.name}</p>
                  <p className="text-xs text-text-secondary">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
