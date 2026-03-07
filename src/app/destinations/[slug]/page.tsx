import { PageHero } from '@/components/ui/PageHero'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function DestinationSlugPage({ params }: { params: { slug: string } }) {
    return (
        <>
            <PageHero label="Destino" title={params.slug.replace(/-/g, ' ')} size="md" />
            <section className="py-20 px-8 max-w-5xl mx-auto">
                <Link href="/destinations" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#0a192f] transition-colors mb-10">
                    <ArrowLeft size={14} /> Todos los Destinos
                </Link>
                <p className="text-gray-500">Contenido detallado de este destino próximamente.</p>
            </section>
        </>
    )
}
