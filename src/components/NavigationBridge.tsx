import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { navRoutes } from '../navigation'

const LOGO_LABEL = 'M&T — Home'

// Routes existing header, CTA and mobile-menu buttons without changing
// their markup or animations.
export default function NavigationBridge() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return

      const button = event.target.closest('button')
      if (!button) return

      const label = button.getAttribute('aria-label')
      const isCta = Boolean(button.closest('[data-cta-root]'))
      const inNavigation = Boolean(button.closest('nav[aria-label="Main navigation"]'))

      // The LET'S TALK button has no aria-label: recognize it first.
      const target =
        isCta ? '/contacts'
        : label === LOGO_LABEL ? '/'
        : inNavigation && label ? navRoutes[label.toLowerCase()]
        : undefined

      if (!target || target === pathname) return

      navigate(target)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate, pathname])

  useEffect(() => {
    if (!pathname.startsWith('/portfolio/')) return

    // Case-study animations use transformed, overlapping canvases. Some
    // browsers hit-test an overlay instead of the visually exposed link.
    // Resolve a click inside a visible case-navigation link's screen bounds
    // before the animated layer can consume it.
    const onCaseClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(
        'a[aria-label="next cases"], a[aria-label="last case"]',
      ))
      const clicked = event.target.closest<HTMLAnchorElement>(
        'a[aria-label="next cases"], a[aria-label="last case"]',
      )
      const link = clicked ?? links.find((candidate) => {
        const rect = candidate.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) return false
        if (event.clientX < rect.left || event.clientX > rect.right ||
            event.clientY < rect.top || event.clientY > rect.bottom) return false
        let ancestor: Element | null = candidate
        while (ancestor) {
          const style = window.getComputedStyle(ancestor)
          if (style.display === 'none' || style.visibility === 'hidden' ||
              Number(style.opacity) === 0) return false
          ancestor = ancestor.parentElement
        }
        return true
      })
      if (!link) return
      const destination = new URL(link.href, window.location.href)
      if (destination.origin !== window.location.origin ||
          !destination.pathname.startsWith('/portfolio/') ||
          destination.pathname === pathname) return
      event.preventDefault()
      event.stopPropagation()
      navigate(destination.pathname)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

    document.addEventListener('click', onCaseClick, true)
    return () => document.removeEventListener('click', onCaseClick, true)
  }, [navigate, pathname])

  return null
}
