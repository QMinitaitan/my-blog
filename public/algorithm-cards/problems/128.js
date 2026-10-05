import { mountStatementExamples } from "../shared/statement-examples.js";
import { cardTemplate, mountCard, escapeHtml } from "../shared/card-ui.js";
import { problemBadges } from "./meta.js";
import { codes } from "./128-code.js";
export const source = codes[0].source;
export const examples = [
	{
		label: "乱序的连续数字",
		nums: [100, 4, 200, 1, 3, 2],
		note: "从 1 延伸到 4；2、3、4 都有前驱，跳过重复扫描。",
	},
	{
		label: "重复值和零",
		nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1],
		note: "两个 0 去重后，0～8 的长度是 9。",
	},
	{ label: "空数组", nums: [], note: "集合为空，循环不进入，返回 0。" },
	{ label: "只有一个数字", nums: [7], note: "没有前驱也没有后继，长度为 1。" },
	{
		label: "全是重复值",
		nums: [2, 2, 2],
		note: "集合只保留一个 2，长度仍然是 1。",
	},
	{
		label: "跨越负数与零",
		nums: [-1, 1, -2, 0, 8],
		note: "观察 -2、-1、0、1 跨越零的延伸。",
	},
	{
		label: "等长的两段",
		nums: [5, 6, 1, 2],
		note: "第二段长度相同，longest 不增加。",
	},
	{
		label: "数值边界",
		nums: [-1000000000, -999999999, 999999999, 1000000000],
		note: "数值很大，仍只做相邻值的集合查询。",
	},
];
export function buildTrace({ nums }) {
	const num_set = new Set(nums),
		steps = [];
	let num = null,
		current = null,
		length = null,
		longest = null,
		probe = null,
		found = null,
		bestStart = null,
		chainStart = null;
	const order = [...num_set];
	// Python 的集合遍历顺序不保证固定；此处采用输入首次出现顺序，是合法的集合遍历次序。
	const preview = order.slice(0, 8);
	function push(line, stage, text) {
		const visible = [...preview];
		for (const value of [num, current, probe])
			if (value !== null && num_set.has(value) && !visible.includes(value)) {
				if (visible.length >= 8) visible.shift();
				visible.push(value);
			}
		steps.push({
			line,
			stage,
			text,
			answer: line === "result" ? longest : null,
			num,
			current,
			length,
			longest,
			probe,
			found,
			bestStart,
			chainStart,
			set: visible,
			setSize: num_set.size,
		});
	}
	push(
		"set",
		"集合去重",
		`num_set 已保存 ${num_set.size} 个不同数字，重复值只保留一份。`,
	);
	longest = 0;
	push("init", "初始化答案", "longest = 0，尚未找到连续序列。");
	for (num of num_set) {
		probe = null;
		found = null;
		push("num", "取出数字", `取出集合中的 ${num}。`);
		probe = num - 1;
		found = num_set.has(probe);
		push(
			"start",
			"判断起点",
			found
				? `${probe} 在集合中，${num} 有前驱，跳过这次 if。`
				: `${probe} 不在集合中，${num} 是一段序列的起点。`,
		);
		if (found) continue;
		current = num;
		chainStart = num;
		probe = null;
		found = null;
		push("current", "设置起点", `current = ${num}，从这里向后查找。`);
		length = 1;
		push("length", "计入起点", "起点自身占一个数字，length = 1。");
		while (true) {
			probe = current + 1;
			found = num_set.has(probe);
			push(
				"check",
				"查询后继",
				found
					? `${probe} 在集合中，可以继续延伸。`
					: `${probe} 不在集合中，这段连续序列结束。`,
			);
			if (!found) break;
			current += 1;
			push(
				"advance",
				"移动到后继",
				`current 增加到 ${current}，length 还未更新。`,
			);
			length += 1;
			push("count", "增加长度", `length 增加到 ${length}。`);
		}
		const old = longest;
		if (length > longest) bestStart = num;
		longest = Math.max(longest, length);
		push(
			"best",
			"更新最长长度",
			`longest = max(${old}, ${length}) = ${longest}。`,
		);
	}
	push("result", "最终结果", `返回最长连续序列长度 ${longest}。`);
	return steps;
}
export const getVariables = (s) => [
	{ name: "num", label: "外层遍历数字", value: s.num },
	{ name: "current", label: "当前序列末端", value: s.current },
	{ name: "length", label: "当前序列长度", value: s.length },
	{ name: "longest", label: "最长长度", value: s.longest },
	{
		name: "num_set",
		label: "去重后的集合",
		wide: true,
		value: `{${s.set.join(", ")}}${s.setSize > s.set.length ? "（省略其他数字）" : ""}`,
	},
];
const problem = `<div class="problem"><div class="title"><h2>128. 最长连续序列</h2>${problemBadges("128. 最长连续序列")}</div><p>给定整数数组 <code class="inline">nums</code>，返回数值连续的最长序列长度。数字在原数组中不必相邻，重复数字不增加长度。</p><div class="examples"><div><span>输入</span><code>[100, 4, 200, 1, 3, 2]</code></div><div><span>输出</span><code>4 · 连续序列为 [1, 2, 3, 4]</code></div></div><div class="constraint original-row"><div class="problem-notes"><span>算法要求：时间复杂度 O(n)。</span></div><button id="reveal" class="original-cue" aria-expanded="false" aria-controls="solution">展开解答</button></div></div>`;
export const template = cardTemplate({
	problem,
	animation:
		'<p id="sample-note" class="hash-caption"></p><p class="hash-caption">num_set · 集合去重（按首次出现次序展示）</p><div id="set-view" class="array-row"></div><p id="probe" class="hash-caption"></p><p class="hash-caption">正在延伸的数值序列</p><div id="chain" class="array-row"></div><p id="result" class="hash-caption"></p><p class="legend">紫框：当前对象　绿框：查询命中；标签标记查询和当前末端。</p>',
});
export function mount(root, signal) {
  mountStatementExamples(root, signal, "128");
	return mountCard(root, signal, {
		id: "128",
		source,
		codes,
		examples,
		buildTrace,
		getVariables,
		formatExample: (e) => `${e.label} · nums = ${JSON.stringify(e.nums)}`,
		renderAnimation(root, s, e) {
			root.getElementById("sample-note").textContent =
				e.note + " Python 集合遍历顺序可能不同，结果相同。";
			root.getElementById("set-view").innerHTML =
				s.set
					.map(
						(v) =>
							`<div class="array-item${v === s.num ? " current" : ""}${v === s.probe && s.found ? " answer" : ""}"><small>${v === s.probe ? "查询命中" : v === s.num ? "当前 num" : "集合元素"}</small><div class="array-value">${v}</div></div>`,
					)
					.join("") +
					(s.setSize > s.set.length ? "<span>… 省略其他数字</span>" : "") ||
				'<span class="empty-map">set() · 空集合</span>';
			root.getElementById("probe").textContent =
				s.probe === null
					? "查询：尚未进行"
					: `查询 ${s.probe} → ${s.found ? "在集合中 ✓" : "不在集合中 ×"}`;
			const start = ["num", "start"].includes(s.line) ? null : s.chainStart;
			const values =
				start === null
					? []
					: Array.from(
							{ length: Math.min(s.current - start + 1, 6) },
							(_, i) => s.current - Math.min(s.current - start, 5) + i,
						);
			root.getElementById("chain").innerHTML =
				(start !== null && s.current - start + 1 > 6
					? "<span>… 省略前面的数字 →</span>"
					: "") +
					values
						.map(
							(v) =>
								`<div class="array-item${v === s.current ? " current" : " answer"}"><small>${v === s.current ? "当前末端" : "已访问"}</small><div class="array-value">${escapeHtml(v)}</div></div>`,
						)
						.join("") || '<span class="empty-map">尚未开始本轮延伸</span>';
			root.getElementById("result").textContent =
				s.line === "result"
					? `最终结果：${s.longest}${s.bestStart !== null ? `；最长的一段为 ${s.bestStart}～${s.bestStart + s.longest - 1}` : ""}`
					: "";
		},
	});
}
