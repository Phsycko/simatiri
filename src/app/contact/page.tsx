import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'

export const metadata: Metadata = {
    title: 'Contacto',
    description: 'Contacta a Simatiri Experience para reservas, cotizaciones y convenios de agencia. Estamos en Creel, Chihuahua.',
}

export default function ContactPage() {
    return (
        <>
            <PageHero
                title="Hablemos de tu próximo viaje"
                subtitle="Respondemos en menos de 24 horas. Tenemos atención especializada para agencias de viaje y viajeros individuales."
                size="sm"
                backgroundImage="https://drive.google.com/uc?export=view&id=1ebc95Zf8tXLNnYfobC6IfKMO-V3Bh7ML"
                overlay="linear-gradient(rgba(0,0,0,0.36), rgba(0,0,0,0.42))"
            />

            <section className="py-20 px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">

                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="font-serif text-2xl text-[#0a192f]">Información de Contacto</h2>

                        <div className="space-y-5">
                            {[
                                { icon: MapPin, label: 'Dirección', value: 'Rochivo 00, Creel, Bocoyna\nChihuahua, CP 33200, México' },
                                { icon: Phone, label: 'Teléfono', value: '+52 628 100 0000' },
                                { icon: Mail, label: 'Correo', value: 'ventas@simatiri.com' },
                                { icon: Clock, label: 'Horario', value: 'Lunes a Sábado\n9:00 AM – 7:00 PM (hora Chihuahua)' },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[#f8f9fa] rounded-full flex items-center justify-center shrink-0">
                                        <Icon size={16} className="text-[#7B4B2A]" />
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-0.5">{label}</div>
                                        <div className="text-sm text-gray-700 whitespace-pre-line">{value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#1a1512] rounded-2xl p-6 text-white">
                            <h4 className="font-serif text-lg mb-2">Para Agencias de Viaje</h4>
                            <p className="text-white/60 text-sm mb-4">Escríbenos directamente para acceder al programa corporativo con tarifas netas y beneficios exclusivos.</p>
                            <a href="mailto:ventas@simatiri.com" className="text-[#B7925A] text-sm font-medium hover:text-[#e5d3b3] transition-colors">
                                ventas@simatiri.com →
                            </a>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                            <h3 className="font-serif text-2xl text-[#0a192f] mb-6">Envíanos un Mensaje</h3>
                            <form className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Nombre</label>
                                        <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors" placeholder="Tu nombre" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Correo</label>
                                        <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors" placeholder="tu@correo.com" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Tipo de Consulta</label>
                                    <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors bg-white">
                                        <option>Reservación de paquete</option>
                                        <option>Cotización de tour</option>
                                        <option>Membresía de agencia B2B</option>
                                        <option>Viaje a la medida</option>
                                        <option>Otra consulta</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Teléfono (opcional)</label>
                                    <input type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors" placeholder="+52 XXX XXX XXXX" />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Mensaje</label>
                                    <textarea rows={5} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors resize-none" placeholder="Cuéntanos sobre tu viaje, fechas, número de pasajeros..." />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#0a192f] hover:bg-[#2e4a3d] text-white text-sm font-semibold uppercase tracking-wider py-4 rounded-full transition-colors"
                                >
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
