
import { Fragment, useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import gsap from 'gsap'

import AboutHeader from './components/about/AboutHeader'
import AboutFooter from './components/about/AboutFooter'
import useChromeIntro from './components/about/useChromeIntro'
import useMobileMenu from './components/about/useMobileMenu'
import MobileMenu from './components/MobileMenu'

// ==========================================
// PROJECT TYPES
// ==========================================

const types = [
  {
    name: 'Landing Page',
    explanation: 'One page to promote your offer.',
  },
  {
    name: 'Corporate Website',
    explanation: 'A website for your business.',
  },
  {
    name: 'E-Commerce Store',
    explanation: 'Sell products online.',
  },
  {
    name: 'Custom Website',
    explanation: 'Something unique, built for you.',
  },
]

const budgets = ['$800–1k', '$1-3k', '$3-5k', '$5k+']

// Web3Forms access keys are intended for use in client-side forms.
const WEB3FORMS_ACCESS_KEY = '3919c149-68a1-499d-a576-05ff28c9913e'

// ==========================================
// SHARED INPUT STYLES
// ==========================================

const inputStyle =
  'box-border w-full h-[46px] rounded-[10px] border-[0.8px] border-ink/50 bg-transparent px-3 text-[16px] text-ink placeholder:text-ink/50 outline-none ring-0 shadow-none transition-[border-color,border-width] duration-300 ease-in-out focus:border-[1.2px] focus:border-[#3A5F73] focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:shadow-none'

// ==========================================
// BACKGROUND M&T SVG
// ==========================================

function ContactsBackgroundLogo() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[588px] z-0 hidden overflow-hidden leading-none min-[768px]:block"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1920"
        height="523"
        viewBox="0 0 1920 523"
        fill="none"
        className="block h-auto w-full min-w-[390px]"
        preserveAspectRatio="xMidYMax meet"
      >
        <g opacity="0.06">
          <path
            d="M0 6.70831H178.316L366.65 348.584H374.664L562.998 6.70831H741.314V515.546H601.065V184.354H595.389L418.408 513.062H322.906L145.925 183.112H140.249V515.546H0V6.70831Z"
            fill="#3A5F73"
          />

          <path
            d="M1039.27 523C992.071 523 951.332 516.706 917.049 504.117C882.766 491.529 856.386 474.468 837.909 452.935C819.654 431.237 810.527 407.054 810.527 380.386C810.527 360.51 815.87 342.869 826.555 327.465C837.241 312.061 852.156 297.899 871.301 284.979C890.446 271.894 912.708 258.891 938.086 245.971L1070.65 181.124C1087.8 173.008 1100.37 164.478 1108.39 155.533C1116.4 146.423 1120.41 136.568 1120.41 125.967C1120.41 115.863 1114.96 106.505 1104.05 97.8917C1093.14 89.2785 1077.67 85.0548 1057.63 85.2204C1044.27 85.2204 1032.7 87.4565 1022.9 91.9287C1013.11 96.2353 1005.43 101.95 999.862 109.072C994.52 116.029 991.848 123.814 991.848 132.427C991.848 143.028 995.855 153.794 1003.87 164.726C1011.88 175.658 1022.57 187.253 1035.93 199.51C1049.28 211.602 1063.86 224.687 1079.67 238.766L1403.91 515.546H1255.65L985.17 291.439C967.36 276.366 949.551 260.63 931.742 244.232C914.155 227.669 899.462 210.111 887.664 191.56C875.865 172.843 869.965 152.552 869.965 130.688C869.965 106.008 877.646 83.8125 893.006 64.1017C908.589 44.3908 930.406 28.8209 958.456 17.3919C986.505 5.7973 1019.23 0 1056.63 0C1093.14 0 1124.64 5.54885 1151.13 16.6466C1177.84 27.5786 1198.33 42.1547 1212.57 60.3748C1227.04 78.4293 1234.28 98.3058 1234.28 120.004C1234.28 144.022 1226.26 165.803 1210.24 185.348C1194.43 204.728 1172.17 222.12 1143.45 237.524L1003.87 312.309C984.947 322.579 970.922 333.097 961.795 343.863C952.89 354.464 948.438 364.651 948.438 374.423C948.438 386.515 952.445 397.364 960.459 406.971C968.473 416.578 979.827 424.197 994.52 429.829C1009.21 435.295 1026.47 438.028 1046.28 438.028C1070.32 438.028 1094.03 433.97 1117.4 425.854C1141 417.572 1162.37 405.894 1181.52 390.821C1200.89 375.583 1216.36 357.528 1227.93 336.658C1239.51 315.788 1245.3 292.681 1245.3 267.339H1363.17C1363.17 298.479 1358.61 326.554 1349.48 351.565C1340.35 376.411 1327.67 398.109 1311.41 416.661C1295.16 435.047 1276.58 450.12 1255.65 461.88C1248.97 465.027 1242.51 468.008 1236.28 470.824C1230.05 473.64 1223.59 476.622 1216.91 479.769C1191.54 495.007 1163.15 506.022 1131.76 512.813C1100.6 519.604 1069.76 523 1039.27 523Z"
            fill="#3A5F73"
          />

          <path
            d="M1358.34 95.4071V6.70831H1920V95.4071H1710.63V515.546H1567.71V95.4071H1358.34Z"
            fill="#3A5F73"
          />
        </g>
      </svg>
    </div>
  )
}

// ==========================================
// SECTION TITLE
// ==========================================

function SectionTitle({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
  return (
    <div className={`flex items-center justify-between gap-4 self-start min-[1280px]:grid min-[1280px]:grid-cols-[12px_minmax(0,1fr)] min-[1280px]:items-center min-[1280px]:justify-start min-[1280px]:gap-x-[110px] ${className}`} >
      <span
        aria-hidden="true"
        data-contact-dot
        style={{ opacity: 0.14 }}
        className="order-2 block size-3 shrink-0 rounded-full bg-accent min-[1280px]:order-1"
      />

      <h2 data-contact-title style={{ opacity: 0.25 }} className="order-1 m-0 text-[26px] font-normal leading-[1.1] tracking-[-0.03em] text-accent min-[1280px]:order-2 min-[1280px]:text-[34px]">
        {children}
      </h2>
    </div>
  )
}

// ==========================================
// WORD PAINT — SAME AS ABOUT US TWO
// ==========================================

function PaintWords({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          {index > 0 ? ' ' : null}
          <span data-contact-word style={{ color: '#B5B5B5' }}>{word}</span>
        </Fragment>
      ))}
    </>
  )
}

// ==========================================
// SELECTION BUTTON
// ==========================================

function Choice({
  label,
  checked,
  choose,
}: {
  label: string
  checked: boolean
  choose: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={choose}
      className={`group/choice relative isolate h-[46px] w-full min-w-0 cursor-pointer overflow-hidden rounded-[10px] border bg-transparent text-[16px] font-normal tracking-[-0.03em] outline-none transition-[border-color] duration-700 ease-[cubic-bezier(0.645,0.045,0.355,1)] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none ${
        checked ? 'border-accent' : 'border-ink/60'
      }`}
    >
      {/* The blue layer travels up on selection, and down when unselected. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 origin-bottom rounded-[9px] bg-accent transition-transform duration-700 ease-[cubic-bezier(0.645,0.045,0.355,1)] motion-reduce:transition-none ${
          checked ? 'translate-y-0' : 'translate-y-full'
        }`}
      />
      <span
        className={`relative z-10 inline-block transition-colors duration-700 ease-[cubic-bezier(0.645,0.045,0.355,1)] motion-reduce:transition-none ${
          checked
            ? 'text-white'
            : 'text-ink'
        }`}
      >
        {label}
      </span>
    </button>
  )
}

// ==========================================
// PROJECT TYPE HINT — SOFT CHARACTER REVEAL
// ==========================================

function ProjectTypeHint({ text }: { text: string }) {
  const rootRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const letters = gsap.utils.toArray<HTMLSpanElement>(
      '[data-contact-hint-letter]',
      root,
    )
    if (!letters.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(letters, { opacity: 1, clearProps: 'filter' })
      return
    }

    // All glyphs reserve their final space from the start, so no layout jumps.
    gsap.set(letters, { opacity: 0 })

    const tween = gsap.to(letters, {
      opacity: 1,
      duration: 0.34,
      stagger: 0.032,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    return () => {
      tween.kill()
    }
  }, [text])

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="mt-3 min-h-[24px] text-[16px] leading-[24px] text-ink/80 min-[1280px]:text-[18px]"
    >
      <span ref={rootRef} key={text}>
        {Array.from(text).map((character, index) => (
          <span
            key={`${text}-${index}`}
            data-contact-hint-letter
            aria-hidden="true"
            className="inline"
          >
            {character}
          </span>
        ))}
        <span className="sr-only">{text}</span>
      </span>
    </div>
  )
}

// ==========================================
// SEND BUTTON — SAME HOVER / FOCUS SWAP AS CTA
// ==========================================

function SendButton({ disabled = false }: { disabled?: boolean }) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const button = buttonRef.current
    const text = textRef.current
    const arrow = arrowRef.current
    if (!button || !text || !arrow) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let hovered = false
    let focused = false

    const timeline = gsap.timeline({
      paused: true,
      defaults: { duration: 0.95, ease: 'power2.inOut' },
    })

    // Text goes to the right; arrow goes to the left.
    timeline.to(text, {
      x: () => button.clientWidth - text.offsetWidth - text.offsetLeft,
    }, 0)
    timeline.to(arrow, { x: () => -arrow.offsetLeft }, 0)

    const update = () => {
      const active = hovered || focused
      if (motion.matches) {
        timeline.progress(active ? 1 : 0).pause()
      } else if (active) {
        timeline.play()
      } else {
        timeline.reverse()
      }
    }
    const enter = () => { hovered = true; update() }
    const leave = () => { hovered = false; update() }
    const focus = () => { focused = true; update() }
    const blur = () => { focused = false; update() }
    const resizeObserver = new ResizeObserver(() => {
      const progress = timeline.progress()
      timeline.invalidate().progress(progress).pause()
      update()
    })

    button.addEventListener('pointerenter', enter)
    button.addEventListener('pointerleave', leave)
    button.addEventListener('focus', focus)
    button.addEventListener('blur', blur)
    motion.addEventListener('change', update)
    resizeObserver.observe(button)

    return () => {
      resizeObserver.disconnect()
      button.removeEventListener('pointerenter', enter)
      button.removeEventListener('pointerleave', leave)
      button.removeEventListener('focus', focus)
      button.removeEventListener('blur', blur)
      motion.removeEventListener('change', update)
      timeline.kill()
    }
  }, [])

  return (
    <div className="flex w-[208px] flex-col gap-[14px]">
      <button
        ref={buttonRef}
        type="submit"
        disabled={disabled}
        aria-disabled={disabled}
        className="relative flex h-[25px] w-[208px] cursor-pointer items-center justify-between text-[22px] font-bold leading-[1.1] tracking-[-0.03em] text-accent uppercase focus-visible:outline-2 focus-visible:outline-accent"
      >
        <span ref={textRef} className="block shrink-0">Send</span>
        <span ref={arrowRef} className="flex h-[23px] w-[30px] shrink-0 items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="30" height="23" viewBox="0 0 30 23" fill="none" className="block h-[23px] w-[30px]">
            <path d="M0 11.046L0 12.546L28 12.546V11.046V9.54596L0 9.54596L0 11.046ZM29.0607 12.1066C29.6464 11.5208 29.6464 10.5711 29.0607 9.9853L19.5147 0.439358C18.9289 -0.146429 17.9792 -0.146429 17.3934 0.439358C16.8076 1.02514 16.8076 1.97489 17.3934 2.56068L25.8787 11.046L17.3934 19.5312C16.8076 20.117 16.8076 21.0668 17.3934 21.6526C17.9792 22.2383 18.9289 22.2383 19.5147 21.6526L29.0607 12.1066Z" fill="#3A5F73" />
          </svg>
        </span>
      </button>
      <span aria-hidden="true" className="h-[3px] w-[208px] bg-accent" />
    </div>
  )
}

// ==========================================
// CONTACTS PAGE
// ==========================================

export default function ContactsPage() {
  const rootRef = useRef<HTMLElement>(null)

  const {
    menuOpen,
    menuButtonRef,
    openMenu,
    closeMenu,
  } = useMobileMenu()

  const [projectType, setProjectType] =
    useState('')

  const [budget, setBudget] = useState('')

  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useChromeIntro(rootRef)

  // ========================================
  // ABOUT US TWO EDITORIAL SEQUENCE
  // ========================================

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const form = root.querySelector<HTMLFormElement>('[data-contact-form]')
    if (!form) return

    const rows = Array.from(form.querySelectorAll<HTMLElement>('[data-contact-section]'))
    const send = form.querySelector<HTMLElement>('[data-contact-send]')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      form.querySelectorAll<HTMLElement>('[data-contact-title]').forEach(node => { node.style.opacity = '1' })
      form.querySelectorAll<HTMLElement>('[data-contact-dot]').forEach(node => { node.style.opacity = '0.5' })
      form.querySelectorAll<HTMLElement>('[data-contact-word]').forEach(node => { node.style.color = '#3c3a36' })
      return
    }

    let observer: MutationObserver | null = null
    let started = false
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ paused: true })

      rows.forEach((row, index) => {
        const title = row.querySelector<HTMLElement>('[data-contact-title]')
        const dot = row.querySelector<HTMLElement>('[data-contact-dot]')
        const words = gsap.utils.toArray<HTMLElement>('[data-contact-word]', row)
        const fields = row.querySelector<HTMLElement>('[data-contact-fields]')

        // Titles and dots are visible from the beginning, without moving.
        if (title) gsap.set(title, { opacity: 0.25 })
        if (dot) gsap.set(dot, { opacity: 0.14 })
        gsap.set(words, { color: '#B5B5B5' })
        if (fields) gsap.set(fields, { opacity: 0.45 })

        const rowTimeline = gsap.timeline()
        if (title) rowTimeline.to(title, { opacity: 1, duration: 0.8, ease: 'power2.inOut' }, 0)
        if (dot) rowTimeline.to(dot, { opacity: 0.5, duration: 0.65, ease: 'power2.out' }, 0)
        if (words.length) rowTimeline.to(words, {
          color: '#3c3a36', duration: 0.24, stagger: 0.018, ease: 'power1.out',
        }, 0)
        if (fields) rowTimeline.to(fields, { opacity: 1, duration: 0.65, ease: 'power2.out' }, 0.14)

        // One section finishes before the next starts.
        timeline.add(rowTimeline, index === 0 ? 0 : '>')
        timeline.to({}, { duration: 0.16 }, '>')
      })

      if (send) {
        gsap.set(send, { opacity: 0.4 })
        timeline.to(send, { opacity: 1, duration: 0.7, ease: 'power2.out' }, '>')
      }

      const start = () => {
        if (started) return
        if (document.querySelector('[role="status"][aria-label="Loading M&T Web Designer Studio"]')) return
        started = true
        observer?.disconnect()
        timeline.play(0)
      }

      observer = new MutationObserver(start)
      observer.observe(document.body, { childList: true, subtree: true })
      start()
    }, form)

    return () => { observer?.disconnect(); context.revert() }
  }, [])

  // ========================================
  // FORM SUBMISSION
  // ========================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()
    if (isSubmitting) return

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.set('access_key', WEB3FORMS_ACCESS_KEY)
    formData.set('subject', 'New project enquiry — M&T Web Designer Studio')
    formData.set('from_name', 'M&T Web Designer Studio website')
    formData.set('projectType', projectType || 'Not selected')
    formData.set('budget', budget || 'Not selected')

    setIsSubmitting(true)
    setMessage('Sending your enquiry...')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data: { success?: boolean; message?: string } = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to send your enquiry.')
      }

      form.reset()
      setProjectType('')
      setBudget('')
      setMessage('Thank you! Your enquiry has been sent successfully.')
    } catch {
      setMessage('Your enquiry could not be sent. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const detail = types.find(
    (type) => type.name === projectType,
  )?.explanation

  return (
    <section
      ref={rootRef}
      className="relative isolate min-h-dvh overflow-hidden bg-canvas font-sans text-ink min-[1280px]:min-h-[1002px]"
    >
      {/* ====================================
          ORIGINAL M&T BACKGROUND SVG
      ==================================== */}

      {/* Keep browser autofill from changing the original canvas-colored inputs. */}
      <style>{`
        [data-contact-form] input:-webkit-autofill,
        [data-contact-form] input:-webkit-autofill:hover,
        [data-contact-form] input:-webkit-autofill:focus,
        [data-contact-form] input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px #c7c7c7 inset !important;
          box-shadow: 0 0 0 1000px #c7c7c7 inset !important;
          -webkit-text-fill-color: #3c3a36 !important;
          caret-color: #3c3a36;
          transition: background-color 9999s ease-out 0s;
        }
      `}</style>

      <ContactsBackgroundLogo />

      {/* Mobile M&T monogram: the original vector letterforms, cropped and
          stacked like the Figma artwork. Desktop keeps the horizontal logo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[calc(min(100vw,440px)*0.795)] left-1/2 z-0 flex w-full max-w-[440px] -translate-x-1/2 flex-col overflow-hidden min-[768px]:hidden"
        style={{ opacity: 0.06 }}
      >
        <svg viewBox="0 0 741.314 523" preserveAspectRatio="none" className="block h-[calc(min(100vw,440px)*0.99)] w-full shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 6.70831H178.316L366.65 348.584H374.664L562.998 6.70831H741.314V515.546H601.065V184.354H595.389L418.408 513.062H322.906L145.925 183.112H140.249V515.546H0V6.70831Z" fill="#3A5F73" /></svg>
        <svg viewBox="810 0 594 523" preserveAspectRatio="none" className="block h-[calc(min(100vw,440px)*0.99)] w-full shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1039.27 523C992.071 523 951.332 516.706 917.049 504.117C882.766 491.529 856.386 474.468 837.909 452.935C819.654 431.237 810.527 407.054 810.527 380.386C810.527 360.51 815.87 342.869 826.555 327.465C837.241 312.061 852.156 297.899 871.301 284.979C890.446 271.894 912.708 258.891 938.086 245.971L1070.65 181.124C1087.8 173.008 1100.37 164.478 1108.39 155.533C1116.4 146.423 1120.41 136.568 1120.41 125.967C1120.41 115.863 1114.96 106.505 1104.05 97.8917C1093.14 89.2785 1077.67 85.0548 1057.63 85.2204C1044.27 85.2204 1032.7 87.4565 1022.9 91.9287C1013.11 96.2353 1005.43 101.95 999.862 109.072C994.52 116.029 991.848 123.814 991.848 132.427C991.848 143.028 995.855 153.794 1003.87 164.726C1011.88 175.658 1022.57 187.253 1035.93 199.51C1049.28 211.602 1063.86 224.687 1079.67 238.766L1403.91 515.546H1255.65L985.17 291.439C967.36 276.366 949.551 260.63 931.742 244.232C914.155 227.669 899.462 210.111 887.664 191.56C875.865 172.843 869.965 152.552 869.965 130.688C869.965 106.008 877.646 83.8125 893.006 64.1017C908.589 44.3908 930.406 28.8209 958.456 17.3919C986.505 5.7973 1019.23 0 1056.63 0C1093.14 0 1124.64 5.54885 1151.13 16.6466C1177.84 27.5786 1198.33 42.1547 1212.57 60.3748C1227.04 78.4293 1234.28 98.3058 1234.28 120.004C1234.28 144.022 1226.26 165.803 1210.24 185.348C1194.43 204.728 1172.17 222.12 1143.45 237.524L1003.87 312.309C984.947 322.579 970.922 333.097 961.795 343.863C952.89 354.464 948.438 364.651 948.438 374.423C948.438 386.515 952.445 397.364 960.459 406.971C968.473 416.578 979.827 424.197 994.52 429.829C1009.21 435.295 1026.47 438.028 1046.28 438.028C1070.32 438.028 1094.03 433.97 1117.4 425.854C1141 417.572 1162.37 405.894 1181.52 390.821C1200.89 375.583 1216.36 357.528 1227.93 336.658C1239.51 315.788 1245.3 292.681 1245.3 267.339H1363.17C1363.17 298.479 1358.61 326.554 1349.48 351.565C1340.35 376.411 1327.67 398.109 1311.41 416.661C1295.16 435.047 1276.58 450.12 1255.65 461.88C1248.97 465.027 1242.51 468.008 1236.28 470.824C1230.05 473.64 1223.59 476.622 1216.91 479.769C1191.54 495.007 1163.15 506.022 1131.76 512.813C1100.6 519.604 1069.76 523 1039.27 523Z" fill="#3A5F73" /></svg>
        <svg viewBox="1358 0 562 523" preserveAspectRatio="none" className="block h-[calc(min(100vw,440px)*0.99)] w-full shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1358.34 95.4071V6.70831H1920V95.4071H1710.63V515.546H1567.71V95.4071H1358.34Z" fill="#3A5F73" /></svg>
      </div>

      {/* ====================================
          CONTACT FORM
      ==================================== */}

      <main className="relative z-10 mx-auto min-h-dvh max-w-[1920px] px-5 pb-[150px] pt-[124px] min-[1280px]:min-h-[1002px] min-[1280px]:pl-[max(40px,calc(25%+26px))] min-[1280px]:pr-[40px] min-[1280px]:pt-[138px] min-[1280px]:pb-[108px]">
        <form
          onSubmit={handleSubmit}
          aria-label="Project enquiry"
          data-contact-form
          className="flex w-full flex-col gap-y-[60px] min-[1280px]:gap-y-[60px] "
        >
          {/* PROJECT DETAILS */}
          <div data-contact-section className="grid items-start gap-y-6 min-[1280px]:grid-cols-[minmax(0,619px)_minmax(0,755px)] min-[1280px]:gap-x-0">
            <SectionTitle>Project Details</SectionTitle>
            <div data-contact-content>
              <label
                htmlFor="project-details"
                className="mb-[14px] block text-[16px] leading-[1.1] min-[1280px]:text-[18px]"
              >
                <PaintWords text="“Be precise. What are we building, why does it matter, and what result must it deliver?”" />
              </label>
              <textarea
                data-contact-fields
                id="project-details"
                name="projectDetails"
                rows={4}
                placeholder="Define the project. Goals, structure, deadlines, expectations."
                className={`${inputStyle} h-[168px] resize-y py-[15px] min-[1280px]:h-[112px]`}
              />
            </div>
          </div>

          {/* PROJECT TYPE */}
          <div data-contact-section className="grid items-start gap-y-6 min-[1280px]:grid-cols-[minmax(0,619px)_minmax(0,755px)] min-[1280px]:gap-x-0">
            <SectionTitle>Project Type</SectionTitle>
            <fieldset data-contact-content className="min-w-0">
              <legend className="mb-[14px] text-[16px] min-[1280px]:text-[18px]">
                <PaintWords text="“Tell us what you'd like to build.”" />
              </legend>
              <div data-contact-fields className="grid grid-cols-2 gap-[18px_17px] min-[1280px]:grid-cols-[repeat(4,minmax(0,168px))] min-[1280px]:justify-between min-[1280px]:gap-x-0">
                {types.map((type) => (
                  <Choice
                    key={type.name}
                    label={type.name}
                    checked={projectType === type.name}
                    choose={() => setProjectType(type.name)}
                  />
                ))}
              </div>
              <ProjectTypeHint text={detail ?? ''} />
            </fieldset>
          </div>

          {/* YOUR BUDGET */}
          <div data-contact-section className="grid items-start gap-y-6 min-[1280px]:grid-cols-[minmax(0,619px)_minmax(0,755px)] min-[1280px]:gap-x-0">
            <SectionTitle>Your Budget</SectionTitle>
            <fieldset data-contact-content className="min-w-0">
              <legend className="mb-[14px] text-[16px] min-[1280px]:text-[18px]">
                <PaintWords text="“Choose the range that feels right.”" />
              </legend>
              <div data-contact-fields className="grid grid-cols-2 gap-[18px_17px] min-[1280px]:grid-cols-4 min-[1280px]:gap-x-[40px]">
                {budgets.map((item) => (
                  <Choice
                    key={item}
                    label={item}
                    checked={budget === item}
                    choose={() => setBudget(item)}
                  />
                ))}
              </div>
            </fieldset>
          </div>

          {/* CONTACT DETAILS */}
          <div data-contact-section className="grid items-start gap-y-6 min-[1280px]:grid-cols-[minmax(0,619px)_minmax(0,755px)] min-[1280px]:gap-x-0">
            <SectionTitle>Contact Details</SectionTitle>
            <div data-contact-content data-contact-fields className="grid gap-[20px]">
              <label className="sr-only" htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                placeholder="Enter your name *"
                className={inputStyle}
              />
              <label className="sr-only" htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email *"
                className={inputStyle}
              />
              <label className="sr-only" htmlFor="contact-whatsapp">WhatsApp</label>
              <input
                id="contact-whatsapp"
                name="whatsapp"
                type="tel"
                autoComplete="tel"
                placeholder="Enter your whatsapp"
                className={inputStyle}
              />
            </div>
          </div>

          {/* SEND */}
          <div data-contact-send className="min-[1280px]:grid min-[1280px]:grid-cols-[minmax(0,619px)_minmax(0,755px)]">
            <div className="min-[1280px]:col-start-2">
              <SendButton disabled={isSubmitting} />
              {message && (
                <p role="status" className="mt-4 text-[14px]">{message}</p>
              )}
            </div>
          </div>
        </form>
      </main>

      {/* ====================================
          EXISTING HEADER — UNCHANGED
      ==================================== */}

      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[110px] [&_button]:pointer-events-auto">
        <AboutHeader
          menuOpen={menuOpen}
          menuButtonRef={menuButtonRef}
          onOpenMenu={openMenu}
        />
      </div>

      {/* ====================================
          EXISTING FOOTER — UNCHANGED
      ==================================== */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[95px] [&_button]:pointer-events-auto">
        <AboutFooter />
      </div>

      {/* ====================================
          EXISTING MOBILE MENU
      ==================================== */}

      {menuOpen && (
        <MobileMenu onClose={closeMenu} />
      )}
    </section>
  )
}