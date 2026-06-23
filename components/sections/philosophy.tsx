'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

export function Philosophy() {
  const container = useRef<HTMLDivElement>(null)
  const isInView = useInView(container, { once: true, margin: "-40%" })

  return (
    <section ref={container} id="about" className="py-32 md:py-48 bg-[var(--off-white)] px-6 md:px-12 w-full">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Column */}
        <div className="order-2 lg:order-1 flex flex-col justify-center">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, ease: [0.77, 0, 0.18, 1] }}
            className="w-24 h-[1px] bg-[var(--gold)] mb-12 origin-left"
          />
          
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl md:text-[52px] font-light leading-[1.2] text-[var(--charcoal)] mb-12"
          >
            "In Bali, time moves differently. Here, it stops entirely."
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, ease: [0.77, 0, 0.18, 1], delay: 0.3 }}
            className="w-24 h-[1px] bg-[var(--gold)] mb-12 origin-left"
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="font-sans text-[16px] leading-[1.8] text-[var(--charcoal)]/80 mb-6">
              Svarga — Sanskrit for paradise — is three privately owned estates set among the rice fields of Penestanan, Ubud.
            </p>
            <p className="font-sans text-[16px] leading-[1.8] text-[var(--charcoal)]/80 mb-12">
              Each villa is staffed, secluded, and designed for guests who measure a holiday not by what they did, but by how they felt.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-sc text-[11px] text-[var(--gold)] tracking-widest uppercase"
          >
            EST. 2019 · PENESTANAN, UBUD
          </motion.p>
        </div>

        {/* Right Column */}
        <div className="order-1 lg:order-2 w-full h-[60vh] md:h-[80vh] relative overflow-hidden">
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.18, 1] }}
            className="w-full h-full relative"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
            >
              <source src="/videos/jungle-sunrise.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
