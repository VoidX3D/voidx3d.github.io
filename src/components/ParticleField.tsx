import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 40

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const particles: HTMLDivElement[] = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      p.style.left = `${Math.random() * 100}%`
      p.style.width = `${Math.random() * 2 + 1}px`
      p.style.height = p.style.width
      p.style.animationDuration = `${Math.random() * 15 + 10}s`
      p.style.animationDelay = `${Math.random() * 10}s`
      p.style.opacity = `${Math.random() * 0.4 + 0.1}`
      container.appendChild(p)
      particles.push(p)
    }

    return () => particles.forEach(p => p.remove())
  }, [])

  return <div ref={containerRef} className="particle-field" />
}
