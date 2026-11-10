import { Link, NavLink } from 'react-router-dom'
import Icon from './Icon.jsx'
import { useAuth } from '../context/Auth.jsx'
const LINKS = [['/', 'Home'], ['/dashboard', 'Dashboard'], ['/incidents', 'Incidents'], ['/services', 'Nearby'], ['/insurance', 'Insurance'], ['/help', 'SOS']]
export default function Header({ theme, setTheme }) {
  const { user } = useAuth()
  return (
    <header>
      <Link className="logo" to="/"><i><Icon n="shield" style={{ stroke: '#fff' }} /></i>InsureVision<span style={{ color: 'var(--b2)' }}>AI</span></Link>
      <nav>{LINKS.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'on' : ''}>{l}</NavLink>)}</nav>
      <Link className="btn" id="lg" to={user ? '/dashboard' : '/login'} style={{ padding: '8px 16px', fontSize: 14 }}>{user ? 'Hi, ' + user.name : 'Sign in'}</Link>
      <button
        className="tg theme-toggle"
        id="th"
        type="button"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <Icon n={theme === 'dark' ? 'sun' : 'moon'} />
      </button>
    </header>
  )
}
