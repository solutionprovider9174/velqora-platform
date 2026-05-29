'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  LayoutDashboard, Truck, Warehouse, Package, Box, Car, Users, Sun,
  Receipt, Bot, BarChart2, Settings, Plug, Upload, Building2, UserCog,
  ChevronLeft, ChevronRight, Menu, X
} from 'lucide-react'
import clsx from 'clsx'

type ModuleStatus = 'active' | 'preview' | 'roadmap'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
  status?: ModuleStatus
}

const NAV_SECTIONS: { section: string; items: NavItem[] }[] = [
  {
    section: 'Dashboards',
    items: [
      { label: 'Overview', href: '/dashboard', icon: <LayoutDashboard size={18} />, status: 'active' },
    ],
  },
  {
    section: 'Operations',
    items: [
      { label: 'Shipments', href: '/shipments', icon: <Truck size={18} />, badge: 3, status: 'active' },
      { label: 'Warehouse Ops', href: '/warehouse', icon: <Warehouse size={18} />, status: 'active' },
      { label: 'Inventory', href: '/inventory', icon: <Package size={18} />, badge: 7, status: 'active' },
      { label: 'Equipment Assets', href: '/equipment', icon: <Box size={18} />, status: 'active' },
      { label: 'Fleet Monitoring', href: '/fleet', icon: <Car size={18} />, status: 'roadmap' },
      { label: 'Driver Management', href: '/drivers', icon: <Users size={18} />, status: 'roadmap' },
      { label: 'Energy Systems', href: '/energy', icon: <Sun size={18} />, status: 'roadmap' },
    ],
  },
  {
    section: 'Management',
    items: [
      { label: 'Finance & Billing', href: '/finance', icon: <Receipt size={18} />, status: 'roadmap' },
      { label: 'AI Monitoring', href: '/ai-monitoring', icon: <Bot size={18} />, status: 'preview' },
      { label: 'Reports', href: '/reports', icon: <BarChart2 size={18} />, status: 'active' },
    ],
  },
  {
    section: 'Platform',
    items: [
      { label: 'Companies', href: '/companies', icon: <Building2 size={18} />, status: 'active' },
      { label: 'Users & Access', href: '/users', icon: <UserCog size={18} />, status: 'active' },
      { label: 'Onboarding', href: '/onboarding', icon: <Upload size={18} />, status: 'roadmap' },
      { label: 'Integrations', href: '/integrations', icon: <Plug size={18} />, status: 'roadmap' },
      { label: 'Settings', href: '/settings', icon: <Settings size={18} />, status: 'active' },
    ],
  },
]

const STATUS_STYLES: Record<ModuleStatus, string> = {
  active:  '',
  preview: 'bg-warning/10 text-warning border border-warning/20',
  roadmap: 'bg-slate-100 text-slate-600 border border-slate-200',
}

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-16 px-4 border-b border-border flex-shrink-0">
        <Link href="/dashboard" className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center flex-shrink-0 shadow-glow">
            <span className="text-white font-black text-base">V</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <span className="text-base font-black text-navy-900 tracking-tight leading-none block">VELQORA</span>
              <span className="text-2xs text-text-disabled tracking-widest uppercase">Logistics</span>
            </div>
          )}
        </Link>
        {!collapsed && (
          <button onClick={() => setCollapsed(true)}
            className="ml-auto p-1.5 rounded-btn text-text-disabled hover:text-brand-600 hover:bg-brand-50 hidden lg:flex">
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV_SECTIONS.map(({ section, items }) => (
          <div key={section} className="mb-3">
            {!collapsed && (
              <p className="text-2xs font-bold text-text-disabled uppercase tracking-widest px-3 mb-1.5">{section}</p>
            )}
            {items.map((item) => {
              const active = isActive(item.href)
              return (
                <Link key={item.label} href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={clsx(
                    'flex items-center gap-3 px-3 py-2 rounded-btn text-sm transition-all duration-150 relative group mb-0.5',
                    active
                      ? 'bg-brand-50 text-brand-700 font-semibold'
                      : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary'
                  )}
                >
                  <span className={clsx('flex-shrink-0', active ? 'text-brand-600' : 'text-text-disabled group-hover:text-text-primary')}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge != null && (
                        <span className="min-w-[18px] h-4 px-1.5 rounded-full bg-danger text-white text-2xs flex items-center justify-center font-bold">{item.badge}</span>
                      )}
                      {item.status === 'preview' && (
                        <span className="text-2xs font-semibold text-warning bg-warning/10 px-1.5 py-0.5 rounded">Preview</span>
                      )}
                      {item.status === 'roadmap' && (
                        <span className="text-2xs font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">Soon</span>
                      )}
                    </>
                  )}
                  {collapsed && item.badge != null && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger" />
                  )}
                  {active && !collapsed && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-l-full bg-brand-600" />
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {collapsed && (
        <div className="px-2 pb-3 hidden lg:block">
          <button onClick={() => setCollapsed(false)}
            className="w-full flex items-center justify-center p-2 rounded-btn text-text-disabled hover:text-brand-600 hover:bg-brand-50">
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <div className={clsx('border-t border-border p-3 flex items-center gap-3', collapsed && 'justify-center')}>
        <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AK</div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text-primary truncate">Admin User</p>
            <p className="text-2xs text-text-disabled truncate">admin@velqora.com</p>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      <button onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 w-10 h-10 bg-white shadow-card-md rounded-btn flex items-center justify-center text-text-primary border border-border">
        <Menu size={18} />
      </button>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
      )}
      <aside className={clsx(
        'lg:hidden fixed top-0 left-0 h-full z-50 w-[280px] bg-white shadow-xl transition-transform duration-300',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <button onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-btn text-text-disabled hover:text-text-primary z-10">
          <X size={18} />
        </button>
        <SidebarContent />
      </aside>
      <aside
        className="hidden lg:flex flex-col fixed top-0 left-0 h-full bg-white border-r border-border z-30 transition-all duration-250 shadow-sm"
        style={{ width: collapsed ? 72 : 260 }}>
        <SidebarContent />
      </aside>
    </>
  )
}
