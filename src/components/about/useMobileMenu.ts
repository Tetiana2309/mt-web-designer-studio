import { useCallback, useEffect, useRef, useState } from 'react'

// Same open / close / focus-return behaviour as the mobile menu state in Hero.
export default function useMobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuOpenRef = useRef(false)
  const wasOpenRef = useRef(false)

  const openMenu = useCallback(() => {
    if (menuOpenRef.current) return
    if (window.matchMedia('(min-width: 1280px)').matches) return

    menuOpenRef.current = true
    setMenuOpen(true)
  }, [])

  const closeMenu = useCallback(() => {
    menuOpenRef.current = false
    setMenuOpen(false)
  }, [])

  useEffect(() => {
    if (wasOpenRef.current && !menuOpen && window.matchMedia('(max-width: 1279px)').matches) {
      menuButtonRef.current?.focus()
    }

    wasOpenRef.current = menuOpen
  }, [menuOpen])

  useEffect(() => {
    const breakpoint = window.matchMedia('(min-width: 1280px)')

    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (!event.matches) return

      menuOpenRef.current = false
      setMenuOpen(false)
    }

    breakpoint.addEventListener('change', onBreakpoint)
    return () => breakpoint.removeEventListener('change', onBreakpoint)
  }, [])

  return { menuOpen, menuButtonRef, openMenu, closeMenu }
}
