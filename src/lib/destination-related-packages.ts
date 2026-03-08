/**
 * Mapping from Atlas destination slug to package ids that include or relate to that destination.
 * Package ids must match the database (seed creates packages with id 1, 2, … 17).
 * Used by: DestinationsFlagship modal CTA and Packages page filter.
 */

// Normalized slug -> package ids (same ids as prisma Package.id)
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

// Aliases: other possible slugs from URL or UI -> normalized slug
const SLUG_ALIASES: Record<string, string> = {
    'creel-pueblo-magico': 'creel',
    'creel pueblo magico': 'creel',
    'barrancas': 'barrancas-del-cobre',
    'cobre': 'barrancas-del-cobre',
    'el fuerte': 'el-fuerte',
    'los mochis': 'los-mochis',
    'cuauhtémoc': 'cuauhtemoc',
    'cuauhtemoc': 'cuauhtemoc',
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
    if (destinoSlug == null || typeof destinoSlug !== 'string') return []
    const raw = destinoSlug.toLowerCase().trim()
    const slug = SLUG_ALIASES[raw] ?? raw
    const ids = DESTINATION_RELATED_PACKAGE_IDS[slug]
    return Array.isArray(ids) ? ids : []
}

export function getDestinationNameForSlug(destinoSlug: string): string {
    if (destinoSlug == null || typeof destinoSlug !== 'string') return ''
    const raw = destinoSlug.toLowerCase().trim()
    const slug = SLUG_ALIASES[raw] ?? raw
    return DESTINATION_NAMES[slug] ?? (raw || '')
}

export function hasRelatedPackages(destinoSlug: string): boolean {
    return getRelatedPackageIds(destinoSlug).length > 0
}
