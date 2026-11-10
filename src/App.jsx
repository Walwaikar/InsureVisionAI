import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Assistant from './components/Assistant.jsx'
import { useReveal } from './hooks.js'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Incidents from './pages/Incidents.jsx'
import Services from './pages/Services.jsx'
import Insurance from './pages/Insurance.jsx'
import Login from './pages/Login.jsx'
import Help from './pages/Help.jsx'

export default function App() {
  const { pathname } = useLocation()
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('ivt') === 'dark' ? 'dark' : 'light' } catch { return 'light' } })
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('ivt', theme) } catch { /* storage unavailable */ } }, [theme])
  useEffect(() => { scrollTo(0, 0) }, [pathname])
  useReveal(pathname)
  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/services" element={<Services />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/login" element={<Login />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Assistant />
    </>
  )
}
