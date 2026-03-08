'use client'

const POLICIES = [
  {
    title: '1. Política de Reservas',
    items: [
      'Las reservas deben realizarse con un mínimo de 3 días de anticipación.',
      'Para confirmar la reserva se debe abonar un porcentaje entre el 30% y el 50% del valor total de la estancia SIN EXCEPCIÓN.',
      'Las reservas están sujetas a disponibilidad al momento de la solicitud.',
    ],
  },
  {
    title: '2. Política de Pagos',
    items: [
      'El pago total debe completarse días antes de la fecha del servicio. LAPSO DEFINIDO DE ACUERDO A CADA GRUPO.',
      'Aceptamos pagos vía transferencia bancaria, tarjeta de crédito/débito, y efectivo.',
      'Todos los precios están expresados en moneda local.',
      'Todas las reservas se generan única y exclusivamente al realizar el anticipo correspondiente.',
    ],
  },
  {
    title: '3. Política de Cancelación y Reembolsos',
    items: [
      'Cancelaciones realizadas con más de 14 días de anticipación recibirán un reembolso del 40%.',
      'Cancelaciones con menos de 7 días de anticipación no son reembolsables.',
      'En caso de no presentarse (no show), no se realiza ningún reembolso y la reserva queda cancelada.',
      'Si el servicio se suspende por condiciones climáticas extremas o causas de fuerza mayor, se reprogramará o se reembolsará según corresponda.',
    ],
  },
  {
    title: '4. Política de Modificaciones',
    items: [
      'Se aceptan cambios de fecha o tour con al menos 30 días de anticipación, sujetos a disponibilidad.',
      'Modificaciones dentro del plazo de penalización estarán sujetas a cargos adicionales.',
    ],
  },
  {
    title: '5. Política de Seguridad y Responsabilidad',
    items: [
      'La empresa no se responsabiliza por pérdidas de objetos personales durante la estancia.',
      'Es responsabilidad del cliente informar sobre condiciones médicas o restricciones alimenticias',
    ],
  },
  {
    title: '6. Política de Comportamiento del Cliente',
    items: [
      'Se espera un comportamiento respetuoso hacia el personal, otros turistas y las instalaciones del complejo.',
      'La empresa se reserva el derecho de retirar a cualquier participante que ponga en riesgo la seguridad del complejo turístico.',
    ],
  },
  {
    title: '7. Política de Protección al Medio Ambiente y Comunidades Locales',
    items: [
      'Fomentamos el turismo responsable: no dejar basura, respetar la flora y fauna, y no dañar los lugares visitados.',
      'Promovemos el respeto por las culturas y costumbres locales.',
    ],
  },
  {
    title: '8. Política de Menores de Edad',
    items: [
      'Los menores de 5 – 10 años pagan la mitad del total de cualquier servicio.',
      'A partir de 11 años el cobro del menor es la misma cantidad que la de un adulto.',
      'Los menores deben estar acompañados por un adulto responsable.',
      'Es necesario comprobar el parentesco con los menores en recepción.',
    ],
  },
]

export function PoliciesBlockNew() {
  return (
    <section className="bg-[#FAF5EF] text-[#1C1812] py-20 sm:py-28 px-6 sm:px-10 border-t border-[#1C1812]/10">
      <div className="max-w-4xl mx-auto">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7B4B2A] mb-6 text-center">
          Especificaciones y políticas del convenio
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1812] tracking-tight text-center mb-10">
          Especificaciones y políticas de los servicios brindados por los hoteles comprendidos en este convenio
        </h2>
        <p className="text-[#2d2824] font-light leading-relaxed text-center mb-16 max-w-2xl mx-auto">
          Para nosotros es muy importante brindar un servicio de calidad para todos nuestros clientes, así mismo buscamos que cada experiencia de las Tour Operadoras que decidan trabajar con nosotros sea llevada a cabo de la mejor manera en donde se busquen acuerdos que beneficien a ambas empresas. Es por eso que compartimos con ustedes todas las políticas que nos ayudan a lograr los objetivos deseados.
        </p>

        <div className="space-y-12">
          {POLICIES.map((p) => (
            <div key={p.title} className="border-b border-[#1C1812]/10 pb-12 last:border-0 last:pb-0">
              <h3 className="font-serif text-xl sm:text-2xl text-[#1C1812] mb-6">
                {p.title}
              </h3>
              <ul className="space-y-3">
                {p.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-[#2d2824] font-light leading-relaxed">
                    <span className="text-[#7B4B2A] shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
