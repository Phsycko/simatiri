import type { Metadata } from 'next'
import { PackageDetailContent } from '@/components/packages/PackageDetailContent'

export const metadata: Metadata = {
  title: 'Paquete 2 - CHEPE Regional Primera Clase | SIMATIRI',
  description: '6 Días / 5 Noches. Chihuahua – Creel – Divisadero. Hospedaje Categoría Intermedia.',
}

export default function Paquete2Page() {
  return (
    <PackageDetailContent
      packageId={2}
      durationDays={6}
      durationNights={5}
      routeText="Chihuahua → Creel → Divisadero"
      trainClassKey="packages.trainClassRegional"
      trainNoteKey="packages.opcionalUpgradeExpress"
      accommodationKey="packages.categoriaIntermedia"
      startPlace="Chihuahua, Chih."
      endPlace="Divisadero"
      startNote
      endNote={false}
      priceFrom={9100}
      occupancyTiers={[
        { labelKey: 'packages.ocupacionDoble', priceMxn: 10400, priceUsd: 580 },
        { labelKey: 'packages.ocupacionTriple', priceMxn: 9470, priceUsd: 525 },
        { labelKey: 'packages.ocupacionCuadruple', priceMxn: 9100, priceUsd: 505 },
      ]}
      upgradeTiers={[
        { labelKey: 'packages.ocupacionDoble', priceMxn: 11400, priceUsd: 635 },
        { labelKey: 'packages.ocupacionTriple', priceMxn: 10440, priceUsd: 580 },
        { labelKey: 'packages.ocupacionCuadruple', priceMxn: 10070, priceUsd: 560 },
      ]}
      destinations={[
        { name: 'Ciudad Chihuahua' },
        { name: 'Creel Pueblo Mágico' },
        { name: 'Divisadero Barrancas' },
        { name: 'Cuauhtémoc (Menonitas)' },
      ]}
      experienciaOpcionalChoices={[
        'Cerocahui (Cata de vinos)',
        'Basaseachi',
        'Maguarichi (Géisers de Chihuahua)',
        'Kokoyome (Guachochi Pueblo Mágico)',
      ]}
      useTarifaBase
      backgroundImage="/images/packages/package-2-hero.jpg"
    />
  )
}
