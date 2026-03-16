import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook } from 'lucide-react'

const EXPLORE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Shop', href: '/shop' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact-us' },
] as const

const SERVICE_LINKS = [
  { label: 'Expert Repairs', href: '/services#repairs' },
  { label: 'Custom Design', href: '/services#custom-design' },
  { label: 'Buy Gold & Silver', href: '/services#buy-gold' },
  { label: 'Estate Jewelry', href: '/services#estate-jewelry' },
  { label: 'Watch Repair', href: '/services#watch-repair' },
] as const

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms-and-conditions' },
  { label: 'Returns', href: '/returns-policy' },
] as const

export function Footer() {
  return (
    <footer className="border-t border-[var(--gold-primary)]/20 bg-[var(--dark-base)]">
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,5vw,80px)] py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <div>
            <Link href="/" aria-label="Kathe's Jewelry — Home">
              <Image
                src="/icons/logo.svg"
                alt="Kathe's Jewelry logo — East Village NYC"
                width={160}
                height={96}
                className="logo-img h-12 w-auto"
              />
            </Link>
            <p className="mt-3 font-body text-[15px] italic text-[var(--text-muted)]">
              Family-owned. East Village, NYC. Since 1993.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://instagram.com/jonaskathesjewelry"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Kathe's Jewelry on Instagram"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/60 transition-colors duration-200 hover:border-[var(--gold-primary)] hover:text-[var(--gold-primary)]"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com/KathesJewelry"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Kathe's Jewelry on Facebook"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/60 transition-colors duration-200 hover:border-[var(--gold-primary)] hover:text-[var(--gold-primary)]"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>

            {/* Review Badges */}
            <div className="mt-4 flex gap-4">
              <a
                href="https://www.google.com/search?q=Kathe%27s+Jewelry+Reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[11px] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--gold-primary)]"
              >
                Google 4.8★
              </a>
              <a
                href="https://www.yelp.com/biz/kathes-jewelry-new-york"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[11px] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--gold-primary)]"
              >
                Yelp 4.8★
              </a>
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div>
            <h3 className="mb-6 font-sans text-[11px] font-semibold uppercase tracking-[3px] text-[var(--gold-primary)]">
              Explore
            </h3>
            <ul className="space-y-1">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1 font-body text-[14px] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--gold-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h3 className="mb-6 font-sans text-[11px] font-semibold uppercase tracking-[3px] text-[var(--gold-primary)]">
              Our Services
            </h3>
            <ul className="space-y-1">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1 font-body text-[14px] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--gold-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Visit Us */}
          <div>
            <h3 className="mb-6 font-sans text-[11px] font-semibold uppercase tracking-[3px] text-[var(--gold-primary)]">
              Visit Us
            </h3>
            <address className="not-italic">
              <p className="mb-1 font-serif font-semibold text-white">
                Kathe&apos;s Jewelry
              </p>
              <p className="font-body text-[14px] text-[var(--text-muted)]">
                226 1st Avenue
              </p>
              <p className="font-body text-[14px] text-[var(--text-muted)]">
                East Village, New York, NY 10009
              </p>
            </address>

            {/* Hours */}
            <div className="mt-4">
              <p className="font-body text-[13px] text-[var(--text-muted)]">
                Mon–Sat: 10:00 AM – 6:00 PM
              </p>
              <p className="font-body text-[13px] text-[var(--text-muted)]">
                Sunday: Closed
              </p>
            </div>

            {/* Phone */}
            <a
              href="tel:+12124752986"
              className="mt-4 block font-sans text-[16px] font-bold text-white transition-colors duration-200 hover:text-[var(--gold-primary)]"
            >
              (212) 475-2986
            </a>

            {/* Email */}
            <a
              href="mailto:kathesjewelry@gmail.com"
              className="mt-2 block font-body text-[14px] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--gold-primary)]"
            >
              kathesjewelry@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--gold-primary)]/10 pt-8 md:flex-row">
          <p className="font-body text-[13px] text-[var(--text-muted)]">
            © {new Date().getFullYear()} Kathe&apos;s Jewelry. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[12px] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--gold-primary)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
