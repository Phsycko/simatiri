import { PageHero } from '@/components/ui/PageHero'
import Link from 'next/link'
import { ArrowLeft, BookOpen } from 'lucide-react'

export default function JournalArticlePage({ params }: { params: { slug: string } }) {
    return (
        <>
            <PageHero label="Journal" title={params.slug.replace(/-/g, ' ')} size="sm" />
            <section className="py-20 px-8 max-w-3xl mx-auto">
                <Link href="/journal" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#0a192f] transition-colors mb-10">
                    <ArrowLeft size={14} /> Journal
                </Link>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-8">
                    <BookOpen size={13} /> Artículo completo próximamente
                </div>
                <p className="text-gray-500 leading-relaxed">Este artículo está en proceso de publicación. Visita pronto para leer el contenido completo sobre este tema de la Sierra Tarahumara.</p>
            </section>
        </>
    )
}
