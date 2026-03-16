'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Phone, Menu } from 'lucide-react'
import { MobileMenu } from './MobileMenu'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Shop', href: '/shop' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact-us' },
] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled
            ? 'bg-[#111]/85 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
        }`}
      >
        <nav
          className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-[clamp(20px,5vw,80px)]"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" aria-label="Kathe's Jewelry — Home" className="relative flex items-center">
            <Image
              src="/icons/logo.svg"
              alt="Kathe's Jewelry logo — East Village NYC"
              width={200}
              height={120}
              className={`logo-img w-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left ${
                scrolled
                  ? 'h-10 scale-100 translate-y-0'
                  : 'h-10 scale-[1.8] translate-y-4 md:scale-[2.5] md:translate-y-8'
              }`}
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-sans text-[13px] font-medium uppercase tracking-[1px] transition-colors duration-200 border-b-2 pb-0.5 ${
                    isActive(link.href)
                      ? 'text-[var(--gold-primary)] border-[var(--gold-primary)]'
                      : 'text-white/80 border-transparent hover:text-[var(--gold-primary)]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Phone CTA */}
          <a
            href="tel:+12124752986"
            className="hidden items-center gap-2 bg-[var(--gold-primary)] px-5 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[1.5px] text-[#111] transition-colors duration-200 hover:bg-[var(--gold-light)] lg:flex"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            (212) 475-2986
          </a>

          {/* Mobile Hamburger */}
          <button
            className="p-2 text-white lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS as unknown as Array<{ label: string; href: string }>}
      />
    </>
  )
}
