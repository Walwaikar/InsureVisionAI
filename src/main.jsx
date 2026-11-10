import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { ToastProvider } from './context/Toast.jsx'
import { AuthProvider } from './context/Auth.jsx'
import { DemoDataProvider } from './context/DemoData.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><ToastProvider><AuthProvider><DemoDataProvider><App /></DemoDataProvider></AuthProvider></ToastProvider></HashRouter>
)
