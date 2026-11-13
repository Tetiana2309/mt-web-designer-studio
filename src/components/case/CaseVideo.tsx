import { useState } from 'react'
import type { CSSProperties } from 'react'

type CaseVideoProps = {
  src: string
  poster: string
  label: string
  className: string
}

// Keep the preview visible until the browser actually starts playing.
export default function CaseVideo({ src, poster, label, className }: CaseVideoProps) {
  const [playing, setPlaying] = useState(false)
  const fill: CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%' }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <video
        src={src}
        poster={poster}
        aria-label={label}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={() => setPlaying(true)}
        className={className}
      />
      {!playing && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          draggable={false}
          style={{ ...fill, objectFit: 'cover', pointerEvents: 'none' }}
        />
      )}
    </div>
  )
}
