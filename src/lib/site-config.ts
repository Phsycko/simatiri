/**
 * Site-wide config: contact, WhatsApp, etc.
 * Single source of truth for floating button and contact links.
 */

/** WhatsApp number in international format without + or spaces (e.g. 526142528190) */
export const WHATSAPP_NUMBER = '526142528190'

/** Phone for display and tel: links (with spaces for readability) */
export const DISPLAY_PHONE = '+52 614 252 8190'

/** tel: link for click-to-call (same number as WhatsApp) */
export function getTelUrl(): string {
  return `tel:+${WHATSAPP_NUMBER}`
}

/** Pre-filled message when opening WhatsApp from the floating button */
export const WHATSAPP_DEFAULT_MESSAGE =
  'Hola, me gustaría recibir información sobre sus viajes y paquetes por la Sierra Tarahumara.'

export function getWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(message ?? WHATSAPP_DEFAULT_MESSAGE)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}
