'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Magnetic } from '@/components/magnetic'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Villas', href: '#villas' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if user scrolled past 100px or the hero section
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out px-6 md:px-12 py-6 flex items-center justify-between
        ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-black/5' : 'bg-transparent'}`}
      >
        {/* Logo */}
        <Link href="/" className="z-[60] outline-none">
          <motion.div
            className={`font-sc tracking-[0.4em] text-xl transition-colors duration-700 
            ${isScrolled || isMobileMenuOpen ? 'text-[var(--charcoal)]' : 'text-[var(--warm-sand)]'}`}
          >
            SVARGA
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Magnetic>
                  <Link
                    href={link.href}
                    className={`font-sans text-[12px] uppercase tracking-widest transition-colors duration-700
                    ${isScrolled ? 'text-[var(--charcoal)] hover:text-[var(--gold)]' : 'text-[var(--warm-sand)] hover:text-white'}`}
                  >
                    {link.label}
                  </Link>
                </Magnetic>
              </li>
            ))}
          </ul>

          <Magnetic>
            <Link
              href="#reserve"
              className={`px-6 py-3 rounded-full border text-[11px] font-sans uppercase tracking-[0.2em] transition-all duration-700
              ${isScrolled 
                ? 'border-[var(--gold)] text-[var(--charcoal)] hover:bg-[var(--gold)] hover:text-white' 
                : 'border-[var(--gold)] text-white hover:bg-[var(--gold)] hover:text-[#0D1F0F]'}`}
            >
              Reserve
            </Link>
          </Magnetic>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-[60] w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span 
            className={`block w-6 h-[1px] transition-all duration-300
            ${isScrolled || isMobileMenuOpen ? 'bg-[var(--charcoal)]' : 'bg-[var(--warm-sand)]'}
            ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
          />
          <span 
            className={`block w-6 h-[1px] transition-all duration-300
            ${isScrolled || isMobileMenuOpen ? 'bg-[var(--charcoal)]' : 'bg-[var(--warm-sand)]'}
            ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
          />
          <span 
            className={`block w-6 h-[1px] transition-all duration-300
            ${isScrolled || isMobileMenuOpen ? 'bg-[var(--charcoal)]' : 'bg-[var(--warm-sand)]'}
            ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
          />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
            className="fixed inset-0 z-40 bg-[var(--off-white)] flex flex-col justify-center items-center"
          >
            <ul className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif text-4xl text-[var(--charcoal)] hover:text-[var(--gold)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-8"
              >
                <Link
                  href="#reserve"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-8 py-4 rounded-full bg-[var(--gold)] text-[#0D1F0F] text-[12px] font-sans uppercase tracking-[0.2em]"
                >
                  Reserve
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
