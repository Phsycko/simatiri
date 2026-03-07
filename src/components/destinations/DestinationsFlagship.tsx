"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, MapPin, Compass } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const destinations = [
    {
        id: '01',
        name: 'Creel',
        slug: 'creel',
        region: 'Sierra Tarahumara (Central)',
        coordinates: '27.7523° N, 107.6358° W',
        altitude: '2,350 msnm',
        season: 'Todo el año',
        desc: 'El corazón latente de la Sierra. Campamento base para adentrarse en bosques antiguos, valles de formaciones milenarias y la herencia viva de la cultura Rarámuri.',
        highlight: 'Base de Expedición',
        image: '/images/destinations/creel.jpg',
        tags: ['Pueblo Mágico', 'Misticismo']
    },
    {
        id: '02',
        name: 'Barrancas del Cobre',
        slug: 'barrancas-del-cobre',
        region: 'Sistema de Cañones',
        coordinates: '27.5333° N, 107.7667° W',
        altitude: 'Variable - Abismo Profundo',
        season: 'Recomendado Otoño-Primavera',
        desc: 'Un laberinto de cañones que desafía toda escala humana. Es un reino salvaje, inmenso, el epicentro indiscutible de la aventura en México.',
        highlight: 'Cañones Monstruosos',
        image: '/images/destinations/barrancas-del-cobre.jpg',
        tags: ['Aventura Extrema', 'Monumental']
    },
    {
        id: '03',
        name: 'Divisadero',
        slug: 'divisadero',
        region: 'Circuito Barrancas',
        coordinates: '27.5338° N, 107.8252° W',
        altitude: '2,400 msnm',
        season: 'Todo el año',
        desc: 'Donde la tierra se desgarra majestuosa. El mirador icónico del Tren CHEPE y el cruce audaz del teleférico inmerso en la niebla y el vacío.',
        highlight: 'Punto Panorámico',
        image: '/images/destinations/divisadero.jpg',
        tags: ['Teleférico', 'Fotografía']
    },
    {
        id: '04',
        name: 'El Fuerte',
        slug: 'el-fuerte',
        region: 'Sinaloa Norte',
        coordinates: '26.4172° N, 108.6219° W',
        altitude: '90 msnm',
        season: 'Invierno y Primavera',
        desc: 'Elegancia colonial vibrante a las orillas de un río histórico. Es el umbral perfecto, un prólogo cálido antes del ascenso épico a la alta montaña.',
        highlight: 'Magia Colonial',
        image: '/images/destinations/el-fuerte.jpg',
        tags: ['Historia', 'Pueblo Mágico']
    },
    {
        id: '05',
        name: 'Los Mochis',
        slug: 'los-mochis',
        region: 'Costa Pacífico N.O.',
        coordinates: '25.7928° N, 108.9895° W',
        altitude: '10 msnm',
        season: 'Otoño a Primavera',
        desc: 'Donde el Mar de Cortés besa la tierra, dando inicio (o fin) a la vía férrea más asombrosa de Latinoamérica. Un polo de riqueza gastronómica y portuaria.',
        highlight: 'Puerto y Tren',
        image: '/images/destinations/los-mochis.jpg',
        tags: ['Mariscos', 'Punto Cero']
    },
    {
        id: '06',
        name: 'Cerocahui',
        slug: 'cerocahui',
        region: 'Valle Escóndido (Urique)',
        coordinates: '27.3197° N, 108.0264° W',
        altitude: '1,600 msnm',
        season: 'Otoño - Primavera',
        desc: 'Un remoto valle abrazado por montañas, resguardando una antigua misión jesuita y viñedos centenarios de altura. Un refugio de introspección absoluta.',
        highlight: 'Retiro Jesuita',
        image: '/images/destinations/cerocahui.jpg',
        tags: ['Vino', 'Mirador del Gallego']
    },
    {
        id: '07',
        name: 'Basaseachi',
        slug: 'basaseachi',
        region: 'Altos de Candameña',
        coordinates: '28.1878° N, 108.2148° W',
        altitude: '2,100 msnm',
        season: 'Verano y Otoño (Lluvias)',
        desc: 'Una grieta brutal en la piedra donde una de las cascadas más altas de México ruge al caer. Aire de bosque húmedo, pinos gigantes y senderos al abismo.',
        highlight: 'Naturaleza Colosal',
        image: '/images/destinations/basaseachi.jpg',
        tags: ['Senderismo', 'Cascada']
    },
    {
        id: '08',
        name: 'Guachochi',
        slug: 'guachochi',
        region: 'Alta Sierra Tarahumara',
        coordinates: '26.8197° N, 107.0675° W',
        altitude: '2,280 msnm',
        season: 'Ideal Marzo-Noviembre',
        desc: 'La verdadera metrópoli Rarámuri. Entre sus cumbres y barrancas se esconde Sinforosa y la mística de Kokoyome, una tierra puramente originaria.',
        highlight: 'Cultura Originaria',
        image: '/images/destinations/guachochi.jpg',
        tags: ['Rutas Indígenas', 'Aislamiento']
    },
    {
        id: '09',
        name: 'Cuauhtémoc',
        slug: 'cuauhtemoc',
        region: 'Llanos Menonitas',
        coordinates: '28.4069° N, 106.8653° W',
        altitude: '2,040 msnm',
        season: 'Todo el año',
        desc: 'El encuentro surrealista de las praderas. Aquí, la asombrosa paz de las colonias Menonitas convive con la vasta región manzanera más grande del país.',
        highlight: 'Corredor Cultural',
        image: '/images/destinations/cuauhtemoc.jpg',
        tags: ['Gastronomía Menonita', 'Mestizaje']
    },
    {
        id: '10',
        name: 'Chihuahua',
        slug: 'chihuahua',
        region: 'Desierto y Llanura',
        coordinates: '28.6320° N, 106.0691° W',
        altitude: '1,420 msnm',
        season: 'Otoño y Primavera',
        desc: 'El corazón señorial del norte. Ciudad de cantera, ecos de la Revolución y haciendas inmensas. El arranque clásico para cruzar la gran Sierra.',
        highlight: 'Capital Histórica',
        image: '/images/destinations/chihuahua.jpg',
        tags: ['Orígenes', 'Arquitectura']
    },
]

export function DestinationsFlagship() {
    const [activeIndex, setActiveIndex] = useState(0)
    const active = destinations[activeIndex]

    // Preload all minimal references gracefully
    useEffect(() => {
        const nextIdx = (activeIndex + 1) % destinations.length;
        const img = new Image();
        img.src = destinations[nextIdx].image;
    }, [activeIndex]);

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
                        <img
                            src={active.image}
                            alt={active.name}
                            className="w-full h-full object-cover block"
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                        />

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
                        Atlas de Exploración
                    </span>
                    <h2 className="text-[#CFC4B4]/40 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase mb-1 flex items-center gap-2">
                        <span className="w-2 h-px bg-[#BFA884]/30" /> Operadora Simatiri
                    </h2>
                    <h3 className="text-[#F4EFE7]/80 text-sm font-serif italic ml-4">Norte de México</h3>
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
                    <span>Sierra Tarahumara</span>
                    <span>10 / Destinos</span>
                </div>
            </div>

            {/* 2B. MOBILE INDEX (Floating Top Seamless) */}
            <div className="lg:hidden absolute top-0 left-0 w-full z-40 bg-gradient-to-b from-[#11110F]/95 to-transparent pt-6 pb-6">
                <div className="px-6 mb-5 flex justify-between items-center">
                    <span className="text-[#B7925A] tracking-[0.3em] uppercase text-[7px] font-semibold flex items-center gap-2">
                        <Compass size={9} /> Atlas
                    </span>
                    <span className="text-[#CFC4B4]/50 tracking-[0.3em] font-mono text-[8px]">
                        <span className="text-[#F4EFE7]">{active.id}</span> / 10
                    </span>
                </div>
                <div className="overflow-x-auto no-scrollbar px-6 flex items-center gap-7 snap-x">
                    {destinations.map((d, idx) => {
                        const isActive = idx === activeIndex;
                        return (
                            <button
                                key={d.slug}
                                onClick={() => setActiveIndex(idx)}
                                className={cn(
                                    "snap-start whitespace-nowrap pb-2 text-sm font-serif transition-all duration-700 ease-[0.33,1,0.68,1] relative",
                                    isActive ? "text-[#F4EFE7] text-base tracking-wide" : "text-[#CFC4B4]/40 hover:text-[#CFC4B4]/80"
                                )}
                            >
                                {d.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="mobile-active-border"
                                        className="absolute bottom-0 left-0 w-full h-[1px] bg-[#B7925A]"
                                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                    />
                                )}
                            </button>
                        )
                    })}
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
                                    <span className="text-[#CFC4B4]/50 font-mono text-[8px] tracking-[0.3em] uppercase">Altitud</span>
                                    <span className="text-[#F4EFE7]/90 text-xs font-medium tracking-wider">{active.altitude}</span>
                                </div>
                                <div className="flex flex-col gap-1.5 border-l md:border-l-0 border-[#BFA884]/20 pl-6 md:pl-0">
                                    <span className="text-[#CFC4B4]/50 font-mono text-[8px] tracking-[0.3em] uppercase">Temporada</span>
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
                                    {/* Elevated Warm CTA */}
                                    <Link
                                        href={`/destinations/${active.slug}`}
                                        className="group relative inline-flex items-center justify-center gap-4 bg-[#181410]/40 backdrop-blur-sm border border-[#BFA884]/30 text-[#F4EFE7] px-8 py-[18px] font-sans font-medium uppercase tracking-[0.2em] text-[10px] transition-all duration-[800ms] overflow-hidden hover:border-[#B7925A]"
                                    >
                                        <div className="absolute inset-0 bg-[#B7925A]/90 -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-[800ms] ease-[0.33,1,0.68,1] z-0" />
                                        <span className="relative z-10 flex items-center gap-4 text-[#F4EFE7]">
                                            Adentrarse <ArrowUpRight size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-700" strokeWidth={1.5} />
                                        </span>
                                    </Link>

                                    {/* Ultra fine Editorial Tags */}
                                    <div className="hidden md:flex flex-col gap-2.5">
                                        <span className="text-[#CFC4B4]/40 text-[8px] uppercase tracking-[0.4em] font-mono">Atributos</span>
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

        </section>
    )
}
