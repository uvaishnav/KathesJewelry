import { MapPin, Clock, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const HOURS = [
  { day: 'Monday', hours: '10:00 AM – 6:00 PM' },
  { day: 'Tuesday', hours: '10:00 AM – 6:00 PM' },
  { day: 'Wednesday', hours: '10:00 AM – 6:00 PM' },
  { day: 'Thursday', hours: '10:00 AM – 6:00 PM' },
  { day: 'Friday', hours: '10:00 AM – 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM – 6:00 PM' },
  { day: 'Sunday', hours: 'Closed', closed: true },
]

export function VisitUs() {
  return (
    <section
      className="bg-[var(--warm-cream)]"
      aria-label="Visit our store"
    >
      <div className="py-[var(--section-padding)] px-[var(--container-padding)]">
        <div
          style={{ maxWidth: 'var(--max-width)' }}
          className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left — Info */}
          <div>
            {/* Eyebrow */}
            <span className="font-sans text-[11px] tracking-[4px] uppercase text-[var(--gold-primary)] block mb-4">
              We&apos;re Right Here
            </span>

            {/* Gold divider */}
            <div className="w-16 h-[2px] bg-[var(--gold-primary)] mb-6" aria-hidden="true" />

            <h2
              className="font-serif font-semibold text-[var(--text-on-light)] leading-[1.15] tracking-tight mb-8"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              Come See Us in the East Village.
            </h2>

            <p className="font-body text-[16px] text-[var(--text-secondary)] leading-[1.7] mb-8">
              No appointment needed for most services.
              Walk in, and we&apos;ll take care of you.
            </p>

            {/* Address Block */}
            <div className="flex gap-4 mb-6">
              <MapPin
                className="w-5 h-5 text-[var(--gold-primary)] shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <p className="font-sans text-[11px] tracking-[2px] uppercase text-[var(--gold-primary)] mb-2">
                  Find Us
                </p>
                <p className="font-body text-[17px] text-[var(--text-on-light)] font-semibold">
                  Kathe&apos;s Jewelry
                </p>
                <p className="font-body text-[17px] text-[var(--text-secondary)]">
                  226 1st Avenue
                </p>
                <p className="font-body text-[17px] text-[var(--text-secondary)]">
                  New York, NY 10009
                </p>
                <p className="font-body text-[13px] text-[var(--text-muted)] italic mt-1">
                  Between E 13th St &amp; E 14th St · East Village
                </p>
                <a
                  href="https://maps.google.com/?q=Kathe%27s+Jewelry+226+1st+Avenue+New+York+NY+10009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 font-sans text-[12px] tracking-[1.5px] uppercase text-[var(--gold-primary)] hover:underline underline-offset-4"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4 mb-6">
              <Clock
                className="w-5 h-5 text-[var(--gold-primary)] shrink-0 mt-1"
                aria-hidden="true"
              />
              <div className="flex-1">
                <p className="font-sans text-[11px] tracking-[2px] uppercase text-[var(--gold-primary)] mb-3">
                  Store Hours
                </p>
                <div className="space-y-1.5">
                  {HOURS.map(({ day, hours, closed }) => (
                    <div
                      key={day}
                      className="flex justify-between border-b border-[var(--border-subtle)] pb-1.5"
                    >
                      <span className="font-body text-[15px] text-[var(--text-secondary)]">
                        {day}
                      </span>
                      <span
                        className={`font-body text-[15px] ${
                          closed
                            ? 'text-[var(--text-muted)] italic'
                            : 'text-[var(--text-on-light)] font-medium'
                        }`}
                      >
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="font-body text-[12px] text-[var(--text-muted)] italic mt-2">
                  Hours may vary on public holidays. Call ahead to confirm.
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 mb-6">
              <Phone
                className="w-5 h-5 text-[var(--gold-primary)] shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <p className="font-sans text-[11px] tracking-[2px] uppercase text-[var(--gold-primary)] mb-1">
                  Call Us
                </p>
                <a
                  href="tel:+12124752986"
                  className="font-sans text-[22px] font-bold text-[var(--text-on-light)] hover:text-[var(--gold-primary)] transition-colors duration-200 block"
                >
                  (212) 475-2986
                </a>
                <p className="font-body text-[13px] text-[var(--text-muted)] mt-0.5">
                  Mon – Sat, 10am – 6pm
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 mb-8">
              <Mail
                className="w-5 h-5 text-[var(--gold-primary)] shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <p className="font-sans text-[11px] tracking-[2px] uppercase text-[var(--gold-primary)] mb-1">
                  Email Us
                </p>
                <a
                  href="mailto:kathesjewelry@gmail.com"
                  className="font-body text-[17px] text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors duration-200 block"
                >
                  kathesjewelry@gmail.com
                </a>
                <p className="font-body text-[13px] text-[var(--text-muted)] mt-0.5">
                  We typically respond within 1 business day.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                href="https://maps.google.com/?q=Kathe%27s+Jewelry+226+1st+Avenue+New+York+NY+10009"
                external
                aria-label="Get directions to Kathe's Jewelry (opens Google Maps)"
              >
                Get Directions
              </Button>
              <Button variant="ghost" href="tel:+12124752986">
                Call Us Now
              </Button>
            </div>
          </div>

          {/* Right — Google Map */}
          <div className="w-full overflow-hidden" style={{ height: '480px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.1547!2d-73.98076!3d40.73176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25990a5f6f4ad%3A0x4a52b4e2c06b3e52!2sKathe&#39;s%20Jewelry!5e0!3m2!1sen!2sus!4v1"
              className="w-full h-full border-0"
              loading="lazy"
              title="Kathe's Jewelry — 226 1st Avenue East Village NYC"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* Gold CTA Strip */}
      <div className="bg-[var(--charcoal)] py-10 px-[var(--container-padding)]">
        <div
          style={{ maxWidth: 'var(--max-width)' }}
          className="mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="font-serif text-[20px] font-semibold text-white mb-1">
              Can&apos;t make it in?
            </p>
            <p className="font-body text-[15px] text-[var(--text-muted)]">
              Send us a photo of your piece and we&apos;ll advise you from there.
            </p>
          </div>
          <Button variant="primary" href="/contact-us">
            Send Us a Message
          </Button>
        </div>
      </div>
    </section>
  )
}
