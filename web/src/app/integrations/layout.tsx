import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <Sidebar />
      <Topbar />
      <main className="dash-main"><div className="p-4 sm:p-6">{children}</div></main>
    </div>
  )
}
