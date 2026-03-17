import { type SchemaTypeDefinition } from 'sanity'

const product: SchemaTypeDefinition = {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Product Name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Rings', value: 'Rings' },
          { title: 'Necklaces', value: 'Necklaces' },
          { title: 'Bracelets', value: 'Bracelets' },
          { title: 'Earrings', value: 'Earrings' },
          { title: "Men's", value: "Men's" },
          { title: "Women's", value: "Women's" },
          { title: 'Estate & Vintage', value: 'Estate & Vintage' },
          { title: 'Custom', value: 'Custom' },
        ],
      },
    },
    {
      name: 'material',
      type: 'string',
      title: 'Material',
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price (USD)',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 4,
    },
    {
      name: 'specs',
      type: 'text',
      title: 'Specifications',
      rows: 3,
    },
    {
      name: 'inStock',
      type: 'boolean',
      title: 'In Stock',
      initialValue: true,
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured on Homepage',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'images.0',
    },
  },
}

const testimonial: SchemaTypeDefinition = {
  name: 'testimonial',
  type: 'document',
  title: 'Testimonial',
  fields: [
    {
      name: 'quote',
      type: 'text',
      title: 'Quote',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'reviewer',
      type: 'string',
      title: 'Reviewer Name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'platform',
      type: 'string',
      title: 'Review Platform',
      options: {
        list: [
          { title: 'Google', value: 'Google' },
          { title: 'Yelp', value: 'Yelp' },
          { title: 'TrustAnalytica', value: 'TrustAnalytica' },
        ],
      },
    },
    {
      name: 'sourceURL',
      type: 'url',
      title: 'Source URL (link to review)',
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured on Homepage',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'reviewer',
      subtitle: 'platform',
    },
  },
}

const faqItem: SchemaTypeDefinition = {
  name: 'faqItem',
  type: 'document',
  title: 'FAQ Item',
  fields: [
    {
      name: 'question',
      type: 'string',
      title: 'Question',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'answer',
      type: 'text',
      title: 'Answer',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Repairs', value: 'repairs' },
          { title: 'Custom Design', value: 'custom-design' },
          { title: 'Buying & Selling', value: 'buying-selling' },
          { title: 'General', value: 'general' },
        ],
      },
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
  },
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, testimonial, faqItem],
}
