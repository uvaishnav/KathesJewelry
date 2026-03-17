'use client'

import { SectionHeader } from '@/components/ui/SectionHeader'
import { TestimonialCard, type Testimonial } from '@/components/ui/TestimonialCard'
import { StarRating } from '@/components/ui/StarRating'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Button } from '@/components/ui/Button'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

function SkeletonCard() {
  return (
    <div className="bg-[var(--dark-card)] border-l-4 border-[var(--gold-primary)]/20 p-6 md:p-8 animate-pulse">
      <div className="h-6 w-6 bg-white/10 rounded mb-5" />
      <div className="space-y-2.5 mb-5">
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-[90%]" />
        <div className="h-3 bg-white/10 rounded w-[75%]" />
      </div>
      <div className="h-3 bg-white/10 rounded w-[40%] mb-4" />
      <div className="flex justify-between">
        <div className="h-3 bg-white/10 rounded w-[30%]" />
        <div className="h-3 bg-white/10 rounded w-[30%]" />
      </div>
    </div>
  )
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const hasTestimonials = testimonials && testimonials.length > 0

  return (
    <section
      className="bg-[var(--dark-base)] py-[var(--section-padding)] px-[var(--container-padding)] relative overflow-hidden"
      aria-label="Customer testimonials"
    >
      {/* Decorative large background quote mark */}
      <div
        className="absolute top-[var(--section-padding)] left-1/2 -translate-x-1/2 select-none pointer-events-none"
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(200px, 30vw, 400px)',
          fontWeight: 700,
          color: 'rgba(201, 169, 110, 0.04)',
          lineHeight: 1,
          zIndex: 0,
        }}
      >
        &ldquo;
      </div>

      <div style={{ maxWidth: 'var(--max-width)' }} className="mx-auto relative z-10">
        <SectionHeader
          eyebrow="Real New Yorkers. Real Experiences."
          heading="Don't Take Our Word For It."
          subtext="Over 30 years of five-star moments — read what our customers say."
          align="center"
          theme="dark"
        />

        {/* Aggregate Rating */}
        <div className="flex flex-col items-center gap-2 mb-14 -mt-10">
          <StarRating rating={5} size="md" />
          <p className="font-sans text-[12px] tracking-[2px] text-[var(--text-muted)] uppercase">
            4.8 out of 5 &nbsp;·&nbsp; Google · Yelp · TrustAnalytica
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hasTestimonials
            ? testimonials.map((t, i) => (
                <ScrollReveal key={t._id ?? i} delay={i * 0.09}>
                  <TestimonialCard testimonial={t} />
                </ScrollReveal>
              ))
            : Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>

        {/* Below-card copy + CTAs */}
        <div className="mt-14 text-center">
          <p className="font-body italic text-[var(--text-muted)] text-[16px] mb-8">
            Hundreds of five-star stories — and counting. Yours could be next.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="ghost"
              href="https://www.yelp.com/biz/kathes-jewelry-new-york"
              external
              aria-label="Read all reviews on Yelp (opens in new tab)"
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
