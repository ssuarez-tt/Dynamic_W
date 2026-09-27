import React from 'react' // unnecessary import in React 17 and later
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)