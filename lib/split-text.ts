const SPLIT_FLAG = "mpSplit";

/**
 * Wraps every word of an element in a masked span, ready for a
 * "rise from the baseline" reveal.
 *
 * Unlike a naive `textContent` rewrite, this walks the tree and only
 * replaces text nodes - so nested markup (an accented `<em>`, a `<br>`,
 * a link) survives the split intact.
 *
 * The original text is copied onto `aria-label` so assistive tech reads
 * one clean string rather than a pile of word fragments.
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset[SPLIT_FLAG] === "1") {
    return Array.from(el.querySelectorAll<HTMLElement>("[data-split-word]"));
  }

  // Build the label off a clone where <br> counts as a space, so a name
  // broken across two lines doesn't read as "MayankPanchal."
  const clone = el.cloneNode(true) as HTMLElement;
  for (const br of Array.from(clone.querySelectorAll("br"))) {
    br.replaceWith(document.createTextNode(" "));
  }
  const label = (clone.textContent ?? "").replace(/\s+/g, " ").trim();
  if (label) el.setAttribute("aria-label", label);

  const words: HTMLElement[] = [];

  const walk = (node: Node) => {
    // Snapshot first - the loop mutates the child list.
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
        continue;
      }
      if (child.nodeType !== Node.TEXT_NODE) continue;

      const text = child.textContent ?? "";
      if (!text.trim()) continue;

      const frag = document.createDocumentFragment();
      for (const part of text.split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          continue;
        }
        const mask = document.createElement("span");
        mask.className = "mask-word";
        const inner = document.createElement("span");
        inner.style.display = "inline-block";
        inner.dataset.splitWord = "";
        inner.textContent = part;
        mask.appendChild(inner);
        frag.appendChild(mask);
        words.push(inner);
      }
      node.replaceChild(frag, child);
    }
  };

  walk(el);
  el.dataset[SPLIT_FLAG] = "1";
  return words;
}

/** True when the visitor has asked the OS to minimise animation. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
