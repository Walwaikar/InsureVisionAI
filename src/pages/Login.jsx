import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Field from '../components/Field.jsx'
import { useAuth } from '../context/Auth.jsx'
import { useToast } from '../context/Toast.jsx'

const EM = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const BLANK = { name: '', email: '', phone: '', veh: '', password: '' }

export default function Login() {
  const [mode, setMode] = useState('in'), [v, setV] = useState(BLANK), [bad, setBad] = useState({}), [show, setShow] = useState(false), [shake, setShake] = useState(false)
  const { setUser } = useAuth(), toast = useToast(), nav = useNavigate(), up = mode === 'up'
  const set = k => e => setV({ ...v, [k]: e.target.value })
  const fail = () => { setShake(false); requestAnimationFrame(() => setShake(true)) }
  const submit = e => {
    e.preventDefault()
    const b = { email: !EM.test(v.email.trim()), password: v.password.trim().length < 6 }
    if (up) Object.assign(b, { name: v.name.trim().length < 2, phone: !/^\d{10}$/.test(v.phone.trim()), veh: v.veh.trim().length < 4 })
    setBad(b); if (Object.values(b).some(Boolean)) return fail()
    // Demo check only. The real app should call POST /api/v1/auth/login and store the JWT.
    if (!up && !(v.email.trim().toLowerCase() === 'gagan@email.com' && v.password === '123456')) { toast('That email and password don\u2019t match the demo account.'); return fail() }
    setUser(up ? { name: v.name.trim().split(' ')[0], email: v.email.trim().toLowerCase(), phone: v.phone.trim(), vehicle: v.veh.trim().toUpperCase() } : { name: 'Gagan', email: 'gagan@email.com' }); toast(up ? 'Demo profile saved in this browser.' : 'Signed in as Gagan (demo).'); nav('/dashboard')
  }
  return (
    <div className="auth">
      <div className="l">
        <div className="aur" style={{ width: 300, height: 300, background: '#4338CA', left: -60, top: -40 }} /><div className="aur" style={{ width: 240, height: 240, background: '#0FB5A6', right: -40, bottom: -40, animationDelay: '-6s' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="orbit"><i /><i /><Icon n="shield" style={{ stroke: '#fff', width: 64, height: 64, position: 'absolute', inset: 58, strokeWidth: 1.4 }} /></div>
          <h2 style={{ fontSize: 34, margin: '26px 0 12px' }}>Your drive, protected.</h2><p style={{ color: '#B4BCE8', maxWidth: '34ch' }}>Sign in to review incidents, manage policies and find help nearby.</p>
        </div>
      </div>
      <div className="r">
        <div className="tabs">{[['in', 'Sign in'], ['up', 'Create account']].map(([m, l]) => <button key={m} className={mode === m ? 'on' : ''} onClick={() => { setMode(m); setBad({}) }}>{l}</button>)}</div>
        <form className={shake ? 'shake' : ''} noValidate onSubmit={submit}>
          {up && <Field label="Full name" bad={bad.name} error="Enter your name"><input value={v.name} onChange={set('name')} placeholder="Gagan" /></Field>}
          <Field label="Email" bad={bad.email} error="Enter a valid email address"><input type="email" value={v.email} onChange={set('email')} placeholder={up ? 'you@email.com' : 'gagan@email.com'} autoComplete="email" /></Field>
          {up && <><Field label="Phone" bad={bad.phone} error="Enter a 10-digit number"><input type="tel" value={v.phone} onChange={set('phone')} placeholder="10-digit mobile number" /></Field>
            <Field label="Vehicle number" bad={bad.veh} error="Enter your vehicle number"><input value={v.veh} onChange={set('veh')} placeholder="KA-01-AB-1234" /></Field></>}
          <div className={'f password-field' + (bad.password ? ' bad' : '')}>
            <div className="password-label-row"><label htmlFor="account-password">Password</label><button type="button" className="password-toggle" aria-label={show ? 'Hide password' : 'Show password'} title={show ? 'Hide password' : 'Show password'} aria-pressed={show} onClick={() => setShow(!show)}><Icon n={show ? 'eyeOff' : 'eye'} /></button></div>
            <input id="account-password" type={show ? 'text' : 'password'} value={v.password} onChange={set('password')} placeholder="At least 6 characters" autoComplete={up ? 'new-password' : 'current-password'} />
            <small>Use at least 6 characters</small>
          </div>
          <div className="row" style={{ marginBottom: 18 }}>
            {!up && <button type="button" className="chip" onClick={() => setV({ ...v, email: 'gagan@email.com', password: '123456' })}>Fill demo account</button>}
          </div>
          <button className="btn" style={{ width: '100%', justifyContent: 'center' }}>{up ? 'Create account' : 'Sign in'}</button>
          <p className="note">Demo only: nothing is sent or stored. Demo login: gagan@email.com / 123456.</p>
        </form>
      </div>
    </div>
  )
}
