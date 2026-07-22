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

const PRICES: Record<number, { priceMxn: number; priceUsd: number; occupancyType: string; isUpgrade?: boolean }[]> = {
  5: [
    { occupancyType: 'DOBLE', priceMxn: 8380, priceUsd: 466 },
    { occupancyType: 'TRIPLE', priceMxn: 7900, priceUsd: 440 },
    { occupancyType: 'CUADRUPLE', priceMxn: 7700, priceUsd: 428 },
    { occupancyType: 'DOBLE', priceMxn: 9350, priceUsd: 520, isUpgrade: true },
    { occupancyType: 'TRIPLE', priceMxn: 8900, priceUsd: 495, isUpgrade: true },
    { occupancyType: 'CUADRUPLE', priceMxn: 8650, priceUsd: 481, isUpgrade: true },
  ],
  6: [
    { occupancyType: 'DOBLE', priceMxn: 10350, priceUsd: 575 },
    { occupancyType: 'TRIPLE', priceMxn: 9550, priceUsd: 530 },
    { occupancyType: 'CUADRUPLE', priceMxn: 9200, priceUsd: 510 },
  ],
  7: [
    { occupancyType: 'DOBLE', priceMxn: 7400, priceUsd: 410 },
    { occupancyType: 'TRIPLE', priceMxn: 7100, priceUsd: 395 },
    { occupancyType: 'CUADRUPLE', priceMxn: 6950, priceUsd: 385 },
  ],
  8: [
    { occupancyType: 'DOBLE', priceMxn: 9250, priceUsd: 515 },
    { occupancyType: 'TRIPLE', priceMxn: 8800, priceUsd: 485 },
    { occupancyType: 'CUADRUPLE', priceMxn: 8550, priceUsd: 475 },
  ],
  9: [
    { occupancyType: 'DOBLE', priceMxn: 8700, priceUsd: 485 },
    { occupancyType: 'TRIPLE', priceMxn: 8350, priceUsd: 465 },
    { occupancyType: 'CUADRUPLE', priceMxn: 8200, priceUsd: 455 },
  ],
  10: [
    { occupancyType: 'DOBLE', priceMxn: 9200, priceUsd: 510 },
    { occupancyType: 'TRIPLE', priceMxn: 8700, priceUsd: 485 },
    { occupancyType: 'CUADRUPLE', priceMxn: 8500, priceUsd: 475 },
  ],
  11: [
    { occupancyType: 'DOBLE', priceMxn: 10900, priceUsd: 605 },
    { occupancyType: 'TRIPLE', priceMxn: 10100, priceUsd: 560 },
    { occupancyType: 'CUADRUPLE', priceMxn: 9700, priceUsd: 535 },
  ],
  12: [
    { occupancyType: 'DOBLE', priceMxn: 13200, priceUsd: 735 },
    { occupancyType: 'TRIPLE', priceMxn: 12150, priceUsd: 675 },
    { occupancyType: 'CUADRUPLE', priceMxn: 11600, priceUsd: 645 },
  ],
  13: [
    { occupancyType: 'DOBLE', priceMxn: 18250, priceUsd: 1010 },
    { occupancyType: 'TRIPLE', priceMxn: 16580, priceUsd: 920 },
    { occupancyType: 'CUADRUPLE', priceMxn: 15790, priceUsd: 875 },
  ],
  14: [
    { occupancyType: 'DOBLE', priceMxn: 10100, priceUsd: 560 },
    { occupancyType: 'TRIPLE', priceMxn: 9500, priceUsd: 525 },
    { occupancyType: 'CUADRUPLE', priceMxn: 9240, priceUsd: 515 },
  ],
  15: [
    { occupancyType: 'DOBLE', priceMxn: 12400, priceUsd: 685 },
    { occupancyType: 'TRIPLE', priceMxn: 12150, priceUsd: 675 },
    { occupancyType: 'CUADRUPLE', priceMxn: 11750, priceUsd: 655 },
  ],
  16: [
    { occupancyType: 'DOBLE', priceMxn: 11650, priceUsd: 645 },
    { occupancyType: 'TRIPLE', priceMxn: 10850, priceUsd: 605 },
    { occupancyType: 'CUADRUPLE', priceMxn: 10450, priceUsd: 580 },
  ],
  17: [
    { occupancyType: 'DOBLE', priceMxn: 9960, priceUsd: 555 },
    { occupancyType: 'TRIPLE', priceMxn: 9500, priceUsd: 525 },
    { occupancyType: 'CUADRUPLE', priceMxn: 9240, priceUsd: 515 },
  ],
}

const DURATION: Record<number, number> = {
  5: 4, 6: 4, 7: 3, 8: 3, 9: 3, 10: 4, 11: 4, 12: 5, 13: 7, 14: 5, 15: 4, 16: 4, 17: 4,
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

export function getPackageDetailProps(id: number): Omit<PackageDetailContentProps, 'packageId'> & { packageId: number } {
  const durationDays = DURATION[id] ?? 4
  const durationNights = durationDays - 1
  const prices = PRICES[id] ?? []
  const basePrices = prices.filter((p) => !p.isUpgrade)
  const upgradePrices = prices.filter((p) => p.isUpgrade)
  const priceFrom = basePrices.length ? Math.min(...basePrices.map((p) => p.priceMxn)) : 0
  const occupancyTiers = basePrices.map((p) => ({
    labelKey: p.occupancyType === 'DOBLE' ? 'packages.ocupacionDoble' as const : p.occupancyType === 'TRIPLE' ? 'packages.ocupacionTriple' as const : 'packages.ocupacionCuadruple' as const,
    priceMxn: p.priceMxn,
    priceUsd: p.priceUsd,
  }))
  const upgradeTiers = upgradePrices.map((p) => ({
    labelKey: p.occupancyType === 'DOBLE' ? 'packages.ocupacionDoble' as const : p.occupancyType === 'TRIPLE' ? 'packages.ocupacionTriple' as const : 'packages.ocupacionCuadruple' as const,
    priceMxn: p.priceMxn,
    priceUsd: p.priceUsd,
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
    upgradeTiers,
    destinations: getDestinations(id),
    backgroundImage: id === 1 ? '/images/paquetes/paquete-1-hero.jpg' : `/images/packages/package-${id}.jpg`,
  }
}
