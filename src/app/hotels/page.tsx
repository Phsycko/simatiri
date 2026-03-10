import type { Metadata } from 'next'
import { HotelsHeroNew } from '@/components/hotels/HotelsHeroNew'
import { AgreementBlockNew } from '@/components/hotels/AgreementBlockNew'
import { BenefitsStripNew } from '@/components/hotels/BenefitsStripNew'
import { VigenciaContactNew } from '@/components/hotels/VigenciaContactNew'
import { HotelPanelSystem } from '@/components/hotels/HotelPanelSystem'
import { PoliciesBlockNew } from '@/components/hotels/PoliciesBlockNew'
import { ClosingBlockNew } from '@/components/hotels/ClosingBlockNew'
import { buildShareMeta } from '@/lib/metadata'

const title = 'Convenio Hotelero Preferencial | Simatiri Experience'
const description = 'Tarifas preferenciales para tour operadoras. Convenio vigente y portafolio de hospedaje en la Sierra Tarahumara.'

export const metadata: Metadata = {
  title,
  description,
  ...buildShareMeta({ title, description, pathname: '/hotels' }),
}

/** Solo datos reales proporcionados. Precios no mostrados; contacto para tarifario. specKeys = claves en hotels.* para traducción */
export const HOTEL_DATA = [
  {
    id: 'simatiri',
    name: 'Hotel Simatiri',
    specKeys: ['specTarifaNoche', 'specDesayunoCortesia', 'specFogatas', 'specRevisarMenores', 'specHabitacionCortesia15'],
    rates: [] as { roomName: string; priceWithoutTaxes?: number; priceWithTaxes?: number; onlyPrice?: number }[],
    note: null as string | null,
  },
  {
    id: 'cascada',
    name: 'Hotel Cascada Inn',
    specKeys: ['specTarifaNoche', 'specDesayunoCortesia', 'specRevisarMenores'],
    rates: [],
    note: null,
  },
  {
    id: 'villa',
    name: 'Hotel Villa Mexicana',
    specKeys: ['specTarifaNoche', 'specDesayunoCortesia', 'specRevisarMenores', 'specHabitacionCortesia15'],
    rates: [],
    note: null,
  },
  {
    id: 'armando',
    name: 'Hotel Don Armando',
    specKeys: ['specTarifaNoche', 'specDesayunoCortesia', 'specRevisarMenores', 'specHabitacionCortesia15'],
    rates: [],
    note: null,
  },
  {
    id: 'lodge',
    name: 'Hotel The Lodge',
    specKeys: ['specTarifaNoche', 'specDesayunoAdicional', 'specRevisarMenores', 'specHabitacionCortesia15'],
    rates: [],
    note: null,
  },
] as const

export type HotelItem = (typeof HOTEL_DATA)[number]

export default function HotelsPage() {
  return (
    <div className="bg-[#0f0d0b] text-[#FAF5EF] selection:bg-[#7B4B2A]/30 selection:text-[#FAF5EF]">
      <HotelsHeroNew />
      <AgreementBlockNew />
      <BenefitsStripNew />
      <VigenciaContactNew />
      <HotelPanelSystem hotels={HOTEL_DATA} />
      <PoliciesBlockNew />
      <ClosingBlockNew />
    </div>
  )
}
