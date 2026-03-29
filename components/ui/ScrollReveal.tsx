'use client'

import { useRef, useEffect, useState } from 'react'
import { m, LazyMotion, domAnimation, useReducedMotion } from 'motion/react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'scale' | 'fade'
  duration?: number
  /**
   * once: true  → animate in once, stay visible (SAFE default)
   * once: false → re-animates on every viewport entry (use sparingly)
   */
  once?: boolean
  amount?: number
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.65,
  once = true,
  amount = 0.08,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 24 : 0,
    x: direction === 'left' ? -24 : direction === 'right' ? 24 : 0,
    scale: direction === 'scale' ? 0.94 : direction === 'up' ? 0.97 : 1,
    filter: direction === 'fade' ? 'blur(6px)' : undefined,
  }

  const animate = {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    filter: direction === 'fade' ? 'blur(0px)' : undefined,
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        initial={initial}
        whileInView={animate}
        viewport={{ once, amount, margin: '-40px 0px' }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}

/**
 * ClipReveal — Apple-style clip-path text entrance.
 * Uses IntersectionObserver directly (most reliable, zero hydration issues).
 */
export function ClipReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion || !ref.current) return
    const el = ref.current
    el.style.clipPath = 'inset(0 0 100% 0)'
    el.style.opacity = '0'
    el.style.transition = `clip-path 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}s, opacity 0.3s ease ${delay}s`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.clipPath = 'inset(0 0 0% 0)'
          el.style.opacity = '1'
          observer.disconnect()
        }
      },
      { rootMargin: '-40px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [shouldReduceMotion, delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/**
 * FadeOnScroll — lightweight CSS-only fade via IntersectionObserver.
 * Zero Framer Motion overhead. Most reliable for simple reveals.
 */
export function FadeOnScroll({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) { setVisible(true); return }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-32px', threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [shouldReduceMotion])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
