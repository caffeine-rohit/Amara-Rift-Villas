'use client'

import { motion } from 'framer-motion'
import { MapPin, Car, Plane, Navigation, TreePalm } from 'lucide-react'
import { Reveal } from './reveal'

const logistics = [
  {
    icon: Car,
    title: '90 min from Nairobi',
    desc: 'A scenic drive down the Rift Valley escarpment via the A104. Tarmac all the way; final 2 km on a graded murram road.',
  },
  {
    icon: Plane,
    title: 'Naivasha Airstrip — 20 min',
    desc: 'Daily light-aircraft connections from Wilson Airport. We arrange your pickup on arrival.',
  },
  {
    icon: Navigation,
    title: 'Crescent Island — 10 min by boat',
    desc: 'Walk among giraffe and zebra on the lake\'s private game sanctuary — accessible only by water.',
  },
]

const nearby = [
  { icon: TreePalm, name: 'Hell\'s Gate NP', dist: '12 km' },
  { icon: MapPin, name: 'Oserian Estate', dist: '18 km' },
  { icon: Navigation, name: 'Crescent Island', dist: 'By boat' },
]

export function Location() {
  return (
    <section id="location" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Map */}
        <Reveal>
          <div className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-sm border border-border shadow-lg">
              <img
                src="/images/map.jpeg"
                alt="Map of Amara Rift Villas on Lake Naivasha"
                className="aspect-[4/3] w-full object-cover"
              />
              {/* Pulsing pin */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Ripple rings */}
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute inset-0 -m-3 rounded-full border border-primary/60"
                    animate={{ scale: [1, 2.5], opacity: [0.7, 0] }}
                    transition={{
                      duration: 2.5,
                      delay: i * 0.8,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                ))}
                {/* Pin label */}
                <span className="relative flex items-center gap-2 rounded-full bg-foreground/90 px-4 py-2 text-sm text-background shadow-xl">
                  <MapPin className="size-4 text-primary" />
                  Amara Rift Villas
                </span>
              </div>

              {/* Nearby attractions overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/50">
                  Nearby
                </p>
                <div className="flex flex-wrap gap-2">
                  {nearby.map((n) => (
                    <span
                      key={n.name}
                      className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur-sm"
                    >
                      <n.icon className="size-3" />
                      {n.name}
                      <span className="text-white/40">· {n.dist}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-3.5 text-sm font-medium tracking-wide text-foreground shadow-sm transition-all hover:bg-accent hover:text-primary"
              >
                <MapPin className="size-4" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </Reveal>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-accent">
              <span className="h-px w-6 bg-accent" />
              Getting Here
            </p>
            <h2 className="text-balance font-serif text-4xl font-light leading-tight tracking-tight sm:text-5xl">
              Closer than you think.{' '}
              <em className="not-italic text-gold-gradient">Further than you&apos;ll want to leave.</em>
            </h2>
          </Reveal>

          <div className="mt-10 flex flex-col gap-8">
            {logistics.map((item, i) => (
              <Reveal key={item.title} delay={0.08 * i}>
                <div className="group flex gap-5">
                  <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-accent transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                    <item.icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl tracking-tight">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-10 rounded-sm border border-border bg-card p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                GPS Coordinates
              </p>
              <p className="mt-1 font-mono text-sm text-foreground">
                0°45&apos;12.6&quot;S 36°21&apos;43.2&quot;E
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Southern shore, Lake Naivasha, Kenya
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
