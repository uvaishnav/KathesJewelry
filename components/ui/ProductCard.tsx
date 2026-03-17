'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ImageOff } from 'lucide-react'

export interface Product {
  _id: string
  name: string
  slug: string
  category: string
  material: string
  price: number
  image: string | null
}

export interface ProductCardProps {
  product: Product
  onEnquire: (name: string) => void
}

export function ProductCard({ product, onEnquire }: ProductCardProps) {
  return (
    <div
      className="group bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)]
                 hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)]
                 hover:-translate-y-1
                 transition-all duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                 flex flex-col"
    >
      {/* Image */}
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="aspect-square overflow-hidden bg-[var(--warm-cream)] relative">
          {product.image ? (
            <Image
              src={product.image}
              alt={`${product.name} — ${product.material} | Kathe's Jewelry NYC`}
              width={400}
              height={400}
              className="object-cover w-full h-full
                         group-hover:scale-105
                         transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              placeholder="empty"
            />
          ) : (
            /* Elegant no-image placeholder — shows while product photos are being added */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--warm-cream)]">
              <div className="w-16 h-16 rounded-full border border-[var(--border-subtle)] flex items-center justify-center">
                <ImageOff className="w-7 h-7 text-[var(--gold-primary)]/40" aria-hidden="true" />
              </div>
              <span className="font-sans text-[10px] tracking-[2px] uppercase text-[var(--text-muted)]">
                Photo Coming Soon
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category tag */}
        <span className="font-sans text-[10px] tracking-[3px] text-[var(--gold-primary)] uppercase mb-2">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="font-serif text-[18px] font-semibold text-[var(--text-on-light)] mb-1 leading-snug">
          {product.name}
        </h3>

        {/* Material */}
        <p className="font-body text-[14px] text-[var(--text-meta)] italic mb-3">
          {product.material}
        </p>

        {/* Price */}
        <p className="font-sans text-[20px] font-bold text-[var(--text-on-light)] mb-4">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          }).format(product.price)}
        </p>

        {/* Actions */}
        <div className="border-t border-[var(--gold-primary)]/15 pt-4 mt-auto flex flex-col gap-2">
          <button
            onClick={() => onEnquire(product.name)}
            className="w-full border border-[var(--gold-primary)] text-[var(--gold-primary)]
                       font-sans font-semibold text-[11px] tracking-[2px] uppercase py-3
                       hover:bg-[var(--gold-primary)] hover:text-[#111]
                       transition-all duration-200"
          >
            Enquire About This Piece
          </button>
          <Link
            href={`/shop/${product.slug}`}
            className="text-center font-sans text-[10px] tracking-[2px] uppercase
                       text-[var(--text-muted)] hover:text-[var(--gold-primary)]
                       transition-colors duration-150 py-1"
          >
            View Full Details →
          </Link>
        </div>
      </div>
    </div>
  )
}
