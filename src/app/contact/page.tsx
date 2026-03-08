import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { buildShareMeta } from '@/lib/metadata'

const title = 'Contacto | Simatiri Experience'
const description = 'Contacta a Simatiri Experience para reservas, cotizaciones y convenios de agencia. Estamos en Creel, Chihuahua.'

export const metadata: Metadata = {
  title,
  description,
  ...buildShareMeta({ title, description, pathname: '/contact' }),
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
                            <ContactForm />
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
