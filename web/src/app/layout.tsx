import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/shared/Providers'

export const metadata: Metadata = {
  title: { template: '%s | Velqora', default: 'Velqora — Move. Manage. Master.' },
  description: 'Enterprise logistics ERP platform with real-time visibility, AI monitoring, and global multi-currency support.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
