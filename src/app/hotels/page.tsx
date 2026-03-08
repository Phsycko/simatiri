import type { Metadata } from 'next'
import { HotelsHeroNew } from '@/components/hotels/HotelsHeroNew'
import { AgreementBlockNew } from '@/components/hotels/AgreementBlockNew'
import { BenefitsStripNew } from '@/components/hotels/BenefitsStripNew'
import { VigenciaContactNew } from '@/components/hotels/VigenciaContactNew'
import { HotelPanelSystem } from '@/components/hotels/HotelPanelSystem'
import { PoliciesBlockNew } from '@/components/hotels/PoliciesBlockNew'
import { ClosingBlockNew } from '@/components/hotels/ClosingBlockNew'

export const metadata: Metadata = {
  title: 'Convenio Hotelero Preferencial',
  description: 'Tarifas preferenciales para tour operadoras. Convenio vigente y portafolio de hospedaje.',
}

/** Solo datos reales proporcionados. Sin ubicaciones ni copy inventado. */
export const HOTEL_DATA = [
  {
    id: 'simatiri',
    name: 'Hotel Simatiri',
    specs: [
      'El precio descrito se desglosa con y sin impuestos.',
      'El precio que se menciona es por noche de hospedaje.',
      'La tarifa incluye desayuno caliente de cortesía en un horario de 7:00 a.m. - 10:00 a.m.',
      'La tarifa incluye fogatas dentro del complejo.',
      'Revisar política de menores',
      'Se otorgará una habitación de cortesía al adquirir 15 habitaciones.',
    ],
    rates: [
      { roomName: 'Habitación tipo Cabaña Sencilla / Doble', priceWithoutTaxes: 950, priceWithTaxes: 1140 },
      { roomName: 'Habitación tipo Cabaña Triple', priceWithoutTaxes: 1050, priceWithTaxes: 1260 },
      { roomName: 'Habitación tipo Cabaña Cuádruple', priceWithoutTaxes: 1150, priceWithTaxes: 1380 },
      { roomName: 'Cabaña Equipada 2 – 4 Px.', priceWithoutTaxes: 1350, priceWithTaxes: 1620 },
      { roomName: 'Cabaña para 10 persona', priceWithoutTaxes: 2750, priceWithTaxes: 3300 },
    ],
    note: 'PRECIO MEJORABLE EN EL CASO DE ADQUIRIR UN PAQUETE COMPLETO',
  },
  {
    id: 'cascada',
    name: 'Hotel Cascada Inn',
    specs: [
      'El precio que se menciona es por noche de hospedaje.',
      'La tarifa incluye desayuno caliente de cortesía en un horario de 7:00 a.m. - 10:00 a.m.',
      'Revisar política de menores',
    ],
    rates: [
      { roomName: 'Habitación de Hotel Sencilla / Doble', onlyPrice: 1748 },
      { roomName: 'Habitación de Hotel Triple', onlyPrice: 1948 },
      { roomName: 'Habitación de Hotel Cuádruple', onlyPrice: 2148 },
    ],
    note: 'PRECIO MEJORABLE EN EL CASO DE ADQUIRIR UN PAQUETE COMPLETO',
  },
  {
    id: 'villa',
    name: 'Hotel Villa Mexicana',
    specs: [
      'El precio que se menciona es por noche de hospedaje.',
      'La tarifa incluye desayuno caliente de cortesía en un horario de 7:00 a.m. - 10:00 a.m.',
      'Revisar política de menores',
      'Se otorgará una habitación de cortesía al adquirir 15 habitaciones.',
    ],
    rates: [
      { roomName: 'Habitación de Hotel SGL / DBL', onlyPrice: 2390 },
      { roomName: 'Habitación de Hotel Triple', onlyPrice: 2785 },
      { roomName: 'Habitación de Hotel Cuádruple', onlyPrice: 3180 },
    ],
    note: 'PRECIO MEJORABLE EN EL CASO DE ADQUIRIR UN PAQUETE COMPLETO',
  },
  {
    id: 'armando',
    name: 'Hotel Don Armando',
    specs: [
      'El precio que se menciona es por noche de hospedaje.',
      'La tarifa incluye desayuno caliente de cortesía en un horario de 7:00 a.m. - 10:00 a.m.',
      'Revisar política de menores',
      'Se otorgará una habitación de cortesía al adquirir 15 habitaciones.',
    ],
    rates: [
      { roomName: 'Habitación de Hotel SGL / DBL', onlyPrice: 2585 },
      { roomName: 'Habitación de Hotel Triple', onlyPrice: 3190 },
      { roomName: 'Habitación tipo de Hotel Cuádruple', onlyPrice: 3795 },
    ],
    note: 'PRECIO MEJORABLE EN EL CASO DE ADQUIRIR UN PAQUETE COMPLETO',
  },
  {
    id: 'lodge',
    name: 'Hotel The Lodge',
    specs: [
      'El precio que se menciona es por noche de hospedaje.',
      'DESAYUNO CALIENTE + $312.00 MXN PP',
      'Revisar política de menores',
      'Se otorgará una habitación de cortesía al adquirir 15 habitaciones.',
    ],
    rates: [
      { roomName: 'Habitación de Hotel SGL / DBL', onlyPrice: 2735 },
      { roomName: 'Habitación de Hotel Triple', onlyPrice: 3250 },
      { roomName: 'Habitación tipo de Hotel Cuádruple', onlyPrice: 3765 },
    ],
    note: 'PRECIO MEJORABLE EN EL CASO DE ADQUIRIR UN PAQUETE COMPLETO',
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
