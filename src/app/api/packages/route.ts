import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
    try {
        const packages = await prisma.package.findMany({
            include: {
                prices: true
            },
            orderBy: { id: 'asc' }
        })
        return NextResponse.json(packages)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
    }
}
