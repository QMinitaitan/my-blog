import { mountStatementExamples, statementExamples } from './shared/statement-examples.js';
import { themeStyles } from './shared/theme.js';
import { scrollAreaStyles } from './shared/scroll-area.js';
import { solutionStyles } from './shared/solution-styles.js';
import { loadProblem } from './registry.js';
class AlgorithmCard extends HTMLElement {
 constructor() { super(); this.attachShadow({mode:'open'}); }
 connectedCallback() {
  // 页面过渡可能在同一轮 DOM 操作中移动节点；已挂载实例不重复创建，避免清空刚点击的步骤。
  if (this.controller && !this.controller.signal.aborted) return;
  this.load();
 }
 disconnectedCallback() {
  queueMicrotask(() => {
   if (this.isConnected) return;
   this.controller?.abort(); this.cleanup?.(); this.cleanup=null;
  });
 }
 async load() {
  this.controller?.abort(); this.cleanup?.(); this.cleanup=null;
  const controller = new AbortController(); this.controller=controller;
  const id = this.getAttribute('problem') || '329';
  this.shadowRoot.textContent = '正在加载卡片…';
  try {
   const problem = await loadProblem(id);
   if (controller.signal.aborted) return;
   const codeStyles = this.querySelector('template[data-code-styles]');
   this.shadowRoot.innerHTML = problem.template + (codeStyles?.innerHTML || '') + themeStyles + (this.hasAttribute('article-level') ? solutionStyles + scrollAreaStyles : '');
   this.cleanup = problem.mount(this.shadowRoot, controller.signal);
   if (statementExamples[id]) mountStatementExamples(this.shadowRoot, controller.signal, id);
  } catch (error) {
   if (!controller.signal.aborted) this.shadowRoot.textContent = '卡片加载失败，请刷新重试。';
   console.error('[algorithm-card]', error);
  }
 }
}
if (!customElements.get('algorithm-card')) customElements.define('algorithm-card', AlgorithmCard);
