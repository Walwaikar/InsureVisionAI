import { Link } from 'react-router-dom'
import CountUp from '../components/CountUp.jsx'
import { Donut, Gauge } from '../components/Charts.jsx'
import { useAuth } from '../context/Auth.jsx'
import { useDemoData } from '../context/DemoData.jsx'
import { SAFETY_TIPS } from '../data.js'

const parsedDate = incident => {
  const d = Date.parse(incident.createdAt || incident.d)
  return Number.isNaN(d) ? 0 : d
}
const todayTip = () => {
  const now = new Date(), start = new Date(now.getFullYear(), 0, 0)
  const day = Math.floor((now - start) / 86400000)
  return SAFETY_TIPS[day % SAFETY_TIPS.length]
}
const isActive = policy => new Date(`${policy.exp}T23:59:59`) >= new Date()

export default function Dashboard() {
  const { user } = useAuth(), { incidents, policies } = useDemoData()
  const sorted = [...incidents].sort((a, b) => parsedDate(b) - parsedDate(a))
  const latest = sorted[0], analyzed = incidents.filter(n => n.real || n.simulated || /analyz/i.test(n.st)).length
  const pending = incidents.filter(n => /pending/i.test(n.st)).length
  const activePolicy = policies.find(isActive)
  const tip = todayTip()
  const userFault = latest?.real ? 35 : latest?.simulated ? latest.userFault : null
  return (
    <>
      <div className="vh"><h1>Good afternoon, {user ? user.name : 'Gagan'}</h1><p className="muted">Your protection at a glance. Figures use records saved in this browser.</p></div>
      <div className="grid g4">
        <div className="card rv"><span className="muted">Incidents on record</span><div className="num"><CountUp to={incidents.length} /></div><span className="pill dm">Sample and simulated records</span></div>
        <div className="card rv"><span className="muted">Analyzed incidents</span><div className="num"><CountUp to={analyzed} /></div><span className="pill ok">Includes simulated analysis</span></div>
        <div className="card rv"><span className="muted">Pending review</span><div className="num"><CountUp to={pending} /></div><span className="pill wr">From incident records</span></div>
        <div className="card rv"><span className="muted">Insurance coverage</span><div className="num" style={{ color: activePolicy ? 'var(--ok)' : 'var(--m)' }}>{activePolicy ? 'Active' : 'None'}</div><span>{activePolicy ? `${activePolicy.prov} · to ${new Date(`${activePolicy.exp}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}` : 'Add a policy to track coverage'}</span></div>
      </div>
      <div className="grid g2" style={{ marginTop: 18 }}>
        <div className="card rv"><h3>Latest incident</h3>
          {latest ? <><p className="muted" style={{ margin: '6px 0 14px' }}>{latest.id} · {latest.loc}</p><div className="row" style={{ justifyContent: 'space-around' }}><Gauge v={latest.sp} max={Math.max(90, latest.sp)} lim={latest.lim} />
            {userFault == null ? <div className="muted" style={{ maxWidth: 180, textAlign: 'center' }}>No fault analysis is stored for this record.</div> : <div style={{ textAlign: 'center' }}><Donut a={100 - userFault} ca="var(--d)" cb="var(--b1)" label={`${100 - userFault} percent other, ${userFault} percent you`} /><div className="muted" style={{ fontSize: 13 }}>Other {100 - userFault}% · You {userFault}%</div></div>}</div>
            <div className="row" style={{ marginTop: 16 }}><Link className="btn" to="/incidents">Open incidents</Link></div></>
            : <p className="muted">No incidents have been recorded yet.</p>}
        </div>
        <div className="card rv" style={{ background: 'linear-gradient(150deg,#161B4A,#0B1026)', color: '#EDF0FF', display: 'flex', flexDirection: 'column' }}>
          <h3>Safety tip of the day</h3><p style={{ font: '700 26px/1.2 Sora,sans-serif', margin: 'auto 0', letterSpacing: '-.02em' }}>{tip.tip}</p><span className="pill" style={{ background: '#ffffff1f', alignSelf: 'flex-start' }}>{tip.category}</span><small style={{ marginTop: 14, opacity: .7 }}>Rotates daily from the built-in demo tip list.</small></div>
      </div>
      <p className="note">This prototype does not track trips or live vehicle sensors. Incident analysis and policy status are demo information.</p>
    </>
  )
}
