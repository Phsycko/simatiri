import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layouts/Navbar'
import { Footer } from '@/components/layouts/Footer'
import { WhatsAppFloatingButton } from '@/components/ui/WhatsAppFloatingButton'
import { LocaleProvider } from '@/contexts/LocaleContext'
import { LOCALE_COOKIE, DEFAULT_LOCALE, type Locale } from '@/lib/i18n'
import { getBaseUrl, buildShareMeta } from '@/lib/metadata'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const defaultTitle = 'SIMATIRI EXPERIENCE | Operadora Turística en las Barrancas del Cobre'
const defaultDescription =
  'Operadora turística certificada especializada en la Sierra Tarahumara, Creel, el Tren CHEPE y las Barrancas del Cobre. Paquetes, tours y hoteles exclusivos en el norte de México.'

const defaultShare = buildShareMeta({
  title: defaultTitle,
  description: defaultDescription,
  pathname: '/',
})

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: '%s | SIMATIRI EXPERIENCE',
  },
  description: defaultDescription,
  keywords: 'barrancas del cobre, creel, tren chepe, chihuahua, operadora turistica, sierra tarahumara, tour, paquete',
  authors: [{ name: 'Simatiri Experience' }],
  icons: {
    icon: [
      { url: '/a91a08f4-4f29-4022-9cc6-ee54b027a077.jpg', type: 'image/jpeg', sizes: 'any' },
    ],
    apple: '/a91a08f4-4f29-4022-9cc6-ee54b027a077.jpg',
  },
  metadataBase: new URL(getBaseUrl()),
  openGraph: {
    ...defaultShare.openGraph,
  },
  twitter: {
    ...defaultShare.twitter,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value
  const initialLocale: Locale = localeCookie === 'en' || localeCookie === 'es' ? localeCookie : DEFAULT_LOCALE

  return (
    <html lang={initialLocale} className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col bg-white text-gray-900 selection:bg-[#e5d3b3] selection:text-[#0a192f]">
        <LocaleProvider initialLocale={initialLocale}>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <WhatsAppFloatingButton />
        </LocaleProvider>
      </body>
    </html>
  )
}
