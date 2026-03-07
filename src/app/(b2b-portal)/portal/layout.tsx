import React from 'react'
import { B2BHeader } from '@/components/layouts/B2BHeader'
import { B2BSidebar } from '@/components/layouts/B2BSidebar'

export default function B2BLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-[#f8f9fa] selection:bg-[#e5d3b3] selection:text-[#0a192f] text-gray-900 font-sans">
            <B2BSidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                <B2BHeader />
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
