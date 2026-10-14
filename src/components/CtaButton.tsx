import arrowIcon from '../assets/icons/arrow.svg'

export default function CtaButton() {
  return (
    <div className="flex w-52 flex-col items-start gap-3.5">
      <button
        type="button"
        className="cta-button flex w-52 items-center gap-16 whitespace-nowrap text-[22px] leading-[1.1] font-bold tracking-[-0.66px] text-accent uppercase"
      >
        <span className="cta-text shrink-0">Let&apos;s talk</span>

        <img src={arrowIcon} alt="" width={30} height={23} className="cta-arrow block shrink-0" />
      </button>

      {/* UNDERLINE */}
      <div aria-hidden="true" className="h-0.75 w-52 shrink-0 bg-accent" />
    </div>
  )
}
