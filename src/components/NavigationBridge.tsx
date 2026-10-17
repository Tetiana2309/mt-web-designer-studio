import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { navRoutes } from '../navigation'

const LOGO_LABEL = 'M&T — Home'

// Connects the header / menu navigation buttons to the router.
// Hero and its mobile menu render plain buttons and are intentionally left
// untouched, so clicks are resolved here by the button's aria-label.
export default function NavigationBridge() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return

      const button = event.target.closest('button')
      if (!button) return

      const label = button.getAttribute('aria-label')
      if (!label) return

      const inNavigation = button.closest('nav[aria-label="Main navigation"]')
      const target = label === LOGO_LABEL ? '/' : inNavigation ? navRoutes[label] : undefined

      if (target === undefined || target === pathname) return

      navigate(target)
      window.scrollTo(0, 0)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate, pathname])

  return null
}
