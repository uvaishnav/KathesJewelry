'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Wrench, Sparkles, Coins, Clock, Gem, Phone, ArrowUpRight } from 'lucide-react'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'motion/react'
import { useReducedMotion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface Service {
  index: string
  icon: LucideIcon
  title: string
  tagline: string
  description: string
  detail: string
  href: string
}

const SERVICES: Service[] = [
  {
    index: '01',
    icon: Wrench,
    title: 'Expert Repairs',
    tagline: 'All done in-house',
    description:
      'Ring resizing, chain soldering, stone replacement, clasp repair — all done right here, by hand. Your piece never leaves our workshop.',
    detail: 'Most repairs completed same-week. Simple repairs from $20.',
    href: '/services#repairs',
  },
  {
    index: '02',
    icon: Sparkles,
    title: 'Custom Design',
    tagline: 'Your vision, our craft',
    description:
      'Your idea, our craftsmanship. Engagement rings, wedding bands, pendants — designed just for you by our GIA-certified gemologist.',
    detail: '2–4 weeks from design approval. Free initial consultation.',
    href: '/services#custom-design',
  },
  {
    index: '03',
    icon: Coins,
    title: 'Buy Gold & Silver',
    tagline: 'Fair & transparent',
    description:
      'Selling jewelry, coins, or scrap metal? Get a fair, transparent offer — same day, no pressure, no games. Pricing tied to live market rates.',
    detail: 'Payment on the spot. No obligation to sell.',
    href: '/services#buy-gold',
  },
  {
    index: '04',
    icon: Clock,
    title: 'Watch Repair',
    tagline: 'Every timepiece matters',
    description:
      'Battery replacements, band adjustments, crystal replacements, and full movement servicing for all watch brands and styles.',
    detail: 'Simple repairs same-day. Servicing 3–5 business days.',
    href: '/services#watches',
  },
  {
    index: '05',
    icon: Gem,
    title: 'Estate Jewelry',
    tagline: 'Hand-selected pieces',
    description:
      "A hand-selected collection of estate pieces, vintage finds, and rare gems you won't find anywhere else — personally evaluated by Jonas.",
    detail: 'We buy, sell, and restore estate collections.',
    href: '/services#estate',
  },
  {
    index: '06',
    icon: Phone,
    title: 'Free Consultation',
    tagline: 'No appointment needed',
    description:
      'Walk in and speak with Jonas or Kathe — same-day answers, honest advice, no pressure, no fee. Monday through Saturday.',
    detail: 'Mon–Sat · 10am–6pm · 226 1st Ave, East Village',
    href: 'tel:+12124752986',
  },
]

export function ServicesGrid() {
  const [active, setActive] = useState(0)
  const shouldReduce = useReducedMotion()
  const service = SERVICES[active]
  const Icon = service.icon
  const isPhone = service.href.startsWith('tel:')

  return (
    <section
      data-section="dark"
      className="relative bg-[var(--dark-base)] py-[var(--section-padding)] px-[var(--container-padding)] overflow-hidden"
      aria-label="Our services"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 opacity-[0.04]"
        style={{
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, #C9A96E 0%, transparent 68%)',
          borderRadius: '50%',
        }}
        aria-hidden="true"
      />

      <div style={{ maxWidth: 'var(--max-width)' }} className="mx-auto">

        {/* Eyebrow */}
        <ScrollReveal>
          <div className="flex items-center gap-5 mb-16 lg:mb-20">
            <span
              className="font-sans uppercase"
              style={{ fontSize: 10, letterSpacing: '0.4em', color: 'var(--gold-primary)' }}
            >
              What We Do
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(to right, rgba(201,169,110,0.3), transparent)' }}
              aria-hidden="true"
            />
          </div>
        </ScrollReveal>

        {/* ── DESKTOP two-panel ── */}
        <div className="hidden lg:grid lg:grid-cols-[460px_1fr] gap-16 xl:gap-24 items-start">

          {/* Left: heading + numbered list */}
          <div>
            <ScrollReveal>
              <h2
                className="font-serif font-semibold text-white leading-[1.08] mb-14"
                style={{ fontSize: 'clamp(2rem,3.5vw,3.2rem)' }}
              >
                More Than a<br />
                <em className="not-italic" style={{ color: 'var(--gold-primary)' }}>Jewelry Store</em>
              </h2>
            </ScrollReveal>

            {SERVICES.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.05}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group w-full flex items-center gap-6 py-[18px] border-b text-left transition-all duration-300"
                  style={{
                    borderColor: active === i
                      ? 'rgba(201,169,110,0.35)'
                      : 'rgba(255,255,255,0.07)',
                  }}
                  aria-label={`View ${s.title} details`}
                >
                  <span
                    className="flex-shrink-0 font-sans transition-colors duration-300"
                    style={{
                      width: 28,
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      color: active === i ? 'var(--gold-primary)' : 'rgba(255,255,255,0.18)',
                    }}
                  >
                    {s.index}
                  </span>
                  <span
                    className="font-serif flex-1 transition-all duration-300"
                    style={{
                      fontSize: 21,
                      fontWeight: 500,
                      letterSpacing: '-0.01em',
                      color: active === i ? '#fff' : 'rgba(255,255,255,0.42)',
                    }}
                  >
                    {s.title}
                  </span>
                  <span
                    className="hidden xl:block flex-shrink-0 font-sans uppercase transition-all duration-300"
                    style={{
                      fontSize: 9,
                      letterSpacing: '0.22em',
                      color: active === i ? 'rgba(201,169,110,0.65)' : 'transparent',
                    }}
                  >
                    {s.tagline}
                  </span>
                  <ArrowUpRight
                    className="flex-shrink-0 w-[15px] h-[15px] transition-all duration-300"
                    style={{
                      color: 'var(--gold-primary)',
                      opacity: active === i ? 1 : 0,
                      transform: active === i ? 'translate(0,0)' : 'translate(-5px,5px)',
                    }}
                    aria-hidden="true"
                  />
                </button>
              </ScrollReveal>
            ))}
          </div>

          {/* Right: animated service preview */}
          <div className="sticky top-28 min-h-[440px] flex items-start pt-2">
            <LazyMotion features={domAnimation}>
              <AnimatePresence mode="wait">
                <m.div
                  key={active}
                  initial={shouldReduce ? {} : { opacity: 0, y: 24, scale: 0.98 }}
                  animate={shouldReduce ? {} : { opacity: 1, y: 0, scale: 1 }}
                  exit={shouldReduce ? {} : { opacity: 0, y: -18, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full relative"
                >
                  {/* Giant watermark number */}
                  <span
                    className="absolute font-serif font-bold select-none pointer-events-none"
                    style={{
                      top: -16,
                      left: -8,
                      fontSize: 'clamp(7rem,13vw,13rem)',
                      lineHeight: 1,
                      color: 'rgba(201,169,110,0.04)',
                      letterSpacing: '-0.05em',
                    }}
                    aria-hidden="true"
                  >
                    {service.index}
                  </span>

                  {/* Icon with geometric frame */}
                  <div className="mb-8">
                    <div
                      className="relative inline-flex items-center justify-center"
                      style={{
                        width: 72,
                        height: 72,
                        background:
                          'linear-gradient(135deg, rgba(201,169,110,0.12), rgba(201,169,110,0.03))',
                        border: '1px solid rgba(201,169,110,0.22)',
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: 'var(--gold-primary)' }} aria-hidden="true" />
                      {/* corner accents */}
                      <span
                        className="absolute border-t border-l border-[var(--gold-primary)]"
                        style={{ top: -1, left: -1, width: 14, height: 14 }}
                        aria-hidden="true"
                      />
                      <span
                        className="absolute border-b border-r border-[var(--gold-primary)]"
                        style={{ bottom: -1, right: -1, width: 14, height: 14 }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <p
                    className="font-sans uppercase mb-4"
                    style={{ fontSize: 10, letterSpacing: '0.36em', color: 'var(--gold-primary)' }}
                  >
                    {service.tagline}
                  </p>

                  <h3
                    className="font-serif font-semibold text-white leading-[1.1] mb-5"
                    style={{ fontSize: 'clamp(2rem,3vw,2.8rem)' }}
                  >
                    {service.title}
                  </h3>

                  <div
                    className="mb-7"
                    style={{ width: 40, height: 1, background: 'rgba(201,169,110,0.5)' }}
                    aria-hidden="true"
                  />

                  <p
                    className="font-body leading-[1.9] mb-4"
                    style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: 480 }}
                  >
                    {service.description}
                  </p>

                  <p
                    className="font-sans mb-10"
                    style={{ fontSize: 12, letterSpacing: '0.04em', color: 'rgba(201,169,110,0.45)' }}
                  >
                    {service.detail}
                  </p>

                  {isPhone ? (
                    <a
                      href={service.href}
                      className="service-cta-link"
                    >
                      Call Now
                    </a>
                  ) : (
                    <Link href={service.href} className="service-cta-link">
                      Learn More
                    </Link>
                  )}
                </m.div>
              </AnimatePresence>
            </LazyMotion>
          </div>
        </div>

        {/* ── MOBILE accordion ── */}
        <div className="lg:hidden">
          <ScrollReveal>
            <h2
              className="font-serif font-semibold text-white leading-[1.1] mb-10"
              style={{ fontSize: 'clamp(1.9rem,7vw,2.6rem)' }}
            >
              More Than<br />
              <em className="not-italic" style={{ color: 'var(--gold-primary)' }}>a Jewelry Store</em>
            </h2>
          </ScrollReveal>

          {SERVICES.map((s, i) => {
            const SIcon = s.icon
            const isOpen = active === i
            return (
              <ScrollReveal key={s.title} delay={i * 0.04}>
                <div
                  className="border-b"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <button
                    onClick={() => setActive(isOpen ? (i + 1) % SERVICES.length : i)}
                    className="w-full flex items-center gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="font-sans flex-shrink-0"
                      style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--gold-primary)' }}
                    >
                      {s.index}
                    </span>
                    <span
                      className="font-serif flex-1 transition-colors duration-200"
                      style={{
                        fontSize: 20,
                        fontWeight: 500,
                        color: isOpen ? '#fff' : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {s.title}
                    </span>
                    <SIcon
                      className="flex-shrink-0 w-5 h-5 transition-all duration-300"
                      style={{ color: isOpen ? 'var(--gold-primary)' : 'rgba(255,255,255,0.2)' }}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <LazyMotion features={domAnimation}>
                      <m.div
                        initial={shouldReduce ? {} : { height: 0, opacity: 0 }}
                        animate={shouldReduce ? {} : { height: 'auto', opacity: 1 }}
                        exit={shouldReduce ? {} : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="font-body leading-[1.85] pb-2"
                          style={{ fontSize: 15, color: 'var(--text-muted)' }}
                        >
                          {s.description}
                        </p>
                        <div className="pb-6 pt-3">
                          {s.href.startsWith('tel:') ? (
                            <a
                              href={s.href}
                              className="font-sans uppercase"
                              style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--gold-primary)' }}
                            >
                              Call Now →
                            </a>
                          ) : (
                            <Link
                              href={s.href}
                              className="font-sans uppercase"
                              style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--gold-primary)' }}
                            >
                              Learn More →
                            </Link>
                          )}
                        </div>
                      </m.div>
                    </LazyMotion>
                  )}
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
