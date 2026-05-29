const LANGUAGES = [
  { flag: '🇬🇧', label: 'English' }, { flag: '🇫🇷', label: 'Français' }, { flag: '🇩🇪', label: 'Deutsch' },
  { flag: '🇪🇸', label: 'Español' }, { flag: '🇮🇹', label: 'Italiano' }, { flag: '🇳🇱', label: 'Nederlands' },
  { flag: '🇵🇹', label: 'Português' }, { flag: '🇸🇪', label: 'Svenska' }, { flag: '🇳🇴', label: 'Norsk' },
  { flag: '🇫🇮', label: 'Suomi' }, { flag: '🇵🇱', label: 'Polski' }, { flag: '🇨🇿', label: 'Čeština' },
  { flag: '🇷🇴', label: 'Română' }, { flag: '🇬🇷', label: 'Ελληνικά' }, { flag: '🇹🇷', label: 'Türkçe' },
  { flag: '🇧🇷', label: 'Português BR' }, { flag: '🇸🇦', label: 'العربية' }, { flag: '🇰🇼', label: 'العربية KW' },
  { flag: '🇦🇪', label: 'العربية AE' }, { flag: '➕', label: 'More' },
]

const CURRENCIES = [
  { symbol: '€', code: 'EUR', name: 'Euro' },
  { symbol: '$', code: 'USD', name: 'US Dollar' },
  { symbol: '£', code: 'GBP', name: 'British Pound' },
  { symbol: '¥', code: 'JPY', name: 'Japanese Yen' },
  { symbol: 'kr', code: 'SEK', name: 'Swedish Krona' },
  { symbol: 'kr', code: 'NOK', name: 'Norwegian Krone' },
  { symbol: 'CHF', code: 'CHF', name: 'Swiss Franc' },
  { symbol: 'zł', code: 'PLN', name: 'Polish Zloty' },
  { symbol: 'kr', code: 'DKK', name: 'Danish Krone' },
  { symbol: 'AED', code: 'AED', name: 'UAE Dirham' },
  { symbol: 'SAR', code: 'SAR', name: 'Saudi Riyal' },
  { symbol: '+', code: 'MORE', name: 'More currencies' },
]

export function GlobalSection() {
  return (
    <section id="global" className="py-16 sm:py-20 lg:py-28 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-800/50 border border-brand-500/30 text-brand-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            🌐 Global Ready
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">Global. Connected. Ready.</h2>
          <p className="text-blue-300 text-sm sm:text-base max-w-xl mx-auto">Built for modern logistics. Ready for the world.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-navy-800/60 border border-white/10 rounded-2xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-600/30 border border-brand-500/30 flex items-center justify-center text-lg sm:text-xl flex-shrink-0">🌐</div>
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base">Global Language Support</h3>
                <p className="text-blue-300 text-xs sm:text-sm">European, MENA, and global languages</p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {LANGUAGES.map(l => (
                <div key={l.label} className="flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-lg sm:text-2xl">{l.flag}</span>
                  <span className="text-2xs text-blue-300 text-center leading-tight">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-navy-800/60 border border-white/10 rounded-2xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/30 flex items-center justify-center text-lg sm:text-xl flex-shrink-0">💱</div>
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base">Multi-Currency Support</h3>
                <p className="text-blue-300 text-xs sm:text-sm">Real-time exchange rates across the globe</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {CURRENCIES.map(c => (
                <div key={c.code} className="flex flex-col items-center gap-0.5 p-2 sm:p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-base sm:text-xl font-black text-white">{c.symbol}</span>
                  <span className="text-2xs font-bold text-brand-300">{c.code}</span>
                  <span className="text-2xs text-blue-400 text-center leading-tight hidden sm:block">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
