'use client'
import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Mail, Phone, Calendar, MoreHorizontal } from 'lucide-react'

const leads = [
    { name: 'Diana Salazar', status: 'Cotizando', date: '2026-03-05', email: 'diana.s@empresa.com', phone: '+52 55 1234 5678', destination: 'Barrancas Express', value: '$45,000' },
    { name: 'Ricardo Nuñez', status: 'Nuevo Lead', date: '2026-03-05', email: 'rick.nunez@gmail.com', phone: '+52 55 9876 5432', destination: 'Creel Mágico', value: 'Por definir' },
    { name: 'Familia Torres', status: 'Enviado', date: '2026-03-04', email: 'familia.torres@gmail.com', phone: '+52 81 2233 4455', destination: 'Chihuahua a Mochis', value: '$120,400' },
]

export default function CRMPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="font-serif text-3xl font-semibold text-[#0a192f] tracking-tight">CRM Clientes (Agencia)</h1>
                    <p className="text-gray-500 mt-1">Gestiona los prospectos de tu agencia, visualiza su estatus y conviértelos en reservaciones Simatiri.</p>
                </div>
                <Button className="bg-[#2e4a3d] hover:bg-[#1a2942] text-white">
                    + Nuevo Prospecto
                </Button>
            </div>

            {/* Simple Kanban / Table View for Leads */}
            <Card>
                <CardHeader className="pb-4 border-b border-gray-100">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input type="text" placeholder="Buscar pasajero..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white transition-colors outline-none focus:border-[#0a192f]" />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Nombre Pasajero Principal</th>
                                    <th className="px-6 py-4 font-medium">Contacto</th>
                                    <th className="px-6 py-4 font-medium">Destino Interés</th>
                                    <th className="px-6 py-4 font-medium">Presupuesto / Valor</th>
                                    <th className="px-6 py-4 font-medium">Estatus</th>
                                    <th className="px-6 py-4 font-medium">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {leads.map((lead, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">{lead.name}</div>
                                            <div className="text-xs text-gray-400 flex items-center gap-1 mt-1"><Calendar size={12} /> {lead.date}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 space-y-1">
                                            <div className="flex items-center gap-2"><Mail size={14} className="text-gray-400" /> {lead.email}</div>
                                            <div className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /> {lead.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-800 font-medium">{lead.destination}</td>
                                        <td className="px-6 py-4 text-[#0a192f] font-semibold">{lead.value}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded font-bold ${lead.status === 'Cotizando' ? 'bg-blue-50 text-blue-700' :
                                                lead.status === 'Nuevo Lead' ? 'bg-gray-100 text-gray-700' :
                                                    'bg-yellow-50 text-yellow-700'
                                                }`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                                                <MoreHorizontal size={18} />
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
