import { createContext, useCallback, useContext, useRef, useState } from 'react'
const Ctx = createContext(() => {})
export const useToast = () => useContext(Ctx)
export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(''), [show, setShow] = useState(false), t = useRef()
  const toast = useCallback(m => { setMsg(m); setShow(true); clearTimeout(t.current); t.current = setTimeout(() => setShow(false), 3800) }, [])
  return <Ctx.Provider value={toast}>{children}<div className={'toast' + (show ? ' show' : '')} role="status" aria-live="polite">{msg}</div></Ctx.Provider>
}
