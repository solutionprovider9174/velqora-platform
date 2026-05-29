'use client'
import { usePathname } from 'next/navigation'
import { Search, Bell, Globe, ChevronDown, Building2 } from 'lucide-react'
import { useState } from 'react'

const TITLES: Record<string, string> = {
  '/dashboard':'Operations Control Tower','/shipments':'Shipments','/warehouse':'Warehouse Operations',
  '/inventory':'Inventory Control','/equipment':'Equipment Assets','/fleet':'Fleet Monitoring',
  '/drivers':'Driver Management','/energy':'Energy Systems','/finance':'Finance & Billing',
  '/ai-monitoring':'AI Monitoring','/reports':'Reports','/settings':'Settings',
  '/companies':'Companies','/users':'Users & Access','/onboarding':'Onboarding & Migration','/integrations':'Integrations',
}

export function Topbar() {
  const pathname = usePathname()
  const base = '/' + pathname.split('/')[1]
  const title = TITLES[base] ?? 'Velqora'
  const [companyOpen, setCompanyOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  return (
    <header
      className="fixed top-0 right-0 z-20 h-16 bg-white border-b border-border flex items-center px-4 lg:px-6 gap-3"
      style={{ left: 'var(--sidebar-w, 260px)', transition: 'left 0.25s ease' }}
    >
      <div className="w-10 lg:hidden flex-shrink-0" />

      <div className="hidden md:block min-w-0">
        <p className="text-sm sm:text-base font-bold text-text-primary truncate">{title}</p>
      </div>

      <div className="hidden lg:flex items-center gap-2 bg-surface-secondary border border-border rounded-btn px-3 py-2 w-64 group focus-within:border-brand-500 ml-4">
        <Search size={14} className="text-text-disabled group-focus-within:text-brand-600 flex-shrink-0" />
        <input type="text" placeholder="Search shipments, products, assets..."
          className="bg-transparent text-sm text-text-primary placeholder:text-text-disabled outline-none w-full min-w-0" />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <button onClick={() => setCompanyOpen(!companyOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-btn border border-border hover:border-brand-400 text-text-secondary hover:text-brand-700 text-sm transition-colors">
            <Building2 size={14} />
            <span className="font-medium">Velqora Ent.</span>
            <ChevronDown size={13} />
          </button>
          {companyOpen && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-card-lg border border-border py-1 z-50">
              <p className="text-2xs font-bold uppercase text-text-disabled px-3 py-1.5">Switch company</p>
              {['Velqora Enterprises', 'Velqora EU', 'Velqora MENA'].map(c => (
                <button key={c} className="w-full text-left px-3 py-2 text-sm hover:bg-surface-secondary text-text-primary">{c}</button>
              ))}
            </div>
          )}
        </div>

        <div className="relative hidden sm:block">
          <button onClick={() => setLangOpen(!langOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-btn text-text-secondary hover:text-brand-600 hover:bg-brand-50">
            <Globe size={18} />
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-lg shadow-card-lg border border-border py-1 z-50">
              <p className="text-2xs font-bold uppercase text-text-disabled px-3 py-1.5">Language</p>
              {['🇬🇧 English','🇫🇷 Français','🇩🇪 Deutsch','🇪🇸 Español','🇸🇦 العربية'].map(l => (
                <button key={l} className="w-full text-left px-3 py-2 text-sm hover:bg-surface-secondary text-text-primary">{l}</button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button className="w-9 h-9 flex items-center justify-center rounded-btn text-text-secondary hover:text-brand-600 hover:bg-brand-50">
            <Bell size={18} />
          </button>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger border-2 border-white" />
        </div>

        <div className="ml-1 w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer ring-2 ring-brand-200 hover:ring-brand-400">AK</div>
      </div>
    </header>
  )
}
