
import { memo, useEffect, useRef, useState } from 'react'

export interface InfiniteSpiralProps {
  images: string[]
  speed?: number
  radius?: number
  cardWidth?: number
  cardHeight?: number
  verticalSpacing?: number
  perspective?: number
  cardRadius?: number
  centerScale?: number
  edgeBlur?: number
  edgeFade?: number
  cardsPerTurn?: number
  direction?: 'up' | 'down'
  rotation?: number
  cardTilt?: number
  grayscale?: number
  cardOpacity?: number
}

const TAU = Math.PI * 2

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const smoothstep = (x: number) => {
  const c = clamp(x, 0, 1)
  return c * c * (3 - 2 * c)
}

function InfiniteSpiral({
  images,
  speed = 0.15,
  radius = 240,
  cardWidth = 155,
  cardHeight,
  verticalSpacing = 75,
  perspective = 1000,
  cardRadius = 0,
  centerScale = 1.15,
  edgeBlur = 2,
  edgeFade = 0.3,
  cardsPerTurn = 7,
  direction = 'up',
  rotation = 0,
  cardTilt = 0,
  grayscale = 0,
  cardOpacity = 0.55,
}: InfiniteSpiralProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  const isDesktop = size.width >= 1280
  const isTablet = size.width >= 768 && !isDesktop

  // Responsive card dimensions.
  // Desktop values remain unchanged.

  const responsiveCardWidth = isDesktop
    ? cardWidth
    : Math.min(
        cardWidth,
        clamp(size.width * 0.16, 100, 155),
      )

  const responsiveCardHeight =
    cardHeight !== undefined
      ? isDesktop
        ? cardHeight
        : cardHeight * (responsiveCardWidth / cardWidth)
      : Math.round(responsiveCardWidth * (824 / 800))

  // Responsive vertical spacing.

  const responsiveSpacing = isDesktop
    ? verticalSpacing
    : Math.min(
        verticalSpacing,
        clamp(55 + (size.width - 390) * 0.0265, 55, 75),
      )

  // Responsive radius.
  // Preserve the original desktop geometry.

  const effectiveRadius = isDesktop
    ? Math.max(radius, size.width * 0.4)
    : Math.max(
        isTablet ? 200 : 120,
        size.width * 0.34,
      )

  const effectivePerspective =
    perspective * (effectiveRadius / radius)

  // Slightly softer cards on smaller screens.

  const effectiveOpacity = isDesktop
    ? cardOpacity
    : cardOpacity * (isTablet ? 0.82 : 0.73)

  // Enough cards for seamless looping.

  const count =
    size.height > 0 && images.length > 0
      ? Math.ceil(
          (size.height +
            2 * (responsiveCardHeight + responsiveSpacing)) /
            responsiveSpacing,
        ) + 1
      : 0

  // Observe container dimensions.

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return

      const { width, height } = entry.contentRect

      setSize((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height },
      )
    })

    observer.observe(root)

    return () => observer.disconnect()
  }, [])

  // Animate the spiral.

  useEffect(() => {
    if (!count || images.length === 0) return

    const dir = direction === 'up' ? 1 : -1
    const fadeZone = Math.max(1, size.height * 0.22)
    const R = effectiveRadius

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    const place = (t: number) => {
      for (let k = 0; k < count; k++) {
        const el = cardRefs.current[k]
        if (!el) continue

        const u = (((k - dir * t) % count) + count) % count

        const y = (u - count / 2) * responsiveSpacing

        const theta =
          (u * TAU) / cardsPerTurn +
          (rotation * Math.PI) / 180

        const x = R * Math.sin(theta)
        const z = R * Math.cos(theta)

        // 0 = back, 1 = front.
        const depth = (Math.cos(theta) + 1) / 2

        // Keep the original 3D scaling.
        const scale = 1 + (centerScale - 1) * depth

        // Blur increases with distance.
        const blur = edgeBlur * (1 - depth)

        // Fade at the top and bottom.
        const edge = smoothstep(
          (size.height / 2 - Math.abs(y)) / fadeZone,
        )

        const opacity =
          effectiveOpacity *
          (edgeFade + (1 - edgeFade) * depth) *
          edge

        el.style.transform =
          `translate3d(${x.toFixed(2)}px, ` +
          `${y.toFixed(2)}px, ` +
          `${z.toFixed(2)}px) ` +
          `scale(${scale.toFixed(4)}) ` +
          `rotateX(${cardTilt}deg)`

        el.style.opacity = opacity.toFixed(3)

        el.style.filter =
          `blur(${blur.toFixed(2)}px)` +
          (grayscale ? ` grayscale(${grayscale})` : '')
      }
    }

    let frame = 0
    let t = 0
    let last = 0

    const tick = (now: number) => {
      t += ((now - last) / 1000) * speed
      last = now

      place(t)
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      cancelAnimationFrame(frame)
      place(t)

      if (reduceMotion.matches) return

      last = performance.now()
      frame = requestAnimationFrame(tick)
    }

    start()

    reduceMotion.addEventListener('change', start)

    return () => {
      cancelAnimationFrame(frame)
      reduceMotion.removeEventListener('change', start)
    }
  }, [
    count,
    size,
    speed,
    effectiveRadius,
    responsiveSpacing,
    cardsPerTurn,
    direction,
    rotation,
    cardTilt,
    centerScale,
    edgeBlur,
    edgeFade,
    effectiveOpacity,
    grayscale,
    images.length,
  ])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{ perspective: effectivePerspective }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {Array.from({ length: count }, (_, k) => (
            <div
              key={k}
              ref={(el) => {
                cardRefs.current[k] = el
              }}
              className="absolute top-1/2 left-1/2 overflow-hidden will-change-[transform,opacity,filter]"
              style={{
                width: responsiveCardWidth,
                height: responsiveCardHeight,
                marginLeft: -responsiveCardWidth / 2,
                marginTop: -responsiveCardHeight / 2,
                borderRadius: cardRadius,
                opacity: 0,
              }}
            >
              <img
                src={images[k % images.length]}
                alt=""
                draggable={false}
                decoding="async"
                className="block h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(InfiniteSpiral)

