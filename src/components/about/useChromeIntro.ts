import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'

// Header / footer intro, same offsets, durations and eases as the Hero intro
// (the title part is omitted). It waits for the Preloader like Hero does.

const INTRO = {
  logo: 0,
  navigation: 0.08,
  cta: 0.12,
  footer: 0.35,
}

const PRELOADER_SELECTOR = '[role="status"][aria-label="Loading M&T Web Designer Studio"]'

export default function useChromeIntro(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let observer: MutationObserver | null = null
    let started = false

    const context = gsap.context(() => {
      const query = (selector: string) => gsap.utils.toArray<HTMLElement>(selector, root)

      const logo = query('[data-hero-logo]')
      const mobileTrigger = query('[data-hero-mobile-trigger]')
      const navLinks = query('[data-hero-nav-mask] [data-hero-link-reveal]')
      const ctaTexts = query('[data-cta-intro-text]')
      const ctaArrows = query('[data-cta-intro-arrow]')
      const ctaLines = query('[data-cta-intro-line]')
      const copyright = query('[data-hero-copyright]')
      const sloganWords = query('[data-hero-slogan-word]')
      const socialLinks = query('[data-hero-social-mask] [data-hero-link-reveal]')

      gsap.set(logo, { autoAlpha: 0, yPercent: 110, scaleX: 0.9, transformOrigin: '50% 50%' })
      gsap.set(mobileTrigger, { autoAlpha: 0, yPercent: 110 })
      gsap.set(navLinks, { autoAlpha: 0, yPercent: 115 })
      gsap.set(ctaTexts, { autoAlpha: 0, x: -26 })
      gsap.set(ctaArrows, { autoAlpha: 0, x: 26 })
      gsap.set(ctaLines, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(copyright, { autoAlpha: 0, yPercent: 110 })
      gsap.set(sloganWords, { autoAlpha: 0, yPercent: 115 })
      gsap.set(socialLinks, { autoAlpha: 0, yPercent: 115 })

      const timeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          gsap.set(
            [
              ...logo,
              ...mobileTrigger,
              ...navLinks,
              ...ctaTexts,
              ...ctaArrows,
              ...copyright,
              ...sloganWords,
              ...socialLinks,
            ],
            { clearProps: 'transform,transformOrigin,clipPath,opacity,visibility' },
          )
          gsap.set(ctaLines, { clearProps: 'transform,transformOrigin' })
        },
      })

      timeline.to(
        logo,
        { autoAlpha: 1, yPercent: 0, scaleX: 1, duration: 0.9, ease: 'expo.out' },
        INTRO.logo,
      )
      timeline.to(
        navLinks,
        { autoAlpha: 1, yPercent: 0, duration: 0.83, stagger: 0.1, ease: 'expo.out' },
        INTRO.navigation,
      )
      timeline.to(
        mobileTrigger,
        { autoAlpha: 1, yPercent: 0, duration: 0.85, ease: 'expo.out' },
        INTRO.navigation,
      )
      timeline.to(ctaLines, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, INTRO.cta)
      timeline.to(
        ctaTexts,
        { autoAlpha: 1, x: 0, duration: 0.85, ease: 'expo.out' },
        INTRO.cta + 0.07,
      )
      timeline.to(
        ctaArrows,
        { autoAlpha: 1, x: 0, duration: 0.85, ease: 'expo.out' },
        INTRO.cta + 0.12,
      )
      timeline.to(
        copyright,
        { autoAlpha: 1, yPercent: 0, duration: 0.75, ease: 'expo.out' },
        INTRO.footer,
      )
      timeline.to(
        sloganWords,
        { autoAlpha: 1, yPercent: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out' },
        INTRO.footer + 0.06,
      )
      timeline.to(
        socialLinks,
        { autoAlpha: 1, yPercent: 0, duration: 0.82, stagger: 0.09, ease: 'expo.out' },
        INTRO.footer + 0.1,
      )

      const startAnimation = () => {
        if (started) return
        if (document.querySelector(PRELOADER_SELECTOR)) return

        started = true
        observer?.disconnect()
        timeline.play(0)
      }

      observer = new MutationObserver(startAnimation)
      observer.observe(document.body, { childList: true, subtree: true })
      startAnimation()
    }, root)

    return () => {
      observer?.disconnect()
      context.revert()
    }
  }, [rootRef])
}
