import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./56-code.js";
export const examples = [
	{
		label: "重叠与分开",
		input: [
			[1, 3],
			[2, 6],
			[8, 10],
			[15, 18],
		],
		note: "第二段与第一段重叠，后两段分别建立新区间。",
	},
	{
		label: "端点相接",
		input: [
			[1, 4],
			[4, 5],
		],
		note: "闭区间端点相等时也必须合并。",
	},
	{
		label: "包含关系",
		input: [
			[1, 10],
			[2, 3],
			[4, 6],
		],
		note: "较短区间不会缩短已有右端点。",
	},
	{
		label: "乱序",
		input: [
			[4, 5],
			[0, 0],
			[1, 4],
		],
		note: "先按左端点排序，再扫描。",
	},
];
export function buildTrace({ input }) {
	const intervals = input.map((a) => [...a]).sort((a, b) => a[0] - b[0]),
		{ steps, push } = recorder();
	let answer = null,
		start = null,
		end = null,
		i = null;
	const save = (line, text) =>
		push(line, text, {
			values: intervals.map((a) => `[${a}]`),
			intervals,
			answer,
			start,
			end,
			i,
			pointers: { i },
			visualNote: `已合并区间：${JSON.stringify(answer)}`,
		});
	save("sort", "按区间左端点排序。");
	answer = [];
	save("init", "初始化结果列表。");
	for (i = 0; i < intervals.length; i++) {
		[start, end] = intervals[i];
		save("item", `考察区间 [${start}, ${end}]。`);
		const separate = !answer.length || start > answer.at(-1)[1];
		save("separate", `没有前一区间或两段不相交 → ${separate}。`);
		if (separate) {
			answer.push([start, end]);
			save("append", "建立一个新的合并区间。");
		} else {
			answer.at(-1)[1] = Math.max(answer.at(-1)[1], end);
			save("extend", "重叠区间合并，右端点取更大的一个。");
		}
	}
	i = intervals.length - 1;
	save("result", `返回 ${JSON.stringify(answer)}。`);
	return steps;
}
const card = sequenceCard({
	title: "56. 合并区间",
	description: "合并所有重叠的闭区间，返回互不重叠且覆盖原区间的结果。",
	idea: "按左端点排序，当前区间只需与最后一个合并结果比较；端点相等也算重叠。",
	time: "O(n log n)",
	space: "O(n)，含排序和输出",
	codes,
	examples,
	buildTrace,
	variables: [
		["start", "当前左端点"],
		["end", "当前右端点"],
		["answer", "已合并区间"],
	],
});
export const template = card.template;
export const mount = card.mount;
