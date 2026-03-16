
import { sanityClient } from '@/lib/sanity/client';
import { notFound } from 'next/navigation';
import groq from 'groq';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PortableTextBlock } from '@portabletext/types';

type Props = {
    params: Promise<{ slug: string }>;
};

interface Product {
    _id: string;
    name: string;
    slug: {
        current: string;
    };
    description: PortableTextBlock[];
    images: SanityImageSource[];
    price: number;
}

const productQuery = groq`
    *[_type == "product" && slug.current == $slug][0] {
        _id,
        name,
        slug,
        description,
        images,
        price
    }
`;

export default async function Page({ params }: Props) {
    const { slug } = await params;

    if (!slug) {
        notFound();
    }

    let product: Product | null = null;
    try {
        product = await sanityClient.fetch(productQuery, {
            slug,
        });
    } catch (error) {
        console.error('Error fetching product from Sanity:', error);
        // We could also redirect to a custom error page or show a friendly message
    }

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)] py-24">
            <div className="mb-8 font-sans text-[13px] uppercase tracking-[1px] text-[var(--text-meta)]">
                <Link href="/shop" className="hover:text-[var(--gold-primary)] transition-colors">Shop</Link> 
                <span className="mx-2">/</span> 
                <span className="text-[var(--gold-primary)]">{product.name}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    {product.images && product.images.length > 0 ? (
                        product.images.map((image, index) => (
                            <Image
                                key={index}
                                src={urlFor(image).url()}
                                alt={`${product.name} — Kathe's Jewelry NYC`}
                                width={800}
                                height={800}
                                className="w-full h-auto object-cover border border-white/5"
                                priority={index === 0}
                            />
                        ))
                    ) : (
                        <div className="aspect-square bg-[var(--dark-card)] flex items-center justify-center border border-white/5">
                            <p className="font-body text-[var(--text-muted)]">No image available</p>
                        </div>
                    )}
                </div>
                <div className="md:sticky md:top-24 h-fit">
                    <h1 className="font-serif text-[clamp(1.8rem,4vw,3.25rem)] font-semibold mb-2">{product.name}</h1>
                    <p className="font-sans font-bold text-2xl text-[var(--gold-primary)] mb-8">${product.price}</p>
                    <div className="prose prose-invert prose-brand max-w-none">
                        <PortableText value={product.description} />
                    </div>

                    <div className="mt-12 space-y-4">
                        <a href="tel:+12124752986" className="flex items-center justify-center gap-3 bg-[var(--gold-primary)] px-8 py-4 font-sans text-[12px] font-semibold uppercase tracking-[2px] text-[#111] transition-all duration-200 hover:bg-[var(--gold-light)]">
                            Call to enquire
                        </a>
                        <button className="w-full border border-white/20 px-8 py-4 font-sans text-[12px] font-semibold uppercase tracking-[2px] text-white transition-all duration-200 hover:bg-white/10 hover:border-white">
                            Send an enquiry
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
