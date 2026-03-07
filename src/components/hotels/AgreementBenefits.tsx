import React from 'react'
import { CalendarCheck, Clock, Coffee, FileCheck } from 'lucide-react'

export function AgreementBenefits() {
    const benefits = [
        {
            icon: CalendarCheck,
            title: "Tarifas preferenciales",
            desc: "Disponibles durante todo el año"
        },
        {
            icon: Clock,
            title: "Horarios extendidos",
            desc: "Early check-in y late check-out (sujeto a disponibilidad)"
        },
        {
            icon: Coffee,
            title: "Desayuno Incluido",
            desc: "Beneficio asegurado en gran parte de las propiedades aliadas"
        },
        {
            icon: FileCheck,
            title: "Facturación rápida",
            desc: "Procesos administrativos ágiles y personalizados"
        }
    ]

    return (
        <section className="bg-[#FAF9F7] py-24 px-8 border-y border-[#1C1812]/10">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-16">
                    <div className="w-8 h-px bg-[#1C1812]" />
                    <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#1C1812]">Beneficios del Convenio</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {benefits.map((b, i) => {
                        const Icon = b.icon
                        return (
                            <div key={i} className="flex flex-col">
                                <div className="w-12 h-12 rounded-full border border-[#1C1812]/10 flex items-center justify-center bg-white mb-6">
                                    <Icon size={20} className="text-[#7B4B2A]" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-serif text-2xl text-[#1C1812] mb-3 leading-tight">{b.title}</h3>
                                <p className="text-sm text-[#5A5551] font-light leading-relaxed">{b.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
