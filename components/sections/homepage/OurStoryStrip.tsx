import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function OurStoryStrip() {
  return (
    <section
      className="bg-[var(--warm-cream)] py-[var(--section-padding)] px-[var(--container-padding)] relative overflow-hidden" data-section="light"
      aria-label="Our story"
    >
      {/* Decorative background numeral — invisible watermark */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(180px, 25vw, 320px)',
          fontWeight: 700,
          color: 'var(--border-subtle)',
          lineHeight: 1,
          opacity: 0.5,
        }}
      >
        30
      </div>

      <div
        style={{ maxWidth: 'var(--max-width)' }}
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10"
      >
        {/* Left — Image with gold accent */}
        <ScrollReveal direction="left">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/about-jonas-workbench.webp"
              alt="Jonas Rueda at his workbench — Kathe's Jewelry NYC"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gold corner accent */}
            <div
              className="absolute bottom-0 left-0 w-20 h-[3px] bg-[var(--gold-primary)]"
              aria-hidden="true"
            />
            {/* Subtle warm vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, transparent 60%, rgba(43,32,24,0.15) 100%)',
              }}
              aria-hidden="true"
            />
          </div>
        </ScrollReveal>

        {/* Right — Content */}
        <ScrollReveal direction="right" delay={0.12}>
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[var(--gold-primary)]" aria-hidden="true" />
            <span className="font-sans text-[10px] tracking-[5px] uppercase text-[var(--gold-primary)]">
              Our Story
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-serif font-semibold text-[var(--text-on-light)] leading-[1.12] tracking-tight mb-8"
            style={{ fontSize: 'clamp(1.85rem, 4vw, 3rem)' }}
          >
            30 Years in the Heart of the East Village
          </h2>

          {/* Pull quote — the hero of this section */}
          <blockquote className="relative mb-8 pl-6">
            {/* Gold left bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--gold-primary)]"
              aria-hidden="true"
            />
            {/* Large decorative open quote */}
            <span
              className="absolute -top-3 -left-1 font-serif text-[80px] leading-none text-[var(--gold-primary)]/20 select-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="font-serif italic text-[19px] text-[var(--text-on-light)] leading-[1.65] relative z-10">
              I didn&apos;t come to New York to open a jewelry store.
              I came to New York to build something that lasts.
            </p>
            <cite className="font-sans text-[10px] tracking-[3px] uppercase text-[var(--gold-primary)] not-italic block mt-3">
              — Jonas Rueda, Founder
            </cite>
          </blockquote>

          {/* Body paragraphs */}
          <p className="font-body text-[16px] text-[var(--text-secondary)] leading-[1.85] mb-4">
            Jonas Rueda arrived in New York City from Ecuador at seventeen
            years old. He spoke little English, had no connections, and worked
            as a dishwasher to get by. A chance encounter with a local jeweler
            changed everything — he discovered a craft, and a calling.
          </p>

          <p className="font-body text-[16px] text-[var(--text-secondary)] leading-[1.85] mb-8">
            In 1993, he opened Kathe&apos;s Jewelry on 1st Avenue in the East
            Village, naming it after his daughter. Over thirty years later,
            Kathe is now a GIA-certified gemologist and FIT-trained designer —
            working alongside her father in the same shop where she grew up.
          </p>

          {/* Stats row */}
          <div className="flex gap-10 mb-10 pb-8 border-b border-[var(--border-subtle)]">
            <div>
              <p
                className="font-sans font-bold text-[var(--gold-primary)] leading-none mb-1"
                style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}
              >
                30+
              </p>
              <p className="font-body text-[13px] text-[var(--text-muted)]">
                Years in Business
              </p>
            </div>
            <div className="w-px bg-[var(--border-subtle)]" aria-hidden="true" />
            <div>
              <p
                className="font-sans font-bold text-[var(--gold-primary)] leading-none mb-1"
                style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}
              >
                4.8★
              </p>
              <p className="font-body text-[13px] text-[var(--text-muted)]">
                Average Rating
              </p>
            </div>
            <div className="w-px bg-[var(--border-subtle)]" aria-hidden="true" />
            <div>
              <p
                className="font-sans font-bold text-[var(--gold-primary)] leading-none mb-1"
                style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}
              >
                200+
              </p>
              <p className="font-body text-[13px] text-[var(--text-muted)]">
                Verified Reviews
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-6 flex-wrap">
            <Button variant="primary" href="/about-us">
              Meet the Full Family
            </Button>
            <p className="font-body text-[13px] text-[var(--text-muted)] italic">
              Est. 1993 · 226 1st Ave, East Village
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
