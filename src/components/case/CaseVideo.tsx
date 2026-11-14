import { useCallback, useEffect, useRef, useState } from 'react'

type CaseVideoProps = {
  src: string
  poster: string
  label: string
  className: string
}

// All five portfolio cases use this exact media renderer. The animation from
// the original film stays visible until real video playback is confirmed by
// advancing media time; onPlaying alone is not proof of moving frames.
export default function CaseVideo({ src, poster, label, className }: CaseVideoProps) {
  const webm = src.replace(/\.mp4(\?.*)?$/i, '.webm$1')
  const animated = poster.replace('/posters/', '/animated/')
  const ref = useRef<HTMLVideoElement>(null)
  const lastTime = useRef<number | null>(null)
  const lastAdvance = useRef(0)
  const [moving, setMoving] = useState(false)
  const [animatedAvailable, setAnimatedAvailable] = useState(true)
  const [showPlay, setShowPlay] = useState(false)

  const start = useCallback(() => {
    const video = ref.current
    if (!video || document.hidden) return
    video.muted = true
    video.defaultMuted = true
    if (!video.paused && !video.ended) return
    void video.play().catch(() => {
      // The animated frames remain visible if the codec is unsupported.
      setMoving(false)
      setShowPlay(true)
    })
  }, [])

  useEffect(() => {
    const video = ref.current
    if (!video) return

    lastTime.current = null
    lastAdvance.current = 0
    setMoving(false)
    setAnimatedAvailable(true)
    setShowPlay(false)

    // Confirm that playback is continuing, not merely that play() resolved.
    const watch = window.setInterval(() => {
      if (document.hidden || !video || video.paused || video.readyState < 2) {
        setMoving(false)
        return
      }
      const now = performance.now()
      const t = video.currentTime
      if (lastTime.current !== null && Math.abs(t - lastTime.current) > 0.10) {
        lastAdvance.current = now
        setMoving(true)
        setShowPlay(false)
      } else if (now - lastAdvance.current > 2000) {
        setMoving(false)
      }
      lastTime.current = t
    }, 350)

    const resume = () => { if (!document.hidden) start() }
    start()
    document.addEventListener('visibilitychange', resume)
    window.addEventListener('pageshow', resume)
    window.addEventListener('focus', resume)
    return () => {
      window.clearInterval(watch)
      document.removeEventListener('visibilitychange', resume)
      window.removeEventListener('pageshow', resume)
      window.removeEventListener('focus', resume)
      video.pause()
    }
  }, [src, start])

  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={animatedAvailable ? animated : poster}
        onError={() => setAnimatedAvailable(false)}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 block h-full w-full object-cover"
      />
      <video
        ref={ref}
        poster={poster}
        aria-label={label}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={start}
        onCanPlay={start}
        onError={() => { setMoving(false); setShowPlay(true) }}
        onWaiting={() => setMoving(false)}
        onStalled={() => setMoving(false)}
        onPause={() => setMoving(false)}
        className={className}
        style={{ opacity: moving ? 1 : 0, transition: 'opacity 180ms ease', pointerEvents: 'none' }}
      >
        <source src={webm} type="video/webm" />
        <source src={src} type="video/mp4" />
      </video>
      {showPlay && !animatedAvailable && (
        <button
          type="button"
          onClick={(event) => { event.stopPropagation(); start() }}
          aria-label={`Play ${label}`}
          className="absolute bottom-4 left-4 z-10 cursor-pointer rounded-full bg-black/65 px-5 py-2 font-sans text-sm font-medium text-white"
        >
          Play video
        </button>
      )}
    </div>
  )
}
