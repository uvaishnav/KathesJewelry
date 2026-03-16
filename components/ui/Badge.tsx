interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'dark' | 'outline'
}

const variants = {
  gold: 'bg-[var(--gold-primary)]/10 text-[var(--gold-primary)] border border-[var(--gold-primary)]/30',
  dark: 'bg-[var(--dark-base)] text-white',
  outline: 'border border-[var(--border-subtle)] text-[var(--text-secondary)]',
} as const

export function Badge({ children, variant = 'gold' }: BadgeProps) {
  return (
    <span
      className={`inline-block font-sans text-[11px] tracking-[1.5px] uppercase px-3 py-1 ${variants[variant]}`}
    >
      {children}
    </span>
  )
}
