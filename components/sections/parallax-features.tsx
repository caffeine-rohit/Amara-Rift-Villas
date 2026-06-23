'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    title: 'Private Infinity Pool',
    desc: 'Bask in your own private sanctuary. Our temperature-controlled infinity pools blend seamlessly into the lush jungle horizon.',
    image: '/images/villa-1.png'
  },
  {
    title: 'Full-Time Villa Staff',
    desc: 'Unobtrusive, anticipatory service. Your private butler, chef, and housekeeping team are dedicated solely to your estate.',
    image: '/images/villa-2.png'
  },
  {
    title: 'Outdoor Spa Pavilion',
    desc: 'Wellness without leaving your gates. Experience traditional Balinese massage and treatments in your private open-air spa.',
    image: '/images/spa.png'
  },
  {
    title: 'Balinese Breakfast Daily',
    desc: 'Wake up to a floating breakfast or a spread on your terrace, prepared fresh each morning with local organic ingredients.',
    image: '/images/interior-1.png'
  },
  {
    title: 'Curated Ubud Experiences',
    desc: 'From private temple blessings to guided ridge walks, our concierge designs authentic encounters with Balinese culture.',
    image: '/images/rice-terraces.png'
  },
  {
    title: 'Meditation & Yoga Deck',
    desc: 'Find your center on the private hardwood deck suspended over the jungle valley, perfect for morning sun salutations.',
    image: '/images/jungle.png'
  }
]

export function ParallaxFeatures() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 768
      
      if (isDesktop && sectionRef.current && wrapperRef.current) {
        const panels = gsap.utils.toArray('.feature-panel') as HTMLElement[]
        
        // Pin the section and scroll the wrapper horizontally
        const totalScroll = wrapperRef.current.scrollWidth - window.innerWidth
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: `+=${totalScroll}`,
          }
        })
        
        tl.to(wrapperRef.current, {
          x: -totalScroll,
          ease: 'none'
        })

        // Parallax image within each panel
        panels.forEach((panel) => {
          const img = panel.querySelector('.feature-img')
          if (img) {
            gsap.to(img, {
              x: '20%', // Move image slightly to create parallax
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tl,
                start: 'left right',
                end: 'right left',
                scrub: true
              }
            })
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[var(--warm-sand)] text-[var(--charcoal)] md:overflow-hidden w-full md:h-screen relative">
      
      <div className="md:absolute md:top-12 md:left-12 pt-24 px-6 md:p-0 z-20">
        <h2 className="font-sc tracking-[0.4em] text-[11px] uppercase">
          What Awaits You
        </h2>
      </div>

      <div 
        ref={wrapperRef}
        className="flex flex-col md:flex-row h-auto md:h-full w-full md:w-[max-content] pt-12 md:pt-0"
      >
        {FEATURES.map((feature, i) => (
          <div 
            key={i} 
            className="feature-panel w-full md:w-[60vw] h-auto md:h-full flex flex-col md:flex-row items-center justify-center p-6 md:p-12 shrink-0 border-b md:border-b-0 md:border-r border-[var(--charcoal)]/10 last:border-none py-16 md:py-12"
          >
            {/* Image (40%) */}
            <div className="w-full md:w-[40%] h-[40vh] md:h-[60vh] relative overflow-hidden mb-8 md:mb-0">
              <div className="feature-img w-[120%] h-full absolute -left-[10%]">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>

            {/* Content (60%) */}
            <div className="w-full md:w-[60%] md:pl-16 flex flex-col justify-center">
              <span className="font-sc text-[var(--gold)] tracking-[0.2em] text-[12px] mb-4">
                0{i + 1}
              </span>
              <h3 className="font-serif text-3xl md:text-5xl font-light leading-[1.1] mb-6">
                {feature.title}
              </h3>
              <p className="font-sans text-[16px] leading-[1.8] text-[var(--charcoal)]/80 max-w-md">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
