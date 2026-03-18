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

  // Only the homepage gets the transparent/expanded treatment
  const isHomepage = pathname === '/'

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 60)
    check() // run on mount
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  // On homepage: transparent until scrolled. On all other pages: always solid.
  const solidBg = !isHomepage || scrolled

  // Text color: white always works on dark bg. On inner pages (light bg) we still use
  // solid dark navbar so white text is fine.
  const navTextClass = solidBg
    ? 'text-white/85 hover:text-[var(--gold-primary)]'
    : 'text-white/90 hover:text-[var(--gold-primary)]'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          solidBg
            ? 'h-16 bg-[#111]/92 backdrop-blur-md shadow-[0_1px_0_rgba(201,169,110,0.15),0_4px_24px_rgba(0,0,0,0.4)]'
            : 'h-20 bg-transparent'
        }`}
      >
        {/* Thin gold top border — always visible */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold-primary)]/50 to-transparent" aria-hidden="true" />

        <nav
          className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-[clamp(20px,5vw,80px)]"
          aria-label="Main navigation"
        >
          {/* Logo — compact always; no more giant scaling that overlaps content */}
          <Link href="/" aria-label="Kathe's Jewelry — Home" className="relative flex items-center shrink-0">
            <Image
              src="/icons/logo.svg"
              alt="Kathe's Jewelry logo — East Village NYC"
              width={160}
              height={80}
              className={`logo-img w-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left ${
                solidBg ? 'h-9' : 'h-11'
              }`}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-sans text-[12px] font-medium uppercase tracking-[1.5px] transition-colors duration-200 relative group ${
                    isActive(link.href)
                      ? 'text-[var(--gold-primary)]'
                      : navTextClass
                  }`}
                >
                  {link.label}
                  {/* Animated gold underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[var(--gold-primary)] transition-all duration-300 ${
                      isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Phone CTA */}
          <a
            href="tel:+12124752986"
            className="hidden items-center gap-2 bg-[var(--gold-primary)] px-5 py-2.5
                       font-sans text-[11px] font-semibold uppercase tracking-[2px] text-[#111]
                       transition-all duration-200 hover:bg-[var(--gold-light)]
                       lg:flex shrink-0"
            aria-label="Call Kathe's Jewelry"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            (212) 475-2986
          </a>

          {/* Mobile hamburger */}
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
