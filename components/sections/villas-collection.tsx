'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VILLAS = [
  {
    id: 'artha',
    name: 'Villa Artha',
    description: '2 bedrooms, private infinity pool, rice field view',
    price: '$485',
    image: '/images/villa-1.png',
    video: '/videos/villa-pool.mp4'
  },
  {
    id: 'svarga',
    name: 'Villa Svarga',
    description: '4 bedrooms, heated pool, jungle valley view',
    price: '$890',
    image: '/images/villa-3.png'
  },
  {
    id: 'kayon',
    name: 'Villa Kayon',
    description: '3 bedrooms, tiered pool, sunset terrace',
    price: '$720',
    image: '/images/villa-2.png'
  }
]

export function VillasCollection() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 768
      
      if (isDesktop && sectionRef.current && scrollContainerRef.current) {
        const pinWrap = scrollContainerRef.current
        const horizontalScrollLength = pinWrap.scrollWidth - window.innerWidth
        
        gsap.to(pinWrap, {
          x: -horizontalScrollLength,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: `+=${horizontalScrollLength}`,
          }
        })
      }
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="villas" className="bg-[var(--deep-forest)] text-white w-full overflow-hidden">
      
      <div className="md:h-screen w-full flex flex-col justify-center">
        {/* Header Content */}
        <div className="px-6 md:px-12 pt-24 pb-12 w-full max-w-[1400px] mx-auto z-10 shrink-0">
          <p className="font-sc text-[11px] text-[var(--gold)] tracking-[0.5em] uppercase mb-6">
            OUR COLLECTION
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="font-serif text-[52px] md:text-[72px] font-light leading-[1] max-w-lg">
              Three Private Estates
            </h2>
            <p className="font-sans text-[16px] text-white/70 max-w-sm leading-[1.6]">
              Each villa sleeps 2–8 guests and includes dedicated staff, private pool, and full breakfast.
            </p>
          </div>
        </div>

        {/* Horizontal Scroll Cards */}
        <div className="flex-1 w-full relative">
          <div 
            ref={scrollContainerRef}
            className="flex flex-col md:flex-row gap-8 md:gap-12 px-6 md:px-12 md:absolute md:top-0 md:left-0 md:h-full md:pb-24 pb-12 w-full md:w-[max-content]"
          >
            {VILLAS.map((villa) => (
              <div 
                key={villa.id}
                className="group relative w-full md:w-[40vw] h-[60vh] md:h-full overflow-hidden shrink-0"
              >
                {/* Background Image/Video */}
                <div className="absolute inset-0 transition-transform duration-1000 ease-[0.33,1,0.68,1] group-hover:scale-105">
                  {villa.video ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="object-cover w-full h-full"
                    >
                      <source src={villa.video} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={villa.image}
                      alt={villa.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  )}
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 transition-all duration-700 group-hover:bg-black/60" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end md:translate-y-8 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[0.33,1,0.68,1] bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-none">
                  <h3 className="font-serif text-4xl mb-3">{villa.name}</h3>
                  <p className="font-sans text-[14px] text-white/80 mb-6">{villa.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[12px] uppercase tracking-widest text-[var(--gold)]">
                      From {villa.price} / night
                    </span>
                    <Link 
                      href={`#${villa.id}`} 
                      className="font-sans text-[12px] uppercase tracking-widest flex items-center gap-2 group/link"
                    >
                      <span className="relative">
                        View Villa
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[var(--gold)] scale-x-0 group-hover/link:scale-x-100 origin-left transition-transform duration-500" />
                      </span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
