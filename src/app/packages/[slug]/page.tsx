import { PageHero } from '@/components/ui/PageHero'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { LOCALE_COOKIE, getLocaleFromCookie, getT } from '@/lib/i18n'

export default async function PackageDetailPage({ params }: { params: { slug: string } }) {
    const id = parseInt(params.slug)
    if (isNaN(id)) return notFound()

    const cookieStore = await cookies()
    const locale = getLocaleFromCookie(cookieStore.get(LOCALE_COOKIE)?.value)
    const t = getT(locale)

    const pkg = await prisma.package.findUnique({
        where: { id },
        include: { prices: true },
    })

    if (!pkg) return notFound()

    const occLabel = (type: string) => {
        if (type === 'DOBLE') return t('packages.doble')
        if (type === 'TRIPLE') return t('packages.triple')
        if (type === 'CUADRUPLE') return t('packages.cuadruple')
        return type
    }

    return (
        <>
            <PageHero label={`${pkg.durationDays} ${t('common.dias')}`} title={t(`packages.paquete${pkg.id}`) !== `packages.paquete${pkg.id}` ? t(`packages.paquete${pkg.id}`) : pkg.title} subtitle={pkg.description || pkg.trainClass || ''} size="md" />
            <section className="py-20 px-8 max-w-5xl mx-auto">
                <Link href="/packages" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#0a192f] transition-colors mb-10">
                    <ArrowLeft size={14} /> {t('packages.todosPaquetes')}
                </Link>

                <h2 className="font-serif text-2xl text-[#0a192f] mb-6">{t('packages.tarifasPorOcupacion')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    {pkg.prices.filter((p: any) => !p.isUpgrade).map((p: any) => (
                        <div key={p.id} className="bg-[#f8f9fa] rounded-xl p-5 text-center">
                            <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">{occLabel(p.occupancyType)}</div>
                            <div className="font-serif text-3xl text-[#0a192f]">${p.pricePerPerson.toLocaleString()}</div>
                            <div className="text-xs text-gray-400 mt-1">{t('packages.mxnPorPersona')}</div>
                        </div>
                    ))}
                </div>

                {pkg.prices.some((p: any) => p.isUpgrade) && (
                    <>
                        <h3 className="font-serif text-xl text-[#0a192f] mb-4">{t('packages.upgradeCHEPEExpress')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {pkg.prices.filter((p: any) => p.isUpgrade).map((p: any) => (
                                <div key={p.id} className="bg-[#e5d3b3]/20 border border-[#c0a062]/30 rounded-xl p-5 text-center">
                                    <div className="text-xs uppercase tracking-wider text-[#c0a062] font-semibold mb-2">{occLabel(p.occupancyType)}</div>
                                    <div className="font-serif text-3xl text-[#0a192f]">${p.pricePerPerson.toLocaleString()}</div>
                                    <div className="text-xs text-gray-400 mt-1">{t('packages.mxnPorPersona')}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </>
    )
}
