import BeautySculptureOutro from './BeautySculptureOutro'
import CtaButton from '../../../components/CtaButton'
import BeautySculptureLastCasesButton from './BeautySculptureLastCasesButton'
import { Fragment, useLayoutEffect, useRef, useState, type RefObject, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ASSETS = `${import.meta.env.BASE_URL}images/`
const BEAUTY_VIDEO = `${import.meta.env.BASE_URL}videos/Video%20BeautySculpture.mp4`
const DESIGN_HEIGHT = 1002
const STORY_WIDTH = 9597

const intro =
  'A premium aesthetic clinic with an outdated website that failed to reflect its expertise and professional standards.'
const challenge =
  'An elegant website that presents treatments clearly, highlights expertise and helps patients make informed choices.'
const approach =
  'A stronger clinic image, more relevant enquiries and greater interest in booking treatments.'

const bodyStyle = {
  color: 'var(--ryjgrf, #3C3A36)',
  fontFamily: 'Inter, sans-serif',
  fontSize: 20,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '110%',
  letterSpacing: '-0.6px',
} as const

type ImageProps = {
  first: string
  second?: string
  third?: string
  name: string
  x: number
  y: number
  width: number
  height: number
  layer?: number
  direction?: "up" | "right" | "left"
  elevated?: boolean
  shadow?: boolean
}

function ImageScene({ first, second, third, name, x, y, width, height, layer = 1, direction = "up", shadow = true }: ImageProps) {
  return (
    <div
      data-beauty-media
      className="absolute overflow-hidden"
      style={{
        left: x,
        top: y,
        width,
        height,
        zIndex: layer,
        boxShadow: shadow ? '0 10px 28px rgba(23, 43, 54, 0.09), 0 24px 55px rgba(23, 43, 54, 0.055)' : 'none',
      }}
    >
      <img
        src={`${ASSETS}${first}`}
        alt={name}
        draggable={false}
        className="absolute inset-0 block h-full w-full max-w-none object-contain"
      />
      {second && (
        <img
          data-beauty-incoming
          data-beauty-direction={direction}
          src={`${ASSETS}${second}`}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute inset-0 block h-full w-full max-w-none object-contain"
          style={{ willChange: "transform" }}
        />
      )}
      {third && (
        <img
          data-beauty-third
          src={`${ASSETS}${third}`}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute inset-0 block h-full w-full max-w-none object-contain"
          style={{ willChange: 'transform' }}
        />
      )}
    </div>
  )
}

function VideoScene({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  return (
    <div
      data-beauty-media
      className="absolute overflow-hidden"
      style={{ left: x, top: y, width, height, zIndex: 1 }}
    >
      <video
        src={BEAUTY_VIDEO}
        aria-label="Beauty Sculpture cinematic introduction"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 block h-full w-full max-w-none object-cover"
      />
    </div>
  )
}

function Headline({
  text,
  x,
  y,
  initial = false,
}: {
  text: string
  x: number
  y: number
  initial?: boolean
}) {
  return (
    <div
      data-beauty-title
      data-beauty-initial={initial ? 'true' : undefined}
      className="absolute"
      style={{ left: x, top: y }}
    >
      <p
        data-beauty-title-line
        className="m-0 whitespace-nowrap font-sans font-medium not-italic text-accent"
        style={{ fontSize: 100, lineHeight: 0.95, letterSpacing: -3 }}
      >
        {text}
      </p>
    </div>
  )
}

function Description({ children, x, y, width }: { children: ReactNode; x: number; y: number; width: number }) {
  return (
    <p data-beauty-copy className="absolute m-0" style={{ left: x, top: y, width, ...bodyStyle, fontSize: 18, letterSpacing: '-0.54px' }}>
      {String(children).split(' ').map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          {index > 0 ? ' ' : null}
          <span data-beauty-word style={{ color: '#B5B5B5' }}>{word}</span>
        </Fragment>
      ))}
    </p>
  )
}



function LastCase({ x, y }: { x: number; y: number }) {
  return (
    <div className="absolute z-10" style={{ left: x, top: y }}>
      <BeautySculptureLastCasesButton />
    </div>
  )
}

function DesktopWorld() {
  return (
    <div className="relative h-250.5 bg-canvas" style={{ width: STORY_WIDTH }}>
      <VideoScene x={1346} y={107} width={1400} height={788} />
      <ImageScene first="4.1.webp" second="4.2.webp" name="BeautySculpture Community shop interface" x={2512} y={217} width={1009} height={568} layer={2} elevated />
      <LastCase x={40} y={138} />

      <Headline text="Care" x={484} y={315} initial />
      <Headline text="Out Of" x={534} y={408} initial />
      <Headline text="Focus." x={410} y={500} initial />
      <Description x={614} y={633} width={340}>{intro}</Description>

      <Headline text="Beauty" x={4075} y={315} />
      <Headline text="With" x={4124} y={408} />
      <Headline text="Clarity." x={4237} y={500} />
      <Description x={4305} y={633} width={340}>{challenge}</Description>

      {/* The two replacements share the exact same scrubbed timeline. */}
      <ImageScene first="4.6.webp" second="4.7.webp" name="BeautySculpture Community products and mission" x={5168} y={199} width={1010} height={568} direction="right" />
      <ImageScene first="4.8.webp" second="4.9.webp" name="BeautySculpture Community product details" x={6279} y={363} width={866} height={487} layer={2} direction="left" />

      <Headline text="Made" x={7599} y={315} />
      <Headline text="To Earn" x={7744} y={408} />
      <Headline text="Trust." x={7676} y={500} />
      <Description x={7755} y={633} width={340}>{approach}</Description>
      <ImageScene first="4.1.webp" name="BeautySculpture Community final website view" x={8548} y={217} width={1010} height={568} />
    </div>
  )
}


// Mobile-only copy: keep the same text while allowing a word-by-word color reveal.
function MobileWords({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          {index > 0 ? ' ' : null}
          <span data-mobile-copy-word>{word}</span>
        </Fragment>
      ))}
    </>
  )
}

function CaseZoom({ rootRef }: { rootRef: RefObject<HTMLDivElement | null> }) {
  const [selected, setSelected] = useState<HTMLImageElement | null>(null)
  const shade = useRef<HTMLDivElement>(null)
  const picture = useRef<HTMLImageElement>(null)
  const cross = useRef<HTMLButtonElement>(null)
  const anim = useRef<gsap.core.Timeline | null>(null)
  const closing = useRef(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const handler = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const image = event.target.closest<HTMLImageElement>('img[data-case-zoom]')
      if (image) setSelected(image)
    }
    root.addEventListener('click', handler)
    return () => root.removeEventListener('click', handler)
  }, [rootRef])

  useLayoutEffect(() => {
    if (!selected || !shade.current || !picture.current || !cross.current) return
    closing.current = false
    const overflow = document.documentElement.style.overflow
    const sourceOpacity = selected.style.opacity
    document.documentElement.style.overflow = 'hidden'

    const from = selected.getBoundingClientRect()
    const maxWidth = window.innerWidth - 36
    const maxHeight = window.innerHeight - 130
    const ratio = (selected.naturalWidth || from.width) / (selected.naturalHeight || from.height)
    const targetWidth = Math.min(maxWidth, maxHeight * ratio)
    const targetHeight = targetWidth / ratio
    const targetLeft = (window.innerWidth - targetWidth) / 2
    const targetTop = (window.innerHeight - targetHeight) / 2
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Animate GPU transforms, not layout width/height/left/top (which jump on iOS Safari).
    gsap.set(picture.current, {
      position: 'fixed', left: targetLeft, top: targetTop,
      width: targetWidth, height: targetHeight,
      x: from.left - targetLeft, y: from.top - targetTop,
      scaleX: from.width / targetWidth,
      scaleY: from.height / targetHeight,
      transformOrigin: 'top left',
      force3D: true,
    })
    // Keep the backdrop opaque throughout the transition so no other mobile screens bleed through.
    gsap.set(cross.current, { opacity: 0 })
    selected.style.opacity = '0'
    anim.current = gsap.timeline()
      .to(picture.current, {
        x: 0, y: 0, scaleX: 1, scaleY: 1,
        duration: reduce ? 0 : 1.0, ease: 'power3.out',
      }, 0)
      .to(cross.current, { opacity: 1, duration: reduce ? 0 : 0.38, ease: 'power2.out' }, reduce ? 0 : 0.55)

    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') cross.current?.click()
    }
    document.addEventListener('keydown', escape)
    return () => {
      anim.current?.kill()
      document.removeEventListener('keydown', escape)
      document.documentElement.style.overflow = overflow
      selected.style.opacity = sourceOpacity
    }
  }, [selected])

  const close = () => {
    if (!selected || closing.current) return
    closing.current = true
    anim.current?.kill()
    if (!shade.current || !picture.current || !cross.current) {
      setSelected(null)
      return
    }
    const dest = selected.getBoundingClientRect()
    const rect = picture.current.getBoundingClientRect()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    anim.current = gsap.timeline({ onComplete: () => setSelected(null) })
      .to(cross.current, { opacity: 0, duration: reduce ? 0 : 0.2 }, 0)
      .to(picture.current, {
        x: `+=${dest.left - rect.left}`,
        y: `+=${dest.top - rect.top}`,
        scaleX: dest.width / picture.current.offsetWidth,
        scaleY: dest.height / picture.current.offsetHeight,
        duration: reduce ? 0 : 0.95, ease: 'power3.inOut',
      }, 0)
  }

  return selected ? createPortal(
    <div className="fixed inset-0 z-[9999] isolate" role="dialog" aria-modal="true" aria-label="Enlarged Beauty Sculpture image">
      <div ref={shade} className="absolute inset-0 bg-[#C7C7C7]" onClick={close} />
      <img ref={picture} src={selected.currentSrc || selected.src} alt={selected.alt} draggable={false} className="pointer-events-none fixed max-w-none object-contain will-change-transform" />
      <button ref={cross} type="button" aria-label="Close image" onClick={close} className="absolute right-[max(16px,env(safe-area-inset-right))] top-[max(20px,env(safe-area-inset-top))] flex h-11 w-11 items-center justify-center text-[#3A5F73]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>
    </div>, document.body
  ) : null
}

export default function BeautySculptureHorizontalStory({ chrome }: { chrome: ReactNode }) {
  const storyRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement>(null)
  const cameraRef = useRef<HTMLDivElement>(null)
  const outroOverlayRef = useRef<HTMLDivElement>(null)

  // Smooth the actual wheel input, not just GSAP's response to it.
  // Only active on this page; destroyed when navigating away.
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(min-width: 900px)').matches) return

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      autoRaf: false,
    })

    const updateTrigger = () => ScrollTrigger.update()
    const tick = (time: number) => lenis.raf(time * 1000)

    lenis.on('scroll', updateTrigger)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize, { passive: true })
    const initialRefresh = requestAnimationFrame(onResize)

    return () => {
      cancelAnimationFrame(initialRefresh)
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.off('scroll', updateTrigger)
      lenis.destroy()
    }
  }, [])

  useLayoutEffect(() => {
    const story = storyRef.current
    const world = worldRef.current
    const camera = cameraRef.current
    const outroOverlay = outroOverlayRef.current
    if (!story || !world || !camera || !outroOverlay) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const scale = () => window.innerHeight / DESIGN_HEIGHT
        const viewportDesignWidth = () => window.innerWidth / scale()
        const maxCameraX = () => Math.max(0, STORY_WIDTH - viewportDesignWidth())
        // Last image right edge must meet the same 40px screen guide as LET'S TALK.
        const lastCameraX = () => Math.max(0, Math.min(maxCameraX(), 9558 - viewportDesignWidth() + 40 / scale()))
        const cameraStop = (x: number) => -Math.min(maxCameraX(), Math.max(0, x)) * scale()

        gsap.set(world, { scale: scale(), transformOrigin: 'top left' })

        const titleLines = gsap.utils.toArray<HTMLElement>(
          '[data-beauty-title-line]', world,
        )
        const descriptions = gsap.utils.toArray<HTMLElement>(
          '[data-beauty-copy]', world,
        )
        const thirdFrames = gsap.utils.toArray<HTMLElement>('[data-beauty-third]', world)
        const incoming = gsap.utils.toArray<HTMLElement>(
          '[data-beauty-incoming]', world,
        )
        const descriptionWords = descriptions.map((description) =>
          gsap.utils.toArray<HTMLElement>('[data-beauty-word]', description),
        )

        // Soft Stagger Reveal: no clipping/masks, so descenders stay intact.
        // Only visual entrance properties change, never font or coordinates.
        gsap.set(titleLines, { opacity: 0, y: 16 })
        gsap.set(descriptionWords.flat(), { color: '#B5B5B5' })

        gsap.set(thirdFrames, { yPercent: 100 })
        incoming.forEach((element) => {
          const direction = element.dataset.beautyDirection
          gsap.set(element, {
            xPercent: direction === 'right' ? -100 : direction === 'left' ? 100 : 0,
            yPercent: direction === 'up' ? 100 : 0,
          })
        })

        // Preserve the continuous horizontal camera motion and all image swaps.
        // Only the later title/copy reveal timing is moved earlier; the outro
        // remains appended AFTER horizontal movement.
        const scene = gsap.timeline({ defaults: { ease: 'none' } })
        const SCENE_DURATION = 16.25
        const OUTRO_FADE_DURATION = 1.0
        const FULL_DURATION = SCENE_DURATION + OUTRO_FADE_DURATION
        scene.to(camera, {
          x: () => cameraStop(lastCameraX()),
          duration: SCENE_DURATION,
          ease: 'none',
        }, 0)

        const revealLines = (indices: number[], at: number) => {
          indices.forEach((index, order) => {
            const line = titleLines[index]
            if (line) {
              scene.to(line, {
                opacity: 1,
                y: 0,
                duration: 0.82,
                ease: 'power2.out',
              }, at + order * 0.16)
            }
          })
        }

        const revealCopy = (index: number, at: number) => {
          const words = descriptionWords[index]
          if (words?.length) {
            scene.to(words, {
              color: '#3C3A36',
              duration: 0.25,
              stagger: { amount: 0.92, from: 'start' },
              ease: 'power1.out',
            }, at)
          }
        }

        // The opening title and copy run automatically on page entry.
        // The horizontal scene remains scroll-linked, without reanimating them.

        // Opening reveal starts on entering this case from Portfolio,
        // independently of scroll position and after the site preloader.
        const introLines = titleLines.slice(0, 3)
        const introWords = descriptionWords[0] ?? []
        const introTimeline = gsap.timeline({ paused: true })
        introLines.forEach((line, index) => {
          introTimeline.to(line, {
            opacity: 1,
            y: 0,
            duration: 0.92,
            ease: 'power3.out',
          }, 0.1 + index * 0.16)
        })
        if (introWords.length) {
          introTimeline.to(introWords, {
            color: '#3C3A36',
            duration: 0.24,
            stagger: { each: 0.018, from: 'start' },
            ease: 'power1.out',
          }, 0.48)
        }

        const PRELOADER_SELECTOR =
          '[role="status"][aria-label="Loading M&T Web Designer Studio"]'
        let preloaderObserver: MutationObserver | null = null
        let introStarted = false
        const startIntro = () => {
          if (introStarted || document.querySelector(PRELOADER_SELECTOR)) return
          introStarted = true
          preloaderObserver?.disconnect()
          preloaderObserver = null
          introTimeline.play(0)
        }
        preloaderObserver = new MutationObserver(startIntro)
        preloaderObserver.observe(document.body, { childList: true, subtree: true })
        startIntro()

        // First replacement rises inside its fixed photo frame.
        const firstSwap = incoming.find((item) => item.dataset.beautyDirection === 'up')
        if (firstSwap) {
          scene.to(firstSwap, { yPercent: 0, duration: 1.6, ease: 'power2.inOut' }, 4.1)
        }

        // Optional third-frame replacement (unused in this case).
        if (thirdFrames.length) {
          scene.to(thirdFrames, { yPercent: 0, duration: 1.25, ease: 'power2.inOut' }, 5.8)
        }

        // Start the heading reveal as the composition enters the viewport,
        // so there is no empty title area while the camera keeps moving.
        revealLines([3, 4, 5], 5.4)
        revealCopy(1, 5.75)

        // The two photo replacements move inward,
        // synchronized on one scroll interval.
        const leftSwap = incoming.find((item) => item.dataset.beautyDirection === 'right')
        const rightSwap = incoming.find((item) => item.dataset.beautyDirection === 'left')
        const pair = [leftSwap, rightSwap].filter(
          (element): element is HTMLElement => Boolean(element),
        )
        if (pair.length) {
          scene.to(pair, {
            xPercent: 0,
            duration: 1.85,
            ease: 'power2.inOut',
          }, 10.2)
        }

        // Reveal the final title on arrival rather than after a blank beat.
        revealLines([6, 7, 8], 12.55)
        revealCopy(2, 12.9)

        // One opaque final scene slides over the stopped horizontal composition.
        // There are no duplicate page/chrome instances.
        // Reveal the final, stationary full-screen page from bottom to top.
        // Unlike translating the page, its content never passes underneath
        // the persistent footer and header during the transition.
        gsap.set(outroOverlay, {
          autoAlpha: 1,
          xPercent: 0,
          yPercent: 0,
          clipPath: 'inset(0% 0% 0% 100%)',
        })
        scene.to(outroOverlay, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: OUTRO_FADE_DURATION,
          ease: 'none',
        }, SCENE_DURATION)

        // Outro content belongs to the EXISTING pinned scene timeline.
        // The outro is clipped during entry, so a separate ScrollTrigger
        // attached to its root would never reach its start position.
        const outroTagline = outroOverlay.querySelector<HTMLElement>('[data-beauty-outro-tagline]')
        const outroHeading = outroOverlay.querySelector<HTMLElement>('[data-beauty-outro-heading]')
        const outroButton = outroOverlay.querySelector<HTMLElement>('[data-beauty-outro-link]')

        if (outroTagline) {
          // Never animate opacity: its inline Figma opacity stays at 0.1.
          gsap.set(outroTagline, { y: 36 })
          scene.to(outroTagline, {
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          }, SCENE_DURATION + 0.5)
        }

        if (outroHeading) {
          gsap.set(outroHeading, { autoAlpha: 0, y: 40 })
          scene.to(outroHeading, {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          }, SCENE_DURATION + 0.6)
        }

        if (outroButton) {
          gsap.set(outroButton, { autoAlpha: 0, y: 30 })
          scene.to(outroButton, {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
            ease: 'power2.out',
          }, SCENE_DURATION + 0.68)
        }

        const horizontal = ScrollTrigger.create({
          trigger: story,
          start: 'top top',
          // Preserve the horizontal camera scroll distance and add the ending interval.
          end: () => `+=${Math.max(3200, Math.round(window.innerHeight * 13.5 * FULL_DURATION / SCENE_DURATION))}`,
          pin: true,
          scrub: 1,
          animation: scene,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => gsap.set(world, { scale: scale(), transformOrigin: 'top left' }),

        })

        return () => {
          preloaderObserver?.disconnect()
          introTimeline.kill()
          horizontal.kill()
        }
      }, story.parentElement ?? story)

      return () => ctx.revert()
    })

    mm.add('(min-width: 900px) and (prefers-reduced-motion: reduce)', () => {
      gsap.set(world, { scale: window.innerHeight / DESIGN_HEIGHT, transformOrigin: 'top left' })
      gsap.set(world.querySelectorAll('[data-beauty-title-line]'), { opacity: 1, y: 0 })
      gsap.set(world.querySelectorAll('[data-beauty-word]'), { color: '#3C3A36' })
    })

    return () => {
      mm.revert()
    }
  }, [])

  // Mobile: the same staggered line reveal and word painting as desktop,
  // triggered by vertical scrolling. Does not affect desktop/Lenis/Outro.
  useLayoutEffect(() => {
    const root = mobileRef.current
    if (!root) return

    // Hash navigation can briefly retain the previous case's scroll position.
    // Delay trigger creation until the new page has returned to the top.
    let cancelled = false
    let frame2 = 0
    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        if (cancelled) return
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        installMobileTriggers()
      })
    })

    let mm: gsap.MatchMedia | null = null
    const installMobileTriggers = () => {
      mm = gsap.matchMedia()
      mm.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const groups = gsap.utils.toArray<HTMLElement>('[data-mobile-title-block]', root)
        const copies = gsap.utils.toArray<HTMLElement>('[data-mobile-copy]', root)

        const hint = root.querySelector<HTMLElement>('[data-case-tap-hint]')
        const firstScreen = root.querySelector<HTMLElement>('img[data-case-zoom]')
        if (hint && firstScreen) {
          gsap.timeline({ scrollTrigger: { trigger: firstScreen, start: 'top 82%', once: true } })
            .fromTo(hint, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
            .to(hint, { opacity: 0, duration: 0.5, delay: 3 })
        }

        groups.forEach((group, groupIndex) => {
          const lines = gsap.utils.toArray<HTMLElement>('[data-mobile-title-line]', group)
          const words = copies[groupIndex]
            ? gsap.utils.toArray<HTMLElement>('[data-mobile-copy-word]', copies[groupIndex])
            : []

          // Match desktop: lines rise 16px; words paint gray to ink.
          gsap.set(lines, { opacity: 0, y: 16 })
          gsap.set(words, { color: '#B5B5B5' })

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: group,
              start: 'top 82%',
              toggleActions: 'play none none none',
              once: true,
              invalidateOnRefresh: true,
            },
          })

          lines.forEach((line, index) => {
            timeline.to(line, {
              opacity: 1,
              y: 0,
              duration: 0.82,
              ease: 'power2.out',
            }, index * 0.16)
          })

          if (words.length) {
            timeline.to(words, {
              color: '#3C3A36',
              duration: 0.25,
              stagger: { amount: 0.92, from: 'start' },
              ease: 'power1.out',
            }, 0.48)
          }
        })
      }, root)
      return () => ctx.revert()
    })
    }
    return () => {
      cancelled = true
      cancelAnimationFrame(frame1)
      cancelAnimationFrame(frame2)
      mm?.revert()
    }
  }, [])

  return (
    <>
      <div className="relative hidden min-[900px]:block" aria-label="BeautySculpture Community project story">
        <div className="pointer-events-none sticky top-0 z-40 mb-[-100dvh] h-dvh [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
          {chrome}
        </div>
        <div ref={storyRef} className="relative h-dvh w-full overflow-hidden bg-canvas">
          <div ref={cameraRef} className="absolute left-0 top-0 will-change-transform">
            <div ref={worldRef} className="absolute left-0 top-0">
              <DesktopWorld />
            </div>
          </div>
          {/* The closing page is revealed bottom-to-top inside the pinned viewport.
              The existing chrome stays in one place; no cloned headers or footers. */}
          <div
            ref={outroOverlayRef}
            className="pointer-events-none absolute inset-0 z-20 h-dvh w-full overflow-hidden bg-canvas will-change-transform [&_a]:pointer-events-auto"
          >
            <BeautySculptureOutro />
          </div>
        </div>
      </div>

      {/* MOBILE CASE — Figma 390 px reference, proportional up to 440 px (iPhone 17 Pro Max). */}
      <div ref={mobileRef} className="min-[900px]:hidden bg-canvas">
        <div
          className="relative mx-auto w-full overflow-hidden bg-canvas"
          style={{ maxWidth: 440, height: 'calc(min(100vw, 440px) * 6.128205128)' }}
        >
          <div
            className="absolute left-0 top-0 origin-top-left bg-canvas"
            data-case-canvas
            style={{ width: 390, height: 2390, transform: 'scale(calc(min(100vw, 440px) / 390px))' }}
          >
            {/* Existing case-navigation components, scaled to the 390px Figma mobile layout. */}
            <div className="absolute left-[20px] top-[124px] z-10 h-[40px] w-[146px]">
              <div className="origin-top-left scale-[0.8]"><BeautySculptureLastCasesButton /></div>
            </div>

            {/* Intro video: Figma 350x220, no poster. */}
            <div className="absolute left-[20px] top-[212px] h-[220px] w-[350px] overflow-hidden">
              <video src={BEAUTY_VIDEO} aria-label="Beauty Sculpture cinematic introduction" autoPlay muted loop playsInline preload="auto" className="block h-full w-full object-cover" />
            </div>
            {/* First overlapping phone mockup: Figma 100x194. */}
            <img data-case-zoom role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click() } }} src={`${ASSETS}5-1.webp`} alt="Beauty Sculpture mobile screen 1" draggable={false} className="absolute left-[225px] top-[328px] h-[194px] w-[100px] object-contain cursor-zoom-in" />
            <span data-case-tap-hint className="pointer-events-none absolute left-[205px] top-[538px] w-[150px] text-center font-sans text-[16px] font-medium not-italic leading-[1.1] tracking-[-0.48px] text-[#3A5F73] lowercase opacity-0">tap to view</span>

            {/* Original placeholder headings / descriptions from the design; editable later. */}
            <div data-mobile-title-block className="absolute top-[582px] left-0 w-full font-sans text-[32px] font-medium leading-[0.95] tracking-[-0.96px] text-accent">
              <span data-mobile-title-line className="absolute left-[132px] top-0 whitespace-nowrap">Care</span>
              <span data-mobile-title-line className="absolute left-[167px] top-[34px] whitespace-nowrap">Out Of</span>
              <span data-mobile-title-line className="absolute left-[132px] top-[66px] whitespace-nowrap">Focus.</span>
            </div>
            <p data-mobile-copy className="absolute left-[65px] top-[695px] w-[260px] font-sans text-[16px] leading-[1.2] tracking-[-0.32px] text-ink"><MobileWords text={intro} /></p>
            <img data-case-zoom role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click() } }} src={`${ASSETS}5-2.webp`} alt="Beauty Sculpture mobile screen 2" loading="lazy" className="absolute left-[20px] top-[831px] h-[194px] w-[100px] object-contain cursor-zoom-in" />
            <img data-case-zoom role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click() } }} src={`${ASSETS}5-3.webp`} alt="Beauty Sculpture mobile screen 3" loading="lazy" className="absolute left-[270px] top-[831px] h-[194px] w-[100px] object-contain cursor-zoom-in" />
            <div data-mobile-title-block className="absolute top-[1085px] left-0 w-full font-sans text-[32px] font-medium leading-[0.95] tracking-[-0.96px] text-accent">
              <span data-mobile-title-line className="absolute left-[132px] top-0 whitespace-nowrap">Beauty</span>
              <span data-mobile-title-line className="absolute left-[167px] top-[34px] whitespace-nowrap">With</span>
              <span data-mobile-title-line className="absolute left-[132px] top-[66px] whitespace-nowrap">Clarity.</span>
            </div>
            <p data-mobile-copy className="absolute left-[65px] top-[1198px] w-[260px] font-sans text-[16px] leading-[1.2] tracking-[-0.32px] text-ink"><MobileWords text={challenge} /></p>
            <img data-case-zoom role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click() } }} src={`${ASSETS}5-4.webp`} alt="Beauty Sculpture mobile screen 4" loading="lazy" className="absolute left-[20px] top-[1334px] h-[194px] w-[100px] object-contain cursor-zoom-in" />
            <img data-case-zoom role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click() } }} src={`${ASSETS}5-5.webp`} alt="Beauty Sculpture mobile screen 5" loading="lazy" className="absolute left-[145px] top-[1334px] h-[194px] w-[100px] object-contain cursor-zoom-in" />
            <img data-case-zoom role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click() } }} src={`${ASSETS}5-6.webp`} alt="Beauty Sculpture mobile screen 6" loading="lazy" className="absolute left-[270px] top-[1334px] h-[194px] w-[100px] object-contain cursor-zoom-in" />
            <div data-mobile-title-block className="absolute top-[1588px] left-0 w-full font-sans text-[32px] font-medium leading-[0.95] tracking-[-0.96px] text-accent">
              <span data-mobile-title-line className="absolute left-[132px] top-0 whitespace-nowrap">Made</span>
              <span data-mobile-title-line className="absolute left-[167px] top-[34px] whitespace-nowrap">To Earn</span>
              <span data-mobile-title-line className="absolute left-[132px] top-[66px] whitespace-nowrap">Trust.</span>
            </div>
            <p data-mobile-copy className="absolute left-[65px] top-[1701px] w-[260px] font-sans text-[16px] leading-[1.2] tracking-[-0.32px] text-ink"><MobileWords text={approach} /></p>

            <div className="absolute left-[20px] top-[1810px] w-[350px] font-sans text-[42px] font-medium leading-[0.82] tracking-[-1.2px] text-accent opacity-10">
              <p>Feel Confident.</p><p>Look Exceptional.</p>
            </div>
            <p className="absolute left-[20px] top-[1960px] w-[320px] font-sans text-[32px] font-medium italic leading-[0.95] tracking-[-0.72px] text-accent">Build A Brand That Drives Growth</p>
            {/* Reuse the original home CTA, positioned after the case closing headline. */}
            <div className="absolute left-[91px] top-[2110px] z-10">
              <CtaButton />
            </div>
            {/* Existing case-navigation components, scaled to the 390px Figma mobile layout. */}
            <div className="absolute left-[20px] top-[2250px] z-10 h-[40px] w-[146px]" onClickCapture={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}>
              <div className="origin-top-left scale-[0.8]"><BeautySculptureLastCasesButton /></div>
            </div>
          </div>
        </div>
      </div>
      <CaseZoom rootRef={mobileRef} />
    </>
  )
}