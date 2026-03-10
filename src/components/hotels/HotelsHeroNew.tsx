'use client'

import { useTranslation } from '@/contexts/LocaleContext'

export function HotelsHeroNew() {
  const { t } = useTranslation()
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 sm:px-10 py-24 overflow-hidden">
      {/* Fondo: bloque oscuro con textura sutil */}
      <div className="absolute inset-0 bg-[#1C1812]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-[#2e4a3d]/60 bg-[#2e4a3d]/10">
          <span className="w-2 h-2 rounded-full bg-[#7B6B4A]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#c4a574]">
            {t('hotels.documentoComercialCaps')}
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FAF5EF] tracking-tight leading-[1.08] mb-8">
          {t('hotels.convenioPreferencial')}
          <br />
          <span className="text-[#c4a574] font-light italic">{t('hotels.paraTourOperadoras')}</span>
        </h1>

        <p className="text-[#FAF5EF]/75 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {t('hotels.convenioDesc')}
        </p>

        <div className="mt-16 flex justify-center gap-8">
          <div className="w-16 sm:w-24 h-px bg-[#7B6B4A]/50" />
          <div className="w-16 sm:w-24 h-px bg-[#2e4a3d]/50" />
        </div>
      </div>
    </section>
  )
}
