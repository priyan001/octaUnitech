import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  icons: { icon: '/favicon.png' },
  title: 'OctaUnitech Solutions – Cloud, DevOps & IT Consulting',
  description:
    'OctaUnitech delivers end-to-end Cloud, DevOps, and Digital Transformation services — trusted by Fortune 500 firms for over a decade. Based in Bangalore, India.',
  keywords: 'cloud services, devops consulting, digital transformation, system integration, IT consulting, Bangalore',
  openGraph: {
    title: 'OctaUnitech Solutions – Cloud, DevOps & IT Consulting',
    description: 'Trusted Cloud & DevOps partner since 2010. Serving Fortune 500 enterprises from Bangalore.',
    url: 'https://octaunitech.com',
    siteName: 'OctaUnitech Solutions',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  )
}
