'use client'
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Train, MapPin, Users, Info, ShieldCheck } from 'lucide-react'

// Dummy Data from Business Rules Phase 5
const packages = [
    { id: 1, title: 'Paquete 1: El Fuerte → Creel → El Fuerte', days: 7, train: 'CHEPE EXPRESS', priceDoble: 27700, priceTriple: 25400 },
    { id: 2, title: 'Paquete 2: Chihuahua → Creel → Divisadero', days: 6, train: 'CHEPE REGIONAL', priceDoble: 10400, priceTriple: 9470, upgradeExpressDoble: 11400 },
    { id: 4, title: 'Paquete 4: Barrancas Rápidas', days: 5, train: 'CHEPE EXPRESS', priceDoble: 11400, priceTriple: 10200 },
]

export default function QuoteBuilderPage() {
    const [selectedPackage, setSelectedPackage] = useState(packages[1]) // Default Pak 2
    const [adults, setAdults] = useState(2)
    const [children, setChildren] = useState(0)
    const [isUpgrade, setIsUpgrade] = useState(false)
    const [occupancy, setOccupancy] = useState('doble')

    // Commission 10%
    const commissionRate = 0.10

    // Calculate Prices
    // If upgrade selected and package has upgrade price, use it, else base double.
    // Real logic would be complex in pricing module. 
    // This is a UI mockup of FASE 6 Business Engine.
    const basePrice = isUpgrade && selectedPackage.upgradeExpressDoble
        ? selectedPackage.upgradeExpressDoble
        : selectedPackage.priceDoble

    const totalAdultsPrice = basePrice * adults
    const totalChildrenPrice = (basePrice * 0.5) * children // 5-10 yrs half price

    const totalPublic = totalAdultsPrice + totalChildrenPrice
    const totalCommission = totalPublic * commissionRate
    const totalNet = totalPublic - totalCommission
    const advancePayment = totalPublic * 0.5 // 50% anticipo

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="font-serif text-3xl font-semibold text-[#0a192f] tracking-tight">Cotizador B2B Avanzado</h1>
                <p className="text-gray-500 mt-1">Calcula precios en tiempo real para Barrancas del Cobre y Genera Vouchers.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Builder Form */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <MapPin size={18} className="text-[#2e4a3d]" />
                                1. Selección de Producto
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-2">Paquete Turístico</label>
                                <select
                                    className="w-full border border-gray-200 rounded-md p-3 text-sm focus:ring-[#0a192f] focus:border-[#0a192f] outline-none"
                                    value={selectedPackage.id}
                                    onChange={(e) => {
                                        const pak = packages.find(p => p.id === parseInt(e.target.value))
                                        if (pak) { setSelectedPackage(pak); setIsUpgrade(false) }
                                    }}
                                >
                                    {packages.map(p => (
                                        <option key={p.id} value={p.id}>{p.title} ({p.days} Días)</option>
                                    ))}
                                </select>
                            </div>

                            {selectedPackage.upgradeExpressDoble && (
                                <div className="bg-[#e5d3b3]/20 p-4 rounded-lg border border-[#e5d3b3]/50 flex items-start space-x-3">
                                    <Train className="text-[#7B4B2A] mt-0.5" size={20} />
                                    <div>
                                        <h4 className="font-semibold text-sm text-[#0a192f]">Upgrade Disponible: CHEPE Express</h4>
                                        <p className="text-xs text-gray-600 mt-1 mb-3">Este paquete usa tren regional, puedes ofrecer un upgrade a Express Primera Clase.</p>
                                        <label className="flex items-center space-x-2 text-sm">
                                            <input type="checkbox" checked={isUpgrade} onChange={e => setIsUpgrade(e.target.checked)} className="rounded border-gray-300 text-[#0a192f] focus:ring-[#0a192f]" />
                                            <span>Aplicar Upgrade Express</span>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Users size={18} className="text-[#2e4a3d]" />
                                2. Configuración de Pasajeros y Ocupación
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-2">Adultos</label>
                                <input
                                    type="number" min="1" max="10" value={adults} onChange={e => setAdults(parseInt(e.target.value) || 1)}
                                    className="w-full border border-gray-200 rounded-md p-3 text-sm outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-2">
                                    Menores (5-10 años)
                                    <span className="text-[10px] text-gray-400 font-normal block">Pagan 50%</span>
                                </label>
                                <input
                                    type="number" min="0" max="5" value={children} onChange={e => setChildren(parseInt(e.target.value) || 0)}
                                    className="w-full border border-gray-200 rounded-md p-3 text-sm outline-none"
                                />
                            </div>
                        </CardContent>
                    </Card>

                </div>

                {/* Right Col: Pricing Engine Panel */}
                <div className="space-y-6">
                    <div className="bg-[#0a192f] rounded-2xl p-6 text-white shadow-xl sticky top-24">
                        <h3 className="font-serif text-xl border-b border-white/10 pb-4 mb-4">Resumen de Cotización</h3>

                        <div className="space-y-3 text-sm mb-6">
                            <div className="flex justify-between">
                                <span className="text-white/70">Producto</span>
                                <span className="font-semibold text-right max-w-[150px] truncate">{selectedPackage.title}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/70">Tren</span>
                                <span className="font-semibold">{isUpgrade ? 'CHEPE EXPRESS' : selectedPackage.train}</span>
                            </div>
                            <div className="flex justify-between text-white/50">
                                <span>Base (x{adults} Adultos)</span>
                                <span>${totalAdultsPrice.toLocaleString()} MXN</span>
                            </div>
                            {children > 0 && (
                                <div className="flex justify-between text-[#e5d3b3]">
                                    <span>Descuento Menores (x{children})</span>
                                    <span>+ ${totalChildrenPrice.toLocaleString()} MXN</span>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-white/10 pt-4 mb-4">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Venta Público</span>
                                <span>${totalPublic.toLocaleString()} MXN</span>
                            </div>
                        </div>

                        {/* Breakdown de Agencia (Solo visible para B2B) */}
                        <div className="bg-white/5 rounded-lg p-3 text-xs space-y-2 mb-6 border border-white/10">
                            <div className="flex items-center gap-1 mb-2 text-[#e5d3b3] font-semibold">
                                <ShieldCheck size={14} /> Tu estructura (B2B)
                            </div>
                            <div className="flex justify-between">
                                <span>Comisión Agencia (10%)</span>
                                <span className="text-green-400">- ${totalCommission.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between font-bold border-t border-white/10 pt-2 mt-2">
                                <span>NETO A PAGAR:</span>
                                <span>${totalNet.toLocaleString()} MXN</span>
                            </div>
                        </div>

                        <Button className="w-full bg-[#2e4a3d] hover:bg-[#21382d] text-white">
                            Guardar y Generar PDF
                        </Button>

                        <p className="text-center text-[10px] text-white/40 mt-4 flex items-center justify-center gap-1">
                            <Info size={12} /> Requiere ${advancePayment.toLocaleString()} MXN de anticipo (50%)
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}
