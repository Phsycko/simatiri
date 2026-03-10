import type { Metadata } from 'next'
import { PackageDetailContent } from '@/components/packages/PackageDetailContent'

export const metadata: Metadata = {
  title: 'Paquete 1 - CHEPE Express Primera Clase | SIMATIRI',
  description: '7 Días / 6 Noches. El Fuerte, Sinaloa – Creel – Chihuahua. Hospedaje Categoría Superior.',
}

export default function Paquete1Page() {
  return (
    <PackageDetailContent
      packageId={1}
      durationDays={7}
      durationNights={6}
      routeText="El Fuerte, Sinaloa → Creel → Chihuahua"
      trainClassKey="packages.trainClassExpressPrimera"
      trainNoteKey="packages.aplicableUpgrade"
      accommodationKey="packages.categoriaSuperior"
      startPlace="El Fuerte, Sinaloa"
      endPlace="Chihuahua, Chih."
      endNote
      priceFrom={24000}
      occupancyTiers={[
        { labelKey: 'packages.ocupacionDoble', priceMxn: 27700, priceUsd: 1540 },
        { labelKey: 'packages.ocupacionTriple', priceMxn: 25400, priceUsd: 1410 },
        { labelKey: 'packages.ocupacionCuadruple', priceMxn: 24000, priceUsd: 1330 },
      ]}
      destinations={[
        { name: 'El Fuerte' },
        { name: 'Divisadero Barrancas del Cobre' },
        { name: 'Creel Pueblo Mágico' },
        { name: 'Ciudad Chihuahua' },
      ]}
      backgroundImage="/images/paquetes/paquete-1-hero.jpg"
    />
  )
}
