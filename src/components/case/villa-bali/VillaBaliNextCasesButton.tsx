export default function NextCasesButton() {
  return (
    <a
      href="#/portfolio/zone"
      aria-label="next cases"
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
      <span className="flex h-[36px] w-[182px] items-center justify-between gap-[56px]" style={{ opacity: 0.7 }}>
        <span className="block shrink-0 whitespace-nowrap transition-transform duration-[950ms] ease-in-out group-hover:translate-x-[calc(182px-100%)] group-focus-visible:translate-x-[calc(182px-100%)] motion-reduce:transition-none">
          next cases
        </span>
        <span className="flex h-[15px] w-[29px] shrink-0 items-center justify-center transition-transform duration-[950ms] ease-in-out group-hover:-translate-x-[153px] group-focus-visible:-translate-x-[153px] motion-reduce:transition-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="15" viewBox="0 0 29 15" fill="none" aria-hidden="true" className="block h-[15px] w-[29px]">
            <path d="M0 7.36377L0 8.36377L28 8.36377V7.36377V6.36377L0 6.36377L0 7.36377ZM28.7071 8.07088C29.0976 7.68035 29.0976 7.04719 28.7071 6.65666L22.3431 0.292702C21.9526 -0.0978227 21.3195 -0.0978227 20.9289 0.292702C20.5384 0.683226 20.5384 1.31639 20.9289 1.70692L26.5858 7.36377L20.9289 13.0206C20.5384 13.4111 20.5384 14.0443 20.9289 14.4348C21.3195 14.8254 21.9526 14.8254 22.3431 14.4348L28.7071 8.07088Z" fill="#3A5F73" />
          </svg>
        </span>
      </span>
      <span aria-hidden="true" className="block h-[2px] w-[182px] shrink-0" style={{ opacity: 0.7, background: '#3A5F73' }} />
    </a>
  )
}
