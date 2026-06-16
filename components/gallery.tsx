'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { Reveal } from './reveal'

const images = [
  { src: '/images/gallery-1.jpeg', alt: 'Master bedroom with sweeping lake views', caption: 'The Master Suite' },
  { src: '/images/gallery-2.jpeg', alt: 'Infinity pool overlooking Lake Naivasha', caption: 'Infinity Pool' },
  { src: '/images/gallery-3.jpeg', alt: 'Outdoor dining terrace at dusk', caption: 'Alfresco Dining' },
  { src: '/images/gallery-4.jpeg', alt: 'Stone bathtub by a panoramic window', caption: 'Spa Bathroom' },
  { src: '/images/gallery-5.jpeg', alt: 'Villa exterior at twilight', caption: 'Villa Exterior' },
  { src: '/images/gallery-6.jpeg', alt: 'Fireside reading nook', caption: 'The Library Nook' },
]

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  const close = () => setActive(null)
  const prev = () =>
    setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length))
  const next = () =>
    setActive((i) => (i === null ? i : (i + 1) % images.length))

  return (
    <section id="gallery" className="bg-card py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-accent">
              <span className="h-px w-6 bg-accent" />
              The Villa
            </p>
            <h2 className="max-w-md text-balance font-serif text-4xl font-light leading-tight tracking-tight sm:text-5xl">
              Every room opens to{' '}
              <em className="not-italic text-gold-gradient">the water.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="text-right">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Six curated spaces — tap any frame<br className="hidden sm:block" /> to explore full screen.
              </p>
              <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {images.length} Spaces
              </span>
            </div>
          </Reveal>
        </div>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[240px] lg:grid-cols-3 lg:gap-4">
          {images.map((img, i) => {
            const isSpan = i === 0 || i === 3
            return (
              <motion.button
                key={img.src}
                type="button"
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: (i % 3) * 0.09 }}
                className={`group relative overflow-hidden rounded-sm ${isSpan ? 'row-span-2' : ''}`}
              >
                <img
                  src={img.src || '/placeholder.svg'}
                  alt={img.alt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />
                {/* Gold shimmer overlay on hover */}
                <span className="absolute inset-0 gold-shimmer opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                {/* Dark gradient + caption */}
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="flex items-end justify-between">
                    <span className="font-serif text-lg text-white">{img.caption}</span>
                    <Maximize2 className="size-4 text-white/70" />
                  </span>
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/97 p-4 backdrop-blur-sm"
          >
            {/* Image counter */}
            <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs tracking-widest text-white/60">
              {active + 1} / {images.length}
            </div>

            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <X className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-3 flex size-12 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:bg-white/10 hover:text-white sm:left-8"
            >
              <ChevronLeft className="size-6" />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center gap-3"
            >
              <img
                src={images[active].src || '/placeholder.svg'}
                alt={images[active].alt}
                className="max-h-[80vh] max-w-[88vw] rounded-sm object-contain shadow-2xl"
              />
              <p className="font-serif text-lg italic text-white/60">{images[active].caption}</p>
            </motion.div>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-3 flex size-12 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:bg-white/10 hover:text-white sm:right-8"
            >
              <ChevronRight className="size-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
