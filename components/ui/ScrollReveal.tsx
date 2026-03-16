'use client'

import { m, LazyMotion, domAnimation, useReducedMotion } from 'motion/react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 24 : 0,
      x: direction === 'left' ? -24 : direction === 'right' ? 24 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  }

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{
          duration: 0.5,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        variants={variants}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
