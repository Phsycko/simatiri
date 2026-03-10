import type { Metadata } from 'next'
import { PackageDetailContent } from '@/components/packages/PackageDetailContent'
import { getPackageDetailProps } from '@/lib/packages-static'

export const metadata: Metadata = {
  title: 'Paquete 17 | SIMATIRI',
  description: '4 Días / 3 Noches. El Fuerte – Creel – El Fuerte.',
}

export default function Paquete17Page() {
  return <PackageDetailContent {...getPackageDetailProps(17)} />
}
