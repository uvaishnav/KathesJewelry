'use client'

import { useEffect, useRef } from 'react'
import { m, LazyMotion, domAnimation, useReducedMotion } from 'motion/react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'scale'
  duration?: number
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.7,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        initial={{
          opacity: 0,
          y: direction === 'up' ? 32 : 0,
          x: direction === 'left' ? -32 : direction === 'right' ? 32 : 0,
          scale: direction === 'scale' || direction === 'up' ? 0.94 : 1,
        }}
        whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
        viewport={{ once: true, margin: '-64px' }}
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
 * ClipReveal — Apple-style clip-path text/element entrance.
 * The element sweeps in from the bottom as if a curtain lifts.
 * Perfect for section headings and important text.
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
      { rootMargin: '-60px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [shouldReduceMotion, delay])

  return (
    <div ref={ref} className={className} style={shouldReduceMotion ? {} : undefined}>
      {children}
    </div>
  )
}
