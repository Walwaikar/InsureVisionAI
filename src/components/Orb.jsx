// Sarathi's avatar: a shield-shaped robot with a visor, blinking eyes and an antenna light.
export default function Orb() {
  return (
    <svg viewBox="0 -3 48 51" width="36" height="38" aria-hidden="true">
      <path d="M24 4V-1" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle className="ant" cx="24" cy="-1.5" r="2.3" fill="#FFB020" />
      <path d="M24 4l16 6v12c0 10-7 17-16 20C15 39 8 32 8 22V10z" fill="#fff" />
      <rect x="13" y="15" width="22" height="11" rx="5.5" fill="#0C1230" />
      <circle className="ey" cx="19.5" cy="20.5" r="2.6" fill="#19E3D2" />
      <circle className="ey" cx="28.5" cy="20.5" r="2.6" fill="#19E3D2" />
      <path d="M19 32q5 3.5 10 0" stroke="#4338CA" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}
