import { socialItems } from '../../navigation'

const socialLinks: Record<string, string> = {
  telegram: 'https://t.me/mtwebdesignerstudio',
  whatsapp: 'https://wa.me/4915569403496',
  email: 'mailto:tmwebdesigneragency@gmail.com',
}

const footerPhrases = ['We listen.', 'We think.', 'We deliver.']

// Footer identical to the Hero footer: slogan only below 1280px,
// copyright, slogan and social links from 1280px.
export default function AboutFooter() {
  return (
    <footer className="absolute right-[max(1.25rem,env(safe-area-inset-right))] bottom-[40px] left-[max(1.25rem,env(safe-area-inset-left))] flex h-5 items-start justify-between font-sans text-[clamp(18px,2.4vw,20px)] leading-[1.1] font-medium tracking-[-0.03em] whitespace-nowrap text-ink lowercase min-[1280px]:right-[max(24px,2.0833vw)] min-[1280px]:bottom-[20px] min-[1280px]:left-[clamp(24px,2.0833vw,40px)] min-[1280px]:h-5.5 min-[1280px]:text-[clamp(16px,1.0417vw,20px)]">
      {/* COPYRIGHT */}
      <div className="hidden overflow-hidden min-[1280px]:block">
        <p data-hero-copyright>© 2026 All rights reserved.</p>
      </div>

      {/* SLOGAN */}
      <p className="absolute left-1/2 -translate-x-1/2 opacity-85 min-[1280px]:left-[48.696%] min-[1280px]:translate-x-0 min-[1280px]:opacity-100">
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
      <ul className="hidden items-center gap-8.5 min-[1280px]:flex">
        {socialItems.map((item) => (
          <li key={item} data-hero-social-mask className="overflow-hidden">
            <a
              href={socialLinks[item]}
              target={item === 'email' ? undefined : '_blank'}
              rel={item === 'email' ? undefined : 'noopener noreferrer'}
              aria-label={item}
              className="group/swap nav-link relative inline-block cursor-pointer align-top font-sans text-[clamp(16px,1.0417vw,20px)] leading-[1.1] font-medium tracking-[-0.6px] lowercase"
            >
              <span data-hero-link-reveal className="block">
                <span className="relative block overflow-hidden">
                  <span aria-hidden="true" className="block transform-gpu text-ink transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:-translate-y-full group-focus-visible/swap:-translate-y-full">
                    {item}
                  </span>
                  <span aria-hidden="true" className="absolute inset-0 block translate-y-full transform-gpu text-accent transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:translate-y-0 group-focus-visible/swap:translate-y-0">
                    {item}
                  </span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}

