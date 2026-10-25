// iOS Safari tints its status bar and floating toolbar from the page's
// `theme-color` and root background. During the mobile-menu stripe transition
// the viewport is accent blue, so the tint follows it. No-op outside iOS WebKit,
// so other browsers (and their existing behaviour) are untouched.
export const CHROME_CANVAS = '#c7c7c7'
export const CHROME_ACCENT = '#3a5f73'

const isIOSWebKit =
  typeof CSS !== 'undefined' && CSS.supports('-webkit-touch-callout', 'none')

export default function setChromeTint(color: string) {
  if (!isIOSWebKit) return

  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')

  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'theme-color'
    document.head.appendChild(meta)
  }

  meta.content = color

  // The root background is the other source Safari samples. Clearing the inline
  // value falls back to the stylesheet's canvas colour.
  document.documentElement.style.backgroundColor = color === CHROME_CANVAS ? '' : color
}
