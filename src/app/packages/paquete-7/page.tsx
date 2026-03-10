import type { Metadata } from 'next'
import { PackageDetailContent } from '@/components/packages/PackageDetailContent'
import { getPackageDetailProps } from '@/lib/packages-static'

export const metadata: Metadata = {
  title: 'Paquete 7 | SIMATIRI',
  description: '3 Días / 2 Noches. Chihuahua – Creel – Chihuahua.',
}

export default function Paquete7Page() {
  return <PackageDetailContent {...getPackageDetailProps(7)} />
}
