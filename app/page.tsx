import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/sections/hero'
import { Philosophy } from '@/components/sections/philosophy'
import { VillasCollection } from '@/components/sections/villas-collection'
import { ParallaxFeatures } from '@/components/sections/parallax-features'
import { ImmersiveGallery } from '@/components/sections/immersive-gallery'
import { Location } from '@/components/sections/location'
import { Experiences } from '@/components/sections/experiences'
import { Testimonials } from '@/components/sections/testimonials'
import { Press } from '@/components/sections/press'
import { ReservationInquiry } from '@/components/sections/reservation-inquiry'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="relative w-full">
      <SiteHeader />
      <Hero />
      <Philosophy />
      <VillasCollection />
      <ParallaxFeatures />
      <ImmersiveGallery />
      <Location />
      <Experiences />
      <Testimonials />
      <Press />
      <ReservationInquiry />
      <SiteFooter />
    </main>
  )
}
