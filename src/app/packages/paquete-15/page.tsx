import type { Metadata } from 'next'
import { PackageDetailContent } from '@/components/packages/PackageDetailContent'
import { getPackageDetailProps } from '@/lib/packages-static'

export const metadata: Metadata = {
  title: 'Paquete 15 | SIMATIRI',
  description: '4 Días / 3 Noches. Chihuahua – Creel – Los Mochis.',
}

export default function Paquete15Page() {
  return <PackageDetailContent {...getPackageDetailProps(15)} />
}
