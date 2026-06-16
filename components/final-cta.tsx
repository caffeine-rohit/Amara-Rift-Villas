'use client'

import { MessageCircle, Calendar, ShieldCheck, RefreshCw, Clock } from 'lucide-react'
import { Reveal } from './reveal'
import { motion } from 'framer-motion'

const trustItems = [
  { icon: ShieldCheck, label: 'No Booking Fees' },
  { icon: RefreshCw, label: 'Free Cancellation' },
  { icon: Clock, label: 'Instant Confirmation' },
]

export function FinalCta() {
  const message = encodeURIComponent(
    "Hi Amara Rift Villas! I'd love to check availability for my stay.",
  )
  return (
    <section className="relative overflow-hidden py-32 text-background lg:py-48">
      {/* Background */}
      <img
        src="/images/gallery-5.jpeg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.10_0.015_55)]/95 via-[oklch(0.12_0.015_55)]/85 to-[oklch(0.15_0.015_55)]/90" />

      {/* Decorative diagonal line */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 top-0 h-full w-1 rotate-[15deg] bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_auto] lg:items-center">
          {/* Left: copy */}
          <div>
            <Reveal>
              <p className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.45em] text-primary">
                <span className="h-px w-6 bg-primary/60" />
                Direct Booking
              </p>
              <h2 className="text-balance font-serif text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Your Most Beautiful{' '}
                <em className="not-italic text-gold-gradient">Weekend</em>{' '}
                Starts Here.
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-pretty leading-relaxed text-background/65">
                No booking platforms. No hidden markups. Message us directly and
                we&apos;ll have your dates confirmed within the hour — often in minutes.
              </p>
            </Reveal>

            {/* Trust strip */}
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-6">
                {trustItems.map((t) => (
                  <div key={t.label} className="flex items-center gap-2 text-sm text-background/60">
                    <t.icon className="size-4 text-primary" strokeWidth={1.5} />
                    {t.label}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: CTAs */}
          <Reveal delay={0.15}>
            <div className="flex flex-col gap-4 lg:w-72">
              <a
                href={`https://wa.me/254700123456?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-5 text-sm font-medium tracking-wide text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-500 hover:scale-[1.04] hover:shadow-xl hover:shadow-primary/35"
              >
                <span className="absolute inset-0 gold-shimmer opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <MessageCircle className="relative z-10 size-5" />
                <span className="relative z-10">Message on WhatsApp</span>
              </a>

              <a
                href="#booking"
                className="flex items-center justify-center gap-3 rounded-full border border-background/20 px-8 py-5 text-sm font-medium tracking-wide text-background/80 backdrop-blur-sm transition-all duration-300 hover:border-background/40 hover:bg-background/10 hover:text-background"
              >
                <Calendar className="size-5" />
                Check Availability
              </a>

              <p className="text-center text-[11px] text-background/35">
                +254 700 123 456 · Mon–Sun, 7am–9pm EAT
              </p>

              {/* Response time badge */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs text-primary"
              >
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                Usually responds within 15 minutes
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
