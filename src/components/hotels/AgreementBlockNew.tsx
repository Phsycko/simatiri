'use client'

import { useTranslation } from '@/contexts/LocaleContext'

export function AgreementBlockNew() {
  const { t } = useTranslation()
  return (
    <section className="bg-[#FAF5EF] text-[#1C1812] py-20 sm:py-28 px-6 sm:px-10">
      <div className="max-w-3xl mx-auto">
        <p className="font-semibold text-[11px] uppercase tracking-[0.25em] text-[#7B4B2A] mb-2">
          {t('hotels.operadoraLabel')}
        </p>
        <p className="font-serif text-xl sm:text-2xl text-[#1C1812]/80 italic mb-12">
          {t('hotels.aQuienCorresponda')}
        </p>

        <div className="space-y-8 text-[#2d2824] font-light leading-[1.85] text-base sm:text-lg border-l-2 border-[#7B4B2A]/40 pl-8 sm:pl-10">
          <p>{t('hotels.convenioP1')}</p>
          <p>{t('hotels.convenioP2')}</p>
        </div>
      </div>
    </section>
  )
}
