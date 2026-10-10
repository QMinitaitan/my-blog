/** A card owns only the next divider in its own section, never a later card's line. */
export function mountProblemDivider(host, signal, collapse) {
  let divider = host.nextElementSibling;
  while (divider && !divider.matches('.problem-divider')) {
    if (divider.matches('algorithm-card')) return { setOpen() {} };
    divider = divider.nextElementSibling;
  }
  if (!divider) return { setOpen() {} };
  let open = false;
  function setOpen(value) {
    open = value;
    divider.setAttribute('role', open ? 'button' : 'separator');
    divider.setAttribute('aria-label', open ? '收起本题解答' : '题目分隔');
    if (open) {
      divider.setAttribute('data-collapse-active', '');
      divider.setAttribute('tabindex', '0');
    } else {
      divider.removeAttribute('data-collapse-active');
      divider.removeAttribute('tabindex');
    }
  }
  divider.addEventListener('click', () => { if (open) collapse(); }, { signal });
  divider.addEventListener('keydown', event => {
    if (!open || !['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    if (!event.repeat) collapse();
  }, { signal });
  signal.addEventListener('abort', () => setOpen(false), { once: true });
  return { setOpen };
}
