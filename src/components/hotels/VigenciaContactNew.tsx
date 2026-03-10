'use client'

import { useTranslation } from '@/contexts/LocaleContext'

export function VigenciaContactNew() {
  const { t } = useTranslation()
  return (
    <section className="bg-[#FAF5EF] text-[#1C1812] py-16 sm:py-20 px-6 sm:px-10 border-t border-[#1C1812]/08">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7B4B2A] mb-4">
            {t('hotels.vigenciaConvenio')}
          </p>
          <p className="font-serif text-lg sm:text-xl text-[#1C1812]">
            {t('hotels.vigenciaFechas')}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7B4B2A] mb-4">
            {t('hotels.contacto')}
          </p>
          <div className="space-y-4">
            <div className="font-mono text-sm sm:text-base tracking-wide text-[#1C1812]">
              <a href="tel:+526351063380" className="block hover:text-[#7B4B2A] transition-colors">+52 635 106 33 80</a>
              <a href="tel:+526142528190" className="block hover:text-[#7B4B2A] transition-colors">+52 614 252 81 90</a>
              <a href="tel:+526142464181" className="block hover:text-[#7B4B2A] transition-colors">+52 614 246 41 81</a>
            </div>
            <div className="space-y-1">
              <a href="mailto:simatirihotelycabanas@gmail.com" className="block text-sm sm:text-base text-[#1C1812] hover:text-[#7B4B2A] transition-colors underline underline-offset-2">
                simatirihotelycabanas@gmail.com
              </a>
              <a href="mailto:ventas@simatiri.com" className="block text-sm sm:text-base text-[#1C1812] hover:text-[#7B4B2A] transition-colors underline underline-offset-2">
                ventas@simatiri.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-16 pt-10 border-t border-[#1C1812]/10 text-center">
        <p className="font-serif text-lg sm:text-xl italic text-[#1C1812]">
          {t('hotels.tusAliados')}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1C1812]/50 mt-1">
          RNT: 0108009be33c3
        </p>
      </div>
    </section>
  )
}
