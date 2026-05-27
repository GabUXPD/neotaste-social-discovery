import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NeoTaste — Social Discovery',
  description: 'Lightweight social discovery layer built on the Recency Counter concept.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body style={{ fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#0a0a0a' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
