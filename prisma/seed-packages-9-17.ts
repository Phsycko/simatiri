import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Inserting packages 9–17...')

    const packagesData = [
        {
            title: 'Paquete 9',
            durationDays: 3,
            trainClass: 'CHEPE REGIONAL',
            startLocation: 'Los Mochis',
            endLocation: 'Los Mochis',
            description: 'Los Mochis → Creel → Los Mochis. Hospedaje: Categoría Intermedia',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 8700, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 8350, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 8200, isUpgrade: false },
            ]
        },
        {
            title: 'Paquete 10',
            durationDays: 4,
            trainClass: 'CHEPE REGIONAL',
            startLocation: 'Los Mochis',
            endLocation: 'Los Mochis',
            description: 'Los Mochis → Creel → Los Mochis. Hospedaje: Categoría Intermedia',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 9200, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 8700, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 8500, isUpgrade: false },
            ]
        },
        {
            title: 'Paquete 11',
            durationDays: 4,
            trainClass: 'CHEPE EXPRESS',
            startLocation: 'Los Mochis',
            endLocation: 'Los Mochis',
            description: 'Los Mochis → Creel → Los Mochis. Hospedaje: Categoría Superior',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 10900, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 10100, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 9700, isUpgrade: false },
            ]
        },
        {
            title: 'Paquete 12',
            durationDays: 5,
            trainClass: 'CHEPE EXPRESS',
            startLocation: 'Los Mochis',
            endLocation: 'Los Mochis',
            description: 'Los Mochis → Creel → Los Mochis. Hospedaje: Categoría Intermedia',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 13200, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 12150, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 11600, isUpgrade: false },
            ]
        },
        {
            title: 'Paquete 13',
            durationDays: 7,
            trainClass: 'CHEPE EXPRESS',
            startLocation: 'Los Mochis',
            endLocation: 'Los Mochis',
            description: 'Los Mochis → Creel → Los Mochis. Hospedaje: Categoría Intermedia',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 18250, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 16580, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 15790, isUpgrade: false },
            ]
        },
        {
            title: 'Paquete 14',
            durationDays: 5,
            trainClass: 'CHEPE EXPRESS',
            startLocation: 'Chihuahua',
            endLocation: 'Los Mochis',
            description: 'Chihuahua → Creel → Los Mochis. Hospedaje: Categoría Intermedia',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 10100, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 9500, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 9240, isUpgrade: false },
            ]
        },
        {
            title: 'Paquete 15',
            durationDays: 4,
            trainClass: 'CHEPE EXPRESS',
            startLocation: 'Chihuahua',
            endLocation: 'Los Mochis',
            description: 'Chihuahua → Creel → Los Mochis. Hospedaje: Categoría Superior',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 12400, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 12150, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 11750, isUpgrade: false },
            ]
        },
        {
            title: 'Paquete 16',
            durationDays: 4,
            trainClass: 'CHEPE EXPRESS',
            startLocation: 'El Fuerte',
            endLocation: 'El Fuerte',
            description: 'El Fuerte → Creel → El Fuerte. Hospedaje: Categoría Superior',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 11650, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 10850, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 10450, isUpgrade: false },
            ]
        },
        {
            title: 'Paquete 17',
            durationDays: 4,
            trainClass: 'CHEPE EXPRESS',
            startLocation: 'El Fuerte',
            endLocation: 'El Fuerte',
            description: 'El Fuerte → Creel → El Fuerte. Hospedaje: Categoría Intermedia',
            prices: [
                { occupancyType: 'DOBLE', pricePerPerson: 9960, isUpgrade: false },
                { occupancyType: 'TRIPLE', pricePerPerson: 9500, isUpgrade: false },
                { occupancyType: 'CUADRUPLE', pricePerPerson: 9240, isUpgrade: false },
            ]
        },
    ]

    for (const pkg of packagesData) {
        const { prices, ...pkgData } = pkg
        // Check if it already exists to avoid duplicates
        const existing = await prisma.package.findFirst({ where: { title: pkgData.title } })
        if (existing) {
            console.log(`${pkgData.title} already exists, skipping.`)
            continue
        }
        const createdPkg = await prisma.package.create({ data: pkgData })
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
        console.log(`Created ${pkgData.title} (id: ${createdPkg.id})`)
    }

    console.log('Done!')
}

main()
    .catch((e) => { console.error(e); process.exit(1) })
    .finally(async () => { await prisma.$disconnect() })
