import { prisma } from '@/lib/db/prisma'
import { PageHero } from '@/components/ui/PageHero'
import Link from 'next/link'
import Image from 'next/image'
import { Train, Calendar } from 'lucide-react'
import { getRelatedPackageIds, getDestinationNameForSlug, normalizeSlug } from '@/lib/destination-related-packages'
import type { Metadata } from 'next'
import { buildShareMeta } from '@/lib/metadata'

// Ensure this page is always server-rendered per request
export const dynamic = 'force-dynamic'

const title = 'Paquetes Tren CHEPE | Simatiri Experience'
const description = 'Paquetes todo incluido por la Sierra Tarahumara: Tren CHEPE Express y Regional, hoteles, tours y traslados. Rutas Chihuahua, Creel, Divisadero, Los Mochis.'

export const metadata: Metadata = {
  title,
  description,
  ...buildShareMeta({ title, description, pathname: '/packages' }),
}

// Static fallback when DB returns no packages (e.g. production without seed)
const STATIC_PACKAGE_ROUTES: Record<number, string> = {
    1: 'El Fuerte → Creel → Chihuahua', 2: 'Chihuahua → Creel → Divisadero',
    3: 'Chihuahua → Creel → Chihuahua', 4: 'Chihuahua → Creel → Chihuahua',
    5: 'Chihuahua → Creel → Chihuahua', 6: 'Chihuahua → Creel → Chihuahua',
    7: 'Chihuahua → Creel → Chihuahua', 8: 'Chihuahua → Creel → Chihuahua',
    9: 'Los Mochis → Creel → Los Mochis', 10: 'Los Mochis → Creel → Los Mochis',
    11: 'Los Mochis → Creel → Los Mochis', 12: 'Los Mochis → Creel → Los Mochis',
    13: 'Los Mochis → Creel → Los Mochis', 14: 'Chihuahua → Creel → Los Mochis',
    15: 'Chihuahua → Creel → Los Mochis', 16: 'El Fuerte → Creel → El Fuerte',
    17: 'El Fuerte → Creel → El Fuerte',
}

type StaticPrice = { id: number; occupancyType: string; pricePerPerson: number; isUpgrade?: boolean }

/** Precios de referencia por paquete para fallback cuando no hay DB (producción sin seed). */
const STATIC_PACKAGE_PRICES: Record<number, StaticPrice[]> = {
    1: [
        { id: 101, occupancyType: 'DOBLE', pricePerPerson: 27700 },
        { id: 102, occupancyType: 'TRIPLE', pricePerPerson: 25400 },
        { id: 103, occupancyType: 'CUADRUPLE', pricePerPerson: 24000 },
    ],
    2: [
        { id: 201, occupancyType: 'DOBLE', pricePerPerson: 10400 },
        { id: 202, occupancyType: 'TRIPLE', pricePerPerson: 9470 },
        { id: 203, occupancyType: 'CUADRUPLE', pricePerPerson: 9100 },
        { id: 204, occupancyType: 'DOBLE', pricePerPerson: 11400, isUpgrade: true },
    ],
    3: [
        { id: 301, occupancyType: 'DOBLE', pricePerPerson: 9500 },
        { id: 302, occupancyType: 'TRIPLE', pricePerPerson: 8700 },
        { id: 303, occupancyType: 'CUADRUPLE', pricePerPerson: 8200 },
    ],
    4: [
        { id: 401, occupancyType: 'DOBLE', pricePerPerson: 12400 },
        { id: 402, occupancyType: 'TRIPLE', pricePerPerson: 11200 },
        { id: 403, occupancyType: 'CUADRUPLE', pricePerPerson: 10600 },
    ],
    5: [
        { id: 501, occupancyType: 'DOBLE', pricePerPerson: 8200 },
        { id: 502, occupancyType: 'TRIPLE', pricePerPerson: 7500 },
        { id: 503, occupancyType: 'CUADRUPLE', pricePerPerson: 7100 },
    ],
    6: [
        { id: 601, occupancyType: 'DOBLE', pricePerPerson: 10800 },
        { id: 602, occupancyType: 'TRIPLE', pricePerPerson: 9900 },
        { id: 603, occupancyType: 'CUADRUPLE', pricePerPerson: 9400 },
    ],
    7: [
        { id: 701, occupancyType: 'DOBLE', pricePerPerson: 6900 },
        { id: 702, occupancyType: 'TRIPLE', pricePerPerson: 6300 },
        { id: 703, occupancyType: 'CUADRUPLE', pricePerPerson: 6000 },
    ],
    8: [
        { id: 801, occupancyType: 'DOBLE', pricePerPerson: 9200 },
        { id: 802, occupancyType: 'TRIPLE', pricePerPerson: 8400 },
        { id: 803, occupancyType: 'CUADRUPLE', pricePerPerson: 8000 },
    ],
    9: [
        { id: 901, occupancyType: 'DOBLE', pricePerPerson: 11500 },
        { id: 902, occupancyType: 'TRIPLE', pricePerPerson: 10500 },
        { id: 903, occupancyType: 'CUADRUPLE', pricePerPerson: 9900 },
    ],
    10: [
        { id: 1001, occupancyType: 'DOBLE', pricePerPerson: 8900 },
        { id: 1002, occupancyType: 'TRIPLE', pricePerPerson: 8100 },
        { id: 1003, occupancyType: 'CUADRUPLE', pricePerPerson: 7700 },
    ],
    11: [
        { id: 1101, occupancyType: 'DOBLE', pricePerPerson: 10200 },
        { id: 1102, occupancyType: 'TRIPLE', pricePerPerson: 9300 },
        { id: 1103, occupancyType: 'CUADRUPLE', pricePerPerson: 8800 },
    ],
    12: [
        { id: 1201, occupancyType: 'DOBLE', pricePerPerson: 9800 },
        { id: 1202, occupancyType: 'TRIPLE', pricePerPerson: 9000 },
        { id: 1203, occupancyType: 'CUADRUPLE', pricePerPerson: 8500 },
    ],
    13: [
        { id: 1301, occupancyType: 'DOBLE', pricePerPerson: 13200 },
        { id: 1302, occupancyType: 'TRIPLE', pricePerPerson: 12100 },
        { id: 1303, occupancyType: 'CUADRUPLE', pricePerPerson: 11500 },
    ],
    14: [
        { id: 1401, occupancyType: 'DOBLE', pricePerPerson: 15800 },
        { id: 1402, occupancyType: 'TRIPLE', pricePerPerson: 14500 },
        { id: 1403, occupancyType: 'CUADRUPLE', pricePerPerson: 13800 },
    ],
    15: [
        { id: 1501, occupancyType: 'DOBLE', pricePerPerson: 12800 },
        { id: 1502, occupancyType: 'TRIPLE', pricePerPerson: 11700 },
        { id: 1503, occupancyType: 'CUADRUPLE', pricePerPerson: 11100 },
    ],
    16: [
        { id: 1601, occupancyType: 'DOBLE', pricePerPerson: 11200 },
        { id: 1602, occupancyType: 'TRIPLE', pricePerPerson: 10200 },
        { id: 1603, occupancyType: 'CUADRUPLE', pricePerPerson: 9700 },
    ],
    17: [
        { id: 1701, occupancyType: 'DOBLE', pricePerPerson: 9800 },
        { id: 1702, occupancyType: 'TRIPLE', pricePerPerson: 9000 },
        { id: 1703, occupancyType: 'CUADRUPLE', pricePerPerson: 8500 },
    ],
}

const STATIC_PACKAGES: Array<{ id: number; title: string; durationDays: number; trainClass: string; description: string; prices: StaticPrice[] }> = [
    { id: 1, title: 'Paquete 1', durationDays: 7, trainClass: 'CHEPE Express', description: STATIC_PACKAGE_ROUTES[1], prices: STATIC_PACKAGE_PRICES[1] ?? [] },
    { id: 2, title: 'Paquete 2', durationDays: 6, trainClass: 'CHEPE Regional', description: STATIC_PACKAGE_ROUTES[2], prices: STATIC_PACKAGE_PRICES[2] ?? [] },
    { id: 3, title: 'Paquete 3', durationDays: 5, trainClass: 'CHEPE Regional', description: STATIC_PACKAGE_ROUTES[3], prices: STATIC_PACKAGE_PRICES[3] ?? [] },
    { id: 4, title: 'Paquete 4', durationDays: 5, trainClass: 'CHEPE Express', description: STATIC_PACKAGE_ROUTES[4], prices: STATIC_PACKAGE_PRICES[4] ?? [] },
    { id: 5, title: 'Paquete 5', durationDays: 4, trainClass: 'CHEPE Regional', description: STATIC_PACKAGE_ROUTES[5], prices: STATIC_PACKAGE_PRICES[5] ?? [] },
    { id: 6, title: 'Paquete 6', durationDays: 4, trainClass: 'CHEPE Express', description: STATIC_PACKAGE_ROUTES[6], prices: STATIC_PACKAGE_PRICES[6] ?? [] },
    { id: 7, title: 'Paquete 7', durationDays: 3, trainClass: 'CHEPE Regional', description: STATIC_PACKAGE_ROUTES[7], prices: STATIC_PACKAGE_PRICES[7] ?? [] },
    { id: 8, title: 'Paquete 8', durationDays: 3, trainClass: 'CHEPE Express', description: STATIC_PACKAGE_ROUTES[8], prices: STATIC_PACKAGE_PRICES[8] ?? [] },
    { id: 9, title: 'Paquete 9', durationDays: 5, trainClass: 'CHEPE Express', description: STATIC_PACKAGE_ROUTES[9], prices: STATIC_PACKAGE_PRICES[9] ?? [] },
    { id: 10, title: 'Paquete 10', durationDays: 4, trainClass: 'CHEPE Regional', description: STATIC_PACKAGE_ROUTES[10], prices: STATIC_PACKAGE_PRICES[10] ?? [] },
    { id: 11, title: 'Paquete 11', durationDays: 4, trainClass: 'CHEPE Express', description: STATIC_PACKAGE_ROUTES[11], prices: STATIC_PACKAGE_PRICES[11] ?? [] },
    { id: 12, title: 'Paquete 12', durationDays: 5, trainClass: 'CHEPE Regional', description: STATIC_PACKAGE_ROUTES[12], prices: STATIC_PACKAGE_PRICES[12] ?? [] },
    { id: 13, title: 'Paquete 13', durationDays: 7, trainClass: 'CHEPE Regional', description: STATIC_PACKAGE_ROUTES[13], prices: STATIC_PACKAGE_PRICES[13] ?? [] },
    { id: 14, title: 'Paquete 14', durationDays: 5, trainClass: 'CHEPE Express', description: STATIC_PACKAGE_ROUTES[14], prices: STATIC_PACKAGE_PRICES[14] ?? [] },
    { id: 15, title: 'Paquete 15', durationDays: 4, trainClass: 'CHEPE Express', description: STATIC_PACKAGE_ROUTES[15], prices: STATIC_PACKAGE_PRICES[15] ?? [] },
    { id: 16, title: 'Paquete 16', durationDays: 4, trainClass: 'CHEPE Express', description: STATIC_PACKAGE_ROUTES[16], prices: STATIC_PACKAGE_PRICES[16] ?? [] },
    { id: 17, title: 'Paquete 17', durationDays: 4, trainClass: 'CHEPE Regional', description: STATIC_PACKAGE_ROUTES[17], prices: STATIC_PACKAGE_PRICES[17] ?? [] },
]

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
    searchParams?: Promise<{ destino?: string; debug?: string }> | { destino?: string; debug?: string }
}) {
    const params =
        searchParams != null && typeof (searchParams as Promise<unknown>).then === 'function'
            ? await (searchParams as Promise<{ destino?: string; debug?: string }>)
            : (searchParams as { destino?: string; debug?: string }) ?? {}

    const rawDestino = params != null && typeof params.destino === 'string' ? params.destino : undefined
    const destinoSlug = rawDestino ? normalizeSlug(rawDestino) : undefined
    const relatedIds = destinoSlug ? getRelatedPackageIds(destinoSlug) : []
    const destinationName = destinoSlug ? getDestinationNameForSlug(destinoSlug) : null
    const debug = params?.debug === '1' || params?.debug === 'true'

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
        relatedIds.length > 0 ? new Set<number>(relatedIds.map((id) => Number(id))) : null

    let displayedPackages: typeof packages =
        relatedIdsSet != null && relatedIdsSet.size > 0
            ? packages.filter((p) => p != null && relatedIdsSet!.has(Number(p.id)))
            : packages

    let dataSource: 'db' | 'static' = 'db'

    // Filtro activo pero DB vacía: usar lista estática filtrada
    if (packages.length === 0 && destinoSlug && relatedIds.length > 0) {
        const staticFiltered = STATIC_PACKAGES.filter((p) => relatedIdsSet!.has(p.id))
        if (staticFiltered.length > 0) {
            displayedPackages = staticFiltered as unknown as typeof packages
            dataSource = 'static'
        }
    }

    // Sin filtro (entrada directa desde navbar) y DB vacía: mostrar todos los paquetes estáticos
    if (packages.length === 0 && !destinoSlug) {
        displayedPackages = STATIC_PACKAGES as unknown as typeof packages
        dataSource = 'static'
    }

    // Filtro activo, DB con datos, pero ningún paquete coincide: mostrar todos (fallback amigable)
    if (
        dataSource === 'db' &&
        destinoSlug &&
        relatedIds.length > 0 &&
        packages.length > 0 &&
        displayedPackages.length === 0
    ) {
        displayedPackages = packages
    }

    return (
        <>
            <PageHero
                title="Circuitos completos por la Sierra"
                subtitle="Desde 3 hasta 7 días. Todo incluido: tren, hospedaje, tours y traslados. Disponibles en CHEPE Express y Regional."
                size="md"
                backgroundImage="/images/heroes/packages-hero.jpg"
                overlay="linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.05) 100%)"
            />

            <section className="w-full bg-[#FFF8F5]">
                <div className="py-20 px-8 max-w-7xl mx-auto">
                {debug && (
                    <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-left font-mono text-xs text-amber-900">
                        <div className="font-semibold mb-2">[Debug] Paquetes por destino</div>
                        <ul className="space-y-1">
                            <li><strong>destino (raw):</strong> {rawDestino ?? '—'}</li>
                            <li><strong>destino (normalized):</strong> {destinoSlug ?? '—'}</li>
                            <li><strong>relatedIds:</strong> [{relatedIds.join(', ')}]</li>
                            <li><strong>packages from DB:</strong> {packages.length}</li>
                            <li><strong>displayed (count):</strong> {displayedPackages.length}</li>
                            <li><strong>data source:</strong> {dataSource}</li>
                        </ul>
                    </div>
                )}
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
                                className="group bg-white border border-[#DDD8D2] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(28,24,18,0.06),0_12px_32px_rgba(28,24,18,0.12)] hover:shadow-[0_8px_24px_rgba(28,24,18,0.08),0_24px_56px_rgba(28,24,18,0.14)] hover:border-[#D0CBC4] transition-all duration-300"
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
            </div>
            </section>
        </>
    )
}
