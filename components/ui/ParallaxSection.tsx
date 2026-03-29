'use client'

/**
 * ParallaxSection — wraps sections in a sticky-scroll reveal.
 * When once=false, animates forward AND reverses when scrolling back up.
 * Gives the "story navigation" feeling the user asked for.
 */

import { useRef } from 'react'
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react'

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  /**
   * "rise"   — content slides up into frame (used on light sections)
   * "reveal" — opacity + scale, subtle zoom-out (used on dark sections)
   * "none"   — no parallax, just renders children (fallback)
   */
  variant?: 'rise' | 'reveal' | 'none'
  /** How far the parallax shift travels (px). Default 60 */
  depth?: number
}

export function ParallaxSection({
  children,
  className = '',
  variant = 'reveal',
  depth = 60,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // "rise" — translateY: enters from below as it scrolls into view
  const riseY = useTransform(scrollYProgress, [0, 0.4, 1], [depth, 0, -depth * 0.5])

  // "reveal" — scale + opacity: zooms gently as it enters
  const revealScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.96, 1, 1, 0.97])
  const revealOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  if (shouldReduce || variant === 'none') {
    return <div className={className}>{children}</div>
  }

  if (variant === 'rise') {
    return (
      <LazyMotion features={domAnimation}>
        <m.div
          ref={ref}
          className={className}
          style={{ y: riseY }}
        >
          {children}
        </m.div>
      </LazyMotion>
    )
  }

  // 'reveal'
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        className={className}
        style={{ scale: revealScale, opacity: revealOpacity }}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
