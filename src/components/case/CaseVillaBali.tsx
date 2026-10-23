

import { useRef } from 'react'

import AboutHeader from '../about/AboutHeader'
import AboutFooter from '../about/AboutFooter'
import useChromeIntro from '../about/useChromeIntro'
import useMobileMenu from '../about/useMobileMenu'
import MobileMenu from '../MobileMenu'
import VillaBaliHorizontalStory from './villa-bali/VillaBaliHorizontalStory'

export default function CaseVillaBali() {
  const rootRef = useRef<HTMLElement>(null)

  const {
    menuOpen,
    menuButtonRef,
    openMenu,
    closeMenu,
  } = useMobileMenu()

  useChromeIntro(rootRef)

  const chrome = (
    <>
      <AboutHeader
        menuOpen={menuOpen}
        menuButtonRef={menuButtonRef}
        onOpenMenu={openMenu}
      />
      <AboutFooter />
    </>
  )

  return (
    <section
      ref={rootRef}
      className="relative min-h-dvh overflow-x-clip bg-canvas font-sans text-ink"
    >
      <div className="absolute inset-x-0 top-0 z-40 h-28 min-[900px]:hidden">
        <AboutHeader
          menuOpen={menuOpen}
          menuButtonRef={menuButtonRef}
          onOpenMenu={openMenu}
        />
      </div>

      <div inert={menuOpen}>
        <VillaBaliHorizontalStory chrome={chrome} />

        <div className="relative h-24 min-[900px]:hidden">
          <AboutFooter />
        </div>
      </div>

      {menuOpen && <MobileMenu onClose={closeMenu} />}
    </section>
  )
}
