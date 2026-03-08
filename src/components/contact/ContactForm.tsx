'use client'

import { useState } from 'react'
import type { ContactPayload } from '@/app/api/tailor-made/route'

const TIPO_CONSULTA_OPTIONS = [
  'Reservación de paquete',
  'Cotización de tour',
  'Membresía de agencia B2B',
  'Viaje a la medida',
  'Otra consulta',
]

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    const nombre = (fd.get('nombre') as string)?.trim()
    const correo = (fd.get('correo') as string)?.trim()
    if (!nombre || !correo) {
      setStatus('error')
      setErrorMessage('Por favor completa nombre y correo electrónico.')
      return
    }

    const payload: ContactPayload = {
      source: 'contact',
      nombre,
      correo,
      tipoConsulta: (fd.get('tipoConsulta') as string)?.trim() || '',
      telefono: (fd.get('telefono') as string)?.trim() || '',
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Nombre</label>
          <input
            name="nombre"
            type="text"
            required
            disabled={isLoading}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors disabled:opacity-60"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Correo</label>
          <input
            name="correo"
            type="email"
            required
            disabled={isLoading}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors disabled:opacity-60"
            placeholder="tu@correo.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Tipo de Consulta</label>
        <select
          name="tipoConsulta"
          disabled={isLoading}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors bg-white disabled:opacity-60"
        >
          {TIPO_CONSULTA_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Teléfono (opcional)</label>
        <input
          name="telefono"
          type="tel"
          disabled={isLoading}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors disabled:opacity-60"
          placeholder="+52 XXX XXX XXXX"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Mensaje</label>
        <textarea
          name="mensaje"
          rows={5}
          disabled={isLoading}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0a192f] transition-colors resize-none disabled:opacity-60"
          placeholder="Cuéntanos sobre tu viaje, fechas, número de pasajeros..."
        />
      </div>

      {isSuccess && (
        <div className="rounded-xl border border-[#2e4a3d]/40 bg-[#2e4a3d]/10 px-5 py-4 text-center">
          <p className="font-serif text-lg text-[#1C1812] mb-1">Mensaje enviado correctamente</p>
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
        className="w-full bg-[#7B4B2A] hover:bg-[#6B4028] disabled:bg-[#7B4B2A]/70 disabled:cursor-not-allowed text-white text-sm font-semibold uppercase tracking-wider py-4 rounded-full transition-colors"
      >
        {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  )
}
