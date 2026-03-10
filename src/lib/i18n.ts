import { es } from '@/lib/locales/es'
import { en } from '@/lib/locales/en'

export const LOCALE_COOKIE = 'NEXT_LOCALE'
export type Locale = 'es' | 'en'
export const DEFAULT_LOCALE: Locale = 'es'
export const LOCALES: Locale[] = ['es', 'en']

const messages: Record<Locale, Record<string, unknown>> = {
  es: es as Record<string, unknown>,
  en: en as Record<string, unknown>,
}

export { messages }

/** Get nested value by path like 'nav.inicio' (string only). */
export function getMessage(obj: Record<string, unknown>, path: string): string | undefined {
  const value = getNested(obj, path)
  return typeof value === 'string' ? value : undefined
}

/** Get nested value by path; returns object, array, or string. */
export function getNested(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split('.')
  let cur: unknown = obj
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[p]
  }
  return cur
}

/** Get locale from cookie value (for server components). */
export function getLocaleFromCookie(cookieValue: string | undefined): Locale {
  return cookieValue === 'en' || cookieValue === 'es' ? cookieValue : DEFAULT_LOCALE
}
/** Server-side t function. Use getT(cookieLocale)('nav.inicio') */
export function getT(locale: Locale) {
  const dict = messages[locale] ?? messages.es
  return (key: string): string => getMessage(dict, key) ?? key
}
