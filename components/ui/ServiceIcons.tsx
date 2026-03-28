/**
 * ServiceIcons — Animated SVG icons, one per service.
 * Each icon uses stroke-dasharray animation to "draw in"
 * as the service text appears. Pure SVG + CSS, zero deps.
 *
 * SVG GENERATION PROMPTS (if you want higher-fidelity versions):
 *
 * RepairsIcon:
 *   "Minimal line-art jewelry ring being resized, jeweler's tool touching
 *    the band, single stroke style, 100x100 viewBox, no fill, gold stroke"
 *
 * CustomDesignIcon:
 *   "Minimal line-art diamond engagement ring with sparkle radiating from
 *    the center stone, single continuous stroke, 100x100 viewBox, no fill"
 *
 * BuyGoldIcon:
 *   "Minimal line-art balance scale with coins on each side, single stroke
 *    style, 100x100 viewBox, no fill, elegant thin lines"
 *
 * EstateJewelryIcon:
 *   "Minimal line-art art-deco crown with three gems, single stroke style,
 *    100x100 viewBox, no fill, elegant geometric lines"
 *
 * WatchRepairIcon:
 *   "Minimal line-art pocket watch with visible clock hands at 10:10,
 *    single stroke continuous path, 100x100 viewBox, no fill"
 *
 * ConsultationIcon:
 *   "Minimal line-art two hands reaching toward each other holding a ring,
 *    single stroke style, 100x100 viewBox, warm and human"
 *
 * Place generated SVG files at: /public/icons/service-[name].svg
 * Then replace the inline SVGs below with <Image src> references.
 */

'use client'
import { useEffect, useRef } from 'react'

const GOLD = '#C9A96E'
const STROKE_PROPS = {
  stroke: GOLD,
  strokeWidth: '2.5',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  fill: 'none',
}

interface IconProps { isActive: boolean; size?: number }

export function RepairsIcon({ isActive, size = 80 }: IconProps) {
  const ref = useRef<SVGGElement>(null)
  useEffect(() => {
    if (!ref.current) return
    ref.current.querySelectorAll('path, circle, line').forEach((el, i) => {
      const e = el as SVGElement
      e.style.strokeDasharray = '600'
      e.style.strokeDashoffset = isActive ? '0' : '600'
      e.style.transition = `stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s`
      e.style.opacity = isActive ? '1' : '0.3'
    })
  }, [isActive])
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <g ref={ref}>
        {/* Ring band */}
        <path d="M 25 50 Q 25 28 50 28 Q 75 28 75 50 Q 75 72 50 72 Q 25 72 25 50" {...STROKE_PROPS} />
        {/* Resize marks */}
        <line x1="20" y1="42" x2="12" y2="34" {...STROKE_PROPS} />
        <line x1="12" y1="34" x2="18" y2="28" {...STROKE_PROPS} />
        <line x1="18" y1="28" x2="24" y2="34" {...STROKE_PROPS} />
        {/* Tool */}
        <line x1="30" y1="68" x2="16" y2="82" {...STROKE_PROPS} strokeWidth="3" />
        <circle cx="33" cy="65" r="4" {...STROKE_PROPS} />
        {/* Sparkle */}
        <line x1="70" y1="30" x2="74" y2="26" {...STROKE_PROPS} strokeWidth="1.5" />
        <line x1="76" y1="33" x2="81" y2="33" {...STROKE_PROPS} strokeWidth="1.5" />
        <line x1="73" y1="37" x2="77" y2="41" {...STROKE_PROPS} strokeWidth="1.5" />
      </g>
    </svg>
  )
}

export function CustomDesignIcon({ isActive, size = 80 }: IconProps) {
  const ref = useRef<SVGGElement>(null)
  useEffect(() => {
    if (!ref.current) return
    ref.current.querySelectorAll('path, line, circle, polyline').forEach((el, i) => {
      const e = el as SVGElement
      e.style.strokeDasharray = '600'
      e.style.strokeDashoffset = isActive ? '0' : '600'
      e.style.transition = `stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1) ${i * 0.09}s`
      e.style.opacity = isActive ? '1' : '0.3'
    })
  }, [isActive])
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <g ref={ref}>
        {/* Band */}
        <path d="M30 62 Q30 75 50 75 Q70 75 70 62" {...STROKE_PROPS} />
        {/* Setting prongs */}
        <path d="M38 62 L38 44 L46 38 L54 38 L62 44 L62 62" {...STROKE_PROPS} />
        {/* Stone facets */}
        <polyline points="46,38 50,28 54,38" {...STROKE_PROPS} />
        <line x1="38" y1="50" x2="62" y2="50" {...STROKE_PROPS} />
        <line x1="50" y1="28" x2="50" y2="50" {...STROKE_PROPS} strokeWidth="1.5" opacity="0.6" />
        {/* Sparkles around stone */}
        <line x1="26" y1="28" x2="26" y2="22" {...STROKE_PROPS} strokeWidth="1.5" />
        <line x1="22" y1="32" x2="17" y2="32" {...STROKE_PROPS} strokeWidth="1.5" />
        <line x1="74" y1="34" x2="80" y2="30" {...STROKE_PROPS} strokeWidth="1.5" />
        <line x1="76" y1="40" x2="83" y2="40" {...STROKE_PROPS} strokeWidth="1.5" />
      </g>
    </svg>
  )
}

export function BuyGoldIcon({ isActive, size = 80 }: IconProps) {
  const ref = useRef<SVGGElement>(null)
  useEffect(() => {
    if (!ref.current) return
    ref.current.querySelectorAll('path, line, circle, rect').forEach((el, i) => {
      const e = el as SVGElement
      e.style.strokeDasharray = '600'
      e.style.strokeDashoffset = isActive ? '0' : '600'
      e.style.transition = `stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s`
      e.style.opacity = isActive ? '1' : '0.3'
    })
  }, [isActive])
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <g ref={ref}>
        {/* Center pole */}
        <line x1="50" y1="20" x2="50" y2="78" {...STROKE_PROPS} />
        {/* Pivot */}
        <circle cx="50" cy="22" r="4" {...STROKE_PROPS} />
        {/* Beam — tilted (one side heavier) */}
        <line x1="18" y1="36" x2="82" y2="30" {...STROKE_PROPS} strokeWidth="2" />
        {/* Left pan strings */}
        <line x1="18" y1="36" x2="14" y2="52" {...STROKE_PROPS} strokeWidth="1.5" />
        <line x1="18" y1="36" x2="22" y2="52" {...STROKE_PROPS} strokeWidth="1.5" />
        {/* Right pan strings */}
        <line x1="82" y1="30" x2="78" y2="48" {...STROKE_PROPS} strokeWidth="1.5" />
        <line x1="82" y1="30" x2="86" y2="48" {...STROKE_PROPS} strokeWidth="1.5" />
        {/* Left pan (with gold coins) */}
        <path d="M10 53 Q18 58 26 53" {...STROKE_PROPS} />
        <circle cx="15" cy="51" r="3" {...STROKE_PROPS} strokeWidth="1.5" />
        <circle cx="21" cy="51" r="3" {...STROKE_PROPS} strokeWidth="1.5" />
        {/* Right pan (with ring) */}
        <path d="M74 49 Q82 54 90 49" {...STROKE_PROPS} />
        <circle cx="82" cy="45" r="5" {...STROKE_PROPS} />
        {/* Base */}
        <line x1="40" y1="78" x2="60" y2="78" {...STROKE_PROPS} />
      </g>
    </svg>
  )
}

export function EstateJewelryIcon({ isActive, size = 80 }: IconProps) {
  const ref = useRef<SVGGElement>(null)
  useEffect(() => {
    if (!ref.current) return
    ref.current.querySelectorAll('path, line, circle, polygon').forEach((el, i) => {
      const e = el as SVGElement
      e.style.strokeDasharray = '600'
      e.style.strokeDashoffset = isActive ? '0' : '600'
      e.style.transition = `stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1) ${i * 0.09}s`
      e.style.opacity = isActive ? '1' : '0.3'
    })
  }, [isActive])
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <g ref={ref}>
        {/* Crown base band */}
        <path d="M20 70 L20 55 L35 40 L50 55 L65 35 L80 55 L80 70 Z" {...STROKE_PROPS} />
        {/* Art-deco center gem — marquise shape */}
        <path d="M50 55 L44 46 L50 38 L56 46 Z" {...STROKE_PROPS} />
        {/* Left gem */}
        <circle cx="28" cy="44" r="4.5" {...STROKE_PROPS} />
        {/* Right gem */}
        <polygon points="72,36 76,44 72,52 68,44" {...STROKE_PROPS} strokeWidth="2" />
        {/* Band decorative lines */}
        <line x1="20" y1="62" x2="80" y2="62" {...STROKE_PROPS} strokeWidth="1" />
        <line x1="30" y1="70" x2="30" y2="62" {...STROKE_PROPS} strokeWidth="1.5" />
        <line x1="50" y1="70" x2="50" y2="62" {...STROKE_PROPS} strokeWidth="1.5" />
        <line x1="70" y1="70" x2="70" y2="62" {...STROKE_PROPS} strokeWidth="1.5" />
        {/* Top sparkle */}
        <line x1="50" y1="32" x2="50" y2="26" {...STROKE_PROPS} strokeWidth="1.5" />
        <line x1="45" y1="30" x2="41" y2="26" {...STROKE_PROPS} strokeWidth="1.5" />
        <line x1="55" y1="30" x2="59" y2="26" {...STROKE_PROPS} strokeWidth="1.5" />
      </g>
    </svg>
  )
}

export function WatchRepairIcon({ isActive, size = 80 }: IconProps) {
  const ref = useRef<SVGGElement>(null)
  useEffect(() => {
    if (!ref.current) return
    ref.current.querySelectorAll('path, line, circle').forEach((el, i) => {
      const e = el as SVGElement
      e.style.strokeDasharray = '600'
      e.style.strokeDashoffset = isActive ? '0' : '600'
      e.style.transition = `stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s`
      e.style.opacity = isActive ? '1' : '0.3'
    })
  }, [isActive])
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <g ref={ref}>
        {/* Watch face */}
        <circle cx="50" cy="50" r="26" {...STROKE_PROPS} />
        {/* Inner detail ring */}
        <circle cx="50" cy="50" r="22" {...STROKE_PROPS} strokeWidth="1" opacity="0.5" />
        {/* Crown/stem */}
        <rect x="74" y="46" width="8" height="8" rx="1" {...STROKE_PROPS} strokeWidth="1.5" />
        {/* Hour markers */}
        <line x1="50" y1="28" x2="50" y2="33" {...STROKE_PROPS} strokeWidth="2" />
        <line x1="50" y1="67" x2="50" y2="72" {...STROKE_PROPS} strokeWidth="2" />
        <line x1="28" y1="50" x2="33" y2="50" {...STROKE_PROPS} strokeWidth="2" />
        {/* Hour hand — pointing to 10 */}
        <line x1="50" y1="50" x2="38" y2="36" {...STROKE_PROPS} strokeWidth="2.5" />
        {/* Minute hand — pointing to 2 */}
        <line x1="50" y1="50" x2="62" y2="34" {...STROKE_PROPS} strokeWidth="1.5" />
        {/* Center dot */}
        <circle cx="50" cy="50" r="3" stroke={GOLD} strokeWidth="2" fill={GOLD} opacity="0.7" />
        {/* Lug top */}
        <path d="M42 24 Q50 18 58 24" {...STROKE_PROPS} strokeWidth="2" />
        {/* Lug bottom */}
        <path d="M42 76 Q50 82 58 76" {...STROKE_PROPS} strokeWidth="2" />
      </g>
    </svg>
  )
}

export function ConsultationIcon({ isActive, size = 80 }: IconProps) {
  const ref = useRef<SVGGElement>(null)
  useEffect(() => {
    if (!ref.current) return
    ref.current.querySelectorAll('path, line, circle').forEach((el, i) => {
      const e = el as SVGElement
      e.style.strokeDasharray = '600'
      e.style.strokeDashoffset = isActive ? '0' : '600'
      e.style.transition = `stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1) ${i * 0.09}s`
      e.style.opacity = isActive ? '1' : '0.3'
    })
  }, [isActive])
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <g ref={ref}>
        {/* Left hand */}
        <path d="M10 70 Q12 55 20 48 L28 44 Q32 42 34 46 L34 62" {...STROKE_PROPS} />
        <line x1="28" y1="44" x2="28" y2="60" {...STROKE_PROPS} />
        <line x1="22" y1="62" x2="22" y2="50" {...STROKE_PROPS} />
        {/* Right hand */}
        <path d="M90 70 Q88 55 80 48 L72 44 Q68 42 66 46 L66 62" {...STROKE_PROPS} />
        <line x1="72" y1="44" x2="72" y2="60" {...STROKE_PROPS} />
        <line x1="78" y1="62" x2="78" y2="50" {...STROKE_PROPS} />
        {/* Ring floating between hands */}
        <circle cx="50" cy="42" r="10" {...STROKE_PROPS} />
        {/* Stone on ring */}
        <path d="M45 38 L50 32 L55 38" {...STROKE_PROPS} strokeWidth="1.5" />
        <line x1="45" y1="38" x2="55" y2="38" {...STROKE_PROPS} strokeWidth="1.5" />
        {/* Sparkles */}
        <line x1="50" y1="26" x2="50" y2="22" {...STROKE_PROPS} strokeWidth="1.5" />
        <line x1="44" y1="28" x2="41" y2="25" {...STROKE_PROPS} strokeWidth="1.5" />
        <line x1="56" y1="28" x2="59" y2="25" {...STROKE_PROPS} strokeWidth="1.5" />
      </g>
    </svg>
  )
}

// Map service index → icon component
export const SERVICE_ICONS = [
  RepairsIcon,
  CustomDesignIcon,
  BuyGoldIcon,
  EstateJewelryIcon,
  WatchRepairIcon,
  ConsultationIcon,
]
