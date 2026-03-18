import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface ServiceCardData {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

export function ServiceCard({ service }: { service: ServiceCardData }) {
  const Icon = service.icon
  const isExternal = service.href.startsWith('tel:') || service.href.startsWith('mailto:')

  const sharedClass = `
    group relative flex flex-col h-full bg-white border border-[var(--border-subtle)]
    p-7 md:p-8 overflow-hidden
    hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)]
    transition-shadow duration-[280ms] ease-[var(--spring-ease)]
  `

  const content = (
    <>
      {/* Gold sweep underline on hover */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--gold-primary)]
                   group-hover:w-full transition-all duration-500 ease-[var(--spring-ease)]"
        aria-hidden="true"
      />

      {/* Icon container */}
      <div className="mb-5 inline-flex items-center justify-center w-12 h-12 bg-[var(--warm-cream)]
                      group-hover:bg-[var(--gold-primary)]/10 transition-colors duration-200">
        <Icon className="w-6 h-6 text-[var(--gold-primary)]" />
      </div>

      {/* Title */}
      <h3 className="font-serif text-[20px] font-semibold text-[var(--text-on-light)] mb-3">
        {service.title}
      </h3>

      {/* Description — flex-1 pushes CTA to bottom */}
      <p className="font-body text-[15px] text-[var(--text-secondary)] leading-[1.75] mb-6 flex-1">
        {service.description}
      </p>

      {/* Learn More */}
      <span className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[2px]
                       uppercase text-[var(--gold-primary)] group-hover:gap-3 transition-all duration-200 mt-auto">
        Learn More
        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
      </span>
    </>
  )

  return isExternal ? (
    <a href={service.href} className={sharedClass}>{content}</a>
  ) : (
    <Link href={service.href} className={sharedClass}>{content}</Link>
  )
}
