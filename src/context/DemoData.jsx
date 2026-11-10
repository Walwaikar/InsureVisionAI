import { createContext, useContext, useEffect, useState } from 'react'
import { INC } from '../data.js'

const Ctx = createContext(null)
const read = (key, fallback) => {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback }
  catch { return fallback }
}

export function DemoDataProvider({ children }) {
  const [incidents, setIncidents] = useState(() => read('iv-demo-incidents', INC))
  const [policies, setPolicies] = useState(() => read('iv-demo-policies', [{ id: 1, prov: 'ICICI Lombard', no: 'IL-2026-884512', exp: '2026-12-14', cov: 'Comprehensive', veh: 'KA-01-AB-1234' }]))
  const [contacts, setContacts] = useState(() => read('iv-demo-contacts', []))
  const [sosRequests, setSosRequests] = useState(() => read('iv-demo-sos', []))
  const [assistanceRequests, setAssistanceRequests] = useState(() => read('iv-demo-assistance', []))
  useEffect(() => { try { localStorage.setItem('iv-demo-incidents', JSON.stringify(incidents)) } catch { /* storage may be unavailable */ } }, [incidents])
  useEffect(() => { try { localStorage.setItem('iv-demo-policies', JSON.stringify(policies)) } catch { /* storage may be unavailable */ } }, [policies])
  useEffect(() => { try { localStorage.setItem('iv-demo-contacts', JSON.stringify(contacts)) } catch { /* storage may be unavailable */ } }, [contacts])
  useEffect(() => { try { localStorage.setItem('iv-demo-sos', JSON.stringify(sosRequests)) } catch { /* storage may be unavailable */ } }, [sosRequests])
  useEffect(() => { try { localStorage.setItem('iv-demo-assistance', JSON.stringify(assistanceRequests)) } catch { /* storage may be unavailable */ } }, [assistanceRequests])
  return <Ctx.Provider value={{ incidents, setIncidents, policies, setPolicies, contacts, setContacts, sosRequests, setSosRequests, assistanceRequests, setAssistanceRequests }}>{children}</Ctx.Provider>
}
export const useDemoData = () => {
  const value = useContext(Ctx)
  if (!value) throw new Error('useDemoData must be used inside DemoDataProvider')
  return value
}
