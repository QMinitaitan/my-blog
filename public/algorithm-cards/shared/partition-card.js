import { sampleBounds, reserveSample } from "./sample-layout.js";
import { cardTemplate, mountCard, escapeHtml, problemNotes, resolveNotes } from "./card-ui.js";
import { problemBadges } from "../problems/meta.js";
import { stateValue } from "./state-value.js";
export function partitionCard({ codes, examples, buildTrace }) {
	const problem =
		`<div class="problem"><div class="title"><h2>4. 寻找两个正序数组的中位数</h2>${problemBadges("4. 寻找两个正序数组的中位数")}</div><p>两个有序数组合并后的中位数；奇数取中间数，偶数取中间两数平均值。</p>${problemNotes(resolveNotes("4. 寻找两个正序数组的中位数", undefined, "要求 O(log(min(m,n)))；不能先合并排序。"))}</div>`;
	const template = cardTemplate({
		problem,
		thought:
			"在较短数组上二分切口 i，另一个切口 j=half-i，使左侧总数固定。只需左A≤右B、左B≤右A，就能保证所有左侧值不大于右侧值。",
		time: "O(log(min(m,n)+1))",
		space: "O(1)",
		animation:
			'<p id="sample-note" class="hash-caption"></p><p>数组 a（较短）</p><div id="a" class="array-row"></div><p>数组 b</p><div id="b" class="array-row"></div><p id="cuts" class="hash-caption"></p><p id="result" class="hash-caption"></p><p class="legend">“左”/“右”：分割两侧　紫色切口：候选分割位置</p>',
	});
	const row = (values, indices, length, cut) =>
		`${indices ? "<span>仅显示分割附近，跳号处省略</span>" : ""}${values
			.map((v, p) => {
				const index = indices?.[p] ?? p;
				return `<div class="array-item"><small style="color:${index === cut ? 'var(--primary)' : 'inherit'}">${index === cut ? '│切口│ ' : ''}${index} · ${cut === null ? "未分割" : index < cut ? "左" : "右"}</small><div class="array-value">${escapeHtml(v)}</div></div>`;
			})
			.join(
				"",
			)}<div class="array-item${cut === length ? '' : ' sample-placeholder'}"><small>│切口│</small><div class="array-value">末尾</div></div>${length === 0 ? "<span>空数组</span>" : ""}`;
	return {
		template,
		mount(root, signal) {
			return mountCard(root, signal, {
				id: "4",
				codes,
				examples,
				buildTrace,
				prepareAnimation(root, steps) {
          const bounds = sampleBounds(steps);
          bounds.valueCharacters = Math.max(1, ...steps.flatMap(step => [...step.a, ...step.b]).map(value => String(value).length));
          const rows = Object.fromEntries(['a', 'b'].map(id => [id, {count: Math.max(...steps.map(step => step[id].length)) + 1, extraHeight: steps.some(step => step[`${id}Indices`]) ? 48 : 0}]));
          return reserveSample(root, bounds, {rows, texts: {stage: 'text', cuts: 120, result: 'answer'}});
        },
				formatExample: (e) =>
					`${e.label} · ${JSON.stringify(e.nums1)} / ${JSON.stringify(e.nums2)}`,
				getVariables: (s) =>
					[
						["half", "左侧需要的元素数"],
						["i", "a 左侧数量"],
						["j", "b 左侧数量"],
						["leftA", "a 左边界"],
						["rightA", "a 右边界"],
						["leftB", "b 左边界"],
						["rightB", "b 右边界"],
					].map(([name, label]) => ({
						name,
						label,
						value: stateValue(s, name),
					})),
				renderAnimation(root, s, e) {
					root.getElementById("sample-note").textContent = e.note;
					root.getElementById("a").innerHTML = row(
						s.a,
						s.aIndices,
						s.aLength,
						s.i,
					);
					root.getElementById("b").innerHTML = row(
						s.b,
						s.bIndices,
						s.bLength,
						s.j,
					);
					root.getElementById("cuts").textContent =
						`i 的搜索闭区间：[${s.left ?? "—"},${s.right ?? "—"}]；a 前 ${s.i ?? "—"} 个 + b 前 ${s.j ?? "—"} 个 = 左侧 half ${s.half ?? "—"} 个`;
					root.getElementById("result").textContent = s.final
						? `最终中位数：${s.answer}`
						: "";
				},
			});
		},
	};
}
