'use client'

import { Camera, Send, Mail, ArrowRight } from 'lucide-react'

const navCols = [
  {
    heading: 'Explore',
    links: [
      { label: 'Our Story', href: '#story' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Amenities', href: '#amenities' },
      { label: 'Guest Reviews', href: '#reviews' },
      { label: 'Location', href: '#location' },
    ],
  },
  {
    heading: 'Book',
    links: [
      { label: 'Check Availability', href: '#booking' },
      { label: 'Pricing & Rates', href: '#booking' },
      { label: 'WhatsApp Us', href: 'https://wa.me/254700123456' },
      { label: 'Email Enquiry', href: 'mailto:hello@amararift.co' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Cancellation Policy', href: '#' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-[oklch(0.12_0.012_55)] text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Top section */}
        <div className="grid gap-12 border-b border-background/10 py-16 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="inline-block">
              <p className="font-serif text-3xl tracking-tight text-white">
                Amara Rift<span className="text-primary">.</span>
              </p>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/50">
              A four-bedroom lakeside villa on the southern shore of Lake
              Naivasha, Kenya. Book direct. No commission. No compromise.
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-background/40">
                Get Availability Updates
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex overflow-hidden rounded-full border border-background/15 bg-background/5"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder-background/30 outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex items-center gap-1 rounded-full bg-primary px-5 py-3 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  <ArrowRight className="size-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map((col) => (
            <div key={col.heading}>
              <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-background/35">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-background/55 transition-colors hover:text-primary"
                      {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-background/30">
            © {new Date().getFullYear()} Amara Rift Villas. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/amarariftvillas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex size-9 items-center justify-center rounded-full border border-background/15 text-background/50 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <Camera className="size-4" />
            </a>
            <a
              href="https://wa.me/254700123456"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex size-9 items-center justify-center rounded-full border border-background/15 text-background/50 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <Send className="size-4" />
            </a>
            <a
              href="mailto:hello@amararift.co"
              aria-label="Email"
              className="flex size-9 items-center justify-center rounded-full border border-background/15 text-background/50 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <Mail className="size-4" />
            </a>
          </div>

          <p className="text-xs text-background/30">
            Site by{' '}
            <a href="#" className="text-background/50 transition-colors hover:text-primary">
              Rohit Sharma
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
