
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type WheelEvent,
} from 'react'

// ==========================================
// DNA CAROUSEL — KARIM SAIF
// Adapted for React + TypeScript
// ==========================================

interface ImageValue {
  src: string
  srcSet?: string
  alt?: string
}

interface DNACarouselProps {
  images: ImageValue[]
  cardWidth?: number
  cardHeight?: number
  gap?: number
  imageRadius?: number
  curveDepth?: number
  curveHeight?: number
  helixSpread?: number
  perspective?: number
  activeScale?: number
  inactiveScale?: number
  rotation?: number
  tilt?: number
  blur?: number
  chromaticAberration?: number
  inactiveOpacity?: number
  dragSensitivity?: number
  inertia?: number
  snapStrength?: number
  autoPlay?: boolean
  autoSpeed?: number
  shadow?: boolean
  shadowStrength?: number
  background?: string
  grabCursor?: boolean
}

const DEFAULT_PROPS = {
  cardWidth: 300,
  gap: 26,
  imageRadius: 0,
  curveDepth: 170,
  curveHeight: 55,
  helixSpread: 90,
  perspective: 1100,
  activeScale: 1,
  inactiveScale: 0.78,
  rotation: 32,
  tilt: 10,
  blur: 3,
  chromaticAberration: 0,
  inactiveOpacity: 0.42,
  dragSensitivity: 1.35,
  inertia: 0.93,
  snapStrength: 0.18,
  autoPlay: true,
  autoSpeed: 0.18,
  shadow: true,
  shadowStrength: 0.10,
  background: 'transparent',
  grabCursor: true,
}

function clamp(
  value: number,
  min: number,
  max: number,
) {
  return Math.max(min, Math.min(max, value))
}

function wrap(value: number, length: number) {
  if (length <= 0) return 0

  const result = value % length

  return result < 0 ? result + length : result
}

function shortestDistance(
  index: number,
  position: number,
  count: number,
) {
  let distance = index - position

  if (distance > count / 2) {
    distance -= count
  }

  if (distance < -count / 2) {
    distance += count
  }

  return distance
}

function easeOutCubic(value: number) {
  const t = clamp(value, 0, 1)

  return 1 - Math.pow(1 - t, 3)
}

export default function DNACarousel({
  images,
  cardWidth: baseCardWidth = DEFAULT_PROPS.cardWidth,
  gap = DEFAULT_PROPS.gap,
  imageRadius = DEFAULT_PROPS.imageRadius,
  curveDepth = DEFAULT_PROPS.curveDepth,
  curveHeight = DEFAULT_PROPS.curveHeight,
  helixSpread = DEFAULT_PROPS.helixSpread,
  perspective = DEFAULT_PROPS.perspective,
  activeScale = DEFAULT_PROPS.activeScale,
  inactiveScale = DEFAULT_PROPS.inactiveScale,
  rotation = DEFAULT_PROPS.rotation,
  tilt = DEFAULT_PROPS.tilt,
  blur = DEFAULT_PROPS.blur,
  chromaticAberration = DEFAULT_PROPS.chromaticAberration,
  inactiveOpacity = DEFAULT_PROPS.inactiveOpacity,
  dragSensitivity = DEFAULT_PROPS.dragSensitivity,
  inertia = DEFAULT_PROPS.inertia,
  snapStrength = DEFAULT_PROPS.snapStrength,
  autoPlay = DEFAULT_PROPS.autoPlay,
  autoSpeed = DEFAULT_PROPS.autoSpeed,
  shadow = DEFAULT_PROPS.shadow,
  shadowStrength = DEFAULT_PROPS.shadowStrength,
  background = DEFAULT_PROPS.background,
  grabCursor = DEFAULT_PROPS.grabCursor,
}: DNACarouselProps) {
  // Keep the desktop geometry unchanged at 1280px and wider.
  // Tablet and mobile scale the entire helix, not just the images.
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window === 'undefined' ? 1440 : window.innerWidth,
  )

  const layoutScale =
    viewportWidth >= 1280
      ? 1
      : viewportWidth >= 768
        ? clamp(viewportWidth / 1280, 0.78, 1)
        : clamp(viewportWidth / 650, 0.53, 0.78)

  const cardWidth = Math.round(baseCardWidth * layoutScale)
  const cardHeight = cardWidth
  const scaledGap = gap * layoutScale
  const scaledDepth = curveDepth * layoutScale
  const scaledCurveHeight = curveHeight * layoutScale
  const scaledHelixSpread = helixSpread * layoutScale
  const scaledPerspective = Math.round(perspective * layoutScale)

  // Repeat five projects to fill the DNA helix.
  const displayImages = useMemo(() => {
    const valid = images.filter(
      (image) =>
        image &&
        typeof image.src === 'string' &&
        image.src.length > 0,
    )

    if (valid.length > 0 && valid.length < 8) {
      return [...valid, ...valid]
    }

    return valid
  }, [images])

  const count = displayImages.length

  const rootRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const positionRef = useRef(0)
  const velocityRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const visibleRef = useRef(true)
  const draggingRef = useRef(false)
  const pointerIdRef = useRef<number | null>(null)

  const startPointerXRef = useRef(0)
  const startPositionRef = useRef(0)
  const lastPointerXRef = useRef(0)
  const lastPointerTimeRef = useRef(0)
  const lastFrameTimeRef = useRef<number | null>(null)

  const [reducedMotion, setReducedMotion] = useState(false)

  const settingsRef = useRef({
    cardWidth,
    gap: scaledGap,
    curveDepth: scaledDepth,
    curveHeight: scaledCurveHeight,
    helixSpread: scaledHelixSpread,
    activeScale,
    inactiveScale,
    rotation,
    tilt,
    blur,
    chromaticAberration,
    inactiveOpacity,
    dragSensitivity,
    inertia,
    snapStrength,
    autoPlay,
    autoSpeed,
    shadow,
    shadowStrength,
  })

  settingsRef.current = {
    cardWidth,
    gap: scaledGap,
    curveDepth: scaledDepth,
    curveHeight: scaledCurveHeight,
    helixSpread: scaledHelixSpread,
    activeScale,
    inactiveScale,
    rotation,
    tilt,
    blur,
    chromaticAberration,
    inactiveOpacity,
    dragSensitivity,
    inertia,
    snapStrength,
    autoPlay,
    autoSpeed,
    shadow,
    shadowStrength,
  }

  // ==========================================
  // REDUCED MOTION
  // ==========================================

  useEffect(() => {
    const media = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    const update = () => setReducedMotion(media.matches)

    update()
    media.addEventListener('change', update)

    return () => {
      media.removeEventListener('change', update)
    }
  }, [])

  // ==========================================
  // ORIGINAL DNA GEOMETRY
  // ==========================================

  const renderCards = useCallback(() => {
    if (!rootRef.current || count === 0) return

    const settings = settingsRef.current
    const position = wrap(positionRef.current, count)

    const centerWidth =
      settings.cardWidth + settings.gap

    const maxVisibleDistance = Math.max(
      3,
      Math.ceil(count / 2),
    )

    cardsRef.current.forEach((card, index) => {
      if (!card) return

      const distance = shortestDistance(
        index,
        position,
        count,
      )

      const absoluteDistance = Math.abs(distance)

      const normalizedDistance = clamp(
        absoluteDistance / maxVisibleDistance,
        0,
        1,
      )

      const phase = distance * Math.PI * 0.48

      const wave = Math.sin(phase)
      const depthWave = Math.cos(phase)

      const strand = index % 2 === 0 ? 1 : -1

      const x =
        distance * centerWidth * 0.72

      const y =
        wave * settings.curveHeight * strand

      const z =
        depthWave * settings.curveDepth

      const strandY =
        strand *
        settings.helixSpread *
        Math.cos(phase * 0.5) *
        0.5

      const rotateY =
        depthWave * settings.rotation * strand

      const rotateZ =
        wave * settings.tilt * strand

      const rotateX =
        wave * settings.tilt * 0.35

      const activeAmount = clamp(
        1 - absoluteDistance,
        0,
        1,
      )

      const smoothActive = easeOutCubic(activeAmount)

      const scale =
        settings.inactiveScale +
        (settings.activeScale -
          settings.inactiveScale) *
          smoothActive

      const opacity =
        settings.inactiveOpacity +
        (1 - settings.inactiveOpacity) *
          smoothActive

      const depthNormalized =
        settings.curveDepth === 0
          ? 1
          : clamp(
              (z + settings.curveDepth) /
                (settings.curveDepth * 2),
              0,
              1,
            )

      const zScale =
        0.88 + depthNormalized * 0.12

      const finalScale = scale * zScale

      const blurAmount =
        settings.blur *
        normalizedDistance *
        (1 - smoothActive)

      const chroma =
        settings.chromaticAberration *
        normalizedDistance *
        (1 - smoothActive)

      const zIndex = Math.round(
        100 - absoluteDistance * 10 + depthWave * 4,
      )

      card.style.transform = `
        translate3d(
          ${x}px,
          ${y + strandY}px,
          ${z}px
        )
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        rotateZ(${rotateZ}deg)
        scale(${finalScale})
      `

      card.style.opacity = String(opacity)
      card.style.zIndex = String(zIndex)

      // Small, brand-colored shadow, separate from image blur.
      const shadowFilter = settings.shadow
        ? `drop-shadow(0 ${3 + smoothActive * 3}px ${7 + smoothActive * 5}px rgba(58, 95, 115, ${settings.shadowStrength}))`
        : ''

      // Original RGB Split effect,
      // configurable and disabled for M&T.
      const chromaticFilter =
        chroma > 0.01
          ? `
            drop-shadow(
              ${-chroma}px 0 0
              rgba(255, 0, 70, 0.42)
            )
            drop-shadow(
              ${chroma}px 0 0
              rgba(0, 170, 255, 0.42)
            )
          `
          : ''

      // Shadow belongs to the outer card. Only the image gets blurred.
      card.style.filter = shadowFilter || 'none'

      const imageElement = card.querySelector('img')
      if (imageElement) {
        imageElement.style.filter = `blur(${blurAmount}px) ${chromaticFilter}`
      }
    })
  }, [count])

  // ==========================================
  // ANIMATION ENGINE
  // ==========================================

  useEffect(() => {
    if (count === 0) return

    if (reducedMotion) {
      renderCards()
      return
    }

    let mounted = true

    const animate = (time: number) => {
      if (!mounted) return

      if (!visibleRef.current || document.hidden) {
        lastFrameTimeRef.current = null

        rafRef.current = requestAnimationFrame(animate)
        return
      }

      const previous =
        lastFrameTimeRef.current ?? time

      let delta = (time - previous) / 1000

      lastFrameTimeRef.current = time
      delta = clamp(delta, 0, 0.05)

      const settings = settingsRef.current

      if (!draggingRef.current) {
        // Continuous automatic movement.
        if (settings.autoPlay) {
          positionRef.current +=
            settings.autoSpeed * delta
        }

        // Momentum after dragging.
        if (Math.abs(velocityRef.current) > 0.0001) {
          positionRef.current +=
            velocityRef.current * delta

          velocityRef.current *= Math.pow(
            settings.inertia,
            delta * 60,
          )
        }

        // Original snap behavior when autoplay is off.
        if (
          !settings.autoPlay &&
          Math.abs(velocityRef.current) < 0.025
        ) {
          const target = Math.round(
            positionRef.current,
          )

          const difference =
            target - positionRef.current

          const snapAmount =
            1 -
            Math.exp(
              -settings.snapStrength * 60 * delta,
            )

          positionRef.current +=
            difference * snapAmount

          if (Math.abs(difference) < 0.0005) {
            positionRef.current = target
            velocityRef.current = 0
          }
        }
      }

      renderCards()

      rafRef.current = requestAnimationFrame(animate)
    }

    lastFrameTimeRef.current = null
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      mounted = false

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [count, reducedMotion, renderCards])

  // ==========================================
  // UPDATE AND RESIZE
  // ==========================================

  useEffect(() => {
    cardsRef.current.length = count
    renderCards()
  }, [
    count,
    cardWidth,
    scaledGap,
    scaledDepth,
    scaledCurveHeight,
    scaledHelixSpread,
    scaledPerspective,
    activeScale,
    inactiveScale,
    rotation,
    tilt,
    blur,
    chromaticAberration,
    inactiveOpacity,
    shadow,
    shadowStrength,
    renderCards,
  ])

  useEffect(() => {
    const root = rootRef.current

    if (!root) return

    const resizeObserver = new ResizeObserver(() => {
      // Width also changes on iPhone orientation changes.
      const width = root.getBoundingClientRect().width
      if (width > 0) {
        setViewportWidth((previous) =>
          Math.abs(previous - width) > 0.5 ? width : previous,
        )
      }
      renderCards()
    })

    const visibilityObserver =
      new IntersectionObserver(([entry]) => {
        visibleRef.current =
          entry?.isIntersecting ?? true

        lastFrameTimeRef.current = null
      })

    const initialWidth = root.getBoundingClientRect().width
    if (initialWidth > 0) setViewportWidth(initialWidth)

    resizeObserver.observe(root)
    visibilityObserver.observe(root)

    return () => {
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
    }
  }, [renderCards])

  // ==========================================
  // POINTER DRAG
  // ==========================================

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (reducedMotion) return

    if (
      event.pointerType === 'mouse' &&
      event.button !== 0
    ) {
      return
    }

    const root = rootRef.current

    if (!root) return

    draggingRef.current = true
    pointerIdRef.current = event.pointerId

    startPointerXRef.current = event.clientX
    startPositionRef.current = positionRef.current

    lastPointerXRef.current = event.clientX
    lastPointerTimeRef.current = performance.now()

    velocityRef.current = 0

    root.style.cursor = 'grabbing'

    try {
      root.setPointerCapture(event.pointerId)
    } catch {
      // Pointer capture is optional.
    }

    if (event.pointerType === 'mouse') event.preventDefault()
  }

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (!draggingRef.current) return

    if (
      pointerIdRef.current !== event.pointerId
    ) {
      return
    }

    const settings = settingsRef.current

    const now = performance.now()

    const dx =
      event.clientX - startPointerXRef.current

    const travel = Math.max(
      1,
      settings.cardWidth + settings.gap,
    )

    positionRef.current =
      startPositionRef.current -
      (dx / travel) * settings.dragSensitivity

    const deltaX =
      event.clientX - lastPointerXRef.current

    const deltaTime = Math.max(
      1,
      now - lastPointerTimeRef.current,
    )

    const deltaSeconds = deltaTime / 1000

    const instantVelocity =
      (-(deltaX / travel) / deltaSeconds) *
      settings.dragSensitivity

    velocityRef.current =
      velocityRef.current * 0.72 +
      instantVelocity * 0.28

    lastPointerXRef.current = event.clientX
    lastPointerTimeRef.current = now

    renderCards()
    if (event.pointerType === 'mouse') event.preventDefault()
  }

  const handlePointerUp = (
    event?: PointerEvent<HTMLDivElement>,
  ) => {
    if (!draggingRef.current) return

    draggingRef.current = false

    const root = rootRef.current

    if (root) {
      root.style.cursor =
        grabCursor ? 'grab' : 'default'
    }

    if (event && pointerIdRef.current !== null) {
      try {
        root?.releasePointerCapture(
          pointerIdRef.current,
        )
      } catch {
        // Pointer capture may already be released.
      }
    }

    pointerIdRef.current = null

    velocityRef.current = clamp(
      velocityRef.current,
      -2.5,
      2.5,
    )
  }

  // ==========================================
  // MOUSE WHEEL
  // ==========================================

  const handleWheel = (
    event: WheelEvent<HTMLDivElement>,
  ) => {
    const settings = settingsRef.current

    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY

    if (Math.abs(delta) < 0.01) return
    // Preserve normal vertical scrolling on touch-sized layouts.
    if (viewportWidth < 768 && Math.abs(event.deltaY) > Math.abs(event.deltaX)) return

    positionRef.current +=
      delta * 0.0025 * settings.dragSensitivity

    velocityRef.current +=
      delta * 0.0005 * settings.dragSensitivity

    velocityRef.current = clamp(
      velocityRef.current,
      -1.8,
      1.8,
    )

    renderCards()

    event.preventDefault()
  }

  // ==========================================
  // KEYBOARD
  // ==========================================

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (
      event.key === 'ArrowRight' ||
      event.key === 'ArrowDown'
    ) {
      positionRef.current += 1
      velocityRef.current = 0

      renderCards()
      event.preventDefault()
    }

    if (
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowUp'
    ) {
      positionRef.current -= 1
      velocityRef.current = 0

      renderCards()
      event.preventDefault()
    }
  }

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (!count) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background,
        }}
      />
    )
  }

  // ==========================================
  // DNA CAROUSEL JSX
  // ==========================================

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="M&T Studio DNA portfolio carousel"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => handlePointerUp()}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background,
        perspective: `${scaledPerspective}px`,
        perspectiveOrigin: '50% 50%',
        touchAction: 'pan-y',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: grabCursor ? 'grab' : 'default',
        outline: 'none',
        contain: 'layout paint',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          pointerEvents: 'none',
        }}
      >
        {displayImages.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            ref={(element) => {
              cardsRef.current[index] = element
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: cardWidth,
              height: cardHeight,
              marginLeft: -cardWidth / 2,
              marginTop: -cardHeight / 2,
              borderRadius: imageRadius,
              overflow: 'visible',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              willChange: 'transform, opacity, filter',
              transform: 'translate3d(0,0,0)',
              opacity: 0,
              pointerEvents: 'none',
              background: 'transparent',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                borderRadius: imageRadius,
              }}
            >
              <img
              src={image.src}
              srcSet={image.srcSet}
              alt={image.alt ?? ''}
              draggable={false}
              loading={index < 3 ? 'eager' : 'lazy'}
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover',
                objectPosition: 'center',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

