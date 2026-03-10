import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { ShieldCheck, Users, Star, ArrowRight, MapPin, Calendar, Building2, Coffee, Flame, UsersRound, Gift } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { buildShareMeta } from '@/lib/metadata'
import { LOCALE_COOKIE, getLocaleFromCookie, getT } from '@/lib/i18n'

const title = 'Nosotros | Simatiri Experience'
const description = 'Simatiri Experience: operadora turística certificada en Creel, Chihuahua. RNT 0108009be33c3. Especialistas en el Tren CHEPE y la Sierra Tarahumara.'

export const metadata: Metadata = {
  title,
  description,
  ...buildShareMeta({ title, description, pathname: '/about' }),
}

export default async function AboutPage() {
  const cookieStore = await cookies()
  const locale = getLocaleFromCookie(cookieStore.get(LOCALE_COOKIE)?.value)
  const t = getT(locale)

  const convenio = [
    t('about.convenioTarifas'),
    t('about.convenioEarlyCheckin'),
    t('about.convenioLateCheckout'),
    t('about.convenioDesayuno'),
    t('about.convenioFacturacion'),
  ]

  const hotelSimatiriItems = [
    { icon: Building2, textKey: 'about.hotelTarifaNoche' as const },
    { icon: Coffee, textKey: 'about.hotelDesayuno' as const },
    { icon: Flame, textKey: 'about.hotelFogatas' as const },
    { icon: UsersRound, textKey: 'about.hotelMenores' as const },
    { icon: Gift, textKey: 'about.hotelHabitacionCortesia' as const },
  ]

  return (
        <>
            <PageHero
                title={t('about.heroTitle')}
                subtitle={t('about.heroSubtitle')}
                size="md"
                backgroundImage="/images/heroes/nosotros-hero.jpg"
                overlay="linear-gradient(rgba(0,0,0,0.38), rgba(0,0,0,0.42))"
            />

            <section className="py-24 px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-4">{t('about.nuestraHistoria')}</div>
                        <h2 className="font-serif text-4xl text-[#0a192f] mb-6">{t('about.simatiriExperience')}</h2>
                        <div className="space-y-5 text-gray-600 leading-relaxed">
                            <p>{t('about.historiaP1')}</p>
                            <p>{t('about.historiaP2')}</p>
                            <p>{t('about.historiaP3')}</p>
                            <p>{t('about.historiaP4')}</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-[#f8f9fa] rounded-2xl p-8">
                            <div className="flex items-start gap-5 mb-6">
                                <ShieldCheck size={36} className="text-[#7B4B2A] shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-serif text-2xl text-[#0a192f] mb-1">{t('about.rntTitle')}</h3>
                                    <p className="text-gray-500 text-sm">{t('about.rntSub')}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-gray-100">
                                <div className="font-mono text-lg font-bold text-[#0a192f] mb-2">RNT: 0108009be33c3</div>
                                <div className="text-sm text-gray-500 space-y-1">
                                    <div className="flex items-center gap-2"><MapPin size={13} /> {t('about.rntDireccion')}</div>
                                    <div>{t('about.rntCp')}</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                            {[
                                { n: '10+', l: t('about.statDestinos') },
                                { n: '8', l: t('about.statTours') },
                                { n: '5', l: t('about.statHoteles') },
                            ].map(({ n, l }) => (
                                <div key={l} className="bg-[#8B5A2B] text-white rounded-xl p-5">
                                    <div className="font-serif text-3xl text-white font-bold">{n}</div>
                                    <div className="text-xs text-white font-bold mt-1">{l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-4">{t('about.nuestraCasa')}</div>
                    <h2 className="font-serif text-4xl text-[#0a192f] mb-6">{t('about.hotelSimatiri')}</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-3xl">
                        {t('about.hotelSimatiriIntro')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        {hotelSimatiriItems.map(({ icon: Icon, textKey }) => (
                            <div key={textKey} className="flex items-start gap-4 bg-[#f8f9fa] rounded-xl p-5 border border-gray-100">
                                <div className="w-10 h-10 bg-[#e5d3b3]/40 rounded-full flex items-center justify-center shrink-0">
                                    <Icon size={18} className="text-[#7B4B2A]" />
                                </div>
                                <span className="text-sm text-gray-700 leading-snug pt-1.5">{t(textKey)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#1a1512] rounded-2xl p-8 md:p-10 text-white">
                        <p className="font-serif text-xl text-white mb-2">{t('about.tarifasBajoPeticion')}</p>
                        <p className="text-white/70 text-sm mb-8 max-w-2xl">
                            {t('about.contactarTarifario')}
                        </p>
                        <Link
                            href="/contact?tema=tarifario-hotel"
                            className="inline-flex items-center gap-2 bg-[#7B4B2A] hover:bg-[#6B4028] text-white text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-all"
                        >
                            {t('common.solicitarTarifario')} <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-[#f8f9fa] border-y border-gray-100 px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-4">{t('about.convenioParaAgencias')}</div>
                    <h2 className="font-serif text-4xl text-[#0a192f] mb-6">{t('about.convenioCorporativoActivo')}</h2>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-12">
                        <Calendar size={14} /> {t('about.vigencia')}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 text-left">
                        {convenio.map((b) => (
                            <div key={b} className="bg-white rounded-xl p-5 flex items-center gap-4 border border-gray-100 shadow-sm">
                                <div className="w-8 h-8 bg-[#e5d3b3]/40 rounded-full flex items-center justify-center shrink-0">
                                    <Star size={14} className="text-[#7B4B2A]" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">{b}</span>
                            </div>
                        ))}
                    </div>

                    <Link href="/contact" className="inline-flex items-center gap-2 bg-[#8B5A2B] hover:bg-[#704822] text-white text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all">
                        {t('about.solicitarMembresiaAgencia')} <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </>
    )
}
