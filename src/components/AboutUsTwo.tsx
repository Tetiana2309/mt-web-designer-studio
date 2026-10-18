import { useRef, type CSSProperties } from 'react'
import AboutFooter from './about/AboutFooter'
import AboutHeader from './about/AboutHeader'
import useChromeIntro from './about/useChromeIntro'
import useMobileMenu from './about/useMobileMenu'
import MobileMenu from './MobileMenu'

// --u: one design pixel of the 1920 × 1002 desktop frame (never above 1px).
// --v: one design pixel of the 390 × 844 mobile frame (1px–1.35px).
const stageStyle = {
  '--u': 'min(calc(100vw / 1920), 1px)',
  '--v': 'clamp(1px, calc(100vw / 390), 1.35px)',
} as CSSProperties

const margin = 'clamp(24px,2.0833vw,40px)'
// Same side margins as the mobile / tablet header.
const compactMargin = {
  paddingLeft: 'max(1.25rem,env(safe-area-inset-left))',
  paddingRight: 'max(1.25rem,env(safe-area-inset-right))',
}

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
      className="relative min-h-dvh overflow-hidden bg-canvas font-sans text-ink max-[1280px]:pb-[calc(max(3.75rem,calc(env(safe-area-inset-bottom)+1.5rem))+104px)]"
    >
      <div inert={menuOpen}>
        {/* ============ DESKTOP (>= 1280px) ============ */}
        <div className="hidden min-[1280px]:contents">
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
        </div>

        {/* ============ TABLET (768px – 1279px) ============ */}
        <div className="hidden min-[768px]:max-[1280px]:block">
          <div
            style={compactMargin}
            className="flex justify-between pt-[134px] text-[clamp(16px,1.5625vw,20px)] leading-[1.1] font-light tracking-[-0.03em] whitespace-nowrap text-ink capitalize italic opacity-75"
          >
            {introLabels.map(({ text }) => (
              <p key={text}>{text}</p>
            ))}
          </div>

          <div aria-hidden="true" className="mt-5 h-px bg-ink/30" />

          <ul
            style={compactMargin}
            className="mt-[clamp(40px,5vw,64px)] flex flex-col gap-[clamp(40px,5vw,64px)]"
          >
            {values.map(({ title, description, indicator }) => (
              <li key={title[0]} className="relative grid grid-cols-[48.696%_1fr]">
                <h2 className="text-[clamp(26px,3.2vw,34px)] leading-[0.95] font-light tracking-[-0.03em] whitespace-nowrap text-accent capitalize opacity-70">
                  {title[0]}
                  <br />
                  {title[1]}
                </h2>

                <p className="w-[clamp(280px,38vw,330px)] text-[clamp(16px,1.5vw,18px)] leading-[1.2] font-normal tracking-[-0.02em] text-ink">
                  {description}
                </p>

                <span
                  aria-hidden="true"
                  className={`absolute top-0 right-0 size-3 rounded-full ${indicator}`}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* ============ MOBILE (< 768px) ============ */}
        <div className="min-[768px]:hidden">
          <div style={compactMargin} className="pt-[calc(134*var(--v))]">
            {introLabels.map(({ text }, index) => (
              <p
                key={text}
                className={`text-center text-[calc(16*var(--v))] leading-[1.1] font-light tracking-[-0.03em] text-ink capitalize italic ${index > 0 ? 'mt-[calc(4.4*var(--v))]' : ''}`}
              >
                {text}
              </p>
            ))}
          </div>

          <div aria-hidden="true" className="mt-[calc(17.4*var(--v))] h-px bg-ink/50" />

          <ul
            style={compactMargin}
            className="mt-[calc(18*var(--v))] flex flex-col gap-[calc(19.3*var(--v))]"
          >
            {values.map(({ title, description }) => (
              <li key={title[0]} className="relative">
                <h2 className="text-[calc(26*var(--v))] leading-[0.95] font-light tracking-[-0.03em] whitespace-nowrap text-accent capitalize opacity-70">
                  {title.join(' ')}
                </h2>

                <p className="mt-[calc(10.3*var(--v))] w-[calc(286*var(--v))] max-w-full text-[calc(16*var(--v))] leading-[1.2] font-normal tracking-[-0.02em] text-ink">
                  {description}
                </p>

                <span
                  aria-hidden="true"
                  className="absolute top-[calc(7*var(--v))] right-0 size-3 rounded-full bg-accent/10"
                />
              </li>
            ))}
          </ul>
        </div>

        <AboutHeader menuOpen={menuOpen} menuButtonRef={menuButtonRef} onOpenMenu={openMenu} />
        <AboutFooter />
      </div>

      {menuOpen && <MobileMenu onClose={closeMenu} />}
    </section>
  )
}
