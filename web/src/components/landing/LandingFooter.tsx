import Link from 'next/link'
import { Linkedin, Twitter, Youtube } from 'lucide-react'

const COLUMNS = {
  Product: ['Operations Control Tower', 'Shipments', 'Warehouse Operations', 'Inventory Control', 'Equipment Assets', 'AI Monitoring'],
  Company: ['About Velqora', 'Careers', 'Blog', 'Press', 'Partners', 'Contact'],
  Platform: ['Pricing', 'Integrations', 'API Documentation', 'Onboarding & Migration', 'Status', 'Security'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Data Processing'],
}

export function LandingFooter() {
  return (
    <footer className="bg-navy-900">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">One platform. Endless possibilities.</h3>
              <p className="text-blue-300 text-sm">Start your free 14-day trial. No credit card required.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link href="/auth/login" className="btn-primary justify-center">Start free trial</Link>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-btn hover:bg-white/20 transition-colors">Contact sales</a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)' }}>
                <span className="text-white font-black text-lg">V</span>
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">VELQORA</span>
                <span className="block text-2xs font-semibold text-blue-300 tracking-[0.2em] uppercase">Enterprise ERP</span>
              </div>
            </div>
            <p className="text-blue-300 text-xs sm:text-sm leading-relaxed mb-5">Move. Manage. Master. The all-in-one logistics and renewable energy ERP for modern supply chains.</p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/70 hover:text-white">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(COLUMNS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-xs sm:text-sm mb-3 sm:mb-4">{heading}</h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {links.map(l => (
                  <li key={l}><a href="#" className="text-blue-300 text-xs sm:text-sm hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-blue-400 text-xs">© {new Date().getFullYear()} Velqora Enterprises B.V. All rights reserved.</p>
          <div className="flex items-center gap-3 sm:gap-4">
            {['Privacy', 'Terms', 'Cookies'].map(l => <a key={l} href="#" className="text-blue-400 text-xs hover:text-white transition-colors">{l}</a>)}
            <span className="text-blue-500 text-xs">Built with ❤️ in Rotterdam</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
