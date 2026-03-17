import { Wrench, Sparkles, Coins, Clock, Gem, Phone } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ServiceCard, type ServiceCardData } from '@/components/ui/ServiceCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const SERVICES: ServiceCardData[] = [
  {
    icon: Wrench,
    title: 'Expert Repairs',
    description:
      'Ring resizing, chain soldering, stone replacement, clasp repair & more — all done right here, by hand.',
    href: '/services#repairs',
  },
  {
    icon: Sparkles,
    title: 'Custom Design',
    description:
      'Your idea, our craftsmanship. Engagement rings, wedding bands, pendants — designed just for you.',
    href: '/services#custom-design',
  },
  {
    icon: Coins,
    title: 'Buy Gold & Silver',
    description:
      'Selling jewelry, coins, or scrap metal? Get a fair, transparent offer — same day, no pressure.',
    href: '/services#buy-gold',
  },
  {
    icon: Clock,
    title: 'Watch Repair',
    description:
      'Battery replacements, band adjustments, and professional servicing for all watch brands.',
    href: '/services#watches',
  },
  {
    icon: Gem,
    title: 'Estate Jewelry',
    description:
      'A hand-selected collection of estate pieces, vintage finds, and rare gems you won\'t find anywhere else.',
    href: '/services#estate',
  },
  {
    icon: Phone,
    title: 'Free Consultation',
    description:
      'No appointment needed. Walk in and speak with Jonas or Kathe — same-day answers, no pressure, no fee.',
    href: 'tel:+12124752986',
  },
]

export function ServicesGrid() {
  return (
    <section
      className="bg-[var(--warm-cream)] py-[var(--section-padding)] px-[var(--container-padding)]"
      aria-label="Our services"
    >
      <div style={{ maxWidth: 'var(--max-width)' }} className="mx-auto">
        <SectionHeader
          eyebrow="What We Do"
          heading="Jewelry Services"
          subtext="From everyday repairs to once-in-a-lifetime custom pieces — we've been doing this since 1993."
          align="center"
          theme="light"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
