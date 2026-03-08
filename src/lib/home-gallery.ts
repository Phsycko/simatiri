import fs from 'node:fs'
import path from 'node:path'

const EXTENSIONS = /\.(jpg|jpeg|png|webp)$/i

/**
 * Returns image paths under /home-gallery for use in Next.js (public folder).
 * Only call from Server Components or server-side code; uses Node fs.
 */
export function getHomeGalleryImages(): string[] {
  const dir = path.join(process.cwd(), 'public', 'home-gallery')
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter((f) => EXTENSIONS.test(f))
  return files.map((f) => `/home-gallery/${f}`).sort()
}
