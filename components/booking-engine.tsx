'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShieldCheck,
} from 'lucide-react'
import { Reveal } from './reveal'

const NIGHTLY_DIRECT = 420
const OTA_MULTIPLIER = 1.25 // ~25% OTA markup + fees
const CLEANING_FEE = 60
const MAX_GUESTS = 8

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function sameDay(a: Date | null, b: Date | null) {
  return (
    !!a && !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function BookingEngine() {
  const today = useMemo(() => startOfDay(new Date()), [])
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [guests, setGuests] = useState(2)

  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const goMonth = (dir: number) => {
    let m = viewMonth + dir
    let y = viewYear
    if (m < 0) {
      m = 11
      y -= 1
    } else if (m > 11) {
      m = 0
      y += 1
    }
    setViewMonth(m)
    setViewYear(y)
  }

  const handlePick = (day: number) => {
    const picked = new Date(viewYear, viewMonth, day)
    if (picked < today) return
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(picked)
      setCheckOut(null)
    } else if (picked > checkIn) {
      setCheckOut(picked)
    } else {
      setCheckIn(picked)
      setCheckOut(null)
    }
  }

  const nights =
    checkIn && checkOut
      ? Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000)
      : 0

  const directTotal = nights * NIGHTLY_DIRECT + (nights ? CLEANING_FEE : 0)
  const otaTotal = Math.round(
    nights * NIGHTLY_DIRECT * OTA_MULTIPLIER + (nights ? CLEANING_FEE : 0),
  )
  const savings = otaTotal - directTotal

  const fmt = (d: Date | null) =>
    d
      ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : '—'

  const inRange = (day: number) => {
    if (!checkIn || !checkOut) return false
    const d = new Date(viewYear, viewMonth, day)
    return d > checkIn && d < checkOut
  }

  return (
    <section id="booking" className="bg-[oklch(0.12_0.012_55)] py-24 text-background lg:py-36">
      {/* Top border glow */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-0" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary">
              <span className="h-px w-6 bg-primary/60" />
              Book Your Stay
            </p>
            <h2 className="text-balance font-serif text-4xl font-light leading-tight tracking-tight text-white sm:text-5xl">
              Reserve direct.{' '}
              <span className="text-gold-gradient">Keep the savings.</span>
            </h2>
            <p className="mt-5 max-w-lg text-pretty leading-relaxed text-background/60">
              Booking platforms add 12–18% in fees on top of host markups. Here
              you pay the real rate — every dollar saved stays in your pocket.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="grid gap-px overflow-hidden rounded-sm border border-primary/20 bg-primary/5 shadow-xl shadow-primary/5 lg:grid-cols-[1.4fr_1fr]">
            {/* Calendar */}
            <div className="bg-[oklch(0.12_0.012_55)] p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() => goMonth(-1)}
                  className="rounded-full p-2 text-background/70 transition-colors hover:bg-background/10 hover:text-background"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <p className="font-serif text-lg">
                  {MONTHS[viewMonth]} {viewYear}
                </p>
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() => goMonth(1)}
                  className="rounded-full p-2 text-background/70 transition-colors hover:bg-background/10 hover:text-background"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>

              <div className="mb-2 grid grid-cols-7 gap-1 text-center">
                {WEEKDAYS.map((d, i) => (
                  <span key={i} className="text-xs text-background/40">
                    {d}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstWeekday }).map((_, i) => (
                  <span key={`pad-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const d = new Date(viewYear, viewMonth, day)
                  const past = d < today
                  const isCheckIn = sameDay(d, checkIn)
                  const isCheckOut = sameDay(d, checkOut)
                  const between = inRange(day)
                  const isEnd = isCheckIn || isCheckOut
                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={past}
                      onClick={() => handlePick(day)}
                      className={`aspect-square rounded-full text-sm transition-colors ${
                        past
                          ? 'cursor-not-allowed text-background/20'
                          : 'text-background/80 hover:bg-background/10'
                      } ${between ? 'bg-primary/25 text-background' : ''} ${
                        isEnd
                          ? 'bg-primary font-medium text-primary-foreground hover:bg-primary'
                          : ''
                      }`}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>

              <p className="mt-5 text-xs text-background/50">
                {checkIn && !checkOut
                  ? 'Now select your check-out date.'
                  : 'Select your check-in and check-out dates.'}
              </p>
            </div>

            {/* Summary */}
            <div className="flex flex-col bg-card p-6 text-card-foreground sm:p-8">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md border border-border p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Check-in
                  </p>
                  <p className="mt-1 font-medium">{fmt(checkIn)}</p>
                </div>
                <div className="rounded-md border border-border p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Check-out
                  </p>
                  <p className="mt-1 font-medium">{fmt(checkOut)}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-md border border-border p-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Guests
                  </p>
                  <p className="mt-1 font-medium">
                    {guests} {guests === 1 ? 'guest' : 'guests'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Fewer guests"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="flex size-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
                  >
                    <Minus className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="More guests"
                    onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
                    className="flex size-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>
                    ${NIGHTLY_DIRECT} × {nights || 0}{' '}
                    {nights === 1 ? 'night' : 'nights'}
                  </span>
                  <span>${(nights * NIGHTLY_DIRECT).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Cleaning fee</span>
                  <span>${nights ? CLEANING_FEE : 0}</span>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Direct total
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <motion.span
                      key={directTotal}
                      initial={{ opacity: 0.4, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-serif text-3xl tracking-tight"
                    >
                      ${directTotal.toLocaleString()}
                    </motion.span>
                    {nights > 0 && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${otaTotal.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                {savings > 0 && (
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                    Save ${savings.toLocaleString()}
                  </span>
                )}
              </div>

              <button
                type="button"
                disabled={!nights}
                className="mt-6 w-full rounded-full bg-primary py-4 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-300 enabled:hover:scale-[1.02] enabled:hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                {nights ? 'Reserve Now' : 'Select dates to reserve'}
              </button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5 text-accent" />
                No booking fees · Free cancellation up to 14 days
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
