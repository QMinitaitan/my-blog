/** Sample-wide display bounds, computed from immutable snapshots, never by replaying DOM. */
export function sampleBounds(steps) {
 const bounds = { grids: {}, rows: {}, valueCharacters: 1, maxValue: 1, labelCharacters: 1, textCharacters: {} };
 for (const step of steps) {
  for (const name of ['matrix', 'dp']) {
   if (!Array.isArray(step[name])) continue;
   const grid = bounds.grids[name] ??= { rows: [], columns: 0 };
   step[name].forEach((row, r) => {
    if (!Array.isArray(row)) return;
    grid.rows[r] = Math.max(grid.rows[r] ?? 0, row.length);
    grid.columns = Math.max(grid.columns, row.length);
    for (const value of row) bounds.valueCharacters = Math.max(bounds.valueCharacters, String(value ?? '—').length);
   });
  }
  for (const name of ['values', 'auxiliary', 'stack', 'path', 'candidates', 'seen', 'heap', 'bucketEntries']) {
   const values = step[name];
   if (!Array.isArray(values)) continue;
   bounds.rows[name] = Math.max(bounds.rows[name] ?? 0, values.length);
   for (const value of values) { if (typeof value === 'number') bounds.maxValue = Math.max(bounds.maxValue, value); bounds.valueCharacters = Math.max(bounds.valueCharacters, (typeof value === 'object' ? JSON.stringify(value) : String(value ?? '—')).length); }
  }
  for (const [name, value] of Object.entries(step)) {
   if (typeof value === 'string' || name === 'answer' || name === 'calls' || name === 'stack' || name === 'queue')
    bounds.textCharacters[name] = Math.max(bounds.textCharacters[name] ?? 0, String(typeof value === 'string' ? value : JSON.stringify(value)).length);
  }
  bounds.labelCharacters = Math.max(bounds.labelCharacters, Object.keys(step.pointers ?? {}).join("/").length);
 }
 bounds.labelCharacters = Math.min(32, bounds.labelCharacters);
 return bounds;
}

/** Reserve each renderer's independently configured slots. Width changes alone recompute wrapping. */
export function reserveSample(root, bounds, { rows = {}, texts = {}, grids = {} } = {}) {
 const animation = root.querySelector('.animation');
 if (!animation) return () => {};
 animation.dataset.stableLayout = '';
 animation.style.setProperty('--sample-cell-width', `${Math.max(72, Math.min(220, bounds.valueCharacters * 14 + 20))}px`);
 const update = () => {
  const width = animation.clientWidth - 56;
  if (width <= 0) return;
  const cell = Math.max(72, Math.min(220, bounds.valueCharacters * 14 + 20));
  for (const [id, config] of Object.entries(rows)) {
   const node = root.getElementById(id);
   if (!node) continue;
   const count = typeof config === 'number' ? config : bounds.rows[config] ?? 0;
   const perLine = Math.max(1, Math.floor((width + 10) / (cell + 10)));
   node.style.minHeight = `${Math.max(1, Math.ceil(count / perLine)) * 88 - 10}px`;
  }
  for (const [id, config] of Object.entries(texts)) {
   const node = root.getElementById(id);
   if (!node) continue;
   const chars = typeof config === 'number' ? config : bounds.textCharacters[config] ?? 0;
   node.style.lineHeight = "24px";
   node.style.overflowWrap = "anywhere";
   node.style.minHeight = `${Math.max(1, Math.ceil((chars + 40) * 16 / width)) * 24}px`;
  }
  for (const [id, name] of Object.entries(grids)) {
   const node = root.getElementById(id), grid = bounds.grids[name];
   if (node && grid) node.style.minHeight = `${(grid.rows.length + 1) * 70 + 8}px`;
  }
 };
 update();
 const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
 observer?.observe(animation);
 return () => observer?.disconnect();
}

export const sampleLayoutStyles = `<style>
.animation[data-stable-layout] .array-row{justify-content:flex-start;align-content:flex-start;align-items:flex-start}
.animation[data-stable-layout] .hash-map .map-entry{width:var(--sample-cell-width);height:40px;overflow:auto;white-space:nowrap}
.animation[data-stable-layout] .array-item{width:var(--sample-cell-width);flex:0 0 var(--sample-cell-width)}
.animation[data-stable-layout] .array-item small{height:24px;white-space:nowrap;font-size:12px}
.animation[data-stable-layout] .array-value{height:50px;font-size:23px;white-space:nowrap;overflow:auto}
.animation[data-stable-layout] table{table-layout:fixed}
.animation[data-stable-layout] td{width:var(--sample-cell-width);min-width:var(--sample-cell-width)!important;height:64px;font-size:16px;white-space:nowrap}
.animation[data-stable-layout] td small{height:17px;line-height:17px}
.animation[data-stable-layout] .sample-placeholder{visibility:hidden}
</style>`;
/** Stable identity anchors for ordinary teaching trees; windowed snapshots keep their bounded slots. */
export function treeLayout(steps) {
 let positions = new Map(), height = 70, width = 112;
 for (const step of steps) {
  const placed = new Map(); let index = 0, depthMax = 0;
  function visit(node, depth) {
   if (!node || placed.has(node.id)) return;
   // Mark before following children, including shared/cyclic references.
   placed.set(node.id, null);
   visit(node.left, depth + 1);
   placed.set(node.id, { x: ++index * 56, y: depth * 70 + 30 });
   depthMax = Math.max(depthMax, depth);
   visit(node.right, depth + 1);
  }
  visit(step.tree, 0);
  if (placed.size > positions.size) positions = placed;
  width = Math.max(width, (index + 1) * 56);
  height = Math.max(height, (depthMax + 1) * 70);
 }
 return { positions, width, height };
}
export function listLayout(steps) {
 const positions = new Map(); let maxVisible = 0, windowed = false;
 for (const step of steps) {
  windowed ||= Boolean(step.nodeLength);
  maxVisible = Math.max(maxVisible, step.nodes?.length ?? 0);
  for (const node of step.nodes ?? []) if (!positions.has(node.id) && positions.size < 64) positions.set(node.id, 60 + positions.size * 105);
 }
 return { positions: windowed ? new Map() : positions, width: Math.max(210, Math.min(64, Math.max(maxVisible, positions.size)) * 105 + 30) };
}
export function trieLayout(steps) {
 const nodes = steps.reduce((largest, s) => (s.trieNodes?.length ?? 0) > largest.length ? s.trieNodes : largest, []);
 const byId = new Map(nodes.map(n => [n.id, n])), positions = new Map(); let order = 0;
 function visit(id, depth) {
  const node = byId.get(id); if (!node) return;
  const children = Object.values(node.children).filter(child => byId.has(child));
  children.forEach(child => visit(child, depth + 1));
  const xs = children.map(child => positions.get(child).x);
  positions.set(id, { x: children.length ? (Math.min(...xs) + Math.max(...xs)) / 2 : ++order * 65, y: depth * 65 + 30 });
 }
 visit('', 0);
 return {positions, width: (order + 1) * 65 + 60, height: (Math.max(0, ...nodes.map(n => n.id.length)) + 1) * 65 + 20};
}
export function heapLayout(steps) {
 const heights = new Map();
 for (const s of steps) for (const heap of s.heaps ?? []) heights.set(heap.label, Math.max(heights.get(heap.label) ?? 60, Math.ceil(Math.log2(Math.min(31, heap.values.length) + 1)) * 60));
 return heights;
}
