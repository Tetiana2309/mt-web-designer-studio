import { memo, useEffect, useRef, useState } from 'react'

export interface InfiniteSpiralProps {
  images: string[]
  /** Cards travelled per second. */
  speed?: number
  radius?: number
  cardWidth?: number
  /** Defaults to the images' aspect ratio. */
  cardHeight?: number
  verticalSpacing?: number
  perspective?: number
  cardRadius?: number
  /** Extra scale applied to cards at the front of the spiral. */
  centerScale?: number
  /** Blur in px applied to cards at the back of the spiral. */
  edgeBlur?: number
  /** Opacity multiplier of cards at the back of the spiral (1 = no fade). */
  edgeFade?: number
  cardsPerTurn?: number
  direction?: 'up' | 'down'
  /** Initial angle of the spiral in degrees. */
  rotation?: number
  /** rotateX of every card in degrees. */
  cardTilt?: number
  /** 0–1 */
  grayscale?: number
  cardOpacity?: number
}

const TAU = Math.PI * 2
const smoothstep = (x: number) => {
  const c = Math.min(1, Math.max(0, x))
  return c * c * (3 - 2 * c)
}

function InfiniteSpiral({
  images,
  speed = 0.35,
  radius = 240,
  cardWidth = 155,
  cardHeight,
  verticalSpacing = 75,
  perspective = 1200,
  cardRadius = 8,
  centerScale = 1.15,
  edgeBlur = 5,
  edgeFade = 0.3,
  cardsPerTurn = 7,
  direction = 'up',
  rotation = 0,
  cardTilt = 0,
  grayscale = 0,
  cardOpacity = 0.45,
}: InfiniteSpiralProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [size, setSize] = useState({ width: 0, height: 0 })

  const height = cardHeight ?? Math.round(cardWidth * (824 / 800))

  // Enough cards to cover the viewport plus one card height on each side,
  // so the wrap-around always happens fully outside the faded area.
  const count = size.height
    ? Math.ceil((size.height + 2 * (height + verticalSpacing)) / verticalSpacing) + 1
    : 0

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return
      const { width, height } = entry.contentRect
      setSize((prev) => (prev.width === width && prev.height === height ? prev : { width, height }))
    })
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  // The spiral widens with the viewport; perspective grows with it so the
  // depth magnification stays the same as with the configured radius.
  const effectiveRadius = Math.max(radius, size.width * 0.25)
  const effectivePerspective = perspective * (effectiveRadius / radius)

  useEffect(() => {
    if (!count) return

    const dir = direction === 'up' ? 1 : -1
    const fadeZone = size.height * 0.22
    const R = effectiveRadius
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const place = (t: number) => {
      for (let k = 0; k < count; k++) {
        const el = cardRefs.current[k]
        if (!el) continue

        // Position along the spiral, in cards; wraps seamlessly in [0, count).
        const u = (((k - dir * t) % count) + count) % count
        const y = (u - count / 2) * verticalSpacing
        const theta = (u * TAU) / cardsPerTurn + (rotation * Math.PI) / 180
        const x = R * Math.sin(theta)
        const z = R * Math.cos(theta)

        // 0 at the back of the spiral, 1 at the front.
        const depth = (Math.cos(theta) + 1) / 2
        const scale = 1 + (centerScale - 1) * depth
        const blur = edgeBlur * (1 - depth)
        const edge = smoothstep((size.height / 2 - Math.abs(y)) / fadeZone)
        const opacity = cardOpacity * (edgeFade + (1 - edgeFade) * depth) * edge

        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) scale(${scale.toFixed(4)}) rotateX(${cardTilt}deg)`
        el.style.opacity = opacity.toFixed(3)
        el.style.filter = `blur(${blur.toFixed(2)}px)${grayscale ? ` grayscale(${grayscale})` : ''}`
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
    verticalSpacing,
    cardsPerTurn,
    direction,
    rotation,
    cardTilt,
    centerScale,
    edgeBlur,
    edgeFade,
    cardOpacity,
    grayscale,
  ])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0" style={{ perspective: effectivePerspective }}>
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {Array.from({ length: count }, (_, k) => (
            <div
              key={k}
              ref={(el) => {
                cardRefs.current[k] = el
              }}
              className="absolute top-1/2 left-1/2 overflow-hidden will-change-[transform,opacity,filter]"
              style={{
                width: cardWidth,
                height,
                marginLeft: -cardWidth / 2,
                marginTop: -height / 2,
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
