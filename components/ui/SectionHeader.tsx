interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  subtext?: string
  align?: 'left' | 'center'
  theme?: 'light' | 'dark'
}

export function SectionHeader({
  eyebrow,
  heading,
  subtext,
  align = 'center',
  theme = 'light',
}: SectionHeaderProps) {
  const isCenter = align === 'center'
  const isDark = theme === 'dark'

  return (
    <div className={`mb-16 ${isCenter ? 'text-center' : 'text-left'}`}>
      {eyebrow && (
        <span className="font-sans text-[11px] tracking-[3px] text-[var(--gold-primary)] uppercase mb-4 block">
          {eyebrow}
        </span>
      )}

      {/* Gold divider — only on left-aligned sections */}
      {!isCenter && (
        <div className="w-16 h-[2px] bg-[var(--gold-primary)] mb-6" />
      )}

      <h2
        className={`font-serif text-[clamp(1.8rem,4vw,3.25rem)] font-semibold leading-[1.15] tracking-tight mb-5 ${
          isDark ? 'text-white' : 'text-[var(--text-on-light)]'
        }`}
      >
        {heading}
      </h2>

      {subtext && (
        <p
          className={`font-body text-[17px] leading-[1.85] max-w-[600px] ${
            isCenter ? 'mx-auto' : ''
          } ${isDark ? 'text-[var(--text-muted)]' : 'text-[var(--text-secondary)]'}`}
        >
          {subtext}
        </p>
      )}
    </div>
  )
}
