'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const REVIEWS = [
  {
    text: "The staff anticipated our needs before we even knew we had them. Pure magic.",
    name: "Eleanor & James, London",
    villa: "Villa Artha"
  },
  {
    text: "Waking up to the mist over the jungle canopy is a memory I will cherish forever.",
    name: "Akira Sato, Tokyo",
    villa: "Villa Kayon"
  },
  {
    text: "Unmatched luxury. The design, the food, the location. Easily the best stay in Bali.",
    name: "The Wright Family, NY",
    villa: "Villa Svarga"
  }
]

export function Testimonials() {
  const container = useRef<HTMLDivElement>(null)
  const isInView = useInView(container, { once: true, margin: "-20%" })

  return (
    <section ref={container} className="py-32 bg-[var(--warm-sand)] text-[var(--charcoal)] relative overflow-hidden">
      
      {/* Huge decorative quote mark */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[300px] font-serif text-[var(--gold)] opacity-10 leading-none select-none pointer-events-none">
        &ldquo;
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-32 pt-24"
        >
          <p className="font-sc text-[11px] text-[var(--gold)] tracking-[0.5em] uppercase mb-12">
            Words From Our Guests
          </p>
          <h2 className="font-serif text-3xl md:text-[52px] font-light leading-[1.3] mb-8">
            "There are places you visit, and places that change you. Svarga is the latter. We've stayed in luxury hotels across Southeast Asia — nothing compares to the silence here."
          </h2>
          <div className="font-sans text-[12px] uppercase tracking-[0.2em] text-[var(--charcoal)]/60">
            — Charlotte & Marcus, Sydney <span className="mx-2">|</span> 7 nights, Villa Svarga
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
              className="bg-white/30 backdrop-blur-md border border-white/50 p-8 flex flex-col justify-between"
            >
              <div className="flex gap-1 mb-6 text-[var(--gold)]">
                {/* 5 stars */}
                {[...Array(5)].map((_, idx) => (
                  <svg key={idx} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="font-serif text-xl md:text-2xl leading-[1.5] mb-12 flex-1">
                "{review.text}"
              </p>
              <div>
                <p className="font-sans text-[12px] uppercase tracking-widest text-[var(--charcoal)] mb-1">
                  {review.name}
                </p>
                <p className="font-sans text-[11px] uppercase tracking-widest text-[var(--charcoal)]/50 mt-1">
                  {review.villa}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
