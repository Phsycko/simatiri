'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getWhatsAppUrl } from '@/lib/site-config'

/**
 * Premium floating WhatsApp button — concierge-style, brand-aligned.
 * Not the generic green bubble; feels like direct access to a travel advisor.
 */
export function WhatsAppFloatingButton() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar con un asesor por WhatsApp"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full border border-[#B7925A]/25 bg-[#0a192f] px-4 py-3 text-[#F4EFE7] shadow-[0_4px_24px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-[#B7925A]/50 hover:shadow-[0_8px_32px_rgba(0,0,0,0.22)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#B7925A]/40 focus:ring-offset-2 focus:ring-offset-[#0a192f] md:bottom-8 md:right-8 md:px-5 md:py-3.5"
    >
      {/* WhatsApp icon — subtle, integrated (outline style in brand cream) */}
      <span className="flex shrink-0 items-center justify-center" aria-hidden>
        <WhatsAppIcon className="h-5 w-5 md:h-[22px] md:w-[22px]" />
      </span>
      <span className="hidden text-[11px] font-medium uppercase tracking-[0.2em] text-[#F4EFE7]/95 sm:inline md:text-xs">
        Hablar con un asesor
      </span>
    </motion.a>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}
