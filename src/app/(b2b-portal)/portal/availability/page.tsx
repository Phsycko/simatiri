'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Lock, Trash2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  toDateString,
  parseDateString,
  getDaysInRange,
  BLOCK_TYPES,
  isRangeValid,
} from '@/lib/availability'

type BlockItem = {
  id: number
  startDate: string
  endDate: string
  status: string
  blockType: string | null
  reason: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
}

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

function getMonthGrid(year: number, month: number): (string | null)[][] {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const startDay = first.getDay()
  const startMonday = startDay === 0 ? -5 : 2 - startDay
  const startDate = new Date(year, month, startMonday)
  const weeks: (string | null)[][] = []
  let current = new Date(startDate)
  const endTime = last.getTime() + 24 * 60 * 60 * 1000
  while (current.getTime() < endTime || weeks.length < 6) {
    const week: (string | null)[] = []
    for (let i = 0; i < 7; i++) {
      if (current.getMonth() !== month) week.push(null)
      else week.push(toDateString(current))
      current.setDate(current.getDate() + 1)
    }
    weeks.push(week)
    if (weeks.length >= 6) break
  }
  return weeks
}

function blocksToSet(blocks: BlockItem[]): Set<string> {
  const set = new Set<string>()
  blocks.forEach((b) => getDaysInRange(b.startDate, b.endDate).forEach((d) => set.add(d)))
  return set
}

export default function AdminAvailabilityPage() {
  const [blocks, setBlocks] = useState<BlockItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewDate, setViewDate] = useState(() => new Date())
  const [formStart, setFormStart] = useState('')
  const [formEnd, setFormEnd] = useState('')
  const [formBlockType, setFormBlockType] = useState('')
  const [formReason, setFormReason] = useState('')
  const [formNotes, setFormNotes] = useState('')
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const fetchBlocks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/availability/blocks')
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Error al cargar bloqueos')
        setBlocks([])
        return
      }
      setBlocks(data.blocks ?? [])
    } catch (e) {
      setError('Error de conexión')
      setBlocks([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBlocks()
  }, [fetchBlocks])

  const blockedSet = useMemo(() => blocksToSet(blocks), [blocks])
  const viewYear = viewDate.getFullYear()
  const viewMonth = viewDate.getMonth()
  const grid = useMemo(() => getMonthGrid(viewYear, viewMonth), [viewYear, viewMonth])
  const monthLabel = viewDate.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })

  const handleCreateBlock = async (e: React.FormEvent) => {
    e.preventDefault()
    const start = formStart.trim()
    const end = (formEnd.trim() || start)
    if (!start) {
      setSubmitError('Fecha de inicio es obligatoria')
      setSubmitStatus('error')
      return
    }
    if (!isRangeValid(start, end)) {
      setSubmitError('La fecha fin no puede ser anterior a la fecha de inicio')
      setSubmitStatus('error')
      return
    }
    setSubmitStatus('loading')
    setSubmitError('')
    try {
      const res = await fetch('/api/availability/blocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate: start,
          endDate: end,
          blockType: formBlockType || undefined,
          reason: formReason || undefined,
          notes: formNotes || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setSubmitError(data.error || 'Error al crear bloqueo')
        setSubmitStatus('error')
        return
      }
      setSubmitStatus('success')
      setFormStart('')
      setFormEnd('')
      setFormBlockType('')
      setFormReason('')
      setFormNotes('')
      await fetchBlocks()
    } catch (e) {
      setSubmitError('Error de conexión')
      setSubmitStatus('error')
    }
  }

  const handleDelete = async (id: number) => {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/availability/blocks/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Error al eliminar')
        return
      }
      await fetchBlocks()
    } finally {
      setDeletingId(null)
    }
  }

  const getBlockTypeLabel = (value: string | null) =>
    BLOCK_TYPES.find((t) => t.value === value)?.label ?? value ?? '—'

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-[#0a192f] tracking-tight flex items-center gap-2">
          <Calendar className="text-[#2e4a3d]" size={28} />
          Disponibilidad y bloqueos
        </h1>
        <p className="text-gray-500 mt-1">
          Bloquea o desbloquea fechas. Los cambios se reflejan de inmediato en la página pública de disponibilidad.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 flex items-center justify-between">
          <span>{error}</span>
          <button type="button" onClick={() => fetchBlocks()} className="text-amber-700 underline font-medium">
            Reintentar
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendario vista */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock size={18} className="text-[#2e4a3d]" />
                Calendario de bloqueos
              </CardTitle>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setViewDate(new Date(viewYear, viewMonth - 1, 1))}
                  className="p-1.5 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-600"
                  aria-label="Mes anterior"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setViewDate(new Date(viewYear, viewMonth + 1, 1))}
                  className="p-1.5 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-600"
                  aria-label="Mes siguiente"
                >
                  →
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-500 mb-4 capitalize">{monthLabel}</p>
              {loading ? (
                <p className="text-sm text-gray-500">Cargando...</p>
              ) : (
                <div className="grid grid-cols-7 gap-0.5">
                  {WEEKDAYS.map((d) => (
                    <div key={d} className="py-1 text-center text-xs font-semibold text-gray-500">
                      {d}
                    </div>
                  ))}
                  {grid.flat().map((dateStr, i) => {
                    if (dateStr === null) return <div key={i} className="aspect-square" />
                    const blocked = blockedSet.has(dateStr)
                    const isCurrentMonth = parseDateString(dateStr).getMonth() === viewMonth
                    return (
                      <div
                        key={dateStr}
                        className={cn(
                          'aspect-square rounded flex items-center justify-center text-sm',
                          !isCurrentMonth && 'text-gray-200',
                          isCurrentMonth && !blocked && 'bg-white text-gray-700',
                          isCurrentMonth && blocked && 'bg-[#0a192f] text-white font-medium'
                        )}
                      >
                        {new Date(dateStr + 'T12:00:00').getDate()}
                      </div>
                    )
                  })}
                </div>
              )}
              <p className="mt-3 text-xs text-gray-400">Negro = bloqueado. Los cambios se ven al instante en la web pública.</p>
            </CardContent>
          </Card>
        </div>

        {/* Formulario nuevo bloqueo */}
        <div>
          <Card>
            <CardHeader className="bg-gray-50/50 border-b border-gray-100">
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus size={18} className="text-[#2e4a3d]" />
                Bloquear fechas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleCreateBlock} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha inicio *</label>
                  <input
                    type="date"
                    value={formStart}
                    onChange={(e) => setFormStart(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha fin (opcional)</label>
                  <input
                    type="date"
                    value={formEnd}
                    onChange={(e) => setFormEnd(e.target.value)}
                    min={formStart || undefined}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-0.5">Si se deja vacío, se bloquea solo la fecha de inicio.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo de bloqueo</label>
                  <select
                    value={formBlockType}
                    onChange={(e) => setFormBlockType(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] outline-none"
                  >
                    <option value="">— Seleccionar —</option>
                    {BLOCK_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Motivo / Nota</label>
                  <input
                    type="text"
                    value={formReason}
                    onChange={(e) => setFormReason(e.target.value)}
                    placeholder="Ej. Reserva grupo"
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Notas internas</label>
                  <textarea
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="Solo visibles en admin"
                    rows={2}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] outline-none resize-none"
                  />
                </div>
                {submitStatus === 'error' && (
                  <p className="text-sm text-red-600">{submitError}</p>
                )}
                {submitStatus === 'success' && (
                  <p className="text-sm text-[#2e4a3d] font-medium">Bloqueo creado. Las fechas ya no están disponibles.</p>
                )}
                <Button type="submit" disabled={submitStatus === 'loading'} variant="premium" className="w-full">
                  {submitStatus === 'loading' ? 'Guardando...' : 'Bloquear fechas'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lista de bloqueos */}
      <Card>
        <CardHeader className="bg-gray-50/50 border-b border-gray-100">
          <CardTitle className="text-lg">Bloqueos actuales</CardTitle>
          <p className="text-sm text-gray-500 font-normal">Elimina un bloqueo para dejar esas fechas disponibles de nuevo.</p>
        </CardHeader>
        <CardContent className="pt-6">
          {loading ? (
            <p className="text-sm text-gray-500">Cargando...</p>
          ) : blocks.length === 0 ? (
            <p className="text-sm text-gray-500">No hay bloqueos. Todas las fechas están disponibles.</p>
          ) : (
            <ul className="space-y-3">
              {blocks.map((b) => (
                <li
                  key={b.id}
                  className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 rounded-lg border border-gray-100 bg-white hover:border-gray-200"
                >
                  <div>
                    <span className="font-medium text-[#0a192f]">
                      {b.startDate === b.endDate ? b.startDate : `${b.startDate} — ${b.endDate}`}
                    </span>
                    {b.blockType && (
                      <span className="ml-2 text-sm text-gray-500">({getBlockTypeLabel(b.blockType)})</span>
                    )}
                    {b.reason && <p className="text-sm text-gray-600 mt-0.5">{b.reason}</p>}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(b.id)}
                    disabled={deletingId === b.id}
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 text-sm py-1.5 px-3"
                  >
                    <Trash2 size={14} className="mr-1" />
                    {deletingId === b.id ? 'Eliminando...' : 'Desbloquear'}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
