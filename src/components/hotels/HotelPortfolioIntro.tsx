"use client"

import { CheckCircle2 } from 'lucide-react'

export function HotelPortfolioIntro() {
    return (
        <div className="w-full relative z-10 pt-12 pb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-8">
                {/* Text Context */}
                <div className="max-w-xl">
                    <div className="inline-flex items-center gap-4 mb-4">
                        <span className="w-8 h-px bg-[#7B4B2A]/60"></span>
                        <span className="text-[10px] font-bold tracking-[0.25em] text-[#7B4B2A] uppercase">
                            Red de Hoteles Aliados
                        </span>
                    </div>

                    <h2 className="font-serif text-3xl md:text-4xl text-[#1C1812] leading-[1.1] mb-5">
                        Hospedaje Preferencial <br className="hidden md:block" />
                        <span className="text-[#7B4B2A] italic">para Operación Turística</span>
                    </h2>

                    <p className="text-[#5A5551] font-light leading-relaxed text-base border-l border-[#7B4B2A]/20 pl-5">
                        Una selección de propiedades estratégicas con tarifas negociadas, operación confiable y beneficios exclusivos para agencias y aliados.
                    </p>
                </div>

                {/* Compact Highlights Grid */}
                <div className="bg-[#FAF9F7]/80 rounded-2xl p-6 border border-[#7B4B2A]/10 lg:min-w-[400px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-[#7B4B2A] shrink-0 mt-0.5" strokeWidth={2} />
                            <span className="text-sm text-[#1C1812] font-medium leading-snug">Tarifas<br />preferenciales</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-[#7B4B2A] shrink-0 mt-0.5" strokeWidth={2} />
                            <span className="text-sm text-[#1C1812] font-medium leading-snug">Desayuno<br />incluido*</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-[#7B4B2A] shrink-0 mt-0.5" strokeWidth={2} />
                            <span className="text-sm text-[#1C1812] font-medium leading-snug">Atención<br />personalizada</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-[#7B4B2A] shrink-0 mt-0.5" strokeWidth={2} />
                            <span className="text-sm text-[#1C1812] font-medium leading-snug">Beneficios<br />por volumen</span>
                        </div>
                    </div>
                    <p className="text-[9px] text-[#7B4B2A]/60 mt-4 font-light">*En propiedades participantes.</p>
                </div>
            </div>

            {/* Subtle Divider */}
            <div className="w-full h-px bg-gradient-to-r from-[#7B4B2A]/10 via-[#7B4B2A]/10 to-transparent mb-8"></div>
        </div>
    )
}
