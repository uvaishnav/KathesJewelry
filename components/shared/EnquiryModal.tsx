'use client'

import { useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react'
import { X } from 'lucide-react'
import { ContactForm } from './ContactForm'

export interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
}

export function EnquiryModal({ isOpen, onClose, productName }: EnquiryModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  // Focus trap: keep Tab cycling within the modal
  const handleFocusTrap = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !panelRef.current) return

    const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement?.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement?.focus()
        e.preventDefault()
      }
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('keydown', handleFocusTrap)
      document.body.style.overflow = 'hidden'
      // Focus the close button when modal opens
      requestAnimationFrame(() => closeButtonRef.current?.focus())
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleFocusTrap)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEscape, handleFocusTrap])

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
              ref={panelRef}
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
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="mb-6 flex items-center gap-2 font-sans text-[12px] tracking-[2px] uppercase
                             text-[var(--text-secondary)] hover:text-[var(--text-on-light)]
                             transition-colors duration-200"
                  aria-label="Close enquiry modal"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
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
                  prefilledSubject="Product Enquiry"
                />
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}
