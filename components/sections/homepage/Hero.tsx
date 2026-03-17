import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section
      className="relative overflow-hidden grain-overlay"
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

      {/* Layered overlays for warmth and depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, rgba(17,17,17,0.72) 0%, rgba(43,32,24,0.58) 50%, rgba(17,17,17,0.80) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Warm amber glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[60%] h-[40%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at bottom left, rgba(201,169,110,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center" style={{ zIndex: 2 }}>
        <div
          className="mx-auto w-full px-[var(--container-padding)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="max-w-[680px]">
            {/* Eyebrow with decorative lines */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="h-px w-8 bg-[var(--gold-primary)]"
                aria-hidden="true"
              />
              <span className="font-sans text-[10px] tracking-[5px] uppercase text-[var(--gold-primary)]">
                Est. 1993 · East Village, New York
              </span>
            </div>

            {/* H1 — editorial scale, tight leading */}
            <h1
              className="font-serif font-bold text-white leading-[1.05] mb-6 tracking-tight"
              style={{ fontSize: 'clamp(2.75rem, 6vw, 5.25rem)' }}
            >
              New York&apos;s Trusted
              <br />
              <em className="not-italic text-[var(--gold-light)]">Jeweler</em>{' '}
              Since 1993
            </h1>

            {/* Divider */}
            <div
              className="w-12 h-px bg-[var(--gold-primary)]/50 mb-6"
              aria-hidden="true"
            />

            {/* Subtext */}
            <p className="font-body text-[18px] text-white/75 leading-[1.8] max-w-[500px] mb-8">
              From resizing a cherished heirloom to designing your perfect
              engagement ring, every piece that enters our East Village workshop
              is treated like it belongs to family.
            </p>

            {/* Micro-trust line */}
            <div className="flex items-center gap-2 mb-10">
              <div className="flex items-center" aria-label="5 star rating">
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

            {/* CTA Row */}
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" href="/shop">
                Explore Our Jewelry
              </Button>

              {/* White ghost button — distinct from gold ghost */}
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2
                           font-sans font-semibold text-[12px] tracking-[2px] uppercase
                           border border-white/60 text-white/90 px-8 py-4
                           hover:border-white hover:text-white hover:bg-white/10
                           transition-all duration-200"
              >
                Discover Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — uses CSS class from globals.css */}
      <div
        className="absolute bottom-8 left-1/2 hero-scroll-indicator"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="font-sans text-[9px] tracking-[3px] uppercase text-[var(--gold-primary)]/70">
            Scroll
          </span>
          <ChevronDown className="w-5 h-5 text-[var(--gold-primary)]" />
        </div>
      </div>
    </section>
  )
}
