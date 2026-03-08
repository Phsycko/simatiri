import { getHomeGalleryImages } from '@/lib/home-gallery'
import { HomeGallery } from '@/components/home/HomeGallery'

export async function HomeGallerySection() {
  const images = getHomeGalleryImages()
  if (!images.length) return null

  return (
    <section className="py-14 md:py-20 px-8 bg-[#fafaf9] border-y border-gray-100/80">
      <div className="max-w-6xl mx-auto w-full">
        <header className="mb-8 md:mb-10 text-center max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#7B4B2A] font-semibold mb-2">
            Galería
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-[#0a192f] mb-2">
            La Sierra en imágenes
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Un vistazo a los paisajes y experiencias que nos definen.
          </p>
        </header>
        <HomeGallery images={images} previewMode />
      </div>
    </section>
  )
}
