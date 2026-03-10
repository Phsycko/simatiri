'use client'

import { useTranslation } from '@/contexts/LocaleContext'

export function ClosingBlockNew() {
  const { t } = useTranslation()
  return (
    <section className="bg-[#1C1812] py-20 sm:py-28 px-6 sm:px-10 border-t-4 border-[#7B6B4A]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FAF5EF] tracking-tight uppercase mb-12 leading-snug">
          {t('hotels.seraPlacer')}
        </h2>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c4a574] mb-2">
          {t('hotels.atteGerencia')}
        </p>
        <p className="font-serif text-xl sm:text-2xl text-[#FAF5EF]/95 mb-14">
          {t('hotels.licNaomi')}
        </p>
        <div className="pt-10 border-t border-[#FAF5EF]/10">
          <p className="font-serif text-lg italic text-[#FAF5EF]/80">
            {t('hotels.tusAliados')}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FAF5EF]/40 mt-1">
            RNT: 0108009be33c3
          </p>
        </div>
      </div>
    </section>
  )
}
