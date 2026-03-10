'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LOCALE_COOKIE, type Locale, DEFAULT_LOCALE, getMessage, messages } from '@/lib/i18n'

type LocaleContextValue = {
  locale: Locale
  setLocale: (next: Locale) => void
  t: (key: string) => string
}

const Context = createContext<LocaleContextValue | null>(null)

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : undefined
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return
  const d = new Date()
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;sameSite=lax;max-age=${days * 24 * 60 * 60}`
}

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale?: Locale
}) {
  const router = useRouter()
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (initialLocale && (initialLocale === 'es' || initialLocale === 'en')) return initialLocale
    const fromCookie = getCookie(LOCALE_COOKIE)
    if (fromCookie === 'es' || fromCookie === 'en') return fromCookie
    return DEFAULT_LOCALE
  })

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    setCookie(LOCALE_COOKIE, next)
    if (typeof document !== 'undefined') document.documentElement.lang = next
    router.refresh()
  }, [router])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const t = useCallback(
    (key: string): string => {
      const msg = getMessage(messages[locale], key)
      return msg ?? key
    },
    [locale]
  )

  return (
    <Context.Provider value={{ locale, setLocale, t }}>
      {children}
    </Context.Provider>
  )
}

export function useTranslation(): LocaleContextValue {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useTranslation must be used within LocaleProvider')
  return ctx
}
