// The mobile case-study canvases (390px Figma frame) are scaled with
// `scale(calc(min(100vw, 440px) / 390px))`. Dividing one length by another
// (CSS typed arithmetic) is not supported by every WebKit/Safari version; an
// unsupported value is dropped and the 390px canvas would stay unscaled.
// Only in that case, a unitless `--case-scale` is computed here and applied by
// the `[data-case-canvas]` rule in index.css.
export default function installCaseCanvasScale() {
  if (typeof CSS === 'undefined' || CSS.supports('transform', 'scale(calc(2px / 1px))')) return

  const root = document.documentElement
  const update = () => {
    const width = root.clientWidth || window.innerWidth
    root.style.setProperty('--case-scale', String(Math.min(width, 440) / 390))
  }

  update()
  window.addEventListener('resize', update, { passive: true })
  window.addEventListener('orientationchange', update)
}
