"use client"

import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { TourBasaseachiModal } from '@/components/experiences/TourBasaseachiModal'
import { ExperienceQuoteModal, buildExperienceQuoteData } from '@/components/experiences/ExperienceQuoteModal'
import Image from 'next/image'
import { useTranslation } from '@/contexts/LocaleContext'

export function TourBasaseachiHomeCard({ tour }: { tour: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const [quoteOpen, setQuoteOpen] = useState(false)
    const [imgSrc, setImgSrc] = useState('/images/destinations/basaseachi.jpg')
    const { t } = useTranslation()
    const basePrice = tour?.tierPrices?.[0]?.pricePerPerson ?? 1500
    const price = basePrice + 200

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 text-left w-full"
            >
                <div className="aspect-video bg-gradient-to-br from-[#0a192f] to-[#2e4a3d] relative">
                    <div className="absolute inset-0 block">
                        <Image src="/images/experiences/tour-basaseachi-v2.jpg" alt="Tour Basaseachi" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.33,1,0.68,1] group-hover:scale-110" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center relative z-10">
                        <MapPin className="text-white/20" size={48} strokeWidth={1} />
                    </div>
                </div>
                <div className="p-6">
                    <h3 className="font-serif text-xl text-[#0a192f] mb-2 group-hover:text-[#2e4a3d] transition-colors">{tour?.title || 'Tour Basaseachi'}</h3>
                    <p className="text-sm text-gray-500 mb-4">{tour?.durationHours || 10} {t('home.horasExperiencia')}</p>
                    <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                        <span className="text-xs text-gray-400">{t('common.porPersona')}</span>
                        <span className="font-bold text-[#7B4B2A]">
                            {t('home.desdeMxn')} ${price.toLocaleString()} {t('common.mxn')}
                        </span>
                    </div>
                </div>
            </div>

            <TourBasaseachiModal isOpen={isOpen} setIsOpen={setIsOpen} tour={tour} onRequestQuote={() => { setIsOpen(false); setQuoteOpen(true) }} />
            <ExperienceQuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} experience={buildExperienceQuoteData(tour)} />
        </>
    )
}
