import type { Metadata } from 'next'
import { PackageDetailContent } from '@/components/packages/PackageDetailContent'
import { getPackageDetailProps } from '@/lib/packages-static'

export const metadata: Metadata = {
  title: 'Paquete 14 | SIMATIRI',
  description: '5 Días / 4 Noches. Chihuahua – Creel – Los Mochis.',
}

export default function Paquete14Page() {
  return <PackageDetailContent {...getPackageDetailProps(14)} />
}
