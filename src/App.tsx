import { HashRouter, Navigate, Route, Routes } from 'react-router'
import AboutUs from './components/AboutUs'
import Hero from './components/Hero'
import NavigationBridge from './components/NavigationBridge'
import Preloader from './components/Preloader'

// HashRouter keeps deep links working on GitHub Pages without server rewrites.
export default function App() {
  return (
    <HashRouter>
      <NavigationBridge />
      <Preloader />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
