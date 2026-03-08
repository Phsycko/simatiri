'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { SimatiriLogo } from '@/components/ui/SimatiriLogo'

const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Destinos', href: '/destinations' },
    { label: 'Experiencias', href: '/experiences' },
    { label: 'Paquetes', href: '/packages' },
    { label: 'Hoteles', href: '/hotels' },
    // { label: 'Journal', href: '/journal' }, // Oculto temporalmente por petición
    { label: 'Nosotros', href: '/about' },
]

export function Navbar() {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isHome = pathname === '/'

    return (
        <>
            <header className="fixed top-0 w-full z-50 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 md:h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <Image
                            src="/logo.png"
                            alt="SIMATIRI EXPERIENCE"
                            width={180}
                            height={72}
                            className="h-10 md:h-12 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'text-sm font-medium transition-colors relative group',
                                    pathname === link.href || pathname.startsWith(link.href + '/')
                                        ? 'text-[#0a192f]'
                                        : 'text-gray-500 hover:text-[#0a192f]'
                                )}
                            >
                                {link.label}
                                <span
                                    className={cn(
                                        'absolute -bottom-1 left-0 w-0 h-px bg-[#7B4B2A] transition-all duration-300 group-hover:w-full',
                                        (pathname === link.href || pathname.startsWith(link.href + '/')) && 'w-full'
                                    )}
                                />
                            </Link>
                        ))}
                    </nav>

                    {/* CTA + Mobile Toggle */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/tailor-made-trip"
                            className="hidden md:inline-flex text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full bg-[#7B4B2A] hover:bg-[#8B5A36] active:bg-[#6A3F23] text-[#FFFFFF] shadow-none transition-all duration-[250ms] ease-in-out border-none"
                        >
                            Cotizar Viaje
                        </Link>

                        <button
                            onClick={() => setMobileOpen(true)}
                            className="lg:hidden p-2 rounded-md transition-colors text-[#0a192f]"
                        >
                            <Menu size={22} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-[100] flex">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="relative ml-auto w-72 bg-white h-full flex flex-col shadow-2xl">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <span className="font-serif text-lg font-semibold text-[#0a192f]">SIMATIRI</span>
                            <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-gray-700">
                                <X size={22} />
                            </button>
                        </div>
                        <nav className="flex flex-col p-6 space-y-1 flex-1 overflow-y-auto">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                        'px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                                        pathname === link.href
                                            ? 'bg-[#0a192f] text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                onClick={() => setMobileOpen(false)}
                                className="px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                Contacto
                            </Link>
                        </nav>
                        <div className="p-6 border-t border-gray-100">
                            <Link
                                href="/tailor-made-trip"
                                onClick={() => setMobileOpen(false)}
                                className="block w-full text-center text-xs font-semibold uppercase tracking-widest px-5 py-3 rounded-full bg-[#7B4B2A] hover:bg-[#8B5A36] active:bg-[#6A3F23] text-[#FFFFFF] shadow-none transition-all duration-[250ms] ease-in-out border-none"
                            >
                                Cotizar Viaje Personalizado
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
