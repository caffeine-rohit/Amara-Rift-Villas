'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Award } from 'lucide-react'

const marqueeItems = [
  'Private 4-Bedroom Villa',
  'Infinity Pool',
  'Lake Naivasha',
  'Private Jetty',
  'Chef on Request',
  'Crescent Island',
  'Rift Valley Views',
  'Sleeps 8 Guests',
  'Direct Booking',
  'No Commission Fees',
]

const words = ['Where', 'the', 'Rift', 'Valley', 'Meets', 'Pure', 'Indulgence.']

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {/* Looping hero video — poster shows while video loads */}
        <video
          className="absolute inset-0 size-full object-cover"
          poster="/images/hero-villa.png"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          preload="auto"
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <img
            src="/images/hero-villa.png"
            alt="Amara Rift Villa at golden hour beside Lake Naivasha"
            className="absolute inset-0 size-full object-cover"
          />
        </video>
      </motion.div>

      {/* ── Overlay stack — elegant and subtle to keep video visible ── */}
      {/* Bottom gradient just to anchor the lower content without filling the whole screen */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* Left side vignette that darkens only where the text sits, leaving the right side (villa) completely clear */}
      <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      {/* Top bar darkener — keeps nav legible */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />

      {/* Floating Award Badge */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-6 top-24 hidden items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md lg:flex"
      >
        <Award className="size-4 text-primary" strokeWidth={1.5} />
        <span className="text-xs tracking-wide text-white/90">Best Lakeside Villa · Naivasha 2024</span>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ opacity }}
        className="relative mx-auto w-full max-w-7xl px-6 pb-32 pt-32 lg:px-10 lg:pb-36"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.45em] text-white/80"
        >
          <span className="h-px w-8 bg-primary/80" />
          Lake Naivasha · Est. 2019
        </motion.p>

        {/* Word-by-word headline using drop-shadow filter so the gold gradient text doesn't get muddy */}
        <h1
          className="max-w-5xl font-serif text-5xl font-light leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[7.5rem]"
          style={{ filter: 'drop-shadow(0 4px 32px rgba(0,0,0,0.8)) drop-shadow(0 2px 8px rgba(0,0,0,0.6))' }}
        >
          {words.map((word, i) => (
            <motion.span
              key={word + i}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.9,
                delay: 0.7 + i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mr-[0.22em] inline-block last:mr-0"
            >
              {word === 'Indulgence.' ? (
                <span className="text-gold-gradient">{word}</span>
              ) : word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4 }}
          className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/95 sm:text-lg"
          style={{ filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.9))' }}
        >
          A four-bedroom private villa on the shores of Lake Naivasha — with a
          private chef, infinity pool, and Rift Valley sunrises that no camera
          has ever truly captured. Book direct. No middlemen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a
            href="#booking"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-9 py-4 text-sm font-medium tracking-wide text-primary-foreground shadow-2xl shadow-black/50 transition-all duration-500 hover:scale-[1.04] hover:shadow-xl"
          >
            <span className="relative z-10">Check Availability</span>
            <span className="absolute inset-0 gold-shimmer opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-black/25 px-9 py-4 text-sm font-medium tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:scale-[1.04] hover:border-white/65 hover:bg-black/40"
          >
            Explore the Villa
          </a>
        </motion.div>
      </motion.div>


      {/* Marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="relative z-10 overflow-hidden border-t border-white/10 bg-black/50 backdrop-blur-sm"
      >
        <div className="flex animate-marquee whitespace-nowrap py-3">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-6 flex items-center gap-6 text-[10px] uppercase tracking-[0.35em] text-white/60"
            >
              {item}
              <span className="h-px w-6 bg-primary/50" />
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#trust"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/60 lg:bottom-24"
      >
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="block"
        >
          <ChevronDown className="size-5" strokeWidth={1.5} />
        </motion.span>
      </motion.a>
    </section>
  )
}
