'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/Button'

const SERVICES = [
  { label: 'Expert Jewelry Repair', short: 'Repairs' },
  { label: 'Custom Engagement Rings', short: 'Custom Design' },
  { label: 'We Buy Gold & Silver', short: 'Gold Buying' },
  { label: 'Fine Estate Jewelry', short: 'Estate Pieces' },
  { label: 'Watch Repair', short: 'Watches' },
]

// Each service gets a different geometric clip-path
const SHAPES = [
  'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', // octagon
  'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',                                       // diamond
  'polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)',                    // wide hex
  'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',                            // pentagon
  'polygon(50% 0%, 80% 15%, 100% 45%, 80% 85%, 50% 100%, 20% 85%, 0% 45%, 20% 15%)', // gem
]

const REVIEW_PLATFORMS = [
  { name: 'Google',        url: 'https://www.google.com/search?q=Kathe%27s+Jewelry+New+York+reviews' },
  { name: 'Yelp',          url: 'https://www.yelp.com/biz/kathes-jewelry-new-york' },
  { name: 'TrustAnalytica', url: 'https://jewelry-store.trustanalytica.org/us/ny/new-york/reviews/kathe-s-jewelry' },
]

// ── Service Showcase ──────────────────────────────────────────────
function ServiceShowcase() {
  const [current, setCurrent] = useState(0)
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('hold') // start held so content shows immediately
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    let t: ReturnType<typeof setTimeout>
    if (phase === 'in') {
      t = setTimeout(() => setPhase('hold'), 350)
    } else if (phase === 'hold') {
      t = setTimeout(() => setPhase('out'), 3000)
    } else {
      t = setTimeout(() => {
        setCurrent((c) => (c + 1) % SERVICES.length)
        setPhase('in')
      }, 450)
    }
    return () => clearTimeout(t)
  }, [phase, reduced])

  const isIn = phase !== 'out'
  const shape = SHAPES[current]

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 360, height: 360 }}
      aria-hidden="true"
    >
      {/* Rotating outer ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: '1px solid rgba(201,169,110,0.18)',
          animation: reduced ? 'none' : 'slowSpin 20s linear infinite',
        }}
      />
      {/* Counter-rotating dashed ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: 24,
          border: '1px dashed rgba(201,169,110,0.10)',
          animation: reduced ? 'none' : 'slowSpin 28s linear infinite reverse',
        }}
      />

      {/* Ring dots */}
      {[0, 72, 144, 216, 288].map((deg) => (
        <div
          key={deg}
          className="absolute rounded-full"
          style={{
            width: 5,
            height: 5,
            background: 'rgba(201,169,110,0.45)',
            top: '50%',
            left: '50%',
            transform: `translate(-50%,-50%) rotate(${deg}deg) translateY(-178px)`,
          }}
        />
      ))}

      {/* Morphing geometric shape */}
      <div
        className="absolute"
        style={{
          inset: 50,
          clipPath: shape,
          background: 'linear-gradient(135deg, rgba(201,169,110,0.15) 0%, rgba(201,169,110,0.04) 100%)',
          border: '1px solid rgba(201,169,110,0.28)',
          opacity: isIn ? 1 : 0,
          transform: isIn ? 'scale(1)' : 'scale(0.86)',
          transition: 'clip-path 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease, transform 0.45s ease',
        }}
      />

      {/* Inner radial glow */}
      <div
        className="absolute"
        style={{
          inset: 68,
          background: 'radial-gradient(circle, rgba(201,169,110,0.10) 0%, transparent 68%)',
          opacity: isIn ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Service text — always inside the shape */}
      <div
        className="absolute text-center"
        style={{
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 56px',
          opacity: isIn ? 1 : 0,
          transform: isIn ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'opacity 0.38s ease, transform 0.42s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <p
          className="font-sans uppercase mb-3"
          style={{ fontSize: 9, letterSpacing: '0.4em', color: 'rgba(201,169,110,0.6)' }}
        >
          We specialize in
        </p>
        <h3
          className="font-serif font-semibold text-white"
          style={{
            fontSize: 'clamp(1.2rem, 2.4vw, 1.65rem)',
            letterSpacing: '-0.01em',
            lineHeight: 1.25,
            textAlign: 'center',
          }}
        >
          {reduced ? SERVICES[0].label : SERVICES[current].label}
        </h3>
      </div>

      {/* Progress dots at bottom */}
      <div
        className="absolute flex gap-2 items-center justify-center"
        style={{ bottom: 18, left: '50%', transform: 'translateX(-50%)' }}
      >
        {SERVICES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setPhase('hold') }}
            style={{
              width: i === current ? 20 : 5,
              height: 4,
              borderRadius: 2,
              background: i === current ? 'var(--gold-primary)' : 'rgba(201,169,110,0.22)',
              transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
            aria-label={`View ${SERVICES[i].label}`}
          />
        ))}
      </div>
    </div>
  )
}

// ── Rating Badge — prominent, staggered star fill ──────────────────
function RatingBadge() {
  const [filledCount, setFilledCount] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) { setFilledCount(5); return }
    // stagger star fills after 600ms
    let i = 0
    const interval = setInterval(() => {
      i++
      setFilledCount(i)
      if (i >= 5) clearInterval(interval)
    }, 100)
    const start = setTimeout(() => {
      clearInterval(interval)
      setFilledCount(5)
    }, 150)
    const delay = setTimeout(() => {
      i = 0
      setFilledCount(0)
      const fill = setInterval(() => {
        i++
        setFilledCount(i)
        if (i >= 5) clearInterval(fill)
      }, 100)
    }, 600)
    return () => { clearInterval(interval); clearTimeout(start); clearTimeout(delay) }
  }, [reduced])

  return (
    <div className="mb-10">
      {/* Stars row */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-[3px]">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              aria-hidden="true"
              style={{
                width: 17,
                height: 17,
                color: 'var(--gold-primary)',
                fill: n <= filledCount ? 'var(--gold-primary)' : 'transparent',
                transition: 'fill 0.2s ease',
              }}
            />
          ))}
        </div>
        <span
          className="font-sans font-bold text-white"
          style={{ fontSize: 22, lineHeight: 1, letterSpacing: '-0.02em' }}
        >
          4.8
        </span>
        <span
          className="font-body italic"
          style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}
        >
          out of 5
        </span>
      </div>

      {/* Platform links */}
      <div className="flex items-center flex-wrap gap-x-1 gap-y-1">
        <span
          className="font-sans"
          style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.04em' }}
        >
          Rated on
        </span>
        {REVIEW_PLATFORMS.map((p, i) => (
          <span key={p.name} className="flex items-center gap-1">
            {i > 0 && (
              <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: 11 }}> · </span>
            )}
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans group relative inline-block"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.72)', textDecoration: 'none' }}
              aria-label={`Read our reviews on ${p.name}`}
            >
              <span
                style={{ transition: 'color 0.2s ease' }}
                className="group-hover:text-[var(--gold-primary)]"
              >
                {p.name}
              </span>
            </a>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Elegant traveling-dot scroll indicator ─────────────────────────
function ScrollIndicator() {
  const reduced = useReducedMotion()
  return (
    <div
      className="absolute left-1/2 flex flex-col items-center"
      style={{ bottom: 32, transform: 'translateX(-50%)', zIndex: 3 }}
      aria-hidden="true"
    >
      <span
        className="font-sans uppercase mb-2"
        style={{ fontSize: 8, letterSpacing: '0.38em', color: 'rgba(201,169,110,0.4)' }}
      >
        Scroll
      </span>
      <div className="relative" style={{ width: 1, height: 52, background: 'rgba(201,169,110,0.15)' }}>
        {!reduced && (
          <div
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              background: 'var(--gold-primary)',
              left: '50%',
              transform: 'translateX(-50%)',
              top: 0,
              animation: 'travelDown 2s ease-in-out infinite',
            }}
          />
        )}
      </div>
    </div>
  )
}

// ── Hero ───────────────────────────────────────────────────────────
export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !titleRef.current) return
    const words = titleRef.current.querySelectorAll<HTMLElement>('.hero-word')
    words.forEach((w, i) => { w.style.animationDelay = `${0.2 + i * 0.12}s` })
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
        alt="Kathe's Jewelry store interior — warm display cases with gold and silver jewelry, East Village NYC"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Multi-layer overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(158deg, rgba(17,17,17,0.92) 0%, rgba(43,32,24,0.76) 36%, rgba(17,17,17,0.62) 66%, rgba(17,17,17,0.84) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Bottom-left gold bloom */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%',
          left: '-8%',
          width: '55%',
          height: '60%',
          background: 'radial-gradient(ellipse at bottom left, rgba(201,169,110,0.14) 0%, transparent 62%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="absolute inset-0 flex items-center"
        style={{ zIndex: 2, paddingTop: '5rem' }}
      >
        <div
          className="mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ maxWidth: 'var(--max-width)', padding: '0 var(--container-padding)' }}
        >
          {/* LEFT */}
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

            {/* H1 with word-by-word entrance */}
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
              className="font-body leading-[1.82] mb-8"
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

            {/* Rating — prominent */}
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
                  border: '1px solid rgba(255,255,255,0.32)',
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                Discover Our Services
              </Link>
            </div>
          </div>

          {/* RIGHT: Service showcase — hidden on mobile */}
          <div className="hidden lg:flex justify-center items-center">
            <ServiceShowcase />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
