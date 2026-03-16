'use client'

import Image from 'next/image'
import Link from 'next/link'

export interface Product {
  _id: string
  name: string
  slug: string
  category: string
  material: string
  price: number
  image: string
}

export interface ProductCardProps {
  product: Product
  onEnquire: (name: string) => void
}

export function ProductCard({ product, onEnquire }: ProductCardProps) {
  return (
    <div
      className="group bg-white shadow-[0_2px_20px_rgba(0,0,0,0.07)]
                 hover:shadow-[0_8px_40px_rgba(0,0,0,0.13)]
                 hover:-translate-y-1
                 transition-all duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                 flex flex-col"
    >
      {/* Image */}
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="aspect-square overflow-hidden bg-[var(--warm-cream)]">
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
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="font-sans text-[10px] tracking-[3px] text-[var(--gold-primary)] uppercase mb-2">
          {product.category}
        </span>

        <h3 className="font-serif text-[18px] font-semibold text-[var(--text-on-light)] mb-1 leading-snug">
          {product.name}
        </h3>

        <p className="font-body text-[14px] text-[var(--text-meta)] italic mb-3">
          {product.material}
        </p>

        <p className="font-sans text-[20px] font-bold text-[var(--text-on-light)] mb-4">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(product.price)}
        </p>

        <div className="border-t border-[var(--gold-primary)]/20 pt-4 mt-auto">
          <button
            onClick={() => onEnquire(product.name)}
            className="w-full border border-[var(--gold-primary)] text-[var(--gold-primary)]
                       font-sans font-semibold text-[11px] tracking-[2px] uppercase py-3
                       hover:bg-[var(--gold-primary)] hover:text-[#111]
                       transition-all duration-200"
          >
            Enquire About This Piece
          </button>
        </div>
      </div>
    </div>
  )
}
