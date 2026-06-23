'use client'

import { useState, useRef, useEffect } from 'react'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarIcon } from 'lucide-react'
import 'react-day-picker/dist/style.css'

import { Matcher } from 'react-day-picker'

export function DatePicker({ 
  date, 
  setDate, 
  label,
  disabled
}: { 
  date: Date | undefined, 
  setDate: (d: Date | undefined) => void, 
  label: string,
  disabled?: Matcher | Matcher[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <label className="block font-sans text-[12px] uppercase tracking-widest text-[var(--gold)] mb-4">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-transparent border-b border-white/20 pb-2 text-left text-white font-sans text-[16px] outline-none hover:border-[var(--gold)] transition-colors flex justify-between items-center h-[34px]"
      >
        <span>{date ? format(date, 'MMM dd, yyyy') : 'Select date'}</span>
        <CalendarIcon className="w-4 h-4 text-white/50" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 mt-4 z-50 bg-[#0D1F0F] border border-[var(--gold)]/30 p-4 shadow-2xl"
          >
            <style jsx global>{`
              .rdp {
                --rdp-cell-size: 40px;
                --rdp-accent-color: var(--gold);
                --rdp-background-color: rgba(201, 165, 90, 0.2);
                margin: 0;
              }
              .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
                background-color: var(--gold) !important;
                color: #0D1F0F !important;
                font-weight: 600;
              }
              .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                background-color: rgba(255,255,255,0.1) !important;
                color: white;
              }
              .rdp-day_disabled {
                opacity: 0.25;
                cursor: not-allowed;
                pointer-events: none;
              }
              .rdp-day {
                font-family: var(--font-sans);
                font-size: 14px;
                border-radius: 0;
              }
              .rdp-caption_label {
                font-family: var(--font-sc);
                letter-spacing: 0.2em;
                font-size: 16px;
                color: var(--gold);
                text-transform: uppercase;
              }
              .rdp-head_cell {
                font-family: var(--font-sans);
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: rgba(255,255,255,0.4);
                font-weight: 400;
              }
              .rdp-nav_button {
                color: var(--gold);
              }
              .rdp-nav_button:hover {
                background-color: rgba(255,255,255,0.1);
              }
            `}</style>
            <DayPicker
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d)
                setIsOpen(false)
              }}
              disabled={disabled}
              className="text-white bg-[#0D1F0F]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
