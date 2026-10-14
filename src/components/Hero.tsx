import arrowIcon from '../assets/icons/arrow.svg'

import InfiniteSpiral from './InfiniteSpiral'

const previewImages = [1, 2, 3, 4, 5].map(
  (n) => `${import.meta.env.BASE_URL}images/Preview%20${n}.webp`,
)

const navItems = ['home', 'about us', 'portfolio', 'contacts']
const socialItems = ['telegram', 'whatsapp', 'email']

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-canvas font-sans text-ink">
      {/* BACKGROUND SPIRAL */}
      <InfiniteSpiral images={previewImages} />

      {/* HEADER */}
      <header className="absolute top-5 right-10 left-10 flex h-9.5 items-start justify-between">
        {/* LOGO */}
        <button
          type="button"
          aria-label="M&T — Home"
          className="nav-link mt-1.5 font-sans text-[24px] leading-[1.1] font-bold tracking-[-0.72px] text-accent!"
        >
          M&amp;T
        </button>

        {/* NAVIGATION */}
        <nav
          aria-label="Main navigation"
          className="absolute top-2.25 left-1/2 -translate-x-1/2"
        >
          <ul className="flex items-center gap-7 whitespace-nowrap">
            {navItems.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  className="nav-link font-sans text-[20px] leading-[1.1] font-medium tracking-[-0.54px] lowercase"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* HEADER CTA */}
        <div className="flex w-52 flex-col items-start gap-3.5">
          <button
            type="button"
            className="cta-button flex w-52 items-center gap-16 whitespace-nowrap text-[22px] leading-[1.1] font-bold tracking-[-0.66px] text-accent uppercase"
          >
            <span className="cta-text shrink-0">
              Let&apos;s talk
            </span>

            <img
              src={arrowIcon}
              alt=""
              width={30}
              height={23}
              className="cta-arrow block shrink-0"
            />
          </button>

          {/* UNDERLINE */}
          <div
            aria-hidden="true"
            className="h-0.75 w-52 shrink-0 bg-accent"
          />
        </div>
      </header>

      {/* HERO TITLE */}
      <h1 className="absolute top-[calc(50%-226px)] left-[calc(50%-min(542px,28.23vw))] w-[min(1085px,56.5vw)] text-[min(184px,9.583vw)] leading-[0.86] tracking-[-0.03em]">
        <span className="font-extralight text-ink">
          We create websites that{' '}
        </span>

        <span className="font-medium text-accent">
          drive results.
        </span>
      </h1>

      {/* FOOTER */}
      <footer className="absolute right-10 bottom-5 left-10 flex h-5.5 items-start justify-between whitespace-nowrap font-sans text-[20px] leading-[1.1] font-medium tracking-[-0.6px] text-ink lowercase">
        <p>© 2026 All rights reserved.</p>

        <p className="absolute left-[48.696%]">
          We listen. We think. We deliver.
        </p>

        <ul className="flex items-center gap-8.5">
          {socialItems.map((item) => (
            <li key={item}>
              <button
                type="button"
                className="nav-link font-sans text-[20px] leading-[1.1] font-medium tracking-[-0.6px] lowercase"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </footer>
    </section>
  )
}
