export type SplitMode = 'chars' | 'words'

export interface SplitResult {
  chars?: HTMLSpanElement[]
  words?: HTMLSpanElement[]
  masks?: HTMLSpanElement[]
}

/**
 * Splits text content of an element into span-wrapped characters or words.
 * Preserves accessibility by setting aria-label on the parent.
 *
 * For word-mask mode, each word is wrapped in an outer span (overflow:hidden)
 * containing an inner span — this enables the classic "word rising from mask" reveal.
 */
export function splitText(el: HTMLElement, mode: SplitMode = 'chars'): HTMLSpanElement[] {
  const text = el.textContent || ''
  el.textContent = ''
  el.setAttribute('aria-label', text)

  if (mode === 'chars') {
    const chars = Array.from(text).map((char) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      el.appendChild(span)
      return span
    })
    return chars
  }

  // words mode — creates mask wrappers for the "rising word" effect
  const wordStrings = text.split(/(\s+)/)
  const innerSpans: HTMLSpanElement[] = []

  wordStrings.forEach((segment) => {
    if (/^\s+$/.test(segment)) {
      // whitespace — append as text node
      el.appendChild(document.createTextNode('\u00A0'))
      return
    }
    const outer = document.createElement('span')
    outer.style.display = 'inline-block'
    outer.style.overflow = 'hidden'
    outer.style.verticalAlign = 'bottom'

    const inner = document.createElement('span')
    inner.textContent = segment
    inner.style.display = 'inline-block'

    outer.appendChild(inner)
    el.appendChild(outer)
    innerSpans.push(inner)
  })

  return innerSpans
}
