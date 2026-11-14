#!/usr/bin/env bash
set -euo pipefail

# MP4/H.264 is not decodable in every browser environment. Offer WebM/VP9
# as first choice and retain MP4 for Safari and older implementations.
for input in dist/videos/*.mp4; do
  output="${input%.mp4}.webm"
  echo "Encoding WebM fallback: $(basename "$output")"
  ffmpeg -nostdin -hide_banner -loglevel error -y \
    -i "$input" -map 0:v:0 -an \
    -c:v libvpx-vp9 -deadline realtime -cpu-used 6 -threads 4 \
    -b:v 0 -crf 34 -pix_fmt yuv420p -row-mt 1 \
    -vf "scale='min(1600,iw)':-2" "$output"
  test -s "$output"
  ffprobe -v error -select_streams v:0 -show_entries stream=codec_name \
    -of default=noprint_wrappers=1 "$output"
done
