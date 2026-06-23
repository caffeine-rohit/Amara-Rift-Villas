'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { DatePicker } from '@/components/date-picker'
import { differenceInDays, format, startOfToday, addDays } from 'date-fns'

const VILLAS = [
  { id: 'artha', name: 'Villa Artha', pricePerNight: 1800, beds: 2, sqft: 3200, available: true, image: '/images/villa-1.png' },
  { id: 'svarga', name: 'Villa Svarga', pricePerNight: 2400, beds: 3, sqft: 4500, available: true, badge: '1 Left', image: '/images/villa-2.png' },
  { id: 'kayon', name: 'Villa Kayon', pricePerNight: 3200, beds: 4, sqft: 6000, available: false, image: '/images/villa-3.png' },
]

const ENHANCEMENTS = [
  { id: 'airport', name: 'VIP Heli-Transfer', desc: 'From Ngurah Rai directly to estate', price: 800, perNight: false },
  { id: 'chef', name: 'Private Chef', desc: 'Dedicated culinary team for all meals', price: 500, perNight: true },
  { id: 'spa', name: 'Daily Spa Ritual', desc: '90-min daily treatments for two', price: 300, perNight: true },
]

export function ReservationInquiry() {
  const [step, setStep] = useState(1)
  
  // Search State
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
  const [guests, setGuests] = useState(2)
  const [isChecking, setIsChecking] = useState(false)
  
  // Selection State
  const [selectedVilla, setSelectedVilla] = useState<typeof VILLAS[0] | null>(null)
  const [selectedEnhancements, setSelectedEnhancements] = useState<string[]>([])
  
  // Final State
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const container = useRef<HTMLDivElement>(null)
  const isInView = useInView(container, { once: true, margin: "-20%" })

  // Ensure checkOut is always after checkIn
  useEffect(() => {
    if (checkIn && checkOut && checkOut <= checkIn) {
      setCheckOut(undefined)
    }
  }, [checkIn, checkOut])

  const nights = (checkIn && checkOut) ? Math.max(1, differenceInDays(checkOut, checkIn)) : 0
  const basePrice = selectedVilla ? selectedVilla.pricePerNight * nights : 0
  const enhancementsPrice = selectedEnhancements.reduce((total, encId) => {
    const enc = ENHANCEMENTS.find(e => e.id === encId)
    if (!enc) return total
    return total + (enc.perNight ? enc.price * nights : enc.price)
  }, 0)
  
  // 21% Tax & Service (Standard in Indonesia)
  const taxes = (basePrice + enhancementsPrice) * 0.21
  const total = basePrice + enhancementsPrice + taxes

  const handleCheckAvailability = () => {
    if (!checkIn || !checkOut) return
    setIsChecking(true)
    setTimeout(() => {
      setIsChecking(false)
      setStep(2)
    }, 1500)
  }

  const toggleEnhancement = (id: string) => {
    setSelectedEnhancements(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    )
  }

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section ref={container} id="reserve" className="py-32 bg-[var(--deep-forest)] text-white relative min-h-screen flex flex-col justify-center">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sc text-[11px] text-[var(--gold)] tracking-[0.5em] uppercase mb-6">
            Reservations
          </p>
          <h2 className="font-serif text-[42px] md:text-[64px] font-light leading-[1.1] mb-6">
            Begin Your Journey
          </h2>
          
          {/* Progress Indicator */}
          {step > 1 && !isSubmitted && (
            <div className="flex items-center justify-center gap-4 mt-8">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${s === step ? 'bg-[var(--gold)]' : s < step ? 'bg-[var(--gold)]/50' : 'bg-white/10'}`} />
                  {s !== 4 && <div className={`w-8 h-[1px] ${s < step ? 'bg-[var(--gold)]/30' : 'bg-white/5'}`} />}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 rounded-full border border-[var(--gold)] flex items-center justify-center text-[var(--gold)] mb-8">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 className="font-serif text-4xl mb-4">Reservation Requested</h3>
            <p className="font-sans text-[16px] text-white/60 mb-8 leading-relaxed">
              Thank you. We have received your request for {selectedVilla?.name} from {checkIn && format(checkIn, 'MMM dd')} to {checkOut && format(checkOut, 'MMM dd')}. 
              A member of our concierge team will contact you within 4 hours to finalize your booking.
            </p>
            <button 
              onClick={() => {
                setStep(1); setCheckIn(undefined); setCheckOut(undefined); setSelectedVilla(null); setSelectedEnhancements([]); setIsSubmitted(false)
              }}
              className="text-[var(--gold)] text-[12px] uppercase tracking-widest hover:text-white transition-colors border-b border-[var(--gold)] pb-1"
            >
              Start New Search
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16 relative">
            
            {/* Main Flow Area */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: Search */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-md"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      <DatePicker 
                        date={checkIn} 
                        setDate={setCheckIn} 
                        label="Check In" 
                        disabled={{ before: startOfToday() }}
                      />
                      <DatePicker 
                        date={checkOut} 
                        setDate={setCheckOut} 
                        label="Check Out" 
                        disabled={{ before: checkIn ? addDays(checkIn, 1) : startOfToday() }}
                      />
                    </div>
                    
                    <div className="mb-12">
                      <label className="block font-sans text-[12px] uppercase tracking-widest text-[var(--gold)] mb-4">
                        Guests
                      </label>
                      <div className="flex items-center gap-6 border-b border-white/20 pb-2 h-[34px] w-max">
                        <button onClick={() => setGuests(Math.max(1, guests - 1))} className="text-white hover:text-[var(--gold)] transition-colors">-</button>
                        <span className="font-sans text-[16px] min-w-[20px] text-center">{guests}</span>
                        <button onClick={() => setGuests(Math.min(8, guests + 1))} className="text-white hover:text-[var(--gold)] transition-colors">+</button>
                      </div>
                    </div>

                    <button 
                      onClick={handleCheckAvailability}
                      disabled={!checkIn || !checkOut || isChecking}
                      className="w-full h-14 bg-[var(--gold)] text-[#0D1F0F] font-sans text-[12px] uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50 disabled:hover:bg-[var(--gold)] flex items-center justify-center gap-3"
                    >
                      {isChecking ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#0D1F0F]/30 border-t-[#0D1F0F] rounded-full animate-spin" />
                          Checking Live Availability...
                        </>
                      ) : 'Check Availability'}
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: Villa Selection */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="font-serif text-3xl">Select Your Estate</h3>
                      <button onClick={() => setStep(1)} className="text-[11px] uppercase tracking-widest text-[var(--gold)] border-b border-[var(--gold)] pb-1">Edit Search</button>
                    </div>

                    {VILLAS.map((v) => (
                      <div 
                        key={v.id}
                        className={`flex flex-col md:flex-row border transition-colors duration-500 ${!v.available ? 'border-white/5 opacity-50 grayscale' : selectedVilla?.id === v.id ? 'border-[var(--gold)] bg-[var(--gold)]/5' : 'border-white/10 hover:border-white/30 bg-white/5'}`}
                      >
                        <div className="w-full md:w-[300px] h-[200px] bg-[#1a2e1d] relative">
                          <img src={v.image} alt={v.name} className="w-full h-full object-cover opacity-80" />
                          {v.badge && (
                            <div className="absolute top-4 left-4 bg-[var(--gold)] text-[#0D1F0F] font-sans text-[10px] uppercase tracking-widest px-3 py-1 font-bold">
                              {v.badge}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-serif text-2xl text-[var(--gold)]">{v.name}</h4>
                              {!v.available && <span className="font-sans text-[11px] uppercase tracking-widest text-red-400">Unavailable</span>}
                            </div>
                            <p className="font-sans text-[13px] text-white/60 mb-4">{v.beds} Bedrooms · {v.sqft} sqft · Private Pool</p>
                          </div>
                          
                          <div className="flex items-end justify-between mt-4 border-t border-white/10 pt-4">
                            <div>
                              <p className="font-sans text-[20px]">${v.pricePerNight.toLocaleString()}</p>
                              <p className="font-sans text-[11px] uppercase tracking-widest text-white/40">per night</p>
                            </div>
                            {v.available && (
                              <button 
                                onClick={() => { setSelectedVilla(v); setStep(3) }}
                                className={`px-6 py-3 font-sans text-[11px] uppercase tracking-widest transition-colors ${selectedVilla?.id === v.id ? 'bg-[var(--gold)] text-[#0D1F0F]' : 'border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[#0D1F0F]'}`}
                              >
                                {selectedVilla?.id === v.id ? 'Selected' : 'Select'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* STEP 3: Enhancements */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="font-serif text-3xl">Enhance Your Stay</h3>
                      <button onClick={() => setStep(2)} className="text-[11px] uppercase tracking-widest text-[var(--gold)] border-b border-[var(--gold)] pb-1">Back</button>
                    </div>

                    <div className="space-y-4 mb-12">
                      {ENHANCEMENTS.map((enc) => (
                        <div 
                          key={enc.id}
                          className={`flex items-center justify-between p-6 border transition-colors cursor-pointer ${selectedEnhancements.includes(enc.id) ? 'border-[var(--gold)] bg-[var(--gold)]/5' : 'border-white/10 hover:border-white/30 bg-white/5'}`}
                          onClick={() => toggleEnhancement(enc.id)}
                        >
                          <div className="flex items-center gap-6">
                            <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${selectedEnhancements.includes(enc.id) ? 'border-[var(--gold)] bg-[var(--gold)]' : 'border-white/30'}`}>
                              {selectedEnhancements.includes(enc.id) && (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0D1F0F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              )}
                            </div>
                            <div>
                              <h4 className="font-serif text-xl mb-1">{enc.name}</h4>
                              <p className="font-sans text-[13px] text-white/50">{enc.desc}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-sans text-[16px]">${enc.price}</p>
                            <p className="font-sans text-[11px] uppercase tracking-widest text-white/40">{enc.perNight ? 'per night' : 'total'}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setStep(4)}
                      className="w-full h-14 bg-[var(--gold)] text-[#0D1F0F] font-sans text-[12px] uppercase tracking-[0.2em] hover:bg-white transition-colors"
                    >
                      Continue to Details
                    </button>
                  </motion.div>
                )}

                {/* STEP 4: Guest Details */}
                {step === 4 && (
                  <motion.form
                    key="step4"
                    onSubmit={handleFinalSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/5 border border-white/10 p-8 md:p-12"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="font-serif text-3xl">Guest Details</h3>
                      <button type="button" onClick={() => setStep(3)} className="text-[11px] uppercase tracking-widest text-[var(--gold)] border-b border-[var(--gold)] pb-1">Back</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <label className="block font-sans text-[11px] uppercase tracking-widest text-[var(--gold)] mb-4">First Name</label>
                        <input required type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-sans text-[16px] outline-none focus:border-[var(--gold)] transition-colors" />
                      </div>
                      <div>
                        <label className="block font-sans text-[11px] uppercase tracking-widest text-[var(--gold)] mb-4">Last Name</label>
                        <input required type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-sans text-[16px] outline-none focus:border-[var(--gold)] transition-colors" />
                      </div>
                      <div>
                        <label className="block font-sans text-[11px] uppercase tracking-widest text-[var(--gold)] mb-4">Email</label>
                        <input required type="email" className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-sans text-[16px] outline-none focus:border-[var(--gold)] transition-colors" />
                      </div>
                      <div>
                        <label className="block font-sans text-[11px] uppercase tracking-widest text-[var(--gold)] mb-4">Phone (WhatsApp)</label>
                        <input required type="tel" className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-sans text-[16px] outline-none focus:border-[var(--gold)] transition-colors" />
                      </div>
                    </div>

                    <div className="mb-12">
                      <label className="block font-sans text-[11px] uppercase tracking-widest text-[var(--gold)] mb-4">Special Requests (Optional)</label>
                      <textarea rows={3} className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-sans text-[16px] outline-none focus:border-[var(--gold)] transition-colors resize-none" placeholder="Arrival time, dietary requirements, celebrations..."></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full h-14 bg-[var(--gold)] text-[#0D1F0F] font-sans text-[12px] uppercase tracking-[0.2em] hover:bg-white transition-colors"
                    >
                      Confirm Reservation Request
                    </button>
                    <p className="text-center font-sans text-[11px] text-white/40 mt-4">
                      No payment required at this step. Our team will contact you to confirm.
                    </p>
                  </motion.form>
                )}

              </AnimatePresence>
            </div>

            {/* Sidebar Summary (Visible on Step 2, 3, 4) */}
            <AnimatePresence>
              {step > 1 && !isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="w-full lg:w-[380px] shrink-0"
                >
                  <div className="sticky top-32 bg-[#0a160b] border border-[var(--gold)]/30 p-8">
                    <h4 className="font-sc text-[14px] tracking-widest text-[var(--gold)] uppercase mb-8 border-b border-white/10 pb-4">
                      Your Stay
                    </h4>
                    
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="font-sans text-[11px] uppercase tracking-widest text-white/50 mb-1">Check In</p>
                        <p className="font-sans text-[14px]">{checkIn && format(checkIn, 'MMM dd, yyyy')}</p>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div className="text-right">
                        <p className="font-sans text-[11px] uppercase tracking-widest text-white/50 mb-1">Check Out</p>
                        <p className="font-sans text-[14px]">{checkOut && format(checkOut, 'MMM dd, yyyy')}</p>
                      </div>
                    </div>

                    <div className="mb-6 flex justify-between font-sans text-[14px]">
                      <span className="text-white/60">Guests</span>
                      <span>{guests} Adults</span>
                    </div>
                    <div className="mb-8 flex justify-between font-sans text-[14px]">
                      <span className="text-white/60">Duration</span>
                      <span>{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                    </div>

                    {selectedVilla && (
                      <div className="border-t border-white/10 pt-6 mb-6">
                        <div className="flex justify-between font-serif text-[20px] mb-2">
                          <span>{selectedVilla.name}</span>
                          <span>${basePrice.toLocaleString()}</span>
                        </div>
                        <p className="font-sans text-[11px] uppercase tracking-widest text-[var(--gold)]">
                          ${selectedVilla.pricePerNight.toLocaleString()} / night
                        </p>
                      </div>
                    )}

                    {selectedEnhancements.length > 0 && (
                      <div className="border-t border-white/10 pt-6 mb-6">
                        <p className="font-sans text-[11px] uppercase tracking-widest text-white/50 mb-4">Enhancements</p>
                        {selectedEnhancements.map(encId => {
                          const enc = ENHANCEMENTS.find(e => e.id === encId)
                          if (!enc) return null
                          const price = enc.perNight ? enc.price * nights : enc.price
                          return (
                            <div key={enc.id} className="flex justify-between font-sans text-[13px] mb-2">
                              <span>{enc.name}</span>
                              <span>${price.toLocaleString()}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {selectedVilla && (
                      <div className="border-t border-[var(--gold)]/30 pt-6">
                        <div className="flex justify-between font-sans text-[13px] text-white/60 mb-2">
                          <span>Taxes & Fees (21%)</span>
                          <span>${taxes.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <span className="font-serif text-[24px]">Total</span>
                          <span className="font-sans text-[24px] text-[var(--gold)]">${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        )}
      </div>
    </section>
  )
}
