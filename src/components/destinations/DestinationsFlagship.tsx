"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, MapPin, Compass, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'

// Modal editorial data per destination (slug)
type ModalData = {
    subtitle: string
    intro: string
    whyGo: string[]
    highlights: string[]
    keyPlaces: string[]
    bestSeason: { when: string; climate: string; expect: string }
    travelerProfile: {
        experienceType: string
        travelerProfile: string
        suggestedStay: string
        culturalLevel: string
        landscapeType: string
        role: string
    }
    cta: { primary: string; secondary: string }
}

const destinationModalData: Record<string, ModalData> = {
    'creel': {
        subtitle: 'Campamento base del corazón de la Sierra',
        intro: 'Creel late en el centro mismo de la Sierra Tarahumara: un pueblo de madera y piedra donde el tiempo se mide en rutas y en historias Rarámuri. Aquí no se pasa de largo; aquí se establece base para adentrarse en bosques de pinos infinitos, valles de hongos y ranas petrificadas, y en la presencia viva de una cultura que ha resistido siglos. Es el punto de partida perfecto para quien busca profundidad, no solo postales.',
        whyGo: ['Puerta de entrada natural a la Sierra Tarahumara', 'Conexión auténtica con comunidades Rarámuri', 'Naturaleza monumental a minutos del pueblo', 'Logística estratégica para rutas hacia Divisadero y Barrancas', 'Experiencias icónicas: Valle de los Hongos, Arareco, misiones'],
        highlights: ['Paisajes de bosque y valles rocosos', 'Cultura Rarámuri viva', 'Gastronomía local y artesanías', 'Aventura suave a intensa', 'Miradores y lagos', 'Base para tours al CHEPE y Barrancas'],
        keyPlaces: ['Lago de Arareco', 'Valle de los Hongos', 'Valle de las Ranas', 'Cueva Tarahumara', 'Misión de San Ignacio', 'Conexión hacia Divisadero y Barrancas del Cobre'],
        bestSeason: { when: 'Todo el año; otoño y primavera óptimos.', climate: 'Templado de montaña; noches frías en invierno.', expect: 'Verano lluvioso y verde; invierno seco y cielos claros.' },
        travelerProfile: { experienceType: 'Naturaleza y cultura', travelerProfile: 'Viajero curioso, familias, parejas, aventureros moderados', suggestedStay: '2–4 noches como base', culturalLevel: 'Alta — encuentro directo con comunidades', landscapeType: 'Bosque de pino, valles rocosos, lagos', role: 'Base operativa principal' },
        cta: { primary: 'Ver paquetes relacionados', secondary: 'Hablar con un asesor' }
    },
    'barrancas-del-cobre': {
        subtitle: 'El epicentro indiscutible de la aventura en México',
        intro: 'Las Barrancas del Cobre no son un solo lugar: son un sistema de cañones que multiplica la escala humana hasta volverla insignificante. Aquí la tierra se abre en abismos de más de mil metros, el tren serpentea por las laderas y la aventura — tirolesas, trekking, miradores — se vive con una intensidad que pocos destinos en el mundo pueden igualar. Es naturaleza pura, salvaje y monumental.',
        whyGo: ['Uno de los sistemas de cañones más grandes del mundo', 'Experiencias de aventura de nivel internacional', 'Vistas que redefinen la idea de paisaje', 'Cruce del CHEPE y teleférico como experiencias únicas', 'Conexión con Divisadero, Creel y la Sierra'],
        highlights: ['Cañones y abismos', 'Teleférico y tren', 'Aventura extrema y moderada', 'Fotografía y miradores', 'Naturaleza virgen', 'Tours organizados desde Creel y Divisadero'],
        keyPlaces: ['Mirador del Parque de Aventura', 'Teleférico Barrancas', 'Trazado del Tren CHEPE', 'Sistema de cañones Urique–Tararecua', 'Puntos de tirolesa y rappel', 'Vistas hacia la Barranca del Cobre'],
        bestSeason: { when: 'Otoño a primavera; evitar lluvias intensas de verano.', climate: 'Variable según altura; fresco en altos, cálido en fondo de barranca.', expect: 'Cielos despejados en temporada seca; verde intenso tras lluvias.' },
        travelerProfile: { experienceType: 'Aventura y naturaleza extrema', travelerProfile: 'Aventureros, fotógrafos, parejas activas', suggestedStay: '1–3 noches según circuito', culturalLevel: 'Media — paisaje y experiencia física primero', landscapeType: 'Cañones, abismos, bosque', role: 'Destino estrella del circuito' },
        cta: { primary: 'Ver paquetes relacionados', secondary: 'Explorar experiencias desde aquí' }
    },
    'divisadero': {
        subtitle: 'El mirador icónico del Tren CHEPE y el vacío del teleférico',
        intro: 'Divisadero es el instante en que el viaje se detiene ante el abismo: tres barrancas convergen a tus pies y el silencio solo lo rompe el viento. El teleférico cruza el vacío entre riscos; el tren hace su parada obligada. Aquí la experiencia es puramente visual y sensorial — una inmersión en la escala brutal de la Sierra, con infraestructura premium que no le resta autenticidad al lugar.',
        whyGo: ['Vista de las Tres Barrancas en un solo punto', 'Teleférico más largo de Latinoamérica', 'Parada emblemática del Tren CHEPE', 'Fotografía y atardeceres inolvidables', 'Acceso directo a aventura y tranquilidad'],
        highlights: ['Miradores panorámicos', 'Teleférico', 'Fotografía y paisaje', 'Cultura y artesanía local', 'Atardeceres', 'Conectividad con Creel y Barrancas'],
        keyPlaces: ['Mirador de las Tres Barrancas', 'Estación del Tren CHEPE', 'Teleférico Barrancas', 'Pueblo de Divisadero', 'Vista a Urique y Tararecua', 'Senderos y puntos fotográficos'],
        bestSeason: { when: 'Todo el año; otoño y primavera con mejor luz.', climate: 'Fresco en la altura; soleado la mayor parte del año.', expect: 'Niebla matutina posible; tardes despejadas ideales para fotografía.' },
        travelerProfile: { experienceType: 'Panorámico y aventura suave', travelerProfile: 'Todos los perfiles; imprescindible para quien hace el CHEPE', suggestedStay: '1–2 noches', culturalLevel: 'Media — impacto visual y experiencia del tren', landscapeType: 'Cañones, miradores, vacío', role: 'Punto panorámico y conexión' },
        cta: { primary: 'Ver paquetes relacionados', secondary: 'Cotizar viaje' }
    },
    'el-fuerte': {
        subtitle: 'Umbral colonial antes del ascenso épico a la Sierra',
        intro: 'El Fuerte es el prólogo perfecto al viaje: un Pueblo Mágico donde la arquitectura colonial y el rumor del Río Fuerte cuentan siglos de historia. Aquí se siente aún el paso de los conquistadores y el legado de las culturas originarias. Es el punto de partida occidental del Tren CHEPE para quien viene del mar; un lugar para respirar, caminar y preparar el espíritu antes de subir a la montaña.',
        whyGo: ['Pueblo Mágico con arquitectura colonial intacta', 'Punto de partida del CHEPE desde la costa', 'Río Fuerte y naturaleza ribereña', 'Historia y leyendas (El Zorro)', 'Gastronomía y tranquilidad'],
        highlights: ['Historia y arquitectura', 'Río y naturaleza', 'Gastronomía local', 'Danzas y tradiciones', 'Base para el CHEPE', 'Identidad colonial'],
        keyPlaces: ['Centro histórico y Plaza de Armas', 'Río Fuerte y malecón', 'Museo y edificios coloniales', 'Comunidades cercanas', 'Estación del Tren CHEPE', 'Miradores y alrededores'],
        bestSeason: { when: 'Invierno y primavera; evitar calor extremo de verano.', climate: 'Cálido; templado en invierno.', expect: 'Días soleados; noches agradables; ideal para caminata y fotografía.' },
        travelerProfile: { experienceType: 'Historia y naturaleza suave', travelerProfile: 'Culturales, familias, quienes inician ruta CHEPE', suggestedStay: '1–2 noches', culturalLevel: 'Alta — historia y patrimonio', landscapeType: 'Colonial, río, vegetación', role: 'Base de inicio de ruta' },
        cta: { primary: 'Ver paquetes relacionados', secondary: 'Hablar con un asesor' }
    },
    'los-mochis': {
        subtitle: 'Donde el Mar de Cortés encuentra el inicio del tren más asombroso',
        intro: 'Los Mochis es la puerta del Pacífico a la Sierra Tarahumara: una ciudad que vive del mar y del campo, con una gastronomía que atrae a viajeros de todo el país. Aquí empieza — o termina — el recorrido del CHEPE para quienes vienen de la costa. No es solo un punto logístico: es una oportunidad de mariscos frescos, ambiente portuario y la emoción de subir al tren rumbo a la montaña.',
        whyGo: ['Inicio o fin del Tren CHEPE desde la costa', 'Gastronomía de mar y tierra de primer nivel', 'Conectividad aérea y terrestre', 'Puerto Topolobampo y Mar de Cortés', 'Logística ideal para rutas Creel–Divisadero'],
        highlights: ['Mariscos y gastronomía', 'Puerto y playa', 'Tren CHEPE', 'Servicios y conectividad', 'Naturaleza costera', 'Base de operaciones'],
        keyPlaces: ['Centro y zona gastronómica', 'Puerto Topolobampo', 'Estación del CHEPE', 'Parques y malecón', 'Mercados locales', 'Conexión a El Fuerte y Sinaloa'],
        bestSeason: { when: 'Otoño a primavera; verano muy cálido.', climate: 'Cálido costero; humedad en temporada de lluvias.', expect: 'Sol y brisa la mayor parte del año; ideal para mariscos y salidas.' },
        travelerProfile: { experienceType: 'Gastronomía y logística', travelerProfile: 'Viajeros que inician/terminan ruta, amantes del mar', suggestedStay: '1 noche típica', culturalLevel: 'Media — ciudad y puerto', landscapeType: 'Costa, puerto, ciudad', role: 'Punto cero de ruta costera' },
        cta: { primary: 'Ver paquetes relacionados', secondary: 'Explorar experiencias desde aquí' }
    },
    'cerocahui': {
        subtitle: 'Refugio jesuita y viñedos en un valle escondido',
        intro: 'Cerocahui aparece como un secreto bien guardado: un valle rodeado de montañas donde una misión jesuita y viñedos de altura conviven con el silencio. Aquí la experiencia es de retiro e introspección — caminatas suaves, vistas al Cañón de Urique, vino local y la sensación de estar muy lejos del ruido del mundo. Es el destino para quien busca profundidad y calma.',
        whyGo: ['Misión jesuita y patrimonio histórico', 'Viñedos de altura y vino local', 'Vistas al Cañón de Urique desde el Mirador del Gallego', 'Tranquilidad y retiro', 'Acceso a Barrancas con menor flujo turístico'],
        highlights: ['Historia y misión', 'Vino y viñedos', 'Miradores al cañón', 'Senderismo suave', 'Cultura local', 'Estancia de retiro'],
        keyPlaces: ['Misión de Cerocahui', 'Mirador del Gallego', 'Viñedos locales', 'Valle de Cerocahui', 'Conexión a Urique', 'Senderos y miradores'],
        bestSeason: { when: 'Otoño a primavera; verano con lluvias.', climate: 'Templado de valle; noches frescas.', expect: 'Otoño ideal para viñedos; primavera verde y florida.' },
        travelerProfile: { experienceType: 'Cultura y naturaleza serena', travelerProfile: 'Viajeros en busca de calma, parejas, retiros', suggestedStay: '2–3 noches', culturalLevel: 'Alta — misión y vino', landscapeType: 'Valle, viñedos, cañón', role: 'Destino de estancia' },
        cta: { primary: 'Ver paquetes relacionados', secondary: 'Cotizar viaje' }
    },
    'basaseachi': {
        subtitle: 'Donde una de las cascadas más altas de México cae al abismo',
        intro: 'Basaseachi es naturaleza en estado puro: una cascada que se desploma desde más de 240 metros en un cañón de roca y bosque. El aire huele a pinos y humedad; los senderos llevan a miradores que quitan el aliento. No es un destino de paso: es una inmersión en el poder del agua y la piedra, con una oferta de senderismo y fotografía que exige tiempo y respeto.',
        whyGo: ['Cascada de Basaseachi, una de las más altas de México', 'Bosque de pino y paisaje de barranca', 'Senderismo y miradores espectaculares', 'Naturaleza virgen y bien conservada', 'Experiencia de un día o pernocte'],
        highlights: ['Cascada', 'Senderismo', 'Bosque y naturaleza', 'Fotografía', 'Aventura moderada', 'Paisaje monumental'],
        keyPlaces: ['Cascada de Basaseachi', 'Mirador superior e inferior', 'Senderos del parque', 'Bosque de Candameña', 'Conexión desde Creel o Chihuahua'],
        bestSeason: { when: 'Verano y otoño — mayor caudal; primavera también viable.', climate: 'Templado a fresco; lluvias en temporada.', expect: 'Cascada más impresionante con lluvias recientes; verano verde y húmedo.' },
        travelerProfile: { experienceType: 'Naturaleza y senderismo', travelerProfile: 'Aventureros moderados, familias activas, fotógrafos', suggestedStay: '1–2 noches', culturalLevel: 'Baja — protagonista es la naturaleza', landscapeType: 'Cascada, bosque, cañón', role: 'Destino de naturaleza' },
        cta: { primary: 'Ver paquetes relacionados', secondary: 'Hablar con un asesor' }
    },
    'guachochi': {
        subtitle: 'La metrópoli Rarámuri y la puerta a la Barranca de Sinforosa',
        intro: 'Guachochi es el corazón más auténtico de la Sierra Tarahumara: un lugar donde la cultura Rarámuri no es folclor, sino vida cotidiana. Desde aquí se accede a la imponente Barranca de Sinforosa y a comunidades que mantienen lengua, tradiciones y resistencia. Es un destino para viajeros que buscan verdadera profundidad cultural y paisajes que pocos llegan a conocer.',
        whyGo: ['Mayor concentración de población Rarámuri', 'Acceso a la Barranca de Sinforosa', 'Cultura viva y auténtica', 'Paisajes poco masificados', 'Experiencias de turismo comunitario'],
        highlights: ['Cultura Rarámuri', 'Barranca de Sinforosa', 'Turismo comunitario', 'Senderismo y aventura', 'Identidad originaria', 'Miradores remotos'],
        keyPlaces: ['Guachochi cabecera', 'Barranca de Sinforosa', 'Comunidades Rarámuri', 'Kokoyome y alrededores', 'Miradores y rutas', 'Misión y centros culturales'],
        bestSeason: { when: 'Marzo a noviembre; evitar frío extremo en invierno.', climate: 'Templado de altura; noches frías.', expect: 'Temporada seca ideal para caminatas; lluvias verano limitan algunas rutas.' },
        travelerProfile: { experienceType: 'Cultura originaria y aventura', travelerProfile: 'Viajeros conscientes, culturales, aventureros', suggestedStay: '2–4 noches', culturalLevel: 'Muy alta — inmersión Rarámuri', landscapeType: 'Sierra, barranca, comunidades', role: 'Destino de profundidad' },
        cta: { primary: 'Ver paquetes relacionados', secondary: 'Explorar experiencias desde aquí' }
    },
    'cuauhtemoc': {
        subtitle: 'Praderas Menonitas y la manzana del norte de México',
        intro: 'Cuauhtémoc sorprende: en medio del norte árido, colonias Menonitas mantienen un modo de vida que parece detenido en el tiempo. Quesos, manzanas, carretas y silencio. La región es además el gran productor de manzana del país. Aquí la experiencia es cultural y gastronómica — un contraste único con la Sierra y el desierto que lo rodean.',
        whyGo: ['Colonias Menonitas y cultura única', 'Gastronomía menonita (queso, embutidos)', 'Región manzanera más importante de México', 'Contraste con la Sierra y el desierto', 'Tranquilidad y seguridad'],
        highlights: ['Cultura Menonita', 'Gastronomía y mercados', 'Campos y praderas', 'Artesanía y productos locales', 'Fotografía y paisaje', 'Experiencia de contraste'],
        keyPlaces: ['Colonias Menonitas', 'Mercados y queserías', 'Campos manzaneros', 'Cuauhtémoc ciudad', 'Rutas de día', 'Conexión a Creel y Chihuahua'],
        bestSeason: { when: 'Todo el año; cosecha manzana en otoño.', climate: 'Seco y templado; inviernos fríos.', expect: 'Otoño ideal para cosecha y paisaje; primavera verde.' },
        travelerProfile: { experienceType: 'Cultura y gastronomía', travelerProfile: 'Culturales, familias, foodies', suggestedStay: '1–2 noches', culturalLevel: 'Alta — mundo Menonita', landscapeType: 'Praderas, campos, llanura', role: 'Destino de contraste' },
        cta: { primary: 'Ver paquetes relacionados', secondary: 'Cotizar viaje' }
    },
    'chihuahua': {
        subtitle: 'Capital señorial y arranque clásico hacia la Sierra',
        intro: 'Chihuahua es la ciudad que dio nombre al estado más grande de México: cantera, historia de la Revolución y haciendas que se pierden en el horizonte. Aquí Pancho Villa y la historia mexicana se palpan en cada edificio. Es el punto de partida oriental del Tren CHEPE y la base perfecta para quien quiere combinar ciudad, cultura y la subida épica a la Sierra Tarahumara.',
        whyGo: ['Capital histórica y arquitectura señorial', 'Cuna de la Revolución y museos', 'Punto de partida del CHEPE hacia la Sierra', 'Haciendas y rutas del desierto', 'Conectividad aérea y terrestre'],
        highlights: ['Historia y museos', 'Arquitectura y centro', 'Gastronomía norteña', 'Tren CHEPE', 'Haciendas y alrededores', 'Base de operaciones'],
        keyPlaces: ['Centro histórico', 'Museo de la Revolución (Quinta Gameros)', 'Catedral y Palacio de Gobierno', 'Haciendas (Quinta Carolina, etc.)', 'Estación del CHEPE', 'Mercado y gastronomía'],
        bestSeason: { when: 'Otoño y primavera; verano muy caliente.', climate: 'Desértico; inviernos fríos, veranos calurosos.', expect: 'Días despejados; noches frescas en otoño y primavera.' },
        travelerProfile: { experienceType: 'Historia y ciudad', travelerProfile: 'Culturales, familias, quienes inician ruta CHEPE', suggestedStay: '1–2 noches', culturalLevel: 'Alta — historia y arquitectura', landscapeType: 'Ciudad, desierto, llanura', role: 'Base de inicio de ruta' },
        cta: { primary: 'Ver paquetes relacionados', secondary: 'Hablar con un asesor' }
    }
}

const destinations = [
    {
        id: '01',
        name: 'Creel',
        slug: 'creel',
        region: 'Sierra Tarahumara (Central)',
        coordinates: '27.7523° N, 107.6358° W',
        altitude: '2,350 msnm',
        season: 'Todo el año',
        desc: 'El corazón latente de la Sierra. Campamento base para adentrarse en bosques antiguos, valles de formaciones milenarias y la herencia viva de la cultura Rarámuri.',
        highlight: 'Base de Expedición',
        image: '/images/destinations/creel.jpg',
        tags: ['Pueblo Mágico', 'Misticismo']
    },
    {
        id: '02',
        name: 'Barrancas del Cobre',
        slug: 'barrancas-del-cobre',
        region: 'Sistema de Cañones',
        coordinates: '27.5333° N, 107.7667° W',
        altitude: 'Variable - Abismo Profundo',
        season: 'Recomendado Otoño-Primavera',
        desc: 'Un laberinto de cañones que desafía toda escala humana. Es un reino salvaje, inmenso, el epicentro indiscutible de la aventura en México.',
        highlight: 'Cañones Monstruosos',
        image: '/images/destinations/barrancas-del-cobre.jpg',
        tags: ['Aventura Extrema', 'Monumental']
    },
    {
        id: '03',
        name: 'Divisadero',
        slug: 'divisadero',
        region: 'Circuito Barrancas',
        coordinates: '27.5338° N, 107.8252° W',
        altitude: '2,400 msnm',
        season: 'Todo el año',
        desc: 'Donde la tierra se desgarra majestuosa. El mirador icónico del Tren CHEPE y el cruce audaz del teleférico inmerso en la niebla y el vacío.',
        highlight: 'Punto Panorámico',
        image: '/images/destinations/divisadero.jpg',
        tags: ['Teleférico', 'Fotografía']
    },
    {
        id: '04',
        name: 'El Fuerte',
        slug: 'el-fuerte',
        region: 'Sinaloa Norte',
        coordinates: '26.4172° N, 108.6219° W',
        altitude: '90 msnm',
        season: 'Invierno y Primavera',
        desc: 'Elegancia colonial vibrante a las orillas de un río histórico. Es el umbral perfecto, un prólogo cálido antes del ascenso épico a la alta montaña.',
        highlight: 'Magia Colonial',
        image: 'https://drive.google.com/uc?export=view&id=1QBGJrkjDhMGm6IntVPA9QvnAsa9FZer3',
        tags: ['Historia', 'Pueblo Mágico']
    },
    {
        id: '05',
        name: 'Los Mochis',
        slug: 'los-mochis',
        region: 'Costa Pacífico N.O.',
        coordinates: '25.7928° N, 108.9895° W',
        altitude: '10 msnm',
        season: 'Otoño a Primavera',
        desc: 'Donde el Mar de Cortés besa la tierra, dando inicio (o fin) a la vía férrea más asombrosa de Latinoamérica. Un polo de riqueza gastronómica y portuaria.',
        highlight: 'Puerto y Tren',
        image: 'https://drive.google.com/uc?export=view&id=1EInQ_98ctAvzH6r9A2ZOrIvbKu1rWlnR',
        tags: ['Mariscos', 'Punto Cero']
    },
    {
        id: '06',
        name: 'Cerocahui',
        slug: 'cerocahui',
        region: 'Valle Escóndido (Urique)',
        coordinates: '27.3197° N, 108.0264° W',
        altitude: '1,600 msnm',
        season: 'Otoño - Primavera',
        desc: 'Un remoto valle abrazado por montañas, resguardando una antigua misión jesuita y viñedos centenarios de altura. Un refugio de introspección absoluta.',
        highlight: 'Retiro Jesuita',
        image: 'https://drive.google.com/uc?export=view&id=1vsOkfb6amo6YEAnEG6BRFNh5K8ecjDQu',
        tags: ['Vino', 'Mirador del Gallego']
    },
    {
        id: '07',
        name: 'Basaseachi',
        slug: 'basaseachi',
        region: 'Altos de Candameña',
        coordinates: '28.1878° N, 108.2148° W',
        altitude: '2,100 msnm',
        season: 'Verano y Otoño (Lluvias)',
        desc: 'Una grieta brutal en la piedra donde una de las cascadas más altas de México ruge al caer. Aire de bosque húmedo, pinos gigantes y senderos al abismo.',
        highlight: 'Naturaleza Colosal',
        image: 'https://drive.google.com/uc?export=view&id=1-yd2RnTEhrhOgzmHUWPhBQdEbGoGirUw',
        tags: ['Senderismo', 'Cascada']
    },
    {
        id: '08',
        name: 'Guachochi',
        slug: 'guachochi',
        region: 'Alta Sierra Tarahumara',
        coordinates: '26.8197° N, 107.0675° W',
        altitude: '2,280 msnm',
        season: 'Ideal Marzo-Noviembre',
        desc: 'La verdadera metrópoli Rarámuri. Entre sus cumbres y barrancas se esconde Sinforosa y la mística de Kokoyome, una tierra puramente originaria.',
        highlight: 'Cultura Originaria',
        image: 'https://drive.google.com/uc?export=view&id=13v4cPXbF_m0g7Xw9l99k0CIjxyQaUBPE',
        tags: ['Rutas Indígenas', 'Aislamiento']
    },
    {
        id: '09',
        name: 'Cuauhtémoc',
        slug: 'cuauhtemoc',
        region: 'Llanos Menonitas',
        coordinates: '28.4069° N, 106.8653° W',
        altitude: '2,040 msnm',
        season: 'Todo el año',
        desc: 'El encuentro surrealista de las praderas. Aquí, la asombrosa paz de las colonias Menonitas convive con la vasta región manzanera más grande del país.',
        highlight: 'Corredor Cultural',
        image: 'https://drive.google.com/uc?export=view&id=1SvD1FAN2zEL7BOdD3enpED0ZFEEbBfqo',
        tags: ['Gastronomía Menonita', 'Mestizaje']
    },
    {
        id: '10',
        name: 'Chihuahua',
        slug: 'chihuahua',
        region: 'Desierto y Llanura',
        coordinates: '28.6320° N, 106.0691° W',
        altitude: '1,420 msnm',
        season: 'Otoño y Primavera',
        desc: 'El corazón señorial del norte. Ciudad de cantera, ecos de la Revolución y haciendas inmensas. El arranque clásico para cruzar la gran Sierra.',
        highlight: 'Capital Histórica',
        image: 'https://drive.google.com/uc?export=view&id=1kV_Aolq398pBAjpdOOhHAA6cQGfKtzkD',
        tags: ['Orígenes', 'Arquitectura']
    },
]

export function DestinationsFlagship() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalDestinationIndex, setModalDestinationIndex] = useState(0)
    const active = destinations[activeIndex]

    const openModal = useCallback(() => {
        setModalDestinationIndex(activeIndex)
        setModalOpen(true)
    }, [activeIndex])

    const closeModal = useCallback(() => {
        setModalOpen(false)
    }, [])

    // Preload all minimal references gracefully
    useEffect(() => {
        const nextIdx = (activeIndex + 1) % destinations.length;
        const img = new window.Image();
        img.src = destinations[nextIdx].image;
    }, [activeIndex]);

    // ESC to close modal
    useEffect(() => {
        if (!modalOpen) return
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal()
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [modalOpen, closeModal]);

    // Lock body scroll when modal open
    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [modalOpen]);

    return (
        <section className="relative w-full h-[100svh] min-h-[800px] bg-[#11110F] overflow-hidden font-sans text-[#F4EFE7] selection:bg-[#B7925A]/20 flex flex-col lg:flex-row">

            {/* 1. STAGE / CINEMATIC BACKGROUND */}
            <div className="absolute inset-0 w-full h-full lg:w-[68%] lg:left-[32%] z-0 overflow-hidden bg-[#11110F]">
                {/* Cross-fade simultáneo puro retirando mode="wait" de AnimatePresence */}
                <AnimatePresence>
                    <motion.div
                        key={`bg-${active.slug}`}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{
                            opacity: { duration: 2.2, ease: [0.33, 1, 0.68, 1] },
                            scale: { duration: 35, ease: "easeOut" } // Even Slower, meditative pan
                        }}
                        className="absolute inset-0 origin-center"
                    >
                        <Image src={active.image} alt={active.name} fill sizes="100vw" className="w-full h-full object-cover block" />

                        {/* Elite Warm Atmospheric Overlays */}
                        {/* Soft left feathering to merge sidebar and image */}
                        <div className="hidden lg:block absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#11110F] via-[#11110F]/60 to-transparent z-10" />

                        {/* Global deep atmospheric vignette (burn bottom and edges) - Warmer */}
                        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#181410]/50 z-10 mix-blend-multiply" />

                        {/* Text protection base fade - Warmer */}
                        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#11110F] via-[#11110F]/60 to-transparent z-10" />
                    </motion.div>
                </AnimatePresence>

                {/* 8. ATLAS GRID LAYER (Hyper-refined Territory vibe) */}
                <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.35] mix-blend-overlay">
                    {/* Hairline geometric cuts - Warmer tone */}
                    <div className="absolute top-[33%] w-full h-[1px] bg-[#BFA884]/25" />
                    <div className="absolute top-[66%] w-full h-[1px] bg-[#BFA884]/25" />
                    <div className="absolute left-[50%] h-full w-[1px] bg-[#BFA884]/25" />

                    {/* Micro crosshairs */}
                    <div className="absolute top-[33%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[#F4EFE7]/40 font-mono text-[9px] tracking-tighter">┼</div>
                    <div className="absolute top-[66%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[#F4EFE7]/40 font-mono text-[9px] tracking-tighter">┼</div>

                    {/* Elite Geographic coordinates */}
                    <div className="absolute top-10 right-14 hidden lg:flex flex-col items-end gap-1.5 text-[#CFC4B4]/60 font-mono text-[9px] tracking-[0.4em] uppercase">
                        <span className="opacity-40">COORD / L.L.</span>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={`coord-${active.slug}`}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -8 }}
                                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                            >
                                {active.coordinates}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* 2. NAVIGATION PORTFOLIO INDEX (LEFT SIDEBAR DESKTOP) */}
            {/* Ligeramente más angosto para dar más peso al visual y más refinado */}
            <div className="hidden lg:flex w-[32%] relative z-30 bg-[#11110F] flex-col justify-between pt-[120px] pb-10 px-10 xl:px-14 border-r border-[#BFA884]/10">

                {/* Header branding / Silencioso */}
                <div className="flex flex-col mb-16">
                    <span className="text-[#B7925A] tracking-[0.35em] uppercase text-[8px] font-semibold mb-4 flex items-center gap-3">
                        <Compass size={11} strokeWidth={1.5} />
                        Atlas de Exploración
                    </span>
                    <h2 className="text-[#CFC4B4]/40 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase mb-1 flex items-center gap-2">
                        <span className="w-2 h-px bg-[#BFA884]/30" /> Operadora Simatiri
                    </h2>
                    <h3 className="text-[#F4EFE7]/80 text-sm font-serif italic ml-4">Norte de México</h3>
                </div>

                {/* Index List - Extreme refinement */}
                <div className="flex-1 flex flex-col justify-center gap-7 overflow-y-auto no-scrollbar py-4">
                    {destinations.map((dest, idx) => {
                        const isActive = idx === activeIndex;
                        return (
                            <button
                                key={dest.slug}
                                onClick={() => setActiveIndex(idx)}
                                className="group flex items-start gap-5 text-left transition-all duration-1000 ease-[0.33,1,0.68,1] hover:pl-2"
                            >
                                {/* Elite Numbering */}
                                <span className={cn(
                                    "font-mono text-[9px] mt-[0.35rem] transition-colors duration-700 tracking-wider",
                                    isActive ? "text-[#B7925A]" : "text-[#CFC4B4]/20 group-hover:text-[#CFC4B4]/50"
                                )}>
                                    {dest.id}
                                </span>

                                {/* Name Line */}
                                <div className="flex flex-col">
                                    <span className={cn(
                                        "font-serif transition-colors duration-700 leading-none",
                                        isActive ? "text-3xl lg:text-4xl text-[#F4EFE7] tracking-wide" : "text-2xl text-[#CFC4B4]/30 group-hover:text-[#CFC4B4]/70 tracking-normal"
                                    )}>
                                        {dest.name}
                                    </span>

                                    {/* Active Subtitle */}
                                    <div className={cn(
                                        "overflow-hidden transition-all duration-1000 ease-[0.33,1,0.68,1]",
                                        isActive ? "max-h-[24px] opacity-100 mt-2.5" : "max-h-0 opacity-0"
                                    )}>
                                        <span className="text-[9px] text-[#CFC4B4]/60 uppercase tracking-[0.25em] font-medium flex items-center gap-2">
                                            <span className="w-5 h-px bg-[#B7925A] transition-all duration-1000 delay-150" /> {dest.region}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* Footer caption */}
                <div className="mt-12 text-[8px] text-[#CFC4B4]/30 uppercase tracking-[0.5em] flex justify-between px-2">
                    <span>Sierra Tarahumara</span>
                    <span>10 / Destinos</span>
                </div>
            </div>

            {/* 2B. MOBILE — Carrusel premium con flechas (solo móvil); offset para quedar bajo navbar h-16 */}
            <div className="lg:hidden absolute top-16 left-0 right-0 z-40 pt-2 pb-0 px-4">
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#11110F]/94 backdrop-blur-md border border-[#BFA884]/15 py-3 px-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                    <button
                        type="button"
                        onClick={() => setActiveIndex((prev) => (prev === 0 ? destinations.length - 1 : prev - 1))}
                        aria-label="Destino anterior"
                        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-[#BFA884]/25 bg-[#181410]/60 text-[#CFC4B4] hover:text-[#F4EFE7] hover:border-[#B7925A]/50 hover:bg-[#181410]/80 transition-all duration-300"
                    >
                        <ChevronLeft size={20} strokeWidth={1.5} className="text-[#F4EFE7]/90" />
                    </button>

                    <div className="flex-1 min-w-0 flex flex-col items-center justify-center text-center px-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`nav-${active.slug}`}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
                                className="flex flex-col items-center gap-0.5"
                            >
                                <span className="font-serif text-lg text-[#F4EFE7] tracking-tight leading-tight">
                                    {active.name}
                                </span>
                                <span className="text-[9px] uppercase tracking-[0.2em] text-[#CFC4B4]/70 font-medium">
                                    {active.region}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                        <span className="mt-1.5 text-[9px] font-mono text-[#CFC4B4]/50 tabular-nums tracking-wider">
                            {String(activeIndex + 1).padStart(2, '0')} / {destinations.length}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => setActiveIndex((prev) => (prev === destinations.length - 1 ? 0 : prev + 1))}
                        aria-label="Destino siguiente"
                        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-[#BFA884]/25 bg-[#181410]/60 text-[#CFC4B4] hover:text-[#F4EFE7] hover:border-[#B7925A]/50 hover:bg-[#181410]/80 transition-all duration-300"
                    >
                        <ChevronRight size={20} strokeWidth={1.5} className="text-[#F4EFE7]/90" />
                    </button>
                </div>
            </div>

            {/* 3 & 5. DESTINATION INFORMATION PANEL (Monumental Right) */}
            <div className="absolute inset-x-0 bottom-0 lg:w-[68%] lg:left-[32%] z-30 p-8 pb-14 lg:p-20 flex flex-col justify-end pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`panel-${active.slug}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.33, 1, 0.68, 1],
                            staggerChildren: 0.15
                        }}
                        className="pointer-events-auto max-w-[900px] flex flex-col items-start"
                    >

                        {/* Elite Top Badges - Warmer */}
                        <motion.div
                            variants={{ initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 } }}
                            className="flex flex-wrap items-center gap-3 lg:gap-4 mb-5 lg:mb-8"
                        >
                            <span className="px-3 py-1 bg-[#181410]/70 backdrop-blur-md border border-[#BFA884]/20 text-[8px] lg:text-[9px] uppercase tracking-[0.3em] text-[#B7925A] font-medium">
                                {active.highlight}
                            </span>
                            <div className="flex items-center gap-2 text-[#CFC4B4]/70 text-[8px] lg:text-[9px] uppercase tracking-[0.2em] bg-[#181410]/40 px-3 py-1 backdrop-blur-sm border border-[#BFA884]/10">
                                <MapPin size={9} />
                                {active.region}
                            </div>
                        </motion.div>

                        {/* 3. Monumental Epic Title */}
                        <motion.h1
                            variants={{ initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 } }}
                            className="text-[3.5rem] md:text-7xl lg:text-[6rem] xl:text-[8rem] font-serif text-[#F4EFE7] mb-6 lg:mb-10 leading-[0.9] tracking-tight drop-shadow-2xl"
                        >
                            {active.name}
                        </motion.h1>

                        {/* Selected info ribbon block - Editorial layout */}
                        <div className="w-full flex flex-col md:flex-row gap-8 lg:gap-14">

                            {/* Left Col: Metadata Ribbon */}
                            <motion.div
                                variants={{ initial: { opacity: 0, x: -15 }, animate: { opacity: 1, x: 0 } }}
                                className="flex flex-row md:flex-col gap-6 md:gap-8 border-l border-[#B7925A]/30 pl-5 min-w-[140px]"
                            >
                                <div className="flex flex-col gap-1.5 focus">
                                    <span className="text-[#CFC4B4]/50 font-mono text-[8px] tracking-[0.3em] uppercase">Altitud</span>
                                    <span className="text-[#F4EFE7]/90 text-xs font-medium tracking-wider">{active.altitude}</span>
                                </div>
                                <div className="flex flex-col gap-1.5 border-l md:border-l-0 border-[#BFA884]/20 pl-6 md:pl-0">
                                    <span className="text-[#CFC4B4]/50 font-mono text-[8px] tracking-[0.3em] uppercase">Temporada</span>
                                    <span className="text-[#F4EFE7]/90 text-xs font-medium tracking-wider">{active.season}</span>
                                </div>
                            </motion.div>

                            {/* Right Col: Desc and Action */}
                            <div className="flex flex-col gap-8 lg:gap-10">
                                <motion.p
                                    variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
                                    className="text-[16px] lg:text-[18px] text-[#CFC4B4]/90 font-light leading-[2] max-w-xl pr-4"
                                >
                                    {active.desc}
                                </motion.p>

                                {/* 6 & 7. Elite CTA and Tags block */}
                                <motion.div
                                    variants={{ initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 } }}
                                    className="flex flex-col sm:flex-row items-start sm:items-center gap-8 lg:gap-12"
                                >
                                    {/* Elevated Warm CTA — opens modal, no navigation */}
                                    <button
                                        type="button"
                                        onClick={openModal}
                                        className="group relative inline-flex items-center justify-center gap-4 bg-[#181410]/40 backdrop-blur-sm border border-[#BFA884]/30 text-[#F4EFE7] px-8 py-[18px] font-sans font-medium uppercase tracking-[0.2em] text-[10px] transition-all duration-[800ms] overflow-hidden hover:border-[#B7925A]"
                                    >
                                        <div className="absolute inset-0 bg-[#B7925A]/90 -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-[800ms] ease-[0.33,1,0.68,1] z-0" />
                                        <span className="relative z-10 flex items-center gap-4 text-[#F4EFE7]">
                                            Adentrarse <ArrowUpRight size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-700" strokeWidth={1.5} />
                                        </span>
                                    </button>

                                    {/* Ultra fine Editorial Tags */}
                                    <div className="hidden md:flex flex-col gap-2.5">
                                        <span className="text-[#CFC4B4]/40 text-[8px] uppercase tracking-[0.4em] font-mono">Atributos</span>
                                        <div className="flex items-center gap-3">
                                            {active.tags.map((tag, i) => (
                                                <div key={tag} className="flex items-center gap-3">
                                                    {i > 0 && <span className="w-1 h-1 rounded-full bg-[#BFA884]/30" />}
                                                    <span className="text-[10px] text-[#CFC4B4]/70 tracking-[0.15em] font-light uppercase">
                                                        {tag}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* MODAL FLAGSHIP — Adentrarse */}
            <AnimatePresence>
                {modalOpen && (() => {
                    const dest = destinations[modalDestinationIndex]
                    const data = destinationModalData[dest.slug]
                    if (!data) return null
                    return (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                                className="fixed inset-0 z-[100] bg-[#0a0908]/85 backdrop-blur-sm"
                                onClick={closeModal}
                                aria-hidden="true"
                            />
                            <motion.div
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modal-destination-title"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 16 }}
                                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                                className="fixed left-1/2 top-1/2 z-[101] w-[92vw] max-w-[1400px] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 flex flex-col rounded-sm border border-[#BFA884]/20 bg-[#11110F] shadow-2xl overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close button */}
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="absolute top-6 right-6 z-10 p-2 rounded-full border border-[#BFA884]/30 bg-[#181410]/80 text-[#CFC4B4] hover:text-[#F4EFE7] hover:border-[#B7925A]/50 transition-all duration-300"
                                    aria-label="Cerrar"
                                >
                                    <X size={20} strokeWidth={1.5} />
                                </button>

                                <div className="overflow-y-auto flex-1 no-scrollbar">
                                    {/* 1. CABECERA DEL DESTINO */}
                                    <div className="relative pt-12 pb-8 px-8 md:px-12 lg:px-16 border-b border-[#BFA884]/10">
                                        <span className="text-[#B7925A] text-[9px] uppercase tracking-[0.35em] font-medium">
                                            {dest.region}
                                        </span>
                                        <h2 id="modal-destination-title" className="mt-2 text-4xl md:text-5xl lg:text-6xl font-serif text-[#F4EFE7] tracking-tight">
                                            {dest.name}
                                        </h2>
                                        <p className="mt-3 text-[#CFC4B4]/90 text-lg md:text-xl font-light max-w-2xl">
                                            {data.subtitle}
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {dest.tags.map((tag) => (
                                                <span key={tag} className="px-3 py-1 bg-[#181410] border border-[#BFA884]/15 text-[10px] uppercase tracking-[0.2em] text-[#CFC4B4]/80">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="px-8 md:px-12 lg:px-16 py-10 md:py-14 space-y-14 md:space-y-16">
                                        {/* 2. INTRO EDITORIAL */}
                                        <section>
                                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#B7925A] font-medium mb-4">Introducción</h3>
                                            <p className="text-[#CFC4B4]/95 text-base md:text-lg leading-[1.9] max-w-3xl font-light">
                                                {data.intro}
                                            </p>
                                        </section>

                                        {/* 3. POR QUÉ IR */}
                                        <section>
                                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#B7925A] font-medium mb-6">Por qué ir</h3>
                                            <ul className="space-y-3 max-w-2xl">
                                                {data.whyGo.map((item, i) => (
                                                    <li key={i} className="flex gap-3 text-[#F4EFE7]/90 text-sm md:text-base font-light">
                                                        <span className="text-[#B7925A] mt-1.5 shrink-0">·</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>

                                        {/* 4. EXPERIENCIAS / HIGHLIGHTS */}
                                        <section>
                                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#B7925A] font-medium mb-6">Experiencias y highlights</h3>
                                            <div className="flex flex-wrap gap-3">
                                                {data.highlights.map((h) => (
                                                    <span key={h} className="px-4 py-2 bg-[#181410] border border-[#BFA884]/15 text-[12px] text-[#CFC4B4]/90 uppercase tracking-[0.15em]">
                                                        {h}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>

                                        {/* 5. LUGARES CLAVE */}
                                        <section>
                                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#B7925A] font-medium mb-6">Lugares clave</h3>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-3xl">
                                                {data.keyPlaces.map((place, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-[#CFC4B4]/90 text-sm md:text-base font-light">
                                                        <MapPin size={14} className="text-[#B7925A]/70 shrink-0" />
                                                        {place}
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>

                                        {/* 6. MEJOR TEMPORADA */}
                                        <section>
                                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#B7925A] font-medium mb-6">Mejor temporada</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                                                <div>
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.25em] block mb-1">Cuándo</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.bestSeason.when}</p>
                                                </div>
                                                <div>
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.25em] block mb-1">Clima</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.bestSeason.climate}</p>
                                                </div>
                                                <div>
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.25em] block mb-1">Qué esperar</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.bestSeason.expect}</p>
                                                </div>
                                            </div>
                                        </section>

                                        {/* 7. PERFIL DEL DESTINO */}
                                        <section>
                                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#B7925A] font-medium mb-6">Perfil del destino</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
                                                <div className="border-l border-[#B7925A]/30 pl-4">
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.2em] block mb-1">Tipo de experiencia</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.travelerProfile.experienceType}</p>
                                                </div>
                                                <div className="border-l border-[#B7925A]/30 pl-4">
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.2em] block mb-1">Perfil del viajero</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.travelerProfile.travelerProfile}</p>
                                                </div>
                                                <div className="border-l border-[#B7925A]/30 pl-4">
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.2em] block mb-1">Estancia sugerida</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.travelerProfile.suggestedStay}</p>
                                                </div>
                                                <div className="border-l border-[#B7925A]/30 pl-4">
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.2em] block mb-1">Conexión cultural</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.travelerProfile.culturalLevel}</p>
                                                </div>
                                                <div className="border-l border-[#B7925A]/30 pl-4">
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.2em] block mb-1">Paisaje</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.travelerProfile.landscapeType}</p>
                                                </div>
                                                <div className="border-l border-[#B7925A]/30 pl-4">
                                                    <span className="text-[#CFC4B4]/50 text-[9px] uppercase tracking-[0.2em] block mb-1">Rol en la ruta</span>
                                                    <p className="text-[#F4EFE7]/90 text-sm font-light">{data.travelerProfile.role}</p>
                                                </div>
                                            </div>
                                        </section>

                                        {/* 8. CTA FINAL */}
                                        <section className="pt-6 pb-4 border-t border-[#BFA884]/10">
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                                <Link
                                                    href={`/packages?destino=${encodeURIComponent(dest.slug)}`}
                                                    onClick={closeModal}
                                                    className="group relative inline-flex items-center justify-center gap-3 bg-[#B7925A] text-[#11110F] px-8 py-4 font-sans font-medium uppercase tracking-[0.2em] text-[10px] transition-all duration-300 hover:bg-[#c9a066]"
                                                >
                                                    <span>{data.cta.primary}</span>
                                                    <ArrowUpRight size={14} strokeWidth={1.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </Link>
                                                <span className="text-[#CFC4B4]/70 text-sm font-light">
                                                    {data.cta.secondary}
                                                </span>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )
                })()}
            </AnimatePresence>

        </section>
    )
}
