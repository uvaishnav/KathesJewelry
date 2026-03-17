import type { Metadata } from 'next'
import { sanityClient } from '@/lib/sanity/client'
import { featuredProductsQuery, testimonialsQuery } from '@/lib/sanity/queries'
import type { Product } from '@/components/ui/ProductCard'
import type { Testimonial } from '@/components/ui/TestimonialCard'

import { Hero } from '@/components/sections/homepage/Hero'
import { TrustBar } from '@/components/sections/homepage/TrustBar'
import { ServicesGrid } from '@/components/sections/homepage/ServicesGrid'
import { CategoryMosaic } from '@/components/sections/homepage/CategoryMosaic'
import { FeaturedProducts } from '@/components/sections/homepage/FeaturedProducts'
import { OurStoryStrip } from '@/components/sections/homepage/OurStoryStrip'
import { Testimonials } from '@/components/sections/homepage/Testimonials'
import { VisitUs } from '@/components/sections/homepage/VisitUs'
import { InstagramFeed } from '@/components/sections/homepage/InstagramFeed'

export const metadata: Metadata = {
  title: "Kathe's Jewelry | New York's Trusted Jeweler Since 1993",
  description:
    "Custom jewelry design, expert repairs & fine jewelry in NYC's East Village. Family-owned since 1993. GIA-certified gemologist. 4.8★ rated on Google & Yelp.",
  openGraph: {
    title: "Kathe's Jewelry — East Village NYC",
    description:
      "Handcrafted. Trusted. New York's Own. Since 1993. Visit us at 226 1st Ave, East Village.",
    images: [{ url: '/images/hero-store-interior.webp', width: 1200, height: 630 }],
  },
}

export default async function HomePage() {
  const [products, testimonials] = await Promise.all([
    sanityClient.fetch<Product[]>(featuredProductsQuery).catch(() => []),
    sanityClient.fetch<Testimonial[]>(testimonialsQuery).catch(() => []),
  ])

  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <CategoryMosaic />
      <FeaturedProducts products={products} />
      <OurStoryStrip />
      <Testimonials testimonials={testimonials} />
      <VisitUs />
      <InstagramFeed />
    </>
  )
}
