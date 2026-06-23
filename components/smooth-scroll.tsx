'use client'

import Lenis from 'lenis'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function SmoothScrollLogic() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [pathname, searchParams])

  return null
}

export function SmoothScroll() {
  return (
    <Suspense fallback={null}>
      <SmoothScrollLogic />
    </Suspense>
  )
}
