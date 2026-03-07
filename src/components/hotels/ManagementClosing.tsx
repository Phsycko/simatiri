import React from 'react'

export function ManagementClosing() {
    return (
        <section className="bg-[#1C1812] py-32 px-8 text-center border-t-8 border-[#d1ab7a]">
            <div className="max-w-3xl mx-auto flex flex-col items-center">
                <div className="w-16 h-px bg-[#d1ab7a]/50 mb-12" />

                <h2 className="font-serif text-3xl md:text-5xl text-white tracking-widest uppercase mb-12 leading-relaxed">
                    Será un verdadero<br />placer recibirles.
                </h2>

                <div className="flex flex-col gap-2 mb-16">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d1ab7a]">Atentamente. Depto. Gerencia</span>
                    <span className="font-serif text-2xl text-white/90">Lic. Naomi Rodríguez</span>
                </div>

                <div className="pt-12 border-t border-white/10 w-full">
                    <p className="font-serif text-xl italic text-white/50 mb-2">Tus aliados en el Estado Grande</p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#d1ab7a]/40">RNT: 0108009be33c3</p>
                </div>
            </div>
        </section>
    )
}
