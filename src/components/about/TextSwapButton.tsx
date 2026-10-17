// Same hover / focus text swap as the navigation and social links in Hero.

interface TextSwapButtonProps {
  label: string
  className: string
}

export default function TextSwapButton({ label, className }: TextSwapButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`group/swap relative inline-block cursor-pointer align-top ${className}`}
    >
      <span data-hero-link-reveal className="block">
        <span className="relative block overflow-hidden">
          <span
            aria-hidden="true"
            className="block transform-gpu text-ink transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:-translate-y-full group-focus-visible/swap:-translate-y-full"
          >
            {label}
          </span>

          <span
            aria-hidden="true"
            className="absolute inset-0 block translate-y-full transform-gpu text-accent transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover/swap:translate-y-0 group-focus-visible/swap:translate-y-0"
          >
            {label}
          </span>
        </span>
      </span>
    </button>
  )
}
