import { recorder } from "./sequence-card.js";
/** 递归帧由题目维护；公共层只保存当时的树、调用栈和显式变量，不推测算法状态。 */
export function treeTrace(tree) {
	const { steps, push } = recorder(),
		stack = [],
		visited = [];
	return {
		steps,
		stack,
		visited,
		save(line, text, variables, extra = {}) {
			push(line, text, {
				tree,
				visited,
				stack: stack.map((frame) => frame.node?.val ?? frame.label ?? null),
				stackLabel: "递归调用栈",
				variables: Object.entries(variables).map(([name, value]) => ({
					name,
					label: name,
					value:
						typeof value === "object" && value !== null
							? JSON.stringify(value)
							: value,
					wide: typeof value === "object",
				})),
				...extra,
			});
		},
	};
}
