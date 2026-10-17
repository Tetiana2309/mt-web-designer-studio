import { useRef, type CSSProperties } from 'react'
import AboutFooter from './about/AboutFooter'
import AboutHeader from './about/AboutHeader'
import useChromeIntro from './about/useChromeIntro'

const foto1 = `${import.meta.env.BASE_URL}images/foto-1.webp`
const foto2 = `${import.meta.env.BASE_URL}images/foto-2.webp`

// One design pixel of the 1920 × 1002 Figma frame; never grows past 1px.
const stageStyle = { '--u': 'min(calc(100vw / 1920), 1px)' } as CSSProperties

const description =
  'absolute right-[clamp(24px,2.0833vw,40px)] w-[calc(339*var(--u))] text-[max(14px,calc(18*var(--u)))] leading-[1.2] font-normal tracking-[-0.02em] text-ink'

const photo =
  'absolute top-[calc(271*var(--u))] h-[calc(532*var(--u))] w-[calc(473*var(--u))] overflow-hidden'

export default function AboutUs() {
  const rootRef = useRef<HTMLElement>(null)
  useChromeIntro(rootRef)

  return (
    <section
      ref={rootRef}
      style={stageStyle}
      className="relative min-h-dvh overflow-hidden bg-canvas font-sans text-ink"
    >
      {/* PHOTOS */}
      <div className={`${photo} left-[clamp(24px,2.0833vw,40px)]`}>
        <img src={foto1} alt="" className="absolute size-full max-w-none object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(199,199,199,0)_57.895%,#c7c7c7_91.071%)]" />
      </div>

      <div className={`${photo} left-[calc(clamp(24px,2.0833vw,40px)+481*var(--u))]`}>
        <img src={foto2} alt="" className="absolute size-full max-w-none object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(199,199,199,0)_58%,#c7c7c7_88.393%)]" />
      </div>

      {/* TITLE */}
      <h1 className="absolute top-[calc(158*var(--u))] right-[clamp(24px,2.0833vw,40px)] text-[calc(66*var(--u))] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-accent">
        M&amp;T Web Design Studio
      </h1>

      {/* DESCRIPTION */}
      <p className={`${description} top-[calc(271*var(--u))]`}>
        <span className="text-black">creating thoughtful web solutions at the</span> intersection of{' '}
        <span className="text-accent">strategy </span>and visual culture.
      </p>

      <p className={`${description} top-[calc(357*var(--u))]`}>
        For us, it’s not just about building a website — it’s about shaping a{' '}
        <span className="text-accent">cohesive digital brand presence.</span> We pay close attention
        to details, structure, and user interaction logic.
      </p>

      <p className={`${description} top-[calc(665*var(--u))]`}>
        In every project, we value depth,{' '}
        <span className="text-accent">clarity, and responsibility</span> for the final outcome.
        These principles form the foundation of our work.
      </p>

      <div className="absolute top-[calc(781*var(--u))] right-[clamp(24px,2.0833vw,40px)] w-[calc(339*var(--u))]">
        <button
          type="button"
          className="text-[max(16px,calc(20*var(--u)))] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-accent lowercase"
        >
          read more
        </button>
      </div>

      <AboutHeader />
      <AboutFooter />
    </section>
  )
}
