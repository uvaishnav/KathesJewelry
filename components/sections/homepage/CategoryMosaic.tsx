'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ArrowUpRight } from 'lucide-react'

interface CategoryTile {
  name: string
  tagline: string
  href: string
  image: string
  count?: string
}

const CATEGORIES: CategoryTile[] = [
  {
    name: "Women's Jewelry",
    tagline: 'Rings · Necklaces · Bracelets',
    href: "/shop?category=Women%27s",
    image: '/images/category-womens.webp',
    count: 'Explore →',
  },
  {
    name: 'Rings',
    tagline: 'For Every Occasion',
    href: '/shop?category=Rings',
    image: '/images/category-rings.webp',
    count: 'Explore →',
  },
  {
    name: "Men's Collection",
    tagline: 'Refined. Bold. Lasting.',
    href: "/shop?category=Men%27s",
    image: '/images/category-mens.webp',
    count: 'Explore →',
  },
  {
    name: 'Necklaces',
    tagline: 'Pendants & Chains',
    href: '/shop?category=Necklaces',
    image: '/images/category-necklaces.webp',
    count: 'Explore →',
  },
]

// Hook: 3D tilt effect based on mouse position
function useTilt(strength = 10) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `perspective(900px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) scale3d(1.025,1.025,1.025)`
    },
    [strength]
  )

  const handleLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform =
      'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
  }, [])

  return { ref, handleMove, handleLeave }
}

function ExpandingCard({
  tile,
  index,
  isActive,
  onHover,
  onLeave,
  priority,
}: {
  tile: CategoryTile
  index: number
  isActive: boolean
  onHover: (i: number) => void
  onLeave: () => void
  priority?: boolean
}) {
  const { ref, handleMove, handleLeave } = useTilt(8)

  const onMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      handleLeave()
      onLeave()
    },
    [handleLeave, onLeave]
  )

  return (
    <Link
      ref={ref}
      href={tile.href}
      onMouseEnter={() => onHover(index)}
      onMouseMove={handleMove}
      onMouseLeave={onMouseLeave}
      className="expanding-card relative overflow-hidden block"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
        willChange: 'transform',
      }}
      aria-label={`Shop ${tile.name}`}
    >
      {/* Image */}
      <Image
        src={tile.image}
        alt={`${tile.name} — Kathe's Jewelry NYC`}
        fill
        priority={priority}
        className="object-cover"
        style={{
          transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          transform: isActive ? 'scale(1.06)' : 'scale(1.0)',
        }}
        sizes="(max-width: 768px) 100vw, 25vw"
      />

      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(17,17,17,0.92) 0%, rgba(17,17,17,0.4) 45%, rgba(17,17,17,0.1) 100%)',
          transition: 'opacity 0.4s ease',
          opacity: isActive ? 0.75 : 1,
        }}
        aria-hidden="true"
      />

      {/* Gold border trace — appears on hover */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          border: '1px solid rgba(201,169,110,0)',
          transition: 'border-color 0.4s ease',
          ...(isActive ? { borderColor: 'rgba(201,169,110,0.4)' } : {}),
        }}
        aria-hidden="true"
      />

      {/* Top-left corner accent */}
      <div
        className="absolute top-0 left-0 pointer-events-none overflow-hidden"
        style={{ width: 40, height: 40 }}
        aria-hidden="true"
      >
        <span
          className="absolute top-0 left-0 border-t border-l border-[var(--gold-primary)]"
          style={{
            width: isActive ? 28 : 0,
            height: isActive ? 28 : 0,
            transition: 'width 0.4s ease, height 0.4s ease',
          }}
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Number */}
        <span
          className="block font-sans mb-3"
          style={{
            fontSize: 10,
            letterSpacing: '0.3em',
            color: 'rgba(201,169,110,0.6)',
            transform: isActive ? 'translateY(0)' : 'translateY(4px)',
            opacity: isActive ? 1 : 0,
            transition: 'transform 0.35s ease, opacity 0.35s ease',
          }}
        >
          0{index + 1}
        </span>

        {/* Name */}
        <h3
          className="font-serif font-bold text-white leading-tight mb-1"
          style={{
            fontSize: isActive ? 'clamp(1.4rem,2vw,1.8rem)' : 'clamp(1.1rem,1.6vw,1.4rem)',
            transition: 'font-size 0.4s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {tile.name}
        </h3>

        {/* Tagline */}
        <span
          className="font-sans uppercase"
          style={{
            fontSize: 9,
            letterSpacing: '0.22em',
            color: 'var(--gold-primary)',
            display: 'block',
            marginBottom: isActive ? 16 : 0,
            transition: 'margin-bottom 0.3s ease',
          }}
        >
          {tile.tagline}
        </span>

        {/* Arrow — slides in */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            overflow: 'hidden',
            maxHeight: isActive ? 32 : 0,
            opacity: isActive ? 1 : 0,
            transition: 'max-height 0.35s ease, opacity 0.3s ease',
          }}
        >
          <span
            className="font-sans uppercase"
            style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.8)' }}
          >
            Explore
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[var(--gold-primary)]" aria-hidden="true" />
        </div>
      </div>
    </Link>
  )
}

export function CategoryMosaic() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <section
      className="bg-[var(--dark-base)] py-[var(--section-padding)] px-[var(--container-padding)]"
      aria-label="Shop by category"
    >
      <div style={{ maxWidth: 'var(--max-width)' }} className="mx-auto">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Browse by Category"
            heading="Shop the Collection"
            subtext="Browse our collection — then call, visit, or message us to make any piece yours."
            align="center"
            theme="dark"
          />
        </ScrollReveal>

        {/* ── DESKTOP: horizontal expanding strip ── */}
        <div
          className="hidden lg:flex mt-14 overflow-hidden"
          style={{ height: 540, gap: 3 }}
          onMouseLeave={() => setActiveCard(null)}
        >
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.name}
              className="relative overflow-hidden"
              style={{
                flex: activeCard === i ? '2.2' : activeCard !== null ? '0.75' : '1',
                transition: 'flex 0.55s cubic-bezier(0.22,1,0.36,1)',
                minWidth: 80,
              }}
            >
              <ExpandingCard
                tile={cat}
                index={i}
                isActive={activeCard === i}
                onHover={setActiveCard}
                onLeave={() => {}}
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* ── TABLET: 2×2 grid ── */}
        <div className="hidden md:grid lg:hidden mt-12 grid-cols-2 gap-3" style={{ height: 600 }}>
          {CATEGORIES.map((cat, i) => (
            <div key={cat.name} className="relative overflow-hidden">
              <ExpandingCard
                tile={cat}
                index={i}
                isActive={false}
                onHover={() => {}}
                onLeave={() => {}}
                priority={i < 2}
              />
            </div>
          ))}
        </div>

        {/* ── MOBILE: vertical stack ── */}
        <div className="md:hidden mt-10 space-y-3">
          {CATEGORIES.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 0.08}>
              <div className="relative overflow-hidden" style={{ height: 240 }}>
                <ExpandingCard
                  tile={cat}
                  index={i}
                  isActive={false}
                  onHover={() => {}}
                  onLeave={() => {}}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <ScrollReveal delay={0.2}>
          <div
            className="mt-8 p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(201,169,110,0.12)',
            }}
          >
            <div>
              <p
                className="font-serif text-white"
                style={{ fontSize: 18, fontWeight: 500 }}
              >
                Not sure where to start?
              </p>
              <p
                className="font-body"
                style={{ fontSize: 14, color: 'var(--text-muted)' }}
              >
                Tell us what you're looking for and we'll find it for you.
              </p>
            </div>
            <Link
              href="/contact-us"
              className="flex-shrink-0 font-sans uppercase transition-all duration-200 px-6 py-3 border border-[var(--gold-primary)]/50 text-[var(--gold-primary)] hover:bg-[var(--gold-primary)] hover:text-[#111]"
              style={{ fontSize: 11, letterSpacing: '0.2em' }}
            >
              Contact Us
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
