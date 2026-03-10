import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { startOfDayUTC, endOfDayUTC } from '@/lib/availability'

const isDev = process.env.NODE_ENV !== 'production'

/**
 * Public endpoint: get availability blocks in a date range.
 * Query: ?from=YYYY-MM-DD&to=YYYY-MM-DD (required)
 * Returns blocks that overlap [from, to] so the public calendar can mark dates as blocked.
 */
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

function parseQueryDate(s: string | null): string | null {
  if (!s || !DATE_REGEX.test(s)) return null
  const [y, m, d] = s.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  if (isNaN(date.getTime()) || date.getFullYear() !== y || date.getMonth() !== m - 1) return null
  return s
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  return String(err)
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl?.searchParams ?? new URL(req.url || '/').searchParams
  const fromParam = searchParams.get('from')
  const toParam = searchParams.get('to')

  try {
    const from = parseQueryDate(fromParam)
    const to = parseQueryDate(toParam)

    if (!from || !to) {
      return NextResponse.json(
        {
          error: 'Faltan parámetros. Se requieren "from" y "to" en formato YYYY-MM-DD.',
          code: 'INVALID_PARAMS',
        },
        { status: 400 }
      )
    }

    const fromDate = startOfDayUTC(from)
    const toDate = endOfDayUTC(to)
    if (fromDate.getTime() > toDate.getTime()) {
      return NextResponse.json(
        {
          error: 'La fecha "to" debe ser mayor o igual que "from".',
          code: 'INVALID_RANGE',
        },
        { status: 400 }
      )
    }

    type BlockRow = { id: number; startDate: Date | string; endDate: Date | string; blockType: string | null; reason: string | null }
    let blocks: BlockRow[]

    if (typeof (prisma as { availabilityBlock?: { findMany: (args: unknown) => Promise<BlockRow[]> } }).availabilityBlock?.findMany === 'function') {
      blocks = await prisma.availabilityBlock.findMany({
        where: {
          status: 'blocked',
          AND: [
            { startDate: { lte: toDate } },
            { endDate: { gte: fromDate } },
          ],
        },
        orderBy: { startDate: 'asc' },
      })
    } else {
      if (isDev) console.log('[GET /api/availability] Usando consulta raw (modelo AvailabilityBlock no presente en cliente). Ejecuta "npx prisma generate" con el servidor detenido para usar el cliente completo.')
      const fromIso = fromDate.toISOString()
      const toIso = toDate.toISOString()
      const raw = await prisma.$queryRaw<BlockRow[]>`
        SELECT id, startDate, endDate, blockType, reason
        FROM AvailabilityBlock
        WHERE status = 'blocked'
          AND datetime(startDate) <= datetime(${toIso})
          AND datetime(endDate) >= datetime(${fromIso})
        ORDER BY startDate ASC
      `
      blocks = raw
    }

    const serialized = blocks.map((b) => ({
      id: b.id,
      startDate: typeof b.startDate === 'string' ? b.startDate.slice(0, 10) : b.startDate.toISOString().slice(0, 10),
      endDate: typeof b.endDate === 'string' ? b.endDate.slice(0, 10) : b.endDate.toISOString().slice(0, 10),
      blockType: b.blockType ?? undefined,
      reason: b.reason ?? undefined,
    }))

    return NextResponse.json({ blocks: serialized })
  } catch (error) {
    const message = getErrorMessage(error)
    const code = 'AVAILABILITY_FETCH_ERROR'

    console.error('[GET /api/availability] Error:', {
      code,
      message,
      fromParam,
      toParam,
      stack: error instanceof Error ? error.stack : undefined,
    })

    const isPrismaModelMissing =
      typeof message === 'string' &&
      (message.includes('availabilityBlock') ||
        message.includes('findMany') ||
        message.includes('undefined'))

    const userMessage = isPrismaModelMissing
      ? 'Configuración del servidor incompleta. Ejecuta "npx prisma generate" y reinicia la app (con el servidor detenido).'
      : isDev
        ? message
        : 'Error al consultar disponibilidad. Intenta de nuevo en unos segundos.'

    return NextResponse.json(
      {
        error: userMessage,
        code,
        ...(isDev && { errorDetail: message }),
      },
      { status: 500 }
    )
  }
}
