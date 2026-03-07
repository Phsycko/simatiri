import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Train, Hotel, Map } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Paquete 7 - CHEPE Regional Primera Clase | SIMATIRI',
    description: '3 Días / 2 Noches. Creel – Divisadero. Hospedaje Categoría Intermedia.',
}

export default function Paquete7Page() {
    return (
        <div className="bg-[#f8f9fa] min-h-screen">
            <section
                className="relative w-full overflow-hidden text-white pt-40 pb-24"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.05) 100%), url('/images/packages/package-7.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="uppercase tracking-[0.3em] text-xs font-semibold mb-4">3 Días / 2 Noches</div>
                            <h1 className="font-serif text-5xl md:text-7xl mb-6 font-semibold tracking-tight">Paquete 7</h1>
                            <p className="text-white text-lg md:text-xl font-semibold max-w-2xl leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.55)' }}>
                                <span className="text-white/60 text-sm uppercase tracking-widest block mb-1 font-normal">Tramo del tren</span>
                                Creel → Divisadero
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[280px]">
                            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                                <div className="text-xs text-white/60 uppercase tracking-widest mb-1">Precio desde</div>
                                <div className="font-serif text-3xl font-semibold mb-3">$6,950 MXN</div>
                                <Link href="/tailor-made-trip" className="flex items-center justify-center gap-2 w-full bg-[#7B4B2A] hover:bg-[#8B5A36] text-white text-sm font-semibold uppercase tracking-widest py-3.5 rounded-full transition-all duration-[250ms]">Cotizar este paquete</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8 space-y-20">
                    <section>
                        <h2 className="font-serif text-3xl text-[#0a192f] mb-8">Resumen del Viaje</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"><Clock className="text-[#7B4B2A] mb-4" size={24} strokeWidth={1.5} /><div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Duración</div><div className="font-semibold text-[#0a192f]">3 Días / 2 Noches</div></div>
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"><Train className="text-[#7B4B2A] mb-4" size={24} strokeWidth={1.5} /><div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Tren</div><div className="font-semibold text-[#0a192f] leading-tight">CHEPE Regional Primera Clase</div></div>
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"><Hotel className="text-[#7B4B2A] mb-4" size={24} strokeWidth={1.5} /><div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Hospedaje</div><div className="font-semibold text-[#0a192f]">Categoría Intermedia</div></div>
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"><MapPin className="text-[#7B4B2A] mb-4" size={24} strokeWidth={1.5} /><div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Inicio</div><div className="font-semibold text-[#0a192f]">Chihuahua, Chih.</div></div>
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"><MapPin className="text-[#7B4B2A] mb-4" size={24} strokeWidth={1.5} /><div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Finalización</div><div className="font-semibold text-[#0a192f]">Chihuahua, Chih.</div></div>
                            <div className="bg-[#0a192f] rounded-2xl p-6 shadow-sm flex flex-col justify-center"><div className="text-xs text-white/50 uppercase tracking-widest font-semibold mb-2">Ruta Principal</div><div className="font-semibold text-white">Creel – Divisadero</div></div>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-serif text-3xl text-[#0a192f] mb-8">Precios Comisionables al 10%</h2>
                        <p className="text-gray-500 text-sm mb-8">Tarifa base. Precios por persona.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[['Ocupación Doble', '$7,400'], ['Ocupación Triple', '$7,100'], ['Ocup. Cuádruple', '$6,950']].map(([label, price]) => (
                                <div key={label} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-[#7B4B2A] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                    <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">{label}</div>
                                    <div className="font-serif text-4xl text-[#0a192f]">{price} <span className="text-xl text-gray-400 font-sans">MXN</span></div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="pt-8 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <Link href="/tailor-made-trip" className="inline-flex items-center justify-center gap-2 bg-[#7B4B2A] hover:bg-[#8B5A36] text-white text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-[250ms]">Cotizar este paquete <ArrowRight size={16} /></Link>
                            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#0a192f] text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-colors">Solicitar itinerario</Link>
                            <Link href="/packages" className="inline-flex items-center justify-center text-sm font-semibold text-gray-500 hover:text-[#7B4B2A] transition-colors sm:ml-4">Ver más paquetes</Link>
                        </div>
                    </section>
                </div>

                <div className="hidden lg:block lg:col-span-4">
                    <div className="sticky top-32 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-black/5 p-8">
                        <div className="mb-8"><div className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-2">Resumen</div><h3 className="font-serif text-2xl text-[#0a192f]">Paquete 7</h3></div>
                        <ul className="space-y-5 mb-10">
                            <li className="flex items-start gap-3 border-b border-gray-50 pb-4"><Clock size={18} className="text-gray-400 shrink-0 mt-0.5" /><div><div className="text-xs text-gray-500 mb-1">Duración</div><div className="text-sm font-medium text-[#0a192f]">3 Días / 2 Noches</div></div></li>
                            <li className="flex items-start gap-3 border-b border-gray-50 pb-4"><Train size={18} className="text-gray-400 shrink-0 mt-0.5" /><div><div className="text-xs text-gray-500 mb-1">Tren</div><div className="text-sm font-medium text-[#0a192f]">CHEPE REGIONAL PRIMERA CLASE</div></div></li>
                            <li className="flex items-start gap-3 border-b border-gray-50 pb-4"><Hotel size={18} className="text-gray-400 shrink-0 mt-0.5" /><div><div className="text-xs text-gray-500 mb-1">Hospedaje</div><div className="text-sm font-medium text-[#0a192f]">Categoría Intermedia</div></div></li>
                            <li className="flex items-start gap-3"><Map size={18} className="text-gray-400 shrink-0 mt-0.5" /><div><div className="text-xs text-gray-500 mb-1">Ruta</div><div className="text-sm font-medium text-[#0a192f]">Creel – Divisadero</div></div></li>
                        </ul>
                        <div className="bg-[#f8f9fa] rounded-2xl p-6 mb-6"><div className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Precio desde</div><div className="font-serif text-3xl text-[#0a192f]">$6,950 <span className="text-base text-gray-500 font-sans">MXN</span></div></div>
                        <Link href="/tailor-made-trip" className="flex items-center justify-center w-full gap-2 bg-[#7B4B2A] hover:bg-[#8B5A36] text-white text-sm font-semibold uppercase tracking-widest py-4 rounded-full transition-all duration-[250ms]">Cotizar Viaje <ArrowRight size={16} /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
