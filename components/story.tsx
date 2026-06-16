'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from './reveal'

export function Story() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section id="story" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Image with parallax + floating badge */}
        <div ref={ref} className="relative overflow-hidden rounded-sm">
          <motion.div style={{ scale, y: imageY }}>
            <img
              src="/images/story.jpeg"
              alt="The light-filled living room of Amara Rift Villa"
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>

          {/* Floating Est. badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-black/50 px-5 py-2.5 backdrop-blur-md"
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Established</p>
            <p className="font-serif text-xl text-white">2019</p>
          </motion.div>

          {/* Floating quote card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute -right-4 top-10 hidden max-w-[220px] rounded-sm border border-border/40 bg-card/90 p-5 shadow-xl backdrop-blur-md lg:block"
          >
            <div className="mb-2 h-0.5 w-8 bg-primary" />
            <p className="font-serif text-sm italic leading-snug text-foreground">
              &ldquo;A place that changes how you feel about silence.&rdquo;
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">
              Travel Africa Mag
            </p>
          </motion.div>
        </div>

        <div className="lg:pr-6">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-accent">
              <span className="h-px w-6 bg-accent" />
              Our Story
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance font-serif text-4xl font-light leading-tight tracking-tight text-foreground sm:text-5xl">
              Born from a love affair with{' '}
              <em className="not-italic text-gold-gradient">the lake.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              In 2019, we traded a Nairobi apartment for two acres of fever trees
              on the southern shore of Lake Naivasha. What began as a weekend
              escape grew into something we couldn&apos;t keep to ourselves.
            </p>
          </Reveal>
          <Reveal delay={0.13}>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Amara — meaning &ldquo;grace&rdquo; in Swahili — is four bedrooms,
              a chef&apos;s kitchen, and a veranda where the hippos surface at
              dusk. No reception desk. No itinerary. Just you and the Rift Valley.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <blockquote className="mt-10 border-l-2 border-primary pl-6">
              <p className="text-balance font-serif text-2xl font-light italic leading-snug text-foreground">
                &ldquo;You don&apos;t check in here. You arrive, exhale, and
                forget what day it is.&rdquo;
              </p>
              <footer className="mt-3 text-sm text-muted-foreground">
                — Wanjiru &amp; Tomás, your hosts
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap gap-6">
              {[
                { label: '200+', sub: 'Families Hosted' },
                { label: '4.9', sub: 'Average Rating' },
                { label: '7', sub: 'Years Running' },
              ].map((s) => (
                <div key={s.sub}>
                  <p className="font-serif text-3xl font-light text-gold-gradient">{s.label}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.25em] text-muted-foreground">{s.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
