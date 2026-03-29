import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'

export function InstagramFeed() {
  const feedId = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID

  return (
    <section
      className="relative py-[var(--section-padding)] px-[var(--container-padding)]"
      style={{
        backgroundColor: 'var(--dark-base)',
        backgroundImage: [
          'radial-gradient(ellipse at 85% 10%, rgba(201,169,110,0.12) 0%, transparent 48%)',
          'radial-gradient(ellipse at 10% 90%, rgba(201,169,110,0.10) 0%, transparent 45%)',
        ].join(', '),
      }}
      aria-label="Instagram feed"
    >
      <div style={{ maxWidth: 'var(--max-width)' }} className="mx-auto">
        <SectionHeader
          eyebrow="Behind the Bench"
          heading="Follow Our Story, One Piece at a Time."
          subtext="Every ring resized, every custom design, every piece that passes through our hands — Jonas shares it all on Instagram. 838 posts and counting."
          align="center"
          theme="dark"
        />

        {/* Feed */}
        {feedId ? (
          <div className="mt-12">
            <div id={`behold-widget-${feedId}`} />
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script
              dangerouslySetInnerHTML={{
                __html: `!function(w,d,s,o,f,js,fjs){w['Behold']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};js=d.createElement(s);fjs=d.getElementsByTagName(s)[0];js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);}(window,document,'script','behold','https://w.behold.so/widget.js');behold('show', { feedId: '${feedId}' });`,
              }}
            />
          </div>
        ) : (
          <div className="mt-12 text-center font-body text-[var(--text-muted)] text-[15px] italic py-8 border border-white/10">
            Instagram feed will appear here once Behold.so is configured.
            <br />
            <span className="font-sans text-[11px] tracking-[1.5px] not-italic mt-2 block">
              Add NEXT_PUBLIC_BEHOLD_FEED_ID to .env.local
            </span>
          </div>
        )}

        {/* Follow CTA */}
        <div className="mt-10 text-center">
          <p className="font-sans text-[11px] tracking-[3px] uppercase text-[var(--gold-primary)] mb-3">
            @jonaskathesjewelry
          </p>
          <p className="font-body text-[15px] text-[var(--text-muted)] mb-6">
            Join 1,500+ followers who see our work before it leaves the workshop.
          </p>
          <Button
            variant="ghost"
            href="https://instagram.com/jonaskathesjewelry"
            external
            aria-label="Follow Kathe's Jewelry on Instagram (opens in new tab)"
          >
            Follow Us on Instagram
          </Button>
          <p className="font-body text-[13px] text-[var(--text-muted)] italic mt-4">
            Real pieces. Real stories. No filters on our craftsmanship.
          </p>
        </div>
      </div>
    </section>
  )
}
