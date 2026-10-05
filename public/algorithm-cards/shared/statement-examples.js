import { escapeHtml } from './card-ui.js';

import { statementExamples } from '../problems/statement-examples-data.js';
export { statementExamples };

export function mountStatementExamples(root, signal, id) {
  const examples = statementExamples[id];
  if (!examples?.length) throw new Error(`缺少题目 ${id} 的官方示例`);
  if (root.querySelector('.statement-examples')) return;
  const existing = root.querySelector('.examples');
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `<style>
  .statement-examples{margin:20px 0;border:1px solid var(--line);border-radius:12px;padding:18px;min-height:92px;box-sizing:border-box;cursor:pointer;background:transparent;transition:border-color .15s,background .15s}
  .statement-examples:hover{border-color:var(--active-border);background:var(--soft)}
  .statement-examples:focus-visible{outline:2px solid var(--purple);outline-offset:3px}
  .statement-examples .io-row{display:grid;grid-template-columns:32px minmax(0,1fr);gap:14px;align-items:baseline;line-height:1.9}
  .statement-examples .io-row>span{color:var(--muted);font-size:14px}
  .statement-examples .io-row code{font:13px/1.9 ui-monospace,Consolas,monospace;color:var(--ink);overflow-wrap:anywhere;white-space:pre-wrap}
  @media(max-width:480px){.statement-examples{padding:14px 12px}.statement-examples .io-row{gap:8px;grid-template-columns:28px minmax(0,1fr)}.statement-examples .io-row code{font-size:12px}}
  @media(prefers-reduced-motion:reduce){.statement-examples{transition:none}}
  </style><section class="statement-examples" role="button" tabindex="0" aria-label="切换到下一个题目示例" title="点击切换示例"><div class="statement-content" aria-live="polite" aria-atomic="true"></div></section>`;
  if (existing) existing.replaceWith(...wrapper.childNodes);
  else {
    const problem = root.querySelector('.problem');
    const notes = problem.querySelector('.constraint');
    for(const child of [...wrapper.childNodes]) problem.insertBefore(child, notes);
  }
  const box = root.querySelector('.statement-examples');
  const content = box.querySelector('.statement-content');
  let index = 0;
  function render() {
    const {input,output} = examples[index];
    content.innerHTML = `<div class="io-row"><span>输入</span><code>${escapeHtml(input)}</code></div><div class="io-row"><span>输出</span><code>${escapeHtml(output)}</code></div>`;
  }
  function next() {index=(index+1)%examples.length;render();}
  box.addEventListener('click', next, {signal});
  box.addEventListener('keydown', event => {
    if(event.key==='Enter'||event.key===' ') {event.preventDefault();next();}
  }, {signal});
  render();
}
