import type { Metadata } from 'next'
import { PackageDetailContent } from '@/components/packages/PackageDetailContent'

export const metadata: Metadata = {
  title: 'Paquete 4 - CHEPE Express | SIMATIRI',
  description: '5 Días / 4 Noches. Chihuahua – Creel – Chihuahua. Hospedaje Categoría Superior.',
}

export default function Paquete4Page() {
  return (
    <PackageDetailContent
      packageId={4}
      durationDays={5}
      durationNights={4}
      routeText="Chihuahua → Creel → Chihuahua"
      trainClassKey="packages.trainClassExpressPrimera"
      trainNoteKey="packages.aplicableUpgrade"
      accommodationKey="packages.categoriaSuperior"
      startPlace="Chihuahua, Chih."
      endPlace="Chihuahua, Chih."
      startNote
      endNote
      priceFrom={10100}
      occupancyTiers={[
        { labelKey: 'packages.ocupacionDoble', priceMxn: 11400, priceUsd: 635 },
        { labelKey: 'packages.ocupacionTriple', priceMxn: 10200, priceUsd: 565 },
        { labelKey: 'packages.ocupacionCuadruple', priceMxn: 10100, priceUsd: 560 },
      ]}
      destinations={[
        { name: 'Ciudad Chihuahua' },
        { name: 'Creel Pueblo Mágico' },
        { name: 'Cuauhtémoc (Menonitas)' },
        { name: 'Divisadero Barrancas' },
      ]}
      backgroundImage="/images/packages/package-4.jpg"
    />
  )
}
