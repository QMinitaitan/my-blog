import { sampleBounds, reserveSample } from "../shared/sample-layout.js";
import { mountStatementExamples } from "../shared/statement-examples.js";
import { cardTemplate, mountCard, escapeHtml } from "../shared/card-ui.js";
import { problemBadges } from "./meta.js";
import { codes } from "./1-code.js";

export const source = codes[0].source;

export const examples = [
  { label: "基础样本", nums: [2, 7, 11, 15], target: 9 },
  { label: "跳过干扰数字", nums: [3, 2, 4], target: 6 },
  { label: "重复数字，使用不同下标", nums: [3, 3], target: 6 },
  { label: "负数与正数配对", nums: [-4, 0, 4, 9], target: 0 },
  { label: "零参与配对", nums: [0, 4, 7], target: 4 },
  { label: "最小输入，两个零", nums: [0, 0], target: 0 },
  { label: "重复数字更新下标", nums: [2, 2, 3, 8], target: 11 },
  { label: "答案在数组两端", nums: [1, 4, 6, 9], target: 10 },
  {
    label: "数值边界 ±10⁹",
    nums: [-1_000_000_000, 1_000_000_000, 3],
    target: 0,
  },
];

export function buildTrace({ nums, target }) {
  const seen = new Map();
  const steps = [];
  const recent = [];
  let i = null,
    num = null,
    need = null,
    answer = null;
  function push(line, stage, text) {
    const preview = [...recent];
    if (seen.has(need) && !preview.some(([key]) => key === need))
      preview[0] = [need, seen.get(need)];
    steps.push({
      line,
      stage,
      text,
      i,
      num,
      need,
      target,
      answer: answer && [...answer],
      seen: preview,
      seenCount: seen.size,
      match: seen.get(need) ?? null,
    });
  }
  push(3, "准备", "seen = {}");
  for (i = 0; i < nums.length; i++) {
    num = nums[i];
    need = null;
    push(4, "遍历数组", `i = ${i}, num = ${num}`);
    need = target - num;
    push(5, "计算差值", `need = ${target} - (${num}) = ${need}`);
    const found = seen.has(need);
    push(
      6,
      "查询哈希表",
      found ? `seen[${need}] = ${seen.get(need)}` : `${need} not in seen`,
    );
    if (found) {
      answer = [seen.get(need), i];
      push(
        7,
        "找到答案",
        `return [${answer.join(", ")}] | ${nums[answer[0]]} + ${num} = ${target}`,
      );
      return steps;
    }
    seen.set(num, i);
    const previous = recent.findIndex(([key]) => key === num);
    if (previous !== -1) recent.splice(previous, 1);
    recent.push([num, i]);
    if (recent.length > 8) recent.shift();
    push(8, "存入哈希表", `seen[${num}] = ${i}`);
  }
  i = num = need = null;
  answer = [];
  push(9, "遍历结束", "return []");
  return steps;
}

export function getVariables(step) {
  const { i, num, need } = step;
  return [
    { name: "i", label: "current index", value: i },
    { name: "num", label: "current value", value: num },
    { name: "need", label: "complement", value: need },
    {
      name: "seen",
      label: `value → index · ${step.seenCount} entries`,
      value: step.seen,
    },
  ];
}

const problem = `<div class="problem"><div class="title"><h2>1. 两数之和</h2>${problemBadges("1. 两数之和")}</div><p>给定整数数组 <code class="inline">nums</code> 和目标值 <code class="inline">target</code>，找出和等于目标值的两个数字，返回它们的<strong>下标</strong>。</p><div class="examples"><div><span>输入</span><code>nums = [2, 7, 11, 15], target = 9</code></div><div><span>输出</span><code>[0, 1]</code></div><div><span>解释</span><code>nums[0] + nums[1] = 2 + 7 = 9</code></div></div><div class="constraint original-row"><div class="problem-notes"><span>同一元素不能重复使用；答案唯一。</span><span>进阶：时间复杂度低于 O(n²)。</span></div><button id="reveal" class="original-cue" aria-expanded="false" aria-controls="solution">展开解答</button></div></div>`;

export const template = cardTemplate({
    problem,
    animation:
      '<div class="array-row" id="array" aria-label="数组和当前下标"></div><p class="hash-caption">seen · 数字 → 下标</p><div class="hash-map" id="hash-map" aria-label="哈希表当前内容"></div><p class="legend"><b>紫色：正在遍历</b>　<em>绿色：找到匹配</em></p>',
  });

export function mount(root, signal) {
  mountStatementExamples(root, signal, "1");
  return mountCard(root, signal, {
    id: "1",
    source,
    codes,
    examples,
    buildTrace,
    prepareAnimation(root, steps, example) {
      const bounds = sampleBounds([...steps, { values: example.nums.slice(0, 8) }]);
      return reserveSample(root, bounds, { rows: { array: Math.min(8, example.nums.length) + (example.nums.length > 8 ? 3 : 0), "hash-map": "seen" }, texts: { stage: "text" } });
    },
    getVariables,
    renderAnimation(root, step, example) {
      const indices = visibleIndices(example.nums.length, step);
      root.getElementById("array").innerHTML = indices
        .map(
          (index, position) =>
            `${position && index > indices[position - 1] + 1 ? '<span class="array-gap">…</span>' : ""}<div class="array-item${index === step.i ? " current" : ""}${step.answer?.includes(index) ? " answer" : ""}"><small>${index}</small><div class="array-value">${escapeHtml(example.nums[index])}</div></div>`,
        )
        .join("");
      root.querySelector(".hash-caption").textContent =
        `seen · ${step.seenCount} 项${step.seenCount > 8 ? " · 当前窗口" : ""}`;
      root.getElementById("hash-map").innerHTML =
        step.seen
          .map(
            ([key, value]) =>
              `<span class="map-entry${key === step.need ? " match" : ""}"><b>${escapeHtml(key)}</b><em>→</em>${escapeHtml(value)}</span>`,
          )
          .join("") || '<span class="empty-map">{} · 尚未存入数字</span>';
    },
  });
}

export function visibleIndices(length, step) {
  if (length <= 8) return Array.from({ length }, (_, i) => i);
  const indices = new Set([0, length - 1, ...(step.answer || [])]);
  const center = step.i ?? 0;
  for (let i = center - 1; i <= center + 1; i++)
    if (i >= 0 && i < length) indices.add(i);
  return [...indices].sort((a, b) => a - b);
}
