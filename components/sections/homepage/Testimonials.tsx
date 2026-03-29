'use client'

import { SectionHeader } from '@/components/ui/SectionHeader'
import { StarRating } from '@/components/ui/StarRating'
import { Button } from '@/components/ui/Button'
import type { Testimonial } from '@/components/ui/TestimonialCard'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

// Fallback testimonials to ensure marquee never runs empty
const FALLBACK: Testimonial[] = [
  {
    _id: 'f1',
    quote: "I brought in a ring that had been in my family for decades. Jonas treated it like it was his own. There was literally no way to tell it had ever been touched. I cried when I picked it up.",
    reviewer: 'Eve L.',
    platform: 'Yelp',
    sourceURL: 'https://www.yelp.com/biz/kathes-jewelry-new-york',
  },
  {
    _id: 'f2',
    quote: "Kathe sat with me for over an hour going through design options for my engagement ring. The finished ring was beyond anything I imagined — my fiancée hasn't stopped showing it to everyone.",
    reviewer: 'Candida C.',
    platform: 'Yelp',
    sourceURL: 'https://www.yelp.com/biz/kathes-jewelry-new-york',
  },
  {
    _id: 'f3',
    quote: "They fixed my gold bracelet on the spot for $20. When I asked why it was so cheap, Jonas just smiled and said — that's the right price. I've sent every friend I have to this store.",
    reviewer: 'Nomin M.',
    platform: 'Yelp',
    sourceURL: 'https://www.yelp.com/biz/kathes-jewelry-new-york',
  },
  {
    _id: 'f4',
    quote: "Honest pricing. No games. Best offer I got in the city for my gold chain. Jonas explained every step of the evaluation. I walked out happy and I'll be back.",
    reviewer: 'Marcus D.',
    platform: 'Google',
    sourceURL: 'https://www.yelp.com/biz/kathes-jewelry-new-york',
  },
]

function TestimonialSlide({ t }: { t: Testimonial }) {
  return (
    <a
      href={t.sourceURL}
      target="_blank"
      rel="noopener noreferrer"
      className="card-shine group block shrink-0 bg-[var(--dark-card)] border border-[var(--gold-primary)]/12 p-7 no-underline"
      style={{ width: 360, marginRight: 20 }}
      aria-label={`Read ${t.reviewer}'s ${t.platform} review`}
    >
      {/* Stars */}
      <div className="flex items-center gap-2 mb-4">
        <StarRating rating={5} size="sm" />
        <span
          className="font-sans uppercase"
          style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-muted)' }}
        >
          {t.platform}
        </span>
      </div>

      {/* Quote */}
      <blockquote
        className="font-serif italic text-white/85 leading-[1.7] mb-5"
        style={{ fontSize: 15 }}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/6">
        <span
          className="font-sans uppercase"
          style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--gold-primary)' }}
        >
          {t.reviewer}
        </span>
        <span
          className="font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ fontSize: 10, color: 'var(--text-muted)' }}
        >
          Read on {t.platform} →
        </span>
      </div>
    </a>
  )
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const items = testimonials?.length >= 3 ? testimonials : FALLBACK
  // Duplicate for seamless loop
  const doubled = [...items, ...items, ...items]

  return (
    <section
      className="relative py-[var(--section-padding)] overflow-hidden"
      style={{
        backgroundColor: 'var(--dark-base)',
        backgroundImage: [
          'radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 50%)',
          'radial-gradient(ellipse at 8% 90%, rgba(201,169,110,0.05) 0%, transparent 45%)',
        ].join(', '),
      }}
      aria-label="Customer testimonials"
    >
      {/* Top atmospheric gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div
        style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}
        className="px-[var(--container-padding)] relative z-10"
      >
        {/* Header */}
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
          <p
            className="font-sans uppercase"
            style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--text-muted)' }}
          >
            4.8 out of 5 &nbsp;·&nbsp; Google · Yelp · TrustAnalytica
          </p>
        </div>
      </div>

      {/* ── Infinite scrolling marquee — edge-to-edge ── */}
      <div
        className="relative overflow-hidden"
        style={{ marginBottom: '4rem' }}
        aria-hidden="true"
      >
        {/* Left fade mask */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 120,
            background: 'linear-gradient(to right, var(--dark-base), transparent)',
          }}
        />
        {/* Right fade mask */}
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 120,
            background: 'linear-gradient(to left, var(--dark-base), transparent)',
          }}
        />

        <div className="marquee-track" style={{ paddingLeft: 40 }}>
          {doubled.map((t, i) => (
            <TestimonialSlide key={`${t._id ?? i}-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* CTA row */}
      <div
        className="text-center"
        style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--container-padding)' }}
      >
        <p
          className="font-body italic mb-8"
          style={{ color: 'var(--text-muted)', fontSize: 15 }}
        >
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
    </section>
  )
}
