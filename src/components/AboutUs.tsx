
import { useRef, type CSSProperties } from 'react'
import AboutFooter from './about/AboutFooter'
import AboutHeader from './about/AboutHeader'
import useChromeIntro from './about/useChromeIntro'
import useMobileMenu from './about/useMobileMenu'
import MobileMenu from './MobileMenu'

const foto1 = `${import.meta.env.BASE_URL}images/foto-1.webp`
const foto2 = `${import.meta.env.BASE_URL}images/foto-2.webp`

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

function DescriptionOne() {
  return (
    <>
      <span className="text-black">
        creating thoughtful web solutions at the
      </span>{' '}
      intersection of{' '}
      <span className="text-accent">
        strategy{' '}
      </span>
      and visual culture.
    </>
  )
}

function DescriptionTwo() {
  return (
    <>
      For us, it’s not just about building a website — it’s about shaping a{' '}
      <span className="text-accent">
        cohesive digital brand presence.
      </span>{' '}
      We pay close attention to details, structure, and user interaction logic.
    </>
  )
}

function DescriptionThree() {
  return (
    <>
      In every project, we value depth,{' '}
      <span className="text-accent">
        clarity, and responsibility
      </span>{' '}
      for the final outcome. These principles form the foundation of our work.
    </>
  )
}

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
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt=""
        className="absolute size-full max-w-none object-cover"
      />
      <div className={`absolute inset-0 ${gradient}`} />
    </div>
  )
}

export default function AboutUs() {
  const rootRef = useRef<HTMLElement>(null)

  const {
    menuOpen,
    menuButtonRef,
    openMenu,
    closeMenu,
  } = useMobileMenu()

  useChromeIntro(rootRef)

  const desktopDescription =
    'absolute w-[calc(339*var(--u))] text-[max(14px,calc(18*var(--u)))] leading-[1.2] font-normal tracking-[-0.02em] text-ink'

  const mobileText =
    'text-[calc(16*var(--v))] leading-[1.2] font-normal tracking-[-0.02em] text-ink'

  const tabletText =
    'text-[calc(16*var(--t))] leading-[1.2] font-normal tracking-[-0.02em] text-ink'

  return (
    <section
      ref={rootRef}
      style={stageStyle}
      className="relative min-h-dvh overflow-x-clip bg-canvas font-sans text-ink max-[767px]:pb-[calc(max(3.75rem,calc(env(safe-area-inset-bottom)+1.5rem))+calc(90*var(--v)))] min-[768px]:max-[1279px]:min-h-[calc(804*var(--t))]"
    >
      <div inert={menuOpen}>
        {/* ============ DESKTOP (>= 1280px) ============ */}

        <div className="hidden min-[1280px]:contents">
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
            style={{ right: margin }}
            className="absolute top-[calc(158*var(--u))] text-[calc(66*var(--u))] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-accent"
          >
            M&amp;T Web Design Studio
          </h1>

          <p
            style={{ right: margin }}
            className={`${desktopDescription} top-[calc(271*var(--u))]`}
          >
            <DescriptionOne />
          </p>

          <p
            style={{ right: margin }}
            className={`${desktopDescription} top-[calc(357*var(--u))]`}
          >
            <DescriptionTwo />
          </p>

          <p
            style={{ right: margin }}
            className={`${desktopDescription} top-[calc(665*var(--u))]`}
          >
            <DescriptionThree />
          </p>

          <div
            style={{ right: margin }}
            className="absolute top-[calc(781*var(--u))] w-[calc(339*var(--u))]"
          >
            <button
              type="button"
              className="text-[max(16px,calc(20*var(--u)))] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-accent lowercase"
            >
              read more
            </button>
          </div>
        </div>

        {/* ============ TABLET (768px - 1279px) ============ */}

        <div className="hidden min-[768px]:max-[1279px]:block">
          {/* HEADING */}

          <h1 className="absolute top-[calc(141*var(--t))] right-[calc(20*var(--t))] text-[calc(42*var(--t))] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-accent">
            M&amp;T Web Design Studio
          </h1>

          {/* FIRST DESCRIPTION */}

          <p
            className={`absolute top-[calc(220*var(--t))] right-[calc(20*var(--t))] w-[calc(252*var(--t))] ${tabletText}`}
          >
            <DescriptionOne />
          </p>

          {/* SECOND DESCRIPTION */}

          <p
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
            className={`absolute top-[calc(552*var(--t))] right-[calc(20*var(--t))] w-[calc(252*var(--t))] ${tabletText}`}
          >
            <DescriptionThree />
          </p>

          {/* READ MORE */}

          <button
            type="button"
            className="absolute top-[calc(655*var(--t))] right-[calc(189*var(--t))] text-[calc(16*var(--t))] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-accent lowercase"
          >
            read more
          </button>
        </div>

        {/* ============ MOBILE (< 768px) ============ */}

        <div
          style={{
            paddingLeft: mobileMargin,
            paddingRight: mobileMarginRight,
          }}
          className="pt-[calc(134*var(--v))] min-[768px]:hidden"
        >
          {/* TITLE */}

          <h1 className="text-[calc(32*var(--v))] leading-[1.1] font-medium tracking-[-0.03em] text-accent">
            M&amp;T Web Design Studio
          </h1>

          {/* FIRST TEXT — 40px */}

          <p className={`mt-[calc(40*var(--v))] ${mobileText}`}>
            <DescriptionOne />
          </p>

          {/* SECOND TEXT — 20px */}

          <p className={`mt-[calc(20*var(--v))] ${mobileText}`}>
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

          <p className={`mt-[calc(30*var(--v))] ${mobileText}`}>
            <DescriptionThree />
          </p>

          {/* READ MORE — 20px */}

          <button
            type="button"
            className="mt-[calc(20*var(--v))] block text-[calc(18*var(--v))] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-accent lowercase"
          >
            read more
          </button>
        </div>

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
