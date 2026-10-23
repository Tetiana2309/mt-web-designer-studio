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

  return null
}
