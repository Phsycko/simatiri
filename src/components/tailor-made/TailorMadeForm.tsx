'use client'

import { useState } from 'react'
import type { TailorMadePayload } from '@/app/api/tailor-made/route'

const BUDGETS = [
  'Hasta $10,000 MXN por persona',
  '$10,000 – $20,000 MXN por persona',
  '$20,000 – $40,000 MXN por persona',
  '$40,000+ MXN por persona',
  'No tengo presupuesto definido aún',
]

const INTERESTS = [
  'Tren CHEPE',
  'Barrancas del Cobre',
  'Cultura Rarámuri',
  'Senderismo / Aventura',
  'Fotografía',
  'Gastronomía',
  'Hoteles de lujo',
  'Historia Colonial',
]

const DURATION_OPTIONS = ['3-4 días', '5-6 días', '7+ días', 'No sé aún']

export function TailorMadeForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    const nombreCompleto = (fd.get('nombreCompleto') as string)?.trim()
    const correo = (fd.get('correo') as string)?.trim()
    if (!nombreCompleto || !correo) {
      setStatus('error')
      setErrorMessage('Por favor completa nombre completo y correo electrónico.')
      return
    }

    const intereses = INTERESTS.filter((i) => fd.get(`interes-${i}`) === 'on')
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
        setErrorMessage((data.error as string) || 'Error al enviar. Intenta de nuevo.')
        return
      }
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setErrorMessage('Error de conexión. Revisa tu red e intenta de nuevo.')
    }
  }

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Nombre completo *</label>
          <input name="nombreCompleto" type="text" required disabled={isLoading} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Correo electrónico *</label>
          <input name="correo" type="email" required disabled={isLoading} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Teléfono / WhatsApp</label>
          <input name="telefono" type="tel" disabled={isLoading} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">País de origen</label>
          <input name="pais" type="text" disabled={isLoading} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60" />
        </div>
      </div>

      <hr className="border-gray-100" />

      <div>
        <div className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-2">Paso 2</div>
        <h3 className="font-serif text-xl text-[#0a192f] mb-5">Detalles del Viaje</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Número de viajeros</label>
            <input name="numeroViajeros" type="number" min={1} disabled={isLoading} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60" placeholder="2" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Fecha tentativa de llegada</label>
            <input name="fechaLlegada" type="date" disabled={isLoading} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors disabled:opacity-60" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Duración estimada</label>
            <select name="duracion" disabled={isLoading} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors bg-white disabled:opacity-60">
              {DURATION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">Presupuesto estimado por persona</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {BUDGETS.map((b) => (
            <label key={b} className="flex items-center gap-3 p-3.5 border border-gray-200 rounded-xl cursor-pointer hover:border-[#7B4B2A] transition-colors group">
              <input type="radio" name="presupuesto" value={b} disabled={isLoading} className="accent-[#7B4B2A]" />
              <span className="text-sm text-gray-700 group-hover:text-[#0a192f] transition-colors">{b}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">¿Qué te interesa? (selecciona varios)</label>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name={`interes-${i}`} value="on" disabled={isLoading} className="hidden peer" />
              <span className="px-4 py-2 text-sm border border-gray-200 rounded-full text-gray-600 peer-checked:bg-[#7B4B2A] peer-checked:text-white peer-checked:border-[#7B4B2A] hover:border-gray-400 transition-all cursor-pointer select-none">
                {i}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Notas adicionales o solicitudes especiales</label>
        <textarea name="notas" rows={4} disabled={isLoading} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7B4B2A] transition-colors resize-none disabled:opacity-60" placeholder="Cuéntanos cualquier detalle que necesites: alergias, movilidad reducida, celebraciones especiales, preferencias de hotel..." />
      </div>

      {isSuccess && (
        <div className="rounded-xl border border-[#2e4a3d]/40 bg-[#2e4a3d]/10 px-5 py-4 text-center">
          <p className="font-serif text-lg text-[#1C1812] mb-1">Solicitud enviada correctamente</p>
          <p className="text-sm text-gray-600">Te responderemos en menos de 24 horas a tu correo.</p>
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
        {isLoading ? 'Enviando...' : 'Solicitar Cotización Personalizada'}
      </button>

      <p className="text-center text-xs text-gray-400">
        Respondemos en menos de 24 horas con una propuesta personalizada sin compromiso.
      </p>
    </form>
  )
}
