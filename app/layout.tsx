import type { Metadata } from 'next'
import { Playfair_Display, Montserrat, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { JsonLd } from '@/components/shared/JsonLd'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { GoldParticles } from '@/components/ui/GoldParticles'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kathesjewelry.com'),
  title: {
    default: "Kathe's Jewelry | New York's Trusted Jeweler Since 1993",
    template: "%s | Kathe's Jewelry NYC",
  },
  description:
    "Custom jewelry design, expert repairs & fine jewelry in NYC's East Village. Family-owned since 1993. GIA-certified gemologist. 4.8★ on Google & Yelp.",
  openGraph: {
    type: 'website',
    siteName: "Kathe's Jewelry",
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} ${lora.variable}`}
    >
      <body className="antialiased">
        <JsonLd />
        {/* Gold sparkle particles — follows mouse globally */}
        <GoldParticles />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
