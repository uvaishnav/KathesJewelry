import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ServiceCardData {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

interface ServiceCardProps {
  service: ServiceCardData
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon

  return (
    <Link
      href={service.href}
      className="group block bg-white border border-[var(--border-subtle)]
                 p-6 md:p-8
                 hover:scale-[1.02] hover:shadow-xl
                 transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      {/* Icon */}
      <div className="mb-5">
        <Icon className="w-10 h-10 text-[var(--gold-primary)]" />
      </div>

      {/* Title */}
      <h3 className="font-serif text-[20px] font-semibold text-[var(--text-on-light)] mb-3">
        {service.title}
      </h3>

      {/* Description */}
      <p className="font-body text-[15px] text-[var(--text-secondary)] leading-[1.7] mb-5">
        {service.description}
      </p>

      {/* Learn More link */}
      <span className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[2px] uppercase text-[var(--gold-primary)] group-hover:gap-3 transition-all duration-200">
        Learn More
        <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  )
}
