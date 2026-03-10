import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

/**
 * DELETE: Remove a block (unblock dates).
 * TODO: When auth is implemented, require admin role here.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const idNum = parseInt(id, 10)
    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
    }

    const block = await prisma.availabilityBlock.findUnique({
      where: { id: idNum },
    })

    if (!block) {
      return NextResponse.json({ error: 'Bloqueo no encontrado' }, { status: 404 })
    }

    await prisma.availabilityBlock.delete({
      where: { id: idNum },
    })

    return NextResponse.json({
      success: true,
      message: 'Bloqueo eliminado. Las fechas quedan disponibles.',
    })
  } catch (error) {
    console.error('DELETE /api/availability/blocks/[id] error:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el bloqueo' },
      { status: 500 }
    )
  }
}
