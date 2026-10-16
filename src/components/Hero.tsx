
import { useCallback, useEffect, useRef, useState } from 'react'
import { navItems, socialItems } from '../navigation'
import CtaButton from './CtaButton'
import InfiniteSpiral from './InfiniteSpiral'
import MobileMenu from './MobileMenu'

const previewImages = [1, 2, 3, 4, 5].map(
  (n) => `${import.meta.env.BASE_URL}images/Preview%20${n}.webp`,
)

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const wasOpen = useRef(false)

  // Return focus to the MENU button after the menu closes.
  useEffect(() => {
    if (wasOpen.current && !menuOpen) menuButtonRef.current?.focus()
    wasOpen.current = menuOpen
  }, [menuOpen])

  return (
    <section className="relative min-h-dvh overflow-hidden bg-canvas font-sans text-ink">
      {/* BACKGROUND SPIRAL — ALL SCREEN SIZES */}
      <div className="pointer-events-none absolute inset-0">
        <InfiniteSpiral images={previewImages} />
      </div>

      <div inert={menuOpen}>
        {/* HEADER */}
        <header className="absolute top-[max(2.5rem,calc(env(safe-area-inset-top)+0.75rem))] right-[max(1.25rem,env(safe-area-inset-right))] left-[max(1.25rem,env(safe-area-inset-left))] flex items-start justify-between min-[1280px]:top-[clamp(14px,1.0417vw,20px)] min-[1280px]:right-[clamp(24px,2.0833vw,40px)] min-[1280px]:left-[clamp(24px,2.0833vw,40px)] min-[1280px]:h-9.5">
          {/* LOGO */}
          <button
            type="button"
            aria-label="M&T — Home"
            className="nav-link font-sans text-[clamp(22px,2.9vw,30px)] leading-[1.1] font-bold tracking-[-0.03em] text-accent! min-[1280px]:mt-1.5 min-[1280px]:text-[clamp(20px,1.25vw,24px)]"
          >
            M&amp;T
          </button>

          {/* MOBILE MENU TRIGGER */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="nav-link font-sans text-[clamp(22px,2.9vw,30px)] leading-[1.1] font-bold tracking-[-0.03em] text-accent! uppercase min-[1280px]:hidden"
          >
            menu
          </button>

          {/* NAVIGATION */}
          <nav
            aria-label="Main navigation"
            className="absolute top-2.25 left-1/2 hidden -translate-x-1/2 min-[1280px]:block"
          >
            <ul className="flex items-center gap-7 whitespace-nowrap">
              {navItems.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="nav-link font-sans text-[clamp(16px,1.0417vw,20px)] leading-[1.1] font-medium tracking-[-0.54px] lowercase"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* HEADER CTA (desktop) */}
          <div className="hidden min-[1280px]:block">
            <CtaButton />
          </div>
        </header>

        {/* HERO TITLE */}
        <h1 className="absolute top-[calc(50%-3.2em)] left-1/2 w-[6.15em] -translate-x-1/2 text-[clamp(60px,7.5vw,96px)] leading-[1.1] tracking-[-0.03em] min-[1280px]:top-[calc(50%-min(226px,11.77vw))] min-[1280px]:left-[calc(50%-min(542px,28.23vw))] min-[1280px]:w-[min(1085px,56.5vw)] min-[1280px]:translate-x-0 min-[1280px]:text-[min(184px,9.583vw)] min-[1280px]:leading-[0.86]">
          <span className="font-light text-ink min-[1280px]:font-extralight">
            We create websites that{' '}
          </span>

          <span className="font-semibold text-accent min-[1280px]:font-medium">
            drive results.
          </span>
        </h1>

        {/* CTA (mobile / tablet) */}
        <div className="absolute top-[69%] left-1/2 -translate-x-1/2 min-[1280px]:hidden">
          <CtaButton />
        </div>

        {/* FOOTER */}
        <footer className="absolute right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(3.75rem,calc(env(safe-area-inset-bottom)+1.5rem))] left-[max(1.25rem,env(safe-area-inset-left))] flex h-5 items-start justify-between font-sans text-[clamp(18px,2.4vw,20px)] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-ink lowercase min-[1280px]:right-[clamp(24px,2.0833vw,40px)] min-[1280px]:bottom-[clamp(14px,1.0417vw,20px)] min-[1280px]:left-[clamp(24px,2.0833vw,40px)] min-[1280px]:h-5.5 min-[1280px]:text-[clamp(16px,1.0417vw,20px)]">
          <p className="hidden min-[1280px]:block">
            © 2026 All rights reserved.
          </p>

          <p className="absolute left-1/2 -translate-x-1/2 opacity-85 min-[1280px]:left-[48.696%] min-[1280px]:translate-x-0 min-[1280px]:opacity-100">
            We listen. We think. We deliver.
          </p>

          <ul className="hidden items-center gap-8.5 min-[1280px]:flex">
            {socialItems.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  className="nav-link font-sans text-[clamp(16px,1.0417vw,20px)] leading-[1.1] font-medium tracking-[-0.6px] lowercase"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </footer>
      </div>

      {menuOpen && <MobileMenu onClose={closeMenu} />}
    </section>
  )
}
