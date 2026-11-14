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
  const ref = useRef<HTMLVideoElement>(null)
  const [needsPlay, setNeedsPlay] = useState(false)

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
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={label}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={start}
        onCanPlay={start}
        onPlaying={() => setNeedsPlay(false)}
        onError={() => setNeedsPlay(true)}
        className={className}
      />
      {needsPlay && (
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
