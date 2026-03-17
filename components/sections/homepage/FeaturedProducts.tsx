'use client'

import { useState } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ProductCard, type Product } from '@/components/ui/ProductCard'
import { EnquiryModal } from '@/components/shared/EnquiryModal'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface FeaturedProductsProps {
  products: Product[]
}

function SkeletonCard() {
  return (
    <div className="bg-white shadow-[0_2px_20px_rgba(0,0,0,0.07)] flex flex-col animate-pulse">
      <div className="aspect-square bg-[var(--warm-cream)]" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-3 bg-[var(--border-subtle)] rounded w-1/3" />
        <div className="h-5 bg-[var(--border-subtle)] rounded w-3/4" />
        <div className="h-3 bg-[var(--border-subtle)] rounded w-1/2" />
        <div className="h-6 bg-[var(--border-subtle)] rounded w-1/4 mt-1" />
        <div className="h-11 bg-[var(--border-subtle)] rounded mt-2" />
      </div>
    </div>
  )
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [enquiryProduct, setEnquiryProduct] = useState<string | null>(null)
  const hasProducts = products && products.length > 0

  return (
    <section
      className="bg-white py-[var(--section-padding)] px-[var(--container-padding)]"
      aria-label="Featured products"
    >
      <div style={{ maxWidth: 'var(--max-width)' }} className="mx-auto">
        <SectionHeader
          eyebrow="Hand-Selected Pieces"
          heading="Featured Jewelry"
          subtext="Each piece in our collection is hand-selected by our in-house GIA gemologist. Quality you can see. Craftsmanship you can feel."
          align="center"
          theme="light"
        />

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hasProducts
            ? products.map((product, i) => (
                <ScrollReveal key={product._id} delay={i * 0.08}>
                  <ProductCard product={product} onEnquire={setEnquiryProduct} />
                </ScrollReveal>
              ))
            : Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>

        {!hasProducts && (
          <p className="font-body text-[var(--text-secondary)] text-center mt-8 text-[15px] italic">
            Products loading — add items in Sanity Studio
          </p>
        )}

        {/* Browse All CTA */}
        <div className="mt-12 text-center">
          <Button variant="primary" href="/shop">
            Browse Full Collection
          </Button>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={!!enquiryProduct}
        onClose={() => setEnquiryProduct(null)}
        productName={enquiryProduct ?? ''}
      />
    </section>
  )
}
