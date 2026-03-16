import { z } from 'zod/v4'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormData = z.infer<typeof contactSchema>

export const subjectOptions = [
  'General Inquiry',
  'Jewelry Repair',
  'Custom Design',
  'Sell My Gold/Silver',
  'Estate Jewelry',
  'Watch Repair',
  'Product Enquiry',
] as const
