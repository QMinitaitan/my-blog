export const solutionStyles = `<style>
:host([article-level]) .modern .problem p {margin:12px 0 16px}
:host([article-level][compact]) .modern .original-row {margin:12px 0 0;padding:0;line-height:1.65}
:host([article-level][compact]) .modern .solution {margin-top:11.5px}
/* 用叠加线改变粗细，不改变 1px 边框占位与分隔线中心。 */
:host([article-level]) .modern .solution {position:relative}
:host([article-level]) .modern .solution::before {
 content:'';position:absolute;left:0;right:0;top:-2.5px;height:4px;
 background:#a78bfa;pointer-events:none;transform:scaleY(.25);transform-origin:center;
 transition:transform .22s cubic-bezier(.2,.7,.3,1);
}
:host([article-level][data-solution-open="true"][data-reveal-active]) .modern .solution::before {transform:scaleY(1)}
@media(prefers-reduced-motion:reduce){:host([article-level]) .modern .solution::before {transition:none}}
:host([article-level]) .modern .view-heading {border:0;margin-top:12px;margin-bottom:12px}
/* B2: separate status reading from step actions without changing the controls. */
:host([article-level]) .modern .reading-area {margin-bottom:20px}
:host([article-level]) .modern .view-switch button {min-height:30px;padding:4px 2px;font-size:13px}
:host([article-level]) .modern #animation-view {
 background:var(--codeblock-bg);border-radius:8px;overflow:hidden;
 --ink:#d7dce5;--muted:#939aa7;--green:#8acfa1;
}
:host([article-level]) .modern .animation {padding:12px 14px;min-height:0}
:host([article-level]) .modern .stage {margin:0 0 6px;font-size:12px}
:host([article-level]) .modern .array-row {margin:4px 0 10px;gap:8px}
:host([article-level]) .modern .array-item {min-width:40px}
:host([article-level]) .modern .array-value {min-height:38px;font-size:17px}
:host([article-level]) .modern .hash-caption {margin:0 0 4px;font-size:12px}
:host([article-level]) .modern .hash-map {min-height:24px;gap:6px}
:host([article-level]) .modern .empty-map {font-size:12px}
:host([article-level]) .modern .legend {margin-top:6px!important;padding-top:0;font-size:11px}
:host([article-level]) .modern .array-value {
 background:#ffffff05;border-color:#ffffff18;color:#d7dce5;
}
:host([article-level]) .modern .array-item.current .array-value {
 background:color-mix(in oklch,var(--codeblock-bg) 78%,var(--primary));
 border-color:var(--primary);color:#e7dbff;
}
:host([article-level]) .modern .array-item.answer .array-value {
 background:#8acfa118;border-color:#8acfa1;color:#8acfa1;
}
:host([article-level]) .modern .hash-map .map-entry {background:#ffffff06;border-color:#ffffff18;color:#d7dce5}
:host([article-level]) .modern .hash-map .match {background:#8acfa118;border-color:#8acfa1}
:host([article-level]) .modern .shared-step {
 margin:0;padding:5px 12px 4px;background:var(--codeblock-bg);
 border-radius:0;color:#e5c890;font:12px/1.6 ui-monospace,Consolas,monospace;min-height:0;overflow-wrap:anywhere;
}
:host([article-level]) .modern .shared-step::before {
 content:'>>> ';display:inline;color:#c6a0f6;font-size:12px;margin:0;
}
:host([article-level]) .modern .workbench {
 border:0;padding:4px 12px 9px;background:var(--codeblock-bg);border-radius:0 0 8px 8px;margin-bottom:8px;
 --ink:#d7dce5;--muted:#939aa7;
}
:host([article-level]) .modern .workbench h4 {
 display:none;
}
:host([article-level]) .modern .work-vars {grid-template-columns:repeat(3,minmax(0,1fr));gap:2px 14px;margin-bottom:5px}
:host([article-level]) .modern .work-var,
:host([article-level]) .modern .work-var.changed {
 display:grid;grid-template-columns:auto minmax(0,1fr);align-items:baseline;gap:6px;padding:1px 0;
}
:host([article-level]) .modern .work-var dt {color:#8aadf4;font-size:12px}
:host([article-level]) .modern .work-var dt::before {content:none}
:host([article-level]) .modern .work-var dt::after {content:'=';color:#657082}
:host([article-level]) .modern .work-var dt small {display:none}
:host([article-level]) .modern .work-var dd {margin:0;color:#f5a97f;font-size:12px;text-align:left}
:host([article-level]) .modern .work-var.changed dd {color:#a6da95}
:host([article-level]) .modern .work-var.unset dd {color:#657082}
:host([article-level]) .modern .work-var .map-entry {background:transparent;padding:0}
:host([article-level]) .modern .work-var .map-entry b {color:#f5a97f;font-weight:400}
:host([article-level]) .modern .work-var .map-entry em {color:#657082}
:host([article-level]) .modern .work-var.changed .map-entry,
:host([article-level]) .modern .work-var.changed .map-entry b {color:#a6da95}
:host([article-level]) .modern .metrics {border:0;padding-top:4px;color:#939aa7;font:12px/1.8 ui-monospace,Consolas,monospace}
:host([article-level]) .modern .metric code {color:#b9c0cc;font-size:12px}
:host([article-level]) .modern .controls {border:0;padding:0 0 12px;display:flex;align-items:center;gap:12px}
:host([article-level]) .modern .step-buttons {gap:6px;flex:none}
:host([article-level]) .modern .step-buttons button {min-width:0;min-height:28px;padding:4px 8px;font-size:12px}
:host([article-level]) .modern .progress-row {flex:1;min-width:0;margin:0;gap:6px;order:1}
:host([article-level]) .modern .step-count {min-width:34px;font-size:11px}
.terminal-head{display:flex;align-items:center;gap:8px;margin-top:8px;padding:5px 12px;background:var(--codeblock-bg);border-radius:8px 8px 0 0;color:#8993a2;font:11px/1.6 ui-monospace,Consolas,monospace}
.terminal-head strong{font-weight:500;color:#c6a0f6}
:host([article-level]) .modern .work-var dd{
 min-width:0;max-width:100%;max-height:64px;overflow:auto;overflow-wrap:anywhere;
 scrollbar-width:thin;scrollbar-color:#ffffff30 transparent;color-scheme:dark;
}
.reading-area.code-focused>.terminal-head{visibility:hidden;pointer-events:none}
@media(max-width:480px){
 :host([article-level]) .modern .work-vars {grid-template-columns:1fr;gap:2px 10px}
 :host([article-level]) .modern .controls {display:block}
 :host([article-level]) .modern .progress-row {width:100%;margin-bottom:8px}
 :host([article-level]) .modern .progress {min-width:0}
 :host([article-level]) .modern .step-buttons {width:100%;flex-wrap:wrap}
}
</style>`;
