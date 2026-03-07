import { PageHero } from '@/components/ui/PageHero'
import Link from 'next/link'
import { ArrowLeft, Clock, Users } from 'lucide-react'
import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'

export default async function ExperienceDetailPage({ params }: { params: { slug: string } }) {
    const tour = await prisma.tour.findUnique({
        where: { id: parseInt(params.slug) },
        include: { destination: true, tierPrices: { orderBy: { minPax: 'asc' } } },
    })

    if (!tour) return notFound()

    return (
        <>
            <PageHero label={tour.destination?.name || 'Tour'} title={tour.title} subtitle={tour.description || ''} size="md" />
            <section className="py-20 px-8 max-w-5xl mx-auto">
                <Link href="/experiences" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#0a192f] transition-colors mb-10">
                    <ArrowLeft size={14} /> Todas las Experiencias
                </Link>

                <div className="flex items-center gap-6 mb-10 text-sm text-gray-500">
                    <div className="flex items-center gap-2"><Clock size={15} /> {tour.durationHours} horas de experiencia</div>
                    <div className="flex items-center gap-2"><Users size={15} /> Precio escalonado por grupo</div>
                </div>

                <h2 className="font-serif text-2xl text-[#0a192f] mb-6">Tarifas por Número de Pasajeros</h2>
                <div className="bg-[#f8f9fa] rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-[#0a192f] text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-medium text-xs uppercase tracking-wider">Número de Pasajeros</th>
                                <th className="px-6 py-4 text-right font-medium text-xs uppercase tracking-wider">Precio por Persona</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {tour.tierPrices.map((t: any) => (
                                <tr key={t.id}>
                                    <td className="px-6 py-4 text-gray-700">
                                        {t.minPax}{t.maxPax < 100 ? ` – ${t.maxPax}` : '+'} personas
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-[#0a192f]">${t.pricePerPerson.toLocaleString()} MXN</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}
