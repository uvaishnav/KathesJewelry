import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function OurStoryStrip() {
  return (
    <section
      className="bg-[var(--warm-cream)] py-[var(--section-padding)] px-[var(--container-padding)] relative overflow-hidden"
      data-section="light"
      aria-label="Our story"
    >
      {/* Premium cream background: subtle cross-ruled linen texture + warm bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse at 110% 0%, rgba(201,169,110,0.07) 0%, transparent 48%)',
            'radial-gradient(ellipse at -10% 100%, rgba(201,169,110,0.05) 0%, transparent 42%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* Decorative watermark numeral */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(180px, 25vw, 320px)',
          fontWeight: 700,
          color: 'rgba(201,169,110,0.06)',
          lineHeight: 1,
        }}
      >
        30
      </div>

      <div
        style={{ maxWidth: 'var(--max-width)' }}
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10"
      >
        {/* Left — Image with corner accents */}
        <ScrollReveal direction="left">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/about-jonas-workbench.webp"
              alt="Jonas Rueda at his workbench — Kathe's Jewelry NYC"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Bottom-left gold bar */}
            <div className="absolute bottom-0 left-0 w-20 h-[3px] bg-[var(--gold-primary)]" aria-hidden="true" />
            {/* Warm edge vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, transparent 55%, rgba(43,32,24,0.18) 100%)' }}
              aria-hidden="true"
            />
            {/* Corner bracket — top right */}
            <span
              className="absolute top-0 right-0 border-t border-r border-[var(--gold-primary)]/40"
              style={{ width: 32, height: 32 }}
              aria-hidden="true"
            />
          </div>
        </ScrollReveal>

        {/* Right — Content */}
        <ScrollReveal direction="right" delay={0.12}>
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[var(--gold-primary)]" aria-hidden="true" />
            <span
              className="font-sans uppercase"
              style={{ fontSize: 10, letterSpacing: '0.45em', color: 'var(--gold-primary)' }}
            >
              Our Story
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-serif font-semibold text-[var(--text-on-light)] leading-[1.12] tracking-tight mb-8"
            style={{ fontSize: 'clamp(1.85rem, 4vw, 3rem)' }}
          >
            30 Years in the Heart of<br />the East Village
          </h2>

          {/* Pull quote */}
          <blockquote className="relative mb-8 pl-6">
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--gold-primary)]"
              aria-hidden="true"
            />
            <span
              className="absolute -top-3 -left-1 font-serif text-[80px] leading-none select-none"
              style={{ color: 'rgba(201,169,110,0.18)' }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="font-serif italic text-[19px] text-[var(--text-on-light)] leading-[1.65] relative z-10">
              I didn&apos;t come to New York to open a jewelry store.
              I came to New York to build something that lasts.
            </p>
            <cite
              className="font-sans not-italic block mt-3"
              style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold-primary)' }}
            >
              — Jonas Rueda, Founder
            </cite>
          </blockquote>

          {/* Body */}
          <p className="font-body text-[16px] text-[var(--text-secondary)] leading-[1.85] mb-4">
            Jonas Rueda arrived in New York City from Ecuador at seventeen
            years old. A chance encounter with a local jeweler changed everything —
            he discovered a craft, and a calling.
          </p>

          <p className="font-body text-[16px] text-[var(--text-secondary)] leading-[1.85] mb-8">
            In 1993, he opened Kathe&apos;s Jewelry on 1st Avenue, naming it after
            his daughter. Over thirty years later, Kathe is a GIA-certified
            gemologist and FIT-trained designer — working alongside her father
            in the same shop where she grew up.
          </p>

          {/* Stats */}
          <div className="flex gap-10 mb-10 pb-8 border-b border-[var(--border-subtle)]">
            {[
              { val: '30+', label: 'Years in Business' },
              { val: '4.8★', label: 'Average Rating' },
              { val: '200+', label: 'Verified Reviews' },
            ].map((s, i) => (
              <div key={s.label}>
                <p
                  className="font-sans font-bold text-[var(--gold-primary)] leading-none mb-1"
                  style={{ fontSize: 'clamp(1.8rem,3.5vw,2.4rem)' }}
                >
                  {s.val}
                </p>
                <p className="font-body text-[13px] text-[var(--text-muted)]">{s.label}</p>
                {i < 2 && (
                  <div className="hidden" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-6 flex-wrap">
            <Button variant="primary" href="/about-us">
              Meet the Full Family
            </Button>
            <p
              className="font-body italic"
              style={{ fontSize: 13, color: 'var(--text-muted)' }}
            >
              Est. 1993 · 226 1st Ave, East Village
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
