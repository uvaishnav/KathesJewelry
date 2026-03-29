'use client'

import { useEffect, useRef } from 'react'
import { m, LazyMotion, domAnimation, useReducedMotion } from 'motion/react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'scale' | 'fade'
  duration?: number
  /**
   * once: false → re-animates every time the element enters the viewport
   * Enables bidirectional scroll storytelling
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
  once = false,
  amount = 0.1,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 28 : 0,
    x: direction === 'left' ? -28 : direction === 'right' ? 28 : 0,
    scale:
      direction === 'scale'
        ? 0.92
        : direction === 'up'
          ? 0.96
          : 1,
    filter:
      direction === 'fade' ? 'blur(4px)' : 'blur(0px)',
  }

  const animate = {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        initial={initial}
        whileInView={animate}
        viewport={{ once, amount, margin: '-50px 0px' }}
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
 * Content sweeps up into view — cinematic, editorial.
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
      { rootMargin: '-48px' }
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
