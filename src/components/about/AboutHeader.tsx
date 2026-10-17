import { navItems } from '../../navigation'
import CtaButton from '../CtaButton'
import TextSwapButton from './TextSwapButton'

// Desktop header, identical to the Hero header at >= 1280px.
export default function AboutHeader() {
  return (
    <header className="absolute top-[clamp(14px,1.0417vw,20px)] right-[clamp(24px,2.0833vw,40px)] left-[clamp(24px,2.0833vw,40px)] flex h-9.5 items-start justify-between">
      {/* LOGO */}
      <div className="overflow-hidden">
        <button
          data-hero-logo
          type="button"
          aria-label="M&T — Home"
          className="nav-link mt-1.5 font-sans text-[clamp(20px,1.25vw,24px)] leading-[1.1] font-bold tracking-[-0.03em] text-accent!"
        >
          M&amp;T
        </button>
      </div>

      {/* NAVIGATION */}
      <nav aria-label="Main navigation" className="absolute top-2.25 left-1/2 -translate-x-1/2">
        <ul className="flex items-center gap-7 whitespace-nowrap">
          {navItems.map((item) => (
            <li key={item} data-hero-nav-mask className="overflow-hidden">
              <TextSwapButton
                label={item}
                className="nav-link font-sans text-[clamp(16px,1.0417vw,20px)] leading-[1.1] font-medium tracking-[-0.54px] lowercase"
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* CTA */}
      <div>
        <CtaButton />
      </div>
    </header>
  )
}
