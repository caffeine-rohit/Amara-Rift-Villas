'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function Location() {
  const container = useRef<HTMLDivElement>(null)
  const isInView = useInView(container, { once: true, margin: "-20%" })

  return (
    <section ref={container} className="py-32 bg-[var(--deep-forest)] text-white w-full">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Map */}
          <div className="lg:col-span-7 relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-[#0a160b] border border-white/5 flex items-center justify-center p-8">
            {/* Abstract Map SVG */}
            <svg viewBox="0 0 800 600" className="w-full h-full opacity-60">
              <path d="M100,500 Q300,400 400,200 T700,100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
              <path d="M200,600 Q400,300 600,400 T800,200" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" />
              
              {/* Landmarks */}
              <circle cx="400" cy="200" r="4" fill="#C9A55A" />
              <text x="415" y="205" fill="rgba(255,255,255,0.6)" fontSize="14" fontFamily="sans-serif">Tegallalang Rice Terrace</text>

              <circle cx="600" cy="400" r="4" fill="#C9A55A" />
              <text x="615" y="405" fill="rgba(255,255,255,0.6)" fontSize="14" fontFamily="sans-serif">Ubud Center</text>
              
              <circle cx="580" cy="480" r="4" fill="#C9A55A" />
              <text x="595" y="485" fill="rgba(255,255,255,0.6)" fontSize="14" fontFamily="sans-serif">Sacred Monkey Forest</text>

              {/* Main Svarga Pin */}
              <g transform="translate(300, 350)">
                <motion.circle 
                  cx="0" cy="0" r="24" fill="rgba(201, 165, 90, 0.2)"
                  animate={{ scale: [0.8, 2], opacity: [1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <circle cx="0" cy="0" r="8" fill="#C9A55A" />
                <text x="20" y="5" fill="#C9A55A" fontSize="16" fontFamily="serif" fontWeight="bold" letterSpacing="0.1em">SVARGA</text>
              </g>
            </svg>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="font-serif text-5xl md:text-6xl font-light mb-12 text-white">
              Find Us in the Heart of Ubud
            </h2>
            
            <div className="space-y-6 mb-12">
              {[
                "8 min — Ubud Center",
                "12 min — Tegallalang Terraces",
                "15 min — Sacred Monkey Forest",
                "90 min — Ngurah Rai Airport"
              ].map((text, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="font-sans text-[16px] text-white/80 border-b border-white/10 pb-4"
                >
                  {text}
                </motion.div>
              ))}
            </div>

            <div className="mb-12">
              <p className="font-sans text-[14px] text-white/60 leading-relaxed mb-1">
                Jalan Penestanan Kelod
              </p>
              <p className="font-sans text-[14px] text-white/60 leading-relaxed">
                Ubud, Bali 80571, Indonesia
              </p>
            </div>

            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-[var(--gold)] text-[var(--gold)] font-sans text-[12px] uppercase tracking-[0.1em] hover:bg-[var(--gold)] hover:text-[#0D1F0F] transition-colors w-max"
            >
              Open in Google Maps
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  )
}
