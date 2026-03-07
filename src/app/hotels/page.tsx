import type { Metadata } from 'next'
import { HotelsHero } from '@/components/hotels/HotelsHero'
import { AgreementIntro } from '@/components/hotels/AgreementIntro'
import { AgreementBenefits } from '@/components/hotels/AgreementBenefits'
import { AgreementContacts } from '@/components/hotels/AgreementContacts'
import { HotelPortfolioShowcase } from '@/components/hotels/HotelPortfolioShowcase'
import { PoliciesSection } from '@/components/hotels/PoliciesSection'
import { ManagementClosing } from '@/components/hotels/ManagementClosing'
import { HotelRateData } from '@/components/hotels/HotelRateModule'

export const metadata: Metadata = {
    title: 'Convenio Hotelero Preferencial',
    description: 'Tarifas preferenciales, beneficios exclusivos y red de hospedaje negociado para tour operadoras frecuentes.',
}

const hotelData: HotelRateData[] = [
    {
        id: 'simatiri',
        externalId: 'ST-01',
        name: 'Hotel Simatiri',
        location: 'Creel, Chihuahua',
        propertyType: 'Propiedad Propia / Cabañas',
        agreementStatus: 'Operación Directa',
        executiveSummary: 'Nuestra propiedad estratégica en Creel. Complejo de cabañas diseñado para brindar autonomía y atención directa a grupos turísticos estructurados.',
        specs: [
            'El precio descrito se desglosa con y sin impuestos.',
            'El precio que se menciona es por noche de hospedaje.',
            'La tarifa incluye desayuno caliente de cortesía en un horario de 7:00 a.m. - 10:00 a.m.',
            'La tarifa incluye fogatas dentro del complejo.',
            'Revisar política de menores.',
            'Se otorgará una habitación de cortesía al adquirir 15 habitaciones.'
        ],
        rates: [
            { roomName: 'Cabaña Sencilla / Doble', priceWithoutTaxes: 950, priceWithTaxes: 1140 },
            { roomName: 'Cabaña Triple', priceWithoutTaxes: 1050, priceWithTaxes: 1260 },
            { roomName: 'Cabaña Cuádruple', priceWithoutTaxes: 1150, priceWithTaxes: 1380 },
            { roomName: 'Cabaña Equipada 2 – 4 Px.', priceWithoutTaxes: 1350, priceWithTaxes: 1620 },
            { roomName: 'Cabaña para 10 personas', priceWithoutTaxes: 2750, priceWithTaxes: 3300 },
        ],
        footerNote: 'PRECIO MEJORABLE EN EL CASO DE ADQUIRIR UN PAQUETE COMPLETO'
    },
    {
        id: 'cascada',
        externalId: 'ALI-01',
        name: 'Hotel Cascada Inn',
        location: 'Creel, Chihuahua',
        propertyType: 'Hotel Aliado',
        agreementStatus: 'Convenio Activo',
        executiveSummary: 'Propiedad clave dentro de nuestra red, ofreciendo la capacidad y el estándar de calidad requeridos para nuestras operaciones corporativas conjuntas.',
        specs: [
            'El precio que se menciona es por noche de hospedaje.',
            'La tarifa incluye desayuno caliente de cortesía en un horario de 7:00 a.m. - 10:00 a.m.',
            'Revisar política de menores.'
        ],
        rates: [
            { roomName: 'Habitación de Hotel Sencilla / Doble', onlyWithTaxes: 1748 },
            { roomName: 'Habitación de Hotel Triple', onlyWithTaxes: 1948 },
            { roomName: 'Habitación de Hotel Cuádruple', onlyWithTaxes: 2148 },
        ],
        footerNote: 'PRECIO MEJORABLE EN EL CASO DE ADQUIRIR UN PAQUETE COMPLETO'
    },
    {
        id: 'villa',
        externalId: 'ALI-02',
        name: 'Hotel Villa Mexicana',
        location: 'Creel, Chihuahua',
        propertyType: 'Hotel Aliado',
        agreementStatus: 'Convenio Activo',
        executiveSummary: 'Respaldo de infraestructura habitacional en formato hotelero, fundamental para operaciones a gran escala en el centro de la Sierra Tarahumara.',
        specs: [
            'El precio que se menciona es por noche de hospedaje.',
            'La tarifa incluye desayuno caliente de cortesía en un horario de 7:00 a.m. - 10:00 a.m.',
            'Revisar política de menores.',
            'Se otorgará una habitación de cortesía al adquirir 15 habitaciones.'
        ],
        rates: [
            { roomName: 'Habitación de Hotel SGL / DBL', onlyWithTaxes: 2390 },
            { roomName: 'Habitación de Hotel Triple', onlyWithTaxes: 2785 },
            { roomName: 'Habitación de Hotel Cuádruple', onlyWithTaxes: 3180 },
        ],
        footerNote: 'PRECIO MEJORABLE EN EL CASO DE ADQUIRIR UN PAQUETE COMPLETO'
    },
    {
        id: 'armando',
        externalId: 'ALI-03',
        name: 'Hotel Don Armando',
        location: 'Barrancas del Cobre',
        propertyType: 'Hotel Aliado',
        agreementStatus: 'Convenio Activo',
        executiveSummary: 'Nodo estratégico en Barrancas del Cobre, garantizando la extensión de nuestro control de calidad y tarifas negociadas hacia este destino clave.',
        specs: [
            'El precio que se menciona es por noche de hospedaje.',
            'La tarifa incluye desayuno caliente de cortesía en un horario de 7:00 a.m. - 10:00 a.m.',
            'Revisar política de menores.',
            'Se otorgará una habitación de cortesía al adquirir 15 habitaciones.'
        ],
        rates: [
            { roomName: 'Habitación de Hotel SGL / DBL', onlyWithTaxes: 2585 },
            { roomName: 'Habitación de Hotel Triple', onlyWithTaxes: 3190 },
            { roomName: 'Habitación tipo de Hotel Cuádruple', onlyWithTaxes: 3795 },
        ],
        footerNote: 'PRECIO MEJORABLE EN EL CASO DE ADQUIRIR UN PAQUETE COMPLETO'
    },
    {
        id: 'lodge',
        externalId: 'ALI-04',
        name: 'Hotel The Lodge',
        location: 'Barrancas / Zona Diamante',
        propertyType: 'Hotel Aliado / Lodge',
        agreementStatus: 'Convenio Activo',
        executiveSummary: 'Propiedad especial aliada con carácter distintivo y capacidad versátil para alojar grupos que buscan un entorno más exclusivo.',
        specs: [
            'El precio que se menciona es por noche de hospedaje.',
            'DESAYUNO CALIENTE + $312.00 MXN PP',
            'Revisar política de menores.',
            'Se otorgará una habitación de cortesía al adquirir 15 habitaciones.'
        ],
        rates: [
            { roomName: 'Habitación de Hotel SGL / DBL', onlyWithTaxes: 2735 },
            { roomName: 'Habitación de Hotel Triple', onlyWithTaxes: 3250 },
            { roomName: 'Habitación tipo de Hotel Cuádruple', onlyWithTaxes: 3765 },
        ],
        footerNote: 'PRECIO MEJORABLE EN EL CASO DE ADQUIRIR UN PAQUETE COMPLETO'
    }
]

export default function HotelsB2BPage() {
    return (
        <div className="bg-[#FAF9F7] selection:bg-[#7B4B2A]/20 pb-0">
            {/* 1. HERO INSTITUCIONAL */}
            <HotelsHero />

            {/* 2. BLOQUE OFICIAL DEL CONVENIO */}
            <AgreementIntro />

            {/* 3. BENEFICIOS DEL CONVENIO */}
            <AgreementBenefits />

            {/* 4. VIGENCIA + CONTACTO */}
            <AgreementContacts />

            {/* 5 & 6. RED / PORTAFOLIO DE HOTELES (Selector + Panel Activo) */}
            <HotelPortfolioShowcase hotels={hotelData} />

            {/* 7. POLÍTICAS GENERALES DEL CONVENIO */}
            <PoliciesSection />

            {/* 8. CIERRE INSTITUCIONAL */}
            <ManagementClosing />
        </div>
    )
}
