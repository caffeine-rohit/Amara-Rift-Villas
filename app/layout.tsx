import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans, Cormorant_SC } from 'next/font/google'
import './globals.css'
import { PageLoader } from '@/components/page-loader'
import { CustomCursor } from '@/components/custom-cursor'
import { SmoothScroll } from '@/components/smooth-scroll'

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant-garamond',
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

const cormorantSC = Cormorant_SC({
  variable: '--font-cormorant-sc',
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Svarga Private Villas — Ubud, Bali',
  description: 'Three private estates with infinity pools, rice field vistas, and full staff — from $485 per night. Where Bali Dreams Become Yours.',
  keywords: ['Bali luxury villa', 'Ubud private villa', 'Bali boutique estate', 'Svarga private villas'],
  openGraph: {
    title: 'Svarga Private Villas — Ubud, Bali',
    description: 'Three private estates with infinity pools, rice field vistas, and full staff.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0D1F0F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${dmSans.variable} ${cormorantSC.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <SmoothScroll />
        <PageLoader />
        <CustomCursor />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
