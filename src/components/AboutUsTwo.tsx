
import {
  Fragment,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type RefObject,
} from 'react'
import gsap from 'gsap'

import AboutFooter from './about/AboutFooter'
import AboutHeader from './about/AboutHeader'
import useChromeIntro from './about/useChromeIntro'
import useMobileMenu from './about/useMobileMenu'
import InfiniteSpiral from './InfiniteSpiral'
import MobileMenu from './MobileMenu'

// ==========================================
// RESPONSIVE DESIGN
// ==========================================

const stageStyle = {
  '--u': 'min(calc(100vw / 1920), 1px)',
  '--v': 'clamp(1px, calc(100vw / 390), 1.35px)',
} as CSSProperties

const margin = 'clamp(24px,2.0833vw,40px)'

const compactMargin = {
  paddingLeft: 'max(1.25rem,env(safe-area-inset-left))',
  paddingRight: 'max(1.25rem,env(safe-area-inset-right))',
}

// ==========================================
// BACKGROUND SPIRAL
// ==========================================

const previewImages = [1, 2, 3, 4, 5].map(
  (n) =>
    `${import.meta.env.BASE_URL}images/Preview%20${n}.webp`,
)

const ABOUT_SPIRAL_OPACITY = 0.22

// ==========================================
// CONTENT
// ==========================================

const introLabels = [
  {
    text: 'Don`t ask us to just design. ',
    position: 'left-0',
  },
  {
    text: 'The Foundation Of Our Work.',
    position: 'left-[48.696%]',
  },
  {
    text: 'ask us to build a leader.',
    position: 'left-[87.5%]',
  },
] as const

const values = [
  {
    title: ['Results Define', 'Our Work'],
    description:
      'We don’t use templates. Every project begins with clear understanding — of the business, its goals, and its audience.',
    indicator: 'bg-accent/50',
  },
  {
    title: ['Every visit', 'has value'],
    description:
      'People scan and decide in seconds. We design structure and interaction so everything works from the first glance.',
    indicator: 'bg-accent/50',
  },
  {
    title: ['You Pay', 'For Results'],
    description:
      'Clear scope. Defined process. Honest timelines. No hidden layers. No “extra” work later.',
    indicator: 'bg-accent/50',
  },
  {
    title: ['Full', 'Accountability'],
    description:
      'From concept to launch and beyond, we stay involved. We don’t disappear after release.',
    indicator: 'bg-ink/50',
  },
]

// ==========================================
// TEXT HIGHLIGHT REVEAL
// ==========================================

const INITIAL_TEXT_COLOR = '#B5B5B5'
const FINAL_TEXT_COLOR = '#3c3a36'

function PaintWords({
  text,
}: {
  text: string
}) {
  return (
    <>
      {text.split(' ').map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          {index > 0 ? ' ' : null}

          <span
            data-about-two-word
            className="text-ink"
          >
            {word}
          </span>
        </Fragment>
      ))}
    </>
  )
}

// ==========================================
// INTRO LABEL MASK
// ==========================================

function IntroReveal({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  return (
    <span
      className={`block overflow-hidden ${className}`}
    >
      <span
        data-about-two-intro-line
        className="block"
      >
        {text}
      </span>
    </span>
  )
}

// ==========================================
// TITLE MASK REVEAL
// ==========================================

function TitleReveal({
  lines,
}: {
  lines: readonly string[]
}) {
  return (
    <>
      {lines.map((line, index) => (
        <span
          key={`${index}-${line}`}
          className="block overflow-hidden"
        >
          <span
            data-about-two-title-line
            className="block"
          >
            {line}
          </span>
        </span>
      ))}
    </>
  )
}

// ==========================================
// ANIMATION SETTINGS
// ==========================================

const PRELOADER_SELECTOR =
  '[role="status"][aria-label="Loading M&T Web Designer Studio"]'

const MOTION = {
  // NEW INTRO REVEAL
  introDuration: 1.15,
  introStagger: 0.18,

  // EXISTING ANIMATIONS
  lineDuration: 1.05,

  titleDuration: 1.05,
  titleLineStagger: 0.12,
  rowStagger: 0.19,

  wordDuration: 0.24,
  mobileWordDuration: 0.2,
  wordStagger: 0.018,

  dotDuration: 0.65,
} as const

// ==========================================
// ABOUT TWO INTRO ANIMATION
// ==========================================

function useAboutTwoIntro(
  rootRef: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const root = rootRef.current

    if (!root) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    if (reduceMotion.matches) {
      return
    }

    const mm = gsap.matchMedia()

    // ======================================
    // ANIMATE ACTIVE LAYOUT
    // ======================================

    const animateLayout = (selector: string) => {
      const layout =
        root.querySelector<HTMLElement>(selector)

      if (!layout) return

      let observer: MutationObserver | null = null
      let started = false

      const context = gsap.context(() => {
        // ====================================
        // ELEMENTS
        // ====================================

        const introLines =
          gsap.utils.toArray<HTMLElement>(
            '[data-about-two-intro-line]',
            layout,
          )

        const divider =
          layout.querySelector<HTMLElement>(
            '[data-about-two-divider]',
          )

        const rows =
          gsap.utils.toArray<HTMLElement>(
            '[data-about-two-row]',
            layout,
          )

        const descriptions =
          gsap.utils.toArray<HTMLElement>(
            '[data-about-two-description]',
            layout,
          )

        if (
          introLines.length === 0 ||
          !divider ||
          rows.length === 0 ||
          descriptions.length === 0
        ) {
          return
        }

        const isMobile = window.matchMedia(
          '(max-width: 767px)',
        ).matches

        const titleLinesByRow = rows.map(
          (row) =>
            gsap.utils.toArray<HTMLElement>(
              '[data-about-two-title-line]',
              row,
            ),
        )

        const indicators = rows.map(
          (row) =>
            row.querySelector<HTMLElement>(
              '[data-about-two-indicator]',
            ),
        )

        const paragraphWords = descriptions.map(
          (paragraph) =>
            gsap.utils.toArray<HTMLSpanElement>(
              '[data-about-two-word]',
              paragraph,
            ),
        )

        const allTitleLines =
          titleLinesByRow.flat()

        const allWords =
          paragraphWords.flat()

        const allIndicators =
          indicators.filter(
            (indicator): indicator is HTMLElement =>
              indicator !== null,
          )

        // ====================================
        // INITIAL STATES
        // ====================================

        // ====================================
        // INTRO LABELS — NEW CLIP REVEAL
        // ====================================

        // Keep the text as a single element.
        // No character splitting.
        // No changes to letter spacing.

        gsap.set(introLines, {
          clipPath: 'inset(0 100% 0 0)',
          y: 8,
        })

        // ====================================
        // DIVIDER — UNCHANGED
        // ====================================

        gsap.set(divider, {
          scaleX: 0,
          transformOrigin: 'left center',
        })

        // ====================================
        // TITLES — UNCHANGED
        // ====================================

        gsap.set(allTitleLines, {
          yPercent: 115,
          force3D: true,
        })

        // ====================================
        // DESCRIPTION WORDS — UNCHANGED
        // ====================================

        gsap.set(allWords, {
          color: INITIAL_TEXT_COLOR,
        })

        // ====================================
        // INDICATORS — UNCHANGED
        // ====================================

        gsap.set(allIndicators, {
          scale: 0.35,
          autoAlpha: 0,
          transformOrigin: '50% 50%',
        })

        // ====================================
        // MASTER TIMELINE
        // ====================================

        const timeline = gsap.timeline({
          paused: true,

          defaults: {
            overwrite: 'auto',
          },

          onComplete: () => {
            // INTRO — CLEAN UP NEW EFFECT

            gsap.set(introLines, {
              clearProps: 'transform,clipPath',
            })

            // ALL OTHER CLEANUP UNCHANGED

            gsap.set(divider, {
              clearProps:
                'transform,transformOrigin',
            })

            gsap.set(allTitleLines, {
              clearProps: 'transform',
            })

            gsap.set(allWords, {
              clearProps: 'color',
            })

            gsap.set(allIndicators, {
              clearProps:
                'transform,transformOrigin,opacity,visibility',
            })
          },
        })

        // ====================================
        // 01 — INTRO CLIP-PATH REVEAL
        // ====================================

        // Reveal each complete italic label
        // from left to right.
        // Light vertical motion adds depth.

        timeline.to(
          introLines,
          {
            clipPath: 'inset(0 0% 0 0)',
            y: 0,
            duration: MOTION.introDuration,
            stagger: MOTION.introStagger,
            ease: 'power3.inOut',
          },
          0.06,
        )

        // ====================================
        // 02 — DIVIDER DRAW
        // UNCHANGED
        // ====================================

        timeline.to(
          divider,
          {
            scaleX: 1,
            duration: MOTION.lineDuration,
            ease: 'power3.inOut',
          },
          0.2,
        )

        // ====================================
        // 03 — EDITORIAL WAVE
        // UNCHANGED
        // ====================================

        const baseRowStart = 0.52

        rows.forEach((_row, index) => {
          const titleLines =
            titleLinesByRow[index]

          const words =
            paragraphWords[index]

          const indicator =
            indicators[index]

          const rowStart =
            baseRowStart +
            index * MOTION.rowStagger

          // ----------------------------------
          // TITLE MASK REVEAL
          // ----------------------------------

          if (
            titleLines !== undefined &&
            titleLines.length > 0
          ) {
            timeline.to(
              titleLines,
              {
                yPercent: 0,
                duration: MOTION.titleDuration,
                stagger: {
                  each: MOTION.titleLineStagger,
                  from: 'start',
                },
                ease: 'expo.out',
              },
              rowStart,
            )
          }

          // ----------------------------------
          // DESCRIPTION WORD PAINT
          // ----------------------------------

          if (
            words !== undefined &&
            words.length > 0
          ) {
            timeline.to(
              words,
              {
                color: FINAL_TEXT_COLOR,

                duration: isMobile
                  ? MOTION.mobileWordDuration
                  : MOTION.wordDuration,

                stagger: {
                  each: MOTION.wordStagger,
                  from: 'start',
                },

                ease: 'power1.out',
              },
              rowStart + 0.14,
            )
          }

          // ----------------------------------
          // INDICATOR REVEAL
          // ----------------------------------

          if (indicator) {
            timeline.to(
              indicator,
              {
                scale: 1,
                autoAlpha: 1,
                duration: MOTION.dotDuration,
                ease: 'back.out(1.5)',
              },
              rowStart + 0.24,
            )
          }
        })

        // ====================================
        // PRELOADER SYNCHRONIZATION
        // UNCHANGED
        // ====================================

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
    // RESPONSIVE MATCH MEDIA
    // ======================================

    mm.add(
      '(min-width: 1280px)',
      () =>
        animateLayout(
          '[data-about-two-layout="desktop"]',
        ),
    )

    mm.add(
      '(min-width: 768px) and (max-width: 1279px)',
      () =>
        animateLayout(
          '[data-about-two-layout="tablet"]',
        ),
    )

    mm.add(
      '(max-width: 767px)',
      () =>
        animateLayout(
          '[data-about-two-layout="mobile"]',
        ),
    )

    return () => {
      mm.revert()
    }
  }, [rootRef])
}

// ==========================================
// ABOUT US TWO
// ==========================================

export default function AboutUsTwo() {
  const rootRef = useRef<HTMLElement>(null)

  const {
    menuOpen,
    menuButtonRef,
    openMenu,
    closeMenu,
  } = useMobileMenu()

  useChromeIntro(rootRef)
  useAboutTwoIntro(rootRef)

  return (
    <section
      ref={rootRef}
      style={stageStyle}
      className="isolate relative min-h-dvh overflow-x-clip bg-canvas font-sans text-ink max-[1280px]:pb-[calc(max(3.75rem,calc(env(safe-area-inset-bottom)+1.5rem))+104px)]"
    >
      {/* ====================================
          BACKGROUND SPIRAL — UNCHANGED
      ==================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <InfiniteSpiral
          images={previewImages}
          cardOpacity={ABOUT_SPIRAL_OPACITY}
        />
      </div>

      <div inert={menuOpen}>
        {/* ====================================
            DESKTOP (>= 1280px)
        ==================================== */}

        <div
          data-about-two-layout="desktop"
          className="hidden min-[1280px]:contents"
        >
          {/* SECTION INTRO */}

          <div
            style={{
              left: margin,
              right: margin,
            }}
            className="absolute top-[calc(198*var(--u))] h-[calc(42*var(--u))]"
          >
            {introLabels.map(({ text, position }) => (
              <p
                key={text}
                className={`absolute top-0 ${position} text-[max(14px,calc(20*var(--u)))] leading-[1.1] font-light tracking-[-0.03em] whitespace-nowrap text-ink capitalize italic opacity-75`}
              >
                <IntroReveal text={text} />
              </p>
            ))}
          </div>

          {/* DIVIDER */}

          <div
            data-about-two-divider
            aria-hidden="true"
            className="absolute top-[calc(239*var(--u))] right-0 left-0 h-px bg-ink/60"
          />

          {/* VALUES LIST */}

          <ul
            style={{
              left: margin,
              right: margin,
            }}
            className="absolute top-[calc(50%+79*var(--u))] flex -translate-y-1/2 flex-col gap-[calc(64*var(--u))]"
          >
            {values.map(
              ({ title, description, indicator }) => (
                <li
                  key={title[0]}
                  data-about-two-row
                  className="relative h-[calc(73*var(--u))]"
                >
                  {/* TITLE */}

                  <h2 className="absolute top-0 left-0 text-[calc(34*var(--u))] leading-[0.95] font-light tracking-[-0.03em] whitespace-nowrap text-accent capitalize opacity-70">
                    <TitleReveal lines={title} />
                  </h2>

                  {/* DESCRIPTION */}

                  <p
                    data-about-two-description
                    className="absolute top-0 left-[48.696%] w-[calc(330*var(--u))] text-[max(14px,calc(18*var(--u)))] leading-[1.2] font-normal tracking-[-0.02em] text-ink"
                  >
                    <PaintWords text={description} />
                  </p>

                  {/* INDICATOR */}

                  <span
                    data-about-two-indicator
                    aria-hidden="true"
                    className={`absolute top-0 right-0 size-[calc(12*var(--u))] rounded-full ${indicator}`}
                  />
                </li>
              ),
            )}
          </ul>
        </div>

        {/* ====================================
            TABLET (768px – 1279px)
        ==================================== */}

        <div
          data-about-two-layout="tablet"
          className="hidden min-[768px]:max-[1280px]:block"
        >
          {/* SECTION INTRO */}

          <div
            style={{
              ...compactMargin,
              paddingTop: '134px',
            }}
          >
            <div className="flex flex-col items-center gap-[4.4px] text-center text-[18px] leading-[1.1] font-light tracking-[-0.03em] text-ink capitalize italic opacity-75">
              {introLabels.map(({ text }) => (
                <p key={text}>
                  <IntroReveal text={text} />
                </p>
              ))}
            </div>
          </div>

          {/* DIVIDER */}

          <div
            data-about-two-divider
            aria-hidden="true"
            className="mt-5 h-px bg-ink/30"
          />

          {/* VALUES LIST */}

          <ul
            style={compactMargin}
            className="mt-[clamp(40px,5vw,64px)] flex flex-col gap-[clamp(40px,5vw,64px)]"
          >
            {values.map(
              ({ title, description, indicator }) => (
                <li
                  key={title[0]}
                  data-about-two-row
                  className="relative grid grid-cols-[48.696%_minmax(0,1fr)] items-start"
                >
                  {/* TITLE */}

                  <h2 className="col-start-1 text-[clamp(26px,3.2vw,34px)] leading-[0.95] font-light tracking-[-0.03em] whitespace-nowrap text-accent capitalize opacity-70">
                    <TitleReveal lines={title} />
                  </h2>

                  {/* DESCRIPTION */}

                  <p
                    data-about-two-description
                    className="col-start-2 w-[clamp(280px,38vw,330px)] max-w-full text-[18px] leading-[1.2] font-normal tracking-[-0.02em] text-ink"
                  >
                    <PaintWords text={description} />
                  </p>

                  {/* INDICATOR */}

                  <span
                    data-about-two-indicator
                    aria-hidden="true"
                    className={`absolute top-0 right-0 size-3 rounded-full ${indicator}`}
                  />
                </li>
              ),
            )}
          </ul>
        </div>

        {/* ====================================
            MOBILE (< 768px)
        ==================================== */}

        <div
          data-about-two-layout="mobile"
          className="min-[768px]:hidden"
        >
          {/* SECTION INTRO */}

          <div
            style={compactMargin}
            className="pt-[calc(134*var(--v))]"
          >
            {introLabels.map(({ text }, index) => (
              <p
                key={text}
                className={`text-center text-[16px] leading-[1.1] font-light tracking-[-0.03em] text-ink capitalize italic ${
                  index > 0
                    ? 'mt-[calc(4.4*var(--v))]'
                    : ''
                }`}
              >
                <IntroReveal text={text} />
              </p>
            ))}
          </div>

          {/* DIVIDER */}

          <div
            data-about-two-divider
            aria-hidden="true"
            className="mt-[calc(17.4*var(--v)+20px)] h-px bg-ink/90"
          />

          {/* VALUES LIST */}

          <ul
            style={compactMargin}
            className="mt-[calc(18*var(--v)+46px)] flex flex-col gap-[calc(19.3*var(--v))]"
          >
            {values.map(
              ({ title, description, indicator }) => (
                <li
                  key={title[0]}
                  data-about-two-row
                  className="relative"
                >
                  {/* TITLE */}

                  <h2 className="text-[calc(26*var(--v))] leading-[0.95] font-light tracking-[-0.03em] whitespace-nowrap text-accent capitalize opacity-70">
                    <TitleReveal
                      lines={[title.join(' ')]}
                    />
                  </h2>

                  {/* DESCRIPTION */}

                  <p
                    data-about-two-description
                    className="mt-[calc(10.3*var(--v))] w-[calc(286*var(--v))] max-w-full text-[16px] leading-[1.2] font-normal tracking-[-0.02em] text-ink"
                  >
                    <PaintWords text={description} />
                  </p>

                  {/* INDICATOR */}

                  <span
                    data-about-two-indicator
                    aria-hidden="true"
                    className={`absolute top-[calc(7*var(--v))] right-0 size-3 rounded-full ${indicator}`}
                  />
                </li>
              ),
            )}
          </ul>
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

      {/* MOBILE MENU — UNCHANGED */}

      {menuOpen && (
        <MobileMenu onClose={closeMenu} />
      )}
    </section>
  )
}
