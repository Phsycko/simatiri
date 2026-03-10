import type { Metadata } from 'next'
import { PackageDetailContent } from '@/components/packages/PackageDetailContent'
import { getPackageDetailProps } from '@/lib/packages-static'

export const metadata: Metadata = {
  title: 'Paquete 9 | SIMATIRI',
  description: '5 Días / 4 Noches. Los Mochis – Creel – Los Mochis.',
}

export default function Paquete9Page() {
  return <PackageDetailContent {...getPackageDetailProps(9)} />
}
