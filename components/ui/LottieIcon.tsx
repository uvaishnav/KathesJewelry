'use client'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface LottieIconProps {
  src: string
  size?: number
  className?: string
}

export function LottieIcon({ src, size = 48, className }: LottieIconProps) {
  return (
    <DotLottieReact
      src={src}
      autoplay
      loop={false}
      className={className}
      style={{ width: size, height: size }}
    />
  )
}
