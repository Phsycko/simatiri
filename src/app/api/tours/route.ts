import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
    try {
        const tours = await prisma.tour.findMany({
            include: {
                destination: true,
                tierPrices: true
            }
        })
        return NextResponse.json(tours)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch tours' }, { status: 500 })
    }
}
