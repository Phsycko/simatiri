"use client"

import { useState } from 'react'
import { Clock, ArrowRight, Users } from 'lucide-react'
import { TourTarahumaraModal } from './TourTarahumaraModal'
import { ExperienceQuoteModal, buildExperienceQuoteData } from './ExperienceQuoteModal'
import Image from 'next/image'
import { useTranslation } from '@/contexts/LocaleContext'

export function TourTarahumaraCard({ tour }: { tour: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const [quoteOpen, setQuoteOpen] = useState(false)
    const { t } = useTranslation()

    return (
        <>
            {/* CARD ESTÁNDAR, PERO SIN CAMBIO DE RUTA */}
            <div
                onClick={() => setIsOpen(true)}
                className="group bg-white border border-[#DDD8D2] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(28,24,18,0.06),0_12px_32px_rgba(28,24,18,0.12)] hover:shadow-[0_8px_24px_rgba(28,24,18,0.08),0_24px_56px_rgba(28,24,18,0.14)] hover:border-[#D0CBC4] transition-all duration-300 cursor-pointer text-left w-full"
            >
                <div className="aspect-[4/3] bg-[#181410] overflow-hidden relative">
                    <div className="absolute inset-0 block">
                        <Image src="/images/experiences/tour-tarahumara-v2.jpg" alt="Tour Tarahumara" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.33,1,0.68,1] group-hover:scale-110" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent h-[60%]" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/90 text-xs font-medium">
                        <Clock size={13} />
                        {tour.durationHours} {t('common.horas')}
                    </div>
                </div>
                <div className="p-6">
                    <div className="text-xs text-[#7B4B2A] uppercase tracking-widest font-semibold mb-2">
                        {tour.destination?.name || 'Creel Pueblo Mágico'}
                    </div>
                    <h2 className="font-serif text-xl text-[#0a192f] mb-3 group-hover:text-[#2e4a3d] transition-colors">{tour.title}</h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">
                        {tour.description?.startsWith('Lugares: ') ? `${t('generic.lugaresLabel')}: ${tour.description.slice(9)}` : (tour.description ?? '')}
                    </p>

                    {/* Pricing Tiers */}
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

                    <div className="flex items-center gap-2 text-xs font-semibold text-[#7B4B2A]">
                        {t('experiences.verExperienciaCompleta')} <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>

            {/* MODAL EDITORIAL PREMIUM */}
            <TourTarahumaraModal isOpen={isOpen} setIsOpen={setIsOpen} tour={tour} onRequestQuote={() => { setIsOpen(false); setQuoteOpen(true) }} />
            <ExperienceQuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} experience={buildExperienceQuoteData(tour)} />
        </>
    )
}
