import { useEffect, useRef, useState } from 'react'

// TEMPORARY diagnostic page (/#/tint-lab): finds out which mechanism makes
// iOS Safari tint its status bar / toolbar areas blue. Not linked anywhere.
// Remove this file and its route in App.tsx once a solution is chosen.

const CANVAS = '#c7c7c7'
const ACCENT = '#3a5f73'
const DURATION = 3000

type TestId = 'A' | 'B' | 'C' | 'D' | 'E'

const tests: { id: TestId; title: string; detail: string }[] = [
  { id: 'A', title: 'A — body background', detail: 'document.body background → blue' },
  { id: 'B', title: 'B — html background', detail: 'document.documentElement background → blue' },
  {
    id: 'C',
    title: 'C — fixed edge strips',
    detail: 'blue fixed strips (40px) at the top and bottom edges',
  },
  {
    id: 'D',
    title: 'D — blue fixed container',
    detail: 'full-screen fixed element whose own background is blue',
  },
  {
    id: 'E',
    title: 'E — theme-color meta',
    detail: '<meta name="theme-color"> → blue (the failed a87a047 approach)',
  },
]

function themeMeta() {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'theme-color'
    document.head.appendChild(meta)
  }
  return meta
}

function restore() {
  document.body.style.backgroundColor = ''
  document.documentElement.style.backgroundColor = ''
  themeMeta().content = CANVAS
}

export default function TintLab() {
  const [active, setActive] = useState<TestId | null>(null)
  const [remaining, setRemaining] = useState(0)
  const [info, setInfo] = useState('')
  const probeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return

    restore()
    if (active === 'A') document.body.style.backgroundColor = ACCENT
    if (active === 'B') document.documentElement.style.backgroundColor = ACCENT
    if (active === 'E') themeMeta().content = ACCENT

    const end = Date.now() + DURATION
    const tick = window.setInterval(() => setRemaining(Math.max(0, end - Date.now())), 100)
    const stop = window.setTimeout(() => setActive(null), DURATION)

    return () => {
      window.clearInterval(tick)
      window.clearTimeout(stop)
      restore()
    }
  }, [active])

  useEffect(() => {
    const read = () => {
      const probe = probeRef.current
      const style = probe ? getComputedStyle(probe) : null
      const viewport = window.visualViewport
      setInfo(
        [
          `inner ${window.innerWidth}×${window.innerHeight}`,
          `client ${document.documentElement.clientWidth}×${document.documentElement.clientHeight}`,
          viewport
            ? `visual ${Math.round(viewport.width)}×${Math.round(viewport.height)}`
            : 'visual n/a',
          style
            ? `safe T${style.paddingTop} R${style.paddingRight} B${style.paddingBottom} L${style.paddingLeft}`
            : '',
        ].join('  ·  '),
      )
    }

    read()
    window.addEventListener('resize', read)
    return () => window.removeEventListener('resize', read)
  }, [])

  return (
    <main className="relative min-h-dvh font-sans text-ink">
      {/* D: fixed container with its own blue background */}
      {active === 'D' && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
          style={{ backgroundColor: ACCENT }}
        />
      )}

      {/* C: blue strips touching the top and bottom edges */}
      {active === 'C' && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none fixed top-0 right-0 left-0 z-20 h-10"
            style={{ backgroundColor: ACCENT }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none fixed right-0 bottom-0 left-0 z-20 h-10"
            style={{ backgroundColor: ACCENT }}
          />
        </>
      )}

      <div
        ref={probeRef}
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          visibility: 'hidden',
          paddingTop: 'env(safe-area-inset-top)',
          paddingRight: 'env(safe-area-inset-right)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-[440px] flex-col gap-4 px-5 pt-16 pb-28">
        <h1 className="text-[28px] leading-[1.1] font-medium tracking-[-0.03em]">Tint lab</h1>

        <p className="rounded-[10px] bg-white/70 px-4 py-3 text-[18px] leading-[1.2] font-medium">
          {active ? (
            <>
              Active test: <strong>{active}</strong> — {(remaining / 1000).toFixed(1)} s left
            </>
          ) : (
            'Active test: none (gray restored)'
          )}
        </p>

        <p className="text-[14px] leading-[1.3]">
          Tap one button and look at the status-bar area above and the toolbar area below the page.
          Each test lasts 3 seconds and then restores #C7C7C7. Report which tests turn those areas
          blue.
        </p>

        {tests.map(({ id, title, detail }) => (
          <button
            key={id}
            type="button"
            disabled={active !== null}
            onClick={() => {
              setRemaining(DURATION)
              setActive(id)
            }}
            className="rounded-[10px] border border-ink/50 bg-white/70 px-4 py-3 text-left disabled:opacity-50"
          >
            <span className="block text-[18px] leading-[1.2] font-semibold">{title}</span>
            <span className="block text-[14px] leading-[1.3]">{detail}</span>
          </button>
        ))}

        <p className="text-[12px] leading-[1.4] break-words opacity-80">{info}</p>
      </div>
    </main>
  )
}
