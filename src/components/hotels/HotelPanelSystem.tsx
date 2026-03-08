'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { HotelItem } from '@/app/hotels/page'

interface Props {
  hotels: readonly HotelItem[]
}

export function HotelPanelSystem({ hotels }: Props) {
  const [activeId, setActiveId] = useState(hotels[0].id)
  const active = hotels.find((h) => h.id === activeId) ?? hotels[0]

  return (
    <section className="bg-[#0f0d0b] py-16 sm:py-24 px-6 sm:px-10" id="portafolio">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c4a574] mb-8">
          Portafolio de hospedaje
        </p>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Selector */}
          <div className="lg:w-[280px] shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {hotels.map((h) => {
              const isActive = activeId === h.id
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setActiveId(h.id)}
                  className={cn(
                    'shrink-0 lg:w-full text-left px-5 py-4 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7B4B2A]/50 focus:ring-offset-2 focus:ring-offset-[#0f0d0b]',
                    isActive
                      ? 'bg-[#1C1812] border-[#7B6B4A] text-[#FAF5EF]'
                      : 'bg-[#1C1812]/40 border-[#2d2824] text-[#FAF5EF]/70 hover:border-[#7B6B4A]/50 hover:text-[#FAF5EF]'
                  )}
                >
                  <span className="font-serif text-lg block truncate">{h.name}</span>
                </button>
              )
            })}
          </div>

          {/* Panel activo: una sola ficha */}
          <div className="flex-1 min-w-0 border border-[#2d2824] rounded-xl overflow-hidden bg-[#1C1812]">
            <div key={active.id} className="animate-in fade-in duration-300">
              {/* Cabecera */}
              <div className="px-6 sm:px-10 py-8 border-b border-[#2d2824]">
                <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF5EF] tracking-tight">
                  {active.name}
                </h2>
              </div>

              <div className="flex flex-col md:flex-row">
                {/* Especificaciones */}
                <div className="md:w-[38%] p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[#2d2824] bg-[#0f0d0b]/50">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c4a574] mb-6">
                    Especificaciones
                  </p>
                  <ul className="space-y-4">
                    {active.specs.map((s, i) => (
                      <li key={i} className="flex gap-3 text-sm text-[#FAF5EF]/80 font-light leading-relaxed">
                        <span className="text-[#7B6B4A] mt-1.5 shrink-0">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Matriz de tarifas */}
                <div className="flex-1 p-6 sm:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c4a574] mb-6">
                    Tarifas por noche (MXN)
                  </p>
                  <div className="overflow-x-auto -mx-2 sm:mx-0">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#2d2824]">
                          <th className="text-[10px] font-bold uppercase tracking-widest text-[#FAF5EF]/50 py-3 pr-4">
                            Categoría
                          </th>
                          {active.rates.length > 0 && 'priceWithTaxes' in active.rates[0] ? (
                            <>
                              <th className="text-[10px] font-bold uppercase tracking-widest text-[#FAF5EF]/50 py-3 pr-4 text-right">
                                Sin imp.
                              </th>
                              <th className="text-[10px] font-bold uppercase tracking-widest text-[#FAF5EF]/50 py-3 pr-4 text-right">
                                Con imp.
                              </th>
                            </>
                          ) : (
                            <th className="text-[10px] font-bold uppercase tracking-widest text-[#FAF5EF]/50 py-3 pr-4 text-right">
                              Tarifa
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {active.rates.map((r, i) => (
                          <tr
                            key={i}
                            className="border-b border-[#2d2824]/80 last:border-0 hover:bg-[#0f0d0b]/30 transition-colors"
                          >
                            <td className="py-4 pr-4 font-medium text-[#FAF5EF] text-sm sm:text-base">
                              {r.roomName}
                            </td>
                            {'priceWithTaxes' in r ? (
                              <>
                                <td className="py-4 pr-4 text-right font-mono text-[#FAF5EF]/70 text-sm">
                                  ${r.priceWithoutTaxes?.toLocaleString('es-MX')}
                                </td>
                                <td className="py-4 pr-4 text-right font-serif text-lg sm:text-xl text-[#c4a574]">
                                  ${r.priceWithTaxes?.toLocaleString('es-MX')}
                                </td>
                              </>
                            ) : (
                              <td className="py-4 pr-4 text-right font-serif text-lg sm:text-xl text-[#c4a574]">
                                ${(r as { onlyPrice: number }).onlyPrice?.toLocaleString('es-MX')}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {active.note && (
                    <div className="mt-8 py-4 px-4 rounded-lg bg-[#2e4a3d]/20 border border-[#2e4a3d]/30">
                      <p className="text-sm font-medium text-[#FAF5EF]/90 text-center">
                        {active.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
