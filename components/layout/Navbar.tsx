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

  // Transparent only on homepage before scroll
  const solidBg = !isHomepage || scrolled

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          // Height: taller on homepage hero (gives logo more room), compact when scrolled / on inner pages
          height: !solidBg ? '5rem' : '4rem',
          background: solidBg
            ? 'rgba(17,17,17,0.92)'
            : 'transparent',
          backdropFilter: solidBg ? 'blur(12px)' : 'none',
          boxShadow: solidBg
            ? '0 1px 0 rgba(201,169,110,0.12), 0 4px 24px rgba(0,0,0,0.35)'
            : 'none',
          transition: 'height 0.5s cubic-bezier(0.22,1,0.36,1), background 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Top gold line — always visible */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5) 50%, transparent)',
          }}
          aria-hidden="true"
        />

        <nav
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            height: '100%',
            padding: '0 var(--container-padding)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          aria-label="Main navigation"
        >
          {/* Logo — larger on homepage hero, compact when scrolled */}
          <Link href="/" aria-label="Kathe's Jewelry — Home">
            <Image
              src="/icons/logo.svg"
              alt="Kathe's Jewelry logo"
              width={200}
              height={100}
              priority
              className="logo-img w-auto"
              style={{
                height: !solidBg ? '3.25rem' : '2.25rem',
                transition: 'height 0.5s cubic-bezier(0.22,1,0.36,1)',
                transformOrigin: 'left center',
              }}
            />
          </Link>

          {/* Desktop links */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', listStyle: 'none', margin: 0, padding: 0 }}
              className="hidden lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: isActive(link.href) ? 'var(--gold-primary)' : 'rgba(255,255,255,0.82)',
                    textDecoration: 'none',
                    position: 'relative',
                    paddingBottom: 2,
                    transition: 'color 0.2s ease',
                  }}
                  className="group hover:text-[var(--gold-primary)]"
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: -1,
                      left: 0,
                      height: 1,
                      width: isActive(link.href) ? '100%' : '0%',
                      background: 'var(--gold-primary)',
                      transition: 'width 0.3s cubic-bezier(0.22,1,0.36,1)',
                    }}
                    className="group-hover:!w-full"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Phone CTA */}
          <a
            href="tel:+12124752986"
            className="btn-shimmer hidden lg:flex items-center gap-2"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#111',
              background: 'var(--gold-primary)',
              padding: '0.625rem 1.25rem',
              textDecoration: 'none',
              transition: 'background 0.2s ease',
              flexShrink: 0,
              position: 'relative',
              overflow: 'hidden',
            }}
            aria-label="Call Kathe's Jewelry"
          >
            <Phone style={{ width: 14, height: 14 }} aria-hidden="true" />
            (212) 475-2986
          </a>

          {/* Mobile hamburger */}
          <button
            style={{ color: 'white', padding: 8, background: 'none', border: 'none', cursor: 'pointer' }}
            className="lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu style={{ width: 24, height: 24 }} />
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
