import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { actionFor, reply } from '../data.js'
import { RM } from '../hooks.js'
// Shared by the SOS page and the floating assistant. Rule-based now; swap `reply` for an AI provider later.
export default function Chat({ welcome, quick, placeholder, focusWhen, onLink }) {
  const [msgs, setMsgs] = useState([{ r: 'a', t: welcome }]), [typing, setTyping] = useState(false), [q, setQ] = useState('')
  const end = useRef(), input = useRef()
  useEffect(() => { end.current && (end.current.scrollTop = end.current.scrollHeight) }, [msgs, typing])
  useEffect(() => { if (focusWhen) { const t = setTimeout(() => input.current?.focus(), 300); return () => clearTimeout(t) } }, [focusWhen])
  const ask = text => {
    if (!text.trim()) return
    setMsgs(m => [...m, { r: 'u', t: text }]); setTyping(true)
    setTimeout(() => { setTyping(false); setMsgs(m => [...m, { r: 'a', t: reply(text), act: actionFor(text) }]) }, RM ? 0 : 700)
  }
  return (
    <>
      <div className="msgs" ref={end} aria-live="polite">
        {msgs.map((m, i) => <div key={i} className={'m ' + m.r}>{m.t}{m.act && <><br /><Link className="chip on" style={{ display: 'inline-block', marginTop: 8 }} to={m.act[1]} onClick={onLink}>{m.act[0]}</Link></>}</div>)}
        {typing && <div className="m a ty"><i /><i /><i /></div>}
      </div>
      <div className="chips" style={{ margin: '10px 0 0' }}>{quick.map(s => <button key={s} className="chip" onClick={() => ask(s)}>{s}</button>)}</div>
      <form onSubmit={e => { e.preventDefault(); ask(q); setQ('') }}>
        <input ref={input} value={q} onChange={e => setQ(e.target.value)} placeholder={placeholder} aria-label={placeholder} autoComplete="off" />
        <button className="btn">Send</button>
      </form>
    </>
  )
}
