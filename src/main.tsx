
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import App from './App'
import installCaseCanvasScale from './caseCanvasScale'
import './index.css'

// Convert old #/page links to clean paths and remove ChatGPT referral tracking
// from the address bar without reloading or altering the rendered page.
const initialUrl = new URL(window.location.href)
const legacyPath = initialUrl.hash.startsWith('#/') ? initialUrl.hash.slice(1) : null
const removeReferral = initialUrl.searchParams.get('utm_source') === 'chatgpt.com'
if (removeReferral) initialUrl.searchParams.delete('utm_source')
if (legacyPath || removeReferral) {
  window.history.replaceState(
    window.history.state,
    '',
    `${legacyPath ?? initialUrl.pathname}${initialUrl.search}${legacyPath ? '' : initialUrl.hash}`,
  )
}

installCaseCanvasScale()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
