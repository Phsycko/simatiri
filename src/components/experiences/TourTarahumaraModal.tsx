"use client"

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin, X, Check, Camera, Compass } from 'lucide-react'
import Link from 'next/link'

interface TourTarahumaraModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    tour: any
}

export function TourTarahumaraModal({ isOpen, setIsOpen, tour }: TourTarahumaraModalProps) {
    // Bloquear scroll del body cuando el modal está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Cerrar con Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false)
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay Oscuro Translúcido */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 bg-[#0a192f]/60 backdrop-blur-sm z-50 transition-opacity"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Contenedor del Modal Centrado */}
                    <div className="fixed inset-0 z-[51] flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                            className="pointer-events-auto bg-white rounded-[2rem] overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative"
                        >
                            {/* Botón Cerrar (X) */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
                            >
                                <X size={20} />
                            </button>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto w-full max-h-full no-scrollbar">
                                {/* Header con Imagen */}
                                <div className="relative h-64 md:h-80 w-full bg-[#111]">
                                    <img
                                        src="/images/destinations/creel.jpg"
                                        alt="Tour Tarahumara"
                                        className="w-full h-full object-cover opacity-90"
                                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 pb-6 md:pb-8">
                                        <div className="flex items-center gap-3 text-[#7B4B2A] text-xs font-semibold uppercase tracking-widest mb-3">
                                            <MapPin size={14} /> Creel Pueblo Mágico
                                        </div>
                                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0a192f] leading-none mb-2">
                                            {tour.title}
                                        </h2>
                                    </div>
                                </div>

                                {/* Body del Modal */}
                                <div className="p-8 md:p-12 pt-0 flex flex-col md:flex-row gap-10 md:gap-16">

                                    {/* Columna Izquierda (Info) */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-5 text-sm text-gray-500 font-medium mb-8 pb-8 border-b border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-[#7B4B2A]" /> {tour.durationHours} horas
                                            </div>
                                            <div className="w-px h-4 bg-gray-200" />
                                            <div className="flex items-center gap-2">
                                                <Compass size={16} className="text-[#7B4B2A]" /> Cultura y Naturaleza
                                            </div>
                                        </div>

                                        <div className="mb-10">
                                            <h3 className="font-serif text-2xl text-[#0a192f] mb-4">Sobre la experiencia</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {tour.description || "Adéntrate en el corazón de la Sierra Tarahumara y descubre la cultura ancestral, paisajes impresionantes y formaciones caprichosas en un recorrido profundo y respetuoso que quedará grabado en tu memoria."}
                                            </p>
                                        </div>

                                        <div className="mb-10">
                                            <h3 className="font-serif text-2xl text-[#0a192f] mb-4">Lugares a visitar</h3>
                                            <ul className="space-y-4">
                                                {[
                                                    "Cueva Tarahumara (contacto cultural)",
                                                    "Piedra del Elefante (formaciones rocosas)",
                                                    "Lago de Arareco",
                                                    "Cascada de Cusárare",
                                                    "Misión Jesuita de Cusárare"
                                                ].map((lugar, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-gray-600">
                                                        <div className="mt-1 min-w-5">
                                                            <Camera size={16} className="text-[#7B4B2A]" />
                                                        </div>
                                                        <span className="leading-relaxed">{lugar}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mb-8">
                                            <h3 className="font-serif text-2xl text-[#0a192f] mb-4">Tarifas por persona</h3>
                                            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                                                {tour.tierPrices?.map((t: any, i: number) => (
                                                    <div key={t.id} className={`flex items-center justify-between p-4 ${i !== tour.tierPrices.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                                        <span className="text-gray-600 font-medium">{t.minPax}{t.maxPax < 100 ? ` – ${t.maxPax}` : '+'} pax</span>
                                                        <span className="text-[#0a192f] font-semibold text-lg">${t.pricePerPerson.toLocaleString()} <span className="text-sm text-gray-400 font-normal">MXN</span></span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Columna Derecha (Sidebar) */}
                                    <div className="w-full md:w-72 lg:w-80 flex flex-col">
                                        <div className="bg-[#f8f9fa] rounded-3xl p-6 md:p-8 border border-gray-100 mb-6 relative overflow-hidden">
                                            {/* Decorative */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2e4a3d]/5 rounded-bl-[100px] pointer-events-none" />

                                            <h4 className="font-serif text-xl text-[#0a192f] mb-6">Qué incluye</h4>
                                            <ul className="space-y-4 mb-8">
                                                {[
                                                    "Transporte desde Creel",
                                                    "Guía local certificado",
                                                    "Accesos a comunidades",
                                                    "Entradas a parques",
                                                    "Hidratación a bordo"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                                        <div className="bg-[#7B4B2A]/10 p-1 rounded-full text-[#7B4B2A]">
                                                            <Check size={12} strokeWidth={3} />
                                                        </div>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>

                                            <Link
                                                href="/tailor-made-trip"
                                                className="flex items-center justify-center gap-2 w-full bg-[#7B4B2A] hover:bg-[#6A3F23] text-white py-4 rounded-xl text-sm font-semibold tracking-wider transition-colors shadow-lg shadow-[#7B4B2A]/20"
                                            >
                                                COTIZAR TOUR
                                            </Link>
                                        </div>

                                        <div className="text-center">
                                            <p className="text-xs text-gray-400">¿Dudas sobre esta experiencia?</p>
                                            <Link href="/contact" className="text-sm text-[#7B4B2A] font-semibold hover:underline mt-1 inline-block">
                                                Contactar a un asesor
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
