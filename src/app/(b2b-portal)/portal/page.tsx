import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Compass, Users, CreditCard, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function B2BDashboard() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="font-serif text-3xl font-semibold text-[#0a192f] tracking-tight">Bienvenido, Agencia Muestra</h1>
                <p className="text-gray-500 mt-1">Resumen de tu actividad comercial y comisiones con Simatiri Experience.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-[#2e4a3d]">
                    <CardHeader className="pb-2">
                        <CardDescription className="uppercase tracking-wider font-semibold text-xs flex justify-between">
                            Comisiones Generadas <CreditCard size={16} />
                        </CardDescription>
                        <CardTitle className="text-3xl font-sans">$24,500 <span className="text-sm font-normal text-gray-500">MXN</span></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-green-600 font-medium">+15% vs Mes Pasado</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription className="uppercase tracking-wider font-semibold text-xs flex justify-between">
                            Reservas Activas <Compass size={16} />
                        </CardDescription>
                        <CardTitle className="text-3xl font-sans">12</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-gray-500 font-medium">3 salen esta semana</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription className="uppercase tracking-wider font-semibold text-xs flex justify-between">
                            Cotizaciones Pendientes <Users size={16} />
                        </CardDescription>
                        <CardTitle className="text-3xl font-sans">8</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-[#0a192f] font-medium hover:underline cursor-pointer">Revisar leads</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                {/* Quick Actions */}
                <section>
                    <h2 className="text-sm uppercase tracking-widest font-semibold text-gray-400 mb-4">Acciones Rápidas</h2>
                    <div className="grid gap-4">
                        <div className="group bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between cursor-pointer">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-[#0a192f]/5 rounded-full flex items-center justify-center text-[#0a192f]">
                                    <Compass size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 group-hover:text-[#2e4a3d] transition-colors">Nueva Cotización Dínámica</h3>
                                    <p className="text-sm text-gray-500">Armar paquete con CHEPE y calcular comisión.</p>
                                </div>
                            </div>
                            <ArrowRight className="text-gray-300 group-hover:text-[#2e4a3d] transition-colors" />
                        </div>

                        <div className="group bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between cursor-pointer">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-[#0a192f]/5 rounded-full flex items-center justify-center text-[#0a192f]">
                                    <CreditCard size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 group-hover:text-[#2e4a3d] transition-colors">Reportar Pago</h3>
                                    <p className="text-sm text-gray-500">Subir comprobante de anticipo (50%).</p>
                                </div>
                            </div>
                            <ArrowRight className="text-gray-300 group-hover:text-[#2e4a3d] transition-colors" />
                        </div>
                    </div>
                </section>

                {/* Recent Activity */}
                <section>
                    <h2 className="text-sm uppercase tracking-widest font-semibold text-gray-400 mb-4">Actividad Reciente</h2>
                    <Card className="border-none shadow-sm">
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-100">
                                {[
                                    { text: 'Cotización #1042 creada', time: 'Hace 2 horas', status: 'Draft' },
                                    { text: 'Reserva #892 Confirmada (Anticipo)', time: 'Ayer', status: 'Confirmed' },
                                    { text: 'Pago rechazado Reserva #890', time: 'Ayer', status: 'Failed' },
                                ].map((act, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{act.text}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{act.time}</p>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-wider px-2 py-1 bg-gray-100 rounded text-gray-600 font-semibold">
                                            {act.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    )
}
