import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import CountUp from '../components/CountUp.jsx'
import { CARDS } from '../data.js'
import { RM } from '../hooks.js'

function Carousel() {
  const [i, setI] = useState(0), [hold, setHold] = useState(false), x0 = useRef(null), a = ((i % 6) + 6) % 6
  useEffect(() => { if (RM || hold) return; const t = setInterval(() => setI(n => n + 1), 4200); return () => clearInterval(t) }, [hold])
  const key = e => { if (e.key === 'ArrowLeft') setI(n => n - 1); if (e.key === 'ArrowRight') setI(n => n + 1) }
  const up = e => { if (x0.current != null) { const dx = e.clientX - x0.current; if (dx > 40) setI(n => n - 1); else if (dx < -40) setI(n => n + 1) } x0.current = null }
  return (
    <>
      <div className="stage" onPointerDown={e => (x0.current = e.clientX)} onPointerUp={up} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
        <div className="ring" tabIndex={0} aria-label="Feature carousel" onKeyDown={key} style={{ transform: `rotateY(${-i * 60}deg)` }}>
          {CARDS.map((c, k) => (
            <article key={c[0]} className={'c3' + (k === a ? ' on' : '')} style={{ '--i': k, background: c[4] }} aria-hidden={k !== a}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: '#ffffff30', display: 'grid', placeItems: 'center' }}><Icon n={c[1]} style={{ stroke: '#fff' }} /></div>
              <h3>{c[0]}</h3><small>{c[2]}</small><div className="big">{c[3]}</div>
            </article>
          ))}
        </div>
      </div>
      <div className="cn">
        <button aria-label="Previous feature" onClick={() => setI(i - 1)}>‹</button>
        <div className="row" style={{ gap: 7 }}>{CARDS.map((c, k) => <span key={c[0]} className={'dot' + (k === a ? ' on' : '')} onClick={() => setI(i + ((k - i) % 6 + 6) % 6)} />)}</div>
        <button aria-label="Next feature" onClick={() => setI(i + 1)}>›</button>
      </div>
    </>
  )
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="aur" style={{ width: 380, height: 380, background: '#4338CA', left: -80, top: -60 }} />
        <div className="aur" style={{ width: 300, height: 300, background: '#0FB5A6', right: -40, bottom: -60, animationDelay: '-5s' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>Know what happened. Know what to do next.</h1>
          <p>InsureVisionAI turns a roadside incident into a clear fault breakdown, a ready report and the nearest help — all in one calm place.</p>
          <div className="row"><Link className="btn" to="/incidents">Explore the demo <Icon n="chart" style={{ stroke: '#fff' }} /></Link><Link className="btn g" to="/help" style={{ background: 'transparent', color: '#fff', borderColor: '#ffffff40' }}>Try SOS</Link></div>
        </div>
        <div className="road" aria-hidden="true">
          <div className="rd" />
          <svg className="car" viewBox="0 0 120 80"><rect x="6" y="30" width="108" height="34" rx="12" fill="#6D5BFF" /><path d="M26 30l10-20h48l10 20z" fill="#8B83FF" /><path d="M40 28l7-14h26l7 14z" fill="#0C1130" opacity=".7" /><circle cx="30" cy="66" r="11" fill="#0C1130" /><circle cx="90" cy="66" r="11" fill="#0C1130" /><rect x="12" y="38" width="14" height="7" rx="3" fill="#FFB020" /><rect x="94" y="38" width="14" height="7" rx="3" fill="#FFB020" /></svg>
          <div className="lock" /><div className="tag">Simulated detection</div>
        </div>
      </section>
      <section className="sec rv">
        <h2>Six tools, one ring</h2>
        <p className="muted">Drag, swipe or use the arrow keys to turn the ring. Everything here runs on clearly labelled demo data.</p>
        <Carousel />
      </section>
      <section className="sec rv">
        <h2>Built to be believed</h2>
        <div className="grid g4" style={{ marginTop: 22 }}>
          {[[87, '%', 'Demo confidence on the sample analysis'], [35, '%', 'Your share of responsibility in the sample'], [5, '', 'Demo services near MG Road'], [0, '', 'Real dispatches. This is a prototype.']].map(([n, s, t]) => <div className="card" key={t}><div className="num"><CountUp to={n} suffix={s} /></div><span className="muted">{t}</span></div>)}
        </div>
        <p className="note">Fault percentages come from simple demo rules, not a trained model, and are not a legal decision. In an emergency call 112.</p>
      </section>
    </>
  )
}
