import { groq } from 'next-sanity'

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true][0...4] {
    _id,
    name,
    "slug": slug.current,
    category,
    material,
    price,
    "image": images[0].asset->url
  }
`

export const testimonialsQuery = groq`
  *[_type == "testimonial" && featured == true][0...3] {
    _id,
    quote,
    reviewer,
    platform,
    sourceURL
  }
`

export const productsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    category,
    material,
    price,
    inStock,
    featured,
    "image": images[0].asset->url,
    "images": images[].asset->url,
    description,
    specs
  }
`

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    category,
    material,
    price,
    "images": images[].asset->url,
    description,
    specs,
    inStock
  }
`

export const faqQuery = groq`
  *[_type == "faqItem"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`
