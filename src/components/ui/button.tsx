import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
    variant?: 'default' | 'outline' | 'ghost' | 'link' | 'premium'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'

        // Manual variant implementation for elegance without extra libs
        const variantClasses = {
            default: 'bg-[#0A192F] text-white hover:bg-[#0A192F]/90 shadow',
            premium: 'bg-[#2E4A3D] text-[#E5D3B3] hover:bg-[#2E4A3D]/90 shadow-md transition-all hover:-translate-y-0.5',
            outline: 'border border-[#1A1A1A] text-[#1A1A1A] hover:bg-gray-50',
            ghost: 'hover:bg-gray-100 hover:text-gray-900',
            link: 'text-[#0A192F] underline-offset-4 hover:underline',
        }

        return (
            <Comp
                className={cn(
                    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0A192F] disabled:pointer-events-none disabled:opacity-50 h-11 px-8 py-2',
                    variantClasses[variant],
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = 'Button'

export { Button }
