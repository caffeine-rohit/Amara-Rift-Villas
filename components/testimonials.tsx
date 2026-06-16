'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'
import { Reveal } from './reveal'

const reviews = [
  {
    quote:
      'We booked for three nights and extended to five. The private chef cooked the finest tilapia I have ever tasted, and the sunrise over the lake is an image I still carry months later.',
    name: 'Amara Okello',
    detail: 'Family trip · March 2025',
    location: 'Nairobi, Kenya',
    photo: '/images/guest-1.jpeg',
  },
  {
    quote:
      'Booking direct saved us nearly $200 versus every listing platform. Our host answered every WhatsApp within minutes. It felt less like a rental and more like visiting old, very generous friends.',
    name: 'Daniel Mwangi',
    detail: 'Anniversary escape · January 2025',
    location: 'Cape Town, SA',
    photo: '/images/guest-2.jpeg',
  },
  {
    quote:
      'Spotless, quiet, genuinely luxurious. The infinity pool at midnight with hippos calling across the water — there is no word in English for that feeling. We are already planning our return.',
    name: 'Sofia Restrepo',
    detail: 'Friends retreat · November 2024',
    location: 'Bogotá, Colombia',
    photo: '/images/guest-3.png',
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = useCallback(
    () => setIndex((i) => (i + 1) % reviews.length),
    [],
  )

  useEffect(() => {
    if (paused) return
    timer.current = setInterval(next, 5500)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [paused, next])

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-[oklch(0.14_0.015_55)] py-24 lg:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative borders */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">
              Guest Reviews
            </p>
            <h2 className="text-balance font-serif text-4xl font-light leading-tight tracking-tight text-white sm:text-5xl">
              200+ stays.{' '}
              <span className="text-gold-gradient">4.9 stars.</span>
            </h2>
          </Reveal>
        </div>

        {/* Split layout: quote + photo */}
        <div className="relative min-h-[340px] lg:min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16"
            >
              {/* Quote side */}
              <div>
                {/* Stars animating in */}
                <div className="mb-6 flex gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Star className="size-5 fill-primary text-primary" />
                    </motion.div>
                  ))}
                </div>
                <blockquote className="font-serif text-2xl font-light italic leading-relaxed text-white sm:text-3xl lg:text-4xl">
                  &ldquo;{reviews[index].quote}&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={reviews[index].photo || '/placeholder.svg'}
                    alt={reviews[index].name}
                    className="size-12 rounded-full object-cover ring-2 ring-primary/30"
                  />
                  <div>
                    <p className="font-medium text-white">{reviews[index].name}</p>
                    <p className="text-sm text-white/45">{reviews[index].detail}</p>
                    <p className="text-xs text-white/30">{reviews[index].location}</p>
                  </div>
                </div>
              </div>

              {/* Photo side — large */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="hidden overflow-hidden rounded-sm lg:block"
              >
                <img
                  src={reviews[index].photo || '/placeholder.svg'}
                  alt={reviews[index].name}
                  className="h-64 w-52 object-cover"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls + Google link */}
        <div className="mt-10 flex items-center justify-between">
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show review ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-400 ${i === index ? 'w-10 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
              />
            ))}
          </div>
          <a
            href="https://g.co/kgs/amararift"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/35 transition-colors hover:text-primary"
          >
            Read on Google
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </section>
  )
}
