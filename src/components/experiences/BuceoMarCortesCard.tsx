"use client"

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { BuceoMarCortesModal } from './BuceoMarCortesModal'
import { ExperienceQuoteModal, buildExperienceQuoteData } from './ExperienceQuoteModal'
import { useTranslation } from '@/contexts/LocaleContext'

/** Imagen desde Google Drive (thumbnail para que cargue en el sitio). ID: 1paxD23xmDAS3UrJ0e_sa1LFtZvCq049S */
const IMAGE_SRC = 'https://drive.google.com/thumbnail?id=1paxD23xmDAS3UrJ0e_sa1LFtZvCq049S&sz=w1200'

export function BuceoMarCortesCard({ tour }: { tour: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const [quoteOpen, setQuoteOpen] = useState(false)
    const { t } = useTranslation()
    const minPrice = tour.tierPrices?.[0]?.pricePerPerson ?? 5500

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="group bg-white border border-[#DDD8D2] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(28,24,18,0.06),0_12px_32px_rgba(28,24,18,0.12)] hover:shadow-[0_8px_24px_rgba(28,24,18,0.08),0_24px_56px_rgba(28,24,18,0.14)] hover:border-[#D0CBC4] transition-all duration-300 cursor-pointer text-left w-full"
            >
                <div className="aspect-[4/3] bg-[#181410] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#1e3a5f] to-[#0a192f]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={IMAGE_SRC}
                            alt={t('experiences.titleBuceoMarCortes')}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.33,1,0.68,1] group-hover:scale-110"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent h-[60%]" />
                </div>
                <div className="p-6">
                    <div className="text-xs text-[#7B4B2A] uppercase tracking-widest font-semibold mb-2">
                        {tour.destination?.name || 'Los Mochis'}
                    </div>
                    <h2 className="font-serif text-xl text-[#0a192f] mb-1 group-hover:text-[#2e4a3d] transition-colors">
                        {t('experiences.titleBuceoMarCortes')}
                    </h2>
                    <p className="text-xs text-gray-500 mb-3">{t('experiences.salidaTopolobampo')}</p>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">
                        {t('experiences.descBuceoCard')}
                    </p>

                    <div className="bg-gray-50 rounded-xl p-4 mb-5">
                        <p className="text-sm text-[#7B4B2A] font-semibold">
                            {t('experiences.desdeMxnPersona')} ${minPrice.toLocaleString('es-MX')} {t('experiences.mxnPorPersona')}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div
                            className="flex items-center gap-2 text-xs font-semibold text-[#7B4B2A] cursor-pointer"
                            onClick={(e) => { e.stopPropagation(); setIsOpen(true) }}
                        >
                            {t('experiences.verExperienciaCompleta')} <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setQuoteOpen(true) }}
                            className="inline-flex items-center justify-center gap-2 bg-[#7B4B2A] hover:bg-[#6B4028] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors"
                        >
                            {t('generic.cotizarTourCaps')}
                        </button>
                    </div>
                </div>
            </div>

            <BuceoMarCortesModal isOpen={isOpen} setIsOpen={setIsOpen} tour={tour} onRequestQuote={() => { setIsOpen(false); setQuoteOpen(true) }} />
            <ExperienceQuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} experience={buildExperienceQuoteData(tour)} />
        </>
    )
}
