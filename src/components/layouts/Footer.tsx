import Link from 'next/link'
import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react'

const footerNav = {
    Descubrir: [
        { label: 'Destinos', href: '/destinations' },
        { label: 'Experiencias', href: '/experiences' },
        { label: 'Paquetes CHEPE', href: '/packages' },
        { label: 'Hoteles', href: '/hotels' },
    ],
    Empresa: [
        { label: 'Nosotros', href: '/about' },
        // { label: 'Journal', href: '/journal' }, // Oculto temporalmente por petición
        { label: 'Contacto', href: '/contact' },
        { label: 'Viaje a la Medida', href: '/tailor-made-trip' },
    ],
}

export function Footer() {
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
                            Operadora turística especializada en la Sierra Tarahumara, el Tren CHEPE y las Barrancas del Cobre en el norte de México.
                        </p>
                        {/* RNT Badge */}
                        <div
                            className="inline-flex items-center gap-3 rounded-xl px-4 py-3"
                            style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                            <ShieldCheck size={20} className="text-[#8FAF9F] shrink-0" />
                            <div>
                                <div className="text-xs font-semibold text-[#E5ECE8]">Prestador Certificado</div>
                                <div className="font-mono text-[10px] text-[#E5ECE8] mt-0.5">RNT: 0108009be33c3</div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Cols */}
                    {Object.entries(footerNav).map(([section, links]) => (
                        <div key={section}>
                            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FFFFFF] mb-6">{section}</h4>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-[#D9E2DE] hover:text-[#8FAF9F] transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Col */}
                    <div>
                        <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FFFFFF] mb-6">Contacto</h4>
                        <ul className="space-y-4 text-sm text-[#C7D1CC]">
                            <li className="flex items-start gap-3">
                                <MapPin size={15} className="shrink-0 mt-0.5 text-[#8FAF9F]" />
                                <span>Rochivo 00, Creel, Bocoyna<br />Chihuahua, CP 33200</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={15} className="shrink-0 text-[#8FAF9F]" />
                                <a href="tel:+526142528190" className="text-[#D9E2DE] hover:text-[#8FAF9F] transition-colors">+52 614 252 8190</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={15} className="shrink-0 text-[#8FAF9F]" />
                                <a href="mailto:ventas@simatiri.com" className="text-[#D9E2DE] hover:text-[#8FAF9F] transition-colors">ventas@simatiri.com</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Segunda Capa Inferior */}
            <div
                className="bg-[#081612] py-6 border-t"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#C7D1CC]/70">
                    <p>© {new Date().getFullYear()} Simatiri Experience. Todos los derechos reservados.</p>
                    <p>Operadora turística registrada · Creel, Chihuahua, México</p>
                </div>
            </div>
        </footer>
    )
}
