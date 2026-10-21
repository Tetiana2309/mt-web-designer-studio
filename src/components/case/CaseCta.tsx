
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

import arrowIcon from '../../assets/icons/arrow.svg'

interface CaseCtaProps {
  variant: 'primary' | 'secondary'
  label: string
  onClick?: () => void
}

export default function CaseCta({
  variant,
  label,
  onClick,
}: CaseCtaProps) {
  const primary = variant === 'primary'

  const buttonRef = useRef<HTMLButtonElement>(null)
  const textOuterRef = useRef<HTMLSpanElement>(null)
  const arrowOuterRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)

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
    let disposed = false

    const context = gsap.context(() => {
      const getTextTarget = () => {
        const buttonWidth = button.clientWidth
        const textWidth = text.offsetWidth
        const startX = textOuter.offsetLeft

        return buttonWidth - textWidth - startX
      }

      const getArrowTarget = () => {
        return -arrowOuter.offsetLeft
      }

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

      const update = () => {
        if (disposed) return

        const active = hovered || focused

        if (reducedMotion.matches) {
          timeline.progress(active ? 1 : 0).pause()
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

      const recalculate = () => {
        if (disposed || !button.isConnected) {
          return
        }

        const progress = timeline.progress()
        const wasPaused = timeline.paused()
        const wasReversed = timeline.reversed()

        timeline.invalidate()
        timeline.progress(progress).pause()

        if (!wasPaused && !reducedMotion.matches) {
          if (wasReversed) {
            timeline.reverse()
          } else {
            timeline.play()
          }
        }
      }

      const resizeObserver = new ResizeObserver(
        recalculate,
      )

      resizeObserver.observe(button)

      void document.fonts.ready.then(() => {
        if (!disposed) {
          recalculate()
        }
      })

      return () => {
        disposed = true

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

  return (
    <div
      className={`flex flex-col items-start gap-3.5 ${
        primary
          ? 'w-[calc(308*var(--u))]'
          : 'w-[calc(182*var(--u))]'
      }`}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        aria-label={label}
        className={`relative flex w-full cursor-pointer items-center justify-between focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
          primary
            ? 'text-accent text-[calc(22*var(--u))] leading-[1.1] font-semibold tracking-[-0.03em] whitespace-nowrap uppercase'
            : 'text-accent/70 text-[calc(20*var(--u))] leading-[1.1] font-normal tracking-[-0.03em] whitespace-nowrap lowercase'
        }`}
      >
        <span
          ref={textOuterRef}
          className="block shrink-0"
        >
          <span
            ref={textRef}
            className="block shrink-0"
          >
            {label}
          </span>
        </span>

        <span
          ref={arrowOuterRef}
          className="flex shrink-0 items-center justify-center"
        >
          <span
            ref={arrowRef}
            className="flex shrink-0 items-center justify-center"
          >
            {primary ? (
              <img
                src={arrowIcon}
                alt=""
                width={30}
                height={23}
                draggable={false}
                className="block h-auto w-[calc(30*var(--u))] shrink-0"
              />
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 29 15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="block h-auto w-[calc(29*var(--u))] shrink-0"
              >
                <path d="M0 7.5H28M21.5 1L28 7.5L21.5 14" />
              </svg>
            )}
          </span>
        </span>
      </button>

      <div
        aria-hidden="true"
        className={`w-full shrink-0 ${
          primary
            ? 'h-0.75 bg-accent'
            : 'h-0.5 bg-accent/70'
        }`}
      />
    </div>
  )
}

