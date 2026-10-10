import { terminalValue } from "./monitor-terminal.js";
import { sampleBounds, reserveSample, heapLayout } from "./sample-layout.js";
import { cardTemplate, mountCard, escapeHtml, problemNotes, resolveNotes } from "./card-ui.js";
import { problemBadges } from "../problems/meta.js";
import { stateValue } from "./state-value.js";
/** 堆的数组下标对应完全二叉树：孩子为 2i+1 和 2i+2；不画成已排序序列。 */
export function heapCard({
	title,
	description,
	idea,
	notes,
	time = "O(n)",
	space = "O(n)",
	codes,
	examples,
	buildTrace,
	variables,
}) {
	const problemId = String(title).match(/^\s*(\d+)/)?.[1];
	const template = cardTemplate({
		problem: `<div class="problem"><div class="title"><h2>${escapeHtml(title)}</h2>${problemBadges(title)}</div><p>${escapeHtml(description)}</p>${problemNotes(resolveNotes(title, notes, `目标复杂度：时间 ${time}，空间 ${space}。`))}</div>`,
		thought: idea,
		time,
		space,
		animation:
			'<p id="sample-note"></p><div id="heaps"></div><p id="result"></p><p class="legend">根节点是本堆极值；连线表示父子关系，数组下标不是排序名次。</p>',
	});
	return {
		template,
		mount(root, signal) {
			let heights;
			return mountCard(root, signal, {
				id: problemId,
				codes,
				examples,
				buildTrace,
				prepareAnimation(root, steps) {
					heights = heapLayout(steps);
					return reserveSample(root, sampleBounds(steps), { texts: { stage: "text", result: "answer" } });
				},
				formatExample: (e) =>
					`${e.label} · ${JSON.stringify(e.nums ?? e.operations)}`,
				getVariables: (s) =>
					variables.map(([name, label]) => ({
						name,
						label,
						value: stateValue(s, name),
						wide: typeof s[name] === "object",
					})),
				renderAnimation(root, s, e) {
					root.getElementById("sample-note").textContent = e.note;
					root.getElementById("heaps").innerHTML = s.heaps
						.map(({ label, values, length = values.length }) => {
							const shown = values.slice(0, 31),
								depth = heights.get(label) / 60,
								positions = shown.map((v, i) => {
									const row = Math.floor(Math.log2(i + 1)),
										first = 2 ** row - 1;
									return {
										v,
										x: ((i - first + 0.5) / 2 ** row) * 600,
										y: row * 60 + 25,
									};
								});
							return `<p>${escapeHtml(label)} · ${length} 项${length > shown.length ? "，仅显示前 31 个原下标节点" : ""}</p>${`<svg role="img" aria-label="${escapeHtml(label)}" width="600" height="${depth * 60}" style="display:block">${positions.map((p, i) => `${i ? `<line x1="${positions[Math.floor((i - 1) / 2)].x}" y1="${positions[Math.floor((i - 1) / 2)].y}" x2="${p.x}" y2="${p.y}" stroke="#91a2bd"/>` : ""}<circle cx="${p.x}" cy="${p.y}" r="17" fill="${i === 0 ? "var(--primary)" : "#303848"}" stroke="#91a2bd"/><text x="${p.x}" y="${p.y + 5}" text-anchor="middle" fill="white">${escapeHtml(p.v)}</text><text x="${p.x}" y="${p.y + 29}" text-anchor="middle" fill="#91a2bd" font-size="10">下标 ${i}</text>`).join("")}</svg>`}<p style="height:24px;margin:0">${shown.length ? "" : "空堆"}</p>`;
						})
						.join("");
					root.getElementById("result").textContent =
						s.final || s.line === "result"
							? `最终结果：${terminalValue(s.answer)}`
							: "";
				},
			});
		},
	};
}
/** JS 代码与轨迹共用明确的堆操作；输入堆会原地更新，快照由 recorder 独立复制。 */
export function heapPush(heap, value, sign = 1) {
	heap.push(value);
	let i = heap.length - 1;
	while (i > 0) {
		const p = Math.floor((i - 1) / 2);
		if (sign * heap[p] <= sign * heap[i]) break;
		[heap[p], heap[i]] = [heap[i], heap[p]];
		i = p;
	}
}
export function heapPop(heap, sign = 1) {
	const root = heap[0],
		last = heap.pop();
	if (heap.length) {
		heap[0] = last;
		let i = 0;
		while (2 * i + 1 < heap.length) {
			let child = 2 * i + 1;
			if (
				child + 1 < heap.length &&
				sign * heap[child + 1] < sign * heap[child]
			)
				child++;
			if (sign * heap[i] <= sign * heap[child]) break;
			[heap[i], heap[child]] = [heap[child], heap[i]];
			i = child;
		}
	}
	return root;
}
export const javascriptHeapHelpers = `function push(heap,value,sign=1){heap.push(value);let i=heap.length-1;while(i>0){const p=Math.floor((i-1)/2);if(sign*heap[p]<=sign*heap[i])break;[heap[p],heap[i]]=[heap[i],heap[p]];i=p;}}
function pop(heap,sign=1){const root=heap[0],last=heap.pop();if(heap.length){heap[0]=last;let i=0;while(2*i+1<heap.length){let child=2*i+1;if(child+1<heap.length&&sign*heap[child+1]<sign*heap[child])child++;if(sign*heap[i]<=sign*heap[child])break;[heap[i],heap[child]]=[heap[child],heap[i]];i=child;}}return root;}`;
