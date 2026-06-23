'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const CATEGORIES = ['Wellness', 'Culture', 'Adventure', 'Culinary', 'Private Events']

const EXPERIENCES: Record<string, any[]> = {
  Wellness: [
    { name: 'Traditional Balinese Healing', duration: '120 min', image: '/images/spa.png' },
    { name: 'Sunrise Yoga Session', duration: '90 min', image: '/images/interior-1.png' },
    { name: 'Sound Bath Meditation', duration: '60 min', image: '/images/jungle.png' },
  ],
  Culture: [
    { name: 'Water Purification Ceremony', duration: 'Half Day', image: '/images/architecture.png' },
    { name: 'Canang Sari Making', duration: '90 min', image: '/images/villa-1.png' },
    { name: 'Private Temple Tour', duration: 'Full Day', image: '/images/rice-terraces.png' },
  ],
  Adventure: [
    { name: 'Mount Batur Sunrise Trek', duration: 'Full Day', image: '/images/jungle.png' },
    { name: 'Ayung River Rafting', duration: 'Half Day', image: '/images/rice-terraces.png' },
    { name: 'Jungle Cycling Tour', duration: 'Half Day', image: '/images/villa-2.png' },
  ],
  Culinary: [
    { name: 'Organic Farm to Table Cooking', duration: 'Half Day', image: '/images/interior-1.png' },
    { name: 'In-Villa Floating Breakfast', duration: '90 min', image: '/images/villa-3.png' },
    { name: 'Private Rice Field Dining', duration: 'Evening', image: '/images/philosophy.png' },
  ],
  'Private Events': [
    { name: 'Intimate Wedding Ceremony', duration: 'Custom', image: '/images/architecture.png' },
    { name: 'Curated Anniversary Dinner', duration: 'Evening', image: '/images/villa-1.png' },
    { name: 'Group Retreat Setup', duration: 'Custom', image: '/images/villa-2.png' },
  ],
}

export function Experiences() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0])

  return (
    <section id="experiences" className="py-32 bg-[var(--off-white)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="font-sc text-[11px] text-[var(--gold)] tracking-[0.5em] uppercase mb-6">
            Beyond the Villa Gates
          </p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-[var(--charcoal)]">
            Curated Experiences
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-16 border-b border-[var(--charcoal)]/10 pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="relative px-2 py-4 text-[12px] uppercase tracking-[0.15em] font-sans transition-colors"
            >
              <span className={activeTab === cat ? 'text-[var(--charcoal)] font-medium' : 'text-[var(--charcoal)]/50'}>
                {cat}
              </span>
              {activeTab === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--gold)]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {EXPERIENCES[activeTab].map((exp, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative w-full h-[60vh] md:h-[45vh] overflow-hidden mb-6">
                    <Image
                      src={exp.image}
                      alt={exp.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h3 className="font-serif text-2xl mb-2 text-[var(--charcoal)]">{exp.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-sans text-[12px] uppercase tracking-widest text-[var(--charcoal)]/50">
                      {exp.duration}
                    </span>
                    <span className="font-sans text-[12px] uppercase tracking-[0.2em] text-[var(--gold)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Enquire →
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
