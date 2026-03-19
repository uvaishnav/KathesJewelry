'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

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

export function CategoryMosaic() {
  return (
    <section
      className="bg-[var(--dark-base)] py-[var(--section-padding)] px-[var(--container-padding)]"
      aria-label="Shop by category"
    >
      <div style={{ maxWidth: 'var(--max-width)' }} className="mx-auto">
        <SectionHeader
          eyebrow="Browse by Category"
          heading="Shop the Collection"
          subtext="Browse our collection — then call, visit, or message us to make any piece yours."
          align="center"
          theme="dark"
        />

        {/* Mosaic: desktop asymmetric, mobile stack */}
        <div className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:grid-rows-[320px_320px]">

          {/* Tile 1 — Left tall (row-span-2 on desktop) */}
          <TileLink
            tile={CATEGORIES[0]}
            className="lg:row-span-2 aspect-[3/4] lg:aspect-auto"
            priority
          />

          {/* Tile 2 — Top right */}
          <TileLink tile={CATEGORIES[1]} className="aspect-video lg:aspect-auto" />

          {/* Tile 3 — Bottom left (mobile) / Bottom right row 2 (desktop) */}
          <TileLink tile={CATEGORIES[2]} className="aspect-video lg:aspect-auto" />

        </div>

        {/* Tile 4 — Full-width below (both layouts) */}
        <div className="mt-3">
          <TileLink
            tile={CATEGORIES[3]}
            className="aspect-video lg:h-[220px] lg:aspect-auto w-full"
            wide
          />
        </div>
      </div>
    </section>
  )
}

function TileLink({
  tile,
  className = '',
  priority = false,
  wide = false,
}: {
  tile: CategoryTile
  className?: string
  priority?: boolean
  wide?: boolean
}) {
  return (
    <Link
      href={tile.href}
      className={`group card-shine relative overflow-hidden block ${className}`}
      aria-label={`Shop ${tile.name}`}
    >
      {/* Background Image */}
      <Image
        src={tile.image}
        alt={`${tile.name} — Kathe's Jewelry NYC`}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 ease-[var(--spring-ease)] group-hover:scale-105"
        sizes={
          wide
            ? '100vw'
            : '(max-width: 1024px) 100vw, 50vw'
        }
      />

      {/* Gradient overlay — bottom-heavy */}
      <div
        className="absolute inset-0 transition-opacity duration-300
                   group-hover:opacity-70"
        style={{
          background:
            'linear-gradient(to top, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.20) 55%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content — bottom aligned */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
        <div>
          <h3 className="font-serif text-[22px] font-bold text-white leading-tight mb-1">
            {tile.name}
          </h3>
          <span className="font-sans text-[10px] tracking-[3px] uppercase text-[var(--gold-primary)]">
            {tile.tagline}
          </span>
        </div>

        {/* Arrow icon — slides in on hover */}
        <div
          className="flex items-center justify-center w-10 h-10
                     border border-[var(--gold-primary)]/50
                     translate-x-2 opacity-0
                     group-hover:translate-x-0 group-hover:opacity-100
                     transition-all duration-300 ease-[var(--spring-ease)]
                     shrink-0"
          aria-hidden="true"
        >
          <ArrowUpRight className="w-4 h-4 text-[var(--gold-primary)]" />
        </div>
      </div>
    </Link>
  )
}
