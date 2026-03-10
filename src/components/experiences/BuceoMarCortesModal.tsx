"use client"

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Waves } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '@/contexts/LocaleContext'

/** Imagen desde Google Drive (thumbnail para que cargue en el sitio). ID: 1paxD23xmDAS3UrJ0e_sa1LFtZvCq049S */
const IMAGE_SRC = 'https://drive.google.com/thumbnail?id=1paxD23xmDAS3UrJ0e_sa1LFtZvCq049S&sz=w1200'

interface BuceoMarCortesModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    tour: any
    onRequestQuote?: () => void
}

export function BuceoMarCortesModal({ isOpen, setIsOpen, tour, onRequestQuote }: BuceoMarCortesModalProps) {
    const { t } = useTranslation()
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'unset'
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [setIsOpen])

    const displayPrice = tour.tierPrices?.[0]?.pricePerPerson ?? 5500

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="fixed inset-0 bg-[#0a192f]/60 backdrop-blur-sm z-50"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="fixed inset-0 z-[51] flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                            className="pointer-events-auto bg-white rounded-[2rem] overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="overflow-y-auto w-full max-h-full no-scrollbar">
                                <div className="relative h-64 md:h-80 w-full bg-[#111]">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={IMAGE_SRC}
                                        alt={t('experiences.titleBuceoMarCortes')}
                                        referrerPolicy="no-referrer"
                                        className="absolute inset-0 w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement
                                            target.style.display = 'none'
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 pb-6 md:pb-8">
                                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0a192f] leading-none">
                                            {t('experiences.titleBuceoMarCortes')}
                                        </h2>
                                        <p className="text-sm md:text-base text-[#0a192f]/80 mt-2">{t('experiences.salidaTopolobampo')}</p>
                                    </div>
                                </div>

                                <div className="p-8 md:p-12 pt-0 flex flex-col md:flex-row gap-10 md:gap-16">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-5 text-sm text-gray-500 font-medium mb-8 pb-8 border-b border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <Waves size={16} className="text-[#7B4B2A]" /> {t('generic.marAventura')}
                                            </div>
                                        </div>

                                        <div className="mb-10">
                                            <h3 className="font-serif text-2xl text-[#0a192f] mb-4">{t('generic.sobreExperiencia')}</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {t('generic.descBuceoModal')}
                                            </p>
                                        </div>

                                        <div className="mb-8">
                                            <h3 className="font-serif text-2xl text-[#0a192f] mb-4">{t('generic.tarifasPorPersona')}</h3>
                                            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 p-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-600 font-medium">{t('generic.precioBase')}</span>
                                                    <span className="text-[#0a192f] font-semibold text-lg">{t('common.desde')} ${displayPrice.toLocaleString('es-MX')} <span className="text-sm text-gray-400 font-normal">{t('common.mxn')}</span></span>
                                                </div>
                                                <p className="text-xs text-gray-400 mt-2">{t('generic.priceNoteBuceo')}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-72 lg:w-80 flex flex-col">
                                        <div className="bg-[#f8f9fa] rounded-3xl p-6 md:p-8 border border-gray-100 mb-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2e4a3d]/5 rounded-bl-[100px] pointer-events-none" />
                                            <h4 className="font-serif text-xl text-[#0a192f] mb-6">{t('generic.queIncluye')}</h4>
                                            <ul className="space-y-4 mb-8">
                                                {[
                                                    t('generic.inclSalidaTopolobampo'),
                                                    t('generic.inclEquipoBuceo'),
                                                    t('generic.inclGuiaCertificado'),
                                                    t('generic.inclGrupoReducido'),
                                                    t('generic.inclSeguroActividad'),
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                                        <div className="bg-[#7B4B2A]/10 p-1 rounded-full text-[#7B4B2A]">
                                                            <Check size={12} strokeWidth={3} />
                                                        </div>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                            <button
                                                type="button"
                                                onClick={() => onRequestQuote?.()}
                                                className="flex items-center justify-center gap-2 w-full bg-[#7B4B2A] hover:bg-[#6A3F23] text-white py-4 rounded-xl text-sm font-semibold tracking-wider transition-colors shadow-lg shadow-[#7B4B2A]/20"
                                            >
                                                {t('generic.cotizarTourCaps')}
                                            </button>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-gray-400">{t('generic.dudasExperiencia')}</p>
                                            <Link href="/contact" className="text-sm text-[#7B4B2A] font-semibold hover:underline mt-1 inline-block">
                                                {t('generic.contactarAsesorLink')}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
