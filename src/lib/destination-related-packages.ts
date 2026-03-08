/**
 * Mapping from Atlas destination slug to package ids.
 * Only normalized slugs (lowercase, no spaces, no accents): creel, el-fuerte, etc.
 * Package ids match the database (seed creates packages with id 1…17).
 */

/** Normalize any string to a slug: lowercase, trim, no accents, only [a-z0-9-] */
export function normalizeSlug(value: string): string {
    if (value == null || typeof value !== 'string') return ''
    const trimmed = value.trim()
    if (!trimmed) return ''
    const noAccents = trimmed
        .normalize('NFD')
        .replace(/\u0300-\u036f/g, '')
        .toLowerCase()
    const slug = noAccents.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    return slug
}

// Normalized slug -> package ids (only normalized keys)
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

// Aliases (normalized) -> normalized slug
const SLUG_ALIASES: Record<string, string> = {
    'creel-pueblo-magico': 'creel',
    barrancas: 'barrancas-del-cobre',
    cobre: 'barrancas-del-cobre',
    'los-mochis': 'los-mochis',
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
    const raw = normalizeSlug(destinoSlug)
    const slug = SLUG_ALIASES[raw] ?? raw
    const ids = DESTINATION_RELATED_PACKAGE_IDS[slug]
    return Array.isArray(ids) ? ids : []
}

export function getDestinationNameForSlug(destinoSlug: string): string {
    if (destinoSlug == null || typeof destinoSlug !== 'string') return ''
    const raw = normalizeSlug(destinoSlug)
    const slug = SLUG_ALIASES[raw] ?? raw
    return DESTINATION_NAMES[slug] ?? (raw || '')
}

export function hasRelatedPackages(destinoSlug: string): boolean {
    return getRelatedPackageIds(destinoSlug).length > 0
}
