'use client'

export function BenefitsStripNew() {
  const benefits = [
    { label: 'Tarifas preferenciales durante todo el año' },
    { label: 'Early check-in y late check-out (sujeto a disponibilidad)' },
    { label: 'Desayuno incluido' },
    { label: 'Facturación rápida y personalizada' },
  ]

  return (
    <section className="bg-[#1C1812] py-16 sm:py-20 px-6 sm:px-10 border-y border-[#2e4a3d]/30">
      <div className="max-w-5xl mx-auto">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c4a574] mb-10 text-center">
          Beneficios del convenio
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-4 py-4 border-b border-[#FAF5EF]/10 last:border-0 lg:border-0 lg:py-0"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2e4a3d]/50 border border-[#2e4a3d]/60 flex items-center justify-center text-[#7B6B4A] font-serif text-sm">
                {i + 1}
              </span>
              <span className="text-[#FAF5EF]/90 text-sm sm:text-base font-light leading-snug">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
