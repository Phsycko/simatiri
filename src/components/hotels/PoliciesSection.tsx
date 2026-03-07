import React from 'react'

export function PoliciesSection() {
    const policies = [
        {
            title: "Política de Reservas",
            items: [
                "Las reservas deben realizarse con un mínimo de 3 días de anticipación.",
                "Para confirmar la reserva se debe abonar un porcentaje entre el 30% y el 50% del valor total de la estancia SIN EXCEPCIÓN.",
                "Las reservas están sujetas a disponibilidad al momento de la solicitud."
            ]
        },
        {
            title: "Política de Pagos",
            items: [
                "El pago total debe completarse días antes de la fecha del servicio. LAPSO DEFINIDO DE ACUERDO A CADA GRUPO.",
                "Aceptamos pagos vía transferencia bancaria, tarjeta de crédito/débito, y efectivo.",
                "Todos los precios están expresados en moneda local.",
                "Todas las reservas se generan única y exclusivamente al realizar el anticipo correspondiente."
            ]
        },
        {
            title: "Política de Cancelación y Reembolsos",
            items: [
                "Cancelaciones realizadas con más de 14 días de anticipación recibirán un reembolso del 40%.",
                "Cancelaciones con menos de 7 días de anticipación no son reembolsables.",
                "En caso de no presentarse (no show), no se realiza ningún reembolso y la reserva queda cancelada.",
                "Si el servicio se suspende por condiciones climáticas extremas o causas de fuerza mayor, se reprogramará o se reembolsará según corresponda."
            ]
        },
        {
            title: "Política de Modificaciones",
            items: [
                "Se aceptan cambios de fecha o tour con al menos 30 días de anticipación, sujetos a disponibilidad.",
                "Modificaciones dentro del plazo de penalización estarán sujetas a cargos adicionales."
            ]
        },
        {
            title: "Política de Seguridad y Responsabilidad",
            items: [
                "La empresa no se responsabiliza por pérdidas de objetos personales durante la estancia.",
                "Es responsabilidad del cliente informar sobre condiciones médicas o restricciones alimenticias."
            ]
        },
        {
            title: "Política de Comportamiento del Cliente",
            items: [
                "Se espera un comportamiento respetuoso hacia el personal, otros turistas y las instalaciones del complejo.",
                "La empresa se reserva el derecho de retirar a cualquier participante que ponga en riesgo la seguridad del complejo turístico."
            ]
        },
        {
            title: "Política de Medio Ambiente y Comunidades",
            items: [
                "Fomentamos el turismo responsable: no dejar basura, respetar la flora y fauna, y no dañar los lugares visitados.",
                "Promovemos el respeto por las culturas y costumbres locales."
            ]
        },
        {
            title: "Política de Menores de Edad",
            items: [
                "Los menores de 5 – 10 años pagan la mitad del total de cualquier servicio.",
                "A partir de 11 años el cobro del menor es la misma cantidad que la de un adulto.",
                "Los menores deben estar acompañados por un adulto responsable.",
                "Es necesario comprobar el parentesco con los menores en recepción."
            ]
        }
    ]

    return (
        <section className="bg-white py-32 px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-20 text-center flex flex-col items-center">
                    <div className="w-16 h-px bg-[#1C1812] mb-8" />
                    <h2 className="font-serif text-4xl md:text-5xl text-[#1C1812] tracking-tight mb-8">
                        Especificaciones y Políticas<br />del Convenio
                    </h2>
                    <p className="text-base text-[#5A5551] font-light leading-relaxed max-w-3xl">
                        Para nosotros es muy importante brindar un servicio de calidad para todos nuestros clientes, así mismo buscamos que cada experiencia de las Tour Operadoras que decidan trabajar con nosotros sea llevada a cabo de la mejor manera en donde se busquen acuerdos que beneficien a ambas empresas. Es por eso que compartimos con ustedes todas las políticas que nos ayudan a lograr los objetivos deseados.
                    </p>
                </div>

                <div className="space-y-16">
                    {policies.map((p, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-16 items-start">
                            <div className="md:w-1/3 shrink-0">
                                <span className="font-mono text-3xl font-light text-[#1C1812]/20 mb-2 block border-b border-[#1C1812]/10 pb-4">
                                    0{index + 1}
                                </span>
                                <h3 className="font-serif text-xl text-[#1C1812] mt-4">
                                    {p.title}
                                </h3>
                            </div>
                            <div className="md:w-2/3 md:pt-14">
                                <ul className="space-y-4">
                                    {p.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <span className="text-[#d1ab7a] font-serif text-lg mt-[-2px]">—</span>
                                            <span className="text-[15px] text-[#4A4541] font-light leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
