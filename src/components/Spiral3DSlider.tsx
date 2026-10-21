
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type KeyboardEvent,
  type PointerEvent,
} from 'react'

// ==========================================
// DNA CAROUSEL — ECO NATURA CASE
// Rectangular website screenshots
// ==========================================

export interface Spiral3DSlide {
  src: string
  alt: string
}

interface Spiral3DSliderProps {
  items: Spiral3DSlide[]
  className?: string
  ariaLabel?: string
  cardWidth?: number
  cardAspectRatio?: number
  radius?: number
  autoRotate?: boolean
  autoSpeed?: number
  scrollSensitivity?: number
  smoothing?: number
  fov?: number
}

interface ImageSize {
  width: number
  height: number
}

const DNA = {
  gap: 36,
  curveHeight: 65,
  helixSpread: 125,
  rotation: 26,
  tilt: 7,
  activeScale: 1,
  inactiveScale: 0.78,
  inactiveOpacity: 0.48,
  blur: 4,
  shadowColor: '58, 95, 115',
  shadowStrength: 0.15,
  dragSensitivity: 0.85,
  inertia: 0.91,
  maxVisibleDistance: 4.2,

  // New card size limits
  maxCardWidth: 780,
  widthRatio: 0.48,
  heightRatio: 0.78,
} as const

// ==========================================
// HELPERS
// ==========================================

function clamp(
  value: number,
  min: number,
  max: number,
): number {
  return Math.max(min, Math.min(max, value))
}

function wrap(
  value: number,
  length: number,
): number {
  if (length <= 0) return 0

  const result = value % length

  return result < 0
    ? result + length
    : result
}

function shortestDistance(
  index: number,
  position: number,
  count: number,
): number {
  let distance = index - wrap(position, count)

  if (distance > count / 2) {
    distance -= count
  }

  if (distance < -count / 2) {
    distance += count
  }

  return distance
}

function easeOutCubic(value: number): number {
  const t = clamp(value, 0, 1)

  return 1 - Math.pow(1 - t, 3)
}

function getImageSize(
  image: HTMLImageElement | null | undefined,
): ImageSize | null {
  if (
    !image ||
    image.naturalWidth <= 0 ||
    image.naturalHeight <= 0
  ) {
    return null
  }

  return {
    width: image.naturalWidth,
    height: image.naturalHeight,
  }
}

// ==========================================
// COMPONENT
// ==========================================

export default function Spiral3DSlider({
  items,
  className = '',
  ariaLabel = 'Eco Natura DNA case gallery',
  cardWidth = 780,
  cardAspectRatio = 1.5,
  radius = 1100,
  autoRotate = true,
  autoSpeed = 0.07,
  scrollSensitivity = 0.0035,
  smoothing = 0.045,
}: Spiral3DSliderProps) {
  const validItems = useMemo(
    () =>
      items.filter(
        (item) =>
          Boolean(item) &&
          typeof item.src === 'string' &&
          item.src.length > 0,
      ),
    [items],
  )

  // Preserve the duplicated image sequence
  // from the working DNA version.

  const displayItems = useMemo(() => {
    if (validItems.length === 0) {
      return []
    }

    if (validItems.length < 8) {
      return [...validItems, ...validItems]
    }

    return validItems
  }, [validItems])

  const count = displayItems.length

  // ========================================
  // REFS
  // ========================================

  const rootRef = useRef<HTMLDivElement>(null)

  const cardsRef =
    useRef<(HTMLDivElement | null)[]>([])

  const imagesRef =
    useRef<(HTMLImageElement | null)[]>([])

  const drawRef =
    useRef<(() => void) | null>(null)

  const positionRef = useRef(0)
  const targetRef = useRef(0)
  const velocityRef = useRef(0)

  const visibleRef = useRef(true)
  const reducedMotionRef = useRef(false)
  const draggingRef = useRef(false)

  const previousScrollRef = useRef(0)

  const pointerRef = useRef({
    pointerId: -1,
    startX: 0,
    startPosition: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  })

  // ========================================
  // ORIGINAL DNA GEOMETRY
  // ========================================

  const renderCards = useCallback(() => {
    const root = rootRef.current

    if (!root || count === 0) return

    const stageWidth = root.clientWidth
    const stageHeight = root.clientHeight

    if (
      stageWidth <= 0 ||
      stageHeight <= 0
    ) {
      return
    }

    // ======================================
    // SMALLER CARD SIZE
    // ======================================

    // Even if CaseEcoNatura still passes
    // cardWidth={1000}, the maximum here
    // is limited to 780px.

    const maximumWidth = Math.min(
      cardWidth,
      DNA.maxCardWidth,
      stageWidth * DNA.widthRatio,
    )

    const maximumHeight =
      stageHeight * DNA.heightRatio

    // ======================================
    // RESPONSIVE DNA DIMENSIONS
    // ======================================

    const responsiveScale = clamp(
      stageWidth / 1920,
      0.55,
      1,
    )

    const gap =
      DNA.gap * responsiveScale

    const curveHeight =
      DNA.curveHeight * responsiveScale

    const helixSpread =
      DNA.helixSpread * responsiveScale

    const curveDepth =
      Math.min(radius * 0.2, 230) *
      responsiveScale

    const centerWidth =
      maximumWidth + gap

    const maximumDistance = Math.max(
      3,
      Math.ceil(count / 2),
    )

    const position = wrap(
      positionRef.current,
      count,
    )

    // ======================================
    // UPDATE CARDS
    // ======================================

    cardsRef.current.forEach((card, index) => {
      if (!card) return

      const image = imagesRef.current[index]

      // ====================================
      // ORIGINAL IMAGE PROPORTIONS
      // ====================================

      const imageSize = getImageSize(image)

      const aspect = imageSize
        ? imageSize.width / imageSize.height
        : cardAspectRatio

      const safeAspect = Math.max(
        aspect,
        0.1,
      )

      // The whole screenshot remains visible.

      const imageWidth = Math.min(
        maximumWidth,
        maximumHeight * safeAspect,
      )

      const imageHeight =
        imageWidth / safeAspect

      // ====================================
      // ORIGINAL DNA DISTANCE
      // ====================================

      const distance = shortestDistance(
        index,
        position,
        count,
      )

      const absoluteDistance =
        Math.abs(distance)

      const normalizedDistance = clamp(
        absoluteDistance / maximumDistance,
        0,
        1,
      )

      const isVisible =
        absoluteDistance <
        DNA.maxVisibleDistance

      card.style.visibility = isVisible
        ? 'visible'
        : 'hidden'

      if (!isVisible) return

      // ====================================
      // ORIGINAL DNA PHASE
      // ====================================

      const phase =
        distance * Math.PI * 0.48

      const wave = Math.sin(phase)
      const depthWave = Math.cos(phase)

      const strand =
        index % 2 === 0 ? 1 : -1

      // ====================================
      // ORIGINAL 3D POSITION
      // ====================================

      const x =
        distance * centerWidth * 0.72

      const y =
        wave * curveHeight * strand

      const z =
        depthWave * curveDepth

      const strandY =
        strand *
        helixSpread *
        Math.cos(phase * 0.5) *
        0.5

      // ====================================
      // ROTATION
      // ====================================

      const rotateY =
        depthWave * DNA.rotation * strand

      const rotateZ =
        wave * DNA.tilt * strand

      const rotateX =
        wave * DNA.tilt * 0.35

      // ====================================
      // SCALE
      // ====================================

      const activeAmount = clamp(
        1 - absoluteDistance,
        0,
        1,
      )

      const smoothActive =
        easeOutCubic(activeAmount)

      const scale =
        DNA.inactiveScale +
        (DNA.activeScale - DNA.inactiveScale) *
          smoothActive

      const depthNormalized =
        curveDepth === 0
          ? 1
          : clamp(
              (z + curveDepth) /
                (curveDepth * 2),
              0,
              1,
            )

      const zScale =
        0.88 + depthNormalized * 0.12

      const finalScale =
        scale * zScale

      // ====================================
      // OPACITY AND BLUR
      // ====================================

      const opacity =
        DNA.inactiveOpacity +
        (1 - DNA.inactiveOpacity) *
          smoothActive

      const blurAmount =
        DNA.blur *
        normalizedDistance *
        (1 - smoothActive)

      // ====================================
      // SHADOW
      // ====================================

      const shadowY =
        10 + smoothActive * 10

      const shadowBlur =
        22 + smoothActive * 16

      const shadowOpacity =
        DNA.shadowStrength *
        (0.55 + smoothActive * 0.45)

      const zIndex = Math.round(
        100 -
          absoluteDistance * 10 +
          depthWave * 4,
      )

      // ====================================
      // CARD DIMENSIONS
      // ====================================

      card.style.width =
        `${imageWidth}px`

      card.style.height =
        `${imageHeight}px`

      card.style.marginLeft =
        `${-imageWidth / 2}px`

      card.style.marginTop =
        `${-imageHeight / 2}px`

      // ====================================
      // ORIGINAL DNA TRANSFORM
      // ====================================

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

      card.style.opacity =
        String(opacity)

      card.style.zIndex =
        String(zIndex)

      card.style.filter = `
        drop-shadow(
          0
          ${shadowY}px
          ${shadowBlur}px
          rgba(
            ${DNA.shadowColor},
            ${shadowOpacity}
          )
        )
      `

      if (image) {
        image.style.filter =
          `blur(${blurAmount}px)`
      }
    })
  }, [
    count,
    cardWidth,
    cardAspectRatio,
    radius,
  ])

  // ========================================
  // DRAW CALLBACK
  // ========================================

  useEffect(() => {
    drawRef.current = renderCards

    renderCards()

    return () => {
      if (drawRef.current === renderCards) {
        drawRef.current = null
      }
    }
  }, [renderCards])

  // ========================================
  // AUTOPLAY AND SCROLL
  // ========================================

  useEffect(() => {
    const root = rootRef.current

    if (!root || count === 0) return

    let animationFrame = 0
    let lastFrameTime = 0

    const reducedMotionQuery =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      )

    const updateReducedMotion = () => {
      reducedMotionRef.current =
        reducedMotionQuery.matches

      if (reducedMotionQuery.matches) {
        velocityRef.current = 0
        targetRef.current =
          positionRef.current
      }

      drawRef.current?.()
    }

    updateReducedMotion()

    reducedMotionQuery.addEventListener(
      'change',
      updateReducedMotion,
    )

    // ======================================
    // VISIBILITY
    // ======================================

    const visibilityObserver =
      new IntersectionObserver(
        ([entry]) => {
          visibleRef.current = Boolean(
            entry?.isIntersecting,
          )

          previousScrollRef.current =
            window.scrollY

          lastFrameTime = 0

          if (visibleRef.current) {
            drawRef.current?.()
          }
        },
        {
          threshold: 0.05,
        },
      )

    visibilityObserver.observe(root)

    // ======================================
    // PAGE SCROLL
    // ======================================

    previousScrollRef.current =
      window.scrollY

    const onScroll = () => {
      const currentScroll =
        window.scrollY

      const delta =
        currentScroll -
        previousScrollRef.current

      previousScrollRef.current =
        currentScroll

      if (
        !visibleRef.current ||
        reducedMotionRef.current ||
        draggingRef.current
      ) {
        return
      }

      targetRef.current +=
        clamp(delta, -160, 160) *
        scrollSensitivity
    }

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true },
    )

    // ======================================
    // ANIMATION LOOP
    // ======================================

    const animate = (time: number) => {
      const delta = lastFrameTime
        ? clamp(
            (time - lastFrameTime) / 1000,
            0,
            0.05,
          )
        : 1 / 60

      lastFrameTime = time

      if (
        visibleRef.current &&
        !document.hidden
      ) {
        if (!draggingRef.current) {
          // Automatic movement.

          if (
            autoRotate &&
            !reducedMotionRef.current
          ) {
            targetRef.current +=
              autoSpeed * delta
          }

          // Momentum after dragging.

          if (
            !reducedMotionRef.current &&
            Math.abs(velocityRef.current) >
              0.0001
          ) {
            targetRef.current +=
              velocityRef.current * delta

            velocityRef.current *=
              Math.pow(
                DNA.inertia,
                delta * 60,
              )
          }

          // Smooth movement.

          if (reducedMotionRef.current) {
            positionRef.current =
              targetRef.current
          } else {
            const follow =
              1 -
              Math.pow(
                1 -
                  clamp(
                    smoothing,
                    0.001,
                    1,
                  ),
                delta * 60,
              )

            positionRef.current +=
              (targetRef.current -
                positionRef.current) *
              follow
          }
        }

        // Infinite loop, no visual jump.

        if (
          !draggingRef.current &&
          Math.abs(positionRef.current) >
            count * 100
        ) {
          const cycles =
            Math.trunc(
              positionRef.current / count,
            ) * count

          positionRef.current -= cycles
          targetRef.current -= cycles
        }

        drawRef.current?.()
      } else {
        lastFrameTime = 0
      }

      animationFrame =
        requestAnimationFrame(animate)
    }

    animationFrame =
      requestAnimationFrame(animate)

    // ======================================
    // RESIZE
    // ======================================

    const resizeObserver =
      new ResizeObserver(() => {
        drawRef.current?.()
      })

    resizeObserver.observe(root)

    // ======================================
    // CLEANUP
    // ======================================

    return () => {
      cancelAnimationFrame(animationFrame)

      resizeObserver.disconnect()
      visibilityObserver.disconnect()

      window.removeEventListener(
        'scroll',
        onScroll,
      )

      reducedMotionQuery.removeEventListener(
        'change',
        updateReducedMotion,
      )
    }
  }, [
    count,
    autoRotate,
    autoSpeed,
    scrollSensitivity,
    smoothing,
  ])

  // ========================================
  // IMAGE LOADING
  // ========================================

  const handleImageLoad = () => {
    drawRef.current?.()
  }

  // ========================================
  // POINTER DRAG
  // ========================================

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (
      reducedMotionRef.current ||
      (event.pointerType === 'mouse' &&
        event.button !== 0)
    ) {
      return
    }

    if (event.pointerType === 'touch') {
      return
    }

    const root = rootRef.current

    if (!root) return

    draggingRef.current = true

    pointerRef.current.pointerId =
      event.pointerId

    pointerRef.current.startX =
      event.clientX

    pointerRef.current.startPosition =
      positionRef.current

    pointerRef.current.lastX =
      event.clientX

    pointerRef.current.lastTime =
      performance.now()

    pointerRef.current.velocity = 0
    velocityRef.current = 0

    targetRef.current =
      positionRef.current

    try {
      root.setPointerCapture(event.pointerId)
    } catch {
      // Pointer capture is optional.
    }

    event.preventDefault()
  }

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (
      !draggingRef.current ||
      pointerRef.current.pointerId !==
        event.pointerId
    ) {
      return
    }

    const root = rootRef.current
    if (!root) return

    const now = performance.now()

    const deltaX =
      event.clientX -
      pointerRef.current.lastX

    const deltaTime = Math.max(
      1,
      now - pointerRef.current.lastTime,
    )

    const travel = Math.max(
      1,
      Math.min(
        cardWidth,
        DNA.maxCardWidth,
        root.clientWidth * DNA.widthRatio,
      ) + DNA.gap,
    )

    const totalMovement =
      event.clientX -
      pointerRef.current.startX

    const movement =
      (totalMovement / travel) *
      DNA.dragSensitivity

    positionRef.current =
      pointerRef.current.startPosition -
      movement

    targetRef.current =
      positionRef.current

    const instantVelocity =
      (-(deltaX / travel) /
        (deltaTime / 1000)) *
      DNA.dragSensitivity

    pointerRef.current.velocity =
      pointerRef.current.velocity * 0.72 +
      instantVelocity * 0.28

    pointerRef.current.lastX =
      event.clientX

    pointerRef.current.lastTime = now

    drawRef.current?.()

    event.preventDefault()
  }

  const handlePointerUp = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (
      !draggingRef.current ||
      pointerRef.current.pointerId !==
        event.pointerId
    ) {
      return
    }

    draggingRef.current = false

    velocityRef.current = clamp(
      pointerRef.current.velocity,
      -1.2,
      1.2,
    )

    targetRef.current =
      positionRef.current

    const root = rootRef.current

    if (
      root?.hasPointerCapture(event.pointerId)
    ) {
      root.releasePointerCapture(
        event.pointerId,
      )
    }

    pointerRef.current.pointerId = -1
  }

  // ========================================
  // KEYBOARD
  // ========================================

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === 'ArrowRight') {
      targetRef.current += 1

      if (reducedMotionRef.current) {
        positionRef.current =
          targetRef.current

        drawRef.current?.()
      }

      event.preventDefault()
    }

    if (event.key === 'ArrowLeft') {
      targetRef.current -= 1

      if (reducedMotionRef.current) {
        positionRef.current =
          targetRef.current

        drawRef.current?.()
      }

      event.preventDefault()
    }
  }

  // ========================================
  // EMPTY STATE
  // ========================================

  if (count === 0) {
    return null
  }

  // ========================================
  // JSX
  // ========================================

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      className={`relative size-full overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent ${className}`}
      style={{
        perspective: `${Math.max(
          1100,
          radius * 1.3,
        )}px`,
        perspectiveOrigin: '50% 50%',
        transformStyle: 'preserve-3d',
        background: 'transparent',
        touchAction: 'pan-y',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'grab',
      }}
    >
      {/* ====================================
          DNA 3D STAGE
      ==================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {displayItems.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            ref={(element) => {
              cardsRef.current[index] = element
            }}
            className="absolute top-1/2 left-1/2"
            style={{
              width: Math.min(
                cardWidth,
                DNA.maxCardWidth,
              ),
              height:
                Math.min(
                  cardWidth,
                  DNA.maxCardWidth,
                ) / cardAspectRatio,

              marginLeft:
                -Math.min(
                  cardWidth,
                  DNA.maxCardWidth,
                ) / 2,

              marginTop:
                -Math.min(
                  cardWidth,
                  DNA.maxCardWidth,
                ) /
                cardAspectRatio /
                2,

              background: 'transparent',
              borderRadius: 0,
              overflow: 'visible',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              willChange: 'transform, opacity',
              pointerEvents: 'none',
            }}
          >
            <img
              ref={(element) => {
                imagesRef.current[index] = element
              }}
              src={item.src}
              alt=""
              draggable={false}
              loading={
                index < validItems.length
                  ? 'eager'
                  : 'lazy'
              }
              decoding="async"
              onLoad={handleImageLoad}
              className="block size-full max-w-none object-contain"
              style={{
                objectFit: 'contain',
                background: 'transparent',
                borderRadius: 0,
                pointerEvents: 'none',
                transform: 'translateZ(0)',
              }}
            />
          </div>
        ))}
      </div>

      {/* ====================================
          ACCESSIBLE IMAGE DESCRIPTIONS
      ==================================== */}

      <div className="sr-only">
        <p>{ariaLabel}</p>

        <ul>
          {validItems.map((item, index) => (
            <li key={`${item.src}-${index}`}>
              {item.alt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}







