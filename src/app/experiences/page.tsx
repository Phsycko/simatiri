import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { PageHero } from '@/components/ui/PageHero'
import { prisma } from '@/lib/db/prisma'
import { TourTarahumaraCard } from '@/components/experiences/TourTarahumaraCard'
import { TourBarrancasDelCobreCard } from '@/components/experiences/TourBarrancasDelCobreCard'
import { TourBasaseachiCard } from '@/components/experiences/TourBasaseachiCard'
import { TourMenonitasCard } from '@/components/experiences/TourMenonitasCard'
import { TourRecowataCard } from '@/components/experiences/TourRecowataCard'
import { TourGuachochiYKokoyomeCard } from '@/components/experiences/TourGuachochiYKokoyomeCard'
import { TourCerocahuiCard } from '@/components/experiences/TourCerocahuiCard'
import { TourMaguarichiCard } from '@/components/experiences/TourMaguarichiCard'
import { HikingBarrancasCard } from '@/components/experiences/HikingBarrancasCard'
import { BuceoMarCortesCard } from '@/components/experiences/BuceoMarCortesCard'
import { GenericExperienceCard } from '@/components/experiences/GenericExperienceCard'
import { buildShareMeta } from '@/lib/metadata'
import { LOCALE_COOKIE, getLocaleFromCookie, getT } from '@/lib/i18n'

const title = 'Experiencias y Tours | Simatiri Experience'
const description = 'Tours y experiencias auténticas en la Sierra Tarahumara: Barrancas del Cobre, Tour Tarahumara, Basaseachi, Menonitas y más.'

export const metadata: Metadata = {
  title,
  description,
  ...buildShareMeta({ title, description, pathname: '/experiences' }),
}

const hikingPlaceholder = {
  id: 'hiking-barrancas',
  title: 'Hiking en Barrancas del Cobre',
  durationHours: 8,
  destination: { name: 'Barrancas del Cobre' },
  tierPrices: [
    { id: 'hp1', minPax: 1, maxPax: 10, pricePerPerson: 5000 },
  ],
  description: 'Vive la sierra a pie: senderos entre cañones, miradores de vértigo y silencio solo roto por el viento.',
}
const buceoPlaceholder = {
  id: 'buceo-mar-cortes',
  title: 'Buceo en el Mar de Cortés',
  durationHours: 6,
  destination: { name: 'Los Mochis' },
  tierPrices: [
    { id: 'bp1', minPax: 1, maxPax: 10, pricePerPerson: 5500 },
  ],
  description: 'Explora el acuario del mundo: salida desde el puerto de Topolobampo hacia aguas del Mar de Cortés.',
}

/** Fallback cuando la BD no está disponible (ej. Vercel sin DATABASE_URL). 10 experiencias como en localhost. */
const fallbackTours = [
  {
    id: 1,
    title: 'Tour Tarahumara',
    durationHours: 5,
    destination: { name: 'Creel Pueblo Mágico' },
    description: 'Lugares: Cueva Tarahumara (contacto cultural), Piedra del Elefante (formaciones rocosas), Lago de Arareco, Cascada de Cusárare, Misión Cusárare',
    tierPrices: [
      { id: 1, minPax: 1, maxPax: 2, pricePerPerson: 800 },
      { id: 2, minPax: 3, maxPax: 5, pricePerPerson: 695 },
      { id: 3, minPax: 6, maxPax: 10, pricePerPerson: 595 },
    ],
  },
  {
    id: 2,
    title: 'Tour Barrancas del Cobre',
    durationHours: 5,
    destination: { name: 'Barrancas del Cobre' },
    description: 'Lugares: Estación CHEPE, Mirador Piedra Volada, Puente colgante, Parque Aventura Barrancas',
    tierPrices: [
      { id: 4, minPax: 1, maxPax: 2, pricePerPerson: 800 },
      { id: 5, minPax: 3, maxPax: 5, pricePerPerson: 695 },
      { id: 6, minPax: 6, maxPax: 10, pricePerPerson: 595 },
    ],
  },
  {
    id: 3,
    title: 'Tour Basaseachi',
    durationHours: 10,
    destination: { name: 'Basaseachi' },
    description: 'Lugares: Cascada Basaseachi, Mirador San Lorenzo, Cañón Candameña',
    tierPrices: [
      { id: 7, minPax: 1, maxPax: 2, pricePerPerson: 1500 },
      { id: 8, minPax: 3, maxPax: 5, pricePerPerson: 1300 },
      { id: 9, minPax: 6, maxPax: 10, pricePerPerson: 1000 },
    ],
  },
  {
    id: 4,
    title: 'Tour Menonitas',
    durationHours: 6,
    destination: { name: 'Cuauhtémoc' },
    description: 'Lugares: Campos menonitas, queserías, museo y cultura menonita en la región.',
    tierPrices: [
      { id: 10, minPax: 1, maxPax: 2, pricePerPerson: 1100 },
      { id: 11, minPax: 3, maxPax: 5, pricePerPerson: 950 },
      { id: 12, minPax: 6, maxPax: 10, pricePerPerson: 850 },
    ],
  },
  {
    id: 5,
    title: 'Tour Recowata',
    durationHours: 10,
    destination: { name: 'Creel' },
    description: 'Lugares: Recowata, termas y paisaje serrano.',
    tierPrices: [
      { id: 13, minPax: 1, maxPax: 2, pricePerPerson: 400 },
      { id: 14, minPax: 3, maxPax: 5, pricePerPerson: 350 },
      { id: 15, minPax: 6, maxPax: 10, pricePerPerson: 300 },
    ],
  },
  {
    id: 6,
    title: 'Tour Guachochi y Kokoyome',
    durationHours: 12,
    destination: { name: 'Guachochi' },
    description: 'Lugares: Guachochi, Kokoyome, cascadas y comunidades Rarámuri.',
    tierPrices: [
      { id: 16, minPax: 1, maxPax: 2, pricePerPerson: 2000 },
      { id: 17, minPax: 3, maxPax: 5, pricePerPerson: 1800 },
      { id: 18, minPax: 6, maxPax: 10, pricePerPerson: 1600 },
    ],
  },
  {
    id: 7,
    title: 'Tour Cerocahui y Mirador del Gallego',
    durationHours: 10,
    destination: { name: 'Cerocahui' },
    description: 'Lugares: Cerocahui, Mirador del Gallego, viñedos y misión.',
    tierPrices: [
      { id: 19, minPax: 1, maxPax: 2, pricePerPerson: 1300 },
      { id: 20, minPax: 3, maxPax: 5, pricePerPerson: 1150 },
      { id: 21, minPax: 6, maxPax: 10, pricePerPerson: 1000 },
    ],
  },
  {
    id: 8,
    title: 'Tour Maguarichi y los Géisers de Chihuahua',
    durationHours: 10,
    destination: { name: 'Maguarichi' },
    description: 'Lugares: Maguarichi, géisers y paisaje único.',
    tierPrices: [
      { id: 22, minPax: 1, maxPax: 2, pricePerPerson: 1500 },
      { id: 23, minPax: 3, maxPax: 5, pricePerPerson: 1300 },
      { id: 24, minPax: 6, maxPax: 10, pricePerPerson: 1100 },
    ],
  },
  hikingPlaceholder,
  buceoPlaceholder,
]

export default async function ExperiencesPage() {
  const cookieStore = await cookies()
  const locale = getLocaleFromCookie(cookieStore.get(LOCALE_COOKIE)?.value)
  const t = getT(locale)

  let tours: Array<{
    id: number | string
    title: string
    durationHours: number
    destination: { name: string }
    tierPrices: Array<{ id: number | string; minPax?: number; maxPax?: number; pricePerPerson: number }>
    description?: string | null
  }>
  try {
    const data = await prisma.tour.findMany({
      include: {
        destination: true,
        tierPrices: { orderBy: { minPax: 'asc' } },
      },
    })
    tours = data
  } catch (_err) {
    tours = fallbackTours
  }

  const hasHiking = tours.some((tour: any) =>
    tour.title === 'Hiking en Barrancas del Cobre' || tour.title === 'Hiking Barrancas del Cobre'
  )
  const hasBuceo = tours.some((tour: any) =>
    tour.title === 'Buceo en el Mar de Cortés' || tour.title === 'Buceo Mar de Cortés'
  )

  const toursToShow = [
    ...tours,
    ...(hasHiking ? [] : [hikingPlaceholder]),
    ...(hasBuceo ? [] : [buceoPlaceholder]),
  ]

    return (
        <>
            <PageHero
                title={t('experiences.heroTitle')}
                subtitle={t('experiences.heroSubtitle')}
                size="md"
                backgroundImage="/images/heroes/experiencias-hero.jpg"
                overlay="linear-gradient(rgba(0,0,0,0.38), rgba(0,0,0,0.42))"
            />

            <section className="w-full bg-[#FFF8F5]">
                <div className="py-20 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {toursToShow.map((tour: any) => {
                        if (tour.title === 'Tour Tarahumara') {
                            return <TourTarahumaraCard key={tour.id} tour={tour} />
                        }
                        if (tour.title === 'Tour Barrancas del Cobre') {
                            return <TourBarrancasDelCobreCard key={tour.id} tour={tour} />
                        }
                        if (tour.title === 'Tour Basaseachi') {
                            return <TourBasaseachiCard key={tour.id} tour={tour} />
                        }
                        if (tour.title === 'Tour Menonitas') {
                            return <TourMenonitasCard key={tour.id} tour={tour} />
                        }
                        if (tour.title === 'Tour Recowata') {
                            return <TourRecowataCard key={tour.id} tour={tour} />
                        }
                        if (tour.title === 'Tour Guachochi y Kokoyome') {
                            return <TourGuachochiYKokoyomeCard key={tour.id} tour={tour} />
                        }
                        if (tour.title === 'Tour Cerocahui' || tour.title === 'Tour Cerocahui y Mirador del Gallego') {
                            return <TourCerocahuiCard key={tour.id} tour={tour} />
                        }
                        if (tour.title === 'Tour Maguarichi' || tour.title === 'Tour Maguarichi y los Géisers de Chihuahua') {
                            return <TourMaguarichiCard key={tour.id} tour={tour} />
                        }
                        if (tour.title === 'Hiking en Barrancas del Cobre' || tour.title === 'Hiking Barrancas del Cobre') {
                            return <HikingBarrancasCard key={tour.id} tour={tour} />
                        }
                        if (tour.title === 'Buceo en el Mar de Cortés' || tour.title === 'Buceo Mar de Cortés') {
                            return <BuceoMarCortesCard key={tour.id} tour={tour} />
                        }

                        return <GenericExperienceCard key={tour.id} tour={tour} />
                    })}
                </div>
            </section>
        </>
    )
}
