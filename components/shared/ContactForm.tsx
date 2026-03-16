'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle } from 'lucide-react'
import { contactSchema, type ContactFormData, subjectOptions } from '@/lib/schema/contact'

interface ContactFormProps {
  prefilledSubject?: string
}

export function ContactForm({ prefilledSubject }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: prefilledSubject ?? 'General Inquiry',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center text-center py-12">
        <CheckCircle className="w-12 h-12 text-[var(--gold-primary)] mb-4" />
        <h3 className="font-serif text-[24px] font-semibold text-[var(--text-on-light)] mb-2">
          Message Sent
        </h3>
        <p className="font-body text-[15px] text-[var(--text-secondary)] max-w-sm">
          Jonas will reply within 24 hours — usually much sooner.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="block font-sans text-[11px] tracking-[1.5px] uppercase text-[var(--text-secondary)] mb-2"
        >
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          {...register('name')}
          className="w-full border border-[var(--border-subtle)] bg-white px-4 py-3
                     font-body text-[16px] text-[var(--text-on-light)]
                     focus:border-[var(--gold-primary)] focus:ring-0 focus:outline-none
                     transition-colors duration-200"
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="mt-1 font-sans text-[12px] text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="block font-sans text-[11px] tracking-[1.5px] uppercase text-[var(--text-secondary)] mb-2"
        >
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          {...register('email')}
          className="w-full border border-[var(--border-subtle)] bg-white px-4 py-3
                     font-body text-[16px] text-[var(--text-on-light)]
                     focus:border-[var(--gold-primary)] focus:ring-0 focus:outline-none
                     transition-colors duration-200"
          placeholder="you@email.com"
        />
        {errors.email && (
          <p className="mt-1 font-sans text-[12px] text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Phone (optional) */}
      <div>
        <label
          htmlFor="contact-phone"
          className="block font-sans text-[11px] tracking-[1.5px] uppercase text-[var(--text-secondary)] mb-2"
        >
          Phone Number <span className="text-[var(--text-meta)]">(optional)</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          {...register('phone')}
          className="w-full border border-[var(--border-subtle)] bg-white px-4 py-3
                     font-body text-[16px] text-[var(--text-on-light)]
                     focus:border-[var(--gold-primary)] focus:ring-0 focus:outline-none
                     transition-colors duration-200"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="contact-subject"
          className="block font-sans text-[11px] tracking-[1.5px] uppercase text-[var(--text-secondary)] mb-2"
        >
          Subject <span className="text-red-500">*</span>
        </label>
        <select
          id="contact-subject"
          {...register('subject')}
          className="w-full border border-[var(--border-subtle)] bg-white px-4 py-3
                     font-body text-[16px] text-[var(--text-on-light)]
                     focus:border-[var(--gold-primary)] focus:ring-0 focus:outline-none
                     transition-colors duration-200 appearance-none"
        >
          {subjectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className="mt-1 font-sans text-[12px] text-red-500">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block font-sans text-[11px] tracking-[1.5px] uppercase text-[var(--text-secondary)] mb-2"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          {...register('message')}
          className="w-full border border-[var(--border-subtle)] bg-white px-4 py-3
                     font-body text-[16px] text-[var(--text-on-light)]
                     focus:border-[var(--gold-primary)] focus:ring-0 focus:outline-none
                     transition-colors duration-200 resize-vertical"
          placeholder="How can we help you?"
        />
        {errors.message && (
          <p className="mt-1 font-sans text-[12px] text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Error state */}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 p-4">
          <p className="font-body text-[14px] text-red-700">
            Something went wrong. Please call us directly at{' '}
            <a href="tel:+12124752986" className="font-semibold underline">
              (212) 475-2986
            </a>
            .
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[var(--gold-primary)] text-[#111] font-sans font-semibold
                   text-[12px] tracking-[2px] uppercase py-4
                   hover:bg-[var(--gold-light)] transition-colors duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
