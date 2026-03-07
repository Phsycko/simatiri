import { PageHero } from '@/components/ui/PageHero'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'

export default async function PackageDetailPage({ params }: { params: { slug: string } }) {
    const id = parseInt(params.slug)
    if (isNaN(id)) return notFound()

    const pkg = await prisma.package.findUnique({
        where: { id },
        include: { prices: true },
    })

    if (!pkg) return notFound()

    return (
        <>
            <PageHero label={`${pkg.durationDays} Días`} title={pkg.title} subtitle={pkg.description || pkg.trainClass || ''} size="md" />
            <section className="py-20 px-8 max-w-5xl mx-auto">
                <Link href="/packages" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#0a192f] transition-colors mb-10">
                    <ArrowLeft size={14} /> Todos los Paquetes
                </Link>

                <h2 className="font-serif text-2xl text-[#0a192f] mb-6">Tarifas por Ocupación</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    {pkg.prices.filter((p: any) => !p.isUpgrade).map((p: any) => (
                        <div key={p.id} className="bg-[#f8f9fa] rounded-xl p-5 text-center">
                            <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">{p.occupancyType}</div>
                            <div className="font-serif text-3xl text-[#0a192f]">${p.pricePerPerson.toLocaleString()}</div>
                            <div className="text-xs text-gray-400 mt-1">MXN por persona</div>
                        </div>
                    ))}
                </div>

                {pkg.prices.some((p: any) => p.isUpgrade) && (
                    <>
                        <h3 className="font-serif text-xl text-[#0a192f] mb-4">Upgrade CHEPE Express</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {pkg.prices.filter((p: any) => p.isUpgrade).map((p: any) => (
                                <div key={p.id} className="bg-[#e5d3b3]/20 border border-[#c0a062]/30 rounded-xl p-5 text-center">
                                    <div className="text-xs uppercase tracking-wider text-[#c0a062] font-semibold mb-2">{p.occupancyType}</div>
                                    <div className="font-serif text-3xl text-[#0a192f]">${p.pricePerPerson.toLocaleString()}</div>
                                    <div className="text-xs text-gray-400 mt-1">MXN por persona</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </>
    )
}
