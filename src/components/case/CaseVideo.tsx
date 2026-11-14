import { useEffect, useRef, useState } from 'react'

type CaseVideoProps = {
  src: string
  poster: string
  label: string
  className: string
}

// Native poster stays visible until a real frame is rendered. Avoid an
// additional <img> layer hiding video when autoplay is delayed or blocked.
export default function CaseVideo({ src, poster, label, className }: CaseVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [needsPlay, setNeedsPlay] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    let disposed = false
    let visible = false
    video.muted = true

    const tryPlay = () => {
      if (!visible || document.hidden) return
      const result = video.play()
      if (result) {
        void result.then(() => {
          if (!disposed) setNeedsPlay(false)
        }).catch(() => {
          if (!disposed) setNeedsPlay(true)
        })
      }
    }

    const observer = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting)
      if (visible) tryPlay()
      else video.pause()
    }, { threshold: 0.01 })

    observer.observe(video)
    const onVisible = () => { if (!document.hidden) tryPlay() }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('pageshow', onVisible)
    return () => {
      disposed = true
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('pageshow', onVisible)
    }
  }, [src])

  const requestPlay = () => {
    const video = ref.current
    if (!video) return
    video.muted = true
    void video.play().then(() => setNeedsPlay(false)).catch(() => setNeedsPlay(true))
  }

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
        preload="metadata"
        onPlaying={() => setNeedsPlay(false)}
        onError={() => setNeedsPlay(true)}
        onClick={needsPlay ? requestPlay : undefined}
        className={className}
      />
      {needsPlay && (
        <button
          type="button"
          onClick={requestPlay}
          aria-label={`Play ${label}`}
          className="absolute bottom-4 left-4 z-10 cursor-pointer rounded-full bg-black/65 px-5 py-2 font-sans text-sm font-medium text-white"
        >
          Play video
        </button>
      )}
    </div>
  )
}
