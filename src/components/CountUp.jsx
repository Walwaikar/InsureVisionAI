import { useEffect, useState } from 'react'
import { RM } from '../hooks.js'
export default function CountUp({ to, suffix = '' }) {
  const [v, setV] = useState(RM ? to : 0)
  useEffect(() => {
    if (RM) return
    let raf; const t0 = performance.now()
    const f = t => { const p = Math.min(1, (t - t0) / 1300); setV(Math.round(to * (1 - (1 - p) ** 3))); if (p < 1) raf = requestAnimationFrame(f) }
    raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf)
  }, [to])
  return <>{v}{suffix}</>
}
