import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { buildShareMeta } from '@/lib/metadata'
import { TailorMadeForm } from '@/components/tailor-made/TailorMadeForm'

const title = 'Cotizar Viaje a la Medida | Simatiri Experience'
const description = 'Diseña tu viaje perfecto por la Sierra Tarahumara con Simatiri Experience. Itinerarios personalizados, servicio concierge y atención exclusiva.'

export const metadata: Metadata = {
  title,
  description,
  ...buildShareMeta({ title, description, pathname: '/tailor-made-trip' }),
}

export default function TailorMadeTripPage() {
    return (
        <>
            <PageHero
                title="Tu viaje, diseñado sin compromisos"
                subtitle="Cuéntanos tu sueño. Nuestros especialistas diseñan el itinerario, seleccionan los hoteles y coordinan cada detalle para que tú solo te ocupes de disfrutar."
                size="md"
                backgroundImage="https://drive.google.com/uc?export=view&id=1ebc95Zf8tXLNnYfobC6IfKMO-V3Bh7ML"
                overlay="linear-gradient(rgba(0,0,0,0.36), rgba(0,0,0,0.42))"
            />

            <section className="py-20 px-8">
                <div className="max-w-3xl mx-auto">

                    <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm">
                        <div className="mb-8">
                            <div className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-2">Paso 1</div>
                            <h2 className="font-serif text-2xl text-[#0a192f]">Cuéntanos sobre ti</h2>
                        </div>

                        <TailorMadeForm />
                    </div>
                </div>
            </section>
        </>
    )
}
