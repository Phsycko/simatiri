'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, ArrowRight, Users } from 'lucide-react'
import { ExperienceQuoteModal, buildExperienceQuoteData } from './ExperienceQuoteModal'
import { useTranslation } from '@/contexts/LocaleContext'

/** Card genérica para tours en la página Experiencias que no tienen componente propio. Cotizar abre modal de cotización con datos precargados. */
export function GenericExperienceCard({ tour }: { tour: any }) {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const { t } = useTranslation()
  const minPrice = tour.tierPrices?.[0]?.pricePerPerson
  const isQuoteOnly = ['Hiking en Barrancas del Cobre', 'Buceo en el Mar de Cortés', 'Hiking Barrancas del Cobre', 'Buceo Mar de Cortés'].includes(tour.title)

  return (
    <>
      <div className="group bg-white border border-[#DDD8D2] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(28,24,18,0.06),0_12px_32px_rgba(28,24,18,0.12)] hover:shadow-[0_8px_24px_rgba(28,24,18,0.08),0_24px_56px_rgba(28,24,18,0.14)] hover:border-[#D0CBC4] transition-all duration-300">
        <div className="aspect-[4/3] bg-gradient-to-br from-[#2e4a3d] to-[#0a192f] relative">
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/70 text-xs">
            <Clock size={13} />
            {tour.durationHours} {t('common.horas')}
          </div>
        </div>
        <div className="p-6">
          <div className="text-xs text-[#7B4B2A] uppercase tracking-widest font-semibold mb-2">
            {tour.destination?.name}
          </div>
          <h2 className="font-serif text-xl text-[#0a192f] mb-3 group-hover:text-[#2e4a3d] transition-colors">{tour.title}</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">
            {tour.description?.startsWith('Lugares: ') ? `${t('generic.lugaresLabel')}: ${tour.description.slice(9)}` : (tour.description ?? '')}
          </p>

          {!isQuoteOnly && (
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">
                <Users size={12} /> {t('common.precioPorPersona')}
              </div>
              <div className="space-y-1.5">
                {tour.tierPrices?.slice(0, 3).map((tier: any) => (
                  <div key={tier.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{tier.minPax}{tier.maxPax < 100 ? `–${tier.maxPax}` : '+'} {t('common.pax')}</span>
                    <span className="font-semibold text-[#0a192f]">${(tier.pricePerPerson + 200).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {isQuoteOnly && minPrice != null && (
            <p className="text-sm text-[#7B4B2A] font-semibold mb-5">{t('experiences.desdeMxnPersona')} ${(minPrice + 200).toLocaleString()} {t('experiences.mxnPorPersona')}</p>
          )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {!isQuoteOnly && (
              <Link
                href={`/experiences/${tour.id}`}
                className="flex items-center gap-2 text-xs font-semibold text-[#7B4B2A] hover:text-[#0a192f] transition-colors"
              >
                {t('experiences.verExperienciaCompleta')} <ArrowRight size={13} />
              </Link>
            )}
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#7B4B2A] hover:bg-[#6B4028] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors"
            >
              {t('experiences.cotizar')}
            </button>
          </div>
        </div>
      </div>

      <ExperienceQuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        experience={buildExperienceQuoteData(tour)}
      />
    </>
  )
}
