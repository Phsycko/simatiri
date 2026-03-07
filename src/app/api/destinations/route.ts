import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
    try {
        const destinations = await prisma.destination.findMany({
            include: {
                tours: true,
                hotels: true
            }
        })
        return NextResponse.json(destinations)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 })
    }
}
