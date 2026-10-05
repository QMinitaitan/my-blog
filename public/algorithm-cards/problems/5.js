import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./5-code.js";
export const examples = [
	{
		label: "奇数中心",
		s: "babad",
		input: "babad",
		note: "以 a 为中心扩展得到 bab；同长度答案可以任选。",
	},
	{
		label: "偶数中心",
		s: "cbbd",
		input: "cbbd",
		note: "两个 b 之间也必须作为中心，才能找到 bb。",
	},
	{
		label: "全部相同",
		s: "aaaa",
		input: "aaaa",
		note: "遇边界才停止，最长回文覆盖整个字符串。",
	},
	{
		label: "单字符",
		s: "a",
		input: "a",
		note: "奇数扩展得到 a，偶数扩展越界得到空区间。",
	},
];
export function buildTrace({ s }) {
	const { steps, push } = recorder();
	let start = 0,
		end = 1,
		center = null,
		left = null,
		right = null,
		mode = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			values: [...s],
			start,
			end,
			center,
			left,
			right,
			mode,
			answer,
			pointers: ["check", "left", "right", "bounds"].includes(line)
				? { center, left, right }
				: { center },
			window: [start, end - 1],
			visualNote:
				"蓝色底边表示当前最长答案；扩展函数返回 [left+1,right)，右端不包含。",
		});
	save("init", "非空字符串至少有一个长度为 1 的回文。");
	function expand(a, b, type) {
		left = a;
		right = b;
		mode = type;
		while (true) {
			const match = left >= 0 && right < s.length && s[left] === s[right];
			save(
				"check",
				left < 0 || right >= s.length
					? "扩展触碰边界，短路停止字符比较。"
					: `两端 ${s[left]}、${s[right]} 相同 → ${match}。`,
			);
			if (!match) break;
			left--;
			save("left", "匹配成功，左端向外一步。");
			right++;
			save("right", "右端向外一步。");
		}
		save("bounds", `返回最后合法区间 [${left + 1},${right})。`);
		return [left + 1, right];
	}
	for (center = 0; center < s.length; center++) {
		save("center", `枚举中心下标 ${center}。`);
		save("odd", "调用 expand(center,center)，尝试奇数长度。");
		const [left1, right1] = expand(center, center, "奇数");
		save("odd", `奇数调用返回 [${left1},${right1})。`);
		save("even", "调用 expand(center,center+1)，尝试偶数长度。");
		const [left2, right2] = expand(center, center + 1, "偶数");
		save("even", `偶数调用返回 [${left2},${right2})。`);
		save(
			"choose",
			`奇数长度 >= 偶数长度 → ${right1 - left1 >= right2 - left2}。`,
		);
		let candidateLeft, candidateRight;
		if (right1 - left1 >= right2 - left2) {
			candidateLeft = left1;
			candidateRight = right1;
			save("oddChoice", "采用本中心较长的奇数区间。");
		} else {
			candidateLeft = left2;
			candidateRight = right2;
			save("evenChoice", "采用本中心较长的偶数区间。");
		}
		save(
			"longer",
			`候选长度 ${candidateRight - candidateLeft} > 最佳长度 ${end - start} → ${candidateRight - candidateLeft > end - start}。`,
		);
		if (candidateRight - candidateLeft > end - start) {
			start = candidateLeft;
			end = candidateRight;
			save("update", "更新最佳半开区间。");
		}
	}
	center = s.length - 1;
	answer = s.slice(start, end);
	save("result", "返回最长回文子串。");
	return steps;
}
const card = sequenceCard({
	title: "5. 最长回文子串",
	description: "求非空字符串中最长的连续回文子串，从左向右与从右向左相同。",
	idea: "回文一定有中心。分别尝试一个字符中心与两字符间的中心，左右同时扩展；停止时退回最后合法区间。此处使用中心扩展解法。",
	time: "O(n²)",
	space: "O(1)，不计返回字符串",
	codes,
	examples,
	buildTrace,
	variables: [
		["center", "外层枚举中心"],
		["mode", "扩展类型"],
		["left", "扩展左端", ["check", "left", "right", "bounds"]],
		["right", "扩展右端", ["check", "left", "right", "bounds"]],
		["start", "最佳左端"],
		["end", "最佳右端（不含）"],
	],
});
export const template = card.template;
export const mount = card.mount;
