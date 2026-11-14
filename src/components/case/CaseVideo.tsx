import { useCallback, useEffect, useRef, useState } from 'react'

type CaseVideoProps = {
  src: string
  poster: string
  label: string
  className: string
}

// A muted case video must begin playing on mount, not only after a scroll
// intersection callback: the GSAP-transformed desktop world can confuse
// viewport observers during first entry and between client-side routes.
export default function CaseVideo({ src, poster, label, className }: CaseVideoProps) {
  const webm = src.replace(/\.mp4(\?.*)?$/i, '.webm$1')
  const animated = poster.replace('/posters/', '/animated/')
  const ref = useRef<HTMLVideoElement>(null)
  const [needsPlay, setNeedsPlay] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [animatedAvailable, setAnimatedAvailable] = useState(true)

  const start = useCallback(() => {
    const video = ref.current
    if (!video || document.hidden || !video.paused && !video.ended) return
    video.muted = true
    video.defaultMuted = true
    const promise = video.play()
    if (promise) {
      void promise.then(() => setNeedsPlay(false)).catch(() => setNeedsPlay(true))
    }
  }, [])

  useEffect(() => {
    const video = ref.current
    if (!video) return
    setPlaying(false)
    // Direct, eager attempt as soon as the component mounts. Browsers can
    // temporarily delay play() until metadata arrives: retry on canplay below.
    start()
    const resume = () => { if (!document.hidden) start() }
    document.addEventListener('visibilitychange', resume)
    window.addEventListener('pageshow', resume)
    window.addEventListener('focus', resume)
    return () => {
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
        className="absolute inset-0 block h-full w-full object-cover"
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
        onPlaying={() => { setNeedsPlay(false); setPlaying(true) }}
        onPause={() => setPlaying(false)}
        onError={() => { setNeedsPlay(true); setPlaying(false) }}
        className={className}
        style={{ opacity: playing ? 1 : 0, transition: "opacity 180ms ease" }}
      >
        <source src={webm} type="video/webm" />
        <source src={src} type="video/mp4" />
      </video>
      {needsPlay && !animatedAvailable && (
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
