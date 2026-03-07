import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'

export const metadata: Metadata = {
    title: 'Cotizar Viaje a la Medida',
    description: 'Diseña tu viaje perfecto por la Sierra Tarahumara con Simatiri Experience. Itinerarios personalizados, servicio concierge y atención exclusiva.',
}

const budgets = [
    'Hasta $10,000 MXN por persona',
    '$10,000 – $20,000 MXN por persona',
    '$20,000 – $40,000 MXN por persona',
    '$40,000+ MXN por persona',
    'No tengo presupuesto definido aún',
]

const interests = [
    'Tren CHEPE',
    'Barrancas del Cobre',
    'Cultura Rarámuri',
    'Senderismo / Aventura',
    'Fotografía',
    'Gastronomía',
    'Hoteles de lujo',
    'Historia Colonial',
]

export default function TailorMadeTripPage() {
    return (
        <>
            <PageHero
                label="Viaje a la Medida"
                title="Tu viaje, diseñado sin compromisos"
                subtitle="Cuéntanos tu sueño. Nuestros especialistas diseñan el itinerario, seleccionan los hoteles y coordinan cada detalle para que tú solo te ocupes de disfrutar."
                size="md"
            />

            <section className="py-20 px-8">
                <div className="max-w-3xl mx-auto">

                    <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm">
                        <div className="mb-8">
                            <div className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-2">Paso 1</div>
                            <h2 className="font-serif text-2xl text-[#0a192f]">Cuéntanos sobre ti</h2>
                        </div>

                        <form className="space-y-8">
                            {/* Personal Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Nombre completo *</label>
                                    <input type="text" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Correo electrónico *</label>
                                    <input type="email" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Teléfono / WhatsApp</label>
                                    <input type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">País de origen</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors" />
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Trip Details */}
                            <div>
                                <div className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-2">Paso 2</div>
                                <h3 className="font-serif text-xl text-[#0a192f] mb-5">Detalles del Viaje</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Número de viajeros</label>
                                        <input type="number" min={1} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors" placeholder="2" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Fecha tentativa de llegada</label>
                                        <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Duración estimada</label>
                                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors bg-white">
                                            <option>3-4 días</option>
                                            <option>5-6 días</option>
                                            <option>7+ días</option>
                                            <option>No sé aún</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Budget */}
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">Presupuesto estimado por persona</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {budgets.map((b) => (
                                        <label key={b} className="flex items-center gap-3 p-3.5 border border-gray-200 rounded-xl cursor-pointer hover:border-[#0a192f] transition-colors group">
                                            <input type="radio" name="budget" className="accent-[#0a192f]" />
                                            <span className="text-sm text-gray-700 group-hover:text-[#0a192f] transition-colors">{b}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Interests */}
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">¿Qué te interesa? (selecciona varios)</label>
                                <div className="flex flex-wrap gap-2">
                                    {interests.map((i) => (
                                        <label key={i} className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="hidden peer" />
                                            <span className="px-4 py-2 text-sm border border-gray-200 rounded-full text-gray-600 peer-checked:bg-[#0a192f] peer-checked:text-white peer-checked:border-[#0a192f] hover:border-gray-400 transition-all cursor-pointer select-none">
                                                {i}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Notas adicionales o solicitudes especiales</label>
                                <textarea rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors resize-none" placeholder="Cuéntanos cualquier detalle que necesites: alergias, movilidad reducida, celebraciones especiales, preferencias de hotel..." />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#0a192f] hover:bg-[#2e4a3d] text-white text-sm font-semibold uppercase tracking-widest py-4 rounded-full transition-colors"
                            >
                                Solicitar Cotización Personalizada
                            </button>

                            <p className="text-center text-xs text-gray-400">
                                Respondemos en menos de 24 horas con una propuesta personalizada sin compromiso.
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
