import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
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
    // `html { scroll-behavior: smooth }` would animate this reset, so the next
    // page can start (and measure its ScrollTriggers) mid-scroll. On phones
    // the reset must be immediate.
    if (window.matchMedia('(max-width: 767px)').matches) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

// ==========================================
// DESKTOP EDITORIAL PAGE REVEAL
// Only runs after an internal route change, never on first page load.
// Does not alter the scroll, animations or the route components.
// ==========================================

function DesktopPageReveal() {
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)
  const curtain = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const changed = previousPath.current !== pathname
    previousPath.current = pathname

    const node = curtain.current
    if (!node) return

    gsap.killTweensOf(node)

    if (
      !changed ||
      window.innerWidth < 1280 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      gsap.set(node, { clipPath: 'inset(100% 0% 0% 0%)' })
      return
    }

    // The neutral sheet is visible while the new page mounts, then uncovers
    // it from bottom to top. No transformations of existing page elements.
    gsap.fromTo(
      node,
      { clipPath: 'inset(0% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.9,
        ease: 'power3.inOut',
        overwrite: true,
      },
    )

    return () => { gsap.killTweensOf(node) }
  }, [pathname])

  return (
    <div
      ref={curtain}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] bg-canvas"
      style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
    />
  )
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
      <DesktopPageReveal />

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


