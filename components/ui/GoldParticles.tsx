'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from 'motion/react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number      // 0 → 1
  maxLife: number   // ms
  size: number
  hue: number       // slight hue variation for depth
}

const MAX_PARTICLES = 55
const SPAWN_PER_MOVE = 2

export function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const shouldReduceMotion = useReducedMotion()

  const spawnAt = useCallback((x: number, y: number) => {
    const particles = particlesRef.current
    for (let i = 0; i < SPAWN_PER_MOVE; i++) {
      if (particles.length >= MAX_PARTICLES) particles.shift()
      particles.push({
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(0.4 + Math.random() * 0.8),  // float upward
        life: 0,
        maxLife: 600 + Math.random() * 400,
        size: 1.5 + Math.random() * 2.5,
        hue: Math.random() * 20 - 10,      // ±10° around gold
      })
    }
  }, [])

  useEffect(() => {
    if (shouldReduceMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Match canvas to viewport
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Mousemove → spawn particles
    const onMove = (e: MouseEvent) => spawnAt(e.clientX, e.clientY)
    // Touch support
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) spawnAt(t.clientX, t.clientY)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })

    // Animation loop
    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop)
      const dt = now - lastTimeRef.current
      lastTimeRef.current = now
      if (dt > 100) return // tab was backgrounded — skip frame

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life += dt
        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          continue
        }

        const t = p.life / p.maxLife          // 0→1
        const alpha = Math.sin(t * Math.PI)   // rises then falls

        p.x += p.vx
        p.y += p.vy
        p.vy -= 0.008                         // gentle upward acceleration

        // Detect section background under particle to pick color
        const el = document.elementFromPoint(p.x, p.y)
        const isDark = el
          ? window.getComputedStyle(el).backgroundColor.includes('17') ||
            el.closest('[data-section="dark"]') !== null
          : false

        // Gold on dark bg → bright gold. Light bg → warm champagne
        const hue = 38 + p.hue
        const sat = isDark ? 72 : 60
        const lum = isDark ? 68 : 58

        ctx.save()
        ctx.globalAlpha = alpha * 0.75
        ctx.fillStyle = `hsl(${hue}, ${sat}%, ${lum}%)`

        // Draw a 4-pointed star sparkle
        const s = p.size * (1 - t * 0.3)
        ctx.beginPath()
        for (let j = 0; j < 8; j++) {
          const angle = (j * Math.PI) / 4
          const r = j % 2 === 0 ? s : s * 0.35
          if (j === 0) ctx.moveTo(p.x + r * Math.cos(angle), p.y + r * Math.sin(angle))
          else ctx.lineTo(p.x + r * Math.cos(angle), p.y + r * Math.sin(angle))
        }
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [shouldReduceMotion, spawnAt])

  if (shouldReduceMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    />
  )
}
