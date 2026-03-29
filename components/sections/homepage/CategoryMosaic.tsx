'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FadeOnScroll } from '@/components/ui/ScrollReveal'
import { ArrowUpRight } from 'lucide-react'

interface CategoryTile {
  name: string
  tagline: string
  href: string
  image: string
}

const CATEGORIES: CategoryTile[] = [
  {
    name: "Women's Jewelry",
    tagline: 'Rings · Necklaces · Bracelets',
    href: "/shop?category=Women%27s",
    image: '/images/category-womens.webp',
  },
  {
    name: 'Rings',
    tagline: 'For Every Occasion',
    href: '/shop?category=Rings',
    image: '/images/category-rings.webp',
  },
  {
    name: "Men's Collection",
    tagline: 'Refined. Bold. Lasting.',
    href: "/shop?category=Men%27s",
    image: '/images/category-mens.webp',
  },
  {
    name: 'Necklaces',
    tagline: 'Pendants & Chains',
    href: '/shop?category=Necklaces',
    image: '/images/category-necklaces.webp',
  },
]

/**
 * CategoryCard — individual expanding tile.
 * Tilt effect uses onMouseMove on a wrapper div (not ref on Link).
 */
function CategoryCard({
  tile,
  index,
  isActive,
  onHover,
  priority,
}: {
  tile: CategoryTile
  index: number
  isActive: boolean
  onHover: (i: number | null) => void
  priority?: boolean
}) {
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10
      el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02,1.02,1.02)`
    },
    []
  )

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform =
      'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
    onHover(null)
  }, [onHover])

  return (
    <div
      onMouseEnter={() => onHover(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
        willChange: 'transform',
        height: '100%',
        position: 'relative',
      }}
    >
      <Link
        href={tile.href}
        className="block relative overflow-hidden h-full"
        aria-label={`Shop ${tile.name}`}
        style={{ textDecoration: 'none' }}
      >
        {/* Background image */}
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
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Base dark gradient — always present, lightens on hover */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(17,17,17,0.88) 0%, rgba(17,17,17,0.35) 55%, rgba(17,17,17,0.08) 100%)',
            opacity: isActive ? 0.75 : 1,
            transition: 'opacity 0.4s ease',
          }}
          aria-hidden="true"
        />

        {/* Gold border trace on hover */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            border: isActive ? '1px solid rgba(201,169,110,0.45)' : '1px solid transparent',
            transition: 'border-color 0.4s ease',
          }}
          aria-hidden="true"
        />

        {/* Top-left corner bracket */}
        <div
          className="absolute pointer-events-none"
          style={{ top: 0, left: 0, width: 32, height: 32 }}
          aria-hidden="true"
        >
          <div
            className="absolute border-t border-l border-[var(--gold-primary)]"
            style={{
              top: 0,
              left: 0,
              width: isActive ? 28 : 0,
              height: isActive ? 28 : 0,
              transition: 'width 0.4s ease, height 0.4s ease',
            }}
          />
        </div>

        {/* Content — always visible, animates on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* Index number */}
          <span
            className="block font-sans mb-2"
            style={{
              fontSize: 10,
              letterSpacing: '0.3em',
              color: 'rgba(201,169,110,0.65)',
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'translateY(0)' : 'translateY(4px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            0{index + 1}
          </span>

          {/* Category name — always visible */}
          <h3
            className="font-serif font-bold text-white leading-tight mb-1"
            style={{
              fontSize: 'clamp(1.25rem, 2.2vw, 1.65rem)',
            }}
          >
            {tile.name}
          </h3>

          {/* Tagline — always visible */}
          <span
            className="font-sans uppercase block"
            style={{
              fontSize: 9,
              letterSpacing: '0.22em',
              color: 'var(--gold-primary)',
            }}
          >
            {tile.tagline}
          </span>

          {/* Explore arrow — slides in on hover */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginTop: isActive ? 12 : 0,
              maxHeight: isActive ? 28 : 0,
              opacity: isActive ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.35s ease, opacity 0.3s ease, margin-top 0.3s ease',
            }}
          >
            <span
              className="font-sans uppercase"
              style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.85)' }}
            >
              Explore
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--gold-primary)]" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </div>
  )
}

export function CategoryMosaic() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <section
      className="py-[var(--section-padding)] px-[var(--container-padding)]"
      style={{
        backgroundColor: 'var(--dark-base)',
        backgroundImage: [
          'radial-gradient(ellipse at 8% 90%, rgba(201,169,110,0.06) 0%, transparent 48%)',
          'radial-gradient(ellipse at 92% 8%, rgba(201,169,110,0.04) 0%, transparent 45%)',
        ].join(', '),
      }}
      aria-label="Shop by category"
    >
      <div style={{ maxWidth: 'var(--max-width)' }} className="mx-auto">

        {/* Section header — uses FadeOnScroll (reliable) */}
        <FadeOnScroll>
          <SectionHeader
            eyebrow="Browse by Category"
            heading="Shop the Collection"
            subtext="Browse our collection — then call, visit, or message us to make any piece yours."
            align="center"
            theme="dark"
          />
        </FadeOnScroll>

        {/* ── DESKTOP: horizontal expanding strip ── */}
        <div
          className="hidden lg:flex mt-14 overflow-hidden"
          style={{ height: 540, gap: 3 }}
        >
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.name}
              style={{
                flex: activeCard === i ? 2.4 : activeCard !== null ? 0.75 : 1,
                transition: 'flex 0.55s cubic-bezier(0.22,1,0.36,1)',
                minWidth: 72,
                position: 'relative',
              }}
            >
              <CategoryCard
                tile={cat}
                index={i}
                isActive={activeCard === i}
                onHover={setActiveCard}
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* ── TABLET: 2×2 grid ── */}
        <div
          className="hidden md:grid lg:hidden mt-12 grid-cols-2 gap-3"
          style={{ height: 560 }}
        >
          {CATEGORIES.map((cat, i) => (
            <div key={cat.name} style={{ position: 'relative' }}>
              <CategoryCard
                tile={cat}
                index={i}
                isActive={false}
                onHover={() => {}}
                priority={i < 2}
              />
            </div>
          ))}
        </div>

        {/* ── MOBILE: stacked ── */}
        <div className="md:hidden mt-10 space-y-3">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.name}
              style={{
                height: 220,
                position: 'relative',
                animation: 'serviceRowIn 0.55s cubic-bezier(0.22,1,0.36,1) both',
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <CategoryCard
                tile={cat}
                index={i}
                isActive={false}
                onHover={() => {}}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeOnScroll delay={0.15}>
          <div
            className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(201,169,110,0.12)',
            }}
          >
            <div>
              <p className="font-serif text-white" style={{ fontSize: 18, fontWeight: 500 }}>
                Not sure where to start?
              </p>
              <p className="font-body" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                Tell us what you&apos;re looking for and we&apos;ll find it for you.
              </p>
            </div>
            <Link
              href="/contact-us"
              className="flex-shrink-0 font-sans uppercase transition-all duration-200 px-6 py-3"
              style={{
                fontSize: 11,
                letterSpacing: '0.2em',
                border: '1px solid rgba(201,169,110,0.45)',
                color: 'var(--gold-primary)',
              }}
            >
              Contact Us
            </Link>
          </div>
        </FadeOnScroll>
      </div>
    </section>
  )
}
