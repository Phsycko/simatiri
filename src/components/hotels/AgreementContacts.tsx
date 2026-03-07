import React from 'react'

export function AgreementContacts() {
    return (
        <section className="bg-white py-24 px-8">
            <div className="max-w-5xl mx-auto border border-[#1C1812]/10 p-10 md:p-16 flex flex-col lg:flex-row gap-16 justify-between items-start bg-[url('/textures/paper-light.png')] bg-repeat bg-opacity-50">

                <div className="w-full lg:w-1/2 flex flex-col gap-12">
                    {/* Vigencia */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1C1812]/50 mb-4 flex items-center gap-3">
                            <span className="w-4 h-px bg-[#1C1812]/20" />
                            Vigencia del Convenio
                        </h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-base md:text-lg">
                            <span className="font-serif text-[#1C1812]">Desde 1 de Marzo, 2026</span>
                            <span className="text-[#d1ab7a] hidden sm:block">/</span>
                            <span className="font-serif text-[#1C1812]">Hasta 28 de Febrero, 2027</span>
                        </div>
                    </div>

                    {/* Contacto Directo */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1C1812]/50 mb-4 flex items-center gap-3">
                            <span className="w-4 h-px bg-[#1C1812]/20" />
                            Contacto de Asignación Operativa
                        </h4>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-sm tracking-widest text-[#1C1812]">+52 635 106 33 80</span>
                                <span className="font-mono text-sm tracking-widest text-[#1C1812]">+52 614 252 81 90</span>
                                <span className="font-mono text-sm tracking-widest text-[#1C1812]">+52 614 246 41 81</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <a href="mailto:simatirihotelycabanas@gmail.com" className="font-medium text-sm md:text-base text-[#1C1812] hover:text-[#d1ab7a] transition-colors underline underline-offset-4 decoration-[#1C1812]/20">simatirihotelycabanas@gmail.com</a>
                                <a href="mailto:ventas@simatiri.com" className="font-medium text-sm md:text-base text-[#1C1812] hover:text-[#d1ab7a] transition-colors underline underline-offset-4 decoration-[#1C1812]/20">ventas@simatiri.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Firma Institucional y Redes */}
                <div className="w-full lg:w-auto flex flex-col gap-12 lg:items-end lg:text-right">
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1C1812]/50 mb-4 flex items-center lg:justify-end gap-3">
                            Redes Oficiales
                            <span className="w-4 h-px bg-[#1C1812]/20" />
                        </h4>
                        <div className="flex gap-4 lg:justify-end">
                            <a href="#" className="font-bold text-[11px] uppercase tracking-widest text-[#1C1812] hover:text-[#d1ab7a] transition-colors">Facebook</a>
                            <a href="#" className="font-bold text-[11px] uppercase tracking-widest text-[#1C1812] hover:text-[#d1ab7a] transition-colors">Instagram</a>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-[#1C1812]/10 mt-auto">
                        <p className="font-serif italic text-[#1C1812] text-xl mb-2">Tus aliados en el Estado Grande</p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1C1812]/40">RNT: 0108009BE33C3</p>
                    </div>
                </div>

            </div>
        </section>
    )
}
