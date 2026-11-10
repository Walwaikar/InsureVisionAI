import { useEffect, useMemo, useState } from 'react'
import Icon from '../components/Icon.jsx'
import { NEAR, SV } from '../data.js'
import { RM } from '../hooks.js'
import { useToast } from '../context/Toast.jsx'

// Stylised "radar" city: blocks, river, parks, roads and range rings around the user (276,194).
function City() {
  const blocks = []
  for (let x = 0; x < 600; x += 75) for (let y = 0; y < 440; y += 55) blocks.push(<rect key={x + '-' + y} x={x + 8} y={y + 8} width="59" height="39" rx="6" fill="#fff" opacity={.03 + ((x * 7 + y * 3) % 5) * .012} />)
  return (
    <svg className="bg" viewBox="0 0 600 440" preserveAspectRatio="none" aria-hidden="true">
      <rect width="600" height="440" fill="#0E1533" />{blocks}
      <path d="M-10 330C120 300 200 380 330 350S520 300 610 330" fill="none" stroke="#12456B" strokeWidth="26" opacity=".7" />
      <ellipse cx="120" cy="100" rx="70" ry="42" fill="#0F4A44" opacity=".6" /><ellipse cx="500" cy="380" rx="60" ry="36" fill="#0F4A44" opacity=".6" />
      {[75, 225, 375, 525].map(x => <path key={x} d={`M${x} 0V440`} stroke="#26356F" strokeWidth="10" />)}
      {[55, 165, 275, 385].map(y => <path key={y} d={`M0 ${y}H600`} stroke="#26356F" strokeWidth="10" />)}
      {[60, 125, 190].map((r, i) => <circle key={r} className="pr" style={{ animationDelay: i * 1.2 + 's' }} cx="276" cy="194" r={r} fill="none" stroke="#0FB5A6" strokeWidth="1.2" strokeDasharray="4 6" />)}
    </svg>
  )
}

export default function Services() {
  const [f, setF] = useState('All'), [cur, setCur] = useState(NEAR), toast = useToast()
  const list = useMemo(() => SV.filter(s => f === 'All' || s.t === f.toLowerCase()), [f])
  useEffect(() => { const n = [...list].sort((a, b) => a.km - b.km)[0]; setCur(n ? n.n : null) }, [list])
  const s = list.find(x => x.n === cur), d = s && `M276 194H${s.x * 6}V${s.y * 4.4}`
  return (
    <>
      <div className="vh"><h1>Nearby help</h1><p className="muted">Demo listings around MG Road. Distances, ratings and times are not live or verified.</p></div>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="chips">{['All', 'Hospital', 'Mechanic', 'Towing', 'Rescue'].map(c => <button key={c} className={'chip' + (f === c ? ' on' : '')} onClick={() => setF(c)}>{c}</button>)}</div>
        <a className="chip" style={{ marginBottom: 18 }} target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/hospital+near+MG+Road+Bangalore">View the area in Google Maps</a>
      </div>
      <div className="sv">
        <div>
          <div className="rm" role="img" aria-label="Radar-style map of demo services around you">
            <City /><div className="sweep" />
            <svg className="bg" viewBox="0 0 600 440" preserveAspectRatio="none" aria-hidden="true">
              {s && <g key={s.n}><path className="rt" d={d} />{!RM && <circle r="6" fill="#fff"><animateMotion dur="2.6s" repeatCount="indefinite" path={d} /></circle>}</g>}
            </svg>
            <div className="you"><b>You</b></div>
            <div>{list.map((v, k) => <button key={v.n} className={'pn' + (v.n === cur ? ' sel' : '')} data-eta={`~${v.m} min`} aria-label={v.n} onClick={() => setCur(v.n)} style={{ left: v.x + '%', top: v.y + '%', '--c': v.c, '--d': .12 * k + .2 + 's' }}><Icon n={v.i} style={{ stroke: '#fff', width: 16, height: 16 }} /></button>)}</div>
          </div>
          <div className="card" style={{ marginTop: 14 }}>
            {s ? <div className="fin" key={s.n}>
              <div className="row"><div style={{ width: 46, height: 46, borderRadius: 14, background: s.c, display: 'grid', placeItems: 'center' }}><Icon n={s.i} style={{ stroke: '#fff' }} /></div>
                <div style={{ flex: 1, minWidth: 160 }}><b className="dsp" style={{ fontSize: 19 }}>{s.n}</b><div className="muted">★ {s.r} · {s.km} km · about {s.m} min away</div></div><span className="pill dm">Demo listing</span></div>
              <div className="row" style={{ marginTop: 14 }}><a className="btn" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.n + ' Bangalore')}`}>Open in Google Maps</a><button className="btn g" onClick={() => toast('Demo only. No call was placed.')}>Call (demo)</button></div>
            </div> : <p className="muted" style={{ margin: 0 }}>Select a pin or a listing to draw the route from your position.</p>}
          </div>
        </div>
        <div>
          {list.length ? list.map(v => <button key={v.n} className={'card svc' + (v.n === cur ? ' sel' : '')} onClick={() => setCur(v.n)}>
            <span style={{ width: 46, height: 46, borderRadius: 14, background: v.c, display: 'grid', placeItems: 'center', flex: 'none' }}><Icon n={v.i} style={{ stroke: '#fff' }} /></span>
            <span style={{ flex: 1 }}><b>{v.n}</b><br /><span className="muted" style={{ fontSize: 14 }}>★ {v.r} · {v.km} km · ~{v.m} min</span><br /><span className="pill dm">Demo</span> {v.n === NEAR && <span className="pill ok">Nearest</span>}</span>
          </button>) : <p className="muted">No services in this category.</p>}
        </div>
      </div>
    </>
  )
}
