/**
 * Mapping from Atlas destination slug to package ids that include or relate to that destination.
 * Used by: DestinationsFlagship modal CTA and Packages page filter.
 * Based on routeMap and itinerary content (Creel, Divisadero, El Fuerte, Los Mochis, Chihuahua, etc.).
 */

export const DESTINATION_RELATED_PACKAGE_IDS: Record<string, number[]> = {
    creel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    'barrancas-del-cobre': [1, 2, 3, 5, 8],
    divisadero: [1, 2, 3, 5, 8],
    'el-fuerte': [1, 16, 17],
    'los-mochis': [9, 10, 11, 12, 13, 14, 15],
    cerocahui: [2],
    basaseachi: [2, 3, 5, 8],
    guachochi: [2],
    cuauhtemoc: [2, 3, 4, 5, 6, 7, 8],
    chihuahua: [1, 2, 3, 4, 5, 6, 7, 8, 14, 15],
}

const DESTINATION_NAMES: Record<string, string> = {
    creel: 'Creel',
    'barrancas-del-cobre': 'Barrancas del Cobre',
    divisadero: 'Divisadero',
    'el-fuerte': 'El Fuerte',
    'los-mochis': 'Los Mochis',
    cerocahui: 'Cerocahui',
    basaseachi: 'Basaseachi',
    guachochi: 'Guachochi',
    cuauhtemoc: 'Cuauhtémoc',
    chihuahua: 'Chihuahua',
}

export function getRelatedPackageIds(destinoSlug: string): number[] {
    const slug = destinoSlug.toLowerCase().trim()
    return DESTINATION_RELATED_PACKAGE_IDS[slug] ?? []
}

export function getDestinationNameForSlug(destinoSlug: string): string {
    const slug = destinoSlug.toLowerCase().trim()
    return DESTINATION_NAMES[slug] ?? destinoSlug
}

export function hasRelatedPackages(destinoSlug: string): boolean {
    return getRelatedPackageIds(destinoSlug).length > 0
}
