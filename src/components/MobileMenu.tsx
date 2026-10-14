import { useEffect, useRef } from 'react'
import { navItems, socialItems } from '../navigation'

interface MobileMenuProps {
  onClose: () => void
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const desktop = window.matchMedia('(min-width: 1280px)')
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) onClose()
    }
    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      document.documentElement.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 min-h-dvh overflow-hidden bg-canvas font-sans text-ink min-[1280px]:hidden"
    >
      {/* HEADER */}
      <div className="absolute top-[max(2.5rem,calc(env(safe-area-inset-top)+0.75rem))] right-[max(1.25rem,env(safe-area-inset-right))] left-[max(1.25rem,env(safe-area-inset-left))] flex items-start justify-between text-[clamp(22px,2.9vw,30px)] leading-[1.1] font-bold tracking-[-0.03em] text-accent">
        <button
          type="button"
          aria-label="M&T — Home"
          onClick={onClose}
          className="nav-link text-accent!"
        >
          M&amp;T
        </button>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="nav-link uppercase text-accent!"
        >
          close
        </button>
      </div>

      {/* NAVIGATION */}
      <nav
        aria-label="Main navigation"
        className="absolute top-[24.9%] left-1/2 -translate-x-1/2 text-[clamp(32px,4.2vw,48px)]"
      >
        <ul className="flex flex-col items-center gap-[0.875em] whitespace-nowrap">
          {navItems.map((item) => (
            <li key={item} className="leading-[1.1]">
              <button
                type="button"
                onClick={onClose}
                className="nav-link text-[1em] leading-[1.1] font-normal tracking-[-0.03em] lowercase"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* SOCIAL */}
      <ul className="absolute top-[71.2%] left-1/2 flex -translate-x-1/2 items-center gap-[34px] whitespace-nowrap">
        {socialItems.map((item) => (
          <li key={item}>
            <button
              type="button"
              onClick={onClose}
              className="nav-link text-[clamp(18px,2.4vw,20px)] leading-[1.1] font-medium tracking-[-0.03em] lowercase opacity-85"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      {/* COPYRIGHT */}
      <p className="absolute bottom-[max(3.75rem,calc(env(safe-area-inset-bottom)+1.5rem))] left-1/2 -translate-x-1/2 text-[clamp(18px,2.4vw,20px)] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap lowercase">
        © 2026 All rights reserved.
      </p>
    </div>
  )
}
