import type { Metadata } from 'next'
import { PackageDetailContent } from '@/components/packages/PackageDetailContent'

export const metadata: Metadata = {
  title: 'Paquete 4 - CHEPE Express | SIMATIRI',
  description: '5 Días / 4 Noches. Chihuahua – Creel – Chihuahua. Hospedaje Categoría Superior.',
}

const USD = (mxn: number) => Math.round(mxn / 18)

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
      priceFrom={10600}
      occupancyTiers={[
        { labelKey: 'packages.ocupacionDoble', priceMxn: 12400, priceUsd: USD(12400) },
        { labelKey: 'packages.ocupacionTriple', priceMxn: 11200, priceUsd: USD(11200) },
        { labelKey: 'packages.ocupacionCuadruple', priceMxn: 10600, priceUsd: USD(10600) },
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
