'use client'

import { useState } from 'react'
import type { ContactPayload } from '@/app/api/tailor-made/route'
import { useTranslation } from '@/contexts/LocaleContext'

const TIPO_CONSULTA_KEYS = [
  'contactForm.reservacionPaquete',
  'contactForm.cotizacionTour',
  'contactForm.tarifarioHotel',
  'contactForm.membresiaAgencia',
  'contactForm.viajeMedida',
  'contactForm.otraConsulta',
] as const

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const { t } = useTranslation()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    const nombre = (fd.get('nombre') as string)?.trim()
    const correo = (fd.get('correo') as string)?.trim()
    const telefono = (fd.get('telefono') as string)?.trim()
    if (!nombre || !correo || !telefono) {
      setStatus('error')
      setErrorMessage(t('contactForm.errorNombreCorreoTelefono'))
      return
    }

    const payload: ContactPayload = {
      source: 'contact',
      nombre,
      correo,
      tipoConsulta: (fd.get('tipoConsulta') as string)?.trim() || '',
      telefono,
      mensaje: (fd.get('mensaje') as string)?.trim() || '',
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{t('contactForm.nombre')}</label>
          <input
            name="nombre"
            type="text"
            required
            disabled={isLoading}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors disabled:opacity-60"
            placeholder={t('contactForm.placeholderNombre')}
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{t('contactForm.correo')}</label>
          <input
            name="correo"
            type="email"
            required
            disabled={isLoading}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors disabled:opacity-60"
            placeholder={t('contactForm.placeholderCorreo')}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{t('contactForm.tipoConsulta')}</label>
        <select
          name="tipoConsulta"
          disabled={isLoading}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors bg-white disabled:opacity-60"
        >
          {TIPO_CONSULTA_KEYS.map((key) => (
            <option key={key} value={t(key)}>{t(key)}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{t('contactForm.telefono')}</label>
        <input
          name="telefono"
          type="tel"
          required
          disabled={isLoading}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors disabled:opacity-60"
          placeholder={t('contactForm.placeholderTelefono')}
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{t('contactForm.mensaje')}</label>
        <textarea
          name="mensaje"
          rows={5}
          disabled={isLoading}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors resize-none disabled:opacity-60"
          placeholder={t('contactForm.placeholderMensaje')}
        />
      </div>

      {isSuccess && (
        <div className="rounded-xl border border-[#2e4a3d]/40 bg-[#2e4a3d]/10 px-5 py-4 text-center">
          <p className="font-serif text-lg text-[#1C1812] mb-1">{t('contactForm.mensajeEnviado')}</p>
          <p className="text-sm text-gray-600">{t('contactForm.responderemos24')}</p>
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
        className="w-full bg-[#7B4B2A] hover:bg-[#6B4028] disabled:bg-[#7B4B2A]/70 disabled:cursor-not-allowed text-white text-sm font-semibold uppercase tracking-wider py-4 rounded-full transition-colors"
      >
        {isLoading ? t('common.enviando') : t('contactForm.enviarMensaje')}
      </button>
    </form>
  )
}
