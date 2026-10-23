export default function ZoneLastCasesButton() {
  return (
    <a
      href="#/portfolio/villa-bali"
      aria-label="last case"
      className="group flex w-[182px] flex-col items-start gap-[6px] no-underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3A5F73]"
      style={{
        color: '#3A5F73',
        fontFamily: 'Inter, sans-serif',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '110%',
        letterSpacing: '-0.6px',
        textTransform: 'lowercase',
      }}
    >
      <span
        className="relative flex h-[36px] w-[182px] items-center justify-between overflow-hidden"
        style={{ opacity: 0.7 }}
      >
        <span className="absolute left-0 flex h-[15px] w-[29px] items-center justify-center transition-transform duration-[950ms] ease-in-out group-hover:translate-x-[153px] group-focus-visible:translate-x-[153px] motion-reduce:transition-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="15"
            viewBox="0 0 29 15"
            fill="none"
            aria-hidden="true"
            className="block h-[15px] w-[29px]"
          >
            <path
              d="M29 7.36377L29 8.36377H1V7.36377V6.36377H29V7.36377ZM0.292893 8.07088C-0.0976311 7.68035 -0.0976311 7.04719 0.292893 6.65666L6.65685 0.292702C7.04738 -0.0978227 7.68054 -0.0978227 8.07107 0.292702C8.46159 0.683226 8.46159 1.31639 8.07107 1.70692L2.41421 7.36377L8.07107 13.0206C8.46159 13.4111 8.46159 14.0443 8.07107 14.4348C7.68054 14.8254 7.04738 14.8254 6.65685 14.4348L0.292893 8.07088Z"
              fill="#3A5F73"
            />
          </svg>
        </span>
        <span className="absolute right-0 block shrink-0 whitespace-nowrap transition-transform duration-[950ms] ease-in-out group-hover:-translate-x-[calc(182px-100%)] group-focus-visible:-translate-x-[calc(182px-100%)] motion-reduce:transition-none">
          last case
        </span>
      </span>
      <span
        aria-hidden="true"
        className="block h-[2px] w-[182px] shrink-0"
        style={{ opacity: 0.7, background: '#3A5F73' }}
      />
    </a>
  )
}
