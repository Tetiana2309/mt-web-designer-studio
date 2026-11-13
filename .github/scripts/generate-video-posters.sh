#!/usr/bin/env bash
set -euo pipefail

# Generate lightweight video stills so case pages show an image while MP4 buffers.
mkdir -p dist/posters
if ! command -v ffmpeg >/dev/null 2>&1; then
  sudo apt-get update -qq
  sudo apt-get install -y -qq ffmpeg
fi

while IFS='|' read -r input output; do
  # Skip initial black/fade-in frames for these two intros.
  seek=0
  case "$output" in
    eco-natura|beauty-sculpture) seek=1.5 ;;
  esac
  ffmpeg -nostdin -hide_banner -loglevel error -y -ss "$seek" -i "public/videos/$input" \
    -frames:v 1 -vf "scale=1280:-2" -q:v 70 "dist/posters/$output.webp"
  test -s "dist/posters/$output.webp"
done <<'VIDEOS'
Video EcoNature.mp4|eco-natura
Video Capone.mp4|capone
Video VillaBali.mp4|villa-bali
Video Zone.mp4|zone
Video BeautySculpture.mp4|beauty-sculpture
VIDEOS
