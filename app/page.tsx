
import { sanityClient } from '@/lib/sanity/client';
import groq from 'groq';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface Product {
    _id: string;
    name: string;
    slug: {
        current: string;
    };
    images: SanityImageSource[];
    price: number;
}

const productsQuery = groq`
    *[_type == "product"] | order(_createdAt desc) [0...4] {
        _id,
        name,
        slug,
        images,
        price
    }
`;

export default async function Home() {
    const products: Product[] = await sanityClient.fetch(productsQuery);

    return (
        <div>
            <section className="bg-gray-100 py-20 text-center">
                <h1 className="text-5xl font-bold mb-4">Kathe&apos;s Jewelry</h1>
                <p className="text-xl text-gray-600">New York&apos;s Trusted Jeweler Since 1993</p>
            </section>
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <Link key={product._id} href={`/shop/${product.slug.current}`} className="group">
                                <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
                                    {product.images && product.images.length > 0 ? (
                                        <Image
                                            src={urlFor(product.images[0]).url()}
                                            alt={product.name}
                                            width={500}
                                            height={500}
                                            className="w-full h-full object-center object-cover group-hover:opacity-75"
                                        />
                                    ) : (
                                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                                            <p>No image available</p>
                                        </div>
                                    )}
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
