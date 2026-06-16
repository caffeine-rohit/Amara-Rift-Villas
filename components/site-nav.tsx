'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const links = [
  { label: 'Story', href: '#story' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Location', href: '#location' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 2.3, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'border-b border-border/50 bg-background/92 shadow-sm shadow-black/5 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo */}
        <a
          href="#top"
          className={`font-serif text-xl tracking-tight transition-colors ${
            scrolled ? 'text-foreground' : 'text-white'
          }`}
        >
          Amara Rift
          <span className={scrolled ? 'text-primary' : 'text-primary'}>.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`relative text-sm tracking-wide transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled ? 'text-foreground hover:text-primary' : 'text-white/85 hover:text-white'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* WhatsApp quick contact */}
          <a
            href="https://wa.me/254700123456"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact on WhatsApp"
            className={`hidden items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 hover:scale-[1.03] lg:flex ${
              scrolled
                ? 'border-border text-foreground hover:border-primary/40 hover:text-primary'
                : 'border-white/25 text-white/80 hover:border-white/50 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Phone className="size-3.5" />
            WhatsApp
          </a>

          <a
            href="#booking"
            className={`hidden rounded-full px-6 py-2.5 text-sm font-medium tracking-wide shadow-sm transition-all duration-300 hover:scale-[1.04] hover:shadow-md md:inline-block ${
              scrolled
                ? 'bg-primary text-primary-foreground shadow-primary/15 hover:shadow-primary/25'
                : 'bg-white text-foreground hover:bg-white/90'
            }`}
          >
            Book Now
          </a>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={`md:hidden ${scrolled ? 'text-foreground' : 'text-white'}`}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-[oklch(0.12_0.012_55)] text-white md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <span className="font-serif text-xl">
                Amara Rift<span className="text-primary">.</span>
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 hover:bg-white/10"
              >
                <X className="size-5" />
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-1 px-8">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-4 py-3 font-serif text-4xl font-light tracking-tight text-white/80 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-6" />
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-white/10 p-8">
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-primary px-6 py-4 text-center font-medium text-primary-foreground"
              >
                Book Your Stay
              </a>
              <a
                href="https://wa.me/254700123456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm text-white/70"
              >
                <Phone className="size-4" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
