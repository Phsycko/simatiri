import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight, Users } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { prisma } from '@/lib/db/prisma'
import { TourTarahumaraCard } from '@/components/experiences/TourTarahumaraCard'
import { TourBarrancasDelCobreCard } from '@/components/experiences/TourBarrancasDelCobreCard'
import { TourBasaseachiCard } from '@/components/experiences/TourBasaseachiCard'
import { TourMenonitasCard } from '@/components/experiences/TourMenonitasCard'
import { TourRecowataCard } from '@/components/experiences/TourRecowataCard'
import { TourGuachochiYKokoyomeCard } from '@/components/experiences/TourGuachochiYKokoyomeCard'
import { TourCerocahuiCard } from '@/components/experiences/TourCerocahuiCard'
import { TourMaguarichiCard } from '@/components/experiences/TourMaguarichiCard'

export const metadata: Metadata = {
    title: 'Experiencias y Tours',
    description: 'Tours y experiencias auténticas en la Sierra Tarahumara: Barrancas del Cobre, Tour Tarahumara, Basaseachi, Menonitas y más.',
}

export default async function ExperiencesPage() {
    const tours = await prisma.tour.findMany({
        include: {
            destination: true,
            tierPrices: { orderBy: { minPax: 'asc' } },
        },
    })

    return (
        <>
            <PageHero
                title="Vive la Sierra Tarahumara"
                subtitle="Tours operados con guías expertos, con acceso a comunidades Rarámuri y paisajes que no encontrarás en ningún otro lugar del mundo."
                size="md"
                backgroundImage="/images/heroes/experiencias-hero.jpg"
                overlay="linear-gradient(rgba(0,0,0,0.38), rgba(0,0,0,0.42))"
            />

            <section className="py-20 px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tours.map((tour: any) => {
                        if (tour.title === 'Tour Tarahumara') {
                            return <TourTarahumaraCard key={tour.id} tour={tour} />
                        }
                        if (tour.title === 'Tour Barrancas del Cobre') {
                            return <TourBarrancasDelCobreCard key={tour.id} tour={tour} />
                        }
                        if (tour.title === 'Tour Basaseachi') {
                            return <TourBasaseachiCard key={tour.id} tour={tour} />
                        }
                        if (tour.title === 'Tour Menonitas') {
                            return <TourMenonitasCard key={tour.id} tour={tour} />
                        }
                        if (tour.title === 'Tour Recowata') {
                            return <TourRecowataCard key={tour.id} tour={tour} />
                        }
                        if (tour.title === 'Tour Guachochi y Kokoyome') {
                            return <TourGuachochiYKokoyomeCard key={tour.id} tour={tour} />
                        }
                        if (tour.title === 'Tour Cerocahui' || tour.title === 'Tour Cerocahui y Mirador del Gallego') {
                            return <TourCerocahuiCard key={tour.id} tour={tour} />
                        }
                        if (tour.title === 'Tour Maguarichi' || tour.title === 'Tour Maguarichi y los Géisers de Chihuahua') {
                            return <TourMaguarichiCard key={tour.id} tour={tour} />
                        }

                        const minPrice = tour.tierPrices[0]?.pricePerPerson
                        const maxPrice = tour.tierPrices[tour.tierPrices.length - 1]?.pricePerPerson
                        return (
                            <Link
                                key={tour.id}
                                href={`/experiences/${tour.id}`}
                                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                <div className="aspect-[4/3] bg-gradient-to-br from-[#2e4a3d] to-[#0a192f] relative">
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24" />
                                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/70 text-xs">
                                        <Clock size={13} />
                                        {tour.durationHours} Horas
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="text-xs text-[#7B4B2A] uppercase tracking-widest font-semibold mb-2">
                                        {tour.destination?.name}
                                    </div>
                                    <h2 className="font-serif text-xl text-[#0a192f] mb-3 group-hover:text-[#2e4a3d] transition-colors">{tour.title}</h2>
                                    <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">{tour.description}</p>

                                    {/* Pricing Tiers */}
                                    <div className="bg-gray-50 rounded-xl p-4 mb-5">
                                        <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">
                                            <Users size={12} /> Precio por persona
                                        </div>
                                        <div className="space-y-1.5">
                                            {tour.tierPrices.slice(0, 3).map((t: any) => (
                                                <div key={t.id} className="flex justify-between text-sm">
                                                    <span className="text-gray-600">{t.minPax}{t.maxPax < 100 ? `–${t.maxPax}` : '+'} pax</span>
                                                    <span className="font-semibold text-[#0a192f]">${t.pricePerPerson.toLocaleString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs font-semibold text-[#7B4B2A]">
                                        Ver experiencia completa <ArrowRight size={13} />
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </section>
        </>
    )
}
