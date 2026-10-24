import { useLayoutEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router'

import AboutUs from './components/AboutUs'
import AboutUsTwo from './components/AboutUsTwo'
import CaseEcoNatura from './components/case/CaseEcoNatura'
import CaseCapone from './components/case/CaseCapone'
import CaseVillaBali from './components/case/CaseVillaBali'
import CaseZone from './components/case/CaseZone'
import CaseBeautySculpture from './components/case/CaseBeautySculpture'
import Hero from './components/Hero'
import NavigationBridge from './components/NavigationBridge'
import Portfolio from './components/Portfolio'
import ContactsPage from './ContactsPage'
import Preloader from './components/Preloader'

// ==========================================
// SCROLL TO TOP ON PAGE CHANGE
// ==========================================

function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

// ==========================================
// PRELOADER
// ==========================================


// ==========================================
// APP ROUTER
// ==========================================

// HashRouter keeps deep links working
// on GitHub Pages without server rewrites.

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <NavigationBridge />

      <Preloader />

      <Routes>
        {/* ====================================
            HOME
        ==================================== */}

        <Route
          path="/"
          element={<Hero />}
        />

        {/* ====================================
            ABOUT
        ==================================== */}

        <Route
          path="/about"
          element={<AboutUs />}
        />

        <Route
          path="/about-two"
          element={<AboutUsTwo />}
        />

        {/* ====================================
            PORTFOLIO
        ==================================== */}

        <Route
          path="/portfolio"
          element={<Portfolio />}
        />

        {/* ====================================
            CASE 01 — ECO NATURA
        ==================================== */}

        <Route
          path="/portfolio/eco-natura"
          element={<CaseEcoNatura />}
        />

        {/* ====================================
            CASE 02 — CAPONE AGENCY
        ==================================== */}

        <Route
          path="/portfolio/capone"
          element={<CaseCapone />}
        />

        {/* ====================================
            CASE 03 — VILLA BALI
        ==================================== */}

        <Route
          path="/portfolio/villa-bali"
          element={<CaseVillaBali />}
        />

        {/* ====================================
            CASE 04 — ZONE COMMUNITY
        ==================================== */}

        <Route
          path="/portfolio/zone"
          element={<CaseZone />}
        />

        {/* ====================================
            CASE 05 — BEAUTY SCULPTURE
        ==================================== */}

        <Route
          path="/portfolio/beauty-sculpture"
          element={<CaseBeautySculpture />}
        />

        <Route path="/contacts" element={<ContactsPage />} />

        {/* ====================================
            FALLBACK
        ==================================== */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </HashRouter>
  )
}


