import { socialItems } from '../../navigation'
import TextSwapButton from './TextSwapButton'

const footerPhrases = ['We listen.', 'We think.', 'We deliver.']

// Desktop footer, identical to the Hero footer at >= 1280px.
export default function AboutFooter() {
  return (
    <footer className="absolute right-[max(24px,2.0833vw)] bottom-[clamp(14px,1.0417vw,20px)] left-[clamp(24px,2.0833vw,40px)] flex h-5.5 items-start justify-between font-sans text-[clamp(16px,1.0417vw,20px)] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-ink lowercase">
      {/* COPYRIGHT */}
      <div className="overflow-hidden">
        <p data-hero-copyright>© 2026 All rights reserved.</p>
      </div>

      {/* SLOGAN */}
      <p className="absolute left-[48.696%]">
        {footerPhrases.map((phrase, index) => (
          <span key={phrase} className="inline-block overflow-hidden align-top">
            <span data-hero-slogan-word className="inline-block">
              {phrase}
            </span>

            {index < footerPhrases.length - 1 ? ' ' : null}
          </span>
        ))}
      </p>

      {/* SOCIAL LINKS */}
      <ul className="flex items-center gap-8.5">
        {socialItems.map((item) => (
          <li key={item} data-hero-social-mask className="overflow-hidden">
            <TextSwapButton
              label={item}
              className="nav-link font-sans text-[clamp(16px,1.0417vw,20px)] leading-[1.1] font-medium tracking-[-0.6px] lowercase"
            />
          </li>
        ))}
      </ul>
    </footer>
  )
}
