"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation2, Wind, Mountain, Waves, Train, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const ROUTE_STOPS = [
    { id: 'mochis', name: 'Los Mochis', x: 10, y: 85, subtitle: "Inicio del recorrido", desc: "Puerta de entrada desde el Pacífico. Sus llanuras costeras preparan al viajero para el ascenso dramático hacia la Sierra Tarahumara.", highlights: ["Conexión Pacífico", "Gastronomía del mar", "Bahía Topolobampo"] },
    { id: 'fuerte', name: 'El Fuerte', x: 25, y: 65, subtitle: "Pueblo Mágico Colonial", desc: "Testigo vivo de la época colonial. Aquí la ribera del río y la arquitectura histórica marcan el inicio oficial de la ascensión.", highlights: ["Arquitectura colonial", "Río Fuerte", "Danzas originarias"] },
    { id: 'cerocahui', name: 'Cerocahui / Bahuichivo', x: 45, y: 55, subtitle: "Vinos y Cascadas", desc: "Misión jesuítica en lo profundo del cañón, famosa por sus viñedos de altura y la cercanía al imponente Cerro del Gallego.", highlights: ["Mirador del Gallego", "Altar jesuita", "Cata de vinos"] },
    { id: 'divisadero', name: 'Divisadero', x: 55, y: 48, subtitle: "Barrancas del Cobre", desc: "El punto más espectacular de la ruta, donde el cañón se abre ante los ojos con miradores inigualables y alturas de vértigo.", highlights: ["Parque Aventura", "Teleférico", "Vistas icónicas"] },
    { id: 'creel', name: 'Creel', x: 67, y: 38, subtitle: "Capital de la Sierra", desc: "Corazón de la cultura Rarámuri. Rodeado de bosques de pino, valles de formaciones rocosas y lagos cristalinos.", highlights: ["Valle de los Monjes", "Lago de Arareco", "Cultura viva"] },
    { id: 'cuauhtemoc', name: 'Cuauhtémoc', x: 82, y: 30, subtitle: "La Región Menonita", desc: "Transición del bosque al altiplano desértico. Una región marcada por la cultura menonita y la inmensidad de los campos.", highlights: ["Campos menonitas", "Quesos artesanales", "Museo histórico"] },
    { id: 'chihuahua', name: 'Chihuahua', x: 95, y: 15, subtitle: "Capital del Estado", desc: "Cierre del corredor. Una ciudad que respira historia revolucionaria, rodeada por el misticismo del desierto del norte.", highlights: ["Historia Revolución", "Arquitectura clásica", "Conexión aérea"] },
];

const SECONDARY_STOPS = [
    { id: 'basaseachi', name: 'Cascada Basaseachi', x: 54, y: 25, icon: Waves },
    { id: 'guachochi', name: 'Guachochi', x: 80, y: 60, icon: Mountain },
    { id: 'maguarichi', name: 'Maguarichi', x: 52, y: 32, icon: Wind },
];

// Curvaceous path connecting the main stops precisely through their coordinates
const SVG_PATH_D = "M 10 85 C 15 75, 20 68, 25 65 C 35 60, 40 58, 45 55 C 50 52, 52 50, 55 48 C 60 42, 63 40, 67 38 C 75 34, 78 32, 82 30 C 88 24, 92 18, 95 15";

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 30 : -30,
            opacity: 0,
            scale: 0.98,
            filter: 'blur(4px)',
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 30 : -30,
            opacity: 0,
            scale: 0.98,
            filter: 'blur(4px)',
        };
    }
};

export default function RouteExperienceSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [tuple, setTuple] = useState([0, activeIndex]);

    if (tuple[1] !== activeIndex) {
        setTuple([tuple[1], activeIndex]);
    }
    const direction = activeIndex > tuple[0] ? 1 : -1;

    const handleNext = () => {
        if (activeIndex < ROUTE_STOPS.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    const handlePrev = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    const activeStopId = ROUTE_STOPS[activeIndex].id;
    const currentStop = ROUTE_STOPS[activeIndex];

    const pathProgress = activeIndex / (ROUTE_STOPS.length - 1);

    return (
        <section className="bg-[#FFFFFF] w-full text-[#111111] relative py-20 pb-20 overflow-hidden">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full flex flex-col justify-center gap-8 lg:gap-16">

                <div className="text-center md:text-left pt-6 px-4 mb-4">
                    <h2 className="text-[#444444] uppercase tracking-[0.3em] text-xs font-semibold mb-2">Mapa Interactivo</h2>
                    <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight text-[#111111] drop-shadow-sm">Explora la Ruta CHEPE</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 w-full lg:min-h-[600px]">

                    {/* MAPA (Left 7 Columns) */}
                    <div className="lg:col-span-7 relative flex items-center h-full">
                        <div className="w-full bg-[#1A3324] rounded-3xl border border-black/5 overflow-hidden shadow-2xl flex items-center justify-center p-4 md:p-12 relative aspect-square lg:aspect-auto h-full lg:min-h-[550px] max-h-[700px]">
                            <div className="relative w-full h-full min-h-[400px]">
                                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                                    {/* Subdued Topo Lines for realism */}
                                    <path d="M 0 50 Q 25 40 50 60 T 100 30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                                    <path d="M 0 60 Q 30 50 40 70 T 100 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                                    <path d="M 20 100 Q 40 60 70 80 T 100 60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

                                    {/* Base dull track line */}
                                    <path
                                        d={SVG_PATH_D}
                                        fill="none"
                                        stroke="rgba(255,255,255,0.15)"
                                        strokeWidth="0.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeDasharray="1 1"
                                    />

                                    {/* Animated Glowing track line */}
                                    <motion.path
                                        d={SVG_PATH_D}
                                        fill="none"
                                        stroke="#C6A46A"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: pathProgress }}
                                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                                        className="drop-shadow-[0_0_8px_rgba(198,164,106,0.6)]"
                                    />

                                    {/* Secondary Stops */}
                                    {SECONDARY_STOPS.map((stop) => (
                                        <g key={stop.id} className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                                            <circle cx={stop.x} cy={stop.y} r="0.6" fill="#FFFFFF" opacity="0.4" />
                                            <text x={stop.x - 1} y={stop.y + 2.5} fontSize="1.8" fill="#FFFFFF" opacity="0.5" className="font-sans font-light tracking-wider" textAnchor="middle">{stop.name}</text>
                                            <stop.icon x={stop.x - 1.2} y={stop.y - 2.5} width="2.4" height="2.4" color="#FFFFFF" opacity="0.6" strokeWidth={1} />
                                        </g>
                                    ))}

                                    {/* Main Stops Nodes */}
                                    {ROUTE_STOPS.map((stop, i) => {
                                        const isActive = stop.id === activeStopId;
                                        const isPast = activeIndex >= i;

                                        return (
                                            <g key={stop.id} className="transition-all duration-300">
                                                {/* Outer glow ping if active */}
                                                {isActive && (
                                                    <circle cx={stop.x} cy={stop.y} r="2.5" fill="rgba(212,176,122,0.2)" className="animate-ping" />
                                                )}

                                                {/* Stop circle */}
                                                <circle
                                                    cx={stop.x}
                                                    cy={stop.y}
                                                    r={isActive ? "1.5" : "1.2"}
                                                    fill={isPast ? (isActive ? "#D4B07A" : "#C6A46A") : "#9C9C9C"}
                                                    stroke={isPast ? "#FFFFFF" : "rgba(255,255,255,0.3)"}
                                                    strokeWidth="0.3"
                                                    className="transition-colors duration-500"
                                                />

                                                {/* Text Label */}
                                                <text
                                                    x={stop.x + (stop.id === 'mochis' || stop.id === 'fuerte' ? 3 : -3)}
                                                    y={stop.y - 1}
                                                    fontSize={isActive ? "2.2" : "1.8"}
                                                    fontWeight={isActive ? "600" : "400"}
                                                    fill={isActive ? "#FFFFFF" : "rgba(255,255,255,0.7)"}
                                                    textAnchor={stop.id === 'mochis' || stop.id === 'fuerte' ? "start" : "end"}
                                                    className="font-sans tracking-wide drop-shadow-md transition-all duration-300"
                                                >
                                                    {stop.name}
                                                </text>

                                                {/* Train Indicator */}
                                                {isActive && (
                                                    <motion.g
                                                        layoutId="trainIndicator"
                                                        transform={`translate(${stop.x - 2}, ${stop.y - 4})`}
                                                        className="drop-shadow-[0_0_10px_rgba(212,176,122,0.8)]"
                                                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                                    >
                                                        <rect width="4" height="4" rx="1" fill="#D4B07A" />
                                                        <Train x="0.5" y="0.5" width="3" height="3" color="#1A3324" />
                                                    </motion.g>
                                                )}
                                            </g>
                                        );
                                    })}
                                </svg>
                            </div>

                            {/* Legend / Overlay info */}
                            <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hidden md:flex">
                                <Navigation2 size={14} className="text-[#C6A46A]" />
                                <span className="text-xs text-white/70 uppercase tracking-widest">Norte / Sierra Madre Occidental</span>
                            </div>
                        </div>
                    </div>

                    {/* NARRATIVA CARD Y CONTROLES (Right 5 Columns) */}
                    <div className="lg:col-span-5 relative flex flex-col justify-center h-full lg:pl-10">
                        <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 bottom-0 w-[1px] h-3/4 bg-black/5" />
                        <div className="absolute left-0 top-1/2 -mt-px w-6 lg:w-10 h-[1px] bg-[#C6A46A]/40 hidden lg:block" />

                        <div className="w-full flex-grow flex flex-col justify-center min-h-[450px]">
                            {/* Viewport de la tarjeta apilada */}
                            <div className="relative w-full overflow-visible mb-12 flex-grow flex items-center">
                                <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                                    <motion.div
                                        key={currentStop.id}
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: "spring", stiffness: 300, damping: 30 },
                                            opacity: { duration: 0.3 },
                                            scale: { duration: 0.5 },
                                            filter: { duration: 0.3 }
                                        }}
                                        className="w-full bg-[#8B5A2B] border border-[#C6A46A]/30 shadow-2xl rounded-3xl p-8 lg:p-10"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="text-[#C6A46A] text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                                                Parada {activeIndex + 1} de {ROUTE_STOPS.length} <span className="w-1 h-1 rounded-full bg-[#C6A46A]/50 inline-block"></span> {currentStop.subtitle}
                                            </div>
                                        </div>
                                        <h4 className="font-serif text-3xl md:text-4xl text-[#F5F5F5] mb-5">{currentStop.name}</h4>
                                        <p className="text-[#D1C7B8] font-light leading-relaxed mb-8">
                                            {currentStop.desc}
                                        </p>

                                        <div className="space-y-4 mb-8">
                                            {currentStop.highlights.map((hlt, i) => (
                                                <div key={i} className="flex items-center gap-3 text-sm text-[#F5F5F5]/95 font-medium">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C6A46A] shadow-[0_0_6px_rgba(198,164,106,0.6)]" />
                                                    {hlt}
                                                </div>
                                            ))}
                                        </div>

                                        <Link href="/packages" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C6A46A] hover:text-[#F5F5F5] transition-colors group">
                                            Ver paquetes desde aquí
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>

                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Controles del Carrusel */}
                            <div className="flex items-center justify-between px-2">
                                <button
                                    onClick={handlePrev}
                                    disabled={activeIndex === 0}
                                    className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${activeIndex === 0 ? 'border-black/5 opacity-30 cursor-not-allowed text-[#111111]/40' : 'border-black/10 hover:border-[#8B5A2B] hover:bg-[#8B5A2B]/5 text-[#111111] hover:text-[#8B5A2B] cursor-pointer'}`}
                                    aria-label="Parada anterior"
                                >
                                    <ChevronLeft size={24} />
                                </button>

                                <div className="text-[#F5F5F5] text-xs tracking-[0.2em] font-medium px-4 py-2 border border-[#C6A46A]/30 bg-[#8B5A2B] rounded-full shadow-md">
                                    {activeIndex + 1} <span className="text-[#F5F5F5]/40 mx-1">/</span> {ROUTE_STOPS.length}
                                </div>

                                <button
                                    onClick={handleNext}
                                    disabled={activeIndex === ROUTE_STOPS.length - 1}
                                    className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${activeIndex === ROUTE_STOPS.length - 1 ? 'border-black/5 opacity-30 cursor-not-allowed text-[#111111]/40' : 'border-black/10 hover:border-[#8B5A2B] hover:bg-[#8B5A2B]/5 text-[#111111] hover:text-[#8B5A2B] cursor-pointer'}`}
                                    aria-label="Siguiente parada"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="relative mt-8 py-10 border-t border-black/5">
                <div className="text-center flex flex-col sm:flex-row justify-center gap-4 px-6 z-10 w-full max-w-xl mx-auto">
                    <Link href="/packages" className="inline-flex flex-1 items-center justify-center gap-2 bg-[#C6A46A] hover:bg-[#8B5A2B] text-white text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-colors border-none shadow-sm hover:shadow-md">
                        Explorar Paquetes de la Ruta
                    </Link>
                    <Link href="/tailor-made-trip" className="inline-flex flex-1 items-center justify-center gap-2 bg-transparent border border-[#111111]/20 hover:bg-[#111111]/5 text-[#111111] text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-colors">
                        Diseñar Viaje a Medida
                    </Link>
                </div>
            </div>
        </section>
    );
}
