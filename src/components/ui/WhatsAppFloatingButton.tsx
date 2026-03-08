'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getWhatsAppUrl } from '@/lib/site-config'

const SITE_NAME = 'Simatiri Experience'
const SHARE_TEXT = 'Te comparto esta página de Simatiri Experience.'
const SCROLL_THRESHOLD = 180

const spring = { type: 'spring' as const, stiffness: 380, damping: 32 }

/**
 * Premium floating contact: WhatsApp (primary) + Share (secondary).
 * Expands at top of page, compacts on scroll. Refined share icon + smooth morph.
 */
export function WhatsAppFloatingButton() {
  const [mounted, setMounted] = useState(false)
  const [toast, setToast] = useState<'shared' | 'copied' | null>(null)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setCompact(window.scrollY > SCROLL_THRESHOLD)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [mounted])

  const handleShare = useCallback(async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const title = typeof document !== 'undefined' ? document.title : SITE_NAME

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title,
          text: SHARE_TEXT,
          url,
        })
        setToast('shared')
      } else {
        await navigator.clipboard.writeText(url)
        setToast('copied')
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      try {
        await navigator.clipboard.writeText(url)
        setToast('copied')
      } catch {
        setToast('copied')
      }
    }

    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className="fixed bottom-6 right-6 z-40 flex flex-col-reverse sm:flex-row items-end sm:items-center gap-2 md:bottom-8 md:right-8"
      >
        {/* Secundario: Compartir */}
        <motion.button
          type="button"
          onClick={handleShare}
          aria-label="Compartir esta página"
          animate={{
            paddingLeft: compact ? 12 : 18,
            paddingRight: compact ? 12 : 18,
            paddingTop: compact ? 10 : 13,
            paddingBottom: compact ? 10 : 13,
          }}
          transition={spring}
          className="flex items-center justify-center sm:justify-start gap-2 rounded-full border border-[#5C4033]/35 bg-[#FAF5EF]/95 backdrop-blur-sm text-[#1C1812] shadow-[0_2px_16px_rgba(28,24,18,0.08)] transition-colors duration-200 hover:border-[#7B4B2A]/50 hover:bg-[#FAF5EF] hover:shadow-[0_4px_20px_rgba(28,24,18,0.12)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#7B4B2A]/40 focus:ring-offset-2 focus:ring-offset-[#FAF5EF] min-w-0 overflow-hidden"
        >
          <span className="shrink-0 flex items-center justify-center text-[#7B4B2A]">
            <ShareIconRefined className={compact ? 'h-4 w-4' : 'h-4 w-4 sm:h-[19px] sm:w-[19px]'} strokeWidth={1.35} />
          </span>
          <span className="overflow-hidden whitespace-nowrap flex items-center min-w-0">
            <motion.span
              animate={{
                opacity: compact ? 0 : 1,
                maxWidth: compact ? 0 : 100,
              }}
              transition={spring}
              className="block text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-[#1C1812]"
            >
              Compartir
            </motion.span>
          </span>
        </motion.button>

        {/* Principal: Hablar con un asesor */}
        <motion.a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hablar con un asesor por WhatsApp"
          animate={{
            paddingLeft: compact ? 14 : 24,
            paddingRight: compact ? 14 : 24,
            paddingTop: compact ? 12 : 15,
            paddingBottom: compact ? 12 : 15,
          }}
          transition={spring}
          className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 rounded-full border border-[#5C4033]/40 bg-[#7B4B2A] text-white shadow-[0_4px_24px_rgba(123,75,42,0.35)] transition-colors duration-200 hover:bg-[#6B4028] hover:border-[#5C4033] hover:shadow-[0_8px_32px_rgba(123,75,42,0.4)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#7B4B2A]/60 focus:ring-offset-2 focus:ring-offset-white min-w-0 overflow-hidden"
        >
          <span className="shrink-0 flex items-center justify-center">
            <WhatsAppIcon className={compact ? 'h-5 w-5' : 'h-5 w-5 md:h-6 md:w-6'} />
          </span>
          <span className="overflow-hidden whitespace-nowrap flex items-center min-w-0">
            <motion.span
              animate={{
                opacity: compact ? 0 : 1,
                maxWidth: compact ? 0 : 240,
              }}
              transition={spring}
              className="block text-[11px] font-medium uppercase tracking-[0.2em] text-white md:text-xs"
            >
              Hablar con un asesor
            </motion.span>
          </span>
        </motion.a>
      </motion.div>

      {/* Toast premium */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
            className="fixed bottom-20 right-6 z-50 sm:bottom-24 sm:right-8 md:bottom-24 md:right-8"
          >
            <div className="rounded-full border border-[#2e4a3d]/30 bg-[#1C1812] px-4 py-2.5 shadow-[0_8px_32px_rgba(28,24,18,0.25)]">
              <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.15em] text-[#FAF5EF]">
                <CheckIcon className="h-3.5 w-3.5 text-[#7B6B4A] shrink-0" />
                {toast === 'copied' ? 'Enlace copiado' : 'Listo para compartir'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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

/** Icono editorial: arrow-up-right fino, lineal, premium */
function ShareIconRefined({
  className,
  strokeWidth = 1.35,
}: {
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17L17 7" />
      <path d="M17 7h-5.5M17 7v5.5" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
