import NextCasesButton from './EcoNaturaNextCasesButton'

// Outro animations are controlled by EcoNaturaHorizontalStory's existing
// ScrollTrigger timeline; there is intentionally no second ScrollTrigger here.
export default function EcoNaturaOutro() {
  return (
    <section
      data-eco-outro
      className="relative min-h-dvh overflow-hidden bg-canvas"
      aria-label="Eco Natura conclusion"
    >
      <div
  className="absolute top-1/2 -translate-y-1/2"
  style={{
    left: 'calc(760 * min(100vw / 1920, 1px))',
    width: 'min(58%, 1090px)',
  }}
>
        <div
          data-eco-outro-tagline
          className="font-sans font-medium not-italic text-accent capitalize"
          style={{
            fontSize: 'clamp(44px, 6.667vw, 128px)',
            lineHeight: '82%',
            letterSpacing: '-3.84px',
            opacity: 0.1,
            willChange: 'transform',
          }}
        >
          <span className="block whitespace-nowrap">Nature First.</span>
          <span className="block whitespace-nowrap">Conscious Choice.</span>
        </div>

        <h2
          data-eco-outro-heading
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

        <div
          data-eco-outro-link
          style={{
            marginTop: 'clamp(42px, 6vh, 90px)',
            willChange: 'transform, opacity',
          }}
        >
          <NextCasesButton />
        </div>
      </div>
    </section>
  )
}


