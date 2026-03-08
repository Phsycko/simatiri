import { prisma } from '@/lib/db/prisma'
import { PageHero } from '@/components/ui/PageHero'
import Link from 'next/link'
import Image from 'next/image'
import { Train, Calendar } from 'lucide-react'
import { getRelatedPackageIds, getDestinationNameForSlug } from '@/lib/destination-related-packages'

// Map each package id to its image path
const packageImages: Record<number, string> = {
    1: '/images/paquetes/paquete-1-hero.jpg',
    2: '/images/packages/package-2.jpg',
    3: '/images/packages/package-3.jpg',
    4: '/images/packages/package-4.jpg',
    5: '/images/packages/package-5.jpg',
    6: '/images/packages/package-6.jpg',
    7: '/images/packages/package-7.jpg',
    8: '/images/packages/package-8.jpg',
    9: '/images/packages/package-9.jpg',
    10: '/images/packages/package-10.jpg',
    11: '/images/packages/package-11.jpg',
    12: '/images/packages/package-12.jpg',
    13: '/images/packages/package-13.jpg',
    14: '/images/packages/package-14.jpg',
    15: '/images/packages/package-15.jpg',
    16: '/images/packages/package-16.jpg',
    17: '/images/packages/package-17.jpg',
}

const routeMap: Record<number, string> = {
    1: 'El Fuerte → Creel → Chihuahua',
    2: 'Chihuahua → Creel → Divisadero',
    3: 'Chihuahua → Creel → Chihuahua',
    4: 'Chihuahua → Creel → Chihuahua',
    5: 'Chihuahua → Creel → Chihuahua',
    6: 'Chihuahua → Creel → Chihuahua',
    7: 'Chihuahua → Creel → Chihuahua',
    8: 'Chihuahua → Creel → Chihuahua',
    9: 'Los Mochis → Creel → Los Mochis',
    10: 'Los Mochis → Creel → Los Mochis',
    11: 'Los Mochis → Creel → Los Mochis',
    12: 'Los Mochis → Creel → Los Mochis',
    13: 'Los Mochis → Creel → Los Mochis',
    14: 'Chihuahua → Creel → Los Mochis',
    15: 'Chihuahua → Creel → Los Mochis',
    16: 'El Fuerte → Creel → El Fuerte',
    17: 'El Fuerte → Creel → El Fuerte',
}

const hrefMap: Record<number, string> = {
    1: '/packages/paquete-1', 2: '/packages/paquete-2',
    3: '/packages/paquete-3', 4: '/packages/paquete-4',
    5: '/packages/paquete-5', 6: '/packages/paquete-6',
    7: '/packages/paquete-7', 8: '/packages/paquete-8',
    9: '/packages/paquete-9', 10: '/packages/paquete-10',
    11: '/packages/paquete-11', 12: '/packages/paquete-12',
    13: '/packages/paquete-13', 14: '/packages/paquete-14',
    15: '/packages/paquete-15', 16: '/packages/paquete-16',
    17: '/packages/paquete-17',
}

export default async function PackagesPage({
    searchParams,
}: {
    searchParams?: Promise<{ destino?: string }> | { destino?: string }
}) {
    // Safe resolution: Next 15+ passes Promise; support both Promise and plain object
    const params =
        searchParams != null && typeof (searchParams as Promise<unknown>).then === 'function'
            ? await (searchParams as Promise<{ destino?: string }>)
            : (searchParams as { destino?: string }) ?? {}

    const destinoSlug =
        params != null && typeof params.destino === 'string' ? params.destino.trim() : undefined
    const relatedIds = destinoSlug ? getRelatedPackageIds(destinoSlug) : []
    const destinationName = destinoSlug ? getDestinationNameForSlug(destinoSlug) : null

    let packages: Awaited<ReturnType<typeof prisma.package.findMany>>
    try {
        packages = await prisma.package.findMany({
            include: { prices: true },
            orderBy: { id: 'asc' },
        })
    } catch {
        packages = []
    }

    if (!Array.isArray(packages)) packages = []

    const relatedIdsSet =
        relatedIds.length > 0 ? new Set(relatedIds.map((id) => Number(id))) : null
    const displayedPackages =
        relatedIdsSet != null && relatedIdsSet.size > 0
            ? packages.filter((p) => p != null && relatedIdsSet.has(Number(p.id)))
            : packages

    return (
        <>
            <PageHero
                title="Circuitos completos por la Sierra"
                subtitle="Desde 3 hasta 7 días. Todo incluido: tren, hospedaje, tours y traslados. Disponibles en CHEPE Express y Regional."
                size="md"
                backgroundImage="/images/heroes/packages-hero.jpg"
                overlay="linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.05) 100%)"
            />

            <section className="py-20 px-8 max-w-7xl mx-auto">
                {destinationName && (
                    <div className="mb-12 text-center">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7B4B2A] font-semibold mb-2">
                            Relacionados con tu destino
                        </p>
                        <h2 className="font-serif text-2xl md:text-3xl text-[#0a192f]">
                            Paquetes para {destinationName}
                        </h2>
                        {relatedIds.length > 0 ? (
                            <Link
                                href="/packages"
                                className="inline-block mt-4 text-sm text-[#7B4B2A] font-medium hover:underline"
                            >
                                Ver todos los paquetes
                            </Link>
                        ) : (
                            <p className="mt-3 text-gray-500 text-sm max-w-xl mx-auto">
                                Explora todos nuestros circuitos por la Sierra Tarahumara.
                            </p>
                        )}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Array.isArray(displayedPackages) && displayedPackages.length > 0 ? displayedPackages.map((pkg: any, index: number) => {
                        const prices = pkg?.prices ?? []
                        const baseDoublePrice = prices.find((p: any) => p?.occupancyType === 'DOBLE' && !p?.isUpgrade)
                        const upgradeDouble = prices.find((p: any) => p?.occupancyType === 'DOBLE' && p?.isUpgrade)
                        const imageSrc = pkg?.id != null ? packageImages[pkg.id] : undefined
                        const href = pkg?.id != null ? (hrefMap[pkg.id] ?? `/packages/${pkg.id}`) : '/packages'

                        return (
                            <Link
                                key={pkg.id}
                                href={href}
                                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                {/* Image container – uses next/image for automatic WebP + lazy load */}
                                <div className="h-52 relative overflow-hidden bg-gradient-to-br from-[#1a3324] to-[#2e1a10]">
                                    {imageSrc && (
                                        <Image
                                            src={imageSrc}
                                            alt={pkg.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover transition-transform duration-[1.5s] ease-[0.33,1,0.68,1] group-hover:scale-105"
                                            priority={index < 2}
                                        />
                                    )}
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />
                                    {/* Train badge */}
                                    <div className="absolute top-5 left-5 flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5 z-10">
                                        <Train size={13} className="text-[#7B4B2A]" />
                                        <span className="text-white text-xs font-medium">{pkg?.trainClass ?? 'CHEPE'}</span>
                                    </div>
                                    {/* Title over image */}
                                    <div className="absolute bottom-5 left-5 right-5 z-10">
                                        <h2 className="font-serif text-2xl text-white group-hover:text-[#e5d3b3] transition-colors">{pkg?.title ?? 'Paquete'}</h2>
                                        <p className="text-white/60 text-sm mt-1 line-clamp-1">
                                            {pkg?.id != null ? (routeMap[pkg.id] ?? pkg?.description) : pkg?.description ?? ''}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                                        <Calendar size={15} />
                                        <span>{pkg?.durationDays != null ? `${pkg.durationDays} Días / ${Number(pkg.durationDays) - 1} Noches` : '—'}</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 mb-5">
                                        {(prices.filter((p: any) => !p?.isUpgrade) ?? []).map((p: any) => (
                                            <div key={p.id} className="bg-gray-50 rounded-xl p-3 text-center">
                                                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">{p?.occupancyType ?? ''}</div>
                                                <div className="text-sm font-bold text-[#0a192f]">${Number(p?.pricePerPerson ?? 0).toLocaleString()}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {upgradeDouble && (
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Upgrade Express</span>
                                            <span className="text-sm font-semibold text-[#7B4B2A]">${Number(upgradeDouble?.pricePerPerson ?? 0).toLocaleString()} MXN</span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        )
                    }) : (
                        <div className="col-span-full text-center py-16 px-4">
                            <p className="font-serif text-xl text-[#0a192f] mb-2">No hay paquetes para mostrar</p>
                            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">Explora nuestros circuitos o ajusta el destino seleccionado.</p>
                            <Link href="/packages" className="text-sm font-semibold text-[#7B4B2A] hover:underline">Ver todos los paquetes</Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
