import { useState } from 'react'
import Chat from '../components/Chat.jsx'
import Orb from '../components/Orb.jsx'
import { NAME } from '../components/Assistant.jsx'
import { useToast } from '../context/Toast.jsx'
import { useDemoData } from '../context/DemoData.jsx'

const BLANK = { name: '', relationship: '', phone: '' }
const NEXT = { Requested: 'Accepted', Accepted: 'In Progress', 'In Progress': 'Completed' }

export default function Help() {
  const { contacts, setContacts, sosRequests, setSosRequests, assistanceRequests, setAssistanceRequests } = useDemoData()
  const [form, setForm] = useState(BLANK), [editing, setEditing] = useState(null)
  const toast = useToast()
  const saveContact = e => {
    e.preventDefault()
    const contact = { ...form, name: form.name.trim(), relationship: form.relationship.trim(), phone: form.phone.trim(), id: editing || `CONTACT-${Date.now()}` }
    setContacts(editing ? contacts.map(c => c.id === editing ? contact : c) : [...contacts, contact])
    setForm(BLANK); setEditing(null); toast(editing ? 'Contact updated in this browser.' : 'Contact saved in this browser.')
  }
  const addSos = () => {
    setSosRequests([{ id: `SOS-${Date.now()}`, status: 'Recorded (demo)', createdAt: new Date().toLocaleString() }, ...sosRequests])
    toast('Demo SOS request saved here. Nobody was contacted. Call 112 for real emergencies.')
  }
  const addAssistance = type => {
    setAssistanceRequests([{ id: `ASST-${Date.now()}`, type, status: 'Requested', createdAt: new Date().toLocaleString() }, ...assistanceRequests])
    toast(`${type} request saved as a demo only. It was not dispatched.`)
  }
  return (
    <>
      <div className="vh"><h1>SOS &amp; assistant</h1><p className="muted">These are local demo records only. If you are in danger, call 112 now.</p></div>
      <div className="grid g2">
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Emergency SOS</h3><button className="sos" aria-label="Save demo SOS request" onClick={addSos}>SOS</button>
          <div className="row" style={{ justifyContent: 'center' }}>{['Rescue Team', 'Towing', 'Medical Assistance'].map(r => <button key={r} className="chip" onClick={() => addAssistance(r)}>{r}</button>)}</div>
          <p className="note">Saves a request in this browser only; no emergency service or contact is notified.</p>
          {(sosRequests.length > 0 || assistanceRequests.length > 0) && <div className="request-list"><h3>Saved demo requests</h3>{sosRequests.map(r => <div className="request-row" key={r.id}><span><b>SOS</b> · {r.createdAt}</span><span className="pill dm">{r.status}</span></div>)}{assistanceRequests.map(r => <div className="request-row" key={r.id}><span><b>{r.type}</b> · {r.createdAt}</span>{NEXT[r.status] ? <button className="chip" onClick={() => setAssistanceRequests(assistanceRequests.map(x => x.id === r.id ? { ...x, status: NEXT[x.status] } : x))}>{r.status} · advance</button> : <span className="pill dm">{r.status}</span>}</div>)}</div>}
        </div>
        <div className="card chat">
          <div className="row" style={{ marginBottom: 10, flexWrap: 'nowrap' }}><span className="orb" style={{ width: 44, height: 44, flex: 'none' }}><Orb /></span><div style={{ flex: 1 }}><b className="dsp">{NAME}</b><div className="muted" style={{ fontSize: 13 }}>Your virtual assistant · rule-based</div></div></div>
          <Chat welcome={`Namaste, I’m ${NAME}. Ask me about accidents, insurance, towing or reports. Call 112 if anyone is in danger.`} quick={['What do I do after an accident?', 'Insurance help', 'Need towing', 'Get my report']} placeholder={`Ask ${NAME}`} />
        </div>
      </div>
      <section className="sec contacts-section">
        <h2>Emergency contacts</h2><p className="muted">Manage contacts saved in this browser. The app will not call or notify them.</p>
        <div className="grid g2" style={{ marginTop: 18 }}>
          <form className="card" onSubmit={saveContact}><h3 style={{ marginBottom: 16 }}>{editing ? 'Edit contact' : 'Add a contact'}</h3>
            <label className="f"><span>Name</span><input required minLength="2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Contact name" /></label>
            <label className="f"><span>Relationship</span><input required value={form.relationship} onChange={e => setForm({ ...form, relationship: e.target.value })} placeholder="e.g. Family" /></label>
            <label className="f"><span>Phone</span><input required type="tel" pattern="[+0-9() -]{7,20}" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" /></label>
            <div className="row"><button className="btn">{editing ? 'Save contact' : 'Add contact'}</button>{editing && <button type="button" className="btn g" onClick={() => { setForm(BLANK); setEditing(null) }}>Cancel</button>}</div>
          </form>
          <div>{contacts.length ? contacts.map(c => <article className="card contact-card" key={c.id}><div><b>{c.name}</b><div className="muted">{c.relationship} · {c.phone}</div></div><div className="row"><button className="chip" onClick={() => { setEditing(c.id); setForm({ name: c.name, relationship: c.relationship, phone: c.phone }) }}>Edit</button><button className="chip" onClick={() => setContacts(contacts.filter(x => x.id !== c.id))}>Delete</button></div></article>) : <div className="card"><h3>No contacts saved</h3><p className="muted">Add a trusted contact for reference.</p></div>}</div>
        </div>
      </section>
      <p className="note">Local browser storage is not a secure account system and does not sync across devices.</p>
    </>
  )
}
