import type { RefObject } from 'react'
import { navItems } from '../../navigation'
import CtaButton from '../CtaButton'
import TextSwapButton from './TextSwapButton'

interface AboutHeaderProps {
  menuOpen: boolean
  menuButtonRef: RefObject<HTMLButtonElement | null>
  onOpenMenu: () => void
}

// Header identical to the Hero header: mobile (logo + MENU) below 1280px,
// desktop (logo, navigation, CTA) from 1280px.
export default function AboutHeader({ menuOpen, menuButtonRef, onOpenMenu }: AboutHeaderProps) {
  return (
    <header className="absolute top-[max(2.5rem,calc(env(safe-area-inset-top)+0.75rem))] right-[max(1.25rem,env(safe-area-inset-right))] left-[max(1.25rem,env(safe-area-inset-left))] flex items-start justify-between min-[1280px]:top-[clamp(14px,1.0417vw,20px)] min-[1280px]:right-[clamp(24px,2.0833vw,40px)] min-[1280px]:left-[clamp(24px,2.0833vw,40px)] min-[1280px]:h-9.5">
      {/* LOGO */}
      <div className="overflow-hidden">
        <button
          data-hero-logo
          type="button"
          aria-label="M&T — Home"
          className="nav-link font-sans text-[clamp(22px,2.9vw,30px)] leading-[1.1] font-bold tracking-[-0.03em] text-accent! min-[1280px]:mt-1.5 min-[1280px]:text-[clamp(20px,1.25vw,24px)]"
        >
          M&amp;T
        </button>
      </div>

      {/* MOBILE MENU BUTTON */}
      <div className="overflow-hidden min-[1280px]:hidden">
        <button
          ref={menuButtonRef}
          data-hero-mobile-trigger
          type="button"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          onClick={onOpenMenu}
          className="group/swap nav-link cursor-pointer font-sans text-[clamp(22px,2.9vw,30px)] leading-[1.1] font-bold tracking-[-0.03em] text-accent! uppercase"
        >
          <span className="relative block overflow-hidden">
            <span
              aria-hidden="true"
              className="block text-accent transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:-translate-y-full group-focus-visible/swap:-translate-y-full"
            >
              menu
            </span>

            <span
              aria-hidden="true"
              className="absolute inset-0 block translate-y-full text-ink transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:translate-y-0 group-focus-visible/swap:translate-y-0"
            >
              menu
            </span>
          </span>
        </button>
      </div>

      {/* DESKTOP NAVIGATION */}
      <nav
        aria-label="Main navigation"
        className="absolute top-2.25 left-1/2 hidden -translate-x-1/2 min-[1280px]:block"
      >
        <ul className="flex items-center gap-7 whitespace-nowrap">
          {navItems.map((item) => (
            <li key={item} data-hero-nav-mask className="overflow-hidden">
              <TextSwapButton
                label={item}
                className="nav-link font-sans text-[clamp(16px,1.0417vw,20px)] leading-[1.1] font-medium tracking-[-0.54px] lowercase"
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* DESKTOP CTA */}
      <div className="hidden min-[1280px]:block">
        <CtaButton />
      </div>
    </header>
  )
}
