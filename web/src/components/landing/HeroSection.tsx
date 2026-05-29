'use client'
import Link from 'next/link'
import { ArrowRight, Play, CheckCircle } from 'lucide-react'

const TRUST = ['No credit card required', 'Free 14-day trial', 'Cancel anytime']
const KPIS = [
  { l: 'Active Shipments', v: '486', d: '+8.2%' },
  { l: 'On Time Delivery', v: '98.6%', d: '+4.2%' },
  { l: 'Equipment Assets', v: '1,284', d: '+18' },
  { l: 'Warehouses', v: '12', d: '+1' },
]

export function HeroSection() {
  return (
    <section className="relative flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg,#0F2255 0%,#1D4ED8 60%,#0F2255 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs sm:text-sm text-blue-100 font-medium">Global. Connected. Ready.</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
              Move.<br />
              <span style={{ background: 'linear-gradient(135deg,#F59E0B,#FCD34D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Manage.</span>
              <br />Master.
            </h1>
            <p className="text-base sm:text-lg text-blue-100 leading-relaxed mb-6 max-w-lg">
              The all-in-one logistics & renewable energy ERP — <strong className="text-white">15+ languages, 12+ currencies</strong>, real-time visibility, and AI monitoring for your entire supply chain.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6">
              {TRUST.map(t => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-blue-100">
                  <CheckCircle size={14} className="text-green-400 flex-shrink-0" />{t}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/auth/login" className="bg-brand-600 hover:bg-brand-700 text-white text-sm sm:text-base font-bold px-6 py-3 rounded-btn inline-flex items-center justify-center gap-2 transition-colors">
                Start free trial <ArrowRight size={17} />
              </Link>
              <button className="flex items-center justify-center gap-2 text-white text-sm sm:text-base font-semibold px-5 py-3 rounded-btn border border-white/20 hover:bg-white/10 transition-colors">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center"><Play size={12} fill="white" /></div>
                Watch demo
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 bg-white/10 rounded px-3 py-1 text-xs text-blue-200 ml-2">velqora.app/dashboard</div>
              </div>
              <p className="text-xs font-semibold text-white/80 mb-2">OPERATIONS CONTROL TOWER</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {KPIS.map(k => (
                  <div key={k.l} className="bg-white/10 rounded-xl p-3">
                    <p className="text-white font-bold text-base">{k.v}</p>
                    <p className="text-blue-200 text-2xs mt-0.5 leading-tight">{k.l}</p>
                    <p className="text-green-400 text-2xs font-semibold mt-1">{k.d}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-blue-200 text-xs mb-2">Shipment volume — last 12 days</p>
                <div className="flex items-end gap-1 h-14">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: 'rgba(96,165,250,0.5)' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
