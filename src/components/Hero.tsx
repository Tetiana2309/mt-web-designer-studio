import arrowIcon from '../assets/icons/arrow.svg'
import underline from '../assets/icons/underline.svg'

const navItems = ['home', 'About us', 'Portfolio', 'Contacts']
const socialItems = ['telegram', 'whatsapp', 'email']

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-canvas font-sans text-ink">
      <header className="absolute top-5 right-10 left-10 flex h-[38px] items-start justify-between">
        <p className="mt-1.5 text-2xl leading-[1.1] font-bold tracking-[-0.72px] text-accent">
          M&amp;T
        </p>

        <nav aria-label="Main" className="absolute top-[9px] left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-7 text-lg leading-[1.1] tracking-[-0.54px] whitespace-nowrap lowercase">
            {navItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </nav>

        <div className="flex w-[208px] flex-col gap-3.5">
          <button
            type="button"
            className="flex w-[208px] items-center gap-16 text-[22px] leading-[1.1] font-bold tracking-[-0.66px] whitespace-nowrap text-accent uppercase"
          >
            Let&apos;s talk
            <img src={arrowIcon} alt="" width={29.5} height={22.1} className="max-w-none" />
          </button>
          <img src={underline} alt="" width={208} height={3} className="-mt-[3px] max-w-none" />
        </div>
      </header>

      <h1 className="absolute top-[calc(50%-226px)] left-[calc(50%-min(542px,28.23vw))] w-[min(1085px,56.5vw)] text-[min(184px,9.583vw)] leading-[0.86] font-medium tracking-[-0.03em]">
        <span className="font-extralight">We create websites that </span>
        <span className="text-accent">drive results.</span>
      </h1>

      <footer className="absolute right-10 bottom-5 left-10 flex h-5 items-start justify-between text-lg leading-[1.1] tracking-[-0.54px] whitespace-nowrap lowercase opacity-85">
        <p>© 2026 All rights reserved.</p>
        <p className="absolute left-[48.696%]">We listen. We think. We deliver.</p>
        <ul className="flex items-center gap-[34px]">
          {socialItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </footer>
    </section>
  )
}
