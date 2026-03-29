'use client'

/**
 * SectionTransition — creates a "wipe" divider between sections.
 * Produces the feeling of one section physically taking over another
 * as the user scrolls, inspired by Apple's product pages.
 *
 * Place BETWEEN two sections to add a visual bridge.
 * variant="dark-to-light" | "light-to-dark" | "dark-to-cream"
 */

interface SectionTransitionProps {
  variant?: 'dark-to-light' | 'light-to-dark' | 'dark-to-cream' | 'cream-to-dark' | 'dark-to-dark'
  /** Extra decorative element: "wave" | "angle" | "none" */
  shape?: 'angle' | 'none'
  className?: string
}

const GRADIENTS = {
  'dark-to-light':  ['#111111', '#FFFFFF'],
  'light-to-dark':  ['#FFFFFF', '#111111'],
  'dark-to-cream':  ['#111111', '#FAF7F2'],
  'cream-to-dark':  ['#FAF7F2', '#111111'],
  'dark-to-dark':   ['#111111', '#111111'],
}

export function SectionTransition({
  variant = 'dark-to-light',
  shape = 'none',
  className = '',
}: SectionTransitionProps) {
  const [from, to] = GRADIENTS[variant]

  if (shape === 'angle') {
    return (
      <div
        className={`relative h-16 md:h-24 overflow-hidden ${className}`}
        style={{ background: from }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          style={{ display: 'block' }}
        >
          <polygon points="0,0 1440,96 1440,0" fill={to} />
          {/* Thin gold seam line */}
          <line x1="0" y1="0" x2="1440" y2="96" stroke="#C9A96E" strokeWidth="0.8" strokeOpacity="0.3" />
        </svg>
      </div>
    )
  }

  // Default: gradient fade
  return (
    <div
      className={`h-12 md:h-20 ${className}`}
      style={{
        background: `linear-gradient(to bottom, ${from}, ${to})`,
        display: 'block',
      }}
      aria-hidden="true"
    />
  )
}
