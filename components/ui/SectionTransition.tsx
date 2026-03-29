/**
 * SectionTransition — a seamless gradient bridge between sections.
 * NO visible lines. NO SVG cuts. Just a smooth color blend.
 * 
 * The "sections taking over" feel comes from the gradient itself
 * being placed INSIDE each section (via padding/overlap), not between them.
 */

interface SectionTransitionProps {
  variant?: 'dark-to-cream' | 'cream-to-dark' | 'dark-to-white' | 'white-to-dark'
  height?: string
}

const COLORS = {
  dark: '#111111',
  cream: '#FAF7F2',
  white: '#FFFFFF',
}

const GRADIENTS: Record<string, [string, string]> = {
  'dark-to-cream':  [COLORS.dark,  COLORS.cream],
  'cream-to-dark':  [COLORS.cream, COLORS.dark],
  'dark-to-white':  [COLORS.dark,  COLORS.white],
  'white-to-dark':  [COLORS.white, COLORS.dark],
}

export function SectionTransition({
  variant = 'dark-to-cream',
  height = '80px',
}: SectionTransitionProps) {
  const [from, to] = GRADIENTS[variant] ?? [COLORS.dark, COLORS.cream]

  return (
    <div
      aria-hidden="true"
      style={{
        height,
        display: 'block',
        background: `linear-gradient(to bottom, ${from} 0%, ${to} 100%)`,
        marginTop: '-1px',
        marginBottom: '-1px',
      }}
    />
  )
}
