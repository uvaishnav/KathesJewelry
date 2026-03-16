import { StarRating } from './StarRating'

export interface Testimonial {
  quote: string
  reviewer: string
  platform: string
  sourceURL: string
}

export interface TestimonialCardProps {
  testimonial: Testimonial
}

const ALLOWED_PROTOCOLS = ['https:', 'http:']

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ALLOWED_PROTOCOLS.includes(parsed.protocol)
  } catch {
    return false
  }
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const hasValidUrl = isValidUrl(testimonial.sourceURL)

  return (
    <div className="bg-[var(--dark-card)] border-l-4 border-[var(--gold-primary)] p-6 md:p-8">
      {/* Quote */}
      <blockquote className="font-serif italic text-[17px] text-white/90 leading-[1.7] mb-5">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Star Rating */}
      <div className="mb-4">
        <StarRating rating={5} size="sm" />
      </div>

      {/* Reviewer */}
      <div className="flex items-center justify-between gap-4">
        <span className="font-sans text-[11px] tracking-[2px] uppercase text-[var(--gold-primary)]">
          {testimonial.reviewer}
        </span>

        {hasValidUrl ? (
          <a
            href={testimonial.sourceURL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] tracking-[1px] text-[var(--text-muted)] hover:text-[var(--gold-primary)] transition-colors duration-200"
          >
            {testimonial.platform} Review →
          </a>
        ) : (
          <span className="font-sans text-[11px] tracking-[1px] text-[var(--text-muted)]">
            {testimonial.platform} Review
          </span>
        )}
      </div>
    </div>
  )
}
