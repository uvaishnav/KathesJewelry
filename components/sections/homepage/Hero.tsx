'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Star } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/Button'

const SERVICES = [
  'Expert Jewelry Repair',
  'Custom Engagement Rings',
  'We Buy Gold & Silver',
  'Fine Estate Jewelry',
  'Watch Repair',
  'Free Consultation',
]

function AnimatedGem() {
  return (
    <div className="relative flex items-center justify-center w-full h-full" aria-hidden="true">
      {/* Outermost slow-rotating orbit ring */}
      <div className="absolute w-[320px] h-[320px] rounded-full border border-[var(--gold-primary)]/10 animate-[spin_25s_linear_infinite]" />

      {/* Middle orbit with dots */}
      <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-[var(--gold-primary)]/20 animate-[spin_18s_linear_infinite_reverse]">
        {/* Orbit dot */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--gold-primary)]/60" />
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--gold-primary)]/30" />
      </div>

      {/* Inner pulsing glow */}
      <div className="absolute w-[160px] h-[160px] rounded-full bg-[var(--gold-primary)]/5 animate-[pulse_3s_ease-in-out_infinite]" />
      <div className="absolute w-[120px] h-[120px] rounded-full bg-[var(--gold-primary)]/8 animate-[pulse_3s_ease-in-out_infinite_500ms]" />

      {/* SVG Gemstone — 8-facet diamond cut */}
      <svg
        viewBox="0 0 100 100"
        className="relative z-10 w-[88px] h-[88px] drop-shadow-[0_0_24px_rgba(201,169,110,0.5)] animate-[spin_30s_linear_infinite]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer crown facets */}
        <polygon points="50,5 68,28 50,38 32,28" fill="none" stroke="#C9A96E" strokeWidth="0.8" opacity="0.9" />
        <polygon points="50,5 32,28 10,22" fill="none" stroke="#C9A96E" strokeWidth="0.6" opacity="0.5" />
        <polygon points="50,5 68,28 90,22" fill="none" stroke="#C9A96E" strokeWidth="0.6" opacity="0.5" />
        {/* Girdle */}
        <polygon points="32,28 10,22 14,55 50,62" fill="none" stroke="#C9A96E" strokeWidth="0.7" opacity="0.7" />
        <polygon points="68,28 90,22 86,55 50,62" fill="none" stroke="#C9A96E" strokeWidth="0.7" opacity="0.7" />
        <polygon points="32,28 50,38 50,62 14,55" fill="none" stroke="#E8D5A3" strokeWidth="0.5" opacity="0.4" />
        <polygon points="68,28 50,38 50,62 86,55" fill="none" stroke="#E8D5A3" strokeWidth="0.5" opacity="0.4" />
        {/* Pavilion */}
        <polygon points="14,55 50,62 50,95" fill="none" stroke="#C9A96E" strokeWidth="0.8" opacity="0.8" />
        <polygon points="86,55 50,62 50,95" fill="none" stroke="#C9A96E" strokeWidth="0.8" opacity="0.8" />
        {/* Table */}
        <polygon points="50,38 68,28 32,28" fill="rgba(201,169,110,0.08)" stroke="#C9A96E" strokeWidth="0.6" opacity="0.9" />
        {/* Center sparkle cross */}
        <line x1="50" y1="44" x2="50" y2="56" stroke="#E8D5A3" strokeWidth="0.5" opacity="0.6" />
        <line x1="44" y1="50" x2="56" y2="50" stroke="#E8D5A3" strokeWidth="0.5" opacity="0.6" />
      </svg>

      {/* Corner sparkle dots */}
      {[0, 72, 144, 216, 288].map((deg) => (
        <div
          key={deg}
          className="absolute w-1 h-1 rounded-full bg-[var(--gold-light)] animate-[pulse_2s_ease-in-out_infinite]"
          style={{
            transform: `rotate(${deg}deg) translateY(-140px)`,
            animationDelay: `${deg / 288}s`,
          }}
        />
      ))}
    </div>
  )
}

function TypewriterServices() {
  const [current, setCurrent] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<'typing' | 'hold' | 'erasing'>('typing')
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const service = SERVICES[current]
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (displayed.length < service.length) {
        timeout = setTimeout(() => setDisplayed(service.slice(0, displayed.length + 1)), 55)
      } else {
        timeout = setTimeout(() => setPhase('hold'), 1800)
      }
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('erasing'), 400)
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28)
      } else {
        setCurrent((c) => (c + 1) % SERVICES.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, phase, current, reduced])

  if (reduced) {
    return (
      <p className="font-sans text-[13px] tracking-[2px] uppercase text-[var(--gold-primary)]">
        {SERVICES[0]}
      </p>
    )
  }

  return (
    <div className="flex items-center gap-2 min-h-[24px]">
      <p className="font-sans text-[13px] tracking-[3px] uppercase text-[var(--gold-primary)]">
        {displayed}
      </p>
      {/* Blinking cursor */}
      <span
        className="inline-block w-[2px] h-4 bg-[var(--gold-primary)] animate-[pulse_0.8s_ease-in-out_infinite]"
        aria-hidden="true"
      />
    </div>
  )
}

export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100svh' }}
      aria-label="Hero — Kathe's Jewelry"
    >
      {/* Background Image */}
      <Image
        src="/images/hero-store-interior.webp"
        alt="Kathe's Jewelry store interior — East Village NYC"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Layered overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(155deg, rgba(17,17,17,0.82) 0%, rgba(43,32,24,0.65) 45%, rgba(17,17,17,0.55) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Warm amber glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[50%] h-[45%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at bottom left, rgba(201,169,110,0.14) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Content — two-column on lg+ */}
      {/* Push below navbar height (h-20 on homepage) with pt */}
      <div
        className="absolute inset-0 flex items-center pt-20"
        style={{ zIndex: 2 }}
      >
        <div
          className="mx-auto w-full px-[var(--container-padding)] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          {/* LEFT — Copy */}
          <div>
            {/* Eyebrow with lines */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-[var(--gold-primary)]" aria-hidden="true" />
              <span className="font-sans text-[10px] tracking-[5px] uppercase text-[var(--gold-primary)]">
                Est. 1993 · East Village, New York
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-serif font-bold text-white leading-[1.05] mb-6 tracking-tight"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)' }}
            >
              New York&apos;s Trusted
              <br />
              <em className="not-italic" style={{ color: 'var(--gold-light)' }}>Jeweler</em>{' '}
              Since 1993
            </h1>

            {/* Gold divider */}
            <div className="w-12 h-px bg-[var(--gold-primary)]/50 mb-6" aria-hidden="true" />

            {/* Body */}
            <p className="font-body text-[17px] text-white/75 leading-[1.8] max-w-[480px] mb-8">
              From resizing a cherished heirloom to designing your perfect
              engagement ring, every piece that enters our East Village workshop
              is treated like it belongs to family.
            </p>

            {/* Star trust line */}
            <div className="flex items-center gap-2 mb-10">
              <div className="flex" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-[var(--gold-primary)] text-[var(--gold-primary)]"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="font-sans text-[11px] tracking-[1px] text-white/55">
                4.8 Stars · Google · Yelp · TrustAnalytica
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" href="/shop">
                Explore Our Jewelry
              </Button>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2
                           font-sans font-semibold text-[12px] tracking-[2px] uppercase
                           border border-white/60 text-white/90 px-8 py-4
                           hover:border-white hover:bg-white/10
                           transition-all duration-200"
              >
                Discover Our Services
              </Link>
            </div>
          </div>

          {/* RIGHT — Animated gem + typewriter */}
          <div className="hidden lg:flex flex-col items-center gap-8">
            {/* Gem animation area */}
            <div className="relative w-[340px] h-[340px]">
              <AnimatedGem />
            </div>

            {/* Service typewriter */}
            <div className="text-center">
              <p className="font-sans text-[10px] tracking-[4px] uppercase text-white/35 mb-3">
                We specialize in
              </p>
              <TypewriterServices />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 hero-scroll-indicator flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <span className="font-sans text-[9px] tracking-[3px] uppercase text-[var(--gold-primary)]/60">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-[var(--gold-primary)]" />
      </div>
    </section>
  )
}
