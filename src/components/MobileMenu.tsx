
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import gsap from 'gsap'

import setChromeTint, { CHROME_ACCENT, CHROME_CANVAS } from '../chromeTint'
import { navItems, socialItems } from '../navigation'

const socialLinks: Record<string, string> = {
  telegram: 'https://t.me/mtwebdesignerstudio',
  whatsapp: 'https://wa.me/4915569403496',
  email: 'mailto:tmwebdesigneragency@gmail.com',
}

interface MobileMenuProps {
  onClose: () => void
}

const MOBILE_STRIPES = 6
const TABLET_STRIPES = 12
const TABLET_BREAKPOINT = 600

// Experiment only: Safari on iPhone gets taller animated stripes.
// Browser chrome remains controlled by Safari, not by this element.
const SAFARI_STRIPE_HEIGHT = 1000

function isIPhoneSafari(): boolean {
  if (typeof navigator === 'undefined') return false

  const ua = navigator.userAgent
  return (
    /iPhone/.test(ua) &&
    /Safari/.test(ua) &&
    !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua)
  )
}

function getStripeCount(): number {
  if (typeof window === 'undefined') {
    return MOBILE_STRIPES
  }

  return window.innerWidth >= TABLET_BREAKPOINT
    ? TABLET_STRIPES
    : MOBILE_STRIPES
}

// ==========================================
// MOBILE MENU
// ==========================================

export default function MobileMenu({
  onClose,
}: MobileMenuProps) {
  const [stripeCount] = useState(getStripeCount)
  const [safariStripes] = useState(isIPhoneSafari)

  const rootRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLUListElement>(null)
  const copyrightRef = useRef<HTMLParagraphElement>(null)

  const stripeRefs = useRef<(HTMLDivElement | null)[]>([])
  const linkRefs = useRef<(HTMLSpanElement | null)[]>([])

  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const closingRef = useRef(false)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  // ==========================================
  // CLOSE MENU — ORIGINAL GSAP
  // ==========================================

  const closeMenu = useCallback(() => {
    if (closingRef.current) return

    const root = rootRef.current

    const stripes = stripeRefs.current.filter(
      (element): element is HTMLDivElement =>
        element !== null,
    )

    const links = linkRefs.current.filter(
      (element): element is HTMLSpanElement =>
        element !== null,
    )

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (
      !root ||
      reducedMotion ||
      stripes.length !== stripeCount
    ) {
      closingRef.current = true
      onCloseRef.current()
      return
    }

    closingRef.current = true
    timelineRef.current?.kill()

    const timeline = gsap.timeline({
      onComplete: () => {
        onCloseRef.current()
      },
    })

    // Safari chrome follows the blue stripes while they cover the viewport.
    timeline.call(() => setChromeTint(CHROME_ACCENT), [], 0.35)

    // STEP 1: Hide navigation.

    timeline.to(links, {
      yPercent: 115,
      duration: 0.28,
      stagger: {
        each: 0.035,
        from: 'end',
      },
      ease: 'power2.in',
    })

    // Hide header, socials and copyright.

    timeline.to(
      [
        headerRef.current,
        socialRef.current,
        copyrightRef.current,
      ],
      {
        autoAlpha: 0,
        duration: 0.22,
        ease: 'power2.in',
      },
      0,
    )

    // STEP 2: Assemble fragments.

    timeline.to(
      stripes,
      {
        yPercent: 0,
        duration: 0.75,
        stagger: {
          each:
            stripeCount === TABLET_STRIPES
              ? 0.025
              : 0.045,
          from: 'end',
        },
        ease: 'power3.inOut',
        overwrite: 'auto',
      },
      0.12,
    )

    // STEP 3: Pause with complete M&T logo.

    timeline.to(
      {},
      {
        duration: 0.15,
      },
    )

    // STEP 4: Transparent background.

    timeline.set(root, {
      backgroundColor: 'transparent',
    })

    // STEP 5: Reveal page.

    timeline.to(stripes, {
      yPercent: (index: number) =>
        index % 2 === 0 ? -105 : 105,
      duration: 0.95,
      stagger:
        stripeCount === TABLET_STRIPES
          ? 0.027
          : 0.055,
      ease: 'power3.inOut',
      overwrite: 'auto',
    })

    // ...and returns to the canvas colour once the page is being revealed.
    timeline.call(() => setChromeTint(CHROME_CANVAS), [], '<+=0.5')

    timelineRef.current = timeline
  }, [stripeCount])

  // ==========================================
  // OPEN MENU — ORIGINAL GSAP
  // ==========================================

  useLayoutEffect(() => {
    const root = rootRef.current
    const header = headerRef.current
    const social = socialRef.current
    const copyright = copyrightRef.current

    if (!root || !header || !social || !copyright) {
      return
    }

    const stripes = stripeRefs.current.filter(
      (element): element is HTMLDivElement =>
        element !== null,
    )

    const links = linkRefs.current.filter(
      (element): element is HTMLSpanElement =>
        element !== null,
    )

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    const desktop = window.matchMedia(
      '(min-width: 1280px)',
    )

    // ========================================
    // SCROLL LOCK — FIXED
    // ========================================

    const html = document.documentElement

    const previousOverflow = html.style.overflow

    // Lock background scrolling
    // only while the mobile menu is mounted.
    html.style.overflow = 'hidden'

    const restoreScroll = () => {
      const preloaderIsActive = Boolean(
        document.querySelector(
          '[role="status"][aria-label="Loading M&T Web Designer Studio"]',
        ),
      )

      if (preloaderIsActive) {
        // Preloader still owns the scroll lock.
        html.style.overflow = 'hidden'
        return
      }

      // Recover from a stale lock left by
      // the preloader or an earlier menu.
      html.style.overflow =
        previousOverflow === 'hidden'
          ? ''
          : previousOverflow
    }

    // ========================================
    // KEYBOARD HANDLING
    // ========================================

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }

      if (
        event.key !== 'Tab' ||
        closingRef.current
      ) {
        return
      }

      const focusable = Array.from(
        root.querySelectorAll<HTMLButtonElement>(
          'button:not([disabled])',
        ),
      ).filter((element) => {
        const style = window.getComputedStyle(element)

        return (
          style.visibility !== 'hidden' &&
          style.display !== 'none' &&
          element.getClientRects().length > 0
        )
      })

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (!first || !last) return

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault()
        last.focus()
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault()
        first.focus()
      }
    }

    const onBreakpoint = (
      event: MediaQueryListEvent,
    ) => {
      if (event.matches) {
        timelineRef.current?.kill()
        onCloseRef.current()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    desktop.addEventListener(
      'change',
      onBreakpoint,
    )

    // ========================================
    // REDUCED MOTION
    // ========================================

    if (reducedMotion.matches) {
      gsap.set(stripes, {
        autoAlpha: 0,
      })

      gsap.set(
        [header, social, copyright],
        {
          autoAlpha: 1,
        },
      )

      gsap.set(links, {
        yPercent: 0,
      })

      closeRef.current?.focus()
    } else {
      // Initial state of fragments.

      gsap.set(stripes, {
        yPercent: 0,
        autoAlpha: 1,
      })

      gsap.set(
        [header, social, copyright],
        {
          autoAlpha: 0,
        },
      )

      gsap.set(links, {
        yPercent: 115,
      })

      const timeline = gsap.timeline({
        onComplete: () => {
          closeRef.current?.focus()
        },
      })

      // Safari chrome matches the blue stripes, then the gray menu.
      setChromeTint(CHROME_ACCENT)
      timeline.call(() => setChromeTint(CHROME_CANVAS), [], 1)

      // OPEN: Split M&T and description.

      timeline.to(stripes, {
        yPercent: (index: number) =>
          index % 2 === 0 ? -105 : 105,
        duration: 1.05,
        stagger:
          stripeCount === TABLET_STRIPES
            ? 0.032
            : 0.065,
        ease: 'power3.inOut',
      })

      // Reveal header.

      timeline.to(
        header,
        {
          autoAlpha: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
        0.4,
      )

      // Reveal navigation links.

      timeline.to(
        links,
        {
          yPercent: 0,
          duration: 0.65,
          stagger: 0.085,
          ease: 'power3.out',
        },
        0.55,
      )

      // Reveal socials and copyright.

      timeline.to(
        [social, copyright],
        {
          autoAlpha: 1,
          duration: 0.35,
          stagger: 0.08,
          ease: 'power2.out',
        },
        0.9,
      )

      timelineRef.current = timeline
    }

    return () => {
      timelineRef.current?.kill()
      setChromeTint(CHROME_CANVAS)

      // ======================================
      // RESTORE SCROLL ON MENU UNMOUNT
      // ======================================

      restoreScroll()

      document.removeEventListener(
        'keydown',
        onKeyDown,
      )

      desktop.removeEventListener(
        'change',
        onBreakpoint,
      )
    }
  }, [closeMenu, stripeCount])

  // ==========================================
  // JSX — ORIGINAL DESIGN
  // ==========================================

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 min-h-dvh overflow-hidden bg-canvas font-sans text-ink min-[1280px]:hidden"
      style={safariStripes ? { overflow: 'visible' } : undefined}
    >
      {/* ====================================
          HEADER
      ==================================== */}

      <div
        ref={headerRef}
        className="absolute top-[max(2.5rem,calc(env(safe-area-inset-top)+0.75rem))] right-[max(1.25rem,env(safe-area-inset-right))] left-[max(1.25rem,env(safe-area-inset-left))] flex items-start justify-between text-[clamp(22px,2.9vw,30px)] leading-[1.1] font-bold tracking-[-0.03em] text-accent"
      >
        {/* LOGO — UNCHANGED */}

        <button
          type="button"
          aria-label="M&T — Home"
          onClick={closeMenu}
          className="nav-link text-accent!"
        >
          M&amp;T
        </button>

        {/* CLOSE — HOVER / FOCUS */}

        <button
          ref={closeRef}
          type="button"
          onClick={closeMenu}
          aria-label="Close menu"
          className="group/swap nav-link cursor-pointer uppercase text-accent!"
        >
          <span className="relative block overflow-hidden">
            <span
              aria-hidden="true"
              className="block text-accent transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:-translate-y-full group-focus-visible/swap:-translate-y-full"
            >
              close
            </span>

            <span
              aria-hidden="true"
              className="absolute inset-0 block translate-y-full text-ink transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:translate-y-0 group-focus-visible/swap:translate-y-0"
            >
              close
            </span>
          </span>
        </button>
      </div>

      {/* ====================================
          NAVIGATION — HOVER / FOCUS
      ==================================== */}

      <nav
        aria-label="Main navigation"
        className="absolute top-[24.9%] left-1/2 -translate-x-1/2 text-[clamp(32px,4.2vw,48px)]"
      >
        <ul className="flex flex-col items-center gap-[0.875em] whitespace-nowrap">
          {navItems.map((item, index) => (
            <li
              key={item}
              className="overflow-hidden leading-[1.1]"
            >
              <button
                type="button"
                aria-label={item}
                onClick={closeMenu}
                className="group/swap nav-link block cursor-pointer text-[1em] leading-[1.1] font-normal tracking-[-0.03em] lowercase"
              >
                {/* GSAP ANIMATES OUTER WRAPPER */}

                <span
                  ref={(element) => {
                    linkRefs.current[index] = element
                  }}
                  className="block"
                >
                  <span className="relative block overflow-hidden">
                    {/* ORIGINAL TEXT */}

                    <span
                      aria-hidden="true"
                      className="block text-ink transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:-translate-y-full group-focus-visible/swap:-translate-y-full"
                    >
                      {item}
                    </span>

                    {/* HOVER / FOCUS TEXT */}

                    <span
                      aria-hidden="true"
                      className="absolute inset-0 block translate-y-full text-accent transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:translate-y-0 group-focus-visible/swap:translate-y-0"
                    >
                      {item}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ====================================
          SOCIAL — HOVER / FOCUS
          EXACTLY 34PX GAP
      ==================================== */}

      <ul
        ref={socialRef}
        className="absolute top-[71.2%] left-1/2 flex -translate-x-1/2 items-center whitespace-nowrap"
        style={{ columnGap: '34px' }}
      >
        {socialItems.map((item) => (
          <li
            key={item}
            className="overflow-hidden"
          >
            <a
              href={socialLinks[item]}
              target={item === 'email' ? undefined : '_blank'}
              rel={item === 'email' ? undefined : 'noopener noreferrer'}
              aria-label={item}
              onClick={closeMenu}
              className="group/swap nav-link relative inline-block cursor-pointer text-[clamp(18px,2.4vw,20px)] leading-[1.1] font-medium tracking-[-0.03em] lowercase opacity-85"
            >
              <span className="relative block overflow-hidden">
                {/* ORIGINAL TEXT */}

                <span
                  aria-hidden="true"
                  className="block transform-gpu text-ink transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:-translate-y-full group-focus-visible/swap:-translate-y-full"
                >
                  {item}
                </span>

                {/* HOVER / FOCUS TEXT */}

                <span
                  aria-hidden="true"
                  className="absolute inset-0 block translate-y-full transform-gpu text-accent transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:translate-y-0 group-focus-visible/swap:translate-y-0"
                >
                  {item}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* ====================================
          COPYRIGHT
      ==================================== */}

      <p
        ref={copyrightRef}
        className="absolute bottom-[max(3.75rem,calc(env(safe-area-inset-bottom)+1.5rem))] left-1/2 -translate-x-1/2 text-[clamp(18px,2.4vw,20px)] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap lowercase"
      >
        © 2026 All rights reserved.
      </p>

      {/* ====================================
          RESPONSIVE FRAGMENTS WITH M&T LOGO
          ORIGINAL — UNCHANGED
      ==================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
        style={
          safariStripes
            ? { height: `${SAFARI_STRIPE_HEIGHT}px`, bottom: 'auto' }
            : undefined
        }
      >
        {Array.from(
          { length: stripeCount },
          (_, index) => (
            <div
              key={index}
              ref={(element) => {
                stripeRefs.current[index] = element
              }}
              className="absolute top-0 bottom-0 overflow-hidden bg-accent"
              style={{
                left: `${
                  (index * 100) / stripeCount
                }%`,
                width: `${
                  100 / stripeCount + 0.15
                }%`,
                willChange: 'transform',
              }}
            >
              {/* Full-width composition in every stripe */}

              <div
                className="pointer-events-none absolute top-0 bottom-0 flex items-center justify-center"
                style={{
                  // Keep the M&T logo centered in the *visible* website viewport,
                  // even though the Safari stripe itself is 1000px tall.
                  ...(safariStripes ? { height: '100dvh', bottom: 'auto' } : {}),
                  width: `${stripeCount * 100}%`,
                  left: `${-index * 100}%`,
                }}
              >
                <div className="relative flex items-center justify-center">
                  {/* MAIN LOGO */}

                  <span className="block font-sans text-[clamp(100px,52vw,130px)] leading-none font-bold tracking-[-0.08em] whitespace-nowrap text-canvas">
                    M&amp;T
                  </span>

                  {/* WEB DESIGNER STUDIO */}

                  <span className="absolute right-0 bottom-full font-sans text-[20px] leading-[1.1] font-normal tracking-[-0.6px] lowercase whitespace-nowrap text-canvas">
                    web
                    <br />
                    designer
                    <br />
                    studio
                  </span>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  )
}


