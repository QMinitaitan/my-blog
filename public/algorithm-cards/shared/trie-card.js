import { cardTemplate, mountCard, escapeHtml, problemNotes, resolveNotes } from "./card-ui.js";
import { problemBadges } from "../problems/meta.js";
import { stateValue } from "./state-value.js";
export function trieCard({ codes, examples, buildTrace }) {
	const problem =
		`<div class="problem"><div class="title"><h2>208. 实现 Trie（前缀树）</h2>${problemBadges("208. 实现 Trie（前缀树）")}</div><p>实现 Trie：插入单词、查询完整单词、查询前缀。</p>${problemNotes(resolveNotes("208. 实现 Trie（前缀树）", undefined, "插入与查询单次 O(L)；共享前缀只存一份。"))}</div>`;
	const template = cardTemplate({
		problem,
		thought:
			'字母沿 children 指针形成路径，end 标记完整单词结尾。例如插入 apple 后，app 的路径已存在，但 end 仍为 false：search("app") 为 false，startsWith("app") 为 true。再插入 app，只需把已有节点的 end 设为 true。',
		time: "每项 O(L)，L 为参数长度",
		space: "O(S)，S 为插入字符总数",
		animation:
			'<p id="sample-note" class="hash-caption"></p><p id="operation" class="hash-caption"></p><div id="trie"></div><p id="returns" class="hash-caption"></p><p class="legend">紫框：当前节点　★ 完整词：end=true　边的字母：children 的键</p>',
	});
	return {
		template,
		mount(root, signal) {
			return mountCard(root, signal, {
				id: "208",
				codes,
				examples,
				buildTrace,
				formatExample: (e) => e.label,
				getVariables: (s) =>
					[
						["word", "本次参数"],
						["ch", "当前字符"],
						["node", "当前节点的路径标识"],
						["node.children", "当前节点子指针"],
						["returned", "查询返回值"],
					].map(([name, label]) => ({
						name,
						label,
						value: stateValue(s, name),
						wide: name === "node.children",
					})),
				renderAnimation(root, s, e) {
					root.getElementById("sample-note").textContent = e.note;
					root.getElementById("operation").textContent =
						`操作 ${s.operationIndex + 1}/${e.operations.length}：${s.operation}`;
					const positions = new Map();
					let order = 0;
					const byId = new Map(s.trieNodes.map((n) => [n.id, n]));
					function layout(id, depth) {
						const node = byId.get(id),
							children = Object.values(node.children);
						if (!children.length)
							positions.set(id, { x: ++order * 65, y: depth * 65 + 30 });
						else {
							children.forEach((child) => layout(child, depth + 1));
							const xs = children.map((child) => positions.get(child).x);
							positions.set(id, {
								x: (Math.min(...xs) + Math.max(...xs)) / 2,
								y: depth * 65 + 30,
							});
						}
					}
					layout("", 0);
					const edges = s.trieNodes
						.flatMap((node) =>
							Object.entries(node.children).map(([letter, id]) => {
								const a = positions.get(node.id),
									b = positions.get(id);
								return `<path d="M${a.x},${a.y + 17} L${b.x},${b.y - 17}" stroke="#78b9ec" fill="none"/><text x="${(a.x + b.x) / 2 + 5}" y="${(a.y + b.y) / 2}" font-size="12" fill="#a7b2c6">${escapeHtml(letter)}</text>`;
							}),
						)
						.join("");
					const depth = Math.max(...s.trieNodes.map((n) => n.id.length));
					root.getElementById("trie").innerHTML =
						`<svg role="img" aria-label="共享前缀路径与单词结束标记" viewBox="0 0 ${(order + 1) * 65} ${(depth + 1) * 65 + 20}" style="width:100%;max-height:380px">${edges}${s.trieNodes
							.map((n) => {
								const p = positions.get(n.id);
								return `<circle cx="${p.x}" cy="${p.y}" r="18" fill="${s.node === n.id ? "var(--primary)" : n.end ? "#25614a" : "#303848"}" stroke="#91a2bd"/><text x="${p.x}" y="${p.y + 5}" text-anchor="middle" fill="white" font-size="11">${escapeHtml(n.id.at(-1) ?? "根")}</text>${n.end ? `<text x="${p.x + 22}" y="${p.y + 4}" font-size="10" fill="#65b98c">★ 完整词</text>` : ""}`;
							})
							.join("")}</svg>`;
					root.getElementById("returns").textContent =
						`${s.final ? "最终" : "当前"}操作返回记录：${JSON.stringify(s.answer)}`;
				},
			});
		},
	};
}
