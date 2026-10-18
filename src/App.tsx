
import { useState } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router'
import AboutUs from './components/AboutUs'
import Hero from './components/Hero'
import NavigationBridge from './components/NavigationBridge'
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
