'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toDateString, parseDateString } from '@/lib/availability'

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
      if (current.getMonth() !== month) {
        week.push(null)
      } else {
        week.push(toDateString(current))
      }
      current.setDate(current.getDate() + 1)
    }
    weeks.push(week)
    if (weeks.length >= 6) break
  }
  return weeks
}

function isPast(dateStr: string): boolean {
  const d = parseDateString(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d < today
}

export type PublicCalendarProps = {
  from: string
  to: string
  isBlocked: (dateStr: string) => boolean
  loading?: boolean
  onSelect?: (checkIn: string, checkOut: string) => void
  selectedCheckIn?: string | null
  selectedCheckOut?: string | null
}

export function PublicCalendar({
  from,
  to,
  isBlocked,
  loading,
  onSelect,
  selectedCheckIn,
  selectedCheckOut,
}: PublicCalendarProps) {
  const [viewDate, setViewDate] = useState(() => {
    const [y, m] = from.split('-').map(Number)
    return new Date(y, m - 1, 1)
  })

  const [localCheckIn, setLocalCheckIn] = useState<string | null>(selectedCheckIn ?? null)
  const [localCheckOut, setLocalCheckOut] = useState<string | null>(selectedCheckOut ?? null)

  const checkIn = selectedCheckIn ?? localCheckIn
  const checkOut = selectedCheckOut ?? localCheckOut

  const setCheckIn = (v: string | null) => {
    if (selectedCheckIn === undefined) setLocalCheckIn(v)
    onSelect?.(v ?? '', v ?? '')
  }
  const setCheckOut = (v: string | null) => {
    if (selectedCheckOut === undefined) setLocalCheckOut(v)
    if (v && checkIn) onSelect?.(checkIn, v)
  }

  const viewYear = viewDate.getFullYear()
  const viewMonth = viewDate.getMonth()
  const grid = useMemo(() => getMonthGrid(viewYear, viewMonth), [viewYear, viewMonth])

  const monthLabel = viewDate.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })

  const canPrev =
    viewYear > parseDateString(from).getFullYear() ||
    (viewYear === parseDateString(from).getFullYear() && viewMonth > parseDateString(from).getMonth())
  const canNext =
    viewYear < parseDateString(to).getFullYear() ||
    (viewYear === parseDateString(to).getFullYear() && viewMonth < parseDateString(to).getMonth())

  const goPrev = () => {
    if (!canPrev) return
    setViewDate(new Date(viewYear, viewMonth - 1, 1))
  }
  const goNext = () => {
    if (!canNext) return
    setViewDate(new Date(viewYear, viewMonth + 1, 1))
  }

  const handleDayClick = (dateStr: string) => {
    if (loading) return
    if (isBlocked(dateStr) || isPast(dateStr)) return
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateStr)
      setCheckOut(null)
      return
    }
    if (parseDateString(dateStr).getTime() < parseDateString(checkIn).getTime()) {
      setCheckIn(dateStr)
      setCheckOut(null)
      return
    }
    setCheckOut(dateStr)
    onSelect?.(checkIn, dateStr)
  }

  const isInRange = (dateStr: string) => {
    if (!checkIn || !checkOut) return false
    const t = parseDateString(dateStr).getTime()
    const a = parseDateString(checkIn).getTime()
    const b = parseDateString(checkOut).getTime()
    return t >= Math.min(a, b) && t <= Math.max(a, b)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canPrev}
          className={cn(
            'p-2 rounded-lg transition-colors',
            canPrev ? 'text-[#0a192f] hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'
          )}
          aria-label="Mes anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-serif text-lg font-semibold text-[#0a192f] capitalize">
          {monthLabel}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={!canNext}
          className={cn(
            'p-2 rounded-lg transition-colors',
            canNext ? 'text-[#0a192f] hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'
          )}
          aria-label="Mes siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {loading ? (
        <div className="p-8 flex items-center justify-center text-gray-500">
          <span className="text-sm">Cargando disponibilidad...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-7 border-b border-gray-100">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="p-2">
            {grid.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-0.5">
                {week.map((dateStr, di) => {
                  if (dateStr === null) {
                    return <div key={di} className="aspect-square" />
                  }
                  const blocked = isBlocked(dateStr)
                  const past = isPast(dateStr)
                  const disabled = blocked || past
                  const selected =
                    dateStr === checkIn || dateStr === checkOut || isInRange(dateStr)
                  const isStart = dateStr === checkIn
                  const isEnd = dateStr === checkOut

                  return (
                    <button
                      key={dateStr}
                      type="button"
                      disabled={disabled}
                      onClick={() => handleDayClick(dateStr)}
                      className={cn(
                        'aspect-square rounded-lg text-sm font-medium transition-colors flex items-center justify-center',
                        disabled && 'cursor-not-allowed',
                        blocked && 'bg-gray-100 text-gray-400 line-through',
                        past && !blocked && 'text-gray-300',
                        !disabled && 'hover:bg-[#0a192f]/5',
                        selected && !blocked && 'bg-[#2e4a3d] text-white hover:bg-[#2e4a3d]',
                        isStart && 'rounded-l-lg',
                        isEnd && 'rounded-r-lg',
                        isInRange(dateStr) && !isStart && !isEnd && 'bg-[#2e4a3d]/70 text-white rounded-none'
                      )}
                      aria-label={dateStr}
                      aria-pressed={selected}
                    >
                      {new Date(dateStr + 'T12:00:00').getDate()}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </>
      )}

      <div className="px-4 py-3 border-t border-gray-100 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-[#2e4a3d]" /> Disponible
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-gray-100 line-through" /> No disponible
        </span>
      </div>
    </div>
  )
}
