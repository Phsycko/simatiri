"use client"

import { Building, Info, CheckCircle2, ChevronRight, Tags } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface HotelRateData {
    id: string
    externalId?: string
    name: string
    location?: string
    propertyType?: string
    agreementStatus?: string
    executiveSummary?: string
    description?: string
    specs: string[]
    rates: {
        roomName: string
        subtext?: string
        priceWithoutTaxes?: number
        priceWithTaxes?: number
        onlyWithTaxes?: number
        note?: string
    }[]
    footerNote?: string
    isFeatured?: boolean
}

export function HotelRateModule({ data }: { data: HotelRateData }) {
    const isSimatiri = data.name.toLowerCase().includes('simatiri')

    return (
        <div
            className={cn(
                "w-full rounded-[2.5rem] overflow-hidden border mb-16 shadow-sm group transition-all",
                data.isFeatured ? "border-[#7B4B2A]/30 bg-[#f8f9fa]" : "border-gray-200 bg-white"
            )}
            id={data.id}
        >
            {/* Header del Hotel */}
            <div className={cn(
                "p-8 lg:p-12 pb-8 border-b",
                data.isFeatured ? "bg-[#0a192f] text-white border-white/10" : "bg-white border-gray-100"
            )}>
                <div className="flex items-start justify-between gap-6 flex-col md:flex-row md:items-center">
                    <div>
                        {data.isFeatured && (
                            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-[#7B4B2A]/20 border border-[#7B4B2A]/30 text-[#d1ab7a] text-xs font-bold uppercase tracking-widest">
                                Propiedad Propia
                            </div>
                        )}
                        <h3 className={cn(
                            "font-serif text-3xl md:text-5xl mb-2 flex items-center gap-4",
                            data.isFeatured ? "text-white" : "text-[#0a192f]"
                        )}>
                            <Building size={32} className={cn(data.isFeatured ? "text-[#7B4B2A]" : "text-gray-300")} strokeWidth={1} />
                            {data.name}
                        </h3>
                        {data.description && (
                            <p className={cn("text-lg", data.isFeatured ? "text-white/60" : "text-gray-500")}>
                                {data.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Contenido / Split: Especificaciones vs Tarifas */}
            <div className="flex flex-col lg:flex-row">

                {/* Columna Izquierda: Especificaciones */}
                <div className="w-full lg:w-1/3 p-8 lg:p-12 bg-gray-50/50 border-r border-gray-100 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6">
                            <Info size={16} /> Especificaciones
                        </div>
                        <ul className="space-y-4">
                            {data.specs.map((spec, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <CheckCircle2 size={16} className={cn(
                                            data.isFeatured ? "text-[#7B4B2A]" : "text-gray-400"
                                        )} />
                                    </div>
                                    <span className="text-gray-600 leading-relaxed text-sm">{spec}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Columna Derecha: Matriz de Tarifas */}
                <div className="w-full lg:w-2/3 p-8 lg:p-12">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#0a192f]">
                            <Tags size={16} className="text-[#7B4B2A]" /> Tarifas Negociadas
                        </div>
                        {isSimatiri && (
                            <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-medium">
                                Noche de Hospedaje
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        {data.rates.map((rate, i) => (
                            <div key={i} className="group/row flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border border-gray-100 bg-white hover:border-[#7B4B2A]/30 hover:shadow-md transition-all">
                                <div className="mb-4 sm:mb-0 pr-4">
                                    <div className="font-semibold text-lg text-[#0a192f] group-hover/row:text-[#7B4B2A] transition-colors">{rate.roomName}</div>
                                    {rate.subtext && <div className="text-sm text-gray-500 mt-1">{rate.subtext}</div>}
                                    {rate.note && <div className="text-xs font-semibold text-amber-600 bg-amber-50 inline-block px-2 py-1 rounded mt-2 mt-2">{rate.note}</div>}
                                </div>
                                <div className="flex flex-col sm:items-end gap-1 sm:text-right shrink-0">
                                    {rate.onlyWithTaxes ? (
                                        <>
                                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Con impuestos</div>
                                            <div className="font-serif text-3xl text-[#0a192f]">${rate.onlyWithTaxes}</div>
                                        </>
                                    ) : (
                                        <div className="flex flex-row sm:flex-col gap-6 sm:gap-1 justify-between items-center sm:items-end w-full">
                                            {rate.priceWithoutTaxes && (
                                                <div className="text-left sm:text-right">
                                                    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Sin imp.</div>
                                                    <div className="text-xl text-gray-500">${rate.priceWithoutTaxes}</div>
                                                </div>
                                            )}
                                            {rate.priceWithTaxes && (
                                                <div className="text-right">
                                                    <div className="text-[10px] font-semibold text-[#7B4B2A] uppercase tracking-widest mb-0.5">Con imp.</div>
                                                    <div className="font-serif text-2xl md:text-3xl text-[#0a192f]">${rate.priceWithTaxes}</div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {data.footerNote && (
                        <div className="mt-8 bg-[#7B4B2A]/5 border border-[#7B4B2A]/10 rounded-xl p-4 flex items-center justify-center gap-2 text-[#7B4B2A] font-medium text-sm text-center">
                            {data.footerNote}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
