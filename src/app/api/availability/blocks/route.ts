import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import {
  startOfDayUTC,
  endOfDayUTC,
  isRangeValid,
  rangesOverlap,
  BLOCK_TYPES,
  type BlockType,
} from '@/lib/availability'

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

function parseDate(s: string | null): string | null {
  if (!s || !DATE_REGEX.test(s)) return null
  const [y, m, d] = s.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  if (isNaN(date.getTime()) || date.getFullYear() !== y || date.getMonth() !== m - 1) return null
  return s
}

const VALID_BLOCK_TYPES = new Set(BLOCK_TYPES.map((t) => t.value))

/**
 * GET: List all blocks (for admin panel).
 * TODO: When auth is implemented, require admin role here.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const from = parseDate(searchParams.get('from'))
    const to = parseDate(searchParams.get('to'))

    const where: { status?: string; startDate?: { gte: Date }; endDate?: { lte: Date } } = {
      status: 'blocked',
    }
    if (from) where.startDate = { gte: startOfDayUTC(from) }
    if (to) where.endDate = { lte: endOfDayUTC(to) }

    const blocks = await prisma.availabilityBlock.findMany({
      where,
      orderBy: { startDate: 'asc' },
    })

    const serialized = blocks.map((b) => ({
      id: b.id,
      startDate: b.startDate.toISOString().slice(0, 10),
      endDate: b.endDate.toISOString().slice(0, 10),
      status: b.status,
      blockType: b.blockType ?? null,
      reason: b.reason ?? null,
      notes: b.notes ?? null,
      createdAt: b.createdAt.toISOString(),
      updatedAt: b.updatedAt.toISOString(),
    }))

    return NextResponse.json({ blocks: serialized })
  } catch (error) {
    console.error('GET /api/availability/blocks error:', error)
    return NextResponse.json(
      { error: 'Error al listar bloqueos' },
      { status: 500 }
    )
  }
}

/**
 * POST: Create a new block (single date or range).
 * Body: { startDate: "YYYY-MM-DD", endDate?: "YYYY-MM-DD", blockType?: string, reason?: string, notes?: string }
 * endDate defaults to startDate. Validates range and overlapping blocks.
 * TODO: When auth is implemented, require admin role here.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const startDateStr = parseDate(body.startDate ?? null)
    const endDateStr = body.endDate != null ? parseDate(String(body.endDate)) : startDateStr
    const blockType =
      body.blockType != null && VALID_BLOCK_TYPES.has(body.blockType as BlockType)
        ? (body.blockType as BlockType)
        : null
    const reason = typeof body.reason === 'string' ? body.reason.trim() || null : null
    const notes = typeof body.notes === 'string' ? body.notes.trim() || null : null

    if (!startDateStr) {
      return NextResponse.json(
        { error: 'startDate (YYYY-MM-DD) es obligatorio' },
        { status: 400 }
      )
    }

    if (!endDateStr) {
      return NextResponse.json(
        { error: 'endDate debe ser una fecha válida (YYYY-MM-DD)' },
        { status: 400 }
      )
    }

    if (!isRangeValid(startDateStr, endDateStr)) {
      return NextResponse.json(
        { error: 'endDate no puede ser anterior a startDate' },
        { status: 400 }
      )
    }

    const newStart = startOfDayUTC(startDateStr)
    const newEnd = endOfDayUTC(endDateStr)

    const existing = await prisma.availabilityBlock.findMany({
      where: { status: 'blocked' },
    })

    for (const block of existing) {
      if (rangesOverlap(newStart, newEnd, block.startDate, block.endDate)) {
        const a = block.startDate.toISOString().slice(0, 10)
        const b = block.endDate.toISOString().slice(0, 10)
        return NextResponse.json(
          {
            error: `El rango se solapa con un bloqueo existente (${a} - ${b}). Elimina o ajusta el bloqueo antes de crear uno nuevo.`,
          },
          { status: 409 }
        )
      }
    }

    const created = await prisma.availabilityBlock.create({
      data: {
        startDate: newStart,
        endDate: newEnd,
        status: 'blocked',
        blockType,
        reason,
        notes,
      },
    })

    return NextResponse.json({
      block: {
        id: created.id,
        startDate: created.startDate.toISOString().slice(0, 10),
        endDate: created.endDate.toISOString().slice(0, 10),
        status: created.status,
        blockType: created.blockType ?? null,
        reason: created.reason ?? null,
        notes: created.notes ?? null,
        createdAt: created.createdAt.toISOString(),
        updatedAt: created.updatedAt.toISOString(),
      },
    })
  } catch (error) {
    console.error('POST /api/availability/blocks error:', error)
    return NextResponse.json(
      { error: 'Error al crear el bloqueo' },
      { status: 500 }
    )
  }
}
