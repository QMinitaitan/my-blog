import { trieCard } from "../shared/trie-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./208-code.js";
export const examples = [
	{
		label: "完整词与前缀",
		operations: [
			["Trie", []],
			["insert", ["apple"]],
			["search", ["apple"]],
			["search", ["app"]],
			["startsWith", ["app"]],
			["insert", ["app"]],
			["search", ["app"]],
		],
		note: "路径存在与完整词结束是不同条件，观察 app 的 end 标记变化。",
	},
	{
		label: "共享前缀分支",
		operations: [
			["Trie", []],
			["insert", ["cat"]],
			["insert", ["car"]],
			["search", ["cat"]],
			["startsWith", ["ca"]],
			["search", ["cap"]],
		],
		note: "cat 与 car 共用 c→a，在第三个字母处分支；p 的子指针不存在。",
	},
	{
		label: "重复插入",
		operations: [
			["Trie", []],
			["insert", ["a"]],
			["insert", ["a"]],
			["search", ["a"]],
			["startsWith", ["b"]],
		],
		note: "重复插入不创建重复节点，end 保持 true。",
	},
];
export function buildTrace({ operations }) {
	const root = { id: "", children: {}, end: false },
		nodes = [root],
		byId = new Map([["", root]]),
		{ steps, push } = recorder(),
		answer = [null];
	let node = "",
		word = null,
		ch = null,
		returned = null,
		operationIndex = 0,
		operation = "Trie()";
	const save = (line, text) =>
		push(line, text, {
			trieNodes: nodes,
			node,
			word,
			ch,
			"node.children": node === null ? null : byId.get(node).children,
			returned,
			operationIndex,
			operation,
			answer,
			final:
				operationIndex === operations.length - 1 &&
				["init", "end", "searchResult", "prefixResult"].includes(line),
		});
	save("init", "创建根节点：children 为空，end=false。");
	function find(parameter) {
		node = "";
		ch = null;
		save("findInit", "从根节点开始查询。");
		for (const letter of parameter) {
			ch = letter;
			save("findLetter", `读取字符 ${ch}。`);
			const current = byId.get(node);
			save("missing", `children 中没有 ${ch} → ${!(ch in current.children)}。`);
			if (!(ch in current.children)) {
				save("absent", "路径中断，辅助函数返回 None。");
				return null;
			}
			node = current.children[ch];
			save("advance", "沿 children[ch] 移动到下一节点。");
		}
		save("found", "全部字符路径存在，返回最后节点引用。");
		return node;
	}
	for (
		operationIndex = 1;
		operationIndex < operations.length;
		operationIndex++
	) {
		const [method, args] = operations[operationIndex];
		word = args[0];
		ch = null;
		returned = null;
		operation = `${method}(${JSON.stringify(word)})`;
		if (method === "insert") {
			node = "";
			save("insertInit", "从根开始插入，本次只设置已有或新建的路径。");
			for (const letter of word) {
				ch = letter;
				save("insertLetter", `插入字符 ${ch}。`);
				const current = byId.get(node);
				save(
					"newCheck",
					`当前 children 缺少 ${ch} → ${!(ch in current.children)}。`,
				);
				if (!(ch in current.children)) {
					const child = { id: node + ch, children: {}, end: false };
					nodes.push(child);
					byId.set(child.id, child);
					current.children[ch] = child.id;
					save("create", "新建子节点，并保存当前节点到它的字符指针。");
				}
				node = current.children[ch];
				save("insertAdvance", "沿字符指针进入下一节点。");
			}
			byId.get(node).end = true;
			answer.push(null);
			save("end", "所有字符插入完，将当前节点标记为完整单词结束。");
		} else if (method === "search") {
			node = null;
			save("search", "调用辅助函数，先检查完整路径。");
			const found = find(word);
			node = found;
			returned = found !== null && byId.get(found).end;
			answer.push(returned);
			save(
				"searchResult",
				found === null
					? "路径不存在，短路返回 false。"
					: `路径存在，还要检查 end=${returned}。`,
			);
		} else if (method === "startsWith") {
			const found = find(word);
			returned = found !== null;
			node = null;
			answer.push(returned);
			save("prefixResult", `只检查路径存在，不要求 end，返回 ${returned}。`);
		} else throw new Error(`未知 Trie 操作 ${method}`);
	}
	return steps;
}
const card = trieCard({ codes, examples, buildTrace });
export const template = card.template;
export const mount = card.mount;
