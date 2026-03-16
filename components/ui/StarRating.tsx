import { Star } from 'lucide-react'

export interface StarRatingProps {
  rating: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
} as const

export function StarRating({ rating, max = 5, size = 'md' }: StarRatingProps) {
  const sizeClass = sizeMap[size]

  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => {
        const isFilled = i < Math.round(rating)
        return (
          <Star
            key={i}
            aria-hidden="true"
            className={`${sizeClass} ${
              isFilled
                ? 'text-[var(--gold-primary)] fill-[var(--gold-primary)]'
                : 'text-[var(--border-subtle)]'
            }`}
          />
        )
      })}
    </div>
  )
}
