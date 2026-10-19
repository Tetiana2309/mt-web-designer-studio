
import { useState } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router'
import AboutUs from './components/AboutUs'
import AboutUsTwo from './components/AboutUsTwo'
import CaseEcoNatura from './components/CaseEcoNatura'
import Hero from './components/Hero'
import NavigationBridge from './components/NavigationBridge'
import Portfolio from './components/Portfolio'
import Preloader from './components/Preloader'

const PRELOADER_KEY = 'mt-preloader-shown'

// HashRouter keeps deep links working on GitHub Pages without server rewrites.
export default function App() {
  const [showPreloader] = useState(() => {
    try {
      if (sessionStorage.getItem(PRELOADER_KEY) === 'true') {
        return false
      }

      sessionStorage.setItem(PRELOADER_KEY, 'true')
      return true
    } catch {
      return true
    }
  })

  return (
    <HashRouter>
      <NavigationBridge />

      {showPreloader && <Preloader />}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/about-two" element={<AboutUsTwo />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/eco-natura" element={<CaseEcoNatura />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
