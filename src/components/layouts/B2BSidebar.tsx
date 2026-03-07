'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Compass, Users, CreditCard, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

export function B2BSidebar() {
    const pathname = usePathname()

    const links = [
        { name: 'Dashboard', href: '/portal', icon: LayoutDashboard },
        { name: 'Cotizador', href: '/portal/quotes', icon: Compass },
        { name: 'CRM (Clientes)', href: '/portal/crm', icon: Users },
        { name: 'Pagos & Anticipos', href: '/portal/payments', icon: CreditCard },
        { name: 'Configuración', href: '/portal/settings', icon: Settings },
    ]

    return (
        <aside className="w-64 bg-[#0a192f] text-white hidden md:flex flex-col min-h-screen shrink-0">
            <div className="p-6">
                <div className="font-serif text-2xl tracking-tight font-semibold text-[#e5d3b3] mb-8">
                    SIMATIRI.
                </div>
                <nav className="space-y-2">
                    {links.map((link) => {
                        const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    'flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm transition-colors',
                                    isActive
                                        ? 'bg-[#2e4a3d] text-white font-medium shadow-sm'
                                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                                )}
                            >
                                <link.icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                                <span>{link.name}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-white/10">
                <button className="flex items-center space-x-3 text-white/50 hover:text-white transition-colors text-sm w-full text-left">
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    )
}
