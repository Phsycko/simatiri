'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { PublicCalendar } from '@/components/availability/PublicCalendar'
import { useAvailabilityBlocks } from '@/hooks/useAvailabilityBlocks'
import { Button } from '@/components/ui/button'
import { toDateString } from '@/lib/availability'

function getDefaultRange() {
  const today = new Date()
  const from = new Date(today.getFullYear(), today.getMonth(), 1)
  const to = new Date(today.getFullYear(), today.getMonth() + 12, 0)
  return { from: toDateString(from), to: toDateString(to) }
}

export default function DisponibilidadPage() {
  const { from, to } = useMemo(getDefaultRange, [])
  const { isBlocked, loading, error, refetch } = useAvailabilityBlocks(from, to)
  const [checkIn, setCheckIn] = useState<string>('')
  const [checkOut, setCheckOut] = useState<string>('')

  const handleSelect = (cIn: string, cOut: string) => {
    setCheckIn(cIn)
    setCheckOut(cOut)
  }

  const hasSelection = checkIn && checkOut ? checkIn !== checkOut : !!checkIn
  const tailorMadeHref = checkIn
    ? `/tailor-made-trip?fechaLlegada=${encodeURIComponent(checkIn)}${checkOut && checkOut !== checkIn ? `&fechaSalida=${encodeURIComponent(checkOut)}` : ''}`
    : '/tailor-made-trip'

  return (
    <section className="py-16 md:py-24 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#0a192f] mb-3">
            Disponibilidad
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Consulta las fechas disponibles y elige tu check-in y check-out para solicitar tu reserva o cotización.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 flex items-center justify-between">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-amber-700 underline font-medium"
            >
              Reintentar
            </button>
          </div>
        )}

        <div className="mb-8">
          <PublicCalendar
            from={from}
            to={to}
            isBlocked={isBlocked}
            loading={loading}
            onSelect={handleSelect}
            selectedCheckIn={checkIn || null}
            selectedCheckOut={checkOut || null}
          />
        </div>

        {hasSelection && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-gray-600">
              {checkOut && checkOut !== checkIn ? (
                <>Del <strong>{checkIn}</strong> al <strong>{checkOut}</strong></>
              ) : (
                <>Fecha seleccionada: <strong>{checkIn}</strong></>
              )}
            </p>
            <Button asChild variant="premium">
              <Link href={tailorMadeHref}>
                Solicitar reserva o cotización
              </Link>
            </Button>
          </div>
        )}

        {!hasSelection && !loading && (
          <p className="text-center text-sm text-gray-500">
            Selecciona una fecha (o rango) disponible para continuar.
          </p>
        )}
      </div>
    </section>
  )
}
