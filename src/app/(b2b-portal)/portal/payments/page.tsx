'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Filter, AlertCircle, CheckCircle2 } from 'lucide-react'

// Dummy Data
const payments = [
    { id: 'RES-8902', client: 'Familia Gómez', type: 'Grupo (12 pax)', total: 320500, paid: 160250, due: 160250, dueDate: '2026-03-25', status: 'warning', msg: 'Pago total vence en 2 días (Regla 20 días Mínimo)' },
    { id: 'RES-8915', client: 'Juan Pérez', type: 'Individual (2 pax)', total: 55400, paid: 55400, due: 0, dueDate: '2026-04-10', status: 'paid', msg: 'Pagado en su totalidad' },
    { id: 'RES-8924', client: 'Grupo Empresarial Norte', type: 'Grupo (24 pax)', total: 645000, paid: 0, due: 322500, dueDate: '2026-03-15', status: 'danger', msg: 'Anticipo 50% pendiente de reporte urgente.' },
]

export default function PaymentsPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="font-serif text-3xl font-semibold text-[#0a192f] tracking-tight">Liquidador de Pagos y Anticipos</h1>
                    <p className="text-gray-500 mt-1">Sube tus comprobantes de pago. Recuerda: Anticipos del 50% requeridos. Pago total a 20 días en grupos, 5 días en individuales.</p>
                </div>
                <Button className="bg-[#0a192f] hover:bg-[#1a2942] text-white">
                    + Reportar Pago
                </Button>
            </div>

            <Card>
                <CardHeader className="pb-4 border-b border-gray-100 flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-4 w-full max-w-md">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input type="text" placeholder="Buscar por ID de Reserva o Cliente..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white transition-colors outline-none focus:border-[#0a192f]" />
                        </div>
                    </div>
                    <Button variant="outline" className="text-sm rounded-lg flex gap-2">
                        <Filter size={16} /> Filtros
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Reserva</th>
                                    <th className="px-6 py-4 font-medium">Cliente / Tipo</th>
                                    <th className="px-6 py-4 font-medium text-right">Monto Total</th>
                                    <th className="px-6 py-4 font-medium text-right">Abonado (Comprobado)</th>
                                    <th className="px-6 py-4 font-medium text-right">Saldo Restante</th>
                                    <th className="px-6 py-4 font-medium">Estado / Alertas (Políticas B2B)</th>
                                    <th className="px-6 py-4 font-medium">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {payments.map((p, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-[#0a192f]"><a href="#" className="hover:underline">{p.id}</a></td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">{p.client}</div>
                                            <div className="text-xs text-gray-500">{p.type}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">${p.total.toLocaleString()} MXN</td>
                                        <td className="px-6 py-4 text-right text-gray-500">${p.paid.toLocaleString()} MXN</td>
                                        <td className="px-6 py-4 text-right font-bold text-[#0a192f]">${p.due.toLocaleString()} MXN</td>
                                        <td className="px-6 py-4">
                                            {p.status === 'danger' && (
                                                <div className="flex items-center text-red-600 gap-2 text-xs font-semibold bg-red-50 px-2 py-1 rounded w-fit">
                                                    <AlertCircle size={14} /> {p.msg}
                                                </div>
                                            )}
                                            {p.status === 'warning' && (
                                                <div className="flex items-center text-[#b8860b] gap-2 text-xs font-semibold bg-yellow-50 px-2 py-1 rounded w-fit">
                                                    <AlertCircle size={14} /> {p.msg}
                                                </div>
                                            )}
                                            {p.status === 'paid' && (
                                                <div className="flex items-center text-green-700 gap-2 text-xs font-semibold bg-green-50 px-2 py-1 rounded w-fit">
                                                    <CheckCircle2 size={14} /> {p.msg}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button variant="ghost" className="text-sm font-semibold text-[#0a192f]" disabled={p.status === 'paid'}>
                                                Pagar Saldo
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
