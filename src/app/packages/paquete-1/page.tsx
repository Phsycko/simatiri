import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Train, Hotel, Map, Calendar } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Paquete 1 - CHEPE Express Primera Clase | SIMATIRI',
    description: '7 Días / 6 Noches. El Fuerte, Sinaloa – Creel – El Fuerte. Hospedaje Categoría Superior.',
}

export default function Paquete1Page() {
    return (
        <div className="bg-[#f8f9fa] min-h-screen">
            {/* HERO SUPERIOR DEL PAQUETE */}
            <section
                className="relative w-full overflow-hidden text-white pt-40 pb-24"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.6) 100%), url('/images/paquetes/paquete-1-hero.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >

                <div className="max-w-7xl mx-auto px-8 relative z-10">


                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="uppercase tracking-[0.3em] text-xs font-semibold mb-4 !text-[#FFFFFF]">
                                7 Días / 6 Noches
                            </div>
                            <h1 className="font-serif text-5xl md:text-7xl mb-6 font-semibold tracking-tight">
                                Paquete 1
                            </h1>
                            <p className="text-white text-lg md:text-xl font-semibold max-w-2xl leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.55)' }}>
                                <span className="text-white/60 text-sm uppercase tracking-widest block mb-1 font-normal">Tramo del tren</span>
                                El Fuerte, Sinaloa → Creel → Chihuahua
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 min-w-[280px]">
                            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                                <div className="text-xs text-white/60 uppercase tracking-widest mb-1">Precio desde</div>
                                <div className="font-serif text-3xl font-semibold mb-3">$24,000 MXN</div>
                                <Link
                                    href="/tailor-made-trip"
                                    className="flex items-center justify-center gap-2 w-full bg-[#7B4B2A] hover:bg-[#8B5A36] active:bg-[#6A3F23] text-white text-sm font-semibold uppercase tracking-widest py-3.5 rounded-full transition-all duration-[250ms] border-none shadow-none"
                                >
                                    Cotizar este paquete
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT LAYOUT */}
            <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* COLUMNA PRINCIPAL */}
                <div className="lg:col-span-8 space-y-20">

                    {/* RESUMEN RÁPIDO */}
                    <section>
                        <h2 className="font-serif text-3xl text-[#0a192f] mb-8">Resumen del Viaje</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <Clock className="text-[#7B4B2A] mb-4" size={24} strokeWidth={1.5} />
                                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Duración</div>
                                <div className="font-semibold text-[#0a192f]">7 Días / 6 Noches</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <Train className="text-[#7B4B2A] mb-4" size={24} strokeWidth={1.5} />
                                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Tren</div>
                                <div className="font-semibold text-[#0a192f] leading-tight">CHEPE Express Primera Clase <span className="block text-[10px] text-gray-400 font-normal mt-1">(Aplicable a upgrade)</span></div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <Hotel className="text-[#7B4B2A] mb-4" size={24} strokeWidth={1.5} />
                                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Hospedaje</div>
                                <div className="font-semibold text-[#0a192f]">Categoría Superior</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <MapPin className="text-[#7B4B2A] mb-4" size={24} strokeWidth={1.5} />
                                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Inicio</div>
                                <div className="font-semibold text-[#0a192f]">El Fuerte, Sinaloa</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <MapPin className="text-[#7B4B2A] mb-4" size={24} strokeWidth={1.5} />
                                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Finalización</div>
                                <div className="font-semibold text-[#0a192f] leading-tight">Chihuahua, Chih.<span className="block text-[10px] text-gray-400 font-normal mt-1">(Puede ser aeropuerto)</span></div>
                            </div>
                            <div className="bg-[#0a192f] rounded-2xl p-6 shadow-sm flex flex-col justify-center">
                                <div className="text-xs text-white/50 uppercase tracking-widest font-semibold mb-2">Ruta Principal</div>
                                <div className="font-semibold text-white leading-relaxed">El Fuerte — Creel — Chihuahua</div>
                            </div>
                        </div>
                    </section>

                    {/* QUÉ INCLUYE EL RECORRIDO */}
                    <section>
                        <h2 className="font-serif text-3xl text-[#0a192f] mb-8">Destinos Incluidos</h2>
                        <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7B4B2A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                            <ul className="relative z-10 space-y-6">
                                {[
                                    'El Fuerte',
                                    'Divisadero Barrancas del Cobre',
                                    'Creel Pueblo Mágico',
                                    'Ciudad Chihuahua'
                                ].map((dest, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-[#7B4B2A]/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <MapPin size={14} className="text-[#7B4B2A]" />
                                        </div>
                                        <div>
                                            <div className="font-serif text-xl text-[#0a192f]">{dest}</div>
                                            <div className="text-sm text-gray-500 mt-1">Recorrido perimetral y atracciones locales</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* SECCIÓN DE PRECIOS */}
                    <section>
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                            <div>
                                <h2 className="font-serif text-3xl text-[#0a192f] mb-2">Tarifas Comisionables</h2>
                                <p className="text-gray-500 text-sm">Comisionables al 10%. Precios por persona.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Doble */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-[#7B4B2A] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">Ocupación Doble</div>
                                <div className="font-serif text-4xl text-[#0a192f] mb-2">$27,700 <span className="text-xl text-gray-400 font-sans">MXN</span></div>
                                <div className="text-lg font-medium text-[#7B4B2A]">$1,540 <span className="text-sm">USD</span></div>
                            </div>

                            {/* Triple */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-[#7B4B2A] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">Ocupación Triple</div>
                                <div className="font-serif text-4xl text-[#0a192f] mb-2">$25,400 <span className="text-xl text-gray-400 font-sans">MXN</span></div>
                                <div className="text-lg font-medium text-[#7B4B2A]">$1,410 <span className="text-sm">USD</span></div>
                            </div>

                            {/* Cuádruple */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-[#7B4B2A] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">Ocup. Cuádruple</div>
                                <div className="font-serif text-4xl text-[#0a192f] mb-2">$24,000 <span className="text-xl text-gray-400 font-sans">MXN</span></div>
                                <div className="text-lg font-medium text-[#7B4B2A]">$1,330 <span className="text-sm">USD</span></div>
                            </div>
                        </div>
                    </section>

                    {/* CTA BOTONES */}
                    <section className="pt-8 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <Link
                                href="/tailor-made-trip"
                                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#7B4B2A] hover:bg-[#8B5A36] active:bg-[#6A3F23] text-white text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-[250ms] border-none shadow-none"
                            >
                                Cotizar este paquete <ArrowRight size={16} />
                            </Link>
                            <Link
                                href="/contact"
                                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#0a192f] text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-colors shadow-none"
                            >
                                Solicitar itinerario
                            </Link>
                            <Link
                                href="/packages"
                                className="flex-1 sm:flex-none inline-flex items-center justify-center text-sm font-semibold text-gray-500 hover:text-[#7B4B2A] transition-colors mt-4 sm:mt-0 sm:ml-4"
                            >
                                Ver más paquetes
                            </Link>
                        </div>
                    </section>

                </div>

                {/* SIDEBAR STICKY (DESKTOP) */}
                <div className="hidden lg:block lg:col-span-4 transition-all">
                    <div className="sticky top-32 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-black/5 p-8">
                        <div className="mb-8">
                            <div className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-2">Resumen</div>
                            <h3 className="font-serif text-2xl text-[#0a192f]">Paquete 1</h3>
                        </div>

                        <ul className="space-y-5 mb-10">
                            <li className="flex items-start gap-3 border-b border-gray-50 pb-4">
                                <Clock size={18} className="text-gray-400 shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Duración</div>
                                    <div className="text-sm font-medium text-[#0a192f]">7 Días / 6 Noches</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 border-b border-gray-50 pb-4">
                                <Train size={18} className="text-gray-400 shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Tren</div>
                                    <div className="text-sm font-medium text-[#0a192f]">CHEPE EXPRESS PRIMERA CLASE</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 border-b border-gray-50 pb-4">
                                <Hotel size={18} className="text-gray-400 shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Hospedaje</div>
                                    <div className="text-sm font-medium text-[#0a192f]">Categoría Superior</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Map size={18} className="text-gray-400 shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Ruta</div>
                                    <div className="text-sm font-medium text-[#0a192f]">El Fuerte — Creel — Chihuahua</div>
                                </div>
                            </li>
                        </ul>

                        <div className="bg-[#f8f9fa] rounded-2xl p-6 mb-6">
                            <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Precio desde</div>
                            <div className="font-serif text-3xl text-[#0a192f]">$24,000 <span className="text-base text-gray-500 font-sans">MXN</span></div>
                        </div>

                        <Link
                            href="/tailor-made-trip"
                            className="flex items-center justify-center w-full gap-2 bg-[#7B4B2A] hover:bg-[#8B5A36] active:bg-[#6A3F23] text-white text-sm font-semibold uppercase tracking-widest py-4 rounded-full transition-all duration-[250ms] border-none shadow-none"
                        >
                            Cotizar Viaje <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
