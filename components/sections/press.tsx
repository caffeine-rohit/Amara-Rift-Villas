'use client'

export function Press() {
  return (
    <section className="py-24 bg-[var(--off-white)] border-t border-[var(--charcoal)]/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--charcoal)]/50 mb-12">
          As featured in
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
          {['Vogue Living', 'Condé Nast Traveller', 'Wallpaper*', 'TRAVEL + LEISURE', 'The Telegraph'].map((logo, i) => (
             <span key={i} className="font-serif text-xl md:text-2xl tracking-wide opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
               {logo}
             </span>
          ))}
        </div>
      </div>
    </section>
  )
}
