export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name: "Kathe's Jewelry",
    image: 'https://kathesjewelry.com/images/hero-store-interior.webp',
    '@id': 'https://kathesjewelry.com',
    url: 'https://kathesjewelry.com',
    telephone: '+12124752986',
    email: 'kathesjewelry@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '226 1st Avenue',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10009',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7305,
      longitude: -73.9843,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '200',
      bestRating: '5',
    },
    founder: {
      '@type': 'Person',
      name: 'Jonas Rueda',
      jobTitle: 'Master Jeweler & GIA-Certified Gemologist',
    },
    foundingDate: '1993',
    description:
      "Family-owned jewelry store in New York City's East Village since 1993. Expert repairs, custom design, estate jewelry, and gold buying by GIA-certified master jeweler Jonas Rueda.",
    priceRange: '$$',
    sameAs: [
      'https://instagram.com/jonaskathesjewelry',
      'https://facebook.com/KathesJewelry',
      'https://yelp.com/biz/kathes-jewelry-new-york',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Jewelry Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Jewelry Repair',
            description: 'Ring resizing, chain soldering, stone replacement, clasp repair — all done in-house.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Jewelry Design',
            description: 'Engagement rings, wedding bands, pendants — designed and crafted to your specifications.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Gold & Silver Buying',
            description: 'Fair, transparent pricing for jewelry, coins, and scrap precious metals.',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
