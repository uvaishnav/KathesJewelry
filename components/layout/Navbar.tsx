'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Phone, Menu } from 'lucide-react'
import { MobileMenu } from './MobileMenu'

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Shop',     href: '/shop' },
  { label: 'FAQ',      href: '/faq' },
  { label: 'Contact',  href: '/contact-us' },
] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 60)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  const solidBg = !isHomepage || scrolled

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          !solidBg ? 'h-20 bg-transparent' : 'h-16 bg-[#111]/92 backdrop-blur-md'
        }`}
        style={{
          boxShadow: solidBg ? '0 1px 0 rgba(201,169,110,0.12), 0 4px 24px rgba(0,0,0,0.35)' : 'none',
        }}
      >
        {/* Top gold line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5) 50%, transparent)' }}
          aria-hidden="true"
        />

        <nav
          className="mx-auto flex h-full items-center justify-between"
          style={{ maxWidth: 'var(--max-width)', padding: '0 var(--container-padding)' }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" aria-label="Kathe's Jewelry — Home" className="shrink-0">
            <Image
              src="/icons/logo.svg"
              alt="Kathe's Jewelry logo"
              width={200}
              height={100}
              priority
              className="logo-img w-auto"
              style={{
                height: !solidBg ? '3rem' : '2.25rem',
                transition: 'height 0.5s cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          </Link>

          {/* Desktop nav links — ONLY shown lg+, NO inline display style */}
          <ul className="hidden lg:flex items-center gap-7 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative font-sans font-medium uppercase text-[12px] tracking-[0.12em] no-underline transition-colors duration-200 pb-0.5"
                  style={{ color: isActive(link.href) ? 'var(--gold-primary)' : 'rgba(255,255,255,0.82)' }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-px left-0 h-px bg-[var(--gold-primary)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                    style={{ width: isActive(link.href) ? '100%' : '0%' }}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop phone CTA — ONLY shown lg+ */}
          <a
            href="tel:+12124752986"
            className="btn-shimmer hidden lg:flex items-center gap-2 font-sans font-semibold uppercase text-[11px] tracking-[0.18em] shrink-0"
            style={{
              color: '#111',
              background: 'var(--gold-primary)',
              padding: '0.625rem 1.25rem',
              textDecoration: 'none',
              transition: 'background 0.2s ease',
            }}
            aria-label="Call Kathe's Jewelry"
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            (212) 475-2986
          </a>

          {/* Mobile hamburger — ONLY shown below lg */}
          <button
            className="flex lg:hidden items-center justify-center p-2 text-white"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
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
