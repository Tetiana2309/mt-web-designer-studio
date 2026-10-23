
import NextCasesButton from './VillaBaliNextCasesButton'
import LastCasesButton from './VillaBaliLastCasesButton'

// ==========================================
// VILLA BALI OUTRO
// ==========================================

// Outro animations are controlled by
// VillaBaliHorizontalStory's existing
// ScrollTrigger timeline.

export default function VillaBaliOutro() {
  return (
    <section
      data-bali-outro
      className="relative min-h-dvh overflow-hidden bg-canvas"
      aria-label="Luxury Villas Bali conclusion"
    >
           <div
  className="absolute top-1/2 -translate-y-1/2"
  style={{
    left: 'calc(760 * min(100vw / 1920, 1px))',
    width: 'min(58%, 1090px)',
  }}
>
        {/* BACKGROUND TAGLINE */}

        <div
          data-bali-outro-tagline
          className="font-sans font-medium not-italic text-accent capitalize"
          style={{
            fontSize: 'clamp(44px, 6.667vw, 128px)',
            lineHeight: '82%',
            letterSpacing: '-3.84px',
            opacity: 0.1,
            willChange: 'transform',
          }}
        >
          <span className="block whitespace-nowrap">
            Bali Awaits.
          </span>

          <span className="block whitespace-nowrap">
            Own Your Paradise.
          </span>
        </div>

        {/* MAIN HEADING */}

        <h2
          data-bali-outro-heading
          className="font-sans font-medium not-italic capitalize text-accent"
          style={{
            marginTop: 'clamp(55px, 7vh, 110px)',
            width: 523,
            maxWidth: '100%',
            fontSize: 'clamp(36px, 2.917vw, 56px)',
            lineHeight: 0.95,
            letterSpacing: '-1.68px',
            willChange: 'transform, opacity',
          }}
        >
          Build A Brand That
          <br />
          Drives Growth
        </h2>

        {/* CASE NAVIGATION BUTTONS */}

        <div
          data-bali-outro-link
          className="flex flex-wrap items-start gap-[32px]"
          style={{
            marginTop: 'clamp(42px, 6vh, 90px)',
            willChange: 'transform, opacity',
          }}
        >
          <LastCasesButton />
          <NextCasesButton />
        </div>
      </div>
    </section>
  )
}

