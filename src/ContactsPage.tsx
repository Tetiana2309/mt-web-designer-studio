import { useRef, useState, type FormEvent } from 'react'
import AboutHeader from './components/about/AboutHeader'
import AboutFooter from './components/about/AboutFooter'
import useChromeIntro from './components/about/useChromeIntro'
import useMobileMenu from './components/about/useMobileMenu'
import MobileMenu from './components/MobileMenu'

const types = [
  { name: 'Landing Page', explanation: 'One page to promote your offer.' },
  { name: 'Corporate Website', explanation: 'A website for your business.' },
  { name: 'E-Commerce Store', explanation: 'Sell products online.' },
  { name: 'Custom Website', explanation: 'Something unique, built for you.' },
]
const budgets = ['$800–1k', '$1-3k', '$3-5k', '$5k+']
const inputStyle = 'w-full h-[46px] rounded-[10px] border border-ink/50 bg-transparent px-3 text-[16px] text-ink placeholder:text-ink/50 focus-visible:outline-2 focus-visible:outline-accent'
function SectionTitle({ children }: { children: string }) {
  return <div className="flex items-center justify-between gap-4 min-[1280px]:justify-start min-[1280px]:gap-[110px]">
    <span aria-hidden="true" className="order-2 size-3 shrink-0 rounded-full bg-[#b9bdc0] min-[1280px]:order-1" />
    <h2 className="order-1 text-[26px] font-light leading-[1.1] tracking-[-0.03em] text-accent min-[1280px]:order-2 min-[1280px]:text-[34px]">{children}</h2>
  </div>
}
function Choice({ label, checked, choose }: { label: string; checked: boolean; choose: () => void }) {
  return <button type="button" aria-pressed={checked} onClick={choose}
    className={`h-[46px] w-full cursor-pointer rounded-[10px] border text-[16px] tracking-[-0.03em] transition-colors focus-visible:outline-2 focus-visible:outline-accent ${checked ? 'border-accent bg-accent font-medium text-white' : 'border-ink/60 text-ink hover:border-accent'}`}>{label}</button>
}
export default function ContactsPage() {
  const rootRef = useRef<HTMLElement>(null)
  const { menuOpen, menuButtonRef, openMenu, closeMenu } = useMobileMenu()
  const [projectType, setProjectType] = useState('Landing Page')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  useChromeIntro(rootRef)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('The form is not connected to a delivery service yet. Your request has not been sent.')
  }
  const detail = types.find(type => type.name === projectType)?.explanation

  return <section ref={rootRef} className="relative isolate min-h-dvh overflow-x-clip bg-canvas font-sans text-ink">
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[420px] select-none overflow-hidden text-center text-[min(38vw,650px)] font-semibold leading-none tracking-[-0.1em] text-[#aeb4b7]/40 min-[1280px]:top-[45%]">M&amp;T</div>
    <main className="relative z-10 mx-auto min-h-dvh max-w-[1920px] px-5 pb-[150px] pt-[124px] min-[1280px]:pr-[max(40px,2.6vw)] min-[1280px]:pl-[max(40px,calc(25%+26px))] min-[1280px]:pb-[112px] min-[1280px]:pt-[138px]">
      <form onSubmit={handleSubmit} aria-label="Project enquiry" className="grid gap-y-9 min-[1280px]:grid-cols-[minmax(300px,619px)_minmax(0,755px)] min-[1280px]:gap-y-[55px]">
        <SectionTitle>Project Details</SectionTitle>
        <div>
          <label htmlFor="project-details" className="mb-[14px] block text-[16px] leading-[1.1] min-[1280px]:text-[18px]">“Be precise. What are we building, why does it matter, and what result must it deliver?”</label>
          <textarea id="project-details" name="projectDetails" rows={4} placeholder="Define the project. Goals, structure, deadlines, expectations."
            className={`${inputStyle} h-[168px] resize-y py-[15px] min-[1280px]:h-[112px]`} />
        </div>
        <SectionTitle>Project Type</SectionTitle>
        <fieldset>
          <legend className="mb-[14px] text-[16px] min-[1280px]:text-[18px]">“Tell us what you'd like to build.”</legend>
          <div className="grid grid-cols-2 gap-[18px_17px] min-[1280px]:grid-cols-4 min-[1280px]:gap-x-[40px]">
            {types.map(type => <Choice key={type.name} label={type.name} checked={projectType === type.name} choose={() => setProjectType(type.name)} />)}
          </div>
          <p aria-live="polite" className="mt-3 min-h-5 text-[16px] text-ink/80 min-[1280px]:text-[18px]">{detail}</p>
        </fieldset>
        <SectionTitle>Your Budget</SectionTitle>
        <fieldset>
          <legend className="mb-[14px] text-[16px] min-[1280px]:text-[18px]">“Choose the range that feels right.”</legend>
          <div className="grid grid-cols-2 gap-[18px_17px] min-[1280px]:grid-cols-4 min-[1280px]:gap-x-[40px]">
            {budgets.map(item => <Choice key={item} label={item} checked={budget === item} choose={() => setBudget(item)} />)}
          </div>
        </fieldset>
        <SectionTitle>Contact Details</SectionTitle>
        <div className="grid gap-[20px]">
          <label className="sr-only" htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" autoComplete="name" required placeholder="Enter your name *" className={inputStyle}/>
          <label className="sr-only" htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="Enter your email *" className={inputStyle}/>
          <label className="sr-only" htmlFor="contact-whatsapp">WhatsApp</label>
          <input id="contact-whatsapp" name="whatsapp" type="tel" autoComplete="tel" placeholder="Enter your whatsapp" className={inputStyle}/>
        </div>
        <div className="hidden min-[1280px]:block" />
        <div>
          <button type="submit" className="group flex w-[208px] cursor-pointer flex-col gap-[12px] text-[22px] font-bold leading-[1.1] uppercase tracking-[-0.03em] text-accent focus-visible:outline-2 focus-visible:outline-accent">
            <span className="flex items-center justify-between"><span>Send</span><svg aria-hidden="true" width="30" height="23" viewBox="0 0 30 23" fill="none"><path d="M1 11.5H27M18 2.5L27 11.5L18 20.5" stroke="currentColor" strokeWidth="2"/></svg></span>
            <span aria-hidden="true" className="h-[3px] w-full bg-accent transition-transform duration-300 group-hover:scale-x-90" />
          </button>
          {message && <p role="status" className="mt-4 text-[14px]">{message}</p>}
        </div>
      </form>
    </main>
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[110px] [&_button]:pointer-events-auto">
      <AboutHeader menuOpen={menuOpen} menuButtonRef={menuButtonRef} onOpenMenu={openMenu}/>
    </div>
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[95px] [&_button]:pointer-events-auto">
      <AboutFooter/>
    </div>
    {menuOpen && <MobileMenu onClose={closeMenu}/>}
  </section>
}
