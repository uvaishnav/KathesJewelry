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
        <span
          className="font-sans uppercase block mb-4"
          style={{ fontSize: 11, letterSpacing: '0.28em', color: 'var(--gold-primary)' }}
        >
          {eyebrow}
        </span>
      )}

      {/* Gold divider — left-aligned only */}
      {!isCenter && (
        <div className="bg-[var(--gold-primary)] mb-6" style={{ width: 64, height: 2 }} aria-hidden="true" />
      )}

      <h2
        className="font-serif font-semibold leading-[1.12] tracking-tight mb-5"
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 3.25rem)',
          color: isDark ? 'white' : 'var(--text-on-light)',
        }}
      >
        {heading}
      </h2>

      {subtext && (
        <p
          className={`font-body leading-[1.85] ${isCenter ? 'mx-auto' : ''}`}
          style={{
            fontSize: 17,
            maxWidth: 580,
            color: isDark ? 'var(--text-muted)' : 'var(--text-secondary)',
          }}
        >
          {subtext}
        </p>
      )}
    </div>
  )
}
