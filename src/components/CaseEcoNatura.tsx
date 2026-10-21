import { useRef } from 'react'
import { useNavigate } from 'react-router'

import AboutHeader from './about/AboutHeader'
import AboutFooter from './about/AboutFooter'
import useChromeIntro from './about/useChromeIntro'
import useMobileMenu from './about/useMobileMenu'
import MobileMenu from './MobileMenu'
import EcoNaturaHorizontalStory from './case/EcoNaturaHorizontalStory'

export default function CaseEcoNatura() {
  const rootRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()
  const { menuOpen, menuButtonRef, openMenu, closeMenu } = useMobileMenu()

  useChromeIntro(rootRef)

  const chrome = (
    <>
      <AboutHeader menuOpen={menuOpen} menuButtonRef={menuButtonRef} onOpenMenu={openMenu} />
      <AboutFooter />
    </>
  )

  return (
    <section ref={rootRef} className="relative min-h-dvh overflow-x-clip bg-canvas font-sans text-ink">
      <div className="absolute inset-x-0 top-0 z-40 h-28 min-[900px]:hidden"><AboutHeader menuOpen={menuOpen} menuButtonRef={menuButtonRef} onOpenMenu={openMenu} /></div>
      <div inert={menuOpen}>
        <EcoNaturaHorizontalStory chrome={chrome} />

        <div className="mx-auto flex min-h-40 max-w-5xl items-center justify-between gap-6 px-6 py-10 text-accent max-[899px]:flex-col max-[899px]:items-start">
          <button
            type="button"
            onClick={() => {
              navigate('/portfolio')
              window.scrollTo(0, 0)
            }}
            className="cursor-pointer text-lg underline underline-offset-8"
          >
            next cases →
          </button>
          <p className="max-w-lg text-base italic text-ink/80">
            A refined digital experience for Eco Natura.
          </p>
        </div>
        <div className="relative h-24 min-[900px]:hidden"><AboutFooter /></div>
      </div>
      {menuOpen && <MobileMenu onClose={closeMenu} />}
    </section>
  )
}
