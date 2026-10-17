
import {
  useLayoutEffect,
  useRef,
} from 'react'
import gsap from 'gsap'

import arrowIcon from '../assets/icons/arrow.svg'

// ==========================================
// M&T — CTA BUTTON
// INTRO ASSEMBLY + SMOOTH HOVER SWAP
// ==========================================

export default function CtaButton() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const textOuterRef = useRef<HTMLSpanElement>(null)
  const arrowOuterRef = useRef<HTMLSpanElement>(null)

  const textRef = useRef<HTMLSpanElement>(null)
  const arrowRef = useRef<HTMLImageElement>(null)

  // ==========================================
  // HOVER / FOCUS ANIMATION
  // ==========================================

  useLayoutEffect(() => {
    const button = buttonRef.current
    const textOuter = textOuterRef.current
    const arrowOuter = arrowOuterRef.current
    const text = textRef.current
    const arrow = arrowRef.current

    if (
      !button ||
      !textOuter ||
      !arrowOuter ||
      !text ||
      !arrow
    ) {
      return
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    let hovered = false
    let focused = false

    const context = gsap.context(() => {
      // ======================================
      // MEASURE TARGET POSITIONS
      // ======================================

      const getTextTarget = () => {
        const buttonWidth = button.clientWidth
        const textWidth = text.offsetWidth
        const startX = textOuter.offsetLeft

        // Move text to the right edge.
        return buttonWidth - textWidth - startX
      }

      const getArrowTarget = () => {
        // Move arrow to the left edge.
        return -arrowOuter.offsetLeft
      }

      // ======================================
      // SMOOTH SWAP TIMELINE
      // ======================================

      const timeline = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.95,
          ease: 'power2.inOut',
        },
      })

      timeline.to(
        text,
        {
          x: getTextTarget,
        },
        0,
      )

      timeline.to(
        arrow,
        {
          x: getArrowTarget,
        },
        0,
      )

      // ======================================
      // INTERACTION HANDLERS
      // ======================================

      const update = () => {
        const active = hovered || focused

        if (reducedMotion.matches) {
          timeline
            .progress(active ? 1 : 0)
            .pause()

          return
        }

        if (active) {
          timeline.play()
        } else {
          timeline.reverse()
        }
      }

      const onPointerEnter = () => {
        hovered = true
        update()
      }

      const onPointerLeave = () => {
        hovered = false
        update()
      }

      const onFocus = () => {
        focused = true
        update()
      }

      const onBlur = () => {
        focused = false
        update()
      }

      button.addEventListener(
        'pointerenter',
        onPointerEnter,
      )

      button.addEventListener(
        'pointerleave',
        onPointerLeave,
      )

      button.addEventListener(
        'focus',
        onFocus,
      )

      button.addEventListener(
        'blur',
        onBlur,
      )

      reducedMotion.addEventListener(
        'change',
        update,
      )

      // ======================================
      // RESPONSIVE RECALCULATION
      // ======================================

      const resizeObserver = new ResizeObserver(() => {
        // Recalculate target positions
        // without resetting current progress.
        const progress = timeline.progress()

        timeline.invalidate()
        timeline.progress(progress).pause()

        update()
      })

      resizeObserver.observe(button)

      const recalculate = () => {
        if (!button.isConnected) return

        const progress = timeline.progress()

        timeline.invalidate()
        timeline.progress(progress).pause()

        update()
      }

      void document.fonts.ready.then(recalculate)

      // ======================================
      // CLEANUP
      // ======================================

      return () => {
        resizeObserver.disconnect()

        button.removeEventListener(
          'pointerenter',
          onPointerEnter,
        )

        button.removeEventListener(
          'pointerleave',
          onPointerLeave,
        )

        button.removeEventListener(
          'focus',
          onFocus,
        )

        button.removeEventListener(
          'blur',
          onBlur,
        )

        reducedMotion.removeEventListener(
          'change',
          update,
        )

        timeline.kill()
      }
    }, button)

    return () => {
      context.revert()
    }
  }, [])

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div
      data-cta-root
      className="flex w-52 flex-col items-start gap-3.5"
    >
      {/* ====================================
          BUTTON
      ==================================== */}

      <button
        ref={buttonRef}
        type="button"
        className="cta-button relative flex h-6.25 w-52 cursor-pointer items-center justify-between whitespace-nowrap text-[22px] leading-[1.1] font-bold tracking-[-0.66px] text-accent uppercase"
      >
        {/* ==================================
            TEXT INTRO WRAPPER
        ================================== */}

        <span
          ref={textOuterRef}
          data-cta-intro-text
          className="block shrink-0"
        >
          {/* HOVER MOVEMENT */}
          <span
            ref={textRef}
            data-cta-text
            className="cta-text block shrink-0"
          >
            Let&apos;s talk
          </span>
        </span>

        {/* ==================================
            ARROW INTRO WRAPPER
        ================================== */}

        <span
          ref={arrowOuterRef}
          data-cta-intro-arrow
          className="flex h-6.25 w-7.5 shrink-0 items-center justify-center"
        >
          {/* HOVER MOVEMENT */}
          <img
            ref={arrowRef}
            data-cta-arrow
            src={arrowIcon}
            alt=""
            width={30}
            height={23}
            draggable={false}
            className="cta-arrow block h-5.75 w-7.5 shrink-0"
          />
        </span>
      </button>

      {/* ====================================
          UNDERLINE
      ==================================== */}

      <div
        aria-hidden="true"
        className="relative h-0.75 w-52 shrink-0"
      >
        <div
          data-cta-intro-line
          className="absolute inset-0 origin-left bg-accent"
        />
      </div>
    </div>
  )
}
