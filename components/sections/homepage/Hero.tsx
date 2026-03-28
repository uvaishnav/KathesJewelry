'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Star } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { SERVICE_ICONS } from '@/components/ui/ServiceIcons'

const SERVICES = [
  'Expert Jewelry Repair',
  'Custom Engagement Rings',
  'We Buy Gold & Silver',
  'Fine Estate Jewelry',
  'Watch Repair',
  'Free Consultation',
]

// Review platforms — three separate clickable links
const REVIEW_PLATFORMS = [
  {
    name: 'Google',
    rating: '4.8',
    url: 'https://www.google.com/search?q=Kathe%27s+Jewelry+New+York+reviews',
  },
  {
    name: 'Yelp',
    rating: '4.8',
    url: 'https://www.yelp.com/biz/kathes-jewelry-new-york',
  },
  {
    name: 'TrustAnalytica',
    rating: '4.8',
    url: 'https://jewelry-store.trustanalytica.org/us/ny/new-york/reviews/kathe-s-jewelry',
  },
]

// ── Service icon + typewriter ────────────────────────────────
function ServiceShowcase() {
  const [current, setCurrent] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<'typing' | 'hold' | 'erasing'>('typing')
  const [iconVisible, setIconVisible] = useState(true)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const service = SERVICES[current]
    let t: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (displayed.length < service.length) {
        t = setTimeout(() => setDisplayed(service.slice(0, displayed.length + 1)), 48)
      } else {
        t = setTimeout(() => setPhase('hold'), 2000)
      }
    } else if (phase === 'hold') {
      t = setTimeout(() => setPhase('erasing'), 300)
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 26)
      } else {
        setIconVisible(false)
        setTimeout(() => {
          setCurrent((c) => (c + 1) % SERVICES.length)
          setIconVisible(true)
          setPhase('typing')
        }, 200)
      }
    }
    return () => clearTimeout(t)
  }, [displayed, phase, current, reduced])

  const Icon = SERVICE_ICONS[current]

  return (
    <div className="flex flex-col items-center gap-8" aria-hidden="true">
      {/* Icon — clean, no orbit rings */}
      <div
        style={{
          width: 160,
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: iconVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
          position: 'relative',
        }}
      >
        {/* Subtle ambient glow only — no rings */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(201,169,110,0.12) 0%, transparent 70%)',
          }}
        />
        <Icon isActive={iconVisible} size={90} />
      </div>

      {/* Service name typewriter */}
      <div className="text-center">
        {/* "We specialize in" — white, visible */}
        <p
          className="font-sans uppercase mb-3"
          style={{ fontSize: 11, letterSpacing: '0.35em', color: 'rgba(255,255,255,0.75)' }}
        >
          We specialize in
        </p>

        {/* Typed service — gold-light (same as "Jeweler"), larger */}
        <div className="flex items-center justify-center gap-2 min-h-[32px]">
          <span
            className="font-sans font-semibold uppercase"
            style={{
              fontSize: 15,
              letterSpacing: '0.22em',
              color: 'var(--gold-light)',   /* same as the "Jeweler" highlight */
            }}
          >
            {reduced ? SERVICES[0] : displayed}
          </span>
          {/* Blinking cursor */}
          {!reduced && (
            <span
              style={{
                display: 'inline-block',
                width: 2,
                height: 18,
                background: 'var(--gold-light)',
                borderRadius: 1,
                animation: 'pulse 0.8s ease-in-out infinite',
              }}
            />
          )}
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {SERVICES.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === current ? 18 : 4,
                height: 4,
                borderRadius: 2,
                background: i === current ? 'var(--gold-light)' : 'rgba(201,169,110,0.2)',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Review row — three separate platform links ────────────────
function ReviewRow() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10">
      {/* Stars + summary */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex" aria-label="5 star rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="fill-[var(--gold-primary)] text-[var(--gold-primary)]"
              style={{ width: 14, height: 14 }}
            />
          ))}
        </div>
        <span
          className="font-sans font-bold text-white"
          style={{ fontSize: 15 }}
        >
          4.8
        </span>
        <span
          className="font-sans text-white/50"
          style={{ fontSize: 11 }}
        >
          out of 5
        </span>
      </div>

      {/* Thin vertical separator */}
      <div className="hidden sm:block w-px h-4 bg-white/20" aria-hidden="true" />

      {/* Three platform links */}
      <div className="flex items-center gap-4 flex-wrap">
        {REVIEW_PLATFORMS.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 transition-colors duration-200"
            aria-label={`${p.rating} stars on ${p.name}`}
          >
            <span
              className="font-sans font-semibold group-hover:text-[var(--gold-primary)] transition-colors duration-200"
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)' }}
            >
              {p.name}
            </span>
            {/* Underline on hover */}
            <span
              className="font-sans"
              style={{ fontSize: 11, color: 'var(--gold-primary)' }}
            >
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Hero section ─────────────────────────────────────────────
export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !titleRef.current) return
    const words = titleRef.current.querySelectorAll<HTMLElement>('.hero-word')
    words.forEach((w, i) => { w.style.animationDelay = `${0.2 + i * 0.1}s` })
  }, [reduced])

  const H1_WORDS = ['New', "York's", 'Trusted', 'Jeweler', 'Since', '1993']

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100svh' }}
      aria-label="Hero — Kathe's Jewelry"
    >
      {/* Background */}
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
            'linear-gradient(155deg, rgba(17,17,17,0.90) 0%, rgba(43,32,24,0.75) 40%, rgba(17,17,17,0.68) 70%, rgba(17,17,17,0.80) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: '55%',
          height: '50%',
          background: 'radial-gradient(ellipse at bottom left, rgba(201,169,110,0.16) 0%, transparent 68%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="absolute inset-0 flex items-center"
        style={{ zIndex: 2, paddingTop: '5rem' }}
      >
        <div
          className="mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          style={{ maxWidth: 'var(--max-width)', padding: '0 var(--container-padding)' }}
        >
          {/* LEFT: Copy */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-[var(--gold-primary)]" aria-hidden="true" />
              <span
                className="font-sans uppercase"
                style={{ fontSize: 10, letterSpacing: '0.45em', color: 'var(--gold-primary)' }}
              >
                Est. 1993 · East Village, New York
              </span>
            </div>

            {/* H1 */}
            <h1
              ref={titleRef}
              className="font-serif font-bold text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5.2rem)' }}
            >
              {H1_WORDS.map((word, i) => (
                <span key={i}>
                  <span
                    className={`hero-word ${reduced ? '' : 'opacity-0'}`}
                    style={{ color: word === 'Jeweler' ? 'var(--gold-light)' : 'white' }}
                  >
                    {word}
                  </span>
                  {i < H1_WORDS.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h1>

            <div className="w-12 h-px bg-[var(--gold-primary)]/50 mb-6" aria-hidden="true" />

            {/* Body */}
            <p
              className="font-body leading-[1.8] mb-8"
              style={{
                fontSize: 'clamp(15px, 2vw, 18px)',
                maxWidth: 480,
                color: 'rgba(255,255,255,0.80)',
              }}
            >
              From resizing a cherished heirloom to designing your perfect
              engagement ring, every piece that enters our East Village workshop
              is treated like it belongs to family.
            </p>

            {/* Reviews — three separate links, no gold box */}
            <ReviewRow />

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" href="/shop" className="btn-shimmer">
                Explore Our Jewelry
              </Button>
              <Link
                href="/services"
                className="btn-shimmer inline-flex items-center justify-center gap-2 font-sans font-semibold uppercase px-8 py-4 transition-all duration-200"
                style={{
                  fontSize: 12,
                  letterSpacing: '0.15em',
                  border: '1px solid rgba(255,255,255,0.45)',
                  color: 'rgba(255,255,255,0.88)',
                }}
              >
                Discover Our Services
              </Link>
            </div>
          </div>

          {/* RIGHT: Service icons — hidden on mobile */}
          <div className="hidden lg:flex justify-center items-center">
            <ServiceShowcase />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll-indicator absolute left-1/2 flex flex-col items-center gap-1"
        style={{ bottom: 28, zIndex: 3 }}
        aria-hidden="true"
      >
        <span className="font-sans uppercase" style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(201,169,110,0.55)' }}>
          Scroll
        </span>
        <ChevronDown style={{ width: 20, height: 20, color: 'var(--gold-primary)' }} />
      </div>
    </section>
  )
}
