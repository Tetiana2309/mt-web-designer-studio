
import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// ========================================
// M&T WEB DESIGNER STUDIO
// CINEMATIC TYPOGRAPHIC PRELOADER
// ========================================

const BACKGROUND = '#C7C7C7'
const ACCENT = '#3A5F73'

// ----------------------------------------
// DESKTOP — ORIGINAL FIGMA LOGO
// ----------------------------------------

const LOGO_WIDTH = 420
const LOGO_HEIGHT = 220

const FIRST_PART_WIDTH = 312
const SECOND_PART_WIDTH = 134
const PART_OVERLAP = 26

const LOGO_FONT_SIZE = 200
const LOGO_LETTER_SPACING = -6

const SIGNATURE_LEFT = 294
const SIGNATURE_TOP = -38
const SIGNATURE_FONT_SIZE = 20

// ----------------------------------------
// MOBILE — 390PX DESIGN
// ----------------------------------------

const MOBILE_BREAKPOINT = 600

const MOBILE_LOGO_FONT_SIZE = 76
const MOBILE_SIGNATURE_FONT_SIZE = 10

const MOBILE_RATIO =
  MOBILE_LOGO_FONT_SIZE / LOGO_FONT_SIZE

const MOBILE_LOGO_WIDTH =
  LOGO_WIDTH * MOBILE_RATIO

const MOBILE_LOGO_HEIGHT =
  LOGO_HEIGHT * MOBILE_RATIO

const MOBILE_FIRST_PART_WIDTH =
  FIRST_PART_WIDTH * MOBILE_RATIO

const MOBILE_SECOND_PART_WIDTH =
  SECOND_PART_WIDTH * MOBILE_RATIO

const MOBILE_PART_OVERLAP =
  PART_OVERLAP * MOBILE_RATIO

const MOBILE_LOGO_LETTER_SPACING =
  LOGO_LETTER_SPACING * MOBILE_RATIO

const MOBILE_SIGNATURE_LEFT =
  SIGNATURE_LEFT * MOBILE_RATIO

const MOBILE_SIGNATURE_TOP = -24

// ----------------------------------------
// ANIMATION SETTINGS
// ----------------------------------------

const FINAL_ZOOM = 2.4
const MOBILE_FINAL_ZOOM = 1.7

const ROLL_DURATION = 0.9
const ROLL_STAGGER = 0.14

const SIGNATURE_DURATION = 0.55
const SIGNATURE_STAGGER = 0.08

const ZOOM_START = 1.45
const ZOOM_DURATION = 1.9

const FADE_START = 2.35
const FADE_DURATION = 1.25

// ----------------------------------------
// RESPONSIVE CONFIGURATION
// ----------------------------------------

interface LogoConfig {
  width: number
  height: number
  firstPartWidth: number
  secondPartWidth: number
  overlap: number
  fontSize: number
  letterSpacing: number
  signatureLeft: number
  signatureTop: number
  signatureFontSize: number
  signatureLetterSpacing: number
  scale: number
  finalZoom: number
}

function getLogoConfig(): LogoConfig {
  const isMobile =
    typeof window !== 'undefined' &&
    window.innerWidth < MOBILE_BREAKPOINT

  const width = isMobile
    ? MOBILE_LOGO_WIDTH
    : LOGO_WIDTH

  const height = isMobile
    ? MOBILE_LOGO_HEIGHT
    : LOGO_HEIGHT

  let scale = 1

  if (typeof window !== 'undefined') {
    if (isMobile) {
      // Keep the final logo inside the
      // mobile viewport with side spacing.
      const availableWidth = Math.max(
        1,
        window.innerWidth - 48,
      )

      const availableHeight = Math.max(
        1,
        window.innerHeight * 0.55,
      )

      scale = Math.min(
        1,
        availableWidth /
          (width * MOBILE_FINAL_ZOOM),
        availableHeight /
          (height * MOBILE_FINAL_ZOOM),
      )
    } else {
      // Original desktop scaling.
      const availableWidth =
        window.innerWidth - 40

      const availableHeight =
        window.innerHeight * 0.55

      scale = Math.min(
        1,
        availableWidth / LOGO_WIDTH,
        availableHeight / (LOGO_HEIGHT + 80),
      )
    }
  }

  return {
    width,
    height,

    firstPartWidth: isMobile
      ? MOBILE_FIRST_PART_WIDTH
      : FIRST_PART_WIDTH,

    secondPartWidth: isMobile
      ? MOBILE_SECOND_PART_WIDTH
      : SECOND_PART_WIDTH,

    overlap: isMobile
      ? MOBILE_PART_OVERLAP
      : PART_OVERLAP,

    fontSize: isMobile
      ? MOBILE_LOGO_FONT_SIZE
      : LOGO_FONT_SIZE,

    letterSpacing: isMobile
      ? MOBILE_LOGO_LETTER_SPACING
      : LOGO_LETTER_SPACING,

    signatureLeft: isMobile
      ? MOBILE_SIGNATURE_LEFT
      : SIGNATURE_LEFT,

    signatureTop: isMobile
      ? MOBILE_SIGNATURE_TOP
      : SIGNATURE_TOP,

    signatureFontSize: isMobile
      ? MOBILE_SIGNATURE_FONT_SIZE
      : SIGNATURE_FONT_SIZE,

    signatureLetterSpacing: isMobile
      ? -0.3
      : -0.6,

    scale,

    finalZoom: isMobile
      ? MOBILE_FINAL_ZOOM
      : FINAL_ZOOM,
  }
}

// ========================================
// COMPONENT
// ========================================

export default function Preloader() {
  const [finished, setFinished] = useState(false)

  const [config] = useState(getLogoConfig)

  const rootRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef<HTMLDivElement>(null)
  const compositionRef = useRef<HTMLDivElement>(null)

  const partRefs = useRef<(HTMLSpanElement | null)[]>([])
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])

  // ========================================
  // GSAP ANIMATION
  // ========================================

  useLayoutEffect(() => {
    const root = rootRef.current
    const background = backgroundRef.current
    const zoom = zoomRef.current
    const composition = compositionRef.current

    if (!root || !background || !zoom || !composition) {
      return
    }

    const parts = partRefs.current.filter(
      (element): element is HTMLSpanElement =>
        element !== null,
    )

    const words = wordRefs.current.filter(
      (element): element is HTMLSpanElement =>
        element !== null,
    )

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const previousOverflow =
      document.documentElement.style.overflow

    document.documentElement.style.overflow =
      'hidden'

    let cancelled = false

    const finish = () => {
      if (!cancelled) {
        setFinished(true)
      }
    }

    // ------------------------------------
    // REDUCED MOTION
    // ------------------------------------

    if (reducedMotion) {
      const delayed = gsap.delayedCall(0.05, finish)

      return () => {
        cancelled = true
        delayed.kill()

        document.documentElement.style.overflow =
          previousOverflow
      }
    }

    // ------------------------------------
    // INITIAL STATE
    // ------------------------------------

    gsap.set(root, {
      autoAlpha: 1,
    })

    gsap.set(background, {
      autoAlpha: 1,
      backgroundColor: BACKGROUND,
    })

    gsap.set(zoom, {
      scale: 1,
      transformOrigin: '50% 50%',
      force3D: true,
    })

    gsap.set(composition, {
      autoAlpha: 1,
    })

    gsap.set(parts, {
      yPercent: 110,
    })

    gsap.set(words, {
      yPercent: 120,
    })

    // ------------------------------------
    // ANIMATION TIMELINE
    // ------------------------------------

    const timeline = gsap.timeline({
      paused: true,
      onComplete: finish,
    })

    // 01 — M&T ROLLING LETTERS

    timeline.to(
      parts,
      {
        yPercent: 0,
        duration: ROLL_DURATION,
        stagger: ROLL_STAGGER,
        ease: 'power4.out',
      },
      0,
    )

    // 02 — SIGNATURE APPEARS

    timeline.to(
      words,
      {
        yPercent: 0,
        duration: SIGNATURE_DURATION,
        stagger: SIGNATURE_STAGGER,
        ease: 'power3.out',
      },
      0.22,
    )

    // 03 — SOFT CINEMATIC ZOOM

    timeline.to(
      zoom,
      {
        scale: config.finalZoom,
        duration: ZOOM_DURATION,
        ease: 'sine.inOut',
        force3D: true,
      },
      ZOOM_START,
    )

    // 04 — TYPOGRAPHY DISSOLVES

    timeline.to(
      composition,
      {
        autoAlpha: 0,
        duration: FADE_DURATION,
        ease: 'sine.inOut',
      },
      FADE_START,
    )

    // 05 — BACKGROUND REVEALS HERO

    timeline.to(
      background,
      {
        autoAlpha: 0,
        duration: FADE_DURATION,
        ease: 'sine.inOut',
      },
      FADE_START,
    )

    // 06 — ENSURE OVERLAY IS HIDDEN

    timeline.set(
      root,
      {
        autoAlpha: 0,
      },
      FADE_START + FADE_DURATION,
    )

    timeline.play()

    // ------------------------------------
    // CLEANUP
    // ------------------------------------

    return () => {
      cancelled = true

      timeline.kill()

      document.documentElement.style.overflow =
        previousOverflow
    }
  }, [config])

  if (finished) {
    return null
  }

  // ========================================
  // JSX
  // ========================================

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Loading M&T Web Designer Studio"
      className="fixed inset-0 z-100 overflow-hidden"
      style={{
        width: '100%',
        height: '100dvh',
        backgroundColor: 'transparent',
        color: ACCENT,
        fontFamily: 'Inter, sans-serif',
        isolation: 'isolate',
      }}
    >
      {/* SOLID BACKGROUND */}

      <div
        ref={backgroundRef}
        className="absolute inset-0"
        style={{
          backgroundColor: BACKGROUND,
          willChange: 'opacity',
        }}
      />

      {/* CENTERED ZOOM STAGE */}

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={zoomRef}
          style={{
            position: 'relative',
            width: config.width * config.scale,
            height: config.height * config.scale,
            flexShrink: 0,
            transformOrigin: '50% 50%',
            willChange: 'transform',
          }}
        >
          {/* SCALED FIGMA COMPOSITION */}

          <div
            ref={compositionRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: config.width,
              height: config.height,
              transform: `scale(${config.scale})`,
              transformOrigin: 'top left',
              willChange: 'opacity',
            }}
          >
            {/* M&T LOGO */}

            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                alignItems: 'flex-start',
                width: config.width,
                height: config.height,
                whiteSpace: 'nowrap',
                fontFamily: 'Inter, sans-serif',
                fontSize: `${config.fontSize}px`,
                fontWeight: 700,
                lineHeight: '110%',
                letterSpacing: `${config.letterSpacing}px`,
                color: ACCENT,
              }}
            >
              {/* M& */}

              <span
                style={{
                  display: 'block',
                  flexShrink: 0,
                  width: config.firstPartWidth,
                  height: config.height,
                  overflow: 'hidden',
                }}
              >
                <span
                  ref={(element) => {
                    partRefs.current[0] = element
                  }}
                  style={{
                    display: 'block',
                    width: 'max-content',
                    lineHeight: '110%',
                    willChange: 'transform',
                  }}
                >
                  M&amp;
                </span>
              </span>

              {/* T */}

              <span
                style={{
                  display: 'block',
                  flexShrink: 0,
                  width: config.secondPartWidth,
                  height: config.height,
                  marginLeft: -config.overlap,
                  overflow: 'hidden',
                }}
              >
                <span
                  ref={(element) => {
                    partRefs.current[1] = element
                  }}
                  style={{
                    display: 'block',
                    width: 'max-content',
                    lineHeight: '110%',
                    willChange: 'transform',
                  }}
                >
                  T
                </span>
              </span>
            </div>

            {/* WEB DESIGNER STUDIO */}

            <div
              style={{
                position: 'absolute',
                left: `${config.signatureLeft}px`,
                top: `${config.signatureTop}px`,
                fontFamily: 'Inter, sans-serif',
                fontSize: `${config.signatureFontSize}px`,
                fontWeight: 400,
                lineHeight: '110%',
                letterSpacing: `${config.signatureLetterSpacing}px`,
                color: ACCENT,
              }}
            >
              {['web', 'designer', 'studio'].map(
                (word, index) => (
                  <div
                    key={word}
                    style={{
                      overflow: 'hidden',
                    }}
                  >
                    <span
                      ref={(element) => {
                        wordRefs.current[index] = element
                      }}
                      style={{
                        display: 'block',
                        willChange: 'transform',
                      }}
                    >
                      {word}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
