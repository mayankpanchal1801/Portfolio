import Header from '@/components/shared/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import Footer from '@/components/shared/Footer'
import ActiveSectionContextProvider from '@/context/active-section-context'
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider'
import CustomCursor from '@/components/ui/CustomCursor'
import NoiseCanvas from '@/components/ui/NoiseCanvas'
import PageTransition from '@/components/ui/PageTransition'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mayank Panchal — Full Stack Developer',
  description:
    'Full Stack Developer with 3+ years of experience crafting high-performance, pixel-perfect web experiences. Specializing in React, Next.js, Node.js, and modern web technologies.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="bg-void text-chalk font-body overflow-x-hidden">
        <ActiveSectionContextProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <NoiseCanvas />
            <PageTransition />
            <Header />
            {children}
            <Footer />
          </SmoothScrollProvider>
        </ActiveSectionContextProvider>
      </body>
    </html>
  )
}
