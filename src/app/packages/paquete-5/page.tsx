import type { Metadata } from 'next'
import { PackageDetailContent } from '@/components/packages/PackageDetailContent'
import { getPackageDetailProps } from '@/lib/packages-static'

export const metadata: Metadata = {
  title: 'Paquete 5 | SIMATIRI',
  description: '4 Días / 3 Noches. Chihuahua – Creel – Chihuahua.',
}

export default function Paquete5Page() {
  return <PackageDetailContent {...getPackageDetailProps(5)} />
}
