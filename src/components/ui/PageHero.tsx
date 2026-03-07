import { cn } from '@/lib/utils'

interface PageHeroProps {
    label?: string
    title: string
    subtitle?: string
    dark?: boolean
    size?: 'sm' | 'md' | 'lg'
    backgroundImage?: string
    overlay?: string
    children?: React.ReactNode
}

export function PageHero({
    label,
    title,
    subtitle,
    dark = true,
    size = 'md',
    backgroundImage,
    overlay,
    children
}: PageHeroProps) {
    return (
        <section
            className={cn(
                'relative w-full flex items-end overflow-hidden',
                !backgroundImage && dark
                    ? 'bg-gradient-to-br from-[#0a192f] via-[#1a2942] to-[#040c18] text-white'
                    : !backgroundImage && 'bg-[#f8f9fa] text-[#0a192f]',
                backgroundImage && 'text-white',
                size === 'lg' && 'min-h-[75vh] pt-40 pb-24',
                size === 'md' && 'min-h-[45vh] pt-40 pb-20',
                size === 'sm' && 'min-h-[30vh] pt-32 pb-14',
            )}
            style={backgroundImage ? {
                backgroundImage: `${overlay ? overlay + ', ' : ''}url('${backgroundImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            } : undefined}
        >
            {/* Subtle pattern overlay */}
            {dark && !backgroundImage && (
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
                />
            )}

            <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
                {label && (
                    <div className={cn(
                        'uppercase tracking-[0.3em] text-xs font-semibold mb-4',
                        dark ? 'text-[#7B4B2A]' : 'text-[#7B4B2A]'
                    )}>
                        {label}
                    </div>
                )}
                <h1 className={cn(
                    'font-serif font-semibold leading-tight tracking-tight',
                    size === 'lg' ? 'text-5xl md:text-7xl mb-6' : 'text-4xl md:text-5xl mb-4'
                )}>
                    {title}
                </h1>
                {subtitle && (
                    <p className={cn(
                        'font-light leading-relaxed max-w-2xl',
                        size === 'lg' ? 'text-lg md:text-xl' : 'text-base md:text-lg',
                        dark ? 'text-white/70' : 'text-gray-500'
                    )}>
                        {subtitle}
                    </p>
                )}
                {children && <div className="mt-8">{children}</div>}
            </div>
        </section>
    )
}
