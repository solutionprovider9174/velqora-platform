'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: 'admin@velqora.com', password: 'password' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: 'linear-gradient(135deg,#0F2255 0%,#1D4ED8 60%,#0F2255 100%)' }}>
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-10 xl:p-14">
        <Link href="/landing" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
            <span className="text-white font-black text-xl">V</span>
          </div>
          <div>
            <span className="text-2xl font-black text-white tracking-tight">VELQORA</span>
            <span className="block text-xs font-semibold text-blue-200 tracking-[0.2em] uppercase">Enterprise ERP</span>
          </div>
        </Link>
        <div>
          <h2 className="text-3xl xl:text-4xl font-black text-white mb-4 leading-tight">
            Welcome back to<br />
            <span style={{ background: 'linear-gradient(135deg,#F59E0B,#FCD34D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>your control tower</span>
          </h2>
          <p className="text-blue-200 leading-relaxed mb-8 text-sm xl:text-base">
            Operations Control Tower — shipments, warehouse, inventory, equipment, finance, and AI monitoring in one platform.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🚚', label: '486 shipments', sub: 'Active right now' },
              { icon: '📦', label: '48,920 units', sub: 'In inventory' },
              { icon: '⚡', label: '1,284 assets', sub: 'Equipment tracked' },
              { icon: '🏭', label: '12 warehouses', sub: 'Live monitoring' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 border border-white/20 rounded-xl p-4">
                <div className="text-2xl mb-2">{s.icon}</div>
                <p className="text-white font-bold text-sm">{s.label}</p>
                <p className="text-blue-300 text-xs">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-blue-400 text-sm">© {new Date().getFullYear()} Velqora Enterprises B.V.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
          <Link href="/landing" className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)' }}>
              <span className="text-white font-black">V</span>
            </div>
            <span className="text-xl font-black text-navy-900">VELQORA</span>
          </Link>

          <h1 className="text-xl sm:text-2xl font-black text-text-primary mb-1">Sign in to Velqora</h1>
          <p className="text-text-secondary text-sm mb-6">Enter your credentials to access your dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="input-label">Email address</label>
              <input type="email" className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" required />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="input-label mb-0">Password</label>
                <a href="#" className="text-xs text-brand-600 hover:underline font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <input type={show ? 'text' : 'password'} className="input pr-10" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Enter your password" required />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-disabled hover:text-text-secondary">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded border-border w-4 h-4" defaultChecked />
              <label htmlFor="remember" className="text-sm text-text-secondary cursor-pointer">Keep me signed in</label>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-sm sm:text-base">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : <span className="flex items-center gap-2">Sign in <ArrowRight size={16} /></span>}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-border text-center">
            <p className="text-sm text-text-secondary">
              Don't have an account?{' '}
              <a href="#" className="text-brand-600 font-semibold hover:underline">Start free trial</a>
            </p>
          </div>

          <div className="mt-4 bg-surface-secondary rounded-xl p-3">
            <p className="text-xs text-text-secondary font-semibold mb-1">Demo credentials</p>
            <p className="text-xs text-text-secondary">Email: <code className="text-brand-700">admin@velqora.com</code></p>
            <p className="text-xs text-text-secondary">Password: <code className="text-brand-700">password</code></p>
          </div>
        </div>
      </div>
    </div>
  )
}
