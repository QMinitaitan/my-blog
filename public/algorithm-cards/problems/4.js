import { partitionCard } from "../shared/partition-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./4-code.js";
export const examples = [
	{
		label: "奇数总长",
		nums1: [1, 3],
		nums2: [2],
		note: "交换引用后在较短数组 [2] 上搜索，中位数是左侧最大值 2。",
	},
	{
		label: "偶数总长",
		nums1: [1, 2],
		nums2: [3, 4],
		note: "左侧最大 2、右侧最小 3，平均为 2.5。",
	},
	{
		label: "一侧为空",
		nums1: [],
		nums2: [1],
		note: "a 的两边使用无穷边界，直接取 b 的中间数。",
	},
	{
		label: "负数与重复",
		nums1: [-3, -1, -1],
		nums2: [-2, -1, 4],
		note: "相等边界允许切分，偶数中位数为 -1。",
	},
];
export function buildTrace({ nums1, nums2 }) {
	const { steps, push } = recorder();
	let a = nums1,
		b = nums2,
		left = null,
		right = null,
		half = null,
		i = null,
		j = null,
		leftA = null,
		rightA = null,
		leftB = null,
		rightB = null,
		answer = null;
	const compact = (values, cut) => {
		if (values.length <= 16) return { values, indices: null };
		const indices = [
			...new Set([
				0,
				values.length - 1,
				...[cut - 1, cut, cut + 1].filter((p) => p >= 0 && p < values.length),
			]),
		].sort((x, y) => x - y);
		return { values: indices.map((p) => values[p]), indices };
	};
	const save = (line, text) => {
		const av = compact(a, i),
			bv = compact(b, j);
		push(line, text, {
			a: av.values,
			aIndices: av.indices,
			aLength: a.length,
			b: bv.values,
			bIndices: bv.indices,
			bLength: b.length,
			left,
			right,
			half,
			i,
			j,
			leftA,
			rightA,
			leftB,
			rightB,
			answer,
			final: ["oddResult", "evenResult"].includes(line),
		});
	};
	save("arrays", "a、b 引用原数组，不复制或修改输入。");
	save("shorter", `a 比 b 长 → ${a.length > b.length}。`);
	if (a.length > b.length) {
		[a, b] = [b, a];
		save("swap", "只交换引用，在较短数组上二分。");
	}
	const m = a.length,
		n = b.length;
	left = 0;
	right = m;
	half = Math.floor((m + n + 1) / 2);
	save("init", "切口可在 0 到 m 之间，包括两侧为空的情形。");
	while (true) {
		save("loop", `left <= right → ${left <= right}。`);
		if (left > right) throw new Error("输入数组应为非递减且总长非零");
		i = Math.floor((left + right) / 2);
		save("cutA", `a 左侧取 ${i} 个元素。`);
		j = half - i;
		save("cutB", `b 左侧取 half-i=${j} 个。`);
		leftA = i ? a[i - 1] : -Infinity;
		save("leftA", "读取 a 切口左边界，空侧为 -∞。");
		rightA = i < m ? a[i] : Infinity;
		save("rightA", "读取 a 右边界，空侧为 +∞。");
		leftB = j ? b[j - 1] : -Infinity;
		save("leftB", "读取 b 左边界。");
		rightB = j < n ? b[j] : Infinity;
		save("rightB", "读取 b 右边界。");
		const valid = leftA <= rightB && leftB <= rightA;
		save(
			"valid",
			leftA > rightB
				? "左A大于右B，第一比较失败，短路跳过第二比较。"
				: `左A≤右B，继续比较左B≤右A → ${leftB <= rightA}。`,
		);
		if (valid) {
			save("odd", `总长度为奇数 → ${(m + n) % 2 === 1}。`);
			if ((m + n) % 2) {
				answer = Math.max(leftA, leftB);
				save("oddResult", "左侧比右侧多一个，取左侧最大值。");
			} else {
				answer = (Math.max(leftA, leftB) + Math.min(rightA, rightB)) / 2;
				save("evenResult", "左右数量相同，取中间两边界的平均值。");
			}
			return steps;
		}
		save("direction", `左A > 右B → ${leftA > rightB}。`);
		if (leftA > rightB) {
			right = i - 1;
			save("decrease", "a 左侧取多了，切口向左。");
		} else {
			left = i + 1;
			save("increase", "a 左侧取少了，切口向右。");
		}
	}
}
const card = partitionCard({ codes, examples, buildTrace });
export const template = card.template;
export const mount = card.mount;
