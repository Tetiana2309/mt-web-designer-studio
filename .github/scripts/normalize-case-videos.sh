#!/usr/bin/env bash
set -euo pipefail

# Convert case study videos to a broadly supported browser format, and move
# the MP4 index to the front so playback can start before the full download.
mkdir -p dist/videos
for source in public/videos/*.mp4; do
  name="$(basename "$source")"
  target="dist/videos/$name"
  echo "Preparing browser-compatible video: $name"
  ffmpeg -nostdin -hide_banner -loglevel error -y \
    -i "$source" -map 0:v:0 -an \
    -c:v libx264 -preset veryfast -crf 21 -pix_fmt yuv420p \
    -movflags +faststart "$target"
  test -s "$target"
  ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,pix_fmt \
    -of default=noprint_wrappers=1 "$target"
done
