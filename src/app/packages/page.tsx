import { prisma } from '@/lib/db/prisma'
import { PageHero } from '@/components/ui/PageHero'
import Link from 'next/link'
import { Train, Calendar } from 'lucide-react'

export default async function PackagesPage() {
    const packages = await prisma.package.findMany({
        include: { prices: true },
        orderBy: { id: 'asc' },
    })

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {packages.map((pkg: any) => {
                        const baseDoublePrice = pkg.prices.find((p: any) => p.occupancyType === 'DOBLE' && !p.isUpgrade)
                        const upgradeDouble = pkg.prices.find((p: any) => p.occupancyType === 'DOBLE' && p.isUpgrade)

                        return (
                            <Link
                                key={pkg.id}
                                href={(() => {
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
                                    return hrefMap[pkg.id] ?? `/packages/${pkg.id}`
                                })()}
                                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                <div
                                    className={(() => {
                                        const hasImage = [1, 2, 3, 4, 5, 6, 7].includes(pkg.id)
                                        return hasImage
                                            ? "h-52 relative overflow-hidden"
                                            : "h-52 bg-gradient-to-br from-[#0a192f] to-[#2e4a3d] relative overflow-hidden"
                                    })()}
                                    style={(() => {
                                        const imageMap: Record<number, string> = {
                                            1: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/paquetes/paquete-1-hero.jpg')`,
                                            2: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/packages/package-2.jpg')`,
                                            3: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/packages/package-3.jpg')`,
                                            4: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/packages/package-4.jpg')`,
                                            5: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/packages/package-5.jpg')`,
                                            6: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/packages/package-6.jpg')`,
                                            7: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/packages/package-7.jpg')`,
                                            8: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/packages/package-8.jpg')`,
                                            9: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/packages/package-9.jpg')`,
                                            10: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/packages/package-10.jpg')`,
                                            11: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/packages/package-11.jpg')`,
                                            12: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/packages/package-12.jpg')`,
                                            13: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/packages/package-13.jpg')`,
                                            14: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/packages/package-14.jpg')`,
                                            15: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/packages/package-15.jpg')`,
                                            16: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/packages/package-16.jpg')`,
                                            17: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url('/images/packages/package-17.jpg')`,
                                        }
                                        const bg = imageMap[pkg.id]
                                        return bg ? { backgroundImage: bg, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' } : {}
                                    })()}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute top-5 left-5 flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5">
                                        <Train size={13} className="text-[#7B4B2A]" />
                                        <span className="text-white text-xs font-medium">{pkg.trainClass}</span>
                                    </div>
                                    <div className="absolute bottom-5 left-5 right-5">
                                        <h2 className="font-serif text-2xl text-white group-hover:text-[#e5d3b3] transition-colors">{pkg.title}</h2>
                                        <p className="text-white/60 text-sm mt-1 line-clamp-1">
                                            {(() => {
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
                                                return routeMap[pkg.id] ?? pkg.description
                                            })()}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                                        <Calendar size={15} />
                                        <span>{pkg.durationDays} Días / {pkg.durationDays - 1} Noches</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 mb-5">
                                        {pkg.prices.filter((p: any) => !p.isUpgrade).map((p: any) => (
                                            <div key={p.id} className="bg-gray-50 rounded-xl p-3 text-center">
                                                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">{p.occupancyType}</div>
                                                <div className="text-sm font-bold text-[#0a192f]">${p.pricePerPerson.toLocaleString()}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {upgradeDouble && (
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Upgrade Express</span>
                                            <span className="text-sm font-semibold text-[#7B4B2A]">${upgradeDouble.pricePerPerson.toLocaleString()} MXN</span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </section>
        </>
    )
}
