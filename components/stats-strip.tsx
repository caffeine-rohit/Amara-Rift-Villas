'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const stats = [
  { number: '4', label: 'Bedrooms', sub: 'en-suite' },
  { number: '8', label: 'Guests', sub: 'max. capacity' },
  { number: '2', label: 'Acres', sub: 'private grounds' },
  { number: '1', label: 'Jetty', sub: 'private lake access' },
  { number: '1', label: 'Chef', sub: 'private culinary team' },
  { number: '∞', label: 'Pool', sub: 'lake-facing, lit at night' },
]

export function StatsStrip() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section ref={ref} id="trust" className="relative overflow-hidden py-20 lg:py-28">
      {/* Parallax dark background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[oklch(0.14_0.015_55)]" />
      </motion.div>

      {/* Decorative top border */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/5 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col items-center bg-[oklch(0.14_0.015_55)] px-6 py-10 text-center transition-colors duration-500 hover:bg-[oklch(0.17_0.015_55)]"
            >
              <span className="font-serif text-5xl font-light tracking-tight text-gold-gradient lg:text-6xl">
                {s.number}
              </span>
              <span className="mt-2 text-sm font-medium uppercase tracking-[0.25em] text-white/80">
                {s.label}
              </span>
              <span className="mt-1 text-[11px] text-white/35 tracking-wide">{s.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
