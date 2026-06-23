'use client'

import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-[#0A0A0A] text-white pt-24 pb-12 px-6 md:px-12 relative z-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        
        {/* Col 1 */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="font-sc tracking-[0.4em] text-2xl text-[var(--gold)] inline-block w-max">
            SVARGA
          </Link>
          <p className="font-sans text-[14px] text-white/60 leading-relaxed max-w-xs">
            Where Bali Dreams Become Yours. Three private estates in Penestanan, Ubud.
          </p>
          <div className="flex gap-6 mt-2">
            {['IG', 'FB', 'PT'].map((social) => (
              <a key={social} href="#" className="font-sans text-[11px] uppercase tracking-widest text-white/40 hover:text-[var(--gold)] transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="font-sc tracking-widest text-[var(--gold)] text-[12px] mb-8 uppercase">Explore</h4>
          <ul className="flex flex-col gap-4">
            {['About', 'Our Villas', 'Experiences', 'Gallery'].map((link) => (
              <li key={link}>
                <Link href={`#${link.toLowerCase().replace(' ', '-')}`} className="font-sans text-[14px] text-white/70 hover:text-white transition-colors">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="font-sc tracking-widest text-[var(--gold)] text-[12px] mb-8 uppercase">Stay</h4>
          <ul className="flex flex-col gap-4">
            {['Book a Villa', 'Availability', 'Special Offers'].map((link) => (
              <li key={link}>
                <Link href="#reserve" className="font-sans text-[14px] text-white/70 hover:text-white transition-colors">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="font-sc tracking-widest text-[var(--gold)] text-[12px] mb-8 uppercase">Contact</h4>
          <ul className="flex flex-col gap-4">
            <li className="font-sans text-[14px] text-white/70">Jalan Penestanan Kelod</li>
            <li className="font-sans text-[14px] text-white/70">Ubud, Bali 80571</li>
            <li className="font-sans text-[14px] text-white/70 mt-4 hover:text-[var(--gold)] transition-colors cursor-pointer">hello@svargavillas.com</li>
            <li className="font-sans text-[14px] text-white/70 hover:text-[var(--gold)] transition-colors cursor-pointer">+62 811 398 1234</li>
          </ul>
        </div>

      </div>

      <div className="max-w-[1400px] mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 font-sans text-[11px] uppercase tracking-widest text-white/40">
        <p>© 2026 Svarga Private Villas</p>
        <div className="flex flex-wrap justify-center items-center gap-4 text-center md:text-left">
          <p>Privacy Policy</p>
          <span className="hidden md:inline">·</span>
          <p>All rates in USD</p>
          <span className="hidden md:inline">·</span>
          <p>Indonesian owned & operated</p>
        </div>
      </div>
    </footer>
  )
}
