'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function LuxuryCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const onEnterLink = () => cursor.classList.add('scale-[2.2]', 'border-primary', 'bg-primary/10')
    const onLeaveLink = () => cursor.classList.remove('scale-[2.2]', 'border-primary', 'bg-primary/10')

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button').forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    let raf: number
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)
      cursor.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Ring */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden size-9 rounded-full border border-foreground/40 transition-[border-color,background-color,transform] duration-150 md:block"
        style={{ willChange: 'transform' }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden size-2 rounded-full bg-primary md:block"
        style={{ willChange: 'transform', transition: 'transform 0.04s linear' }}
      />
    </>
  )
}
