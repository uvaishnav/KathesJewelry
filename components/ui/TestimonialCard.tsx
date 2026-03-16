import { StarRating } from './StarRating'

interface Testimonial {
  quote: string
  reviewer: string
  platform: string
  sourceURL: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
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

        <a
          href={testimonial.sourceURL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[11px] tracking-[1px] text-[var(--text-muted)] hover:text-[var(--gold-primary)] transition-colors duration-200"
        >
          {testimonial.platform} Review →
        </a>
      </div>
    </div>
  )
}
