import type { Metadata } from 'next'
import { DestinationsFlagship } from '@/components/destinations/DestinationsFlagship'
import { buildShareMeta } from '@/lib/metadata'

const title = 'Destinos | Simatiri Experience'
const description = 'Explora los destinos de la Sierra Tarahumara operados por Simatiri Experience: Creel, Barrancas del Cobre, Divisadero, El Fuerte y más.'

export const metadata: Metadata = {
  title,
  description,
  ...buildShareMeta({ title, description, pathname: '/destinations' }),
}

export default function DestinationsPage() {
    return (
        <main className="w-full bg-[#0A110D]">
            <DestinationsFlagship />
        </main>
    )
}
