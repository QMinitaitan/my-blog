import { treeCard, decodeTree } from "../shared/tree-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./124-code.js";
export const examples = [
	{
		label: "跨越子树",
		input: [-10, 9, 20, null, null, 15, 7],
		note: "经过 20 的路径 15→20→7 得到 42，不经过根 -10。",
	},
	{
		label: "全为负数",
		input: [-3, -2, -4],
		note: "不能返回空路径 0，最佳路径是单个节点 -2。",
	},
	{
		label: "舍弃负侧",
		input: [2, -1, 3],
		note: "左侧贡献取 0，选择 2→3 得到 5。",
	},
	{
		label: "单节点",
		input: [-1000],
		note: "唯一非空路径就是该节点，答案 -1000。",
	},
];
export function buildTrace({ input }) {
	const tree = decodeTree(input),
		stack = [],
		visited = [],
		{ steps, push } = recorder();
	let node = null,
		left = null,
		right = null,
		answer = -Infinity,
		returned = null;
	const save = (line, text) =>
		push(line, text, {
			tree,
			current: node?.id ?? null,
			visited,
			stack: stack.map((f) => f.node?.val ?? null),
			stackLabel: "递归调用栈",
			answer,
			variables: [
				{ name: "node", label: "本次节点", value: node?.val ?? null },
				{ name: "left", label: "左侧可接贡献", value: left },
				{ name: "right", label: "右侧可接贡献", value: right },
				{ name: "answer", label: "当前最大路径和", value: answer },
				{ name: "returned", label: "返回给父节点的贡献", value: returned },
			],
		});
	save("init", "最大路径和初始化为负无穷，确保全负树也选择非空路径。");
	save("start", "从根开始计算贡献。");
	function height(current) {
		const frame = { node: current, left: null, right: null };
		stack.push(frame);
		node = current;
		left = null;
		right = null;
		returned = null;
		save("empty", `node 为空 → ${!current}。`);
		if (!current) {
			returned = 0;
			save("nil", "空树贡献为 0。");
			stack.pop();
			return 0;
		}
		save("left", "进入左子树计算贡献。");
		frame.left = Math.max(0, height(current.left));
		node = current;
		left = frame.left;
		right = null;
		returned = null;
		save("left", `左侧调用返回贡献 ${left}。`);
		save("right", "进入右子树计算贡献。");
		frame.right = Math.max(0, height(current.right));
		node = current;
		left = frame.left;
		right = frame.right;
		returned = null;
		save("right", `右侧调用返回贡献 ${right}。`);
		answer = Math.max(answer, current.val + left + right);
		visited.push(current.id);
		save(
			"update",
			`经过当前节点的路径和 ${current.val}+${left}+${right}，更新最大路径和为 ${answer}。`,
		);
		returned = current.val + Math.max(left, right);
		save("height", `只取较高的一侧接给父节点，返回贡献 ${returned}。`);
		stack.pop();
		return returned;
	}
	height(tree);
	node = tree;
	left = null;
	right = null;
	returned = null;
	save("result", "所有节点都比较过，返回全局最大路径和。");
	steps.at(-1).final = true;
	return steps;
}
const card = treeCard({
	title: "124. 二叉树中的最大路径和",
	description:
		"求任意非空简单路径的最大节点值之和，不能重复经过节点，路径不一定经过根。",
	idea: "每个节点比较“左侧可接贡献 + 右侧可接贡献”。向父节点返回单侧贡献（负贡献取 0），整条路径长度保存在全局 answer 中；两者含义不同。",
	time: "O(n)",
	space: "O(h)",
	codes,
	examples,
	buildTrace,
});
export const template = card.template;
export const mount = card.mount;
