'use client'
import React, { useState } from 'react'
import { Building, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { HotelRateData } from './HotelRateModule'

interface Props {
    hotels: HotelRateData[]
}

export function HotelPortfolioShowcase({ hotels }: Props) {
    const [activeId, setActiveId] = useState(hotels[0].id)
    const activeHotel = hotels.find(h => h.id === activeId) || hotels[0]

    return (
        <section className="bg-white py-24 px-8 border-t border-[#1C1812]/10" id="portfolio">
            <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-16 lg:gap-24 relative z-10 w-full mb-12">

                {/* COLUMNA IZQUIERDA: Selector Ejecutivo */}
                <div className="w-full xl:w-[360px] xl:shrink-0 flex flex-col gap-6">
                    <div className="mb-6 flex items-center gap-4">
                        <div className="w-8 h-px bg-[#1C1812]" />
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1C1812]">
                            Portafolio de Alianzas
                        </h2>
                    </div>

                    <style jsx>{`
                        .hide-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                        .hide-scrollbar {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                    `}</style>

                    <div className="xl:sticky xl:top-32 flex flex-row xl:flex-col gap-3 overflow-x-auto xl:overflow-visible pb-8 xl:pb-0 snap-x snap-mandatory hide-scrollbar">
                        {hotels.map((hotel, index) => {
                            const isActive = activeId === hotel.id
                            const indexNumber = String(index + 1).padStart(2, '0')

                            return (
                                <button
                                    key={hotel.id}
                                    onClick={() => setActiveId(hotel.id)}
                                    className={cn(
                                        "flex-shrink-0 w-[280px] xl:w-full snap-start flex items-center justify-between p-6 text-left transition-all duration-500 focus:outline-none focus:ring-1 focus:ring-[#7B4B2A] relative group rounded-sm border",
                                        isActive
                                            ? "bg-[#1C1812] border-[#1C1812] text-white shadow-xl"
                                            : "bg-white border-gray-200 hover:border-[#1C1812]/30 text-[#1C1812]"
                                    )}
                                >
                                    <div className="flex flex-col relative w-full">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={cn(
                                                "text-[10px] font-mono tracking-widest uppercase transition-colors",
                                                isActive ? "text-[#d1ab7a]" : "text-gray-400"
                                            )}>
                                                NO. {indexNumber}
                                            </span>
                                            {hotel.propertyType && (
                                                <span className={cn(
                                                    "text-[9px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full transition-colors",
                                                    isActive ? "bg-white/10 text-white" : "bg-gray-100 text-gray-500"
                                                )}>
                                                    {hotel.propertyType}
                                                </span>
                                            )}
                                        </div>
                                        <span className={cn(
                                            "font-serif text-2xl tracking-tight transition-colors mb-1",
                                            isActive ? "text-white" : "text-[#1C1812] group-hover:text-[#1C1812]"
                                        )}>
                                            {hotel.name}
                                        </span>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className={cn(
                                                "text-[11px] uppercase tracking-widest font-medium transition-colors",
                                                isActive ? "text-white/60" : "text-gray-400 group-hover:text-gray-600"
                                            )}>
                                                {hotel.agreementStatus || 'Convenio Activo'}
                                            </span>
                                            {isActive && <ArrowRight size={14} className="text-[#d1ab7a]" />}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* COLUMNA DERECHA: Dossier Activo */}
                <div className="w-full xl:w-[calc(100%-360px)] relative border border-[#1C1812]/10 bg-white">
                    <div
                        key={activeHotel.id}
                        className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both"
                    >
                        <div className="flex flex-col">

                            {/* A. CABECERA DEL HOTEL (Gran Presencia) */}
                            <div className="p-10 md:p-16 border-b border-[#1C1812]/10 relative overflow-hidden bg-[#FAF9F7]/30">
                                <div className="absolute right-0 top-0 opacity-5 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                                    <Building size={300} strokeWidth={0.2} className="text-[#1C1812]" />
                                </div>
                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-12">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-4 mb-6">
                                            <span className="text-[10px] font-mono tracking-widest uppercase bg-[#1C1812] text-white px-3 py-1.5">
                                                ID: {activeHotel.externalId || activeHotel.id.toUpperCase()}
                                            </span>
                                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7B4B2A] flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#7B4B2A]" />
                                                {activeHotel.propertyType}
                                            </span>
                                        </div>
                                        <h3 className="font-serif text-5xl md:text-7xl text-[#1C1812] tracking-tight leading-[1.05] mb-6">
                                            {activeHotel.name}
                                        </h3>
                                        <div className="flex items-center gap-6 mt-8 p-4 bg-white border border-[#1C1812]/5 inline-flex shadow-sm rounded-sm">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">Ubicación Estratégica</span>
                                                <span className="text-sm font-medium text-[#1C1812]">{activeHotel.location}</span>
                                            </div>
                                            <div className="w-px h-8 bg-[#1C1812]/10" />
                                            <div className="flex flex-col">
                                                <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">Estatus de Alianza</span>
                                                <span className="text-sm font-bold text-[#3B5A42] flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B5A42] inline-block" />
                                                    {activeHotel.agreementStatus}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* B. RESUMEN BREVE */}
                            {activeHotel.executiveSummary && (
                                <div className="p-10 md:p-16 border-b border-[#1C1812]/10 bg-white">
                                    <div className="flex gap-6 max-w-4xl">
                                        <div className="w-1 h-auto bg-[#d1ab7a] shrink-0" />
                                        <p className="text-xl md:text-2xl text-[#1C1812]/80 font-serif font-light leading-relaxed">
                                            {activeHotel.executiveSummary}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* C. ESPECIFICACIONES */}
                            <div className="p-10 md:p-16 border-b border-[#1C1812]/10 bg-[#FAF9F7]/10">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1C1812] mb-8 flex items-center gap-4">
                                    <div className="w-6 h-px bg-[#1C1812]" />
                                    Especificaciones de Servicio e Inclusiones
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
                                    {activeHotel.specs.map((spec, i) => (
                                        <div key={i} className="flex gap-4 items-start pb-4 border-b border-gray-100 last:border-0 md:last:border-b-0 md:[&:nth-last-child(2)]:border-b-0">
                                            <div className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                                                <div className="w-1.5 h-1.5 bg-[#d1ab7a] rounded-full" />
                                            </div>
                                            <span className="text-[15px] text-[#4A4541] font-light leading-relaxed">
                                                {spec}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* D. MATRIZ DE TARIFAS */}
                            <div className="p-10 md:p-16 border-b border-[#1C1812]/10">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1C1812] flex items-center gap-4">
                                        <div className="w-6 h-px bg-[#1C1812]" />
                                        Matriz Ejecutiva de Tarifas Negociadas
                                    </h4>
                                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#7B4B2A] bg-[#7B4B2A]/5 px-3 py-1.5 rounded">
                                        Valores Netos en MXN
                                    </span>
                                </div>

                                <div className="w-full">
                                    <div className="hidden md:grid grid-cols-12 gap-6 pb-6 border-b border-[#1C1812]/20 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                        <div className="col-span-5">Categoría / Habitación</div>
                                        <div className="col-span-3 text-right">Tarifa (Sin Impuestos)</div>
                                        <div className="col-span-4 text-right pr-6">Tarifa Neta (Final)</div>
                                    </div>

                                    <div className="flex flex-col">
                                        {activeHotel.rates.map((rate, i) => (
                                            <div key={i} className="flex flex-col md:grid md:grid-cols-12 gap-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors py-6 group md:-mx-4 md:px-4">
                                                <div className="col-span-5 flex flex-col justify-center">
                                                    <div className="font-serif text-2xl text-[#1C1812] mb-1">{rate.roomName}</div>
                                                    {rate.subtext && <div className="text-[13px] text-gray-500 font-light mb-2">{rate.subtext}</div>}
                                                    {rate.note && <div className="inline-flex items-center gap-1.5 w-fit bg-gray-100/80 px-2 py-1 text-[10px] font-medium text-[#1C1812] border border-gray-200 uppercase tracking-widest mt-1"><div className="w-1 h-1 bg-[#d1ab7a]" />{rate.note}</div>}
                                                </div>

                                                <div className="col-span-3 flex md:flex-col justify-between md:justify-center items-center md:items-end md:border-r border-gray-100/50 pr-6">
                                                    <span className="md:hidden text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Sin Impuestos</span>
                                                    {rate.onlyWithTaxes ? (
                                                        <span className="text-xl italic text-gray-300">—</span>
                                                    ) : (
                                                        <span className="font-mono text-xl text-gray-400 font-light tracking-wide">${rate.priceWithoutTaxes?.toLocaleString('en-US') || '-'}</span>
                                                    )}
                                                </div>

                                                <div className="col-span-4 flex md:flex-col justify-between md:justify-center items-center md:items-end pr-0 md:pr-6">
                                                    <span className="md:hidden text-[10px] font-bold uppercase tracking-[0.15em] text-[#1C1812]">Tarifa Neta</span>
                                                    <span className="font-serif text-3xl md:text-4xl text-[#1C1812] group-hover:text-[#7B4B2A] transition-colors">
                                                        ${(rate.priceWithTaxes || rate.onlyWithTaxes)?.toLocaleString('en-US') || '-'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* E. NOTAS COMERCIALES */}
                            {activeHotel.footerNote && (
                                <div className="p-10 md:p-16 bg-[#1C1812] text-white">
                                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                                                <div className="w-2 h-2 bg-[#d1ab7a] rounded-full" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/50 mb-1">Apunte Comercial Exclusivo</span>
                                                <span className="font-serif text-xl md:text-2xl text-white">{activeHotel.footerNote}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
