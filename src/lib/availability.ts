/**
 * Availability & date blocking utilities.
 * All dates are treated as date-only (YYYY-MM-DD) in a consistent way to avoid timezone shifts.
 */

/** Format a Date to YYYY-MM-DD (local date in Mexico City for display, or UTC for storage) */
export function toDateString(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Parse YYYY-MM-DD string to Date at start of day in Mexico City (for consistent day boundaries) */
export function parseDateString(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  if (!y || !m || !d) throw new Error('Invalid date string: ' + dateStr)
  return new Date(y, m - 1, d)
}

/** Start of day UTC for a given date string (for DB storage: Prisma DateTime) */
export function startOfDayUTC(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d, 0, 0, 0, 0))
}

/** End of day UTC for a given date string (23:59:59.999) */
export function endOfDayUTC(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d, 23, 59, 59, 999))
}

/** Check if two ranges [aStart,aEnd] and [bStart,bEnd] overlap (inclusive) */
export function rangesOverlap(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date
): boolean {
  return aStart <= bEnd && bStart <= aEnd
}

/** Validate that endDate >= startDate (by date string) */
export function isRangeValid(startDate: string, endDate: string): boolean {
  const s = startOfDayUTC(startDate).getTime()
  const e = startOfDayUTC(endDate).getTime()
  return e >= s
}

/** Check if a single date (YYYY-MM-DD) falls within a block (start/end as Date) */
export function isDateInBlock(dateStr: string, blockStart: Date, blockEnd: Date): boolean {
  const d = startOfDayUTC(dateStr).getTime()
  const start = blockStart.getTime()
  const end = blockEnd.getTime()
  return d >= start && d <= end
}

/** Get list of YYYY-MM-DD strings between from and to (inclusive) */
export function getDaysInRange(from: string, to: string): string[] {
  const out: string[] = []
  const start = parseDateString(from)
  const end = parseDateString(to)
  const cur = new Date(start)
  while (cur <= end) {
    out.push(toDateString(cur))
    cur.setDate(cur.getDate() + 1)
  }
  return out
}

/** Block types for admin UI */
export const BLOCK_TYPES = [
  { value: 'reservado', label: 'Reservado' },
  { value: 'mantenimiento', label: 'Mantenimiento' },
  { value: 'interno', label: 'Uso interno' },
  { value: 'no_disponible', label: 'No disponible' },
  { value: 'otro', label: 'Otro' },
] as const

export type BlockType = (typeof BLOCK_TYPES)[number]['value']
