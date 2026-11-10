import { useMemo, useState } from 'react'
import { sevClass } from '../data.js'
import { useToast } from '../context/Toast.jsx'
import { useDemoData } from '../context/DemoData.jsx'
import IncidentReport from '../components/IncidentReport.jsx'

function Item({ n, onReport }) {
  const [open, setOpen] = useState(false)
  const you = n.real ? 35 : n.simulated ? n.userFault : null
  const other = you == null ? null : 100 - you
  const col = n.sev === 'Severe' ? 'var(--d)' : n.sev === 'Moderate' ? 'var(--am)' : 'var(--ok)'
  return (
    <article className={'card inc' + (open ? ' open' : '')} style={{ borderLeftColor: col, marginBottom: 14 }}>
      <button className="hd" aria-expanded={open} onClick={() => setOpen(!open)}>
        <div style={{ flex: 1, minWidth: 200 }}><b className="dsp">{n.id}</b><div className="muted">{n.loc}</div><small className="muted">{n.d}{n.simulated ? ' · simulated' : n.placeholder ? ' · placeholder' : ' · sample record'}</small></div>
        <span className={'pill ' + sevClass(n.sev)}>{n.sev}</span><span className="pill dm">{n.st}</span><span>{n.sp} km/h <span className="muted">/ {n.lim}</span></span>
      </button>
      <div className="dt"><div><div className="in">
        <div className="grid g2">
          <div><b>Responsibility (simulated)</b>
            {you == null ? <p className="muted">No analysis is stored for this placeholder.</p> : <><div className="bar"><b style={{ width: open ? other + '%' : 0, background: 'var(--d)' }} /></div><small className="muted">Other vehicle {other}%</small><div className="bar"><b style={{ width: open ? you + '%' : 0, background: 'var(--b1)' }} /></div><small className="muted">You {you}%</small></>}</div>
          <div><b>Contributing factors</b><p style={{ margin: '8px 0 0' }}>{you == null ? 'No analyzed factors are available.' : 'Excessive speed (other vehicle), signal violation (other vehicle), late braking (you).'}</p><p className="muted" style={{ margin: '8px 0 0' }}>Confidence {n.real ? '87%' : n.simulated ? `${n.confidence}%` : '—'}</p></div>
        </div>
        <div className="row" style={{ marginTop: 16 }}><button className="btn" onClick={() => onReport(n)}>Preview report</button><span className="note" style={{ margin: 0 }}>Not submitted to any insurer.</span></div>
      </div></div></div>
    </article>
  )
}

export default function Incidents() {
  const { incidents } = useDemoData()
  const [f, setF] = useState('All'), [report, setReport] = useState(null)
  const list = useMemo(() => incidents.filter(n => f === 'All' || n.sev === f), [incidents, f])
  return (
    <>
      <div className="vh"><h1>Incidents</h1><p className="muted">Review incident records and inspect the simulated breakdown.</p></div>
      <div className="chips">{['All', 'Minor', 'Moderate', 'Severe'].map(s => <button key={s} className={'chip' + (f === s ? ' on' : '')} onClick={() => setF(s)}>{s}</button>)}</div>
      {list.length ? list.map(n => <Item key={n.id} n={n} onReport={setReport} />) : <p className="muted">No incidents match this filter.</p>}
      <p className="note">Analysis and sensor values are simulations, not legal findings or real accident detection.</p>
      <IncidentReport incident={report} onClose={() => setReport(null)} />
    </>
  )
}
