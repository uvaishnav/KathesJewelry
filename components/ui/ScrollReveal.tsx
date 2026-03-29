'use client'

import { useRef, useEffect, useState } from 'react'
import { m, LazyMotion, domAnimation, useReducedMotion } from 'motion/react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'scale' | 'fade'
  duration?: number
  once?: boolean
  amount?: number
}

/**
 * ScrollReveal — Framer Motion whileInView wrapper.
 * once:true (default) — safe, no SSR hydration issues for below-fold content.
 */
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
    y: direction === 'up' ? 28 : 0,
    x: direction === 'left' ? -28 : direction === 'right' ? 28 : 0,
    scale: direction === 'scale' ? 0.93 : 1,
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
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}

/**
 * RevealOnScroll — CSS-class approach via IntersectionObserver.
 * Renders content VISIBLE on SSR (no flash). Adds .revealed class
 * when element enters viewport, triggering CSS transition.
 * Most reliable approach for any viewport position.
 */
export function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  // Start VISIBLE — SSR renders correctly, no flash of invisible content
  const [revealed, setRevealed] = useState(true)

  useEffect(() => {
    if (shouldReduceMotion) return
    const el = ref.current
    if (!el) return

    // Start hidden only after mount (client-side only)
    setRevealed(false)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small timeout to ensure CSS transition fires
          const t = setTimeout(() => setRevealed(true), 16)
          observer.disconnect()
          return () => clearTimeout(t)
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [shouldReduceMotion])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0px)' : `translateY(${y}px)`,
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

/**
 * ClipReveal — Apple-style clip-path text entrance.
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

// Legacy alias — keep existing imports working
export { RevealOnScroll as FadeOnScroll }
