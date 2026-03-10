import type { PackageDetailContentProps } from '@/components/packages/PackageDetailContent'

const ROUTES: Record<number, string> = {
  1: 'El Fuerte → Creel → Chihuahua',
  2: 'Chihuahua → Creel → Divisadero',
  3: 'Chihuahua → Creel → Chihuahua',
  4: 'Chihuahua → Creel → Chihuahua',
  5: 'Chihuahua → Creel → Chihuahua',
  6: 'Chihuahua → Creel → Chihuahua',
  7: 'Chihuahua → Creel → Chihuahua',
  8: 'Chihuahua → Creel → Chihuahua',
  9: 'Los Mochis → Creel → Los Mochis',
  10: 'Los Mochis → Creel → Los Mochis',
  11: 'Los Mochis → Creel → Los Mochis',
  12: 'Los Mochis → Creel → Los Mochis',
  13: 'Los Mochis → Creel → Los Mochis',
  14: 'Chihuahua → Creel → Los Mochis',
  15: 'Chihuahua → Creel → Los Mochis',
  16: 'El Fuerte → Creel → El Fuerte',
  17: 'El Fuerte → Creel → El Fuerte',
}

const PRICES: Record<number, { pricePerPerson: number; occupancyType: string }[]> = {
  5: [{ occupancyType: 'DOBLE', pricePerPerson: 8200 }, { occupancyType: 'TRIPLE', pricePerPerson: 7500 }, { occupancyType: 'CUADRUPLE', pricePerPerson: 7100 }],
  6: [{ occupancyType: 'DOBLE', pricePerPerson: 10800 }, { occupancyType: 'TRIPLE', pricePerPerson: 9900 }, { occupancyType: 'CUADRUPLE', pricePerPerson: 9400 }],
  7: [{ occupancyType: 'DOBLE', pricePerPerson: 6900 }, { occupancyType: 'TRIPLE', pricePerPerson: 6300 }, { occupancyType: 'CUADRUPLE', pricePerPerson: 6000 }],
  8: [{ occupancyType: 'DOBLE', pricePerPerson: 9200 }, { occupancyType: 'TRIPLE', pricePerPerson: 8400 }, { occupancyType: 'CUADRUPLE', pricePerPerson: 8000 }],
  9: [{ occupancyType: 'DOBLE', pricePerPerson: 11500 }, { occupancyType: 'TRIPLE', pricePerPerson: 10500 }, { occupancyType: 'CUADRUPLE', pricePerPerson: 9900 }],
  10: [{ occupancyType: 'DOBLE', pricePerPerson: 8900 }, { occupancyType: 'TRIPLE', pricePerPerson: 8100 }, { occupancyType: 'CUADRUPLE', pricePerPerson: 7700 }],
  11: [{ occupancyType: 'DOBLE', pricePerPerson: 10200 }, { occupancyType: 'TRIPLE', pricePerPerson: 9300 }, { occupancyType: 'CUADRUPLE', pricePerPerson: 8800 }],
  12: [{ occupancyType: 'DOBLE', pricePerPerson: 9800 }, { occupancyType: 'TRIPLE', pricePerPerson: 9000 }, { occupancyType: 'CUADRUPLE', pricePerPerson: 8500 }],
  13: [{ occupancyType: 'DOBLE', pricePerPerson: 13200 }, { occupancyType: 'TRIPLE', pricePerPerson: 12100 }, { occupancyType: 'CUADRUPLE', pricePerPerson: 11500 }],
  14: [{ occupancyType: 'DOBLE', pricePerPerson: 15800 }, { occupancyType: 'TRIPLE', pricePerPerson: 14500 }, { occupancyType: 'CUADRUPLE', pricePerPerson: 13800 }],
  15: [{ occupancyType: 'DOBLE', pricePerPerson: 12800 }, { occupancyType: 'TRIPLE', pricePerPerson: 11700 }, { occupancyType: 'CUADRUPLE', pricePerPerson: 11100 }],
  16: [{ occupancyType: 'DOBLE', pricePerPerson: 11200 }, { occupancyType: 'TRIPLE', pricePerPerson: 10200 }, { occupancyType: 'CUADRUPLE', pricePerPerson: 9700 }],
  17: [{ occupancyType: 'DOBLE', pricePerPerson: 9800 }, { occupancyType: 'TRIPLE', pricePerPerson: 9000 }, { occupancyType: 'CUADRUPLE', pricePerPerson: 8500 }],
}

const DURATION: Record<number, number> = {
  5: 4, 6: 4, 7: 3, 8: 3, 9: 5, 10: 4, 11: 4, 12: 5, 13: 7, 14: 5, 15: 4, 16: 4, 17: 4,
}

const TRAIN_CLASS: Record<number, 'packages.trainClassExpressPrimera' | 'packages.trainClassRegional'> = {
  5: 'packages.trainClassRegional',
  6: 'packages.trainClassExpressPrimera',
  7: 'packages.trainClassRegional',
  8: 'packages.trainClassExpressPrimera',
  9: 'packages.trainClassExpressPrimera',
  10: 'packages.trainClassRegional',
  11: 'packages.trainClassExpressPrimera',
  12: 'packages.trainClassRegional',
  13: 'packages.trainClassRegional',
  14: 'packages.trainClassExpressPrimera',
  15: 'packages.trainClassExpressPrimera',
  16: 'packages.trainClassExpressPrimera',
  17: 'packages.trainClassRegional',
}

const DEFAULT_DESTINATIONS_CHIHUAHUA = [
  { name: 'Ciudad Chihuahua' },
  { name: 'Creel Pueblo Mágico' },
  { name: 'Cuauhtémoc (Menonitas)' },
  { name: 'Divisadero Barrancas' },
]
const DEFAULT_DESTINATIONS_MOCHIS = [
  { name: 'Los Mochis' },
  { name: 'Creel Pueblo Mágico' },
  { name: 'Divisadero Barrancas del Cobre' },
  { name: 'El Fuerte' },
]
const DEFAULT_DESTINATIONS_CROSS = [
  { name: 'Ciudad Chihuahua' },
  { name: 'Creel Pueblo Mágico' },
  { name: 'Divisadero Barrancas' },
  { name: 'Los Mochis' },
]
const DEFAULT_DESTINATIONS_ELFUERTE = [
  { name: 'El Fuerte' },
  { name: 'Creel Pueblo Mágico' },
  { name: 'Divisadero Barrancas del Cobre' },
  { name: 'Ciudad Chihuahua' },
]

function getDestinations(id: number): { name: string }[] {
  const route = ROUTES[id]
  if (route?.includes('Chihuahua') && route?.includes('Los Mochis') && !route?.includes('El Fuerte')) return DEFAULT_DESTINATIONS_CROSS
  if (route?.startsWith('Los Mochis')) return DEFAULT_DESTINATIONS_MOCHIS
  if (route?.startsWith('El Fuerte')) return DEFAULT_DESTINATIONS_ELFUERTE
  return DEFAULT_DESTINATIONS_CHIHUAHUA
}

function getStartEnd(id: number): { startPlace: string; endPlace: string; startNote: boolean; endNote: boolean } {
  const route = ROUTES[id]
  if (!route) return { startPlace: '—', endPlace: '—', startNote: false, endNote: false }
  const parts = route.split(' → ')
  const start = parts[0] === 'Chihuahua' ? 'Chihuahua, Chih.' : parts[0] === 'El Fuerte' ? 'El Fuerte, Sinaloa' : parts[0]
  const end = parts[parts.length - 1] === 'Chihuahua' ? 'Chihuahua, Chih.' : parts[parts.length - 1] === 'El Fuerte' ? 'El Fuerte, Sinaloa' : parts[parts.length - 1]
  return {
    startPlace: start,
    endPlace: end,
    startNote: parts[0] === 'Chihuahua',
    endNote: parts[parts.length - 1] === 'Chihuahua',
  }
}

const USD = (mxn: number) => Math.round(mxn / 18)

export function getPackageDetailProps(id: number): Omit<PackageDetailContentProps, 'packageId'> & { packageId: number } {
  const durationDays = DURATION[id] ?? 4
  const durationNights = durationDays - 1
  const prices = PRICES[id] ?? []
  const basePrices = prices.filter((p) => !('isUpgrade' in p && p.isUpgrade))
  const priceFrom = basePrices.length ? Math.min(...basePrices.map((p) => p.pricePerPerson)) : 0
  const occupancyTiers = basePrices.map((p) => ({
    labelKey: p.occupancyType === 'DOBLE' ? 'packages.ocupacionDoble' as const : p.occupancyType === 'TRIPLE' ? 'packages.ocupacionTriple' as const : 'packages.ocupacionCuadruple' as const,
    priceMxn: p.pricePerPerson,
    priceUsd: USD(p.pricePerPerson),
  }))
  const { startPlace, endPlace, startNote, endNote } = getStartEnd(id)
  const isExpress = TRAIN_CLASS[id] === 'packages.trainClassExpressPrimera'
  return {
    packageId: id,
    durationDays,
    durationNights,
    routeText: ROUTES[id] ?? '',
    trainClassKey: TRAIN_CLASS[id] ?? 'packages.trainClassRegional',
    trainNoteKey: 'packages.aplicableUpgrade',
    accommodationKey: isExpress ? 'packages.categoriaSuperior' : 'packages.categoriaIntermedia',
    startPlace,
    endPlace,
    startNote,
    endNote,
    priceFrom,
    occupancyTiers,
    destinations: getDestinations(id),
    backgroundImage: id === 1 ? '/images/paquetes/paquete-1-hero.jpg' : `/images/packages/package-${id}.jpg`,
  }
}
