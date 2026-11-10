import { useEffect, useState } from 'react'
export const RM = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion:reduce)').matches
export function useReveal(dep) {
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .12 })
    document.querySelectorAll('.rv').forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [dep])
}
// true one frame after mount, so CSS transitions animate from the initial state
export function useMounted() {
  const [m, s] = useState(false)
  useEffect(() => { const id = requestAnimationFrame(() => requestAnimationFrame(() => s(true))); return () => cancelAnimationFrame(id) }, [])
  return m
}
