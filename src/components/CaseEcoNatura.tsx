
import {
  Fragment,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type RefObject,
} from 'react'

import gsap from 'gsap'
import { useNavigate } from 'react-router'

import AboutFooter from './about/AboutFooter'
import AboutHeader from './about/AboutHeader'
import useChromeIntro from './about/useChromeIntro'
import useMobileMenu from './about/useMobileMenu'
import CaseCta from './case/CaseCta'
import MobileMenu from './MobileMenu'

import Spiral3DSlider, {
  type Spiral3DSlide,
} from './Spiral3DSlider'

// ==========================================
// ASSETS
// ==========================================

const BASE_URL = import.meta.env.BASE_URL

const caseImages: Spiral3DSlide[] = [
  {
    src: `${BASE_URL}images/1.1.webp`,
    alt: 'Eco Natura project screen 1.1',
  },
  {
    src: `${BASE_URL}images/1.2.webp`,
    alt: 'Eco Natura project screen 1.2',
  },
  {
    src: `${BASE_URL}images/1.3.webp`,
    alt: 'Eco Natura project screen 1.3',
  },
  {
    src: `${BASE_URL}images/1.4.webp`,
    alt: 'Eco Natura project screen 1.4',
  },
  {
    src: `${BASE_URL}images/1.5.webp`,
    alt: 'Eco Natura project screen 1.5',
  },
  {
    src: `${BASE_URL}images/1.6.webp`,
    alt: 'Eco Natura project screen 1.6',
  },
  {
    src: `${BASE_URL}images/1.7.webp`,
    alt: 'Eco Natura project screen 1.7',
  },
]

// ==========================================
// DESKTOP DESIGN
// ==========================================

const stageStyle = {
  '--u': 'min(calc(100vw / 1920), 1px)',
} as CSSProperties

const column =
  'left-[calc(50%-180*var(--u))]'

const margin =
  'clamp(24px,2.0833vw,40px)'

// ==========================================
// CONTENT
// ==========================================

const sections = [
  {
    title: 'Challenge',
    top: 568,
    description:
      'Eco-friendly products with strong values but a weak online presentation. As a result — low brand trust and unfocused traffic.',
  },
  {
    title: 'Solution',
    top: 696,
    description:
      'We designed a clean, natural digital experience that highlights product quality and communicates the brand’s eco philosophy.',
  },
  {
    title: 'Result',
    top: 824,
    description:
      'Stronger brand perception. More engaged visitors. Real interest from conscious buyers.',
  },
]

// ==========================================
// INTRO ANIMATION
// ==========================================

const PRELOADER_SELECTOR =
  '[role="status"][aria-label="Loading M&T Web Designer Studio"]'

const MOTION = {
  introDuration: 1.15,
  introStagger: 0.18,
  mainTitleDuration: 1.05,
  lineDuration: 1.05,
  sectionTitleDuration: 0.8,
  wordDuration: 0.24,
  wordStagger: 0.018,
  rowPause: 0.16,
} as const

const INITIAL_TITLE_OPACITY = 0.25
const FINAL_TITLE_OPACITY = 1

const INITIAL_TEXT_COLOR = '#B5B5B5'
const FINAL_TEXT_COLOR = '#3c3a36'

// ==========================================
// INTRO REVEAL
// ==========================================

function IntroReveal({
  children,
}: {
  children: string
}) {
  return (
    <span className="block overflow-hidden">
      <span
        data-case-intro-line
        className="block"
      >
        {children}
      </span>
    </span>
  )
}

// ==========================================
// MAIN TITLE
// ==========================================

function MainTitleReveal({
  children,
}: {
  children: string
}) {
  return (
    <span className="block overflow-hidden">
      <span
        data-case-main-title
        className="block"
      >
        {children}
      </span>
    </span>
  )
}

// ==========================================
// SECTION TITLE
// ==========================================

function SectionTitle({
  children,
}: {
  children: string
}) {
  return (
    <span
      data-case-section-title
      className="block"
      style={{
        opacity: INITIAL_TITLE_OPACITY,
      }}
    >
      {children}
    </span>
  )
}

// ==========================================
// DESCRIPTION WORDS
// ==========================================

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
            data-case-word
            style={{
              color: INITIAL_TEXT_COLOR,
            }}
          >
            {word}
          </span>
        </Fragment>
      ))}
    </>
  )
}

// ==========================================
// CASE INTRO HOOK
// ==========================================

function useCaseIntro(
  rootRef: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const root = rootRef.current

    if (!root) return

    const reducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      )

    if (reducedMotion.matches) {
      const titles =
        gsap.utils.toArray<HTMLElement>(
          '[data-case-section-title]',
          root,
        )

      const words =
        gsap.utils.toArray<HTMLElement>(
          '[data-case-word]',
          root,
        )

      titles.forEach((title) => {
        title.style.opacity = '1'
      })

      words.forEach((word) => {
        word.style.color =
          FINAL_TEXT_COLOR
      })

      return
    }

    let observer: MutationObserver | null = null
    let started = false

    const context = gsap.context(() => {
      const introLines =
        gsap.utils.toArray<HTMLElement>(
          '[data-case-intro-line]',
          root,
        )

      const mainTitle =
        gsap.utils.toArray<HTMLElement>(
          '[data-case-main-title]',
          root,
        )

      const sectionTitles =
        gsap.utils.toArray<HTMLElement>(
          '[data-case-section-title]',
          root,
        )

      const words =
        gsap.utils.toArray<HTMLElement>(
          '[data-case-word]',
          root,
        )

      const rows =
        gsap.utils.toArray<HTMLElement>(
          '[data-case-row]',
          root,
        )

      const divider =
        root.querySelector<HTMLElement>(
          '[data-case-divider]',
        )

      // ======================================
      // INITIAL STATES
      // ======================================

      gsap.set(introLines, {
        clipPath: 'inset(0 100% 0 0)',
        y: 8,
      })

      gsap.set(mainTitle, {
        y: 28,
        opacity: 0,
      })

      gsap.set(sectionTitles, {
        opacity: INITIAL_TITLE_OPACITY,
      })

      gsap.set(words, {
        color: INITIAL_TEXT_COLOR,
      })

      if (divider) {
        gsap.set(divider, {
          scaleX: 0,
          transformOrigin: 'left center',
        })
      }

      // ======================================
      // MASTER TIMELINE
      // ======================================

      const timeline = gsap.timeline({
        paused: true,

        defaults: {
          overwrite: 'auto',
        },

        onComplete: () => {
          gsap.set(introLines, {
            clearProps: 'transform,clipPath',
          })

          gsap.set(mainTitle, {
            clearProps: 'transform,opacity',
          })

          if (divider) {
            gsap.set(divider, {
              clearProps:
                'transform,transformOrigin',
            })
          }
        },
      })

      // ======================================
      // INTRO TEXT
      // ======================================

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

      // ======================================
      // MAIN HEADING
      // ======================================

      timeline.to(
        mainTitle,
        {
          y: 0,
          opacity: 1,
          duration: MOTION.mainTitleDuration,
          ease: 'expo.out',
        },
        0.25,
      )

      // ======================================
      // DIVIDER
      // ======================================

      if (divider) {
        timeline.to(
          divider,
          {
            scaleX: 1,
            duration: MOTION.lineDuration,
            ease: 'power3.inOut',
          },
          0.2,
        )
      }

      // ======================================
      // SEQUENTIAL CONTENT
      // ======================================

      const rowsTimeline =
        gsap.timeline()

      rows.forEach((row) => {
        const title =
          row.querySelector<HTMLElement>(
            '[data-case-section-title]',
          )

        const descriptionWords =
          gsap.utils.toArray<HTMLElement>(
            '[data-case-word]',
            row,
          )

        if (!title) return

        const rowTimeline =
          gsap.timeline()

        rowTimeline.to(
          title,
          {
            opacity: FINAL_TITLE_OPACITY,
            duration:
              MOTION.sectionTitleDuration,
            ease: 'power2.inOut',
          },
          0,
        )

        if (descriptionWords.length > 0) {
          rowTimeline.to(
            descriptionWords,
            {
              color: FINAL_TEXT_COLOR,

              duration: MOTION.wordDuration,

              stagger: {
                each: MOTION.wordStagger,
                from: 'start',
              },

              ease: 'power1.out',
            },
            0,
          )
        }

        rowsTimeline.add(
          rowTimeline,
          '>',
        )

        rowsTimeline.to(
          {},
          {
            duration: MOTION.rowPause,
          },
          '>',
        )
      })

      timeline.add(
        rowsTimeline,
        '+=0.1',
      )

      // ======================================
      // WAIT FOR PRELOADER
      // ======================================

      const start = () => {
        if (
          started ||
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

      observer =
        new MutationObserver(start)

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })

      start()
    }, root)

    return () => {
      observer?.disconnect()
      context.revert()
    }
  }, [rootRef])
}

// ==========================================
// ECO NATURA PAGE
// ==========================================

export default function CaseEcoNatura() {
  const rootRef =
    useRef<HTMLElement>(null)

  const navigate = useNavigate()

  const {
    menuOpen,
    menuButtonRef,
    openMenu,
    closeMenu,
  } = useMobileMenu()

  useChromeIntro(rootRef)
  useCaseIntro(rootRef)

  const goToPortfolio = () => {
    navigate('/portfolio')
    window.scrollTo(0, 0)
  }

  return (
    <section
      ref={rootRef}
      style={stageStyle}
      className="relative min-h-dvh overflow-hidden bg-canvas font-sans text-ink"
    >
      <div
        inert={menuOpen}
        className="relative h-[calc(3258*var(--u))]"
      >
        {/* ====================================
            INTRO LABEL
        ==================================== */}

        <p
          style={{
            left: margin,
          }}
          className="absolute top-[calc(206*var(--u))] text-[calc(18*var(--u))] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-ink capitalize opacity-55"
        >
          <IntroReveal>
            E-Commerce Website
          </IntroReveal>
        </p>

        {/* ====================================
            TOP NEXT CASES
        ==================================== */}

        <div
          style={{
            right: margin,
          }}
          className="absolute top-[calc(198*var(--u))]"
        >
          <CaseCta
            variant="secondary"
            label="next cases"
            onClick={goToPortfolio}
          />
        </div>

        {/* ====================================
            MAIN TITLE
        ==================================== */}

        <h1
          className={`absolute top-[calc(326*var(--u))] ${column} text-[calc(66*var(--u))] leading-[0.95] font-medium tracking-[-0.03em] whitespace-nowrap text-accent capitalize italic`}
        >
          <MainTitleReveal>
            Eco Natura, Store
          </MainTitleReveal>
        </h1>

        {/* ====================================
            SUBTITLE
        ==================================== */}

        <p
          className={`absolute top-[calc(426*var(--u))] ${column} text-[calc(20*var(--u))] leading-[1.1] font-light tracking-[-0.03em] whitespace-nowrap text-ink capitalize italic opacity-75`}
        >
          <IntroReveal>
            Premium Digital Experience For An Eco Product Brand
          </IntroReveal>
        </p>

        {/* ====================================
            DIVIDER
        ==================================== */}

        <div
          data-case-divider
          aria-hidden="true"
          className="absolute top-[calc(507*var(--u))] right-0 left-0 h-px bg-ink/30"
        />

        {/* ====================================
            CHALLENGE / SOLUTION / RESULT
        ==================================== */}

        {sections.map(
          ({
            title,
            top,
            description,
          }) => (
            <div
              key={title}
              data-case-row
            >
              <h2
                style={{
                  top: `calc(${top} * var(--u))`,
                }}
                className={`absolute ${column} text-[calc(34*var(--u))] leading-[0.95] font-light tracking-[-0.03em] whitespace-nowrap text-accent capitalize opacity-70`}
              >
                <SectionTitle>
                  {title}
                </SectionTitle>
              </h2>

              <p
                data-case-description
                style={{
                  top: `calc(${top} * var(--u))`,
                }}
                className="absolute left-[calc(50%+154*var(--u))] w-[calc(330*var(--u))] text-[calc(18*var(--u))] leading-[1.2] font-normal tracking-[-0.02em] text-justify text-ink"
              >
                <PaintWords
                  text={description}
                />
              </p>
            </div>
          ),
        )}

        {/* ====================================
            LARGE 3D CAROUSEL
            WITHOUT BLURRED BACKGROUND
        ==================================== */}

        <div className="absolute top-[calc(1010*var(--u))] right-0 left-0 h-[calc(1080*var(--u))] overflow-hidden bg-canvas">
          <div className="absolute inset-0">
            <Spiral3DSlider
              items={caseImages}
              cardWidth={1000}
              cardAspectRatio={1.5}
              radius={1100}
              autoRotate={true}
              autoSpeed={0.07}
              scrollSensitivity={0.0035}
              smoothing={0.045}
              fov={38}
              ariaLabel="Eco Natura curved project gallery"
            />
          </div>
        </div>

        {/* ====================================
            OUTRO DECORATIVE TEXT
        ==================================== */}

        <p
          aria-hidden="true"
          className={`absolute top-[calc(2316*var(--u))] ${column} text-[calc(128*var(--u))] leading-[0.82] font-medium tracking-[-0.03em] whitespace-nowrap text-accent capitalize italic opacity-10`}
        >
          Nature first.
          <br />
          Conscious choice.
        </p>

        {/* ====================================
            OUTRO HEADING
        ==================================== */}

        <h2
          className={`absolute top-[calc(2666*var(--u))] ${column} w-[calc(523*var(--u))] text-[calc(56*var(--u))] leading-[0.95] font-medium tracking-[-0.03em] text-accent capitalize italic`}
        >
          Build A Brand That Drives Growth
        </h2>

        {/* ====================================
            PRIMARY CTA
        ==================================== */}

        <div className="absolute top-[calc(2864*var(--u))] left-1/2 -translate-x-1/2">
          <CaseCta
            variant="primary"
            label="let`s talk"
          />
        </div>

        {/* ====================================
            BOTTOM NEXT CASES
        ==================================== */}

        <div className="absolute top-[calc(2982*var(--u))] left-1/2 -translate-x-1/2">
          <CaseCta
            variant="secondary"
            label="next cases"
            onClick={goToPortfolio}
          />
        </div>

        {/* ====================================
            EXISTING HEADER
        ==================================== */}

        <AboutHeader
          menuOpen={menuOpen}
          menuButtonRef={menuButtonRef}
          onOpenMenu={openMenu}
        />

        {/* ====================================
            EXISTING FOOTER
        ==================================== */}

        <AboutFooter />
      </div>

      {/* ====================================
          EXISTING MOBILE MENU
        ==================================== */}

      {menuOpen && (
        <MobileMenu onClose={closeMenu} />
      )}
    </section>
  )
}


