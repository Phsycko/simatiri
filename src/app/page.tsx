import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Train, Star, MapPin, Users } from 'lucide-react'
import { prisma } from '@/lib/db/prisma'
import RouteExperienceSection from '@/components/home/RouteExperienceSection'
import { TourTarahumaraHomeCard } from '@/components/home/TourTarahumaraHomeCard'
import { TourBarrancasDelCobreHomeCard } from '@/components/home/TourBarrancasDelCobreHomeCard'
import { TourBasaseachiHomeCard } from '@/components/home/TourBasaseachiHomeCard'
import { TourMenonitasHomeCard } from '@/components/home/TourMenonitasHomeCard'
import { TourRecowataHomeCard } from '@/components/home/TourRecowataHomeCard'
import { TourGuachochiYKokoyomeHomeCard } from '@/components/home/TourGuachochiYKokoyomeHomeCard'
import { TourCerocahuiHomeCard } from '@/components/home/TourCerocahuiHomeCard'
import { TourMaguarichiHomeCard } from '@/components/home/TourMaguarichiHomeCard'

export const metadata: Metadata = {
  title: 'SIMATIRI EXPERIENCE | Operadora Turística en las Barrancas del Cobre',
  description: 'Operadora turística certificada en Creel y la Sierra Tarahumara. Paquetes CHEPE, tours y hoteles en el norte de México.',
}

const highlights = [
  { icon: Train, label: 'Tren CHEPE', sub: 'Express y Regional' },
  { icon: MapPin, label: '10 Destinos', sub: 'Sierra Tarahumara' },
  { icon: Star, label: 'Certificados', sub: 'RNT: 0108009be33c3' },
  { icon: Users, label: 'Agencias B2B', sub: 'Tarifas Preferenciales' },
]

export default async function HomePage() {
  const packages = await prisma.package.findMany({
    include: { prices: { where: { occupancyType: 'DOBLE', isUpgrade: false } } },
    orderBy: { id: 'asc' },
    take: 3,
  })

  const tours = await prisma.tour.findMany({
    include: { tierPrices: { orderBy: { minPax: 'asc' }, take: 1 } },
    take: 3,
  })

  return (
    <div className="flex flex-col w-full">

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#071422]"
      >
        <Image
          src="/images/hero-background-drive.png"
          alt="Sierra Tarahumara"
          fill
          priority
          sizes="100vw"
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/55 pointer-events-none z-10" />
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] z-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }}
        />
        {/* Top white fade for smooth navbar transition */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 10%, rgba(255,255,255,0.7) 18%, rgba(255,255,255,0.4) 28%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0) 55%)'
          }}
        />
        {/* Bottom fade (Elegant forest green) */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 70%, rgba(10,35,22,0.55) 85%, rgba(4,18,12,0.92) 100%)'
          }}
        />

        <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white/70 text-xs uppercase tracking-widest font-medium mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B4B2A]" />
            Operadora Turística Certificada · Creel, Chihuahua
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[1.05] tracking-tight">
            La Sierra Tarahumara,<br />
            <span className="italic text-white/80">a tu alcance.</span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mb-12 leading-relaxed">
            Especialistas en el Tren CHEPE, Barrancas del Cobre y la cultura Rarámuri.
            Diseñamos cada viaje con precisión, carácter y autenticidad.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 bg-[#7B4B2A] hover:bg-[#8B5A36] active:bg-[#6A3F23] text-[#FFFFFF] text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-[250ms] ease-in-out shadow-none border-none"
            >
              Ver Paquetes <ArrowRight size={16} />
            </Link>
            <Link
              href="/tailor-made-trip"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/25 hover:bg-white/20 text-white text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              Cotizar Viaje
            </Link>
          </div>
        </div>

        {/* Highlights Strip */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {highlights.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-4 px-6 md:px-8 py-6">
                <Icon size={20} className="text-[#7B4B2A] shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-white text-sm font-semibold">{label}</p>
                  <p className="text-white/50 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RUTA CHEPE INTERACTIVA */}
      <RouteExperienceSection />

      {/* PAQUETES SECTION */}
      <section className="py-28 px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-3">Paquetes Estelares</div>
            <h2 className="font-serif text-4xl text-[#0a192f]">Rutas completas en el CHEPE</h2>
          </div>
          <Link href="/packages" className="mt-6 md:mt-0 text-sm font-medium text-[#0a192f] border-b border-[#0a192f] pb-0.5 hover:text-[#7B4B2A] hover:border-[#7B4B2A] transition-colors flex items-center gap-2">
            Ver todos los paquetes <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg: any) => (
            <Link
              href={(() => {
                const hrefMap: Record<number, string> = {
                  1: '/packages/paquete-1', 2: '/packages/paquete-2',
                  3: '/packages/paquete-3', 4: '/packages/paquete-4',
                  5: '/packages/paquete-5', 6: '/packages/paquete-6',
                  7: '/packages/paquete-7', 8: '/packages/paquete-8',
                  9: '/packages/paquete-9', 10: '/packages/paquete-10',
                  11: '/packages/paquete-11', 12: '/packages/paquete-12',
                  13: '/packages/paquete-13', 14: '/packages/paquete-14',
                  15: '/packages/paquete-15', 16: '/packages/paquete-16',
                  17: '/packages/paquete-17',
                }
                return hrefMap[pkg.id] ?? `/packages/${pkg.id}`
              })()}
              key={pkg.id}
              className="group"
            >
              <div
                className={pkg.id === 1 || pkg.title.toLowerCase().includes('paquete 1') || pkg.id === 2 || pkg.title.toLowerCase().includes('paquete 2') || pkg.id === 3 || pkg.title.toLowerCase().includes('paquete 3') ? "aspect-[4/3] rounded-2xl overflow-hidden relative mb-5" : "aspect-[4/3] bg-gradient-to-br from-[#2e4a3d] to-[#0a192f] rounded-2xl overflow-hidden relative mb-5"}
              >
                {(pkg.id === 1 || pkg.title.toLowerCase().includes('paquete 1')) && (
                  <>
                    <Image src="/images/paquetes/paquete-1-hero.jpg" alt={pkg.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-black/55 pointer-events-none" />
                  </>
                )}
                {(pkg.id === 2 || pkg.title.toLowerCase().includes('paquete 2')) && (
                  <>
                    <Image src="/images/packages/package-2.jpg" alt={pkg.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-black/55 pointer-events-none" />
                  </>
                )}
                {(pkg.id === 3 || pkg.title.toLowerCase().includes('paquete 3')) && (
                  <>
                    <Image src="/images/packages/package-3.jpg" alt={pkg.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-black/55 pointer-events-none" />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity group-hover:opacity-90" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-[10px] text-[#7B4B2A] uppercase tracking-widest font-semibold">{pkg.trainClass}</span>
                  <h3 className="font-serif text-white text-xl mt-1">{pkg.title}</h3>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{pkg.durationDays} Días</span>
                <span className="font-semibold text-[#0a192f]">
                  Desde ${pkg.prices[0]?.pricePerPerson?.toLocaleString()} MXN
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TOURS SECTION */}
      <section className="py-28 bg-[#f8f9fa] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-3">Experiencias</div>
              <h2 className="font-serif text-4xl text-[#0a192f]">Tours y Vivencias Únicas</h2>
            </div>
            <Link href="/experiences" className="mt-6 md:mt-0 text-sm font-medium text-[#0a192f] border-b border-[#0a192f] pb-0.5 hover:text-[#7B4B2A] hover:border-[#7B4B2A] transition-colors flex items-center gap-2">
              Ver todas las experiencias <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tours.map((tour: any) => {
              if (tour.title === 'Tour Tarahumara') {
                return <TourTarahumaraHomeCard key={tour.id} tour={tour} />
              }
              if (tour.title === 'Tour Barrancas del Cobre') {
                return <TourBarrancasDelCobreHomeCard key={tour.id} tour={tour} />
              }
              if (tour.title === 'Tour Basaseachi') {
                return <TourBasaseachiHomeCard key={tour.id} tour={tour} />
              }
              if (tour.title === 'Tour Menonitas') {
                return <TourMenonitasHomeCard key={tour.id} tour={tour} />
              }
              if (tour.title === 'Tour Recowata') {
                return <TourRecowataHomeCard key={tour.id} tour={tour} />
              }
              if (tour.title === 'Tour Guachochi y Kokoyome') {
                return <TourGuachochiYKokoyomeHomeCard key={tour.id} tour={tour} />
              }
              if (tour.title === 'Tour Cerocahui' || tour.title === 'Tour Cerocahui y Mirador del Gallego') {
                return <TourCerocahuiHomeCard key={tour.id} tour={tour} />
              }
              if (tour.title === 'Tour Maguarichi' || tour.title === 'Tour Maguarichi y los Géisers de Chihuahua') {
                return <TourMaguarichiHomeCard key={tour.id} tour={tour} />
              }

              return (
                <Link href={`/experiences/${tour.id}`} key={tour.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-[#0a192f] to-[#2e4a3d] relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin className="text-white/20" size={48} strokeWidth={1} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-[#0a192f] mb-2 group-hover:text-[#2e4a3d] transition-colors">{tour.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{tour.durationHours} Horas de experiencia</p>
                    <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                      <span className="text-xs text-gray-400">Por persona</span>
                      <span className="font-bold text-[#7B4B2A]">
                        Desde ${tour.tierPrices[0]?.pricePerPerson?.toLocaleString()} MXN
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA AGENCIAS */}
      <section className="py-28 px-8">
        <div className="max-w-5xl mx-auto bg-[#261510] rounded-3xl p-12 md:p-20 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7B4B2A]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-4">Para Agencias de Viaje</div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Convenio corporativo<br />con beneficios reales.</h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Tarifas preferenciales, early check-in, desayuno incluido y facturación personalizada.
              Vigente hasta febrero 2027.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about" className="inline-flex items-center gap-2 bg-[#7B4B2A] hover:bg-[#8B5A36] active:bg-[#6A3F23] text-[#FFFFFF] text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-[250ms] ease-in-out shadow-none border-none">
                Conocer el Convenio <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-all">
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
