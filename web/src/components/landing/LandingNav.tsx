'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#global', label: 'Global' },
  { href: '#contact', label: 'Contact' },
]

export function LandingNav() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/landing" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)' }}>
              <span className="text-white font-black text-lg">V</span>
            </div>
            <div className="leading-tight">
              <span className="text-base font-black text-white tracking-tight">VELQORA</span>
              <span className="block text-2xs font-semibold text-blue-300 tracking-[0.18em] uppercase">Enterprise ERP</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-blue-200 hover:text-white text-sm font-medium px-3 py-2 rounded-md hover:bg-white/5 transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/auth/login" className="text-white text-sm font-semibold border border-white/30 px-4 py-2 rounded-btn hover:bg-white/10 transition-colors">Sign in</Link>
            <Link href="/auth/login" className="bg-brand-600 text-white text-sm font-bold px-5 py-2 rounded-btn hover:bg-brand-700 transition-colors">Get started free</Link>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2" aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden py-4 border-t border-white/10 space-y-2">
            {LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-blue-200 hover:text-white text-sm font-medium px-3 py-2 rounded-md hover:bg-white/5">{l.label}</a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/auth/login" className="text-white text-sm font-semibold border border-white/30 px-4 py-2 rounded-btn text-center">Sign in</Link>
              <Link href="/auth/login" className="bg-brand-600 text-white text-sm font-bold px-5 py-2 rounded-btn text-center">Get started free</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
