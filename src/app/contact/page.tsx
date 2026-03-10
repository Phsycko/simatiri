import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { buildShareMeta } from '@/lib/metadata'
import { DISPLAY_PHONE, getTelUrl } from '@/lib/site-config'
import { LOCALE_COOKIE, getLocaleFromCookie, getT } from '@/lib/i18n'

const title = 'Contacto | Simatiri Experience'
const description = 'Contacta a Simatiri Experience para reservas, cotizaciones y convenios de agencia. Estamos en Creel, Chihuahua.'

export const metadata: Metadata = {
  title,
  description,
  ...buildShareMeta({ title, description, pathname: '/contact' }),
}

export default async function ContactPage() {
  const cookieStore = await cookies()
  const locale = getLocaleFromCookie(cookieStore.get(LOCALE_COOKIE)?.value)
  const t = getT(locale)

  const contactItems = [
    { icon: MapPin, labelKey: 'contact.direccion' as const, value: t('contact.direccionVal'), href: undefined as string | undefined },
    { icon: Phone, labelKey: 'contact.telefono' as const, value: DISPLAY_PHONE, href: getTelUrl() },
    { icon: Mail, labelKey: 'contact.correo' as const, value: 'ventas@simatiri.com', href: 'mailto:ventas@simatiri.com' },
    { icon: Clock, labelKey: 'contact.horario' as const, value: t('contact.horarioVal'), href: undefined },
  ]

  return (
        <>
            <PageHero
                title={t('contact.heroTitle')}
                subtitle={t('contact.heroSubtitle')}
                size="sm"
                backgroundImage="https://drive.google.com/uc?export=view&id=1ebc95Zf8tXLNnYfobC6IfKMO-V3Bh7ML"
                overlay="linear-gradient(rgba(0,0,0,0.36), rgba(0,0,0,0.42))"
            />

            <section className="py-20 px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">

                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="font-serif text-2xl text-[#0a192f]">{t('contact.infoContacto')}</h2>

                        <div className="space-y-5">
                            {contactItems.map(({ icon: Icon, labelKey, value, href }) => (
                                <div key={labelKey} className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[#f8f9fa] rounded-full flex items-center justify-center shrink-0">
                                        <Icon size={16} className="text-[#7B4B2A]" />
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-0.5">{t(labelKey)}</div>
                                        {href ? (
                                            <a href={href} className="text-sm text-gray-700 whitespace-pre-line hover:text-[#7B4B2A] transition-colors">
                                                {value}
                                            </a>
                                        ) : (
                                            <div className="text-sm text-gray-700 whitespace-pre-line">{value}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#1a1512] rounded-2xl p-6 text-white">
                            <h4 className="font-serif text-lg mb-2">{t('contact.paraAgencias')}</h4>
                            <p className="text-white/60 text-sm mb-4">{t('contact.paraAgenciasDesc')}</p>
                            <a href="mailto:ventas@simatiri.com" className="text-[#B7925A] text-sm font-medium hover:text-[#e5d3b3] transition-colors">
                                ventas@simatiri.com →
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                            <h3 className="font-serif text-2xl text-[#0a192f] mb-6">{t('contact.enviarMensaje')}</h3>
                            <ContactForm />
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
