import type { Metadata } from 'next'
import { PackageDetailContent } from '@/components/packages/PackageDetailContent'
import { getPackageDetailProps } from '@/lib/packages-static'

export const metadata: Metadata = {
  title: 'Paquete 10 | SIMATIRI',
  description: '4 Días / 3 Noches. Los Mochis – Creel – Los Mochis.',
}

export default function Paquete10Page() {
  return <PackageDetailContent {...getPackageDetailProps(10)} />
}
