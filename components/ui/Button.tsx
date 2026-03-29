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

const base =
  'btn-shimmer inline-flex items-center justify-center gap-2 font-sans font-semibold text-[12px] tracking-[2px] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[var(--gold-primary)] focus-visible:outline-offset-2 relative overflow-hidden'

const variants: Record<ButtonVariant, string> = {
  primary: [
    base,
    'bg-[var(--gold-primary)] text-[#111] px-8 py-4',
    // shadow grows on hover, slight lift
    'shadow-[0_2px_0_rgba(0,0,0,0.15)]',
    'hover:bg-[var(--gold-light)] hover:-translate-y-[2px]',
    'hover:shadow-[0_6px_24px_rgba(201,169,110,0.45),0_2px_0_rgba(0,0,0,0.1)]',
    'active:translate-y-0 active:shadow-[0_1px_0_rgba(0,0,0,0.2)]',
  ].join(' '),

  ghost: [
    base,
    'border border-[var(--gold-primary)] text-[var(--gold-primary)] px-8 py-4',
    'hover:bg-[var(--gold-primary)] hover:text-[#111] hover:-translate-y-[2px]',
    'hover:shadow-[0_6px_20px_rgba(201,169,110,0.3)]',
    'active:translate-y-0',
  ].join(' '),

  'dark-ghost': [
    base,
    'border border-[#1A1A1A] text-[#1A1A1A] px-8 py-4',
    'hover:bg-[#1A1A1A] hover:text-white hover:-translate-y-[2px]',
    'hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]',
    'active:translate-y-0',
  ].join(' '),

  text: [
    base,
    'text-[var(--gold-primary)]',
    'after:content-[""] after:absolute after:bottom-0 after:left-0',
    'after:w-full after:h-px after:bg-[var(--gold-primary)]',
    'after:scale-x-0 after:origin-left after:transition-transform after:duration-300',
    'hover:after:scale-x-100',
  ].join(' '),
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
