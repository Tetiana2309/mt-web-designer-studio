import { useRef, type CSSProperties } from 'react'
import AboutFooter from './about/AboutFooter'
import AboutHeader from './about/AboutHeader'
import useChromeIntro from './about/useChromeIntro'
import useMobileMenu from './about/useMobileMenu'
import MobileMenu from './MobileMenu'

// --u: one design pixel of the 1920 × 1002 Figma frame (never above 1px).
const stageStyle = { '--u': 'min(calc(100vw / 1920), 1px)' } as CSSProperties

const margin = 'clamp(24px,2.0833vw,40px)'

const introLabels = [
  { text: 'Don`t ask us to just design. ', position: 'left-0' },
  { text: 'The Foundation Of Our Work.', position: 'left-[48.696%]' },
  { text: 'ask us to build a leader.', position: 'left-[87.5%]' },
]

const values = [
  {
    title: ['Results Define', 'Our Work'],
    description:
      'We don’t use templates. Every project begins with clear understanding — of the business, its goals, and its audience.',
    indicator: 'bg-accent/10',
  },
  {
    title: ['Every visit', 'has value'],
    description:
      'People scan and decide in seconds. We design structure and interaction so everything works from the first glance.',
    indicator: 'bg-accent/10',
  },
  {
    title: ['You Pay', 'For Results'],
    description:
      'Clear scope. Defined process. Honest timelines. No hidden layers. No “extra” work later.',
    indicator: 'bg-accent/10',
  },
  {
    title: ['Full', 'Accountability'],
    description:
      'From concept to launch and beyond, we stay involved. We don’t disappear after release.',
    indicator: 'bg-ink/10',
  },
]

export default function AboutUsTwo() {
  const rootRef = useRef<HTMLElement>(null)
  const { menuOpen, menuButtonRef, openMenu, closeMenu } = useMobileMenu()
  useChromeIntro(rootRef)

  return (
    <section
      ref={rootRef}
      style={stageStyle}
      className="relative min-h-dvh overflow-hidden bg-canvas font-sans text-ink"
    >
      <div inert={menuOpen}>
        {/* SECTION INTRO */}
        <div
          style={{ left: margin, right: margin }}
          className="absolute top-[calc(198*var(--u))] h-[calc(42*var(--u))]"
        >
          {introLabels.map(({ text, position }) => (
            <p
              key={text}
              className={`absolute top-0 ${position} text-[max(14px,calc(20*var(--u)))] leading-[1.1] font-light tracking-[-0.03em] whitespace-nowrap text-ink capitalize italic opacity-75`}
            >
              {text}
            </p>
          ))}
        </div>

        {/* DIVIDER */}
        <div
          aria-hidden="true"
          className="absolute top-[calc(239*var(--u))] right-0 left-0 h-px bg-ink/30"
        />

        {/* VALUES LIST */}
        <ul
          style={{ left: margin, right: margin }}
          className="absolute top-[calc(50%+79*var(--u))] flex -translate-y-1/2 flex-col gap-[calc(64*var(--u))]"
        >
          {values.map(({ title, description, indicator }) => (
            <li key={title[0]} className="relative h-[calc(73*var(--u))]">
              <h2 className="absolute top-0 left-0 text-[calc(34*var(--u))] leading-[0.95] font-light tracking-[-0.03em] whitespace-nowrap text-accent capitalize opacity-70">
                {title[0]}
                <br />
                {title[1]}
              </h2>

              <p className="absolute top-0 left-[48.696%] w-[calc(330*var(--u))] text-[max(14px,calc(18*var(--u)))] leading-[1.2] font-normal tracking-[-0.02em] text-ink">
                {description}
              </p>

              <span
                aria-hidden="true"
                className={`absolute top-0 right-0 size-[calc(12*var(--u))] rounded-full ${indicator}`}
              />
            </li>
          ))}
        </ul>

        <AboutHeader menuOpen={menuOpen} menuButtonRef={menuButtonRef} onOpenMenu={openMenu} />
        <AboutFooter />
      </div>

      {menuOpen && <MobileMenu onClose={closeMenu} />}
    </section>
  )
}
