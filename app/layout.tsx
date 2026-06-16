import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Preloader } from '@/components/preloader'
import { LuxuryCursor } from '@/components/luxury-cursor'
import { ScrollProgress } from '@/components/scroll-progress'

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
})
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Amara Rift Villas — Lakeside Luxury in Naivasha, Kenya',
  description:
    'A four-bedroom private villa on the shores of Lake Naivasha. Infinity pool, private chef, and uninterrupted Rift Valley views. Book direct — no booking fees, free cancellation.',
  keywords: ['Lake Naivasha villa', 'Kenya luxury stay', 'Naivasha accommodation', 'private villa Kenya', 'Rift Valley lodge'],
  openGraph: {
    title: 'Amara Rift Villas — Lakeside Luxury in Naivasha, Kenya',
    description: 'A four-bedroom private villa on the shores of Lake Naivasha. Book direct and save.',
    images: ['/images/hero-villa.png'],
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1611',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased grain">
        <Preloader />
        <ScrollProgress />
        <LuxuryCursor />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
