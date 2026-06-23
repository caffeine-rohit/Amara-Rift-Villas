'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    // Check if this is the first visit in the session
    const hasVisited = sessionStorage.getItem('svarga_visited')
    if (!hasVisited) {
      setShouldShow(true)
      sessionStorage.setItem('svarga_visited', 'true')
      
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1800)
      
      return () => clearTimeout(timer)
    } else {
      setIsLoading(false)
    }
  }, [])

  if (!shouldShow) return null

  const word = "SVARGA"
  const letters = word.split("")

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          className="fixed inset-0 z-[9999] flex flex-col pointer-events-none"
          exit={{ opacity: 1 }} // We animate the panels, not the container opacity here directly
        >
          {/* Top Panel */}
          <motion.div 
            className="absolute inset-0 top-0 h-[50vh] bg-[#0D1F0F]"
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.77, 0, 0.18, 1], delay: 0.2 }}
          />
          {/* Bottom Panel */}
          <motion.div 
            className="absolute inset-0 top-[50vh] h-[50vh] bg-[#0D1F0F]"
            exit={{ y: "100%" }}
            transition={{ duration: 1, ease: [0.77, 0, 0.18, 1], delay: 0.2 }}
          />
          
          {/* Text Container */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-10"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex overflow-hidden">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-sc text-warm-sand text-3xl md:text-5xl tracking-[0.4em]"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.33, 1, 0.68, 1],
                    delay: i * 0.1 
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
