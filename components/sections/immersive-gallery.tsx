'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const GALLERY_IMAGES = [
  '/images/villa-1.png',
  '/images/interior-1.png',
  '/images/spa.png',
  '/images/rice-terraces.png',
  '/images/villa-2.png',
  '/images/architecture.png',
  '/images/jungle.png',
  '/images/villa-3.png',
]

export function ImmersiveGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" })

  return (
    <section ref={sectionRef} id="gallery" className="py-32 bg-[var(--off-white)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2 className="font-serif text-5xl md:text-7xl font-light text-[var(--charcoal)] text-center mb-24">
          The World of Svarga
        </h2>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8">
          {GALLERY_IMAGES.map((src, i) => (
            <motion.div
              key={i}
              className="relative w-full mb-6 md:mb-8 break-inside-avoid cursor-pointer group"
              data-cursor="crosshair"
              onClick={() => setSelectedIndex(i)}
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
              transition={{ duration: 1.2, ease: [0.77, 0, 0.18, 1], delay: i * 0.1 }}
            >
              <div className="w-full relative overflow-hidden">
                <Image
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-[var(--gold)] pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedIndex(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null) }}
            >
              <X size={32} strokeWidth={1} />
            </button>

            <button 
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIndex(selectedIndex === 0 ? GALLERY_IMAGES.length - 1 : selectedIndex - 1)
              }}
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <button 
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIndex(selectedIndex === GALLERY_IMAGES.length - 1 ? 0 : selectedIndex + 1)
              }}
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-[1200px] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_IMAGES[selectedIndex]}
                alt="Fullscreen gallery view"
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
