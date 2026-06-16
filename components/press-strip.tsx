'use client'

import { motion } from 'framer-motion'

const pressItems = [
  { name: 'Travel Africa', type: 'Magazine' },
  { name: 'Nomad', type: 'Magazine' },
  { name: 'CNN Travel', type: 'Feature' },
  { name: 'Airbnb Luxe', type: 'Partner' },
  { name: 'Forbes Africa', type: 'Spotlight' },
  { name: 'The Telegraph', type: 'Travel' },
]

export function PressStrip() {
  const doubled = [...pressItems, ...pressItems]

  return (
    <section className="border-y border-border bg-card py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 text-center text-[10px] uppercase tracking-[0.45em] text-muted-foreground"
        >
          As Featured In
        </motion.p>

        <div
          className="relative overflow-hidden"
          onMouseEnter={(e) => {
            const el = e.currentTarget.querySelector('.press-marquee') as HTMLElement
            if (el) el.style.animationPlayState = 'paused'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget.querySelector('.press-marquee') as HTMLElement
            if (el) el.style.animationPlayState = 'running'
          }}
        >
          {/* Fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-card to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-card to-transparent" />

          <div className="press-marquee flex animate-marquee items-center whitespace-nowrap">
            {doubled.map((item, i) => (
              <div
                key={i}
                className="mx-10 flex shrink-0 flex-col items-center"
              >
                <span className="font-serif text-xl font-light italic tracking-tight text-foreground/80 transition-colors hover:text-primary">
                  {item.name}
                </span>
                <span className="mt-0.5 text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
