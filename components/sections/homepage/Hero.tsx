'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
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

// Shape configs per service — different clip-path polygons for variety
const SHAPES = [
  // Octagon
  'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
  // Diamond
  'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  // Wide hexagon
  'polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)',
  // Pentagon
  'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
  // Tall hexagon
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  // Gem facet
  'polygon(50% 0%, 80% 15%, 100% 45%, 80% 85%, 50% 100%, 20% 85%, 0% 45%, 20% 15%)',
]

const REVIEW_PLATFORMS = [
  { name: 'Google', rating: '4.8', url: 'https://www.google.com/search?q=Kathe%27s+Jewelry+New+York+reviews' },
  { name: 'Yelp', rating: '4.8', url: 'https://www.yelp.com/biz/kathes-jewelry-new-york' },
  { name: 'TrustAnalytica', rating: '4.8', url: 'https://jewelry-store.trustanalytica.org/us/ny/new-york/reviews/kathe-s-jewelry' },
]

// ── Service Showcase ─────────────────────────────────────────────
function ServiceShowcase() {
  const [current, setCurrent] = useState(0)
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in')
  const [displayText, setDisplayText] = useState(SERVICES[0])
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    let t: ReturnType<typeof setTimeout>
    if (phase === 'in') {
      t = setTimeout(() => setPhase('hold'), 400)
    } else if (phase === 'hold') {
      t = setTimeout(() => setPhase('out'), 2800)
    } else {
      // out → advance
      t = setTimeout(() => {
        const next = (current + 1) % SERVICES.length
        setCurrent(next)
        setDisplayText(SERVICES[next])
        setPhase('in')
      }, 500)
    }
    return () => clearTimeout(t)
  }, [phase, current, reduced])

  const isVisible = phase !== 'out'
  const shape = SHAPES[current]

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 340, height: 340 }}
      aria-hidden="true"
    >
      {/* Rotating outer ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: '1px solid rgba(201,169,110,0.15)',
          animation: reduced ? 'none' : 'slowSpin 18s linear infinite',
        }}
      />
      {/* Second ring, counter-rotate */}
      <div
        className="absolute"
        style={{
          inset: 20,
          borderRadius: '50%',
          border: '1px dashed rgba(201,169,110,0.1)',
          animation: reduced ? 'none' : 'slowSpin 26s linear infinite reverse',
        }}
      />

      {/* Dot markers on the outer ring */}
      {[0, 72, 144, 216, 288].map((deg) => (
        <div
          key={deg}
          className="absolute"
          style={{
            width: 4,
            height: 4,
            background: 'rgba(201,169,110,0.4)',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            transform: `translate(-50%,-50%) rotate(${deg}deg) translateY(-168px)`,
          }}
        />
      ))}

      {/* Central morphing shape */}
      <div
        className="absolute"
        style={{
          inset: 44,
          clipPath: shape,
          background: 'linear-gradient(135deg, rgba(201,169,110,0.12) 0%, rgba(201,169,110,0.04) 100%)',
          border: '1px solid rgba(201,169,110,0.25)',
          transition: 'clip-path 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease, transform 0.45s ease',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.88)',
        }}
      />

      {/* Inner glow */}
      <div
        className="absolute"
        style={{
          inset: 60,
          background: 'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)',
          transition: 'opacity 0.4s ease',
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Service text — centered in shape */}
      <div
        className="absolute text-center px-10"
        style={{
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.4s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-12px)',
        }}
      >
        <p
          className="font-sans uppercase mb-3"
          style={{ fontSize: 9, letterSpacing: '0.38em', color: 'rgba(201,169,110,0.65)' }}
        >
          We specialize in
        </p>
        <h3
          className="font-serif font-semibold text-white leading-tight"
          style={{ fontSize: 'clamp(1.2rem,2.2vw,1.6rem)', letterSpacing: '-0.01em' }}
        >
          {reduced ? SERVICES[0] : displayText}
        </h3>
      </div>

      {/* Progress indicator — dots below */}
      <div
        className="absolute flex gap-2 items-center justify-center"
        style={{ bottom: 12, left: '50%', transform: 'translateX(-50%)' }}
      >
        {SERVICES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i)
              setDisplayText(SERVICES[i])
              setPhase('in')
            }}
            className="transition-all duration-400"
            style={{
              width: i === current ? 20 : 5,
              height: 3,
              borderRadius: 2,
              background: i === current ? 'var(--gold-primary)' : 'rgba(201,169,110,0.2)',
              transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
              cursor: 'pointer',
              border: 'none',
              padding: 0,
            }}
            aria-label={`View ${SERVICES[i]}`}
          />
        ))}
      </div>
    </div>
  )
}

// ── Rating Badge — the star-rating redesigned ─────────────────────
function RatingBadge() {
  const [starred, setStarred] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) { setStarred(true); return }
    const t = setTimeout(() => setStarred(true), 900)
    return () => clearTimeout(t)
  }, [reduced])

  return (
    <div className="mb-10">
      {/* Stars + number row */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              aria-hidden="true"
              style={{
                width: 16,
                height: 16,
                color: 'var(--gold-primary)',
                fill: starred ? 'var(--gold-primary)' : 'transparent',
                transition: `fill 0.3s ease ${(n - 1) * 0.1}s`,
              }}
            />
          ))}
        </div>
        <span
          className="font-sans font-bold text-white"
          style={{ fontSize: 20, lineHeight: 1 }}
        >
          4.8
        </span>
        <span
          className="font-body italic"
          style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}
        >
          out of 5
        </span>
      </div>

      {/* Platform links */}
      <div className="flex items-center flex-wrap gap-x-1 gap-y-2">
        <span
          className="font-sans"
          style={{ fontSize: 11, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.4)' }}
        >
          Rated across
        </span>
        {REVIEW_PLATFORMS.map((p, i) => (
          <span key={p.name} className="flex items-center gap-1">
            {i > 0 && (
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>·</span>
            )}
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans group relative"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}
              aria-label={`${p.rating} stars on ${p.name}`}
            >
              <span className="group-hover:text-[var(--gold-primary)] transition-colors duration-200">
                {p.name}
              </span>
              {/* Underline trace */}
              <span
                className="absolute -bottom-0.5 left-0 h-px bg-[var(--gold-primary)] transition-all duration-300"
                style={{ width: 0 }}
                aria-hidden="true"
              />
            </a>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Scroll indicator — elegant line with traveling dot ───────────
function ScrollIndicator() {
  const reduced = useReducedMotion()
  return (
    <div
      className="absolute left-1/2 flex flex-col items-center gap-0"
      style={{ bottom: 28, transform: 'translateX(-50%)', zIndex: 3 }}
      aria-hidden="true"
    >
      <span
        className="font-sans uppercase mb-2"
        style={{ fontSize: 8, letterSpacing: '0.38em', color: 'rgba(201,169,110,0.45)' }}
      >
        Scroll
      </span>
      <div className="relative" style={{ width: 1, height: 52, overflow: 'hidden' }}>
        {/* Static line */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(201,169,110,0.0), rgba(201,169,110,0.3), rgba(201,169,110,0.0))' }}
        />
        {/* Traveling dot */}
        {!reduced && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 3,
              height: 3,
              borderRadius: '50%',
              background: 'var(--gold-primary)',
              animation: 'travelDown 1.8s ease-in-out infinite',
            }}
          />
        )}
      </div>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────
export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !titleRef.current) return
    const words = titleRef.current.querySelectorAll<HTMLElement>('.hero-word')
    words.forEach((w, i) => { w.style.animationDelay = `${0.2 + i * 0.1}s` })
  }, [reduced])

  const H1_WORDS = ["New York's", 'Trusted', 'Jeweler', 'Since', '1993']

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100svh' }}
      aria-label="Hero — Kathe's Jewelry"
    >
      {/* Background */}
      <Image
        src="/images/hero-store-interior.webp"
        alt="Kathe's Jewelry store interior — East Village NYC — warm display cases with gold and silver jewelry"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Layered overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(155deg, rgba(17,17,17,0.92) 0%, rgba(43,32,24,0.78) 38%, rgba(17,17,17,0.65) 68%, rgba(17,17,17,0.82) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Bottom-left gold bloom */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-5%',
          left: '-5%',
          width: '50%',
          height: '55%',
          background:
            'radial-gradient(ellipse at bottom left, rgba(201,169,110,0.12) 0%, transparent 65%)',
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
                style={{ fontSize: 10, letterSpacing: '0.46em', color: 'var(--gold-primary)' }}
              >
                Est. 1993 · East Village, New York
              </span>
            </div>

            {/* H1 */}
            <h1
              ref={titleRef}
              className="font-serif font-bold text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.6rem,5.5vw,5.2rem)' }}
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
                fontSize: 'clamp(15px,2vw,18px)',
                maxWidth: 480,
                color: 'rgba(255,255,255,0.78)',
              }}
            >
              From resizing a cherished heirloom to designing your perfect
              engagement ring, every piece that enters our East Village workshop
              is treated like it belongs to family.
            </p>

            {/* ── RATING BADGE — more prominent ── */}
            <RatingBadge />

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" href="/shop">
                Explore Our Jewelry
              </Button>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 font-sans font-semibold uppercase px-8 py-4 transition-all duration-300"
                style={{
                  fontSize: 12,
                  letterSpacing: '0.16em',
                  border: '1px solid rgba(255,255,255,0.35)',
                  color: 'rgba(255,255,255,0.85)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                Discover Our Services
              </Link>
            </div>
          </div>

          {/* RIGHT: Service showcase */}
          <div className="hidden lg:flex justify-center items-center">
            <ServiceShowcase />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  )
}
