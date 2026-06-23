'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

type CursorState = 'default' | 'explore' | 'crosshair'

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>('default')
  
  // Spring config for super active and smooth follow
  const springConfig = { damping: 30, stiffness: 600, mass: 0.1 }
  
  const mouseX = useSpring(0, springConfig)
  const mouseY = useSpring(0, springConfig)

  useEffect(() => {
    // Hide cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Check for links, buttons, or elements with role="button"
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setCursorState('explore')
      } else if (
        target.tagName.toLowerCase() === 'img' || 
        target.closest('img') ||
        target.dataset.cursor === 'image' ||
        target.dataset.cursor === 'crosshair'
      ) {
        setCursorState('crosshair')
      } else {
        setCursorState('default')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  // Variants for different cursor states
  const variants = {
    default: {
      width: 20,
      height: 20,
      border: '1px solid var(--gold)',
      backgroundColor: 'transparent',
      x: "-50%",
      y: "-50%",
    },
    explore: {
      width: 60,
      height: 60,
      border: '1px solid var(--gold)',
      backgroundColor: 'transparent',
      backdropFilter: 'blur(4px)',
      x: "-50%",
      y: "-50%",
    },
    crosshair: {
      width: 40,
      height: 40,
      border: 'none',
      backgroundColor: 'transparent',
      x: "-50%",
      y: "-50%",
    }
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center"
      style={{
        left: mouseX,
        top: mouseY,
      }}
      initial="default"
      animate={cursorState}
      variants={variants}
      transition={{ type: 'spring', damping: 30, stiffness: 600, mass: 0.1 }}
    >
      {cursorState === 'crosshair' && (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-[1px] h-full bg-[var(--gold)] opacity-50" />
          <div className="absolute w-full h-[1px] bg-[var(--gold)] opacity-50" />
        </div>
      )}
    </motion.div>
  )
}
