import { useRef, type CSSProperties } from 'react'
import { useNavigate } from 'react-router'
import AboutFooter from './about/AboutFooter'
import AboutHeader from './about/AboutHeader'
import useChromeIntro from './about/useChromeIntro'
import useMobileMenu from './about/useMobileMenu'
import CaseCta from './case/CaseCta'
import MobileMenu from './MobileMenu'

const backgroundImage = `${import.meta.env.BASE_URL}images/bg-image-1.webp`

// --u: one design pixel of the 1920 × 3276 desktop frame (never above 1px).
const stageStyle = { '--u': 'min(calc(100vw / 1920), 1px)' } as CSSProperties

// Left edge of the content column (x = 780 in the design).
const column = 'left-[calc(50%-180*var(--u))]'
const margin = 'clamp(24px,2.0833vw,40px)'

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

export default function CaseEcoNatura() {
  const rootRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()
  const { menuOpen, menuButtonRef, openMenu, closeMenu } = useMobileMenu()
  useChromeIntro(rootRef)

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
      <div inert={menuOpen} className="relative h-[calc(3258*var(--u))]">
        {/* ============ INTRO ============ */}
        <p
          style={{ left: margin }}
          className="absolute top-[calc(206*var(--u))] text-[calc(18*var(--u))] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-ink capitalize opacity-55"
        >
          E-Commerce Website
        </p>

        <div style={{ right: margin }} className="absolute top-[calc(198*var(--u))]">
          <CaseCta variant="secondary" label="next cases" onClick={goToPortfolio} />
        </div>

        <h1
          className={`absolute top-[calc(326*var(--u))] ${column} text-[calc(66*var(--u))] leading-[0.95] font-medium tracking-[-0.03em] whitespace-nowrap text-accent capitalize italic`}
        >
          Eco Natura, Store
        </h1>

        <p
          className={`absolute top-[calc(426*var(--u))] ${column} text-[calc(20*var(--u))] leading-[1.1] font-light tracking-[-0.03em] whitespace-nowrap text-ink capitalize italic opacity-75`}
        >
          Premium Digital Experience For An Eco Product Brand
        </p>

        <div
          aria-hidden="true"
          className="absolute top-[calc(507*var(--u))] right-0 left-0 h-px bg-ink/30"
        />

        {sections.map(({ title, top, description }) => (
          <div key={title}>
            <h2
              style={{ top: `calc(${top} * var(--u))` }}
              className={`absolute ${column} text-[calc(34*var(--u))] leading-[0.95] font-light tracking-[-0.03em] whitespace-nowrap text-accent opacity-70`}
            >
              {title}
            </h2>

            <p
              style={{ top: `calc(${top} * var(--u))` }}
              className="absolute left-[calc(50%+154*var(--u))] w-[calc(330*var(--u))] text-[calc(18*var(--u))] leading-[1.2] font-normal tracking-[-0.02em] text-justify text-ink"
            >
              {description}
            </p>
          </div>
        ))}

        {/* ============ BACKGROUND IMAGE ============ */}
        <div className="absolute top-[calc(1010*var(--u))] right-0 left-0 h-[calc(1080*var(--u))]">
          <img
            src={backgroundImage}
            alt="Eco Natura bamboo brushes, olive branches and natural stone on an olive green surface"
            className="absolute size-full max-w-none object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
        </div>

        {/* ============ OUTRO ============ */}
        <p
          aria-hidden="true"
          className={`absolute top-[calc(2316*var(--u))] ${column} text-[calc(128*var(--u))] leading-[0.82] font-medium tracking-[-0.03em] whitespace-nowrap text-accent capitalize italic opacity-10`}
        >
          Nature first.
          <br />
          Conscious choice.
        </p>

        <h2
          className={`absolute top-[calc(2666*var(--u))] ${column} w-[calc(523*var(--u))] text-[calc(56*var(--u))] leading-[0.95] font-medium tracking-[-0.03em] text-accent capitalize italic`}
        >
          Build A Brand That Drives Growth
        </h2>

        <div className="absolute top-[calc(2864*var(--u))] left-1/2 -translate-x-1/2">
          <CaseCta variant="primary" label="discuss the project" />
        </div>

        <div className="absolute top-[calc(2982*var(--u))] left-1/2 -translate-x-1/2">
          <CaseCta variant="secondary" label="next cases" onClick={goToPortfolio} />
        </div>

        <AboutHeader menuOpen={menuOpen} menuButtonRef={menuButtonRef} onOpenMenu={openMenu} />
        <AboutFooter />
      </div>

      {menuOpen && <MobileMenu onClose={closeMenu} />}
    </section>
  )
}
