import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
    try {
        const hotels = await prisma.hotel.findMany({
            include: {
                destination: true,
                roomTypes: {
                    include: {
                        seasonRates: true
                    }
                }
            }
        })
        return NextResponse.json(hotels)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch hotels' }, { status: 500 })
    }
}
