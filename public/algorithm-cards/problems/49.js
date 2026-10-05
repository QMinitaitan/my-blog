import { mountStatementExamples } from "../shared/statement-examples.js";
import { cardTemplate, mountCard, escapeHtml } from "../shared/card-ui.js";
import { problemBadges } from "./meta.js";
import { codes } from "./49-code.js";
export const source = codes[0].source;
export const examples = [
	{
		label: "典型分组",
		strs: ["eat", "tea", "tan", "ate", "nat", "bat"],
		note: "观察相同排序键如何汇入同一组。",
	},
	{
		label: "单个空字符串",
		strs: [""],
		note: "空字符串的键也是空字符串，仍会建立分组。",
	},
	{ label: "单个字母", strs: ["a"], note: "只有一个词时也会返回嵌套列表。" },
	{
		label: "重复词与重复字母",
		strs: ["aab", "aba", "baa", "aab", "abb"],
		note: "重复单词保留，字母次数不同的词分开。",
	},
	{
		label: "多个空词",
		strs: ["", "a", "", "b"],
		note: "第二个空词复用已有的空键。",
	},
	{
		label: "各自成组",
		strs: ["ab", "ac", "ad"],
		note: "每次查询都需要建立新分组。",
	},
];
export function buildTrace({ strs }) {
	const groups = new Map(),
		steps = [],
		recent = [];
	let i = null,
		word = null,
		key = null,
		found = null;
	function push(line, stage, text, answer = null) {
		const visible = [...recent];
		if (groups.has(key) && !visible.includes(key)) visible[0] = key;
		steps.push({
			line,
			stage,
			text,
			i,
			word,
			key,
			found,
			groupCount: groups.size,
			groups: visible.map((k) => [k, groups.get(k).slice(-6)]),
			sizes: visible.map((k) => [k, groups.get(k).length]),
			answer,
		});
	}
	push("init", "初始化", "建立空字典 groups，键表示字母组成，值保存对应单词。");
	for (i = 0; i < strs.length; i++) {
		word = strs[i];
		found = null;
		push("word", "取出单词", `取出 strs[${i}] = ${JSON.stringify(word)}。`);
		key = [...word].sort().join("");
		push(
			"key",
			"生成排序键",
			`${JSON.stringify(word)} 的字母排序后得到 ${JSON.stringify(key)}。`,
		);
		found = groups.has(key);
		push(
			"query",
			"查询字典",
			found
				? "这个键已存在，可以复用它的分组。"
				: "这个键尚不存在，需要建立空分组。",
		);
		if (!found) {
			groups.set(key, []);
			recent.push(key);
			if (recent.length > 6) recent.shift();
			push("create", "建立分组", `为键 ${JSON.stringify(key)} 建立空列表。`);
		}
		groups.get(key).push(word);
		push(
			"append",
			"加入单词",
			`把 ${JSON.stringify(word)} 加入键 ${JSON.stringify(key)} 的分组。`,
		);
	}
	// 返回值独立保存，回看旧步骤时不受后续操作影响。
	i = strs.length ? strs.length - 1 : null;
	const answer = [...groups.values()].map((group) => [...group]);
	const resultPreview = answer.slice(0, 6).map((group) => group.slice(0, 6));
	const omitted = answer.length > 6 || answer.some((group) => group.length > 6);
	push(
		"result",
		"最终结果",
		`返回 ${JSON.stringify(resultPreview)}${omitted ? "（省略部分单词或分组）" : ""}；组的顺序不影响正确性。`,
		answer,
	);
	return steps;
}
export const getVariables = (s) => [
	{
		name: "word",
		label: "当前单词",
		value: s.word === null ? null : JSON.stringify(s.word),
	},
	{
		name: "key",
		label: "排序键",
		value: s.key === null ? null : JSON.stringify(s.key),
	},
	{
		name: "groups",
		label: "排序键 → 单词列表",
		wide: true,
		value: `{${s.groups.map(([k, v], i) => `${JSON.stringify(k)}: ${JSON.stringify(v)}${s.sizes[i][1] > v.length ? "（省略前面的词）" : ""}`).join(", ")}}${s.groupCount > s.groups.length ? "（省略其他分组）" : ""}`,
	},
];
const problem = `<div class="problem"><div class="title"><h2>49. 字母异位词分组</h2>${problemBadges("49. 字母异位词分组")}</div><p>将字符串数组 <code class="inline">strs</code> 中字母组成和次数相同的词分为一组。</p><div class="examples"><div><span>输入</span><code>["eat", "tea", "tan", "ate", "nat", "bat"]</code></div><div><span>输出</span><code>[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]</code></div></div><div class="constraint original-row"><div class="problem-notes"><span>字母种类和次数都要相同；分组顺序不限。</span></div><button id="reveal" class="original-cue" aria-expanded="false" aria-controls="solution">展开解答</button></div></div>`;
export const template = cardTemplate({
	problem,
	time: "O(n·k log k)",
	space: "O(n·k)",
	animation:
		'<p id="sample-note" class="hash-caption"></p><div id="words" class="array-row"></div><p id="key-cue" class="hash-caption"></p><div id="groups" class="hash-map"></div><p id="result" class="hash-caption"></p><p class="legend">紫框：当前词　绿框：当前分组；下标标记输入位置。</p>',
});
export function mount(root, signal) {
  mountStatementExamples(root, signal, "49");
	return mountCard(root, signal, {
		id: "49",
		source,
		codes,
		examples,
		buildTrace,
		getVariables,
		formatExample: (e) => `${e.label} · strs = ${JSON.stringify(e.strs)}`,
		renderAnimation(root, s, e) {
			root.getElementById("sample-note").textContent = e.note;
			const indices =
				e.strs.length <= 8
					? e.strs.map((_, i) => i)
					: [
							...new Set([
								0,
								Math.max(0, (s.i ?? 0) - 1),
								s.i ?? 0,
								Math.min(e.strs.length - 1, (s.i ?? 0) + 1),
								e.strs.length - 1,
							]),
						].sort((a, b) => a - b);
			root.getElementById("words").innerHTML = indices
				.map(
					(i, p) =>
						`${p && i > indices[p - 1] + 1 ? "<span>…</span>" : ""}<div class="array-item${i === s.i ? " current" : ""}"><small>${i}${i === s.i ? " · 当前" : ""}</small><div class="array-value">${escapeHtml(JSON.stringify(e.strs[i]))}</div></div>`,
				)
				.join("");
			root.getElementById("key-cue").textContent =
				s.line === "word"
					? "取出新单词，下一步才更新排序键。"
					: s.key === null
						? "排序键：尚未生成"
						: `${JSON.stringify(s.word)} → 排序 → ${JSON.stringify(s.key)}`;
			root.getElementById("groups").innerHTML =
				s.groups
					.map(
						([k, v], i) =>
							`<span class="map-entry${k === s.key && s.line !== "word" ? " match" : ""}"><b>${escapeHtml(JSON.stringify(k))}${k === s.key && s.line !== "word" ? " · 当前组" : ""}</b><em>→</em>${escapeHtml(JSON.stringify(v))}${s.sizes[i][1] > v.length ? " …" : ""}</span>`,
					)
					.join("") || '<span class="empty-map">{} · 空字典</span>';
			if (s.groupCount > s.groups.length)
				root
					.getElementById("groups")
					.insertAdjacentHTML("beforeend", "<span>… 省略其他分组</span>");
			root.getElementById("result").textContent = s.answer
				? `最终结果：${JSON.stringify(s.answer.slice(0, 6).map((g) => g.slice(0, 6)))}${s.answer.length > 6 || s.answer.some((g) => g.length > 6) ? "（省略部分单词或分组）" : ""}`
				: "";
		},
	});
}
