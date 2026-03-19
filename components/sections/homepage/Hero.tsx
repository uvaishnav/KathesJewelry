'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Star, ExternalLink } from 'lucide-react'
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

// ── Typewriter with icon swap ──────────────────────────────────
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
      {/* Icon area — fades between services */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 160,
          height: 160,
          opacity: iconVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        {/* Ambient glow behind icon */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)',
          }}
        />
        {/* Slow orbit ring */}
        <div
          className="absolute rounded-full border border-[rgba(201,169,110,0.18)]"
          style={{
            width: 148,
            height: 148,
            animation: 'spin 20s linear infinite',
          }}
        />
        {/* Second orbit — counter */}
        <div
          className="absolute rounded-full border border-dashed border-[rgba(201,169,110,0.10)]"
          style={{
            width: 120,
            height: 120,
            animation: 'spin 14s linear infinite reverse',
          }}
        />
        {/* The icon */}
        <Icon isActive={iconVisible} size={80} />
      </div>

      {/* Service name typewriter */}
      <div className="text-center">
        <p
          className="font-sans text-[9px] tracking-[5px] uppercase mb-3"
          style={{ color: 'rgba(201,169,110,0.5)' }}
        >
          We specialize in
        </p>
        <div className="flex items-center justify-center gap-2 min-h-[28px]">
          <span
            className="font-sans uppercase tracking-[3px]"
            style={{
              fontSize: 13,
              color: 'var(--gold-primary)',
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
                height: 16,
                background: 'var(--gold-primary)',
                animation: 'pulse 0.8s ease-in-out infinite',
                borderRadius: 1,
              }}
            />
          )}
        </div>
        {/* Service index dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {SERVICES.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === current ? 16 : 4,
                height: 4,
                borderRadius: 2,
                background: i === current ? 'var(--gold-primary)' : 'rgba(201,169,110,0.25)',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Review trust badge ──────────────────────────────────────────
function TrustBadge() {
  return (
    <a
      href="https://www.yelp.com/biz/kathes-jewelry-new-york"
      target="_blank"
      rel="noopener noreferrer"
      className="trust-badge-pulse group inline-flex items-center gap-3 px-5 py-3 border border-[rgba(201,169,110,0.4)] hover:border-[var(--gold-primary)] transition-all duration-300"
      aria-label="4.8 stars on Yelp, Google and TrustAnalytica — read our reviews"
      style={{
        background: 'rgba(201,169,110,0.06)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="fill-[var(--gold-primary)] text-[var(--gold-primary)]"
            style={{ width: 14, height: 14 }}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-[rgba(201,169,110,0.4)]" aria-hidden="true" />

      {/* Text */}
      <div className="flex flex-col">
        <span className="font-sans font-bold text-white" style={{ fontSize: 15, lineHeight: 1.1 }}>
          4.8 Stars
        </span>
        <span
          className="font-sans uppercase tracking-widest"
          style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)' }}
        >
          Google · Yelp · TrustAnalytica
        </span>
      </div>

      {/* External link icon */}
      <ExternalLink
        className="text-[var(--gold-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ width: 12, height: 12 }}
        aria-hidden="true"
      />
    </a>
  )
}

// ── Hero section ───────────────────────────────────────────────
export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()

  // Staggered word entrance
  useEffect(() => {
    if (reduced || !titleRef.current) return
    const words = titleRef.current.querySelectorAll('.hero-word')
    words.forEach((w, i) => {
      ;(w as HTMLElement).style.animationDelay = `${0.2 + i * 0.1}s`
    })
  }, [reduced])

  const H1_WORDS = ["New", "York's", "Trusted", "Jeweler", "Since", "1993"]

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

      {/* Richer layered overlays — more depth, store visible but text readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(155deg, rgba(17,17,17,0.88) 0%, rgba(43,32,24,0.72) 40%, rgba(17,17,17,0.65) 70%, rgba(17,17,17,0.75) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Warm amber glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: '55%',
          height: '50%',
          background: 'radial-gradient(ellipse at bottom left, rgba(201,169,110,0.16) 0%, transparent 68%)',
        }}
        aria-hidden="true"
      />
      {/* Top vignette */}
      <div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(17,17,17,0.6) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content — pt accounts for navbar height on homepage (h-20 transparent) */}
      <div
        className="absolute inset-0 flex items-center"
        style={{ zIndex: 2, paddingTop: '5rem' }}
      >
        <div
          className="mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          style={{
            maxWidth: 'var(--max-width)',
            padding: '0 var(--container-padding)',
          }}
        >
          {/* ── LEFT: Copy ── */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="h-px bg-[var(--gold-primary)]"
                style={{ width: 32 }}
                aria-hidden="true"
              />
              <span
                className="font-sans uppercase"
                style={{ fontSize: 10, letterSpacing: '0.4em', color: 'var(--gold-primary)' }}
              >
                Est. 1993 · East Village, New York
              </span>
            </div>

            {/* H1 — word-by-word staggered entrance */}
            <h1
              ref={titleRef}
              className="font-serif font-bold text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5.2rem)' }}
            >
              {H1_WORDS.map((word, i) => {
                // "Jeweler" gets the gold color
                const isGold = word === 'Jeweler'
                return (
                  <span key={i}>
                    <span
                      className={`hero-word ${reduced ? '' : 'opacity-0'}`}
                      style={{
                        color: isGold ? 'var(--gold-light)' : 'white',
                        fontStyle: isGold ? 'normal' : 'normal',
                      }}
                    >
                      {word}
                    </span>
                    {i < H1_WORDS.length - 1 ? ' ' : ''}
                  </span>
                )
              })}
            </h1>

            {/* Gold divider */}
            <div
              className="bg-[var(--gold-primary)] mb-6"
              style={{ width: 48, height: 1, opacity: 0.5 }}
              aria-hidden="true"
            />

            {/* Sub-headline — larger, more weight */}
            <p
              className="font-body text-white leading-[1.75] mb-6"
              style={{
                fontSize: 'clamp(16px, 2vw, 18px)',
                maxWidth: 480,
                opacity: 0.82,
              }}
            >
              From resizing a cherished heirloom to designing your perfect
              engagement ring, every piece that enters our East Village workshop
              is treated like it belongs to family.
            </p>

            {/* ★ Trust badge — clickable, prominent, pulsing */}
            <div className="mb-10">
              <TrustBadge />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" href="/shop" className="btn-shimmer">
                Explore Our Jewelry
              </Button>
              <Link
                href="/services"
                className="btn-shimmer inline-flex items-center justify-center gap-2 font-sans font-semibold uppercase border px-8 py-4 transition-all duration-200"
                style={{
                  fontSize: 12,
                  letterSpacing: '0.15em',
                  borderColor: 'rgba(255,255,255,0.5)',
                  color: 'rgba(255,255,255,0.88)',
                }}
              >
                Discover Our Services
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Service icon showcase ── */}
          <div className="hidden lg:flex justify-center items-center">
            <ServiceShowcase />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll-indicator absolute left-1/2 flex flex-col items-center gap-1"
        style={{ bottom: 32, zIndex: 3 }}
        aria-hidden="true"
      >
        <span
          className="font-sans uppercase"
          style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(201,169,110,0.6)' }}
        >
          Scroll
        </span>
        <ChevronDown
          style={{ width: 20, height: 20, color: 'var(--gold-primary)' }}
        />
      </div>
    </section>
  )
}
