// Shared blog tokens pass through Shadow DOM and update with the site theme.
export const themeStyles = `<style>
:host{
 --bg:var(--card-bg);--panel:var(--card-bg);--ink:var(--body-text);--muted:var(--muted-text);
 --line:var(--line-divider);--purple:var(--primary);--green:var(--success-text);--code:var(--codeblock-bg);
 --soft:color-mix(in oklch,var(--card-bg) 96%,var(--primary));
 --active:color-mix(in oklch,var(--card-bg) 86%,var(--primary));
 --active-border:color-mix(in oklch,var(--primary) 42%,var(--card-bg));
 --success-soft:color-mix(in oklch,var(--card-bg) 92%,var(--success-text));
 color-scheme:inherit;color:var(--ink);font-family:inherit;background:transparent;margin:1.5rem 0;
}
.card{background:transparent;border:0;border-radius:0;box-shadow:none;color:var(--ink)}
h2,h3,.workbench h4,.title h2{color:var(--ink)}
button{background:var(--btn-regular-bg);border-color:transparent;color:var(--btn-content);border-radius:8px;transition:background .15s,color .15s}
button:hover{background:var(--btn-regular-bg-hover)}button:active{background:var(--btn-regular-bg-active)}
.primary{background:var(--btn-content);color:var(--card-bg);border-color:transparent}.primary:hover{background:color-mix(in oklch,var(--btn-content) 88%,var(--body-text))}
a,.stage,.line-status,.original-cue,.original-cue:hover{color:var(--btn-content)}
.badge{background:var(--btn-regular-bg);color:var(--btn-content)}
.badge.difficulty.easy{background:var(--algorithm-easy-bg);color:var(--algorithm-easy-text)}
.badge.difficulty.medium{background:var(--algorithm-medium-bg);color:var(--algorithm-medium-text)}
.badge.difficulty.hard{background:var(--algorithm-hard-bg);color:var(--algorithm-hard-text)}
.badge.topic{background:color-mix(in srgb,var(--topic-color) 12%,transparent);color:var(--topic-color)}
.badge.topic[data-topic="0-1-knapsack"]{--topic-color:var(--algorithm-topic-0-1-knapsack)}
.badge.topic[data-topic="algorithm-x"]{--topic-color:var(--algorithm-topic-algorithm-x)}
.badge.topic[data-topic="array"]{--topic-color:var(--algorithm-topic-array)}
.badge.topic[data-topic="backtracking"]{--topic-color:var(--algorithm-topic-backtracking)}
.badge.topic[data-topic="binary-lifting"]{--topic-color:var(--algorithm-topic-binary-lifting)}
.badge.topic[data-topic="binary-search"]{--topic-color:var(--algorithm-topic-binary-search)}
.badge.topic[data-topic="binary-search-tree"]{--topic-color:var(--algorithm-topic-binary-search-tree)}
.badge.topic[data-topic="binary-tree"]{--topic-color:var(--algorithm-topic-binary-tree)}
.badge.topic[data-topic="bit-manipulation"]{--topic-color:var(--algorithm-topic-bit-manipulation)}
.badge.topic[data-topic="boyer-moore-majority-vote-algorithm"]{--topic-color:var(--algorithm-topic-boyer-moore-majority-vote-algorithm)}
.badge.topic[data-topic="bracket-sequences"]{--topic-color:var(--algorithm-topic-bracket-sequences)}
.badge.topic[data-topic="breadth-first-search"]{--topic-color:var(--algorithm-topic-breadth-first-search)}
.badge.topic[data-topic="bubble-sort"]{--topic-color:var(--algorithm-topic-bubble-sort)}
.badge.topic[data-topic="bucket-sort"]{--topic-color:var(--algorithm-topic-bucket-sort)}
.badge.topic[data-topic="combinatorics"]{--topic-color:var(--algorithm-topic-combinatorics)}
.badge.topic[data-topic="complete-knapsack"]{--topic-color:var(--algorithm-topic-complete-knapsack)}
.badge.topic[data-topic="counting"]{--topic-color:var(--algorithm-topic-counting)}
.badge.topic[data-topic="data-stream"]{--topic-color:var(--algorithm-topic-data-stream)}
.badge.topic[data-topic="depth-first-search"]{--topic-color:var(--algorithm-topic-depth-first-search)}
.badge.topic[data-topic="design"]{--topic-color:var(--algorithm-topic-design)}
.badge.topic[data-topic="directed-acyclic-graph"]{--topic-color:var(--algorithm-topic-directed-acyclic-graph)}
.badge.topic[data-topic="divide-and-conquer"]{--topic-color:var(--algorithm-topic-divide-and-conquer)}
.badge.topic[data-topic="doubly-linked-list"]{--topic-color:var(--algorithm-topic-doubly-linked-list)}
.badge.topic[data-topic="dp-on-trees"]{--topic-color:var(--algorithm-topic-dp-on-trees)}
.badge.topic[data-topic="dynamic-programming"]{--topic-color:var(--algorithm-topic-dynamic-programming)}
.badge.topic[data-topic="floyds-cycle-finding-algorithm"]{--topic-color:var(--algorithm-topic-floyds-cycle-finding-algorithm)}
.badge.topic[data-topic="graph"]{--topic-color:var(--algorithm-topic-graph)}
.badge.topic[data-topic="greedy"]{--topic-color:var(--algorithm-topic-greedy)}
.badge.topic[data-topic="hash-table"]{--topic-color:var(--algorithm-topic-hash-table)}
.badge.topic[data-topic="heap-priority-queue"]{--topic-color:var(--algorithm-topic-heap-priority-queue)}
.badge.topic[data-topic="knapsack-problem"]{--topic-color:var(--algorithm-topic-knapsack-problem)}
.badge.topic[data-topic="linked-list"]{--topic-color:var(--algorithm-topic-linked-list)}
.badge.topic[data-topic="longest-common-subsequence"]{--topic-color:var(--algorithm-topic-longest-common-subsequence)}
.badge.topic[data-topic="longest-increasing-subsequence"]{--topic-color:var(--algorithm-topic-longest-increasing-subsequence)}
.badge.topic[data-topic="lowest-common-ancestor"]{--topic-color:var(--algorithm-topic-lowest-common-ancestor)}
.badge.topic[data-topic="manacher"]{--topic-color:var(--algorithm-topic-manacher)}
.badge.topic[data-topic="math"]{--topic-color:var(--algorithm-topic-math)}
.badge.topic[data-topic="matrix"]{--topic-color:var(--algorithm-topic-matrix)}
.badge.topic[data-topic="memoization"]{--topic-color:var(--algorithm-topic-memoization)}
.badge.topic[data-topic="merge-sort"]{--topic-color:var(--algorithm-topic-merge-sort)}
.badge.topic[data-topic="monotonic-queue"]{--topic-color:var(--algorithm-topic-monotonic-queue)}
.badge.topic[data-topic="monotonic-stack"]{--topic-color:var(--algorithm-topic-monotonic-stack)}
.badge.topic[data-topic="pigeonhole-principle"]{--topic-color:var(--algorithm-topic-pigeonhole-principle)}
.badge.topic[data-topic="prefix-sum"]{--topic-color:var(--algorithm-topic-prefix-sum)}
.badge.topic[data-topic="queue"]{--topic-color:var(--algorithm-topic-queue)}
.badge.topic[data-topic="quickselect"]{--topic-color:var(--algorithm-topic-quickselect)}
.badge.topic[data-topic="quicksort"]{--topic-color:var(--algorithm-topic-quicksort)}
.badge.topic[data-topic="range-minimum-maximum-query"]{--topic-color:var(--algorithm-topic-range-minimum-maximum-query)}
.badge.topic[data-topic="recursion"]{--topic-color:var(--algorithm-topic-recursion)}
.badge.topic[data-topic="simulation"]{--topic-color:var(--algorithm-topic-simulation)}
.badge.topic[data-topic="sliding-window"]{--topic-color:var(--algorithm-topic-sliding-window)}
.badge.topic[data-topic="sorting"]{--topic-color:var(--algorithm-topic-sorting)}
.badge.topic[data-topic="stack"]{--topic-color:var(--algorithm-topic-stack)}
.badge.topic[data-topic="string"]{--topic-color:var(--algorithm-topic-string)}
.badge.topic[data-topic="topological-sort"]{--topic-color:var(--algorithm-topic-topological-sort)}
.badge.topic[data-topic="tournament-sort"]{--topic-color:var(--algorithm-topic-tournament-sort)}
.badge.topic[data-topic="tree"]{--topic-color:var(--algorithm-topic-tree)}
.badge.topic[data-topic="trie"]{--topic-color:var(--algorithm-topic-trie)}
.badge.topic[data-topic="two-pointers"]{--topic-color:var(--algorithm-topic-two-pointers)}
.badge.topic[data-topic="union-find"]{--topic-color:var(--algorithm-topic-union-find)}
.easy{background:var(--success-soft);color:var(--green)}.hard{background:color-mix(in oklch,var(--card-bg) 90%,var(--admonitions-color-caution));color:var(--body-text)}
.inline{background:var(--inline-code-bg);color:var(--inline-code-color)}
.examples{background:var(--card-bg);color:var(--ink);border:1px solid var(--line)}
.reveal{justify-content:flex-start}
.constraint,.reveal small,.step-count,.matrix-title,.hash-caption,.index,.legend,.metric span{color:var(--muted)}
.thought,.shared-step,.step-desc{color:var(--ink)}
.workbench{padding:18px 20px 16px;margin:0 28px 18px;border:0;border-radius:14px;background:color-mix(in oklch,var(--card-bg) 92%,var(--primary))}
.workbench h4{display:flex;align-items:center;gap:10px;font-size:15px;font-weight:600;margin:0 0 16px}
.workbench h4::before{content:none}
.work-vars{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px 24px;margin:0 0 16px}
.work-var,.work-var.changed{display:block;min-width:0;padding:0;background:transparent;border:0;border-radius:0;box-shadow:none}
.work-var dt{display:flex;flex-wrap:wrap;align-items:baseline;gap:3px 8px;color:var(--muted);font:13px/1.6 ui-monospace,Consolas,monospace}
.work-var dt small{font:12px/1.6 system-ui;color:var(--muted)}
.work-var dd{display:block;font:500 19px/1.5 ui-monospace,Consolas,monospace;color:var(--ink);margin:3px 0 0;white-space:normal;overflow-wrap:anywhere}
.work-var.changed dd{color:var(--btn-content)}.work-var.unset dd,.empty-map{color:var(--muted)}
.work-var.wide{grid-column:1/-1}.work-var.wide dd{display:flex;flex-wrap:wrap;gap:7px;font-size:14px}
.metrics{display:flex;flex-wrap:wrap;gap:8px 28px;border-top:1px solid var(--line);padding-top:12px}
.metric{border:0;padding:0;gap:8px}.metric code{color:var(--ink)}
.map-entry,.hash-map .map-entry{background:var(--soft);border-color:var(--line);color:var(--ink)}.map-entry b{color:var(--btn-content)}.map-entry em{color:var(--muted)}
.hash-map .match{background:var(--success-soft);border-color:var(--green)}
.array-value,.square,.cell{background:var(--card-bg);border-color:var(--line);color:var(--ink)}
.array-item.current .array-value,.square.path,.square.current,.cell.write{background:var(--active);border-color:var(--active-border);color:var(--btn-content)}
.array-item.answer .array-value,.square.cached,.cell.read{background:var(--success-soft);border-color:var(--green);color:var(--green)}
.view-switch{background:var(--card-bg);border-color:var(--line)}.controls .view-switch button{color:var(--muted)}
.controls .view-switch button[aria-selected=true]{background:var(--btn-regular-bg);color:var(--btn-content)}
.controls .example-select{background:var(--card-bg);color:var(--ink);border-color:var(--line)}
.code-view,.code-view .code-scroll,.code-head{background:var(--codeblock-bg);color:#e6edf3}
.code-tools{background:var(--codeblock-bg)}.code-tools button,.language-label{color:#b7c2d7}.code-tools button:hover,.code-tools button[aria-pressed=true]{background:color-mix(in oklch,var(--codeblock-bg) 80%,var(--primary));color:#f0e8fa}
.code-line.active{background:color-mix(in oklch,var(--codeblock-bg) 82%,var(--primary));border-left-color:var(--primary)}
.code-view .code-scroll{scrollbar-color:color-mix(in oklch,var(--codeblock-bg) 75%,var(--primary)) transparent}
.progress::-webkit-slider-runnable-track{background:linear-gradient(to right,var(--primary) 0 var(--progress),var(--line) var(--progress) 100%)}
.progress::-webkit-slider-thumb{background:var(--primary);box-shadow:0 0 0 3px color-mix(in oklch,var(--primary) 12%,transparent)}
.progress::-moz-range-track{background:var(--line)}.progress::-moz-range-progress,.progress::-moz-range-thumb{background:var(--primary)}
.legend b{color:var(--btn-content)}.legend em,.result{color:var(--green)}
.original-row,.original-row:hover{background:transparent;color:var(--muted)}
@media(max-width:760px){.workbench{margin:0 20px 16px;padding:16px}.work-vars{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.work-var dd{font-size:18px}}
@media(prefers-reduced-motion:reduce){button{transition:none}}
.modern{
 --ink:var(--body-text);--muted:var(--muted-text);--line:var(--line-divider);--green:var(--success-text);
 --soft:color-mix(in oklch,var(--card-bg) 96%,var(--primary));
 --active:color-mix(in oklch,var(--card-bg) 86%,var(--primary));--success-soft:color-mix(in oklch,var(--card-bg) 92%,var(--green));
 color-scheme:inherit;background:transparent;color:var(--ink)
}
.modern .sample-bar{display:grid;grid-template-columns:minmax(0,1fr);align-items:center;gap:12px;padding:20px 28px 0;font-size:13px}
.modern select{font:inherit;font-size:13px;line-height:1.5;min-width:0;max-width:100%;color:var(--ink);background:var(--card-bg);border:1px solid var(--line);border-radius:8px;padding:9px 30px 9px 12px;cursor:pointer}
.modern select:focus-visible{outline:2px solid var(--primary);outline-offset:3px}
.modern .view-heading{margin:20px 28px 12px;border-bottom:1px solid var(--line)}
.modern .view-switch{border:0;background:transparent;padding:0;border-radius:0;gap:20px}
.modern .view-switch button{background:transparent;border:0;border-bottom:2px solid transparent;border-radius:0;padding:9px 2px;min-height:40px;color:var(--muted);font-size:14px}
.modern .view-switch button[aria-selected=true]{background:transparent;border-bottom-color:var(--primary);color:var(--btn-content)}
.modern .code-view{height:auto;display:block;position:relative;margin:0 28px;background:var(--codeblock-bg);border:0;border-radius:12px;overflow:hidden}
.modern .code-tools{position:relative;inset:auto;z-index:2;display:flex;align-items:center;min-height:42px;padding:6px 12px;border:0;border-bottom:1px solid #ffffff0d;border-radius:0;background:var(--codeblock-bg);gap:6px}
.modern .code-tools select{padding:5px 28px 5px 8px;border:0;background:transparent;color:#abb2bf}
.modern .code-tools button{display:flex;gap:7px;align-items:center;justify-content:center;opacity:1;width:30px;height:30px;padding:5px;color:#a6adba;white-space:nowrap;font-size:12px;border:0;border-radius:8px;background:transparent}
.modern .code-tools button:hover,.modern .code-tools button[aria-pressed=true]{background:color-mix(in oklch,var(--codeblock-bg) 80%,var(--primary));color:#e6edf3}
.modern .code-tools button:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
.modern #code-block{min-width:0}
 .modern .code-scroll{display:block;box-sizing:border-box;max-height:400px;min-height:180px;padding:8px 0 20px;margin:0;overflow:auto;background:var(--codeblock-bg)!important;color:#e6edf3;border:0;border-radius:0;scrollbar-width:thin;scrollbar-color:#ffffff20 transparent}
.modern .code-scroll:not([data-language]) code{display:flex;flex-direction:column;font:14px/24px 'JetBrains Mono Variable',ui-monospace,Consolas,monospace;white-space:normal}
.modern #code-block .expressive-code{margin:0}
.modern #code-block .expressive-code pre>code{padding-block:0}
.modern #code-block .frame{border:0;box-shadow:none}
.modern #code-block .ec-line.active{background:color-mix(in oklch,var(--codeblock-bg) 88%,var(--primary));box-shadow:inset 3px 0 var(--primary)}
.modern #code-block .ec-line.active .gutter{color:color-mix(in oklch,var(--primary) 70%,#e6edf3)}
.modern .code-line{display:block;box-sizing:border-box;border-left:3px solid transparent;min-width:max-content;padding:0 24px 0 0;font:inherit;white-space:pre}
.modern .code-line::before{content:attr(data-line);display:inline-block;box-sizing:border-box;width:48px;text-align:right;padding-right:14px;margin-right:18px;border-right:1px solid #ffffff0d;color:#ffffff30;user-select:none}
.modern .code-line.active{background:color-mix(in oklch,var(--codeblock-bg) 88%,var(--primary));border-left-color:var(--primary)}
.modern .code-line.active::before{color:color-mix(in oklch,var(--primary) 70%,#e6edf3)}
.modern .animation{padding:12px 28px;min-height:210px}
.modern .array-row{align-items:center;margin:8px 0 20px}
.modern .array-value{padding:0 10px;font-size:19px}
.modern .array-gap{color:var(--muted);align-self:center}
.modern .shared-step{min-height:24px;margin:12px 28px 18px;color:var(--muted);font-size:13px}
.modern .workbench{background:color-mix(in oklch,var(--card-bg) 94%,var(--primary));border:0}
.modern .workbench h4{font-size:14px}
.modern .work-var dd{font-size:18px}
.modern .metrics{font-size:13px}
.modern .controls{display:block;padding:0 28px 24px}
.modern .progress-row{display:flex;align-items:center;gap:16px;margin:2px 0 16px}
.modern .progress{display:block;flex:1;min-width:0;max-width:100%;height:18px;margin:0;order:0}
.modern .step-count{font:12px/1.5 ui-monospace,Consolas,monospace;min-width:48px;text-align:right}
.modern .step-buttons{display:flex;justify-content:flex-start;gap:10px}
.modern .step-buttons button{min-width:110px;font-size:13px}
.modern .step-buttons #prev{background:transparent;border:1px solid var(--line);color:var(--ink)}
.modern .work-var .map-entry{display:inline-flex;align-items:center;gap:8px;margin:0;padding:5px 10px;font:14px/1.5 ui-monospace,Consolas,monospace;color:var(--ink)}
.modern .work-var .map-entry b{font-weight:500}.modern .work-var .map-entry em{font-style:normal}
.modern .card-dropdown{min-width:0;position:relative}
.modern .dropdown-trigger{display:flex;align-items:center;justify-content:space-between;gap:14px;width:100%;min-height:38px;padding:8px 12px;border:1px solid var(--line);border-radius:8px;background:var(--soft);color:var(--ink);font:inherit;text-align:left}
.modern .dropdown-trigger::after{content:'';width:7px;height:7px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;transform:rotate(45deg);margin:0 3px 4px 10px;flex:none;opacity:.65}
.modern .sample-bar .dropdown-trigger{white-space:normal;overflow-wrap:anywhere;line-height:1.8}
.modern .dropdown-trigger:hover,.modern .dropdown-trigger[aria-expanded=true]{background:var(--btn-regular-bg);border-color:color-mix(in oklch,var(--primary) 35%,var(--card-bg))}
.modern .dropdown-trigger:focus-visible{outline:2px solid color-mix(in oklch,var(--primary) 70%,transparent);outline-offset:2px}
.modern .dropdown-menu{position:fixed;inset:auto;margin:0;padding:6px;border:1px solid var(--line);border-radius:10px;background:var(--card-bg);color:var(--ink);box-shadow:0 8px 28px #0003;overflow-y:auto;overscroll-behavior:contain;font:13px/1.5 system-ui;scrollbar-width:thin}
.modern .dropdown-menu::backdrop{background:transparent}
.modern #example-select-menu{position:static;width:auto;max-height:none;margin-top:6px;overflow:visible;box-shadow:none}
.modern .dropdown-menu button{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;height:auto;min-height:36px;padding:8px 10px;border:0;border-radius:6px;background:transparent;color:var(--ink);font:inherit;text-align:left;white-space:normal}
.modern .dropdown-menu button:hover,.modern .dropdown-menu button:focus-visible{background:var(--btn-regular-bg-hover);outline:0;color:var(--btn-content)}
.modern .dropdown-menu button[aria-selected=true]{background:var(--btn-regular-bg);color:var(--btn-content)}
.modern .dropdown-menu button[aria-selected=true]::after{content:'✓';flex:none}
.modern .code-tools>.card-dropdown{width:auto;max-width:none;margin-right:auto}
.modern .code-tools .dropdown-trigger{width:auto;height:30px;min-height:30px;border:0;background:transparent;padding:4px 6px;gap:4px;font:12px/20px 'JetBrains Mono Variable',ui-monospace,monospace;color:#b7c2d7}
.modern .code-tools .dropdown-trigger::after{width:5px;height:5px;margin-left:5px;margin-right:1px}
.modern .code-tools .dropdown-trigger:hover,.modern .code-tools .dropdown-trigger[aria-expanded=true]{background:color-mix(in oklch,var(--codeblock-bg) 74%,var(--primary));color:#e6edf3}
.modern .code-tools .dropdown-menu button{color:var(--ink);height:auto;opacity:1}
.modern .code-tools .dropdown-menu button[aria-selected=true],.modern .code-tools .dropdown-menu button:hover,.modern .code-tools .dropdown-menu button:focus-visible{color:var(--btn-content)}
.modern .reading-area{position:relative}
.modern .surface-slot,.modern .view-surface{height:auto;min-height:0;margin:0}
.modern .reading-area.code-focused>.surface-slot>.view-surface{position:absolute;inset:0;height:100%;z-index:3}
.modern .reading-area.code-focused .code-view{height:100%;display:flex;flex-direction:column}
.modern .reading-area.code-focused #code-block{flex:1;min-height:0;overflow:hidden}
.modern .reading-area.code-focused #code-block .expressive-code,.modern .reading-area.code-focused #code-block .frame{height:100%;margin:0}
.modern .reading-area.code-focused .code-scroll{height:100%;max-height:none;min-height:0}
.modern .reading-area.code-focused>.shared-step,.modern .reading-area.code-focused>.workbench{visibility:hidden;pointer-events:none}
@media(max-width:760px){
 .modern .sample-bar{padding:16px 20px 0;gap:10px}
 .modern .view-heading{margin:16px 20px 10px}.modern .code-view{margin:0 20px}
 .modern .code-scroll{max-height:340px}.modern .code-scroll:not([data-language]) code{font-size:12px}.modern #code-block .expressive-code{--ec-codeFontSize:12px}.modern .code-line::before{width:36px;padding-right:10px;margin-right:12px}
 .modern .animation{padding:10px 20px}.modern .shared-step{margin:12px 20px 16px}.modern .controls{padding:0 20px 20px}.modern .progress{flex-basis:auto;margin-top:0}
}
/* Article headings own the question title; content shares the prose width. */
:host([article-level]) .problem{padding:0}
:host([article-level]) .title h2{display:none}
:host([article-level]) .modern .sample-bar,
:host([article-level]) .modern .animation,
:host([article-level]) .modern .controls{padding-inline:0}
:host([article-level]) .modern .view-heading,
:host([article-level]) .modern .code-view,
:host([article-level]) .modern .shared-step,
:host([article-level]) .modern .workbench{margin-inline:0}
/* Every card: quiet algorithm notes on the left, a low-key text toggle on the right. */
.original-row {
 display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:baseline;
 gap:16px;font-size:14px;line-height:1.8;
}
/* 紧凑模式：收紧题干备注与“展开解答”这一栏的留白，默认对所有算法卡片生效。 */
:host([compact]) {margin-bottom:10px}
:host([article-level][compact]) {margin-bottom:0}
:host([compact]) .original-row {
 margin:8px 0 0;padding:4px 0;line-height:1.55;
}
:host([compact]) #reveal.original-cue {align-self:end}
.problem-notes {min-width:0;overflow-wrap:anywhere}
.problem-notes>span {display:block}
.original-row:has(#reveal[aria-expanded="false"]) {
 margin-bottom:0;
}
#reveal.original-cue {
 background:transparent;border:0;padding:0;border-radius:3px;
 color:var(--primary);font:inherit;font-weight:400;
 line-height:inherit;min-height:0;text-decoration:none;
 transition:color .22s ease;
}
#reveal.original-cue:is(:hover,:focus-visible,:active) {
 background:transparent;color:var(--muted-text);text-decoration:none;
}
#reveal.original-cue:focus-visible {
 outline:2px solid var(--primary);outline-offset:4px;
}
@media(prefers-reduced-motion:reduce) {
 #reveal.original-cue {transition:none}
}
:host([article-level]) .solution {
 border-top:1px solid #a78bfa;
}
.thought {padding:20px 28px 0;margin:0 0 14px;font-size:14px;line-height:1.8;color:var(--ink)}
:host([article-level]) .thought {padding-inline:0}
@media(max-width:760px){.thought{padding:16px 20px 0}}
</style>`;
