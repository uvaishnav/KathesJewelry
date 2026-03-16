'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, Phone } from 'lucide-react'
import { AnimatePresence, m, LazyMotion, domAnimation } from 'motion/react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: Array<{ label: string; href: string }>
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <LazyMotion features={domAnimation}>
          <m.div
            className="fixed inset-0 z-[60] flex flex-col bg-[#111111]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Close Button */}
            <div className="flex justify-end p-6">
              <button
                onClick={onClose}
                className="p-2 text-white transition-colors duration-200 hover:text-[var(--gold-primary)]"
                aria-label="Close navigation menu"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-8">
              {links.map((link, i) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`block border-b border-white/10 py-3 font-serif text-[28px] transition-colors duration-200 ${
                      isActive(link.href)
                        ? 'text-[var(--gold-primary)]'
                        : 'text-white hover:text-[var(--gold-primary)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
            </nav>

            {/* Bottom Strip — Phone + Hours */}
            <div className="border-t border-white/10 px-8 pb-12 pt-8">
              <a
                href="tel:+12124752986"
                className="flex items-center justify-center gap-3 font-sans text-[18px] font-semibold text-[var(--gold-primary)] transition-colors duration-200 hover:text-[var(--gold-light)]"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                (212) 475-2986
              </a>
              <p className="mt-3 text-center font-body text-[14px] text-[var(--text-muted)]">
                Mon–Sat · 10:00 AM – 6:00 PM
              </p>
            </div>
          </m.div>
        </LazyMotion>
      )}
    </AnimatePresence>
  )
}
