'use client'

import { SectionHeader } from '@/components/ui/SectionHeader'
import { StarRating } from '@/components/ui/StarRating'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Button } from '@/components/ui/Button'
import type { Testimonial } from '@/components/ui/TestimonialCard'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

// ── Featured large quote (center) ────────────────────────────
function FeaturedQuote({ t }: { t: Testimonial }) {
  return (
    <div className="relative flex flex-col justify-between p-8 md:p-10 bg-[var(--dark-card)] border border-[var(--gold-primary)]/20 h-full">
      {/* Decorative open-quote */}
      <span
        className="absolute top-4 left-6 font-serif leading-none select-none pointer-events-none"
        style={{ fontSize: '7rem', color: 'rgba(201,169,110,0.10)' }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <div className="relative z-10">
        {/* Stars */}
        <StarRating rating={5} size="md" />

        {/* Quote — larger, more editorial */}
        <blockquote
          className="font-serif italic leading-[1.75] text-white mt-5 mb-6"
          style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)' }}
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>
      </div>

      {/* Reviewer footer */}
      <div className="flex items-center justify-between gap-4 pt-5 border-t border-[var(--gold-primary)]/15 relative z-10">
        <div>
          <p className="font-sans text-[11px] tracking-[2px] uppercase text-[var(--gold-primary)] mb-0.5">
            {t.reviewer}
          </p>
          <p className="font-body text-[12px] text-[var(--text-muted)] italic">Verified Customer</p>
        </div>
        {t.sourceURL && (
          <a
            href={t.sourceURL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[10px] tracking-[1.5px] uppercase text-[var(--text-muted)]
                       hover:text-[var(--gold-primary)] transition-colors duration-200 shrink-0"
          >
            {t.platform} →
          </a>
        )}
      </div>
    </div>
  )
}

// ── Side compact card ─────────────────────────────────────────
function SideCard({ t, side }: { t: Testimonial; side: 'left' | 'right' }) {
  return (
    <div className={`relative flex flex-col justify-between p-6 md:p-7 bg-[var(--dark-card)] h-full border-${side === 'left' ? 'r' : 'l'} border-[var(--gold-primary)]/10`}>
      {/* Gold accent dot */}
      <div className="w-6 h-[2px] bg-[var(--gold-primary)]/60 mb-4" aria-hidden="true" />

      <div className="flex-1">
        <StarRating rating={5} size="sm" />
        <blockquote className="font-serif italic text-[15px] text-white/80 leading-[1.7] mt-3 mb-4">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
      </div>

      <div className="pt-4 border-t border-white/5">
        <p className="font-sans text-[10px] tracking-[2px] uppercase text-[var(--gold-primary)]">
          {t.reviewer}
        </p>
        {t.sourceURL && (
          <a
            href={t.sourceURL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[12px] text-[var(--text-muted)] hover:text-[var(--gold-primary)] transition-colors mt-0.5 block"
          >
            {t.platform} Review →
          </a>
        )}
      </div>
    </div>
  )
}

// ── Skeleton ──────────────────────────────────────────────────
function Skeleton({ featured }: { featured?: boolean }) {
  return (
    <div className={`bg-[var(--dark-card)] border border-white/5 animate-pulse h-full p-${featured ? '10' : '7'}`}>
      <div className="h-4 bg-white/10 rounded w-1/4 mb-6" />
      <div className="space-y-2.5 mb-6">
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-[88%]" />
        <div className="h-3 bg-white/10 rounded w-[72%]" />
        {featured && <div className="h-3 bg-white/10 rounded w-[60%]" />}
      </div>
      <div className="h-px bg-white/5 mb-4" />
      <div className="h-3 bg-white/10 rounded w-1/3" />
    </div>
  )
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const has = testimonials && testimonials.length > 0

  // ─── 3-column layout ──
  // [ side card ] [ FEATURED — tall ] [ side card ]
  // On mobile: stack vertically
  const [left, center, right] = has ? testimonials : []

  return (
    <section
      className="bg-[var(--dark-base)] py-[var(--section-padding)] px-[var(--container-padding)] relative overflow-hidden"
      data-section="dark"
      aria-label="Customer testimonials"
    >
      {/* Atmospheric background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,169,110,0.05) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div style={{ maxWidth: 'var(--max-width)' }} className="mx-auto relative z-10">
        <SectionHeader
          eyebrow="Real New Yorkers. Real Experiences."
          heading="Don't Take Our Word For It."
          subtext="Over 30 years of five-star moments — read what our customers say."
          align="center"
          theme="dark"
        />

        {/* Aggregate rating */}
        <div className="flex flex-col items-center gap-2 mb-14 -mt-10">
          <StarRating rating={5} size="md" />
          <p className="font-sans text-[11px] tracking-[2px] uppercase text-[var(--text-muted)]">
            4.8 out of 5 &nbsp;·&nbsp; Google · Yelp · TrustAnalytica
          </p>
        </div>

        {/* 3-column grid — equal height via grid rows */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1fr] gap-px bg-[var(--gold-primary)]/10">
          {has ? (
            <>
              {/* Left side card */}
              <ScrollReveal delay={0} direction="left">
                <SideCard t={left} side="left" />
              </ScrollReveal>

              {/* Center featured */}
              <ScrollReveal delay={0.1} direction="scale">
                <FeaturedQuote t={center} />
              </ScrollReveal>

              {/* Right side card */}
              <ScrollReveal delay={0.2} direction="right">
                <SideCard t={right} side="right" />
              </ScrollReveal>
            </>
          ) : (
            <>
              <Skeleton />
              <Skeleton featured />
              <Skeleton />
            </>
          )}
        </div>

        {/* CTA row */}
        <div className="mt-14 text-center">
          <p className="font-body italic text-[var(--text-muted)] text-[15px] mb-8">
            Hundreds of five-star stories — and counting. Yours could be next.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="ghost"
              href="https://www.yelp.com/biz/kathes-jewelry-new-york"
              external
            >
              Read All Reviews on Yelp
            </Button>
            <Button variant="primary" href="/contact-us">
              Book a Service Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
