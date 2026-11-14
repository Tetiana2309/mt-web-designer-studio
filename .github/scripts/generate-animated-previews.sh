#!/usr/bin/env bash
set -euo pipefail

# Real looping motion fallback for browsers that cannot decode video.
# These are animated WebP frames extracted from the SAME five case movies.
# The first frame is still available as the existing poster image.
mkdir -p dist/animated
while IFS='|' read -r input slug; do
  [ -n "$input" ] || continue
  echo "Creating animated preview for $slug"
  ffmpeg -nostdin -hide_banner -loglevel error -y \
    -i "public/videos/$input" -t 6 -an \
    -vf "fps=8,scale=800:-2:flags=lanczos" \
    -c:v libwebp_anim -lossless 0 -quality 58 -loop 0 \
    "dist/animated/$slug.webp"
  test -s "dist/animated/$slug.webp"
done <<'VIDEOS'
Video EcoNature.mp4|eco-natura
Video Capone.mp4|capone
Video VillaBali.mp4|villa-bali
Video Zone.mp4|zone
Video BeautySculpture.mp4|beauty-sculpture
VIDEOS
