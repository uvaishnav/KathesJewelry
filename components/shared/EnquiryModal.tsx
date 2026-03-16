'use client'

import { useEffect, useCallback } from 'react'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react'
import { X } from 'lucide-react'
import { ContactForm } from './ContactForm'

interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
}

export function EnquiryModal({ isOpen, onClose, productName }: EnquiryModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEscape])

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <m.div
              className="fixed inset-0 bg-black/60 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Slide-in Panel */}
            <m.div
              role="dialog"
              aria-modal="true"
              aria-label={`Enquire about ${productName}`}
              className="fixed inset-y-0 right-0 w-full max-w-lg bg-white z-50
                         overflow-y-auto shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
            >
              <div className="p-6 md:p-8">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="mb-6 flex items-center gap-2 font-sans text-[12px] tracking-[2px] uppercase
                             text-[var(--text-secondary)] hover:text-[var(--text-on-light)]
                             transition-colors duration-200"
                  aria-label="Close enquiry modal"
                >
                  <X className="w-4 h-4" />
                  Close
                </button>

                {/* Heading */}
                <h2 className="font-serif text-[24px] font-semibold text-[var(--text-on-light)] mb-2">
                  Send an Enquiry
                </h2>
                <p className="font-body text-[15px] text-[var(--text-secondary)] mb-8">
                  Interested in <span className="font-semibold">{productName}</span>?
                  Fill out the form below and Jonas will get back to you.
                </p>

                {/* Form */}
                <ContactForm
                  prefilledSubject={`Product Enquiry`}
                />
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}
