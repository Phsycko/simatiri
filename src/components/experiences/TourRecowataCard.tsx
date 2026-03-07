"use client"

import { useState } from 'react'
import { Clock, ArrowRight, Users } from 'lucide-react'
import { TourRecowataModal } from './TourRecowataModal'

export function TourRecowataCard({ tour }: { tour: any }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* CARD ESTÁNDAR, SIN CAMBIO DE RUTA */}
            <div
                onClick={() => setIsOpen(true)}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer text-left w-full"
            >
                <div className="aspect-[4/3] bg-gradient-to-br from-[#2e4a3d] to-[#0a192f] relative">
                    <div className="absolute inset-0 block">
                        <img
                            src="/images/destinations/recowata.jpg"
                            alt="Tour Recowata"
                            className="w-full h-full object-cover mix-blend-overlay opacity-50"
                            onError={(e) => {
                                e.currentTarget.src = '/images/destinations/creel.jpg'
                            }}
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent h-32" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/90 text-xs font-medium">
                        <Clock size={13} />
                        10 Horas
                    </div>
                </div>
                <div className="p-6">
                    <div className="text-xs text-[#7B4B2A] uppercase tracking-widest font-semibold mb-2">
                        {tour?.destination?.name || 'Creel / Sierra Tarahumara'}
                    </div>
                    <h2 className="font-serif text-xl text-[#0a192f] mb-3 group-hover:text-[#2e4a3d] transition-colors">Tour Recowata</h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">Salida desde el lugar acordado; se puede recoger al grupo en el hotel en el que se hospedan.</p>

                    {/* Pricing Tiers */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-5">
                        <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">
                            <Users size={12} /> Precio por persona
                        </div>
                        <div className="space-y-1.5">
                            {[
                                { min: 1, max: 2, price: 600 },
                                { min: 3, max: 6, price: 500 },
                                { min: 7, max: 11, price: 400 },
                            ].map((t, i) => (
                                <div key={i} className="flex justify-between text-sm">
                                    <span className="text-gray-600">{t.min}–{t.max} pax</span>
                                    <span className="font-semibold text-[#0a192f]">${t.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-[#7B4B2A]">
                        Ver experiencia completa <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>

            {/* MODAL EDITORIAL PREMIUM */}
            <TourRecowataModal isOpen={isOpen} setIsOpen={setIsOpen} tour={tour} />
        </>
    )
}
