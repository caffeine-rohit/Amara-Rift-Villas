import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { StatsStrip } from '@/components/stats-strip'
import { Story } from '@/components/story'
import { PressStrip } from '@/components/press-strip'
import { Gallery } from '@/components/gallery'
import { Amenities } from '@/components/amenities'
import { BookingEngine } from '@/components/booking-engine'
import { Testimonials } from '@/components/testimonials'
import { Location } from '@/components/location'
import { FinalCta } from '@/components/final-cta'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <SiteNav />
      <Hero />
      <StatsStrip />
      <Story />
      <PressStrip />
      <Gallery />
      <Amenities />
      <BookingEngine />
      <Testimonials />
      <Location />
      <FinalCta />
      <SiteFooter />
    </main>
  )
}
