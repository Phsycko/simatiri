import React from 'react'
import Image from 'next/image'

export function HotelsHero() {
    return (
        <section className="relative w-full bg-[#1C1812] px-8 py-32 lg:py-48 flex items-center justify-center overflow-hidden">
            {/* Background Image / Texture overlay */}
            <div className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay pointer-events-none">
                <Image
                    src="/images/destinations/hero-home.jpg"
                    alt="Simatiri Experience Background"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1812] via-[#1C1812]/50 to-[#1C1812]/20" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 md:w-20 h-[1px] bg-[#d1ab7a]" />
                    <span className="text-[11px] md:text-xs font-mono tracking-[0.3em] uppercase text-[#d1ab7a]">
                        Documento Comercial
                    </span>
                    <div className="w-12 md:w-20 h-[1px] bg-[#d1ab7a]" />
                </div>

                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.05] mb-8">
                    Convenio Hotelero<br />
                    <span className="italic font-light text-[#FAF9F7]/90">Preferencial</span>
                </h1>

                <p className="text-[#FAF9F7]/70 text-base md:text-xl font-light leading-relaxed max-w-3xl mt-6 border-l border-[#d1ab7a]/40 pl-6 text-left">
                    Simatiri Experience pone a disposición una red de hospedaje negociado con tarifas preferenciales, beneficios operativos y atención personalizada para tour operadoras, agencias y aliados frecuentes.
                </p>
            </div>
        </section>
    )
}
