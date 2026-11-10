import { useEffect, useState } from 'react'
import Chat from './Chat.jsx'
import Orb from './Orb.jsx'
export const NAME = 'Sarathi'
export default function Assistant() {
  const [open, setOpen] = useState(false), [hint, setHint] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => { setHint(true); setTimeout(() => setHint(false), 6500) }, 2600)
    const k = e => e.key === 'Escape' && setOpen(false); addEventListener('keydown', k)
    return () => { clearTimeout(t); removeEventListener('keydown', k) }
  }, [])
  const toggle = o => { setOpen(o); setHint(false) }
  return (
    <>
      <button className="fab orb" aria-label={`Open ${NAME}, the virtual assistant`} aria-expanded={open} onClick={() => toggle(!open)}><Orb /></button>
      <div className={'hi' + (hint ? ' show' : '')} role="status">{hint ? `Need help after an incident? Ask ${NAME}.` : ''}</div>
      <section className={'ap' + (open ? ' open' : '')} aria-label="Virtual assistant">
        <div className="chat" style={{ height: '100%' }}>
          <div className="row" style={{ marginBottom: 10, flexWrap: 'nowrap' }}>
            <span className="orb" style={{ width: 44, height: 44, flex: 'none' }}><Orb /></span>
            <div style={{ flex: 1 }}><b className="dsp">{NAME}</b><div className="muted" style={{ fontSize: 13 }}>Virtual assistant · rule-based</div></div>
            <button className="tg" aria-label="Close assistant" onClick={() => toggle(false)}>×</button>
          </div>
          <Chat welcome={`Namaste, I\u2019m ${NAME}. I can walk you through what to do after an accident, insurance, towing and reports. I don\u2019t replace emergency services, so call 112 if anyone is in danger.`}
            quick={['After an accident', 'Insurance help', 'Need towing', 'Nearby hospitals']} placeholder={`Ask ${NAME}`} focusWhen={open} onLink={() => toggle(false)} />
        </div>
      </section>
    </>
  )
}
