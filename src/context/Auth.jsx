import { createContext, useContext, useState } from 'react'
const Ctx = createContext({ user: null, setUser() {} })
export const useAuth = () => useContext(Ctx)
// Demo-only auth state. Replace with POST /api/v1/auth/login and a JWT when the backend is connected.
export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() => { try { return JSON.parse(localStorage.getItem('iv-demo-user')) } catch { return null } })
  const setUser = value => setUserState(current => {
    const next = typeof value === 'function' ? value(current) : value
    try { if (next) localStorage.setItem('iv-demo-user', JSON.stringify(next)); else localStorage.removeItem('iv-demo-user') } catch { /* storage may be unavailable */ }
    return next
  })
  return <Ctx.Provider value={{ user, setUser }}>{children}</Ctx.Provider>
}
