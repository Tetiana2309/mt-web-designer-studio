import { useRef, type CSSProperties } from 'react'
import AboutFooter from './about/AboutFooter'
import AboutHeader from './about/AboutHeader'
import useChromeIntro from './about/useChromeIntro'
import useMobileMenu from './about/useMobileMenu'
import MobileMenu from './MobileMenu'

const foto1 = `${import.meta.env.BASE_URL}images/foto-1.webp`
const foto2 = `${import.meta.env.BASE_URL}images/foto-2.webp`

// --u: one design pixel of the 1920 × 1002 desktop frame (never above 1px).
// --v: one design pixel of the 390 × 844 mobile frame (1px–1.35px).
const stageStyle = {
  '--u': 'min(calc(100vw / 1920), 1px)',
  '--v': 'clamp(1px, calc(100vw / 390), 1.35px)',
} as CSSProperties

const margin = 'clamp(24px,2.0833vw,40px)'
const mobileMargin = 'max(1.25rem,env(safe-area-inset-left))'
const mobileMarginRight = 'max(1.25rem,env(safe-area-inset-right))'

const gradient1 = 'bg-[linear-gradient(to_bottom,rgba(199,199,199,0)_57.895%,#c7c7c7_91.071%)]'
const gradient2 = 'bg-[linear-gradient(to_bottom,rgba(199,199,199,0)_58%,#c7c7c7_88.393%)]'

function DescriptionOne() {
  return (
    <>
      <span className="text-black">creating thoughtful web solutions at the</span> intersection of{' '}
      <span className="text-accent">strategy </span>and visual culture.
    </>
  )
}

function DescriptionTwo() {
  return (
    <>
      For us, it’s not just about building a website — it’s about shaping a{' '}
      <span className="text-accent">cohesive digital brand presence.</span> We pay close attention
      to details, structure, and user interaction logic.
    </>
  )
}

function DescriptionThree() {
  return (
    <>
      In every project, we value depth,{' '}
      <span className="text-accent">clarity, and responsibility</span> for the final outcome. These
      principles form the foundation of our work.
    </>
  )
}

function Photo({ src, gradient, className }: { src: string; gradient: string; className: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img src={src} alt="" className="absolute size-full max-w-none object-cover" />
      <div className={`absolute inset-0 ${gradient}`} />
    </div>
  )
}

export default function AboutUs() {
  const rootRef = useRef<HTMLElement>(null)
  const { menuOpen, menuButtonRef, openMenu, closeMenu } = useMobileMenu()
  useChromeIntro(rootRef)

  const desktopDescription =
    'absolute w-[calc(339*var(--u))] text-[max(14px,calc(18*var(--u)))] leading-[1.2] font-normal tracking-[-0.02em] text-ink'
  const mobileText =
    'text-[calc(16*var(--v))] leading-[1.2] font-normal tracking-[-0.02em] text-ink'

  return (
    <section
      ref={rootRef}
      style={stageStyle}
      className="relative min-h-dvh overflow-hidden bg-canvas font-sans text-ink max-[1279px]:pb-[calc(max(3.75rem,calc(env(safe-area-inset-bottom)+1.5rem))+calc(90*var(--v)))]"
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

          <p style={{ right: margin }} className={`${desktopDescription} top-[calc(271*var(--u))]`}>
            <DescriptionOne />
          </p>
          <p style={{ right: margin }} className={`${desktopDescription} top-[calc(357*var(--u))]`}>
            <DescriptionTwo />
          </p>
          <p style={{ right: margin }} className={`${desktopDescription} top-[calc(665*var(--u))]`}>
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

        {/* ============ MOBILE (< 1280px) ============ */}
        <div
          style={{ paddingLeft: mobileMargin, paddingRight: mobileMarginRight }}
          className="pt-[calc(134*var(--v))] min-[1280px]:hidden"
        >
          <h1 className="text-[calc(32*var(--v))] leading-[1.1] font-medium tracking-[-0.03em] text-accent">
            M&amp;T Web Design Studio
          </h1>

          <p className={`mt-[calc(39.8*var(--v))] ${mobileText}`}>
            <DescriptionOne />
          </p>
          <p className={`mt-[calc(18.6*var(--v))] ${mobileText}`}>
            <DescriptionTwo />
          </p>

          <div className="mt-[calc(28.2*var(--v))] flex gap-[calc(10*var(--v))]">
            <Photo
              src={foto1}
              gradient={gradient1}
              className="relative aspect-[170/197] min-w-0 flex-1"
            />
            <Photo
              src={foto2}
              gradient={gradient2}
              className="relative aspect-[170/197] min-w-0 flex-1"
            />
          </div>

          <p className={`mt-[calc(30*var(--v))] ${mobileText}`}>
            <DescriptionThree />
          </p>

          <button
            type="button"
            className="mt-[calc(18.4*var(--v))] block text-[calc(18*var(--v))] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-accent lowercase"
          >
            read more
          </button>
        </div>

        <AboutHeader menuOpen={menuOpen} menuButtonRef={menuButtonRef} onOpenMenu={openMenu} />
        <AboutFooter />
      </div>

      {menuOpen && <MobileMenu onClose={closeMenu} />}
    </section>
  )
}
