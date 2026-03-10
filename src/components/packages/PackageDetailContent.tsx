'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Train, Hotel, Map, ListStart } from 'lucide-react'
import { useTranslation } from '@/contexts/LocaleContext'
import { ExperienceQuoteModal } from '@/components/experiences/ExperienceQuoteModal'
import type { ExperienceQuoteData } from '@/components/experiences/ExperienceQuoteModal'

export type OccupancyTier = {
  labelKey: 'packages.ocupacionDoble' | 'packages.ocupacionTriple' | 'packages.ocupacionCuadruple'
  priceMxn: number
  priceUsd: number
}

export type PackageDetailContentProps = {
  packageId: number
  durationDays: number
  durationNights: number
  routeText: string
  trainClassKey: 'packages.trainClassExpressPrimera' | 'packages.trainClassRegional'
  trainNoteKey?: 'packages.aplicableUpgrade' | 'packages.opcionalUpgradeExpress'
  accommodationKey: 'packages.categoriaSuperior' | 'packages.categoriaIntermedia'
  startPlace: string
  endPlace: string
  startNote?: boolean
  endNote?: boolean
  priceFrom: number
  occupancyTiers: OccupancyTier[]
  /** Optional second block: upgrade to CHEPE Express prices */
  upgradeTiers?: OccupancyTier[]
  destinations: { name: string }[]
  /** Optional "Experiencia a elegir" choices (display names) */
  experienciaOpcionalChoices?: string[]
  /** If true, first price block uses tarifaBasePersona instead of comisionablesDesc */
  useTarifaBase?: boolean
  backgroundImage: string
}

export function PackageDetailContent({
  packageId,
  durationDays,
  durationNights,
  routeText,
  trainClassKey,
  trainNoteKey,
  accommodationKey,
  startPlace,
  endPlace,
  startNote,
  endNote,
  priceFrom,
  occupancyTiers,
  upgradeTiers,
  destinations,
  experienciaOpcionalChoices,
  useTarifaBase,
  backgroundImage,
}: PackageDetailContentProps) {
  const { t } = useTranslation()
  const [quoteOpen, setQuoteOpen] = useState(false)
  const packageTitle = t(`packages.paquete${packageId}`)
  const diasNoches = `${durationDays} ${t('common.dias')} / ${durationNights} ${t('common.noches')}`

  const packageQuoteData: ExperienceQuoteData = {
    nombreProducto: packageTitle,
    tipoElemento: 'Paquete',
    destino: routeText,
    duracion: diasNoches,
    precioRango: `Desde $${priceFrom.toLocaleString('es-MX')} ${t('common.mxn')}`,
    urlOrigen: typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '',
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <section
        className="relative w-full overflow-hidden text-white pt-40 pb-24"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.6) 100%), url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="uppercase tracking-[0.3em] text-xs font-semibold mb-4 !text-[#FFFFFF]">
                {diasNoches}
              </div>
              <h1 className="font-serif text-5xl md:text-7xl mb-6 font-semibold tracking-tight">
                {packageTitle}
              </h1>
              <p className="text-white text-lg md:text-xl font-semibold max-w-2xl leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.55)' }}>
                <span className="text-white/60 text-sm uppercase tracking-widest block mb-1 font-normal">{t('packages.tramoDelTren')}</span>
                {routeText}
              </p>
            </div>
            <div className="flex flex-col gap-3 min-w-[280px]">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                <div className="text-xs text-white/60 uppercase tracking-widest mb-1">{t('packages.precioDesde')}</div>
                <div className="font-serif text-3xl font-semibold mb-3">${priceFrom.toLocaleString()} {t('common.mxn')}</div>
                <button
                  type="button"
                  onClick={() => setQuoteOpen(true)}
                  className="flex items-center justify-center gap-2 w-full bg-[#7B4B2A] hover:bg-[#8B5A36] active:bg-[#6A3F23] text-white text-sm font-semibold uppercase tracking-widest py-3.5 rounded-full transition-all duration-[250ms] border-none shadow-none"
                >
                  {t('packages.cotizarEstePaquete')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-20">
          <section>
            <h2 className="font-serif text-3xl text-[#0a192f] mb-8">{t('packages.resumenViaje')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <Clock className="text-[#7B4B2A] mb-4" size={24} strokeWidth={1.5} />
                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">{t('packages.duracion')}</div>
                <div className="font-semibold text-[#0a192f]">{diasNoches}</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <Train className="text-[#7B4B2A] mb-4" size={24} strokeWidth={1.5} />
                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">{t('packages.tren')}</div>
                <div className="font-semibold text-[#0a192f] leading-tight">
                  {t(trainClassKey)}
                  {trainNoteKey && <span className="block text-[10px] text-gray-400 font-normal mt-1">{t(trainNoteKey)}</span>}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <Hotel className="text-[#7B4B2A] mb-4" size={24} strokeWidth={1.5} />
                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">{t('packages.hospedaje')}</div>
                <div className="font-semibold text-[#0a192f]">{t(accommodationKey)}</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <MapPin className="text-[#7B4B2A] mb-4" size={24} strokeWidth={1.5} />
                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">{t('packages.inicio')}</div>
                <div className="font-semibold text-[#0a192f]">
                  {startPlace}
                  {startNote && <span className="block text-[10px] text-gray-400 font-normal mt-1">{t('packages.puedeSerAeropuerto')}</span>}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <MapPin className="text-[#7B4B2A] mb-4" size={24} strokeWidth={1.5} />
                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">{t('packages.finalizacion')}</div>
                <div className="font-semibold text-[#0a192f] leading-tight">
                  {endPlace}
                  {endNote && <span className="block text-[10px] text-gray-400 font-normal mt-1">{t('packages.puedeSerAeropuerto')}</span>}
                </div>
              </div>
              <div className="bg-[#0a192f] rounded-2xl p-6 shadow-sm flex flex-col justify-center">
                <div className="text-xs text-white/50 uppercase tracking-widest font-semibold mb-2">{t('packages.rutaPrincipal')}</div>
                <div className="font-semibold text-white leading-relaxed">{routeText.replace(/ → /g, ' — ')}</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-[#0a192f] mb-8">{t('packages.destinosIncluidos')}</h2>
            <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7B4B2A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <ul className="relative z-10 space-y-6">
                {destinations.map((dest, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#7B4B2A]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={14} className="text-[#7B4B2A]" />
                    </div>
                    <div>
                      <div className="font-serif text-xl text-[#0a192f]">{dest.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{t('packages.recorridoPerimetral')}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {experienciaOpcionalChoices && experienciaOpcionalChoices.length > 0 && (
            <section>
              <h2 className="font-serif text-3xl text-[#0a192f] mb-8">{t('packages.experienciaOpcionalTitle')}</h2>
              <div className="bg-[#f8f9fa] border border-[#7B4B2A]/20 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
                <div className="mb-6 py-2 px-4 bg-[#7B4B2A]/10 text-[#7B4B2A] rounded-full inline-block text-xs font-bold tracking-widest uppercase">
                  {t('packages.eligeUnaOpcion')}
                </div>
                <ul className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {experienciaOpcionalChoices.map((exp, i) => (
                    <li key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm transition-hover hover:border-[#7B4B2A]/30 hover:shadow-md cursor-default">
                      <div className="w-6 h-6 rounded-full bg-[#7B4B2A] flex items-center justify-center shrink-0 text-white shadow-sm">
                        <ListStart size={12} strokeWidth={3} />
                      </div>
                      <div className="font-medium text-[#0a192f] text-sm">{exp}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          <section>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <h2 className="font-serif text-3xl text-[#0a192f] mb-2">{t('packages.tarifasComisionables')}</h2>
                <p className="text-gray-500 text-sm">{useTarifaBase ? t('packages.tarifaBasePersona') : t('packages.comisionablesDesc')}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {occupancyTiers.map((tier, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#7B4B2A] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">{t(tier.labelKey)}</div>
                  <div className="font-serif text-4xl text-[#0a192f] mb-2">${tier.priceMxn.toLocaleString()} <span className="text-xl text-gray-400 font-sans">{t('common.mxn')}</span></div>
                  <div className="text-lg font-medium text-[#7B4B2A]">${tier.priceUsd.toLocaleString()} <span className="text-sm">USD</span></div>
                </div>
              ))}
            </div>
            {upgradeTiers && upgradeTiers.length > 0 && (
              <>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pt-12 border-t border-gray-100">
                  <div>
                    <h2 className="font-serif text-3xl text-[#0a192f] mb-2">{t('packages.precioUpgradeCHEPE')}</h2>
                    <p className="text-gray-500 text-sm">{t('packages.mejoraExperienciaDesc')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {upgradeTiers.map((tier, i) => (
                    <div key={i} className="bg-[#0a192f] border border-[#1a2942] rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-1 bg-[#7B4B2A] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      <div className="text-xs uppercase tracking-widest text-white/50 font-semibold mb-6">{t(tier.labelKey)}</div>
                      <div className="font-serif text-4xl text-white mb-2">${tier.priceMxn.toLocaleString()} <span className="text-xl text-white/50 font-sans">{t('common.mxn')}</span></div>
                      <div className="text-lg font-medium text-[#e5d3b3]">${tier.priceUsd.toLocaleString()} <span className="text-sm text-white/50">USD</span></div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>

          <section className="pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                type="button"
                onClick={() => setQuoteOpen(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#7B4B2A] hover:bg-[#8B5A36] active:bg-[#6A3F23] text-white text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-[250ms] border-none shadow-none"
              >
                {t('packages.cotizarEstePaquete')} <ArrowRight size={16} />
              </button>
              <Link
                href="/contact"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#0a192f] text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-colors shadow-none"
              >
                {t('packages.solicitarItinerario')}
              </Link>
              <Link
                href="/packages"
                className="flex-1 sm:flex-none inline-flex items-center justify-center text-sm font-semibold text-gray-500 hover:text-[#7B4B2A] transition-colors mt-4 sm:mt-0 sm:ml-4"
              >
                {t('packages.verMasPaquetes')}
              </Link>
            </div>
          </section>
        </div>

        <div className="hidden lg:block lg:col-span-4 transition-all">
          <div className="sticky top-32 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-black/5 p-8">
            <div className="mb-8">
              <div className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-2">{t('packages.resumen')}</div>
              <h3 className="font-serif text-2xl text-[#0a192f]">{packageTitle}</h3>
            </div>
            <ul className="space-y-5 mb-10">
              <li className="flex items-start gap-3 border-b border-gray-50 pb-4">
                <Clock size={18} className="text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 mb-1">{t('packages.duracion')}</div>
                  <div className="text-sm font-medium text-[#0a192f]">{diasNoches}</div>
                </div>
              </li>
              <li className="flex items-start gap-3 border-b border-gray-50 pb-4">
                <Train size={18} className="text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 mb-1">{t('packages.tren')}</div>
                  <div className="text-sm font-medium text-[#0a192f] uppercase">{t(trainClassKey)}</div>
                </div>
              </li>
              <li className="flex items-start gap-3 border-b border-gray-50 pb-4">
                <Hotel size={18} className="text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 mb-1">{t('packages.hospedaje')}</div>
                  <div className="text-sm font-medium text-[#0a192f]">{t(accommodationKey)}</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Map size={18} className="text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 mb-1">{t('packages.ruta')}</div>
                  <div className="text-sm font-medium text-[#0a192f]">{routeText.replace(/ → /g, ' — ')}</div>
                </div>
              </li>
            </ul>
            <div className="bg-[#f8f9fa] rounded-2xl p-6 mb-6">
              <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">{t('packages.precioDesde')}</div>
              <div className="font-serif text-3xl text-[#0a192f]">${priceFrom.toLocaleString()} <span className="text-base text-gray-500 font-sans">{t('common.mxn')}</span></div>
            </div>
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="flex items-center justify-center w-full gap-2 bg-[#7B4B2A] hover:bg-[#8B5A36] active:bg-[#6A3F23] text-white text-sm font-semibold uppercase tracking-widest py-4 rounded-full transition-all duration-[250ms] border-none shadow-none"
            >
              {t('packages.cotizarViaje')} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <ExperienceQuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} experience={packageQuoteData} />
    </div>
  )
}
