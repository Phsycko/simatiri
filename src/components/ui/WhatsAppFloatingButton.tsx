'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getWhatsAppUrl } from '@/lib/site-config'

const SITE_NAME = 'Simatiri Experience'
const SHARE_TEXT = 'Te comparto esta página de Simatiri Experience.'
const SCROLL_THRESHOLD = 180

const spring = { type: 'spring' as const, stiffness: 400, damping: 36 }
const springSlow = { type: 'spring' as const, stiffness: 320, damping: 34 }

/**
 * Premium floating contact: WhatsApp (primary) + Share (secondary).
 * Expands at top of page, compacts on scroll. Luxury positioning, shadows, and motion.
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
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.6, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed bottom-8 right-8 z-40 flex flex-col-reverse sm:flex-row items-end sm:items-center"
        style={{ gap: compact ? '10px' : '16px' }}
      >
        {/* Secundario: Compartir — expandido con texto, compacto como pastilla centrada */}
        <motion.button
          type="button"
          onClick={handleShare}
          aria-label="Compartir esta página"
          animate={{
            paddingLeft: compact ? 14 : 20,
            paddingRight: compact ? 14 : 20,
            paddingTop: compact ? 14 : 15,
            paddingBottom: compact ? 14 : 15,
            boxShadow: compact
              ? '0 1px 0 0 rgba(255,255,255,0.7) inset, 0 2px 10px rgba(28,24,18,0.06)'
              : '0 1px 0 0 rgba(255,255,255,0.8) inset, 0 2px 8px rgba(28,24,18,0.06), 0 8px 24px rgba(28,24,18,0.08)',
          }}
          transition={spring}
          whileHover={{
            y: -2,
            scale: 1.03,
            boxShadow: compact
              ? '0 1px 0 0 rgba(255,255,255,0.8) inset, 0 4px 16px rgba(28,24,18,0.1)'
              : '0 1px 0 0 rgba(255,255,255,0.9) inset, 0 4px 12px rgba(28,24,18,0.08), 0 12px 32px rgba(28,24,18,0.12)',
          }}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center rounded-full border-2 border-[#D4C9BC] bg-[#FBF9F6] backdrop-blur-md text-[#1C1812] transition-colors duration-200 hover:border-[#C4B8A8] focus:outline-none focus:ring-2 focus:ring-[#7B4B2A]/30 focus:ring-offset-2 focus:ring-offset-[#FBF9F6] min-w-0 overflow-hidden min-h-[48px] sm:min-h-0 ${compact ? 'justify-center min-w-[48px]' : 'justify-center sm:justify-start gap-2.5'}`}
        >
          <span className="shrink-0 flex items-center justify-center text-[#7B4B2A]">
            <ShareIconRefined
              className={compact ? 'h-5 w-5' : 'h-4 w-4 sm:h-5 sm:w-5'}
              strokeWidth={compact ? 1.5 : 1.4}
            />
          </span>
          <span className="overflow-hidden whitespace-nowrap flex items-center min-w-0">
            <motion.span
              animate={{
                opacity: compact ? 0 : 1,
                maxWidth: compact ? 0 : 100,
              }}
              transition={springSlow}
              className="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#1C1812]"
            >
              Compartir
            </motion.span>
          </span>
        </motion.button>

        {/* Principal: Hablar con un asesor — expandido con texto, compacto como pastilla centrada */}
        <motion.a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hablar con un asesor por WhatsApp"
          animate={{
            paddingLeft: compact ? 14 : 28,
            paddingRight: compact ? 14 : 28,
            paddingTop: compact ? 14 : 16,
            paddingBottom: compact ? 14 : 16,
            boxShadow: compact
              ? '0 1px 0 0 rgba(255,255,255,0.1) inset, 0 3px 12px rgba(123,75,42,0.28)'
              : '0 1px 0 0 rgba(255,255,255,0.12) inset, 0 4px 14px rgba(123,75,42,0.35), 0 12px 32px rgba(28,24,18,0.2)',
          }}
          transition={spring}
          whileHover={{
            y: -2,
            scale: 1.03,
            boxShadow: compact
              ? '0 1px 0 0 rgba(255,255,255,0.12) inset, 0 6px 20px rgba(123,75,42,0.38)'
              : '0 1px 0 0 rgba(255,255,255,0.1) inset, 0 6px 20px rgba(123,75,42,0.4), 0 16px 40px rgba(28,24,18,0.25)',
          }}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center rounded-full border border-[#5A3828]/50 bg-[#7B4B2A] text-white transition-colors duration-200 hover:bg-[#6B3D22] hover:border-[#4A2E1F] focus:outline-none focus:ring-2 focus:ring-[#7B4B2A]/50 focus:ring-offset-2 focus:ring-offset-white min-w-0 overflow-hidden min-h-[48px] sm:min-h-0 ${compact ? 'justify-center min-w-[48px]' : 'justify-center sm:justify-start gap-2.5 sm:gap-3'}`}
        >
          <span className="shrink-0 flex items-center justify-center text-white">
            <WhatsAppIcon className={compact ? 'h-5 w-5' : 'h-5 w-5 md:h-6 md:w-6'} />
          </span>
          <span className="overflow-hidden whitespace-nowrap flex items-center min-w-0">
            <motion.span
              animate={{
                opacity: compact ? 0 : 1,
                maxWidth: compact ? 0 : 260,
              }}
              transition={springSlow}
              className="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-white"
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-24 right-8 z-50 sm:bottom-28 sm:right-8"
          >
            <div className="rounded-full border border-[#2e4a3d]/25 bg-[#1C1812]/95 backdrop-blur-md px-5 py-3 shadow-[0_8px_32px_rgba(28,24,18,0.3)]">
              <span className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#FAF5EF]">
                <CheckIcon className="h-4 w-4 text-[#B7925A] shrink-0" />
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
  strokeWidth = 1.4,
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
