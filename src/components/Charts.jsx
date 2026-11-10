import { useMounted } from '../hooks.js'
export function Donut({ a, ca, cb, label }) {
  const m = useMounted(), C = 2 * Math.PI * 52
  return (
    <svg className="donut" width="170" height="170" viewBox="0 0 130 130" role="img" aria-label={label}>
      <circle cx="65" cy="65" r="52" fill="none" stroke={cb} strokeWidth="16" />
      <circle cx="65" cy="65" r="52" fill="none" stroke={ca} strokeWidth="16" strokeLinecap="round" strokeDasharray={m ? `${C * a / 100} ${C}` : `0 ${C}`} transform="rotate(-90 65 65)" />
    </svg>
  )
}
export function Gauge({ v, max, lim }) {
  const m = useMounted(), L = Math.PI * 80, arc = 'M10 90A80 80 0 0 1 170 90'
  return (
    <svg className="gauge" width="220" height="130" viewBox="0 0 180 100" role="img" aria-label={`${v} km/h, limit ${lim}`}>
      <path d={arc} fill="none" stroke="var(--s2)" strokeWidth="14" strokeLinecap="round" />
      <path d={arc} fill="none" stroke="var(--d)" strokeWidth="14" strokeLinecap="round" strokeDasharray={L} style={{ strokeDashoffset: m ? L * (1 - v / max) : L }} />
      <text x="90" y="82" textAnchor="middle" fontFamily="Sora" fontWeight="800" fontSize="28" fill="currentColor">{v}</text>
      <text x="90" y="97" textAnchor="middle" fontSize="9" fill="var(--m)">km/h · limit {lim}</text>
    </svg>
  )
}
