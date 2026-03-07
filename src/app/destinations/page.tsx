import type { Metadata } from 'next'
import { DestinationsFlagship } from '@/components/destinations/DestinationsFlagship'

export const metadata: Metadata = {
    title: 'Destinos | Simatiri Experience',
    description: 'Explora los destinos de la Sierra Tarahumara operados por Simatiri Experience: Creel, Barrancas del Cobre, Divisadero, El Fuerte y más.',
}

export default function DestinationsPage() {
    return (
        <main className="w-full bg-[#0A110D]">
            <DestinationsFlagship />
        </main>
    )
}
