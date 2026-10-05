import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./76-code.js";
export const examples = [
	{
		label: "收缩成 BANC",
		s: "ADOBECODEBANC",
		t: "ABC",
		note: "覆盖后反复收缩 left，最后记录更短的 BANC。",
	},
	{
		label: "重复需求",
		s: "AAABBC",
		t: "AABC",
		note: "需要两个 A；missing 统计缺少的字符总数，不是种类数。",
	},
	{
		label: "无法覆盖",
		s: "a",
		t: "aa",
		note: "需求次数不够，始终不会进入收缩循环。",
	},
	{
		label: "恰好覆盖",
		s: "a",
		t: "a",
		note: "先保存 a，再移出它，missing 重新变成 1。",
	},
];
export function buildTrace({ s, t }) {
	const { steps, push } = recorder(),
		need = Array(128).fill(0);
	for (const ch of t) need[ch.charCodeAt(0)]++;
	let missing = t.length,
		left = 0,
		best_start = 0,
		best_length = s.length + 1,
		right = null,
		ch = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			values: [...s],
			missing,
			left,
			right,
			ch,
			best_start,
			best_length,
			need: Object.fromEntries(
				[...new Set([...s, ...t])].map((c) => [c, need[c.charCodeAt(0)]]),
			),
			answer,
			pointers: { left, right },
			window: right === null ? null : [left, right],
			visualNote: `t=${t}；已保存最短子串：${best_length > s.length ? "尚未找到" : s.slice(best_start, best_start + best_length)}`,
		});
	save("init", "需求表计数；missing 记录还缺多少个字符。");
	for (right = 0; right < s.length; right++) {
		ch = s[right];
		save("scan", `读取 ${ch}。`);
		save("useful", `need[${ch}] > 0 → ${need[ch.charCodeAt(0)] > 0}。`);
		if (need[ch.charCodeAt(0)] > 0) {
			missing--;
			save("satisfy", "补足一个所缺字符。");
		}
		need[ch.charCodeAt(0)]--;
		save("add", "进入窗口；负计数表示多出的字符。");
		while (true) {
			save("covered", `missing == 0 → ${missing === 0}。`);
			if (missing !== 0) break;
			save(
				"better",
				`窗口长 ${right - left + 1} 是否更短 → ${right - left + 1 < best_length}。`,
			);
			if (right - left + 1 < best_length) {
				best_start = left;
				best_length = right - left + 1;
				save("best", "记录当前最短窗口。");
			}
			need[s.charCodeAt(left)]++;
			save("remove", `移出 ${s[left]}，需求次数加一。`);
			save("lost", `移出后是否又缺字符 → ${need[s.charCodeAt(left)] > 0}。`);
			if (need[s.charCodeAt(left)] > 0) {
				missing++;
				save("missing", "覆盖被打破，missing 加一。");
			}
			left++;
			save("move", "left 右移一格。");
		}
	}
	right = s.length - 1;
	answer =
		best_length > s.length ? "" : s.slice(best_start, best_start + best_length);
	save("result", "返回最短覆盖子串；未找到时返回空字符串。");
	return steps;
}
const card = sequenceCard({
	title: "76. 最小覆盖子串",
	description:
		"从 s 中找最短连续子串，包含 t 的全部字符和重复次数。区分大小写，题目输入为英文字母。找不到则返回空字符串。",
	idea: "右端扩张补足需求，missing 变成 0 后左端收缩。例如 ABC 覆盖好后，可以丢掉多余的 D、O，但移出最后一个必需 A 时就要重新扩张。",
	time: "O(n+m)，两端各最多移动 n 次",
	space: "O(128)，固定字符表",
	codes,
	examples,
	buildTrace,
	variables: [
		["left", "窗口左端"],
		["right", "窗口右端"],
		["missing", "仍缺字符总数"],
		["need", "每个字符尚缺次数"],
		["best_start", "最短起点"],
		["best_length", "最短长度"],
	],
});
export const template = card.template;
export const mount = card.mount;
