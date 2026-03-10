'use client'

import { useState } from 'react'
import type { TailorMadePayload } from '@/app/api/tailor-made/route'
import { useTranslation } from '@/contexts/LocaleContext'

const BUDGET_KEYS = ['budgetHasta10', 'budget10a20', 'budget20a40', 'budget40mas', 'budgetNoDefinido'] as const
const INTEREST_KEYS = ['interesTrenCHEPE', 'interesBarrancas', 'interesCultura', 'interesSenderismo', 'interesFotografia', 'interesGastronomia', 'interesHoteles', 'interesHistoria'] as const
const DURATION_KEYS = ['duracion3d', 'duracion5d', 'duracion7d', 'duracionNoSe'] as const

export function TailorMadeForm({
  initialFechaLlegada,
  initialFechaSalida,
}: {
  initialFechaLlegada?: string
  initialFechaSalida?: string
} = {}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const { t } = useTranslation()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    const nombreCompleto = (fd.get('nombreCompleto') as string)?.trim()
    const correo = (fd.get('correo') as string)?.trim()
    if (!nombreCompleto || !correo) {
      setStatus('error')
      setErrorMessage(t('tailorMade.errorNombreCorreo'))
      return
    }

    const intereses = INTEREST_KEYS.filter((key) => fd.get(`interes-${key}`) === 'on').map((key) => t(`tailorMade.${key}`))
    const presupuesto = (fd.get('presupuesto') as string) || ''

    const payload: TailorMadePayload = {
      nombreCompleto,
      correo,
      telefono: (fd.get('telefono') as string)?.trim() || '',
      pais: (fd.get('pais') as string)?.trim() || '',
      numeroViajeros: (fd.get('numeroViajeros') as string)?.trim() || '',
      fechaLlegada: (fd.get('fechaLlegada') as string) || '',
      duracion: (fd.get('duracion') as string) || '',
      presupuesto,
      intereses,
      notas: (fd.get('notas') as string)?.trim() || '',
      urlOrigen: typeof window !== 'undefined' ? window.location.href : '',
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{t('tailorMade.nombreCompleto')}</label>
          <input name="nombreCompleto" type="text" required disabled={isLoading} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{t('tailorMade.correoElectronico')}</label>
          <input name="correo" type="email" required disabled={isLoading} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{t('tailorMade.telefonoWhatsApp')}</label>
          <input name="telefono" type="tel" disabled={isLoading} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{t('tailorMade.paisOrigen')}</label>
          <input name="pais" type="text" disabled={isLoading} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60" />
        </div>
      </div>

      <hr className="border-gray-100" />

      <div>
        <div className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-2">{t('tailorMade.paso2')}</div>
        <h3 className="font-serif text-xl text-[#0a192f] mb-5">{t('tailorMade.detallesViaje')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{t('tailorMade.numeroViajeros')}</label>
            <input name="numeroViajeros" type="number" min={1} disabled={isLoading} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60" placeholder={t('tailorMade.placeholderViajeros')} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{t('tailorMade.fechaTentativaLlegada')}</label>
            <input name="fechaLlegada" type="date" defaultValue={initialFechaLlegada} disabled={isLoading} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{t('tailorMade.duracionEstimada')}</label>
            <select name="duracion" disabled={isLoading} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors bg-white disabled:opacity-60">
              {DURATION_KEYS.map((key) => (
                <option key={key} value={t(`tailorMade.${key}`)}>{t(`tailorMade.${key}`)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">{t('tailorMade.presupuestoEstimado')}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {BUDGET_KEYS.map((key) => (
            <label key={key} className="flex items-center gap-3 p-3.5 border border-gray-200 rounded-xl cursor-pointer hover:border-[#7B4B2A] transition-colors group">
              <input type="radio" name="presupuesto" value={t(`tailorMade.${key}`)} disabled={isLoading} className="accent-[#7B4B2A]" />
              <span className="text-sm text-gray-700 group-hover:text-[#0a192f] transition-colors">{t(`tailorMade.${key}`)}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">{t('tailorMade.queTeInteresa')}</label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_KEYS.map((key) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name={`interes-${key}`} value="on" disabled={isLoading} className="hidden peer" />
              <span className="px-4 py-2 text-sm border border-gray-200 rounded-full text-gray-600 peer-checked:bg-[#7B4B2A] peer-checked:text-white peer-checked:border-[#7B4B2A] hover:border-gray-400 transition-all cursor-pointer select-none">
                {t(`tailorMade.${key}`)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{t('tailorMade.notasAdicionales')}</label>
        <textarea name="notas" rows={4} disabled={isLoading} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors resize-none disabled:opacity-60" placeholder={t('tailorMade.placeholderNotas')} />
      </div>

      {isSuccess && (
        <div className="rounded-xl border border-[#2e4a3d]/40 bg-[#2e4a3d]/10 px-5 py-4 text-center">
          <p className="font-serif text-lg text-[#1C1812] mb-1">{t('tailorMade.solicitudEnviada')}</p>
          <p className="text-sm text-gray-600">{t('experienceQuote.responderemos24')}</p>
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-center">
          <p className="text-sm text-red-800">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#7B4B2A] hover:bg-[#6B4028] disabled:bg-[#7B4B2A]/70 disabled:cursor-not-allowed text-white text-sm font-semibold uppercase tracking-widest py-4 rounded-full transition-colors"
      >
        {isLoading ? t('common.enviando') : t('tailorMade.solicitarCotizacionPersonalizada')}
      </button>

      <p className="text-center text-xs text-gray-400">
        {t('tailorMade.footerNota')}
      </p>
    </form>
  )
}
