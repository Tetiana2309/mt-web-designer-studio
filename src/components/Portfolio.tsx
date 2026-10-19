
import { useRef, type CSSProperties } from 'react'

import AboutFooter from './about/AboutFooter'
import AboutHeader from './about/AboutHeader'
import useChromeIntro from './about/useChromeIntro'
import useMobileMenu from './about/useMobileMenu'
import MobileMenu from './MobileMenu'
import DNACarousel from './DNACarousel'

// ==========================================
// RESPONSIVE DESIGN
// ==========================================

const stageStyle = {
  '--u': 'min(calc(100vw / 1920), 1px)',
  '--v': 'clamp(1px, calc(100vw / 390), 1.35px)',
} as CSSProperties

// ==========================================
// PORTFOLIO IMAGES
// ==========================================

const portfolioImages = [1, 2, 3, 4, 5].map(
  (number) => ({
    src: `${import.meta.env.BASE_URL}images/Preview%20${number}.webp`,
    alt: `M&T Studio portfolio project ${number}`,
  }),
)

// ==========================================
// PORTFOLIO PAGE
// ==========================================

export default function Portfolio() {
  const rootRef = useRef<HTMLElement>(null)

  const {
    menuOpen,
    menuButtonRef,
    openMenu,
    closeMenu,
  } = useMobileMenu()

  useChromeIntro(rootRef)

  return (
    <section
      ref={rootRef}
      style={stageStyle}
      className="relative isolate min-h-dvh overflow-x-clip bg-canvas font-sans text-ink"
    >
      <div inert={menuOpen}>
        {/* ====================================
            DESKTOP TITLE
        ==================================== */}

        <div className="hidden min-[1280px]:block">
          <h1
            className="absolute top-[calc(129*var(--u))] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-center"
            style={{
              color: '#3A5F73',
              fontFamily: 'Inter, sans-serif',
              fontSize: '66px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '110%',
              letterSpacing: '-1.98px',
            }}
          >
            Our Portfolio
          </h1>
        </div>

        {/* ====================================
            TABLET TITLE
        ==================================== */}

        <div className="hidden min-[768px]:max-[1279px]:block">
          <h1
            className="absolute top-33.5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-center"
            style={{
              color: '#3A5F73',
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(42px, 5.2vw, 66px)',
              fontWeight: 500,
              lineHeight: '110%',
              letterSpacing: '-0.03em',
            }}
          >
            Our Portfolio
          </h1>
        </div>

        {/* ====================================
            MOBILE TITLE
        ==================================== */}

        <div className="min-[768px]:hidden">
          <h1
            className="absolute top-[calc(134*var(--v))] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-center"
            style={{
              color: '#3A5F73',
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(32px, 9vw, 42px)',
              fontWeight: 500,
              lineHeight: '110%',
              letterSpacing: '-0.03em',
            }}
          >
            Our Portfolio
          </h1>
        </div>

        {/* ====================================
            DNA CAROUSEL
        ==================================== */}

        <div className="absolute inset-x-0 top-[25%] bottom-[13%] min-[1280px]:top-[23%] min-[1280px]:bottom-[13%]">
          <DNACarousel
            images={portfolioImages}
            cardWidth={300}
            cardHeight={300}
            gap={26}
            imageRadius={0}
            curveDepth={170}
            curveHeight={55}
            helixSpread={90}
            perspective={1100}
            activeScale={1}
            inactiveScale={0.78}
            rotation={32}
            tilt={10}
            blur={3}
            chromaticAberration={0}
            inactiveOpacity={0.42}
            dragSensitivity={1.35}
            inertia={0.93}
            snapStrength={0.18}
            autoPlay={true}
            autoSpeed={0.18}
            shadow={true}
            shadowStrength={0.10}
            background="transparent"
            grabCursor={true}
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


