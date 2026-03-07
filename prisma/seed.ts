import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding SIMATIRI EXPERIENCE data...')

    // 1. DESTINOS
    const destinationsData = [
        'Chihuahua',
        'Creel Pueblo Mágico',
        'Barrancas del Cobre',
        'Divisadero',
        'El Fuerte',
        'Los Mochis',
        'Cuauhtémoc',
        'Cerocahui',
        'Basaseachi',
        'Guachochi'
    ]

    const destinations: Record<string, number> = {}

    for (const name of destinationsData) {
        const dest = await prisma.destination.upsert({
            where: { name },
            update: {},
            create: { name },
        })
        destinations[name] = dest.id
    }

    // 2. PAQUETES TURÍSTICOS
    const packagesData = [
        {
            title: 'Paquete 1',
            durationDays: 7,
            trainClass: 'CHEPE Express Primera Clase',
            startLocation: 'El Fuerte',
            endLocation: 'El Fuerte',
            description: 'El Fuerte → Creel → El Fuerte. Hospedaje: Categoría Superior',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 27700, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 25400, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 24000, isUpgrade: false }
            ]
        },
        {
            title: 'Paquete 2',
            durationDays: 6,
            trainClass: 'CHEPE REGIONAL',
            startLocation: 'Chihuahua',
            endLocation: 'Divisadero',
            description: 'Chihuahua → Creel → Divisadero. Hospedaje: Categoría Intermedia',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 10400, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 9470, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 9100, isUpgrade: false },
                { occupancyType: 'DOBLE', pricePerPerson: 11400, isUpgrade: true },
                { occupancyType: 'TRIPLE', pricePerPerson: 10440, isUpgrade: true },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 10070, isUpgrade: true }
            ]
        },
        {
            title: 'Paquete 3',
            durationDays: 5,
            trainClass: 'CHEPE REGIONAL',
            description: '5 días / 4 noches',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 8350, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 7710, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 7400, isUpgrade: false },
                { occupancyType: 'DOBLE', pricePerPerson: 9300, isUpgrade: true },
                { occupancyType: 'TRIPLE', pricePerPerson: 8700, isUpgrade: true },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 8400, isUpgrade: true }
            ]
        },
        {
            title: 'Paquete 4',
            durationDays: 5,
            trainClass: 'CHEPE EXPRESS',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 11400, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 10200, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 10100, isUpgrade: false }
            ]
        },
        {
            title: 'Paquete 5',
            durationDays: 4,
            trainClass: 'CHEPE REGIONAL',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 7780, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 7400, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 7200, isUpgrade: false },
                { occupancyType: 'DOBLE', pricePerPerson: 8850, isUpgrade: true },
                { occupancyType: 'TRIPLE', pricePerPerson: 8400, isUpgrade: true },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 8150, isUpgrade: true }
            ]
        },
        {
            title: 'Paquete 6',
            durationDays: 4,
            trainClass: 'CHEPE EXPRESS',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 10350, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 9550, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 9200, isUpgrade: false }
            ]
        },
        {
            title: 'Paquete 7',
            durationDays: 3,
            trainClass: 'CHEPE REGIONAL',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 7400, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 7100, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 6950, isUpgrade: false }
            ]
        },
        {
            title: 'Paquete 8',
            durationDays: 3,
            trainClass: 'CHEPE EXPRESS',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 9250, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 8800, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 8550, isUpgrade: false }
            ]
        }
    ]

    for (const pkg of packagesData) {
        const { prices, ...pkgData } = pkg
        const createdPkg = await prisma.package.create({
            data: pkgData
        })
        for (const p of prices) {
            await prisma.packageOccupancyPrice.create({
                data: {
                    packageId: createdPkg.id,
                    occupancyType: p.occupancyType,
                    pricePerPerson: p.pricePerPerson,
                    isUpgrade: p.isUpgrade
                }
            })
        }
    }

    // 3. TOURS INDIVIDUALES
    const toursData = [
        {
            title: 'Tour Tarahumara',
            durationHours: 5,
            destinationId: destinations['Creel Pueblo Mágico'],
            description: 'Lugares: Cueva Tarahumara, Piedra del Elefante, Lago de Arareco, Cascada de Cusárare, Misión de San Ignacio, Valle de las Ranas, Valle de los Hongos',
            tiers: [
                { min: 1, max: 2, price: 800 },
                { min: 3, max: 5, price: 695 },
                { min: 6, max: 10, price: 595 },
                { min: 11, max: 13, price: 495 },
                { min: 14, max: 38, price: 445 },
                { min: 39, max: 100, price: 395 },
            ]
        },
        {
            title: 'Tour Barrancas del Cobre',
            durationHours: 5,
            destinationId: destinations['Barrancas del Cobre'],
            description: 'Lugares: Estación CHEPE, Mirador Piedra Volada, Puente colgante, Parque Aventura Barrancas, Piedra de la Fertilidad, Cueva Tarahumara, Mirador Río Oteros',
            tiers: [
                { min: 1, max: 2, price: 800 },
                { min: 3, max: 5, price: 695 },
                { min: 6, max: 10, price: 595 },
                { min: 11, max: 13, price: 495 },
                { min: 14, max: 38, price: 445 },
                { min: 39, max: 100, price: 395 },
            ]
        },
        {
            title: 'Tour Basaseachi',
            durationHours: 10,
            destinationId: destinations['Basaseachi'],
            description: 'Lugares: Cascada Basaseachi, Mirador San Lorenzo, Cañón Candameña',
            tiers: [
                { min: 1, max: 2, price: 1500 },
                { min: 3, max: 5, price: 1300 },
                { min: 6, max: 10, price: 1000 },
                { min: 11, max: 13, price: 900 },
                { min: 14, max: 38, price: 800 },
                { min: 39, max: 100, price: 700 },
            ]
        },
        {
            title: 'Tour Menonitas',
            durationHours: 6,
            destinationId: destinations['Cuauhtémoc'],
            description: 'Lugares: Museo Menonita, Casa de la Galleta, Quesería Menonita, Colonia Menonita, Pizzería Menonita',
            tiers: [{ min: 1, max: 100, price: 600 }] // Precio promedio dummy para los que no tienen tarifario especifico
        },
        {
            title: 'Tour Recowata',
            durationHours: 10,
            destinationId: destinations['Creel Pueblo Mágico'],
            description: 'Lugares: Cañón Tararecua, Aguas termales Recowata',
            tiers: [{ min: 1, max: 100, price: 900 }]
        },
        {
            title: 'Tour Guachochi y Kokoyome',
            durationHours: 12,
            destinationId: destinations['Guachochi'],
            description: 'Lugares: Cañón Basihuare, Cañón Humirá, Mirador La Capilla, Kokoyome, Barranca Sinforosa, Lago de las Garzas, Cascada El Salto',
            tiers: [{ min: 1, max: 100, price: 1800 }]
        },
        {
            title: 'Tour Cerocahui',
            durationHours: 10,
            destinationId: destinations['Cerocahui'],
            description: 'Lugares: Mirador del Gallego, Manantial Guadalupe, Misión de Cerocahui, Internado Rarámuri, Viñedo de Cerocahui',
            tiers: [{ min: 1, max: 100, price: 1200 }]
        },
        {
            title: 'Tour Maguarichi',
            durationHours: 10,
            destinationId: destinations['Divisadero'], // Assuming close
            description: 'Incluye: Géisers, aromaterapia, fangoterapia, aguas termales',
            tiers: [{ min: 1, max: 100, price: 1400 }]
        }
    ]

    for (const tour of toursData) {
        const { tiers, ...tData } = tour
        const createdTour = await prisma.tour.create({ data: tData })
        for (const t of tiers) {
            await prisma.tourTierPrice.create({
                data: {
                    tourId: createdTour.id,
                    minPax: t.min,
                    maxPax: t.max,
                    pricePerPerson: t.price
                }
            })
        }
    }

    // 4. HOSPEDAJE (Simatiri + Red de Aliados)
    const hotelsData = [
        {
            name: 'Simatiri Hotel y Cabañas',
            destinationId: destinations['Creel Pueblo Mágico'],
            inclusions: 'Desayuno caliente, fogatas',
            rooms: [
                { name: 'Cabaña Sencilla/Doble', capacity: 2, agency: 950, public: 1140 },
                { name: 'Cabaña Triple', capacity: 3, agency: 1050, public: 1260 },
                { name: 'Cabaña Cuádruple', capacity: 4, agency: 1150, public: 1380 },
                { name: 'Cabaña Equipada 2-4 personas', capacity: 4, agency: 1350, public: 1620 },
                { name: 'Cabaña 10 personas', capacity: 10, agency: 2750, public: 3300 },
            ]
        },
        {
            name: 'Hotel Cascada Inn',
            destinationId: destinations['Creel Pueblo Mágico'],
            inclusions: 'Desayuno incluido',
            rooms: [
                { name: 'Doble', capacity: 2, agency: 1748, public: 1748 }, // Si no especificaron agencia vs publico, asumo el mismo precio o que es tarifa publica final
                { name: 'Triple', capacity: 3, agency: 1948, public: 1948 },
                { name: 'Cuádruple', capacity: 4, agency: 2148, public: 2148 },
            ]
        },
        {
            name: 'Hotel Villa Mexicana',
            destinationId: destinations['Creel Pueblo Mágico'],
            inclusions: null,
            rooms: [
                { name: 'Doble', capacity: 2, agency: 2390, public: 2390 },
                { name: 'Triple', capacity: 3, agency: 2785, public: 2785 },
                { name: 'Cuádruple', capacity: 4, agency: 3180, public: 3180 },
            ]
        },
        {
            name: 'Hotel Don Armando',
            destinationId: destinations['Creel Pueblo Mágico'],
            inclusions: null,
            rooms: [
                { name: 'Doble', capacity: 2, agency: 2585, public: 2585 },
                { name: 'Triple', capacity: 3, agency: 3190, public: 3190 },
                { name: 'Cuádruple', capacity: 4, agency: 3795, public: 3795 },
            ]
        },
        {
            name: 'Hotel The Lodge',
            destinationId: destinations['Creel Pueblo Mágico'],
            inclusions: 'Desayuno adicional: $312 MXN por persona',
            rooms: [
                { name: 'Doble', capacity: 2, agency: 2735, public: 2735 },
                { name: 'Triple', capacity: 3, agency: 3250, public: 3250 },
                { name: 'Cuádruple', capacity: 4, agency: 3765, public: 3765 },
            ]
        }
    ]

    for (const h of hotelsData) {
        const hotelObj = await prisma.hotel.create({
            data: {
                name: h.name,
                destinationId: h.destinationId,
                inclusions: h.inclusions
            }
        })

        for (const r of h.rooms) {
            const room = await prisma.roomType.create({
                data: {
                    hotelId: hotelObj.id,
                    name: r.name,
                    capacity: r.capacity
                }
            })

            // Creamos una tarifa STD por defecto
            await prisma.hotelSeasonRate.create({
                data: {
                    roomTypeId: room.id,
                    season: 'STD',
                    priceAgency: r.agency,
                    pricePublic: r.public
                }
            })
        }
    }

    console.log('Seeding finished successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
