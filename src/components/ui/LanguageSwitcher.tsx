'use client'

import { useTranslation } from '@/contexts/LocaleContext'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useTranslation()

  return (
    <div
      className={cn('flex items-center rounded-full border border-[#DDD8D2] bg-white/80 p-0.5', className)}
      role="group"
      aria-label="Language"
    >
      {(['es', 'en'] as Locale[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLocale(lang)}
          className={cn(
            'min-w-[2.25rem] rounded-full px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200',
            locale === lang
              ? 'bg-[#7B4B2A] text-white shadow-sm'
              : 'text-gray-500 hover:text-[#0a192f] hover:bg-gray-100/80'
          )}
        >
          {lang === 'es' ? 'ES' : 'EN'}
        </button>
      ))}
    </div>
  )
}
