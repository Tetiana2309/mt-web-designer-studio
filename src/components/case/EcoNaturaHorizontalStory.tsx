import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ASSETS = import.meta.env.BASE_URL + 'images/'

const intro = "A refined digital experience for Eco Natura, bringing sustainable products, thoughtful design and everyday choices together."
const challenge = "Eco-friendly products carried strong values, but the online experience felt weak and scattered. The brand needed a clearer digital presence that could build trust, improve perception, and help visitors focus on the products."
const approach = "We created a clean, nature-inspired shopping experience that highlights product quality and communicates Eco Natura's values. Clearer navigation, thoughtful design and focused content help visitors connect with the brand and explore its products with confidence."

/**
 * Five 1920 × 1002 Figma artboards.
 * The text and imagery are separate DOM layers—not screenshots of the artboards—
 * allowing a continuous horizontal camera move and independent image travel.
 */
function Photo({
  src, x, y, width, height, name, className = '',
}: {
  src: string
  x: number
  y: number
  width: number
  height: number
  name: string
  className?: string
}) {
  return (
    <img
      data-eco-image
      src={ASSETS + src}
      alt={name}
      draggable={false}
      className={`absolute block max-w-none object-cover ${className}`}
      style={{ left: x, top: y, width, height }}
    />
  )
}

function StageTitle({
  lines, x, y, align = 'left',
}: {
  lines: { value: string; indent?: number }[]
  x: number
  y: number
  align?: 'left' | 'right'
}) {
  return (
    <h2
      className="absolute m-0 font-sans text-[66px] leading-[0.95] font-medium italic tracking-[-1.98px] text-accent capitalize"
      style={{ left: x, top: y, textAlign: align }}
    >
      {lines.map((line, index) => (
        <span key={index} className="block whitespace-nowrap" style={{ marginLeft: line.indent || 0 }}>
          {line.value}
        </span>
      ))}
    </h2>
  )
}

const frames = [
  {
    key: 'introduction',
    label: 'A More Conscious Way to Shop',
    content: (
      <>
        <div className="absolute inset-0 bg-canvas" />
        <Photo src="1.1.webp" x={1363} y={0} width={1548} height={1002} name="Eco Natura homepage" className="origin-center" />
        <div className="absolute left-[40px] top-[232px] text-[20px] font-normal text-accent/70">next cases&nbsp; →</div>
        <StageTitle
          x={276}
          y={368}
          lines={[
            { value: 'A More Conscious' },
            { value: 'Way To Shop.', indent: 317 },
          ]}
        />
        <p className="absolute left-[711px] top-[546px] w-[338px] text-[20px] leading-[1.1] font-light italic tracking-[-0.6px] text-ink/75">
          {intro}
        </p>
      </>
    ),
  },
  {
    key: 'interface',
    label: 'Eco Natura interface details',
    content: (
      <>
        <div className="absolute inset-0 bg-canvas" />
        {/* The first photo extends seamlessly from scene 1 into scene 2. It must not be drawn twice. */}
        <Photo src="1.2.webp" x={644} y={204} width={1009} height={622} name="Eco Natura shop and products" className="shadow-[0_12px_40px_rgba(0,0,0,0.04)]" />
      </>
    ),
  },
  {
    key: 'challenge',
    label: 'The challenge',
    content: (
      <>
        <div className="absolute inset-0 bg-canvas" />
        <StageTitle
          x={607}
          y={325}
          lines={[
            { value: 'Eco Products' },
            { value: 'Need A Store', indent: 125 },
            { value: 'People Trust', indent: 290 },
          ]}
        />
        <p className="absolute left-[903px] top-[558px] w-[429px] text-[20px] leading-[1.1] font-light italic tracking-[-0.6px] text-ink/75">
          {challenge}
        </p>
      </>
    ),
  },
  {
    key: 'details',
    label: 'Product and brand detail screens',
    content: (
      <>
        <div className="absolute inset-0 bg-canvas" />
        <Photo src="1.5.webp" x={40} y={210} width={796} height={482} name="Eco Natura mission and reviews" />
        <Photo src="1.4.webp" x={1311} y={468} width={569} height={330} name="Eco Natura bamboo toothbrush product page" />
      </>
    ),
  },
  {
    key: 'approach',
    label: 'The approach',
    content: (
      <>
        <div className="absolute inset-0 bg-canvas" />
        <StageTitle
          x={594}
          y={312}
          lines={[
            { value: 'Designed' },
            { value: 'With', indent: 127 },
            { value: 'Purpose', indent: 239 },
          ]}
        />
        <p className="absolute left-[898px] top-[559px] w-[429px] text-[20px] leading-[1.1] font-light italic tracking-[-0.6px] text-ink/75">
          {approach}
        </p>
      </>
    ),
  },
] as const

export default function EcoNaturaHorizontalStory({ chrome }: { chrome: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const root = wrapperRef.current
    const track = trackRef.current
    if (!root || !track) return

    const update = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1002))
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  useLayoutEffect(() => {
    const root = wrapperRef.current
    const track = trackRef.current
    if (!root || !track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(max-width: 899px)').matches) return

    // A single, scrubbed horizontal camera move—not slide snapping.
    // Each artboard stays in a fixed world position, so visible portions
    // cross the viewport boundary continuously, like the reference.
    const ctx = gsap.context(() => {
      const total = frames.length - 1
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => '+=' + Math.round(window.innerWidth * total * 0.82),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      timeline.to(track, {
        x: () => -window.innerWidth * total,
        duration: total,
      }, 0)

      // Relative motion inside the same world: photographs slide at a
      // slightly different speed, without resizing or rearranging the
      // approved Figma layout at each frame's resting position.
      const panels = gsap.utils.toArray<HTMLElement>('[data-eco-panel]', root)
      panels.forEach((panel, index) => {
        const imgs = gsap.utils.toArray<HTMLElement>('[data-eco-image]', panel)
        if (!imgs.length) return
        timeline.fromTo(imgs, {
          x: (i: number) => (i % 2 ? 95 : -95),
        }, {
          x: (i: number) => (i % 2 ? -95 : 95),
          ease: 'none',
          duration: 1.8,
          immediateRender: false,
        }, Math.max(0, index - 0.7))
      })
    }, root)

    return () => ctx.revert()
  }, [scale])

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative hidden h-dvh w-full overflow-hidden min-[900px]:block"
        aria-label="Eco Natura project story"
      >
        <div ref={trackRef} className="flex h-full w-max will-change-transform">
          {frames.map((frame) => (
            <section
              data-eco-panel
              key={frame.key}
              aria-label={frame.label}
              style={{ zIndex: frames.length - frames.indexOf(frame) }}
              className="relative h-dvh w-screen shrink-0 overflow-visible bg-canvas"
            >
              <div
                className="absolute top-1/2 left-1/2 shrink-0"
                style={{
                  width: 1920,
                  height: 1002,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  transformOrigin: 'center center',
                }}
              >
                {frame.content}
              </div>
            </section>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 z-30 [&_button]:pointer-events-auto [&_a]:pointer-events-auto">{chrome}</div>
      </div>

      {/* No scroll hijacking on small screens: retain all five Figma scenes
          as readable, naturally scrolling editorial content. */}
      <div className="min-[900px]:hidden">
        <section className="relative min-h-[76dvh] overflow-hidden bg-canvas px-6 pt-32 pb-12">
          <h1 className="max-w-[16ch] text-[clamp(36px,9vw,66px)] leading-[0.98] font-medium italic tracking-[-0.03em] text-accent">A More Conscious Way To Shop.</h1>
          <p className="mt-8 max-w-[25rem] text-base leading-relaxed italic text-ink/80">{intro}</p>
          <img className="mt-12 w-full" src={ASSETS + '1.1.webp'} alt="Eco Natura homepage" />
        </section>
        <section className="bg-canvas px-6 py-16">
          <img className="w-full" src={ASSETS + '1.2.webp'} alt="Eco Natura products" loading="lazy" />
        </section>
        <section className="flex min-h-[70dvh] flex-col justify-center bg-canvas px-6 py-20">
          <h2 className="max-w-[18ch] text-[clamp(36px,9vw,66px)] leading-[0.98] font-medium italic tracking-[-0.03em] text-accent">Eco Products Need A Store People Trust</h2>
          <p className="mt-8 max-w-[27rem] text-base leading-relaxed italic text-ink/80">{challenge}</p>
        </section>
        <section className="grid gap-8 bg-canvas px-6 py-16">
          <img className="w-full" src={ASSETS + '1.5.webp'} alt="Eco Natura brand mission" loading="lazy" />
          <img className="w-full" src={ASSETS + '1.4.webp'} alt="Eco Natura bamboo toothbrush" loading="lazy" />
        </section>
        <section className="flex min-h-[70dvh] flex-col justify-center bg-canvas px-6 py-20">
          <h2 className="text-[clamp(36px,9vw,66px)] leading-[0.98] font-medium italic tracking-[-0.03em] text-accent">Designed With Purpose</h2>
          <p className="mt-8 max-w-[27rem] text-base leading-relaxed italic text-ink/80">{approach}</p>
        </section>
      </div>
    </>
  )
}
