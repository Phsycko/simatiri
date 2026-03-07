import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Users, Star, ArrowRight, MapPin, Calendar } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'

export const metadata: Metadata = {
    title: 'Nosotros',
    description: 'Simatiri Experience: operadora turística certificada en Creel, Chihuahua. RNT 0108009be33c3. Especialistas en el Tren CHEPE y la Sierra Tarahumara.',
}

const convenio = [
    'Tarifas preferenciales para agencias',
    'Early check-in sin costo adicional',
    'Late check-out sin costo adicional',
    'Desayuno incluido en Simatiri Hotel',
    'Facturación personalizada',
]

export default function AboutPage() {
    return (
        <>
            <PageHero
                title="La operadora que conoce la Sierra por dentro"
                subtitle="Somos el puente entre las agencias de viaje y las Barrancas del Cobre. Con conocimiento local, logística precisa y presencia directa en la región."
                size="md"
                backgroundImage="/images/heroes/nosotros-hero.jpg"
                overlay="linear-gradient(rgba(0,0,0,0.38), rgba(0,0,0,0.42))"
            />

            {/* Mission Section */}
            <section className="py-24 px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-4">Nuestra Historia</div>
                        <h2 className="font-serif text-4xl text-[#0a192f] mb-6">SIMATIRI EXPERIENCE</h2>
                        <div className="space-y-5 text-gray-600 leading-relaxed">
                            <p>
                                Simatiri Experience nació en Creel para resolver un problema real: las agencias de viaje necesitaban un operador local confiable, con tarifas honestas y logística sólida, que pudiera manejar la complejidad de la Sierra Tarahumara.
                            </p>
                            <p>
                                Operamos directamente con el Tren CHEPE, los hoteles de la región y los guías tarahumaras. Esto nos permite ofrecer experiencias auténticas sin intermediarios innecesarios.
                            </p>
                            <p>
                                Nuestro modelo es mayorista: trabajamos principalmente con agencias de viaje a quienes ofrecemos tarifas netas, soporte operativo y la tranquilidad de tener a alguien en campo.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-[#f8f9fa] rounded-2xl p-8">
                            <div className="flex items-start gap-5 mb-6">
                                <ShieldCheck size={36} className="text-[#7B4B2A] shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-serif text-2xl text-[#0a192f] mb-1">Registro Nacional de Turismo</h3>
                                    <p className="text-gray-500 text-sm">Prestador de Servicios Turísticos Certificado por el Gobierno de México.</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-gray-100">
                                <div className="font-mono text-lg font-bold text-[#0a192f] mb-2">RNT: 0108009be33c3</div>
                                <div className="text-sm text-gray-500 space-y-1">
                                    <div className="flex items-center gap-2"><MapPin size={13} /> Rochivo 00, Creel, Bocoyna, Chihuahua</div>
                                    <div>CP 33200 · México</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                            {[
                                { n: '10+', l: 'Destinos operados' },
                                { n: '8', l: 'Tours disponibles' },
                                { n: '5', l: 'Hoteles convenio' },
                            ].map(({ n, l }) => (
                                <div key={l} className="bg-[#8B5A2B] text-white rounded-xl p-5">
                                    <div className="font-serif text-3xl text-white font-bold">{n}</div>
                                    <div className="text-xs text-white font-bold mt-1">{l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Convenio */}
            <section className="py-24 bg-[#f8f9fa] border-y border-gray-100 px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-4">Para Agencias de Viaje</div>
                    <h2 className="font-serif text-4xl text-[#0a192f] mb-6">Convenio Corporativo Activo</h2>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-12">
                        <Calendar size={14} /> Vigencia: 1 Marzo 2026 – 28 Febrero 2027
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 text-left">
                        {convenio.map((b) => (
                            <div key={b} className="bg-white rounded-xl p-5 flex items-center gap-4 border border-gray-100 shadow-sm">
                                <div className="w-8 h-8 bg-[#e5d3b3]/40 rounded-full flex items-center justify-center shrink-0">
                                    <Star size={14} className="text-[#7B4B2A]" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">{b}</span>
                            </div>
                        ))}
                    </div>

                    <Link href="/contact" className="inline-flex items-center gap-2 bg-[#8B5A2B] hover:bg-[#704822] text-white text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all">
                        Solicitar Membresía Agencia <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </>
    )
}
