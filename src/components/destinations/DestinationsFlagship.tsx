"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, MapPin, Compass, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useTranslation } from '@/contexts/LocaleContext'
import { getAtlasData, type LocaleAtlas } from '@/lib/atlas-data'

export function DestinationsFlagship() {
    const { t, locale } = useTranslation()
    const { destinations, modalData } = getAtlasData((locale || 'es') as LocaleAtlas)
    const [activeIndex, setActiveIndex] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalDestinationIndex, setModalDestinationIndex] = useState(0)
    const active = destinations[activeIndex]

    const openModal = useCallback(() => {
        setModalDestinationIndex(activeIndex)
        setModalOpen(true)
    }, [activeIndex])

    const closeModal = useCallback(() => {
        setModalOpen(false)
    }, [])

    // Preload all minimal references gracefully
    useEffect(() => {
        const nextIdx = (activeIndex + 1) % destinations.length;
        const img = new window.Image();
        img.src = destinations[nextIdx].image;
    }, [activeIndex]);

    // ESC to close modal
    useEffect(() => {
        if (!modalOpen) return
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal()
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [modalOpen, closeModal]);

    // Lock body scroll when modal open
    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [modalOpen]);

    return (
        <section className="relative w-full h-[100svh] min-h-[800px] bg-[#11110F] overflow-hidden font-sans text-[#F4EFE7] selection:bg-[#B7925A]/20 flex flex-col lg:flex-row">

            {/* 1. STAGE / CINEMATIC BACKGROUND */}
            <div className="absolute inset-0 w-full h-full lg:w-[68%] lg:left-[32%] z-0 overflow-hidden bg-[#11110F]">
                {/* Cross-fade simultáneo puro retirando mode="wait" de AnimatePresence */}
                <AnimatePresence>
                    <motion.div
                        key={`bg-${active.slug}`}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{
                            opacity: { duration: 2.2, ease: [0.33, 1, 0.68, 1] },
                            scale: { duration: 35, ease: "easeOut" } // Even Slower, meditative pan
                        }}
                        className="absolute inset-0 origin-center"
                    >
                        <Image src={active.image} alt={active.name} fill sizes="100vw" className="w-full h-full object-cover block" />

                        {/* Elite Warm Atmospheric Overlays */}
                        {/* Soft left feathering to merge sidebar and image */}
                        <div className="hidden lg:block absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#11110F] via-[#11110F]/60 to-transparent z-10" />

                        {/* Global deep atmospheric vignette (burn bottom and edges) - Warmer */}
                        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#181410]/50 z-10 mix-blend-multiply" />

                        {/* Text protection base fade - Warmer */}
                        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#11110F] via-[#11110F]/60 to-transparent z-10" />
                    </motion.div>
                </AnimatePresence>

                {/* 8. ATLAS GRID LAYER (Hyper-refined Territory vibe) */}
                <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.35] mix-blend-overlay">
                    {/* Hairline geometric cuts - Warmer tone */}
                    <div className="absolute top-[33%] w-full h-[1px] bg-[#BFA884]/25" />
                    <div className="absolute top-[66%] w-full h-[1px] bg-[#BFA884]/25" />
                    <div className="absolute left-[50%] h-full w-[1px] bg-[#BFA884]/25" />

                    {/* Micro crosshairs */}
                    <div className="absolute top-[33%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[#F4EFE7]/40 font-mono text-[9px] tracking-tighter">┼</div>
                    <div className="absolute top-[66%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[#F4EFE7]/40 font-mono text-[9px] tracking-tighter">┼</div>

                    {/* Elite Geographic coordinates */}
                    <div className="absolute top-10 right-14 hidden lg:flex flex-col items-end gap-1.5 text-[#CFC4B4]/60 font-mono text-[9px] tracking-[0.4em] uppercase">
                        <span className="opacity-40">COORD / L.L.</span>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={`coord-${active.slug}`}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -8 }}
                                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                            >
                                {active.coordinates}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* 2. NAVIGATION PORTFOLIO INDEX (LEFT SIDEBAR DESKTOP) */}
            {/* Ligeramente más angosto para dar más peso al visual y más refinado */}
            <div className="hidden lg:flex w-[32%] relative z-30 bg-[#11110F] flex-col justify-between pt-[120px] pb-10 px-10 xl:px-14 border-r border-[#BFA884]/10">

                {/* Header branding / Silencioso */}
                <div className="flex flex-col mb-16">
                    <span className="text-[#B7925A] tracking-[0.35em] uppercase text-[8px] font-semibold mb-4 flex items-center gap-3">
                        <Compass size={11} strokeWidth={1.5} />
                        {t('destinations.atlasTitle')}
                    </span>
                    <h2 className="text-[#CFC4B4]/40 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase mb-1 flex items-center gap-2">
                        <span className="w-2 h-px bg-[#BFA884]/30" /> {t('destinations.operadoraSimatiri')}
                    </h2>
                    <h3 className="text-[#F4EFE7]/80 text-sm font-serif italic ml-4">{t('destinations.norteMexico')}</h3>
                </div>

                {/* Index List - Extreme refinement */}
                <div className="flex-1 flex flex-col justify-center gap-7 overflow-y-auto no-scrollbar py-4">
                    {destinations.map((dest, idx) => {
                        const isActive = idx === activeIndex;
                        return (
                            <button
                                key={dest.slug}
                                onClick={() => setActiveIndex(idx)}
                                className="group flex items-start gap-5 text-left transition-all duration-1000 ease-[0.33,1,0.68,1] hover:pl-2"
                            >
                                {/* Elite Numbering */}
                                <span className={cn(
                                    "font-mono text-[9px] mt-[0.35rem] transition-colors duration-700 tracking-wider",
                                    isActive ? "text-[#B7925A]" : "text-[#CFC4B4]/20 group-hover:text-[#CFC4B4]/50"
                                )}>
                                    {dest.id}
                                </span>

                                {/* Name Line */}
                                <div className="flex flex-col">
                                    <span className={cn(
                                        "font-serif transition-colors duration-700 leading-none",
                                        isActive ? "text-3xl lg:text-4xl text-[#F4EFE7] tracking-wide" : "text-2xl text-[#CFC4B4]/30 group-hover:text-[#CFC4B4]/70 tracking-normal"
                                    )}>
                                        {dest.name}
                                    </span>

                                    {/* Active Subtitle */}
                                    <div className={cn(
                                        "overflow-hidden transition-all duration-1000 ease-[0.33,1,0.68,1]",
                                        isActive ? "max-h-[24px] opacity-100 mt-2.5" : "max-h-0 opacity-0"
                                    )}>
                                        <span className="text-[9px] text-[#CFC4B4]/60 uppercase tracking-[0.25em] font-medium flex items-center gap-2">
                                            <span className="w-5 h-px bg-[#B7925A] transition-all duration-1000 delay-150" /> {dest.region}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* Footer caption */}
                <div className="mt-12 text-[8px] text-[#CFC4B4]/30 uppercase tracking-[0.5em] flex justify-between px-2">
                    <span>{t('destinations.sierraTarahumara')}</span>
                    <span>{destinations.length} / {t('destinations.destinosLabel')}</span>
                </div>
            </div>

            {/* 2B. MOBILE — Carrusel premium con flechas (solo móvil); offset para quedar bajo navbar h-16 */}
            <div className="lg:hidden absolute top-16 left-0 right-0 z-40 pt-2 pb-0 px-4">
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#11110F]/94 backdrop-blur-md border border-[#BFA884]/15 py-3 px-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                    <button
                        type="button"
                        onClick={() => setActiveIndex((prev) => (prev === 0 ? destinations.length - 1 : prev - 1))}
                        aria-label={t('destinations.destinoAnterior')}
                        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-[#BFA884]/25 bg-[#181410]/60 text-[#CFC4B4] hover:text-[#F4EFE7] hover:border-[#B7925A]/50 hover:bg-[#181410]/80 transition-all duration-300"
                    >
                        <ChevronLeft size={20} strokeWidth={1.5} className="text-[#F4EFE7]/90" />
                    </button>

                    <div className="flex-1 min-w-0 flex flex-col items-center justify-center text-center px-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`nav-${active.slug}`}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
                                className="flex flex-col items-center gap-0.5"
                            >
                                <span className="font-serif text-lg text-[#F4EFE7] tracking-tight leading-tight">
                                    {active.name}
                                </span>
                                <span className="text-[9px] uppercase tracking-[0.2em] text-[#CFC4B4]/70 font-medium">
                                    {active.region}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                        <span className="mt-1.5 text-[9px] font-mono text-[#CFC4B4]/50 tabular-nums tracking-wider">
                            {String(activeIndex + 1).padStart(2, '0')} / {destinations.length}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => setActiveIndex((prev) => (prev === destinations.length - 1 ? 0 : prev + 1))}
                        aria-label={t('destinations.destinoSiguiente')}
                        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-[#BFA884]/25 bg-[#181410]/60 text-[#CFC4B4] hover:text-[#F4EFE7] hover:border-[#B7925A]/50 hover:bg-[#181410]/80 transition-all duration-300"
                    >
                        <ChevronRight size={20} strokeWidth={1.5} className="text-[#F4EFE7]/90" />
                    </button>
                </div>
            </div>

            {/* 3 & 5. DESTINATION INFORMATION PANEL (Monumental Right) */}
            <div className="absolute inset-x-0 bottom-0 lg:w-[68%] lg:left-[32%] z-30 p-8 pb-14 lg:p-20 flex flex-col justify-end pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`panel-${active.slug}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.33, 1, 0.68, 1],
                            staggerChildren: 0.15
                        }}
                        className="pointer-events-auto max-w-[900px] flex flex-col items-start"
                    >

                        {/* Elite Top Badges - Warmer */}
                        <motion.div
                            variants={{ initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 } }}
                            className="flex flex-wrap items-center gap-3 lg:gap-4 mb-5 lg:mb-8"
                        >
                            <span className="px-3 py-1 bg-[#181410]/70 backdrop-blur-md border border-[#BFA884]/20 text-[8px] lg:text-[9px] uppercase tracking-[0.3em] text-[#B7925A] font-medium">
                                {active.highlight}
                            </span>
                            <div className="flex items-center gap-2 text-[#CFC4B4]/70 text-[8px] lg:text-[9px] uppercase tracking-[0.2em] bg-[#181410]/40 px-3 py-1 backdrop-blur-sm border border-[#BFA884]/10">
                                <MapPin size={9} />
                                {active.region}
                            </div>
                        </motion.div>

                        {/* 3. Monumental Epic Title */}
                        <motion.h1
                            variants={{ initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 } }}
                            className="text-[3.5rem] md:text-7xl lg:text-[6rem] xl:text-[8rem] font-serif text-[#F4EFE7] mb-6 lg:mb-10 leading-[0.9] tracking-tight drop-shadow-2xl"
                        >
                            {active.name}
                        </motion.h1>

                        {/* Selected info ribbon block - Editorial layout */}
                        <div className="w-full flex flex-col md:flex-row gap-8 lg:gap-14">

                            {/* Left Col: Metadata Ribbon */}
                            <motion.div
                                variants={{ initial: { opacity: 0, x: -15 }, animate: { opacity: 1, x: 0 } }}
                                className="flex flex-row md:flex-col gap-6 md:gap-8 border-l border-[#B7925A]/30 pl-5 min-w-[140px]"
                            >
                                <div className="flex flex-col gap-1.5 focus">
                                    <span className="text-[#CFC4B4]/50 font-mono text-[8px] tracking-[0.3em] uppercase">{t('destinations.altitud')}</span>
                                    <span className="text-[#F4EFE7]/90 text-xs font-medium tracking-wider">{active.altitude}</span>
                                </div>
                                <div className="flex flex-col gap-1.5 border-l md:border-l-0 border-[#BFA884]/20 pl-6 md:pl-0">
                                    <span className="text-[#CFC4B4]/50 font-mono text-[8px] tracking-[0.3em] uppercase">{t('destinations.temporada')}</span>
                                    <span className="text-[#F4EFE7]/90 text-xs font-medium tracking-wider">{active.season}</span>
                                </div>
                            </motion.div>

                            {/* Right Col: Desc and Action */}
                            <div className="flex flex-col gap-8 lg:gap-10">
                                <motion.p
                                    variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
                                    className="text-[16px] lg:text-[18px] text-[#CFC4B4]/90 font-light leading-[2] max-w-xl pr-4"
                                >
                                    {active.desc}
                                </motion.p>

                                {/* 6 & 7. Elite CTA and Tags block */}
                                <motion.div
                                    variants={{ initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 } }}
                                    className="flex flex-col sm:flex-row items-start sm:items-center gap-8 lg:gap-12"
                                >
                                    {/* Elevated Warm CTA — opens modal, no navigation */}
                                    <button
                                        type="button"
                                        onClick={openModal}
                                        className="group relative inline-flex items-center justify-center gap-4 bg-[#181410]/40 backdrop-blur-sm border border-[#BFA884]/30 text-[#F4EFE7] px-8 py-[18px] font-sans font-medium uppercase tracking-[0.2em] text-[10px] transition-all duration-[800ms] overflow-hidden hover:border-[#B7925A]"
                                    >
                                        <div className="absolute inset-0 bg-[#B7925A]/90 -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-[800ms] ease-[0.33,1,0.68,1] z-0" />
                                        <span className="relative z-10 flex items-center gap-4 text-[#F4EFE7]">
                                            {t('destinations.adentrarse')} <ArrowUpRight size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-700" strokeWidth={1.5} />
                                        </span>
                                    </button>

                                    {/* Ultra fine Editorial Tags */}
                                    <div className="hidden md:flex flex-col gap-2.5">
                                        <span className="text-[#CFC4B4]/40 text-[8px] uppercase tracking-[0.4em] font-mono">{t('destinations.atributos')}</span>
                                        <div className="flex items-center gap-3">
                                            {active.tags.map((tag, i) => (
                                                <div key={tag} className="flex items-center gap-3">
                                                    {i > 0 && <span className="w-1 h-1 rounded-full bg-[#BFA884]/30" />}
                                                    <span className="text-[10px] text-[#CFC4B4]/70 tracking-[0.15em] font-light uppercase">
                                                        {tag}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* MODAL FLAGSHIP — Adentrarse */}
            <AnimatePresence>
                {modalOpen && (() => {
                    const dest = destinations[modalDestinationIndex]
                    const data = modalData[dest.slug]
                    if (!data) return null
                    return (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                                className="fixed inset-0 z-[100] bg-[#0a0908]/85 backdrop-blur-sm"
                                onClick={closeModal}
                                aria-hidden="true"
                            />
                            <motion.div
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modal-destination-title"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 16 }}
                                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                                className="fixed left-1/2 top-1/2 z-[101] w-[92vw] max-w-[1400px] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 flex flex-col rounded-sm border border-[#BFA884]/20 bg-[#11110F] shadow-2xl overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close button */}
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="absolute top-6 right-6 z-10 p-2 rounded-full border border-[#BFA884]/30 bg-[#181410]/80 text-[#CFC4B4] hover:text-[#F4EFE7] hover:border-[#B7925A]/50 transition-all duration-300"
                                    aria-label={t('common.cerrar')}
                                >
                                    <X size={20} strokeWidth={1.5} />
                                </button>

                                <div className="overflow-y-auto flex-1 no-scrollbar">
                                    {/* 1. CABECERA DEL DESTINO */}
                                    <div className="relative pt-12 pb-8 px-8 md:px-12 lg:px-16 border-b border-[#BFA884]/10">
                                        <span className="text-[#B7925A] text-[9px] uppercase tracking-[0.35em] font-medium">
                                            {dest.region}
                                        </span>
                                        <h2 id="modal-destination-title" className="mt-2 text-4xl md:text-5xl lg:text-6xl font-serif text-[#F4EFE7] tracking-tight">
                                            {dest.name}
                                        </h2>
                                        <p className="mt-3 text-[#CFC4B4]/90 text-lg md:text-xl font-light max-w-2xl">
                                            {data.subtitle}
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {dest.tags.map((tag) => (
                                                <span key={tag} className="px-3 py-1 bg-[#181410] border border-[#BFA884]/15 text-[10px] uppercase tracking-[0.2em] text-[#CFC4B4]/80">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="px-8 md:px-12 lg:px-16 py-10 md:py-14 space-y-14 md:space-y-16">
                                        {/* 2. INTRO EDITORIAL */}
                                        <section>
                                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#B7925A] font-medium mb-4">{t('destinations.introduccion')}</h3>
                                            <p className="text-[#CFC4B4]/95 text-base md:text-lg leading-[1.9] max-w-3xl font-light">
                                                {data.intro}
                                            </p>
                                        </section>

                                        {/* 3. POR QUÉ IR */}
                                        <section>
                                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#B7925A] font-medium mb-6">{t('destinations.porQueIr')}</h3>
                                            <ul className="space-y-3 max-w-2xl">
                                                {data.whyGo.map((item, i) => (
                                                    <li key={i} className="flex gap-3 text-[#F4EFE7]/90 text-sm md:text-base font-light">
                                                        <span className="text-[#B7925A] mt-1.5 shrink-0">·</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>

                                        {/* 4. EXPERIENCIAS / HIGHLIGHTS */}
                                        <section>
                                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#B7925A] font-medium mb-6">{t('destinations.experienciasHighlights')}</h3>
                                            <div className="flex flex-wrap gap-3">
                                                {data.highlights.map((h) => (
                                                    <span key={h} className="px-4 py-2 bg-[#181410] border border-[#BFA884]/15 text-[12px] text-[#CFC4B4]/90 uppercase tracking-[0.15em]">
                                                        {h}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>

                                        {/* 5. LUGARES CLAVE */}
                                        <section>
                                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#B7925A] font-medium mb-6">{t('destinations.lugaresClave')}</h3>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-3xl">
                                                {data.keyPlaces.map((place, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-[#CFC4B4]/90 text-sm md:text-base font-light">
                                                        <MapPin size={14} className="text-[#B7925A]/70 shrink-0" />
                                                        {place}
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>

                                        {/* 6. MEJOR TEMPORADA */}
                                        <section>
                                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#B7925A] font-medium mb-6">{t('destinations.mejorTemporada')}</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                                                <div>
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.25em] block mb-1">{t('destinations.cuando')}</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.bestSeason.when}</p>
                                                </div>
                                                <div>
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.25em] block mb-1">{t('destinations.clima')}</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.bestSeason.climate}</p>
                                                </div>
                                                <div>
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.25em] block mb-1">{t('destinations.queEsperar')}</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.bestSeason.expect}</p>
                                                </div>
                                            </div>
                                        </section>

                                        {/* 7. PERFIL DEL DESTINO */}
                                        <section>
                                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#B7925A] font-medium mb-6">{t('destinations.perfilDestino')}</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
                                                <div className="border-l border-[#B7925A]/30 pl-4">
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.2em] block mb-1">{t('destinations.tipoExperiencia')}</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.travelerProfile.experienceType}</p>
                                                </div>
                                                <div className="border-l border-[#B7925A]/30 pl-4">
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.2em] block mb-1">{t('destinations.perfilViajero')}</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.travelerProfile.travelerProfile}</p>
                                                </div>
                                                <div className="border-l border-[#B7925A]/30 pl-4">
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.2em] block mb-1">{t('destinations.estanciaSugerida')}</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.travelerProfile.suggestedStay}</p>
                                                </div>
                                                <div className="border-l border-[#B7925A]/30 pl-4">
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.2em] block mb-1">{t('destinations.conexionCultural')}</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.travelerProfile.culturalLevel}</p>
                                                </div>
                                                <div className="border-l border-[#B7925A]/30 pl-4">
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.2em] block mb-1">{t('destinations.paisaje')}</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.travelerProfile.landscapeType}</p>
                                                </div>
                                                <div className="border-l border-[#B7925A]/30 pl-4">
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.2em] block mb-1">{t('destinations.rolRuta')}</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.travelerProfile.role}</p>
                                                </div>
                                            </div>
                                        </section>

                                        {/* 8. CTA FINAL */}
                                        <section className="pt-6 pb-4 border-t border-[#BFA884]/10">
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                                <Link
                                                    href={`/packages?destino=${encodeURIComponent(dest.slug)}`}
                                                    onClick={closeModal}
                                                    className="group relative inline-flex items-center justify-center gap-3 bg-[#B7925A] text-[#11110F] px-8 py-4 font-sans font-medium uppercase tracking-[0.2em] text-[10px] transition-all duration-300 hover:bg-[#c9a066]"
                                                >
                                                    <span>{data.cta.primary}</span>
                                                    <ArrowUpRight size={14} strokeWidth={1.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </Link>
                                                <span className="text-[#CFC4B4]/70 text-sm font-light">
                                                    {data.cta.secondary}
                                                </span>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )
                })()}
            </AnimatePresence>

        </section>
    )
}
