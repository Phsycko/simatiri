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
      priceFrom={7400}
      occupancyTiers={[
        { labelKey: 'packages.ocupacionDoble', priceMxn: 8350, priceUsd: 465 },
        { labelKey: 'packages.ocupacionTriple', priceMxn: 7710, priceUsd: 430 },
        { labelKey: 'packages.ocupacionCuadruple', priceMxn: 7400, priceUsd: 410 },
      ]}
      upgradeTiers={[
        { labelKey: 'packages.ocupacionDoble', priceMxn: 9300, priceUsd: 515 },
        { labelKey: 'packages.ocupacionTriple', priceMxn: 8700, priceUsd: 485 },
        { labelKey: 'packages.ocupacionCuadruple', priceMxn: 8400, priceUsd: 465 },
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
