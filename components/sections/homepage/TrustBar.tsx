'use client'

import { Star, Wrench, Award, Building2 } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { LucideIcon } from 'lucide-react'

interface TrustPillar { icon: LucideIcon; value: string; label: string }

const PILLARS: TrustPillar[] = [
  { icon: Building2, value: 'Since 1993', label: 'Over 30 years serving New York City' },
  { icon: Award, value: 'GIA-Certified', label: 'In-house expertise on every piece we touch' },
  { icon: Star, value: 'Rated 4.8 Stars', label: 'Across Google, Yelp & TrustAnalytica' },
  { icon: Wrench, value: 'All Repairs In-House', label: 'Your jewelry never leaves our workshop' },
]

export function TrustBar() {
  return (
    <section
      className="bg-[var(--charcoal)] relative overflow-hidden"
      data-section="dark"
      aria-label="Trust indicators"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold-primary)]/40 to-transparent" aria-hidden="true" />

      <div className="py-14 px-[var(--container-padding)] relative z-10">
        <div className="mx-auto" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x-0 lg:divide-x divide-[var(--gold-primary)]/15 gap-y-10 lg:gap-y-0">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <ScrollReveal key={pillar.value} delay={i * 0.09} className="flex flex-col items-center text-center px-6 lg:px-8">
                  <div className="relative flex items-center justify-center w-14 h-14 mb-4" aria-hidden="true">
                    <div className="absolute inset-0 rounded-full border border-[var(--gold-primary)]/25" />
                    <div className="absolute inset-[6px] rounded-full bg-[var(--gold-primary)]/8" />
                    <Icon className="w-6 h-6 text-[var(--gold-primary)] relative z-10" />
                  </div>
                  <p className="font-sans text-[16px] font-bold text-white leading-tight mb-2">{pillar.value}</p>
                  <p className="font-body text-[13px] text-[var(--text-muted)] leading-snug max-w-[150px] italic">{pillar.label}</p>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold-primary)]/20 to-transparent" aria-hidden="true" />
    </section>
  )
}
