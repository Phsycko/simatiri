import React from 'react'

export function B2BHeader() {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 w-full shrink-0">
            <div className="font-serif text-xl tracking-tight text-[#0a192f] font-semibold">
                SIMATIRI <span className="font-sans font-normal text-sm text-gray-400 ml-2">B2B Portal</span>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-right flex flex-col justify-center">
                    <span className="text-sm font-medium text-gray-900 leading-none">Agencia de Viajes Norte</span>
                    <span className="text-xs text-gray-500 mt-1">Comisión: 10%</span>
                </div>
                <div className="h-9 w-9 bg-[#e5d3b3] rounded-full flex items-center justify-center text-[#0a192f] font-semibold text-sm">
                    AV
                </div>
            </div>
        </header>
    )
}
