'use client'

import { useTranslation } from '@/contexts/LocaleContext'

const POLICY_SECTIONS: { titleKey: string; itemKeys: string[] }[] = [
  { titleKey: 'hotels.policyReservasTitle', itemKeys: ['hotels.policyReservas1', 'hotels.policyReservas2', 'hotels.policyReservas3'] },
  { titleKey: 'hotels.policyPagosTitle', itemKeys: ['hotels.policyPagos1', 'hotels.policyPagos2', 'hotels.policyPagos3', 'hotels.policyPagos4'] },
  { titleKey: 'hotels.policyCancelacionTitle', itemKeys: ['hotels.policyCancelacion1', 'hotels.policyCancelacion2', 'hotels.policyCancelacion3', 'hotels.policyCancelacion4'] },
  { titleKey: 'hotels.policyModificacionesTitle', itemKeys: ['hotels.policyModificaciones1', 'hotels.policyModificaciones2'] },
  { titleKey: 'hotels.policySeguridadTitle', itemKeys: ['hotels.policySeguridad1', 'hotels.policySeguridad2'] },
  { titleKey: 'hotels.policyComportamientoTitle', itemKeys: ['hotels.policyComportamiento1', 'hotels.policyComportamiento2'] },
  { titleKey: 'hotels.policyMedioAmbienteTitle', itemKeys: ['hotels.policyMedioAmbiente1', 'hotels.policyMedioAmbiente2'] },
  { titleKey: 'hotels.policyMenoresTitle', itemKeys: ['hotels.policyMenores1', 'hotels.policyMenores2', 'hotels.policyMenores3', 'hotels.policyMenores4'] },
]

export function PoliciesBlockNew() {
  const { t } = useTranslation()
  return (
    <section className="bg-[#FAF5EF] text-[#1C1812] py-20 sm:py-28 px-6 sm:px-10 border-t border-[#1C1812]/10">
      <div className="max-w-4xl mx-auto">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7B4B2A] mb-6 text-center">
          {t('hotels.especificacionesPoliticasHeader')}
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1812] tracking-tight text-center mb-10">
          {t('hotels.especificacionesPoliticasTitle')}
        </h2>
        <p className="text-[#2d2824] font-light leading-relaxed text-center mb-16 max-w-2xl mx-auto">
          {t('hotels.especificacionesPoliticasIntro')}
        </p>

        <div className="space-y-12">
          {POLICY_SECTIONS.map((p) => (
            <div key={p.titleKey} className="border-b border-[#1C1812]/10 pb-12 last:border-0 last:pb-0">
              <h3 className="font-serif text-xl sm:text-2xl text-[#1C1812] mb-6">
                {t(p.titleKey)}
              </h3>
              <ul className="space-y-3">
                {p.itemKeys.map((key) => (
                  <li key={key} className="flex gap-3 text-[#2d2824] font-light leading-relaxed">
                    <span className="text-[#7B4B2A] shrink-0">•</span>
                    <span>{t(key)}</span>
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
