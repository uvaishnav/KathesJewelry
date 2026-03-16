import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="font-sans text-[12px]">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-[var(--gold-primary)]" aria-hidden="true">
                  /
                </span>
              )}

              {isLast ? (
                <span className="text-[var(--text-on-light)] font-medium">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href ?? '/'}
                  className="text-[var(--text-meta)] hover:text-[var(--gold-primary)] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
