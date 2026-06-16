'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Star } from 'lucide-react'

function Counter({
  to,
  suffix = '',
  decimals = 0,
}: {
  to: number
  suffix?: string
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export function TrustStrip() {
  return (
    <section id="trust" className="border-y border-border bg-card">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-7 text-center sm:flex-row sm:justify-between sm:gap-4 sm:text-left lg:px-10"
      >
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-0.5 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </span>
          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              <Counter to={4.9} decimals={1} />
            </span>{' '}
            on Google Reviews
          </span>
        </div>

        <div className="hidden h-5 w-px bg-border sm:block" />

        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            <Counter to={200} suffix="+" />
          </span>{' '}
          guests hosted since 2019
        </p>

        <div className="hidden h-5 w-px bg-border sm:block" />

        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Featured in{' '}
          <span className="font-serif text-sm italic tracking-normal text-foreground">
            Travel Africa
          </span>{' '}
          ·{' '}
          <span className="font-serif text-sm italic tracking-normal text-foreground">
            Nomad
          </span>
        </p>
      </motion.div>
    </section>
  )
}
