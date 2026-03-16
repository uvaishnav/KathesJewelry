import Link from 'next/link'

type ButtonVariant = 'primary' | 'ghost' | 'dark-ghost' | 'text'

export interface ButtonProps {
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  external?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
  'aria-label'?: string
}

const base = 'inline-flex items-center justify-center gap-2 font-sans font-semibold text-[12px] tracking-[2px] uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<ButtonVariant, string> = {
  primary: `${base} bg-[var(--gold-primary)] text-[#111] px-8 py-4 hover:bg-[var(--gold-light)] shadow-[0_0_30px_rgba(201,169,110,0.15)]`,

  ghost: `${base} border border-[var(--gold-primary)] text-[var(--gold-primary)] px-8 py-4 hover:bg-[var(--gold-primary)] hover:text-[#111]`,

  'dark-ghost': `${base} border border-[#1A1A1A] text-[#1A1A1A] px-8 py-4 hover:bg-[#1A1A1A] hover:text-white`,

  text: `${base} text-[var(--gold-primary)] hover:underline underline-offset-4`,
}

export function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className,
  external,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = `${variants[variant]} ${className ?? ''}`.trim()

  if (href && !disabled) {
    return external ? (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    ) : (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={classes}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
