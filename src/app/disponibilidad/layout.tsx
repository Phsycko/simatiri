import type { Metadata } from 'next'
import { buildShareMeta } from '@/lib/metadata'

const title = 'Disponibilidad | Simatiri Experience'
const description = 'Consulta la disponibilidad de fechas para tu viaje a la Sierra Tarahumara. Selecciona check-in y check-out y solicita tu reserva o cotización personalizada.'

export const metadata: Metadata = {
  title,
  description,
  ...buildShareMeta({ title, description, pathname: '/disponibilidad' }),
}

export default function DisponibilidadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
