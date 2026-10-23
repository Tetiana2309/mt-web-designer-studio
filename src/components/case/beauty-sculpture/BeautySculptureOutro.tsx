import LastCasesButton from './BeautySculptureLastCasesButton'

// ==========================================
// ZONE OUTRO
// ==========================================

// Outro animations are controlled by
// BeautySculptureHorizontalStory's existing
// ScrollTrigger timeline.

export default function BeautySculptureOutro() {
  return (
    <section
      data-beauty-outro
      className="relative min-h-dvh overflow-hidden bg-canvas"
      aria-label="Beauty Sculpture conclusion"
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
          data-beauty-outro-tagline
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
            Feel Confident.
          </span>
          <span className="block whitespace-nowrap">
            Look Exceptional.
          </span>
        </div>

        {/* MAIN HEADING */}
        <h2
          data-beauty-outro-heading
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
          data-beauty-outro-link
          className="flex flex-wrap items-start gap-[32px]"
          style={{
            marginTop: 'clamp(42px, 6vh, 90px)',
            willChange: 'transform, opacity',
          }}
        >
          <LastCasesButton />
          
        </div>
      </div>
    </section>
  )
}
