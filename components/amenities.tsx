'use client'

import { motion } from 'framer-motion'
import {
  Wifi, Waves, ChefHat, Sailboat, Car, Wind, Flame, Wine, Sunrise
} from 'lucide-react'
import { Reveal } from './reveal'

const amenities = [
  { icon: Waves, title: 'Infinity Pool', desc: 'Heated, lake-facing, softly lit at night — a mirror to the stars.' },
  { icon: ChefHat, title: 'Private Chef', desc: 'On request — Swahili, continental, or a bespoke tasting menu.' },
  { icon: Sailboat, title: 'Private Lake Jetty', desc: 'Direct water access with boat excursions to Crescent Island.' },
  { icon: Wifi, title: 'Starlink Wi-Fi', desc: 'Fast enough to work. Far enough to forget you should.' },
  { icon: Flame, title: 'Firepit Lounge', desc: 'Lakeside fire pit with cushioned seating under an open sky.' },
  { icon: Wine, title: 'Curated Wine Cellar', desc: 'A hand-selected cellar stocked with East African and European labels.' },
  { icon: Sunrise, title: 'Dawn Safari Transfers', desc: 'Private 4×4 to Hell\'s Gate at sunrise — we sort everything.' },
  { icon: Car, title: 'Gated & Secure', desc: 'Private grounds with 24-hour askari. Your peace of mind included.' },
  { icon: Wind, title: 'Climate Comfort', desc: 'Whisper-quiet AC and ceiling fans in every bedroom.' },
]

export function Amenities() {
  return (
    <section
      id="amenities"
      className="relative overflow-hidden py-24 lg:py-36"
    >
      {/* Blurred background image */}
      <div className="absolute inset-0">
        <img
          src="/images/amenities-bg.jpeg"
          alt=""
          aria-hidden="true"
          id="amenities-bg-img"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-[oklch(0.14_0.015_55)]/88 backdrop-blur-[2px]" />
      </div>

      {/* Top border glow */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary">
              <span className="h-px w-6 bg-primary/60" />
              What&apos;s Included
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance font-serif text-4xl font-light leading-tight tracking-tight text-white sm:text-5xl">
              The details that make a{' '}
              <em className="not-italic text-gold-gradient">stay effortless.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-pretty text-base leading-relaxed text-white/55">
              Every amenity has been chosen with one intention — to let you
              arrive, exhale, and never once wonder if something is missing.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card group rounded-sm p-7 transition-all duration-500 hover:border-primary/30 hover:bg-white/10"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary transition-all duration-400 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:bg-primary/20">
                <a.icon className="size-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-serif text-xl tracking-tight text-white">
                {a.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {a.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
