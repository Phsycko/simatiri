import type { Metadata } from 'next'
import { PackageDetailContent } from '@/components/packages/PackageDetailContent'
import { getPackageDetailProps } from '@/lib/packages-static'

export const metadata: Metadata = {
  title: 'Paquete 13 | SIMATIRI',
  description: '7 Días / 6 Noches. Los Mochis – Creel – Los Mochis.',
}

export default function Paquete13Page() {
  return <PackageDetailContent {...getPackageDetailProps(13)} />
}
