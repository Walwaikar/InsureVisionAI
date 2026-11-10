import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Dev server on 5173 to match the FastAPI CORS origins (http://localhost:5173).
export default defineConfig({ plugins: [react()], server: { port: 5173 } })
