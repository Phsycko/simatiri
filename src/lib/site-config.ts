/**
 * Site-wide config: contact, WhatsApp, etc.
 * Single source of truth for floating button and contact links.
 */

/** WhatsApp number in international format without + or spaces (e.g. 526281000000) */
export const WHATSAPP_NUMBER = '526281000000'

/** Pre-filled message when opening WhatsApp from the floating button */
export const WHATSAPP_DEFAULT_MESSAGE =
  'Hola, me gustaría recibir información sobre sus viajes y paquetes por la Sierra Tarahumara.'

export function getWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(message ?? WHATSAPP_DEFAULT_MESSAGE)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}
