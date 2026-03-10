'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react'
import { useTranslation } from '@/contexts/LocaleContext'

const PREVIEW_COUNT = 4

type HomeGalleryProps = {
  images: string[]
  /** When true, show only a compact preview (4 images + CTA); modal still has all images */
  previewMode?: boolean
}

export function HomeGallery({ images, previewMode = false }: HomeGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const { t } = useTranslation()

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)
  }, [images.length, selectedIndex])

  const goNext = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)
  }, [images.length, selectedIndex])

  const close = useCallback(() => setSelectedIndex(null), [])

  useEffect(() => {
    if (selectedIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIndex, close, goPrev, goNext])

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedIndex])

  if (!images.length) return null

  const previewImages = previewMode ? images.slice(0, PREVIEW_COUNT) : images

  const openModal = (index: number) => () => setSelectedIndex(index)

  if (previewMode) {
    return (
      <>
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 h-[320px] sm:h-[360px] md:h-[380px] [grid-template-rows:repeat(3,minmax(0,1fr))] md:[grid-template-rows:repeat(2,minmax(0,1fr))]"
        >
          {/* Main: full width mobile row 1; desktop 2x2 */}
          <button
            type="button"
            onClick={openModal(0)}
            className="group relative overflow-hidden rounded-xl bg-[#0a192f]/5 col-span-2 row-span-1 md:row-span-2 min-h-0 w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4B2A] focus-visible:ring-offset-2 text-left"
          >
            <div className="absolute inset-0">
              <Image
                src={previewImages[0]}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
            </div>
          </button>
          {/* Secondary 1: mobile row 2 col 1; desktop row 1 col 3 */}
          <button
            type="button"
            onClick={openModal(1)}
            className="group relative overflow-hidden rounded-xl bg-[#0a192f]/5 row-start-2 md:row-start-1 md:col-start-3 min-h-0 w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4B2A] focus-visible:ring-offset-2 text-left"
          >
            <div className="absolute inset-0">
              <Image
                src={previewImages[1]}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
            </div>
          </button>
          {/* Secondary 2: mobile row 2 col 2; desktop row 1 col 4 */}
          <button
            type="button"
            onClick={openModal(2)}
            className="group relative overflow-hidden rounded-xl bg-[#0a192f]/5 row-start-2 md:row-start-1 md:col-start-4 min-h-0 w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4B2A] focus-visible:ring-offset-2 text-left"
          >
            <div className="absolute inset-0">
              <Image
                src={previewImages[2]}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
            </div>
          </button>
          {/* Secondary 3: desktop only */}
          <button
            type="button"
            onClick={openModal(3)}
            className="group relative overflow-hidden rounded-xl bg-[#0a192f]/5 row-start-2 col-start-3 min-h-0 w-full h-full hidden md:block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4B2A] focus-visible:ring-offset-2 text-left"
          >
            <div className="absolute inset-0">
              <Image
                src={previewImages[3]}
                alt=""
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
            </div>
          </button>
          {/* CTA: mobile row 3 full width; desktop row 2 col 4 */}
          <button
            type="button"
            onClick={openModal(0)}
            className="group relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4B2A] focus-visible:ring-offset-2 text-left min-h-0 w-full h-full row-start-3 col-span-2 md:row-start-2 md:col-start-4 flex items-center justify-center"
          >
            <div className="absolute inset-0">
              <Image
                src={previewImages[2]}
                alt=""
                fill
                sizes="25vw"
                className="object-cover scale-105 blur-md group-hover:blur-sm group-hover:scale-110 transition-all duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-3 md:p-4 z-10">
              <Images className="text-white drop-shadow-md group-hover:drop-shadow-lg transition-all shrink-0" size={24} strokeWidth={1.5} />
              <span className="text-white text-xs md:text-sm font-semibold uppercase tracking-wider drop-shadow-md">{t('home.galleryExplorarColeccion')}</span>
              <span className="text-white/90 text-[10px] md:text-xs drop-shadow-sm">{images.length} {t('home.galleryImagenes')}</span>
            </div>
          </button>
        </div>

        <Modal
          images={images}
          selectedIndex={selectedIndex}
          onClose={close}
          onPrev={goPrev}
          onNext={goNext}
        />
      </>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 auto-rows-[minmax(200px,1fr)]">
        {images.map((src, i) => {
          const isTall = (i + 1) % 5 === 0 || (i + 1) % 7 === 0
          return (
            <button
              key={src}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={`group relative overflow-hidden rounded-xl bg-[#0a192f]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4B2A] focus-visible:ring-offset-2 text-left ${isTall ? 'sm:row-span-2' : ''}`}
            >
              <div className={`relative w-full ${isTall ? 'sm:min-h-[320px] h-full' : 'aspect-[4/3]'}`}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </button>
          )
        })}
      </div>

      <Modal
        images={images}
        selectedIndex={selectedIndex}
        onClose={close}
        onPrev={goPrev}
        onNext={goNext}
      />
    </>
  )
}

function Modal({
  images,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[]
  selectedIndex: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <AnimatePresence>
      {selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div
            className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-8 pointer-events-none"
            role="presentation"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-[85vh] max-h-[85vh] flex items-center justify-center pointer-events-auto"
            >
              <Image
                key={images[selectedIndex]}
                src={images[selectedIndex]}
                alt=""
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            <button
              type="button"
              aria-label="Cerrar"
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm pointer-events-auto"
            >
              <X size={24} strokeWidth={2} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Anterior"
                  onClick={onPrev}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm pointer-events-auto"
                >
                  <ChevronLeft size={28} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  aria-label="Siguiente"
                  onClick={onNext}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm pointer-events-auto"
                >
                  <ChevronRight size={28} strokeWidth={2} />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
