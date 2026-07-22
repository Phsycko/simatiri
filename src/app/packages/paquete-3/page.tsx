import type { Metadata } from 'next'
import { PackageDetailContent } from '@/components/packages/PackageDetailContent'

export const metadata: Metadata = {
  title: 'Paquete 3 - CHEPE Regional Primera Clase | SIMATIRI',
  description: '5 Días / 4 Noches. Chihuahua – Creel – Chihuahua. Hospedaje Categoría Intermedia.',
}

export default function Paquete3Page() {
  return (
    <PackageDetailContent
      packageId={3}
      durationDays={5}
      durationNights={4}
      routeText="Chihuahua → Creel → Chihuahua"
      trainClassKey="packages.trainClassRegional"
      trainNoteKey="packages.aplicableUpgrade"
      accommodationKey="packages.categoriaIntermedia"
      startPlace="Chihuahua, Chih."
      endPlace="Chihuahua, Chih."
      startNote
      endNote
      priceFrom={8400}
      occupancyTiers={[
        { labelKey: 'packages.ocupacionDoble', priceMxn: 9350, priceUsd: 520 },
        { labelKey: 'packages.ocupacionTriple', priceMxn: 8710, priceUsd: 484 },
        { labelKey: 'packages.ocupacionCuadruple', priceMxn: 8400, priceUsd: 467 },
      ]}
      upgradeTiers={[
        { labelKey: 'packages.ocupacionDoble', priceMxn: 10300, priceUsd: 573 },
        { labelKey: 'packages.ocupacionTriple', priceMxn: 9700, priceUsd: 540 },
        { labelKey: 'packages.ocupacionCuadruple', priceMxn: 9400, priceUsd: 523 },
      ]}
      destinations={[
        { name: 'Ciudad Chihuahua' },
        { name: 'Creel Pueblo Mágico' },
        { name: 'Cuauhtémoc (Menonitas)' },
        { name: 'Divisadero Barrancas' },
      ]}
      useTarifaBase
      backgroundImage="/images/packages/package-3.jpg"
    />
  )
}
