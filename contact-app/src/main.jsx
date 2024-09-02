import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import Master from './components/Master.jsx'

createRoot(document.getElementById('root')).render(
  <Master></Master>,
)
