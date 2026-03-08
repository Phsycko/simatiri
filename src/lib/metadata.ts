/**
 * Configuración de previews compartibles (Open Graph, Twitter Cards).
 * URLs absolutas para WhatsApp y redes.
 */

const DEFAULT_OG_IMAGE = '/a91a08f4-4f29-4022-9cc6-ee54b027a077.jpg'
const OG_IMAGE_WIDTH = 1200
const OG_IMAGE_HEIGHT = 630
const SITE_NAME = 'Simatiri Experience'

/** Base URL del sitio. En producción debe ser la URL pública (ej. https://www.simatiri.com). */
export function getBaseUrl(): string {
  if (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  }
  return 'https://www.simatiri.com'
}

/** URL absoluta para una ruta (ej. /destinos → https://www.simatiri.com/destinos). */
export function getAbsoluteUrl(pathname: string): string {
  const base = getBaseUrl()
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${base}${path}`
}

/** URL absoluta de la imagen OG (debe estar en /public). */
export function getOgImageUrl(imagePath?: string): string {
  const path = imagePath ?? DEFAULT_OG_IMAGE
  return getAbsoluteUrl(path.startsWith('/') ? path : `/${path}`)
}

export interface PageMetaInput {
  title: string
  description: string
  /** Ruta de la página (ej. '/', '/destinations', '/hotels'). */
  pathname: string
  /** Ruta opcional de imagen en /public (ej. '/og-destinos.jpg'). Por defecto usa la imagen de marca. */
  imagePath?: string
}

/** Construye openGraph y twitter para una página. Usar en metadata de layout o page. */
export function buildShareMeta({
  title,
  description,
  pathname,
  imagePath,
}: PageMetaInput) {
  const url = getAbsoluteUrl(pathname)
  const imageUrl = getOgImageUrl(imagePath)

  return {
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'es_MX',
      type: 'website' as const,
      images: [
        {
          url: imageUrl,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [imageUrl],
    },
  }
}
