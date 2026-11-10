import { useState } from 'react'
import Field from '../components/Field.jsx'
import { COV, PROV } from '../data.js'
import { RM } from '../hooks.js'
import { useToast } from '../context/Toast.jsx'
import { useDemoData } from '../context/DemoData.jsx'

const daysTo = d => Math.ceil((new Date(d + 'T00:00:00') - new Date().setHours(0, 0, 0, 0)) / 864e5)
const BLANK = { prov: PROV[0], no: '', exp: '', cov: COV[0], veh: '' }

function Policy({ p, onEdit, onDelete }) {
  const n = daysTo(p.exp), c = n < 0 ? 'er' : n < 60 ? 'wr' : 'ok'
  const move = e => {
    if (RM) return
    const el = e.currentTarget, r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
    el.style.transform = `rotateY(${(x - .5) * 16}deg) rotateX(${(.5 - y) * 12}deg)`; el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%')
  }
  return (
    <>
      <div className="pc"><div className="pol" onPointerMove={move} onPointerLeave={e => (e.currentTarget.style.transform = '')}>
        <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}><b className="dsp" style={{ fontSize: 22 }}>{p.prov}</b><span className="chp" /></div>
        <div style={{ margin: '34px 0 4px', opacity: .8, fontSize: 13 }}>Policy number</div><div className="dsp" style={{ fontSize: 24, letterSpacing: '.04em' }}>{p.no}</div>
        <div className="row" style={{ justifyContent: 'space-between', marginTop: 20, fontSize: 14 }}><span>{p.cov}</span><span>{p.veh}</span><span>Valid to {new Date(p.exp + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
      </div></div>
      <div className="row" style={{ margin: '12px 0 22px' }}><span className={'pill ' + c}>{n < 0 ? `Expired ${-n} days ago` : `Renews in ${n} days`}</span><span style={{ flex: 1 }} /><button className="chip" onClick={() => onEdit(p)}>Edit</button><button className="chip" onClick={() => onDelete(p.id)}>Delete</button></div>
    </>
  )
}

export default function Insurance() {
  const { policies: pols, setPolicies: setPols } = useDemoData()
  const [form, setForm] = useState(BLANK), [ed, setEd] = useState(null), [bad, setBad] = useState({}), [shake, setShake] = useState(false), toast = useToast()
  const set = k => e => setForm({ ...form, [k]: e.target.value })
  const submit = e => {
    e.preventDefault()
    const b = { no: form.no.trim().length < 5, exp: !form.exp || daysTo(form.exp) < 0, veh: form.veh.trim().length < 4 }
    setBad(b)
    if (Object.values(b).some(Boolean)) { setShake(false); requestAnimationFrame(() => setShake(true)); return }
    const d = { ...form, no: form.no.trim().toUpperCase(), veh: form.veh.trim().toUpperCase() }
    setPols(ed ? pols.map(p => p.id === ed ? { ...p, ...d } : p) : [...pols, { id: `POL-${Date.now()}`, ...d }])
    toast(ed ? 'Policy updated.' : 'Policy added.'); setEd(null); setForm(BLANK)
  }
  return (
    <>
      <div className="vh"><h1>Insurance</h1><p className="muted">Demo policies are saved in this browser only; they are not verified.</p></div>
      <div className="grid g2">
        <div>{pols.length ? pols.map(p => <Policy key={p.id} p={p} onEdit={x => { setEd(x.id); setForm({ prov: x.prov, no: x.no, exp: x.exp, cov: x.cov, veh: x.veh }); setBad({}) }} onDelete={id => { setPols(pols.filter(x => x.id !== id)); if (ed === id) { setEd(null); setForm(BLANK) } toast('Policy deleted.') }} />)
          : <div className="card"><h3>No policies yet</h3><p className="muted">Add your first policy with the form and it appears here.</p></div>}</div>
        <form className={'card' + (shake ? ' shake' : '')} noValidate onSubmit={submit}>
          <h3 style={{ marginBottom: 16 }}>{ed ? 'Edit policy' : 'Add a policy'}</h3>
          <Field label="Provider"><select value={form.prov} onChange={set('prov')}>{PROV.map(x => <option key={x}>{x}</option>)}</select></Field>
          <Field label="Policy number" bad={bad.no} error="Enter at least 5 characters"><input value={form.no} onChange={set('no')} placeholder="e.g. IL-2026-884512" /></Field>
          <Field label="Expiry date" bad={bad.exp} error="Choose today or a future date"><input type="date" value={form.exp} onChange={set('exp')} /></Field>
          <Field label="Coverage type"><select value={form.cov} onChange={set('cov')}>{COV.map(x => <option key={x}>{x}</option>)}</select></Field>
          <Field label="Vehicle number" bad={bad.veh} error="Enter your vehicle number"><input value={form.veh} onChange={set('veh')} placeholder="KA-01-AB-1234" /></Field>
          <div className="row"><button className="btn">{ed ? 'Save changes' : 'Save policy'}</button>{ed && <button type="button" className="btn g" onClick={() => { setEd(null); setForm(BLANK); setBad({}) }}>Cancel</button>}</div>
        </form>
      </div>
      <p className="note">No real insurer is connected and policies are not verified.</p>
    </>
  )
}
