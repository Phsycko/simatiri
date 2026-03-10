'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react'
import { DISPLAY_PHONE, getTelUrl } from '@/lib/site-config'
import { useTranslation } from '@/contexts/LocaleContext'

const footerStructure = {
  descubrir: [
    { key: 'footer.destinos', href: '/destinations' },
    { key: 'footer.experiencias', href: '/experiences' },
    { key: 'footer.hoteles', href: '/hotels' },
  ],
  empresa: [
    { key: 'footer.nosotros', href: '/about' },
    { key: 'footer.contacto', href: '/contact' },
    { key: 'footer.viajeMedida', href: '/tailor-made-trip' },
  ],
} as const

export function Footer() {
    const { t } = useTranslation()

    return (
        <footer className="bg-[#0C1F19] text-[#C7D1CC]">
            <div className="max-w-7xl mx-auto px-8 pt-20 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

                    {/* Brand Col */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <div className="font-serif text-3xl font-semibold tracking-tight text-[#FFFFFF]">SIMATIRI</div>
                            <div className="text-xs uppercase tracking-[0.25em] text-[#8FAF9F] font-medium mt-0.5">EXPERIENCE</div>
                        </div>
                        <p className="text-[#C7D1CC] text-sm leading-relaxed max-w-xs mb-8">
                            {t('footer.brandDesc')}
                        </p>
                        <div
                            className="inline-flex items-center gap-3 rounded-xl px-4 py-3"
                            style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                            <ShieldCheck size={20} className="text-[#8FAF9F] shrink-0" />
                            <div>
                                <div className="text-xs font-semibold text-[#E5ECE8]">{t('footer.prestadorCertificado')}</div>
                                <div className="font-mono text-[10px] text-[#E5ECE8] mt-0.5">{t('footer.rnt')}</div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Cols */}
                    {Object.entries(footerStructure).map(([sectionKey, links]) => (
                        <div key={sectionKey}>
                            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FFFFFF] mb-6">{t(`footer.${sectionKey}`)}</h4>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-[#D9E2DE] hover:text-[#8FAF9F] transition-colors">
                                            {t(link.key)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Col */}
                    <div>
                        <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FFFFFF] mb-6">{t('footer.contacto')}</h4>
                        <ul className="space-y-4 text-sm text-[#C7D1CC]">
                            <li className="flex items-start gap-3">
                                <MapPin size={15} className="shrink-0 mt-0.5 text-[#8FAF9F]" />
                                <span>{t('footer.direccion')}<br />{t('footer.direccionLine2')}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={15} className="shrink-0 text-[#8FAF9F]" />
                                <a href={getTelUrl()} className="text-[#D9E2DE] hover:text-[#8FAF9F] transition-colors">{DISPLAY_PHONE}</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={15} className="shrink-0 text-[#8FAF9F]" />
                                <a href="mailto:ventas@simatiri.com" className="text-[#D9E2DE] hover:text-[#8FAF9F] transition-colors">ventas@simatiri.com</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            <div
                className="bg-[#081612] py-6 border-t"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#C7D1CC]/70">
                    <p>© {new Date().getFullYear()} Simatiri Experience. {t('footer.derechosReservados')}</p>
                    <p>{t('footer.operadoraRegistrada')}</p>
                </div>
            </div>
        </footer>
    )
}
