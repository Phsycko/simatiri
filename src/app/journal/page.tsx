import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { buildShareMeta } from '@/lib/metadata'

const title = 'Journal | Simatiri Experience'
const description = 'Guías de viaje, consejos e historias desde la Sierra Tarahumara. Todo sobre Creel, Barrancas del Cobre, el Tren CHEPE y la cultura Rarámuri.'

export const metadata: Metadata = {
  title,
  description,
  ...buildShareMeta({ title, description, pathname: '/journal' }),
}

const articles = [
    {
        slug: 'guia-completa-barrancas-del-cobre',
        category: 'Guía de Viaje',
        title: 'Guía completa para visitar las Barrancas del Cobre',
        excerpt: 'Todo lo que necesitas saber: cuándo ir, qué llevar, cómo llegar, qué tours hacer y qué hoteles elegir en la región.',
        readTime: '8 min',
        date: 'Marzo 2026',
    },
    {
        slug: 'chepe-express-vs-regional',
        category: 'Transport',
        title: 'CHEPE Express vs Regional: ¿Cuál elegir para tu viaje?',
        excerpt: 'Comparativa honesta entre las dos clases del tren más espectacular de México. Precios, rutas, paradas y experiencia a bordo.',
        readTime: '5 min',
        date: 'Febrero 2026',
    },
    {
        slug: 'cultura-raramuri-sierra-tarahumara',
        category: 'Cultura',
        title: 'La cultura Rarámuri: todo lo que debes saber antes de ir',
        excerpt: 'Los Tarahumara son uno de los pueblos indígenas más fascinantes de México. Qué esperar, cómo comportarte y cómo contribuir de forma responsable.',
        readTime: '6 min',
        date: 'Enero 2026',
    },
    {
        slug: 'qué-llevar-creel-chihuahua',
        category: 'Consejos',
        title: 'Qué llevar si viajas a Creel: lista completa por temporada',
        excerpt: 'El clima en la Sierra Tarahumara puede sorprenderte. Prep lista con equipaje esencial para verano, otoño, invierno y primavera.',
        readTime: '4 min',
        date: 'Enero 2026',
    },
    {
        slug: 'cascada-basaseachi-chihuahua',
        category: 'Destinos',
        title: 'Cascada Basaseachi: la caída de agua más impresionante del norte',
        excerpt: 'Con 246 metros de caída libre, Basaseachi es uno de los destinos más épicos y menos fotografiados de la Sierra.',
        readTime: '5 min',
        date: 'Diciembre 2025',
    },
    {
        slug: 'temporada-alta-sierra-tarahumara',
        category: 'Planificación',
        title: 'Temporada Alta en la Sierra: diciembre a febrero',
        excerpt: 'La sierra nevada en invierno es un espectáculo único. Guía para aprovechar al máximo la temporada alta sin gastar de más.',
        readTime: '5 min',
        date: 'Diciembre 2025',
    },
]

export default function JournalPage() {
    return (
        <>
            <PageHero
                label="Journal"
                title="Historias y Guías de la Sierra"
                subtitle="Contenido editorial sobre la Sierra Tarahumara, el Tren CHEPE y las Barrancas del Cobre. Escrito por quienes operan aquí."
                size="md"
            />

            <section className="py-20 px-8 max-w-7xl mx-auto">
                {/* Featured Article */}
                <div className="mb-6">
                    <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Artículo Destacado</span>
                </div>
                <Link href={`/journal/${articles[0].slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#0a192f] rounded-3xl overflow-hidden mb-16">
                    <div className="aspect-[4/3] lg:aspect-auto bg-gradient-to-br from-[#2e4a3d] to-[#0a192f] min-h-[280px]" />
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                        <span className="text-[10px] text-[#7B4B2A] uppercase tracking-widest font-semibold mb-3">{articles[0].category}</span>
                        <h2 className="font-serif text-3xl text-white mb-4 group-hover:text-[#e5d3b3] transition-colors">{articles[0].title}</h2>
                        <p className="text-white/60 text-base leading-relaxed mb-6">{articles[0].excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-white/40">
                            <span>{articles[0].date} · {articles[0].readTime} lectura</span>
                            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-[#7B4B2A]" />
                        </div>
                    </div>
                </Link>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.slice(1).map((article) => (
                        <Link key={article.slug} href={`/journal/${article.slug}`} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                            <div className="aspect-video bg-gradient-to-br from-[#1a2942] to-[#2e4a3d]" />
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] text-[#7B4B2A] uppercase tracking-widest font-semibold">{article.category}</span>
                                    <span className="text-xs text-gray-400">{article.readTime}</span>
                                </div>
                                <h3 className="font-serif text-lg text-[#0a192f] mb-2 group-hover:text-[#2e4a3d] transition-colors leading-snug">{article.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{article.excerpt}</p>
                                <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                                    <BookOpen size={12} />
                                    {article.date}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}
