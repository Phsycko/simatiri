'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Loader2 } from 'lucide-react'
import type { ExperienceQuotePayload } from '@/app/api/tailor-made/route'
import { useTranslation } from '@/contexts/LocaleContext'

export type ExperienceQuoteData = {
  nombreProducto: string
  tipoElemento: string
  destino: string
  duracion: string
  precioRango: string
  urlOrigen?: string
}

/** Construye los datos de cotización a partir del tour (desde card/modal). */
export function buildExperienceQuoteData(tour: any): ExperienceQuoteData {
  const title = (tour?.title ?? '').toString().trim() || 'Experiencia'
  const isExperience = /hiking|buceo|experiencia/i.test(title)
  const tipoElemento = isExperience ? 'Experiencia' : 'Tour'
  const destino = (tour?.destination?.name ?? '').toString().trim() || '—'
  let duracion = '—'
  if (tour?.durationHours != null) duracion = `${tour.durationHours} horas`
  let precioRango = '—'
  const tiers = tour?.tierPrices
  if (tiers?.length) {
    const min = tiers[0]?.pricePerPerson
    const max = tiers.length > 1 ? tiers[tiers.length - 1]?.pricePerPerson : null
    if (min != null) {
      const add = (n: number) => (n + 200).toLocaleString('es-MX')
      precioRango = max != null && max !== min
        ? `Desde $${add(min)} hasta $${add(max)} MXN por persona`
        : `Desde $${add(min)} MXN por persona`
    }
  }
  const urlOrigen = typeof window !== 'undefined' ? `${window.location.origin}/experiences` : ''
  return { nombreProducto: title, tipoElemento, destino, duracion, precioRango, urlOrigen }
}

interface ExperienceQuoteModalProps {
  open: boolean
  onClose: () => void
  experience: ExperienceQuoteData
}

export function ExperienceQuoteModal({ open, onClose, experience }: ExperienceQuoteModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [open])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const nombreCompleto = (fd.get('nombreCompleto') as string)?.trim() ?? ''
    const correo = (fd.get('correo') as string)?.trim() ?? ''
    const telefono = (fd.get('telefono') as string)?.trim() ?? ''
    const numeroViajeros = (fd.get('numeroViajeros') as string)?.trim() ?? ''
    const fechaTentativa = (fd.get('fechaTentativa') as string)?.trim() ?? ''
    const mensaje = (fd.get('mensaje') as string)?.trim() ?? ''

    if (!nombreCompleto || !correo) {
      setStatus('error')
      setErrorMessage(t('experienceQuote.errorNombreCorreo'))
      return
    }
    if (!telefono) {
      setStatus('error')
      setErrorMessage(t('experienceQuote.errorTelefono'))
      return
    }

    const payload: ExperienceQuotePayload = {
      source: 'experience-quote',
      nombreCompleto,
      correo,
      telefono,
      numeroViajeros,
      fechaTentativa,
      mensaje: mensaje || undefined,
      nombreProducto: experience.nombreProducto,
      tipoElemento: experience.tipoElemento,
      destino: experience.destino,
      duracion: experience.duracion,
      precioRango: experience.precioRango,
      urlOrigen: experience.urlOrigen,
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/tailor-made', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setStatus('error')
        setErrorMessage((data.error as string) || t('contactForm.errorEnviar'))
        return
      }
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setErrorMessage(t('contactForm.errorConexion'))
    }
  }

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        key="experience-quote-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-[#0a192f]/60 backdrop-blur-sm z-[60]"
        onClick={onClose}
      />
      <div key="experience-quote-content" className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          className="pointer-events-auto w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 md:p-8">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
              aria-label={t('common.cerrar')}
            >
              <X size={18} />
            </button>

            <h2 className="font-serif text-2xl text-[#0a192f] mb-1 pr-10">
              {t('experienceQuote.title')}
            </h2>
            <p className="text-[#7B4B2A] font-semibold text-sm mb-4">
              {experience.nombreProducto}
            </p>

            <div className="bg-[#f8f9fa] rounded-xl p-4 mb-6 text-sm text-gray-600 space-y-1 border border-gray-100">
              <p><span className="text-gray-400 font-medium">{t('experienceQuote.destinoLabel')}</span> {experience.destino}</p>
              <p><span className="text-gray-400 font-medium">{t('experienceQuote.duracionLabel')}</span> {experience.duracion}</p>
            </div>

            {isSuccess ? (
              <div className="py-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#2e4a3d]/15 text-[#2e4a3d] mb-4">
                  <CheckCircle size={28} strokeWidth={2} />
                </div>
                <p className="font-serif text-lg text-[#0a192f] mb-1">{t('experienceQuote.solicitudEnviada')}</p>
                <p className="text-sm text-gray-600">{t('experienceQuote.responderemos24')}</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 text-sm font-semibold text-[#7B4B2A] hover:text-[#6B4028] transition-colors"
                >
                  {t('common.cerrar')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1.5">{t('experienceQuote.nombreCompleto')}</label>
                  <input
                    name="nombreCompleto"
                    type="text"
                    required
                    disabled={isLoading}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60"
                    placeholder={t('experienceQuote.placeholderNombre')}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1.5">{t('experienceQuote.correoElectronico')}</label>
                  <input
                    name="correo"
                    type="email"
                    required
                    disabled={isLoading}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60"
                    placeholder={t('experienceQuote.placeholderCorreo')}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1.5">{t('experienceQuote.telefonoWhatsApp')}</label>
                  <input
                    name="telefono"
                    type="tel"
                    required
                    disabled={isLoading}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60"
                    placeholder={t('experienceQuote.placeholderTelefono')}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1.5">{t('experienceQuote.viajeros')}</label>
                    <input
                      name="numeroViajeros"
                      type="number"
                      min={1}
                      disabled={isLoading}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60"
                      placeholder={t('experienceQuote.placeholderViajeros')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1.5">{t('experienceQuote.fechaTentativa')}</label>
                    <input
                      name="fechaTentativa"
                      type="date"
                      disabled={isLoading}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1.5">{t('experienceQuote.mensajeAdicional')}</label>
                  <textarea
                    name="mensaje"
                    rows={2}
                    disabled={isLoading}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors resize-none disabled:opacity-60"
                    placeholder={t('experienceQuote.placeholderMensaje')}
                  />
                </div>

                {isError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#7B4B2A] hover:bg-[#6B4028] disabled:bg-[#7B4B2A]/70 disabled:cursor-not-allowed text-white text-sm font-semibold uppercase tracking-wider py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {t('common.enviando')}
                    </>
                  ) : (
                    t('experienceQuote.enviarSolicitud')
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
