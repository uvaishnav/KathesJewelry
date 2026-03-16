
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
    params: { slug: string };
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
    const product: Product = await sanityClient.fetch(productQuery, {
        slug: params.slug,
    });

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <Link href="/shop">Shop</Link> / <span>{product.name}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <div className="grid grid-cols-1 gap-4">
                        {product.images && product.images.length > 0 ? (
                            product.images.map((image, index) => (
                                <Image
                                    key={index}
                                    src={urlFor(image).url()}
                                    alt={`${product.name} image ${index + 1}`}
                                    width={800}
                                    height={800}
                                    className="w-full h-auto object-cover"
                                />
                            ))
                        ) : (
                            <div className="w-full h-[800px] bg-gray-200 flex items-center justify-center">
                                <p>No image available</p>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-2xl font-bold text-gray-800 mb-4">${product.price}</p>
                    <div className="prose">
                        <PortableText value={product.description} />
                    </div>
                </div>
            </div>
        </div>
    );
}
