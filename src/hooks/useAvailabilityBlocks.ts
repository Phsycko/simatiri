'use client'

import { useState, useCallback, useEffect } from 'react'
import { getDaysInRange } from '@/lib/availability'

export type AvailabilityBlockItem = {
  id: number
  startDate: string
  endDate: string
  blockType?: string
  reason?: string
}

/** Set of YYYY-MM-DD that are blocked */
function blocksToSet(blocks: AvailabilityBlockItem[]): Set<string> {
  const set = new Set<string>()
  for (const b of blocks) {
    const days = getDaysInRange(b.startDate, b.endDate)
    days.forEach((d) => set.add(d))
  }
  return set
}

const API_PATH = '/api/availability'

export function useAvailabilityBlocks(from: string, to: string) {
  const [blocks, setBlocks] = useState<AvailabilityBlockItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBlocks = useCallback(async () => {
    setLoading(true)
    setError(null)
    const url = `${API_PATH}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`

    try {
      const res = await fetch(url)
      const rawText = await res.text()
      let data: { blocks?: AvailabilityBlockItem[]; error?: string; errorDetail?: string; code?: string }

      try {
        data = rawText ? JSON.parse(rawText) : {}
      } catch (parseErr) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('[useAvailabilityBlocks] Respuesta no es JSON:', {
            status: res.status,
            statusText: res.statusText,
            url,
            body: rawText.slice(0, 400),
          })
        }
        setError('La respuesta del servidor no es válida. Revisa la consola (F12) para más detalle.')
        setBlocks([])
        return
      }

      if (!res.ok) {
        const msg = data.errorDetail ?? data.error ?? `Error ${res.status}: ${res.statusText}`
        if (process.env.NODE_ENV !== 'production') {
          console.error('[useAvailabilityBlocks] API error:', {
            status: res.status,
            url,
            error: data.error,
            code: data.code,
            errorDetail: data.errorDetail,
          })
        }
        setError(msg)
        setBlocks([])
        return
      }

      const list = Array.isArray(data.blocks) ? data.blocks : []
      setBlocks(list)
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e)
      if (process.env.NODE_ENV !== 'production') {
        console.error('[useAvailabilityBlocks] Fetch failed:', { url, message, error: e })
      }
      setError('No se pudo conectar con el servidor. Comprueba tu conexión o intenta más tarde.')
      setBlocks([])
    } finally {
      setLoading(false)
    }
  }, [from, to])

  useEffect(() => {
    fetchBlocks()
  }, [fetchBlocks])

  const blockedSet = blocksToSet(blocks)
  const isBlocked = (dateStr: string) => blockedSet.has(dateStr)

  return { blocks, blockedSet, isBlocked, loading, error, refetch: fetchBlocks }
}
