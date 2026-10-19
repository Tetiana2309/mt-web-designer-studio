import arrowIcon from '../../assets/icons/arrow.svg'

interface CaseCtaProps {
  variant: 'primary' | 'secondary'
  label: string
  onClick?: () => void
}

// Static CTA used on the case study pages (no hover animation yet).
// primary:   308px wide, uppercase, 3px underline ("discuss the project")
// secondary: 182px wide, lowercase, 2px underline, 49% opacity ("next cases")
export default function CaseCta({ variant, label, onClick }: CaseCtaProps) {
  const primary = variant === 'primary'

  return (
    <div
      className={`flex flex-col items-start gap-3.5 ${
        primary ? 'w-[calc(308*var(--u))]' : 'w-[calc(182*var(--u))] opacity-70'
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className={`flex w-full cursor-pointer items-center text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
          primary
            ? 'gap-[calc(36*var(--u))] text-[calc(22*var(--u))] leading-[1.1] font-semibold tracking-[-0.03em] whitespace-nowrap uppercase'
            : 'gap-[calc(56*var(--u))] text-[calc(20*var(--u))] leading-[1.1] font-normal tracking-[-0.03em] whitespace-nowrap lowercase opacity-70'
        }`}
      >
        <span className="shrink-0">{label}</span>

        {primary ? (
          <img
            src={arrowIcon}
            alt=""
            width={30}
            height={23}
            className="block h-auto w-[calc(30*var(--u))] shrink-0"
          />
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 29 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="block h-auto w-[calc(29*var(--u))] shrink-0"
          >
            <path d="M0 7.5H28M21.5 1L28 7.5L21.5 14" />
          </svg>
        )}
      </button>

      <div
        aria-hidden="true"
        className={`w-full shrink-0 bg-accent ${primary ? 'h-0.75' : 'h-0.5'}`}
      />
    </div>
  )
}
