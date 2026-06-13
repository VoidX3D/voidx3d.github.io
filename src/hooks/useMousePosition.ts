import { useEffect, useState, useCallback } from 'react'

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const handler = useCallback((e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY }), [])
  useEffect(() => {
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [handler])
  return pos
}
