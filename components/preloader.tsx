'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-[oklch(0.12_0.012_55)]"
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 text-center"
          >
            <p className="font-serif text-3xl tracking-tight text-white">
              Amara Rift
              <span className="text-[oklch(0.72_0.095_75)]">.</span>
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.45em] text-white/40">
              Lake Naivasha · Kenya
            </p>
          </motion.div>

          {/* Loading line */}
          <div className="h-px w-40 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-[oklch(0.72_0.095_75)] to-[oklch(0.85_0.075_80)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
