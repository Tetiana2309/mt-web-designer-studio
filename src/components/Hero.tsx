
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import gsap from 'gsap'

import { navItems, socialItems } from '../navigation'
import CtaButton from './CtaButton'
import InfiniteSpiral from './InfiniteSpiral'
import MobileMenu from './MobileMenu'

const previewImages = [1, 2, 3, 4, 5].map(
  (n) => `${import.meta.env.BASE_URL}images/Preview%20${n}.webp`,
)

const INTRO = {
  logo: 0,
  title: 0.05,
  navigation: 0.08,
  cta: 0.12,
  footer: 0.35,
}

const socialLinks: Record<string, string> = {
  telegram: 'https://t.me/mtwebdesignerstudio',
  whatsapp: 'https://wa.me/4915569403496',
  email: 'mailto:tmwebdesigneragency@gmail.com',
}

const footerPhrases = [
  'We listen.',
  'We think.',
  'We deliver.',
]

// ==========================================
// TITLE — MASK REVEAL
// ==========================================

function RevealWords({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, index, words) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden whitespace-nowrap align-baseline"
        >
          <span
            data-hero-title-word
            className="inline-block"
          >
            {word}
          </span>
          {index < words.length - 1 ? '\u00A0' : null}
        </span>
      ))}
    </>
  )
}

// ==========================================
// NAVIGATION + SOCIAL HOVER
// UNCHANGED
// ==========================================

function TextSwapButton({
  label,
  className,
}: {
  label: string
  className: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`group/swap relative inline-block cursor-pointer align-top ${className}`}
    >
      <span
        data-hero-link-reveal
        className="block"
      >
        <span className="relative block overflow-hidden">
          <span
            aria-hidden="true"
            className="block transform-gpu text-ink transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:-translate-y-full group-focus-visible/swap:-translate-y-full"
          >
            {label}
          </span>

          <span
            aria-hidden="true"
            className="absolute inset-0 block translate-y-full transform-gpu text-accent transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:translate-y-0 group-focus-visible/swap:translate-y-0"
          >
            {label}
          </span>
        </span>
      </span>
    </button>
  )
}

// ==========================================
// HERO
// ==========================================

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)

  const rootRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const menuOpenRef = useRef(false)
  const wasOpenRef = useRef(false)

  // ==========================================
  // MOBILE MENU STATE
  // ==========================================

  const openMenu = useCallback(() => {
    if (menuOpenRef.current) return

    if (
      window.matchMedia('(min-width: 1280px)').matches
    ) {
      return
    }

    menuOpenRef.current = true
    setMenuOpen(true)
  }, [])

  const closeMenu = useCallback(() => {
    menuOpenRef.current = false
    setMenuOpen(false)
  }, [])

  useEffect(() => {
    if (
      wasOpenRef.current &&
      !menuOpen &&
      window.matchMedia('(max-width: 1279px)').matches
    ) {
      menuButtonRef.current?.focus()
    }

    wasOpenRef.current = menuOpen
  }, [menuOpen])

  useEffect(() => {
    const breakpoint = window.matchMedia(
      '(min-width: 1280px)',
    )

    const onBreakpoint = (
      event: MediaQueryListEvent,
    ) => {
      if (!event.matches) return

      menuOpenRef.current = false
      setMenuOpen(false)
    }

    breakpoint.addEventListener(
      'change',
      onBreakpoint,
    )

    return () => {
      breakpoint.removeEventListener(
        'change',
        onBreakpoint,
      )
    }
  }, [])

  // ==========================================
  // SYNCHRONIZED HERO INTRO
  // ==========================================

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduceMotion) return

    let observer: MutationObserver | null = null
    let started = false

    const context = gsap.context(() => {
      const query = (selector: string) =>
        gsap.utils.toArray<HTMLElement>(
          selector,
          root,
        )

      const logo = query('[data-hero-logo]')

      const mobileTrigger = query(
        '[data-hero-mobile-trigger]',
      )

      const navLinks = query(
        '[data-hero-nav-mask] [data-hero-link-reveal]',
      )

      const primaryWords = query(
        '[data-hero-primary] [data-hero-title-word]',
      )

      const accentWords = query(
        '[data-hero-accent] [data-hero-title-word]',
      )

      const titleWords = [
        ...primaryWords,
        ...accentWords,
      ]

      const ctaTexts = query(
        '[data-cta-intro-text]',
      )

      const ctaArrows = query(
        '[data-cta-intro-arrow]',
      )

      const ctaLines = query(
        '[data-cta-intro-line]',
      )

      const copyright = query(
        '[data-hero-copyright]',
      )

      const sloganWords = query(
        '[data-hero-slogan-word]',
      )

      const socialLinks = query(
        '[data-hero-social-mask] [data-hero-link-reveal]',
      )

      // ======================================
      // INITIAL STATES
      // ======================================

      gsap.set(logo, {
        autoAlpha: 0,
        yPercent: 110,
        scaleX: 0.9,
        transformOrigin: '50% 50%',
      })

      gsap.set(mobileTrigger, {
        autoAlpha: 0,
        yPercent: 110,
      })

      gsap.set(navLinks, {
        autoAlpha: 0,
        yPercent: 115,
      })

      // ======================================
      // TITLE MASK INITIAL STATE
      // ======================================

      gsap.set(titleWords, {
        yPercent: 110,
      })

      // Intro wrappers, not hover targets.

      gsap.set(ctaTexts, {
        autoAlpha: 0,
        x: -26,
      })

      gsap.set(ctaArrows, {
        autoAlpha: 0,
        x: 26,
      })

      gsap.set(ctaLines, {
        scaleX: 0,
        transformOrigin: 'left center',
      })

      gsap.set(copyright, {
        autoAlpha: 0,
        yPercent: 110,
      })

      gsap.set(sloganWords, {
        autoAlpha: 0,
        yPercent: 115,
      })

      gsap.set(socialLinks, {
        autoAlpha: 0,
        yPercent: 115,
      })

      // ======================================
      // MASTER TIMELINE
      // ======================================

      const timeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          gsap.set(
            [
              ...logo,
              ...mobileTrigger,
              ...navLinks,
              ...titleWords,
              ...ctaTexts,
              ...ctaArrows,
              ...copyright,
              ...sloganWords,
              ...socialLinks,
            ],
            {
              clearProps:
                'transform,transformOrigin,clipPath,opacity,visibility',
            },
          )

          gsap.set(ctaLines, {
            clearProps:
              'transform,transformOrigin',
          })
        },
      })

      // ======================================
      // LOGO
      // ======================================

      timeline.to(
        logo,
        {
          autoAlpha: 1,
          yPercent: 0,
          scaleX: 1,
          duration: 0.9,
          ease: 'expo.out',
        },
        INTRO.logo,
      )

      // ======================================
      // HERO TITLE — MASK REVEAL
      // ======================================

      // FIRST PART
      // All words rise together from their masks.

      timeline.to(
        primaryWords,
        {
          yPercent: 0,
          duration: 0.72,
          ease: 'power3.out',
        },
        INTRO.title,
      )

      // SECOND PART
      // Blue text follows with a short delay.

      timeline.to(
        accentWords,
        {
          yPercent: 0,
          duration: 0.67,
          ease: 'power3.out',
        },
        INTRO.title + 0.26,
      )

      // ======================================
      // DESKTOP NAVIGATION
      // ======================================

      timeline.to(
        navLinks,
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.83,
          stagger: 0.1,
          ease: 'expo.out',
        },
        INTRO.navigation,
      )

      // ======================================
      // MOBILE MENU TRIGGER
      // ======================================

      timeline.to(
        mobileTrigger,
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.85,
          ease: 'expo.out',
        },
        INTRO.navigation,
      )

      // ======================================
      // CTA INTRODUCTION
      // ======================================

      timeline.to(
        ctaLines,
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.inOut',
        },
        INTRO.cta,
      )

      timeline.to(
        ctaTexts,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.85,
          ease: 'expo.out',
        },
        INTRO.cta + 0.07,
      )

      timeline.to(
        ctaArrows,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.85,
          ease: 'expo.out',
        },
        INTRO.cta + 0.12,
      )

      // ======================================
      // FOOTER COPYRIGHT
      // ======================================

      timeline.to(
        copyright,
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.75,
          ease: 'expo.out',
        },
        INTRO.footer,
      )

      // ======================================
      // FOOTER SLOGAN
      // ======================================

      timeline.to(
        sloganWords,
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
        },
        INTRO.footer + 0.06,
      )

      // ======================================
      // FOOTER SOCIAL LINKS
      // ======================================

      timeline.to(
        socialLinks,
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.82,
          stagger: 0.09,
          ease: 'expo.out',
        },
        INTRO.footer + 0.1,
      )

      // ======================================
      // PRELOADER SYNCHRONIZATION
      // ======================================

      const preloaderSelector =
        '[role="status"][aria-label="Loading M&T Web Designer Studio"]'

      const startAnimation = () => {
        if (started) return

        if (
          document.querySelector(preloaderSelector)
        ) {
          return
        }

        started = true
        observer?.disconnect()
        timeline.play(0)
      }

      observer = new MutationObserver(
        startAnimation,
      )

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })

      startAnimation()
    }, root)

    return () => {
      observer?.disconnect()
      context.revert()
    }
  }, [])

  // ==========================================
  // JSX
  // ==========================================

  return (
    <section
      ref={rootRef}
      className="relative min-h-dvh overflow-hidden bg-canvas font-sans text-ink"
    >
      {/* SPIRAL — UNCHANGED */}

      <div className="pointer-events-none absolute inset-0">
        <InfiniteSpiral images={previewImages} />
      </div>

      <div inert={menuOpen}>
        {/* HEADER */}

        <header className="absolute top-[40px] right-[max(1.25rem,env(safe-area-inset-right))] left-[max(1.25rem,env(safe-area-inset-left))] flex items-start justify-between min-[1280px]:top-[20px] min-[1280px]:right-[clamp(24px,2.0833vw,40px)] min-[1280px]:left-[clamp(24px,2.0833vw,40px)] min-[1280px]:h-9.5">
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

          {/* ======================================
              MOBILE MENU BUTTON
              NEW HOVER / FOCUS EFFECT
          ====================================== */}

          <div className="overflow-hidden min-[1280px]:hidden">
            <button
              ref={menuButtonRef}
              data-hero-mobile-trigger
              type="button"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              onClick={openMenu}
              className="group/swap nav-link cursor-pointer font-sans text-[clamp(22px,2.9vw,30px)] leading-[1.1] font-bold tracking-[-0.03em] text-accent! uppercase"
            >
              <span className="relative block overflow-hidden">
                {/* ORIGINAL TEXT */}

                <span
                  aria-hidden="true"
                  className="block text-accent transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:-translate-y-full group-focus-visible/swap:-translate-y-full"
                >
                  menu
                </span>

                {/* HOVER / FOCUS TEXT */}

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
                <li
                  key={item}
                  data-hero-nav-mask
                  className="overflow-hidden"
                >
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

        {/* HERO TITLE */}

        <h1
          aria-label="We create websites that drive results."
          className="absolute top-[calc(50%-2.5em)] left-1/2 w-[6.15em] -translate-x-1/2 text-[clamp(60px,7.5vw,96px)] leading-[0.86] tracking-[-0.03em] min-[1280px]:top-[calc(50%-min(226px,11.77vw))] min-[1280px]:left-[calc(50%-min(542px,28.23vw))] min-[1280px]:w-[min(1085px,56.5vw)] min-[1280px]:translate-x-0 min-[1280px]:text-[min(184px,9.583vw)] min-[1280px]:leading-[0.86]"
        >
          <span
            data-hero-primary
            aria-hidden="true"
            className="font-light text-ink min-[1280px]:font-extralight"
          >
            <RevealWords text="We create websites that" />{' '}
          </span>

          <span
            data-hero-accent
            aria-hidden="true"
            className="font-semibold text-accent min-[1280px]:font-medium"
          >
            <RevealWords text="drive results." />
          </span>
        </h1>

        {/* MOBILE CTA */}

        <div className="absolute top-[69%] left-1/2 -translate-x-1/2 min-[1280px]:hidden">
          <CtaButton />
        </div>

        {/* FOOTER */}

        <footer className="absolute right-[max(1.25rem,env(safe-area-inset-right))] bottom-[40px] left-[max(1.25rem,env(safe-area-inset-left))] flex h-5 items-start justify-between font-sans text-[clamp(18px,2.4vw,20px)] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-ink lowercase min-[1280px]:right-[max(24px,2.0833vw)] min-[1280px]:bottom-[20px] min-[1280px]:left-[clamp(24px,2.0833vw,40px)] min-[1280px]:h-5.5 min-[1280px]:text-[clamp(16px,1.0417vw,20px)]">
          {/* COPYRIGHT */}

          <div className="hidden overflow-hidden min-[1280px]:block">
            <p data-hero-copyright>
              © 2026 All rights reserved.
            </p>
          </div>

          {/* SLOGAN */}

          <p className="absolute left-1/2 -translate-x-1/2 opacity-85 min-[1280px]:left-[48.696%] min-[1280px]:translate-x-0 min-[1280px]:opacity-100">
            {footerPhrases.map((phrase, index) => (
              <span
                key={phrase}
                className="inline-block overflow-hidden align-top"
              >
                <span
                  data-hero-slogan-word
                  className="inline-block"
                >
                  {phrase}
                </span>

                {index < footerPhrases.length - 1
                  ? '\u00A0'
                  : null}
              </span>
            ))}
          </p>

          {/* SOCIAL LINKS */}

          <ul className="hidden items-center gap-8.5 min-[1280px]:flex">
            {socialItems.map((item) => (
              <li
                key={item}
                data-hero-social-mask
                className="overflow-hidden"
              >
                <a
                  href={socialLinks[item]}
                  target={item === 'email' ? undefined : '_blank'}
                  rel={item === 'email' ? undefined : 'noopener noreferrer'}
                  aria-label={item}
                  className="group/swap nav-link relative inline-block cursor-pointer align-top font-sans text-[clamp(16px,1.0417vw,20px)] leading-[1.1] font-medium tracking-[-0.6px] lowercase"
                >
                  <span data-hero-link-reveal className="block">
                    <span className="relative block overflow-hidden">
                      <span aria-hidden="true" className="block transform-gpu text-ink transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:-translate-y-full group-focus-visible/swap:-translate-y-full">
                        {item}
                      </span>
                      <span aria-hidden="true" className="absolute inset-0 block translate-y-full transform-gpu text-accent transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:translate-y-0 group-focus-visible/swap:translate-y-0">
                        {item}
                      </span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </div>

      {/* MOBILE MENU — UNCHANGED */}

      {menuOpen && (
        <MobileMenu onClose={closeMenu} />
      )}
    </section>
  )
}
