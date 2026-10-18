
import {
  Fragment,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type RefObject,
} from 'react'
import gsap from 'gsap'
import { Link } from 'react-router'

import AboutFooter from './about/AboutFooter'
import AboutHeader from './about/AboutHeader'
import useChromeIntro from './about/useChromeIntro'
import useMobileMenu from './about/useMobileMenu'
import MobileMenu from './MobileMenu'

const foto1 = `${import.meta.env.BASE_URL}images/foto-1.webp`
const foto2 = `${import.meta.env.BASE_URL}images/foto-2.webp`

// ==========================================
// RESPONSIVE DESIGN
// ==========================================

// Desktop: 1920 × 1002
// Mobile: 390 × 844
// Tablet: 810 × 804

const stageStyle = {
  '--u': 'min(calc(100vw / 1920), 1px)',
  '--v': 'clamp(1px, calc(100vw / 390), 1.35px)',
  '--t': 'clamp(0.9px, calc(100vw / 810), 1.35px)',
} as CSSProperties

const margin = 'clamp(24px,2.0833vw,40px)'
const mobileMargin = 'max(1.25rem,env(safe-area-inset-left))'
const mobileMarginRight = 'max(1.25rem,env(safe-area-inset-right))'

const gradient1 =
  'bg-[linear-gradient(to_bottom,rgba(199,199,199,0)_57.895%,#c7c7c7_91.071%)]'

const gradient2 =
  'bg-[linear-gradient(to_bottom,rgba(199,199,199,0)_58%,#c7c7c7_88.393%)]'

// ==========================================
// TEXT HIGHLIGHT REVEAL
// ==========================================

const INITIAL_TEXT_COLOR = '#B5B5B5'
const INK_COLOR = '#3c3a36'
const BLACK_COLOR = '#000000'
const ACCENT_COLOR = '#3a5f73'

type WordTone = 'ink' | 'black' | 'accent'

function getWordColor(tone: string | undefined) {
  if (tone === 'black') return BLACK_COLOR
  if (tone === 'accent') return ACCENT_COLOR
  return INK_COLOR
}

// ==========================================
// WORD COMPONENT
// ==========================================

function PaintWords({
  text,
  tone = 'ink',
}: {
  text: string
  tone?: WordTone
}) {
  const colorClass =
    tone === 'black'
      ? 'text-black'
      : tone === 'accent'
        ? 'text-accent'
        : 'text-ink'

  return (
    <>
      {text.split(' ').map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          {index > 0 ? ' ' : null}
          <span
            data-about-word
            data-word-tone={tone}
            className={colorClass}
          >
            {word}
          </span>
        </Fragment>
      ))}
    </>
  )
}

// ==========================================
// CONTENT
// ==========================================

function DescriptionOne() {
  return (
    <>
      <PaintWords
        text="creating thoughtful web solutions at the"
        tone="black"
      />{' '}
      <PaintWords text="intersection of" />{' '}
      <PaintWords
        text="strategy"
        tone="accent"
      />{' '}
      <PaintWords text="and visual culture." />
    </>
  )
}

function DescriptionTwo() {
  return (
    <>
      <PaintWords
        text="For us, it’s not just about building a website — it’s about shaping a"
      />{' '}
      <PaintWords
        text="cohesive digital brand presence."
        tone="accent"
      />{' '}
      <PaintWords
        text="We pay close attention to details, structure, and user interaction logic."
      />
    </>
  )
}

function DescriptionThree() {
  return (
    <>
      <PaintWords
        text="In every project, we value depth,"
      />{' '}
      <PaintWords
        text="clarity, and responsibility"
        tone="accent"
      />{' '}
      <PaintWords
        text="for the final outcome. These principles form the foundation of our work."
      />
    </>
  )
}

// ==========================================
// PHOTO COMPONENT
// ==========================================

function Photo({
  src,
  gradient,
  className,
}: {
  src: string
  gradient: string
  className: string
}) {
  return (
    <div
      data-about-photo
      className={`overflow-hidden ${className}`}
    >
      <img
        data-about-image
        src={src}
        alt=""
        draggable={false}
        className="absolute size-full max-w-none object-cover"
      />

      <div
        className={`pointer-events-none absolute inset-0 ${gradient}`}
      />
    </div>
  )
}

// ==========================================
// READ MORE — HERO-STYLE TEXT SWAP
// ==========================================

function ReadMoreText() {
  const transition =
    'transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none'

  return (
    <span
      aria-hidden="true"
      className="relative block overflow-hidden"
    >
      <span
        className={`block ${transition} group-hover/swap:-translate-y-full group-focus-visible/swap:-translate-y-full`}
      >
        read more
      </span>

      <span
        className={`absolute top-full left-0 block whitespace-nowrap text-ink ${transition} group-hover/swap:-translate-y-full group-focus-visible/swap:-translate-y-full`}
      >
        read more
      </span>
    </span>
  )
}

// ==========================================
// EDITORIAL SEQUENCE
// ==========================================

const PRELOADER_SELECTOR =
  '[role="status"][aria-label="Loading M&T Web Designer Studio"]'

function useAboutIntro(
  rootRef: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const root = rootRef.current

    if (!root) return

    if (
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
    ) {
      return
    }

    const mm = gsap.matchMedia()

    const animateLayout = (selector: string) => {
      const layout =
        root.querySelector<HTMLElement>(selector)

      if (!layout) return

      let observer: MutationObserver | null = null
      let started = false

      const context = gsap.context(() => {
        const photos =
          gsap.utils.toArray<HTMLElement>(
            '[data-about-photo]',
            layout,
          )

        const firstPhoto = photos[0]
        const secondPhoto = photos[1]

        const titleMask =
          layout.querySelector<HTMLElement>(
            '[data-about-title-mask]',
          )

        const titleInner =
          layout.querySelector<HTMLElement>(
            '[data-about-title-inner]',
          )

        const descriptions =
          gsap.utils.toArray<HTMLElement>(
            '[data-about-description]',
            layout,
          )

        const readMore =
          layout.querySelector<HTMLElement>(
            '[data-about-readmore]',
          )

        if (
          !firstPhoto ||
          !secondPhoto ||
          !titleMask ||
          !titleInner
        ) {
          return
        }

        const isMobile = window.matchMedia(
          '(max-width: 767px)',
        ).matches

        // ======================================
        // INITIAL STATES
        // ======================================

        // TITLE — ORIGINAL MASK REVEAL

        gsap.set(titleMask, {
          overflow: 'hidden',
        })

        gsap.set(titleInner, {
          yPercent: 105,
        })

        // ======================================
        // PHOTOS — CINEMATIC MASK REVEAL
        // ======================================

        // Only clipPath is animated.
        // No opacity, scale or y movement.

        gsap.set(
          [firstPhoto, secondPhoto],
          {
            clipPath: 'inset(100% 0 0 0)',
          },
        )

        // ======================================
        // TEXT INITIAL STATES
        // ======================================

        const paragraphWords = descriptions.map(
          (paragraph) =>
            gsap.utils.toArray<HTMLSpanElement>(
              '[data-about-word]',
              paragraph,
            ),
        )

        const allWords = paragraphWords.flat()

        gsap.set(allWords, {
          color: INITIAL_TEXT_COLOR,
        })

        // READ MORE — INITIAL APPEARANCE

        if (readMore) {
          gsap.set(readMore, {
            y: 10,
            autoAlpha: 0,
          })
        }

        // ======================================
        // EDITORIAL TIMELINE
        // ======================================

        const timeline = gsap.timeline({
          paused: true,

          onComplete: () => {
            gsap.set(titleMask, {
              clearProps: 'overflow',
            })

            gsap.set(titleInner, {
              clearProps: 'transform',
            })

            // Remove mask once fully revealed.
            // Photo positions remain unchanged.

            gsap.set(
              [firstPhoto, secondPhoto],
              {
                clearProps: 'clipPath',
              },
            )

            gsap.set(allWords, {
              clearProps: 'color',
            })

            if (readMore) {
              gsap.set(readMore, {
                clearProps:
                  'transform,opacity,visibility',
              })
            }
          },
        })

        // ======================================
        // 01 — TITLE
        // ======================================

        timeline.to(
          titleInner,
          {
            yPercent: 0,
            duration: isMobile ? 0.85 : 1.05,
            ease: 'expo.out',
          },
          0.08,
        )

        // ======================================
        // 02 — FAST SEQUENTIAL TEXT PAINT
        // ======================================

        const wordDuration = isMobile ? 0.2 : 0.24
        const wordStagger = 0.018
        const overlap = 0.12

        let nextParagraphStart = 0.35

        paragraphWords.forEach((words) => {
          if (words.length === 0) return

          const paragraphDuration =
            (words.length - 1) * wordStagger +
            wordDuration

          timeline.to(
            words,
            {
              color: (_, target) => {
                const element =
                  target as HTMLSpanElement

                return getWordColor(
                  element.dataset.wordTone,
                )
              },
              duration: wordDuration,
              stagger: {
                each: wordStagger,
                from: 'start',
              },
              ease: 'power1.out',
            },
            nextParagraphStart,
          )

          nextParagraphStart +=
            paragraphDuration - overlap
        })

        // ======================================
        // 03 — FIRST PORTRAIT
        // ======================================

        timeline.to(
          firstPhoto,
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: isMobile ? 1.15 : 1.4,
            ease: 'power3.inOut',
          },
          0.48,
        )

        // ======================================
        // 04 — SECOND PORTRAIT
        // ======================================

        timeline.to(
          secondPhoto,
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: isMobile ? 1.15 : 1.4,
            ease: 'power3.inOut',
          },
          0.60,
        )

        // ======================================
        // 05 — READ MORE
        // ======================================

        // Appears after the text finishes.

        if (readMore) {
          const readMoreStart =
            nextParagraphStart + overlap + 0.12

          timeline.to(
            readMore,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
              ease: 'power3.out',
            },
            readMoreStart,
          )
        }

        // ======================================
        // WAIT FOR PRELOADER
        // ======================================

        const startAnimation = () => {
          if (started) return

          if (
            document.querySelector(
              PRELOADER_SELECTOR,
            )
          ) {
            return
          }

          started = true

          observer?.disconnect()
          observer = null

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
      }, layout)

      return () => {
        observer?.disconnect()
        context.revert()
      }
    }

    // ======================================
    // RESPONSIVE ANIMATION
    // ======================================

    mm.add(
      '(min-width: 1280px)',
      () =>
        animateLayout(
          '[data-about-layout="desktop"]',
        ),
    )

    mm.add(
      '(min-width: 768px) and (max-width: 1279px)',
      () =>
        animateLayout(
          '[data-about-layout="tablet"]',
        ),
    )

    mm.add(
      '(max-width: 767px)',
      () =>
        animateLayout(
          '[data-about-layout="mobile"]',
        ),
    )

    return () => {
      mm.revert()
    }
  }, [rootRef])
}

// ==========================================
// ABOUT US
// ==========================================

export default function AboutUs() {
  const rootRef = useRef<HTMLElement>(null)

  const {
    menuOpen,
    menuButtonRef,
    openMenu,
    closeMenu,
  } = useMobileMenu()

  useChromeIntro(rootRef)
  useAboutIntro(rootRef)

  // ======================================
  // TEXT SIZES — UNCHANGED
  // ======================================

  const desktopDescription =
    'absolute w-[calc(339*var(--u))] text-[18px] leading-[1.2] font-normal tracking-[-0.02em] text-ink'

  const mobileText =
    'text-[16px] leading-[1.2] font-normal tracking-[-0.02em] text-ink'

  const tabletText =
    'text-[16px] min-[856px]:text-[18px] leading-[1.2] font-normal tracking-[-0.02em] text-ink'

  return (
    <section
      ref={rootRef}
      style={stageStyle}
      className="relative min-h-dvh overflow-x-clip bg-canvas font-sans text-ink max-[767px]:pb-[calc(max(3.75rem,calc(env(safe-area-inset-bottom)+1.5rem))+calc(90*var(--v)))] min-[768px]:max-[1279px]:min-h-[calc(804*var(--t))]"
    >
      <div inert={menuOpen}>
        {/* ====================================
            DESKTOP (>= 1280px)
        ==================================== */}

        <div
          data-about-layout="desktop"
          className="hidden min-[1280px]:contents"
        >
          <Photo
            src={foto1}
            gradient={gradient1}
            className="absolute top-[calc(271*var(--u))] left-[clamp(24px,2.0833vw,40px)] h-[calc(532*var(--u))] w-[calc(473*var(--u))]"
          />

          <Photo
            src={foto2}
            gradient={gradient2}
            className="absolute top-[calc(271*var(--u))] left-[calc(clamp(24px,2.0833vw,40px)+481*var(--u))] h-[calc(532*var(--u))] w-[calc(473*var(--u))]"
          />

          <h1
            data-about-title-mask
            style={{ right: margin }}
            className="absolute top-[calc(158*var(--u))] text-[calc(66*var(--u))] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-accent"
          >
            <span
              data-about-title-inner
              className="block"
            >
              M&amp;T Web Design Studio
            </span>
          </h1>

          <p
            data-about-description
            style={{ right: margin }}
            className={`${desktopDescription} top-[calc(271*var(--u))]`}
          >
            <DescriptionOne />
          </p>

          <p
            data-about-description
            style={{ right: margin }}
            className={`${desktopDescription} top-[calc(357*var(--u))]`}
          >
            <DescriptionTwo />
          </p>

          <p
            data-about-description
            style={{ right: margin }}
            className={`${desktopDescription} top-[calc(665*var(--u))]`}
          >
            <DescriptionThree />
          </p>

          <div
            style={{ right: margin }}
            className="absolute top-[calc(781*var(--u))] w-[calc(339*var(--u))]"
          >
            <Link
              data-about-readmore
              to="/about-two"
              aria-label="read more"
              className="group/swap inline-block cursor-pointer text-[20px] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-accent lowercase focus-visible:outline-offset-4"
            >
              <ReadMoreText />
            </Link>
          </div>
        </div>

        {/* ====================================
            TABLET (768px - 1279px)
        ==================================== */}

        <div
          data-about-layout="tablet"
          className="hidden min-[768px]:max-[1279px]:block"
        >
          {/* HEADING */}

          <h1
            data-about-title-mask
            className="absolute top-[calc(141*var(--t))] right-[calc(20*var(--t))] text-[calc(42*var(--t))] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-accent"
          >
            <span
              data-about-title-inner
              className="block"
            >
              M&amp;T Web Design Studio
            </span>
          </h1>

          {/* FIRST DESCRIPTION */}

          <p
            data-about-description
            className={`absolute top-[calc(220*var(--t))] right-[calc(20*var(--t))] w-[calc(252*var(--t))] ${tabletText}`}
          >
            <DescriptionOne />
          </p>

          {/* SECOND DESCRIPTION */}

          <p
            data-about-description
            className={`absolute top-[calc(308*var(--t))] right-[calc(20*var(--t))] w-[calc(252*var(--t))] ${tabletText}`}
          >
            <DescriptionTwo />
          </p>

          {/* TWO PHOTOS */}

          <div className="absolute top-[calc(419*var(--t))] left-[calc(20*var(--t))] flex gap-[calc(10*var(--t))]">
            <Photo
              src={foto1}
              gradient={gradient1}
              className="relative h-[calc(228*var(--t))] w-[calc(187*var(--t))] shrink-0"
            />

            <Photo
              src={foto2}
              gradient={gradient2}
              className="relative h-[calc(228*var(--t))] w-[calc(187*var(--t))] shrink-0"
            />
          </div>

          {/* THIRD DESCRIPTION */}

          <p
            data-about-description
            className={`absolute top-[calc(552*var(--t))] right-[calc(20*var(--t))] w-[calc(252*var(--t))] ${tabletText}`}
          >
            <DescriptionThree />
          </p>

          {/* READ MORE */}

          <Link
            data-about-readmore
            to="/about-two"
            aria-label="read more"
            className="group/swap absolute top-[calc(655*var(--t))] right-[calc(199*var(--t))] cursor-pointer text-[18px] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-accent lowercase focus-visible:outline-offset-4"
          >
            <ReadMoreText />
          </Link>
        </div>

        {/* ====================================
            MOBILE (< 768px)
        ==================================== */}

        <div
          data-about-layout="mobile"
          style={{
            paddingLeft: mobileMargin,
            paddingRight: mobileMarginRight,
          }}
          className="pt-[calc(134*var(--v))] min-[768px]:hidden"
        >
          {/* TITLE */}

          <h1
            data-about-title-mask
            className="text-[calc(32*var(--v))] leading-[1.1] font-medium tracking-[-0.03em] text-accent"
          >
            <span
              data-about-title-inner
              className="block"
            >
              M&amp;T Web Design Studio
            </span>
          </h1>

          {/* FIRST TEXT — 40px */}

          <p
            data-about-description
            className={`mt-[calc(40*var(--v))] ${mobileText}`}
          >
            <DescriptionOne />
          </p>

          {/* SECOND TEXT — 20px */}

          <p
            data-about-description
            className={`mt-[calc(20*var(--v))] ${mobileText}`}
          >
            <DescriptionTwo />
          </p>

          {/* PHOTOS — 30px */}

          <div className="mt-[calc(30*var(--v))] flex gap-[calc(10*var(--v))]">
            <Photo
              src={foto1}
              gradient={gradient1}
              className="relative aspect-170/197 min-w-0 flex-1"
            />

            <Photo
              src={foto2}
              gradient={gradient2}
              className="relative aspect-170/197 min-w-0 flex-1"
            />
          </div>

          {/* THIRD TEXT — 30px */}

          <p
            data-about-description
            className={`mt-[calc(30*var(--v))] ${mobileText}`}
          >
            <DescriptionThree />
          </p>

          {/* READ MORE — 20px GAP */}

          <Link
            data-about-readmore
            to="/about-two"
            aria-label="read more"
            className="group/swap mt-[calc(20*var(--v))] block w-fit cursor-pointer text-[18px] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-accent lowercase focus-visible:outline-offset-4"
          >
            <ReadMoreText />
          </Link>
        </div>

        {/* ====================================
            HEADER / FOOTER — UNCHANGED
        ==================================== */}

        <AboutHeader
          menuOpen={menuOpen}
          menuButtonRef={menuButtonRef}
          onOpenMenu={openMenu}
        />

        <AboutFooter />
      </div>

      {menuOpen && <MobileMenu onClose={closeMenu} />}
    </section>
  )
}



