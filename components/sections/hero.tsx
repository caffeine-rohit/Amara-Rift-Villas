'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Magnetic } from '@/components/magnetic'

export function Hero() {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '50vh'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const line1Words = "Where Stillness".split(" ")
  const line2Words = "Becomes Sanctuary".split(" ")

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden bg-black">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
          poster="/images/villa-1.png"
        >
          <source src="/videos/hero-bali.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.8 }}
          className="font-sc text-[var(--gold)] tracking-[0.5em] text-[11px] uppercase mb-8"
        >
          PENESTANAN · UBUD · BALI
        </motion.p>

        <h1 className="font-serif text-white font-light leading-[0.9] flex flex-col items-center mb-8">
          <span className="flex overflow-hidden">
            {line1Words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.77, 0, 0.18, 1], delay: 2.6 + i * 0.12 }}
                className="text-[52px] md:text-[96px] mr-3 md:mr-5 last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="flex overflow-hidden">
            {line2Words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.77, 0, 0.18, 1], delay: 2.6 + (line1Words.length + i) * 0.12 }}
                className="text-[52px] md:text-[96px] mr-3 md:mr-5 last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 0.8 }}
          className="font-sans text-[16px] text-white/70 max-w-md mx-auto mb-12"
        >
          Three private estates with infinity pools, rice field vistas, and full staff — from $485 per night
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Magnetic>
            <a href="#villas" className="flex items-center justify-center h-12 px-6 rounded-full border border-[var(--gold)] text-white font-sans text-[12px] uppercase tracking-[0.1em] hover:bg-white/10 transition-colors">
              Explore Villas
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#reserve" className="flex items-center justify-center h-12 px-6 rounded-full bg-[var(--gold)] text-[#0D1F0F] font-sans text-[12px] uppercase tracking-[0.1em] hover:bg-white transition-colors">
              View Availability
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
      >
        <div className="w-[1px] h-10 bg-white/20 overflow-hidden mb-3">
          <motion.div 
            className="w-full h-full bg-white origin-top"
            animate={{ 
              y: ['-100%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        <span className="font-sans text-[10px] uppercase tracking-widest text-white/50">SCROLL</span>
      </motion.div>
    </section>
  )
}
