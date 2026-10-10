import { mountProblemDivider } from './problem-divider.js';
import { sampleLayoutStyles } from "./sample-layout.js";
import baseTemplate from "./base-template.js";
import { mountDropdown } from "./dropdown.js";
import { decorateCodes } from "./code-ideas.js";
import { monitorTerminalTemplate, mountMonitorTerminal } from "./monitor-terminal.js";

/**
 * @typedef {Object} CodeResource
 * @property {string} id 语言标识，必须与构建资源一致。
 * @property {string} source 可复制的完整代码，不包含阶段注解。
 * @property {Object.<string, number>} lines 执行阶段到该语言的 1-based 行号。
 * @typedef {Object} TraceStep
 * @property {string} line 当前实际执行阶段，禁止为未执行分支填入阶段。
 * @property {string} text 这一执行时刻的中文说明。
 * @property {boolean} [final] 只有最外层结束或提前返回才能标记整题结束。
 * @property {*} [answer] 真实算法输出；null 表示尚未产生输出。
 *
 * 各渲染器可以扩展 TraceStep 的展示字段，公共控制层不依赖题号或结构。
 * buildTrace 必须返回独立快照；切换样本会从新轨迹第 0 步开始。
 */

export const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/**
 * 每题只保留影响算法判断的短备注；讲解可以放进展开后的内容或代码注释。
 * 题目模块显式传入 notes 时优先使用题目模块自己的配置。
 */
export const algorithmNotes = {
  1: ["同一元素不能重复使用；答案唯一。", "进阶：时间复杂度低于 O(n²)。"],
  49: "字母种类和次数都要相同；分组顺序不限。",
  128: "算法要求：时间复杂度 O(n)。",
  283: "原地修改；非零元素相对顺序不能变。",
  11: "容量由较短边决定；目标是最大面积。",
  15: "三元组不能重复；三个下标互不相同。",
  42: "每格水量取决于左右最高墙中的较矮者。",
  121: "只能买卖一次；买入必须早于卖出。",
  55: "可跳范围连续延伸；判断终点是否被覆盖。",
  45: "求最少跳跃次数；题目保证终点可达。",
  763: "同一字母不能跨片段出现。",
  53: "子数组必须连续；求最大和。",
  56: "端点相等也算重叠；输出区间互不重叠。",
  189: "原地修改；k 可以大于数组长度。",
  238: "不能使用除法；输出数组不计额外空间。",
  41: "只关心正整数；要求 O(n) 时间和 O(1) 额外空间。",
  35: "不存在时返回插入下标；要求 O(log n)。",
  153: "数组无重复；要求 O(log n)。",
  70: "每次只能走 1 或 2 阶。",
  198: "不能偷相邻房屋。",
  300: "子序列可以不连续；要求严格递增。",
  416: "每个数只能用一次；目标和是总和的一半。",
  136: "其余元素都出现两次；要求线性时间、常数额外空间。",
  169: "多数元素出现次数严格超过一半。",
  75: "原地排序；元素只有 0、1、2。",
  94: "按左、根、右的中序顺序返回节点值。",
  104: "空树深度为 0；按节点数计算深度。",
  3: "子串必须连续；窗口内不能有重复字符。",
  560: "连续子数组；元素可以包含负数和 0。",
  279: "平方数可以重复使用；求最少个数。",
  322: "硬币数量无限；凑不出返回 -1。",
  20: "括号必须按正确顺序成对闭合。",
  739: "找下一个严格更高的温度；没有则填 0。",
  31: "原地修改；最大排列要回到最小排列。",
  34: "不存在时返回 [-1, -1]；要求 O(log n)。",
  33: "数组值互不相同；找不到返回 -1。",
  74: "行内递增，下一行首元素大于上一行末元素。",
  240: "每行、每列都按非递减排列。",
  62: "只能向右或向下移动。",
  64: "只能向右或向下移动；求最小总和。",
  48: "原地顺时针旋转 90°。",
  73: "原矩阵中的 0 会让整行整列变 0。",
  102: "逐层从左到右返回节点值。",
  199: "每层只取最右侧节点。",
  98: "左子树严格小于根，右子树严格大于根。",
  230: "k 从 1 开始；利用中序有序性。",
  226: "交换每个节点的左右子树。",
  543: "路径不一定经过根；长度按边数计算。",
  46: "每个数字只使用一次；结果不能重复。",
  78: "包含空集；每个元素选或不选。",
  39: "数字可以重复使用；组合不能重复。",
  22: "任意前缀中左括号不少于右括号。",
  17: "按数字到字母的映射拼接；结果顺序不限。",
  139: "单词可以重复使用；要覆盖整个字符串。",
  152: "子数组连续；负负得正，要同时关注最大和最小乘积。",
  32: "子串连续；只统计合法的括号序列。",
  206: "只修改 next 指针；返回新的头节点。",
  234: "比较节点值；要求 O(n) 时间、O(1) 额外空间。",
  21: "保留所有节点；重复值也要合并。",
  2: "链表逆序存储；逐位相加并处理进位。",
  141: "判断链表中是否存在环。",
  142: "有环返回入口节点；无环返回 None。",
  160: "比较节点身份，不能只比较节点值。",
  19: "删除后返回头节点；n 一定有效。",
  24: "不能只改节点值；剩余单节点保持不动。",
  287: "只有一个重复整数；要求不修改数组、常数额外空间。",
  54: "按顺时针螺旋顺序返回所有元素。",
  118: "每行首尾为 1，中间等于上一行相邻两数之和。",
  1143: "子序列可以不连续；只比较两个字符串。",
  72: "允许插入、删除、替换；求最少操作数。",
  5: "子串必须连续；返回具体回文子串。",
  200: "只统计上下左右相连的陆地。",
  994: "每分钟向上下左右扩散；不能全部腐烂返回 -1。",
  207: "先修关系有向；判断是否存在可行顺序。",
  155: "getMin 必须 O(1)；所有操作保持栈语义。",
  208: "插入与查询单次 O(L)；共享前缀只存一份。",
  4: "要求 O(log(min(m,n)))；不能先合并排序。",
  347: "结果顺序不限；题目保证答案集合唯一。",
  438: "窗口长度固定；返回异位词的起始下标。",
  76: "要覆盖 t 中所有字符及次数；返回最短子串。",
  239: "窗口大小固定为 k；返回每个窗口的最大值。",
  84: "矩形高度由区间内最矮柱子决定。",
  215: "重复值也计数；只返回第 k 大元素。",
  394: "括号可以嵌套；数字表示重复次数。",
  295: "数据流动态加入；查询当前中位数。",
  101: "镜像比较左右子树。",
  124: "路径不一定经过根；节点贡献可以为负并被放弃。",
  108: "要求高度平衡；中序遍历保持原数组顺序。",
  105: "节点值互不相同；两种遍历确定唯一树。",
  114: "原地修改；展开结果按前序连成右链。",
  437: "路径只能向下；起点终点任意，不要求经过根。",
  236: "节点可以是自己的祖先；两个目标都存在。",
  131: "每段都必须是回文；不能跳过字符。",
  51: "任意两个皇后不能同行、同列或同对角线。",
  79: "只能走上下左右；同一格不能重复使用。",
  25: "不足 k 个保持原序；只能修改连接。",
  148: "要求 O(n log n)；返回排序后的头节点。",
  23: "保留所有节点；重复值也要保留。",
  138: "复制后不能共享节点；random 可指向任意节点或 None。",
  146: "get 和 put 平均 O(1)；淘汰最久未使用键。",
};

export function resolveNotes(title, notes, fallback = "") {
  if (notes != null && notes !== "") return notes;
  const id = String(title).match(/^\s*(\d+)/)?.[1];
  return (id && algorithmNotes[id]) || fallback;
}

/**
 * 题干底部的备注行：左侧只放影响算法的要点，右侧是低调的解答入口。
 * notes 可以是单行字符串或字符串数组；展开事件由 mountCard 统一绑定。
 */
export function problemNotes(notes) {
  const lines = Array.isArray(notes) ? notes : notes ? [notes] : [];
  const body = lines.map((line) => `<span>${escapeHtml(line)}</span>`).join("");
  return `<div class="constraint original-row"><div class="problem-notes">${body}</div><button id="reveal" class="original-cue" aria-expanded="false" aria-controls="solution">展开解答</button></div>`;
}

const stateStyles = sampleLayoutStyles + `<style>
.workbench{padding:18px 0 14px}.workbench h4{margin-bottom:12px}
.work-vars{grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:14px}
.work-var{display:block;padding:12px 14px;background:#222530;border:1px solid #333746;border-radius:10px;transition:background .2s,border-color .2s}
.work-var dt{display:flex;flex-wrap:wrap;align-items:center;gap:5px 10px;font-size:13px;color:#b8bdcf}
.work-var dt small{font:12px/1.5 system-ui;color:#9199ae}
.work-var dd{font:600 21px/1.5 ui-monospace,Consolas,monospace;margin:6px 0 0;color:#eee9ff;white-space:normal;overflow-wrap:anywhere}
.work-var.changed{border-color:#7f72b4;background:#302a43}.work-var.unset dd{color:#81899f}
.work-var.wide{grid-column:1/-1}.work-var.wide dd{font-size:14px;display:flex;gap:7px;flex-wrap:wrap;min-height:25px}
.map-entry{display:inline-flex;align-items:center;gap:8px;padding:4px 9px;background:#171b25;border-radius:6px}.map-entry b{color:#c8baff}.map-entry em{font-style:normal;color:#808ba4}
.array-row{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:16px 0 24px}.array-item{min-width:52px;text-align:center}.array-item small{display:block;color:var(--muted);font:12px/1.5 ui-monospace,monospace}.array-value{display:grid;place-items:center;min-height:50px;background:#252833;border:1px solid #424859;border-radius:9px;font:600 23px ui-monospace,monospace}.array-item.current .array-value{background:#42365e;border-color:var(--purple)}.array-item.answer .array-value{background:#203932;border-color:var(--green);color:var(--green)}
.hash-caption{font-size:13px;color:var(--muted);margin:0 0 8px}.hash-map{display:flex;flex-wrap:wrap;gap:8px;min-height:40px}.hash-map .map-entry{border:1px solid #343b4b;font:14px/1.5 ui-monospace,monospace}.hash-map .match{border-color:var(--green);background:#203932}.empty-map{color:#8d96aa;font:14px/1.8 ui-monospace,monospace}.animation{overflow:auto}.legend{margin-top:auto!important;padding-top:10px}.controls{flex-wrap:wrap}.step-buttons{flex-wrap:wrap}.step-buttons select{background:var(--card-bg);color:var(--ink);border:1px solid var(--line);border-radius:6px}.controls .example-select{background:#252834;color:var(--ink);border:1px solid var(--line);border-radius:8px;padding:7px;font:14px system-ui;max-width:100%}
@media(max-width:760px){.work-vars{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.work-var{padding:10px}.work-var dd{font-size:19px}.array-row{gap:7px}.array-item{min-width:42px}.array-value{min-height:44px;font-size:20px}}
@media(prefers-reduced-motion:reduce){.work-var{transition:none}}
</style>`;

export function cardTemplate({
  problem,
  thought = "",
  animation,
  time = "O(n)",
  space = "O(n)",
}) {
  return (
    baseTemplate.slice(0, baseTemplate.indexOf("</style>") + 8) +
    stateStyles +
    `
<article class="card modern">
${problem}
<section class="solution" id="solution" hidden aria-label="算法解答">
<div class="view-heading"><div class="view-switch" role="tablist" aria-label="查看代码或动画"><button id="code-tab" role="tab" aria-selected="true" aria-controls="code-view">代码</button><button id="animation-tab" role="tab" aria-selected="false" aria-controls="animation-view" tabindex="-1">动画</button></div></div>
<div class="reading-area" id="reading-area"><div class="surface-slot"><div class="view-surface">
<div class="view-panel code-view" id="code-view" role="tabpanel" aria-labelledby="code-tab"><div class="code-tools"><select id="language-select" aria-label="选择代码语言"></select><button id="expand-code" type="button" aria-label="展开代码" title="展开代码" aria-pressed="false"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/></svg></button><button id="copy" type="button" aria-label="复制代码" title="复制代码"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/></svg></button></div><div id="code-block"></div></div>
<div class="view-panel" id="animation-view" role="tabpanel" aria-labelledby="animation-tab" hidden><div class="animation"><p class="stage" id="stage"></p>${animation}</div></div>
</div></div>${monitorTerminalTemplate({ time, space })}
</div><div class="controls"><div class="progress-row"><input id="progress" class="progress" type="range" min="0" step="1" value="0" aria-label="拖动以跳转执行步骤"><span class="step-count" id="counter"></span></div><div class="step-buttons"><button id="prev">← 上一步</button><button id="next" class="primary">下一步 →</button></div></div>
</section></article>`
  );
}

/** Every instance owns its trace, sample, language and event listeners. */
export function mountCard(
  root,
  signal,
  {
    id,
    source,
    codes = [{ id: "python", label: "Python 3", source }],
    examples,
    buildTrace,
    renderAnimation,
    prepareAnimation,
    getVariables = (step) => step.variables,
    formatExample,
    onExampleChange,
  },
) {
  if (!examples?.length || !codes?.length)
    throw new Error("卡片必须提供样本和代码");
  codes = decorateCodes(id, codes);
  const $ = (id) => root.getElementById(id);
  // 首次轨迹由 updateExample 创建，避免初始化时重复计算同一份样本。
  let steps = [];
  let clearAnimationLayout;
  let current = 0;
  let disposed = false;
  let expanded = false;
  let copyTimer = null;
  const copyButton = $("copy");
  const copyIcon = copyButton.innerHTML;
  function resetCopy() {
    clearTimeout(copyTimer);
    copyButton.innerHTML = copyIcon;
    copyButton.setAttribute("aria-label", "复制代码");
    copyButton.title = "复制代码";
  }
  const listen = (el, event, handler) =>
    el.addEventListener(event, handler, { signal });
  let codeLines = [];
  const language = $("language-select");
  codes.forEach((code) => language.add(new Option(code.label, code.id)));
  const currentCode = () => codes.find((code) => code.id === language.value);
  function renderCode() {
    resetCopy();
    const code = currentCode();
    const template = root.host.querySelector(
      `template[data-language="${code.id}"]`,
    );
    if (template)
      $("code-block").replaceChildren(template.content.cloneNode(true));
    else
      $("code-block").innerHTML = `<pre><code>${code.source
        .split("\n")
        .map((line) => `<span class="line">${escapeHtml(line) || " "}</span>`)
        .join("\n")}</code></pre>`;
    const pre = $("code-block").querySelector("pre");
    pre.id = "code";
    pre.classList.add("code-scroll");
    pre.tabIndex = 0;
    pre.setAttribute(
      "aria-label",
      `${code.label} 代码，可滚动查看，双击切换最大化`,
    );
    pre.querySelector("code").classList.add(`language-${code.id}`);
    codeLines = [...pre.querySelectorAll(".ec-line, .line")];
    codeLines.forEach((line, i) => {
      if (!line.classList.contains("ec-line")) line.classList.add("code-line");
      line.dataset.line = i + 1;
    });
  }
  const selector = $("example-select");
  examples.forEach((example, i) => {
    if (formatExample) {
      selector.add(new Option(formatExample(example), String(i)));
      return;
    }
    const nums =
      example.nums.length > 8
        ? `${example.nums.slice(0, 4).join(", ")}, …, ${example.nums.slice(-2).join(", ")}`
        : example.nums.join(", ");
    const name = example.label.split(" · ")[0];
    selector.add(
      new Option(
        `${name} · nums = [${nums}] · target = ${example.target} · ${example.nums.length.toLocaleString()} 个元素`,
        String(i),
      ),
    );
  });
  const terminal = mountMonitorTerminal(root, signal, {
    examples,
    onSelect(index) {
      selector.value = String(index);
      selector.dispatchEvent(new Event("change", { bubbles: true }));
    },
  });
  const languageDropdown = mountDropdown(language, signal);
  function focusCode() {
    const area = $("reading-area");
    const focused = expanded && !$("code-view").hidden && !$("solution").hidden;
    const slot = area.querySelector(".surface-slot");
    if (focused && !area.classList.contains("code-focused"))
      slot.style.height = `${slot.getBoundingClientRect().height}px`;
    if (!focused) slot.style.removeProperty("height");
    area.classList.toggle("code-focused", focused);
    const expandButton = $("expand-code");
    expandButton.setAttribute("aria-pressed", String(focused));
    expandButton.setAttribute("aria-label", focused ? "收起代码" : "展开代码");
    expandButton.title = focused ? "收起代码" : "展开代码";
    expandButton
      .querySelector("path")
      .setAttribute(
        "d",
        focused
          ? "M3 8h5V3m8 0v5h5M8 21v-5H3m18 0h-5v5"
          : "M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5",
      );
  }
  function resetFocus() {
    expanded = false;
    focusCode();
  }

  function render() {
    if (disposed) return;
    const step = steps[current];
    $("counter").textContent = `${current} / ${steps.length - 1}`;
    $("stage").textContent = step.stage;
    $("description").textContent = step.text;
    $("progress").max = steps.length - 1;
    $("progress").value = current;
    $("progress").style.setProperty(
      "--progress",
      `${(current / Math.max(1, steps.length - 1)) * 100}%`,
    );
    $("progress").setAttribute(
      "aria-valuetext",
      `第 ${current} 步，共 ${steps.length - 1} 步`,
    );
    $("prev").disabled = current === 0;
    $("next").disabled = current === steps.length - 1;
    const previous = steps[current - 1];
    $("variables").innerHTML = getVariables(step)
      .map((variable) => {
        const old =
          previous &&
          getVariables(previous).find((item) => item.name === variable.name);
        const changed =
          old && JSON.stringify(old.value) !== JSON.stringify(variable.value);
        const isMap = Array.isArray(variable.value);
        const wide = isMap || variable.wide;
        const value = isMap
          ? variable.value
              .map(
                ([key, val]) =>
                  `<span class="map-entry"><b>${escapeHtml(key)}</b><em>→</em>${escapeHtml(val)}</span>`,
              )
              .join("") || '<span class="empty-map">{} · empty dict</span>'
          : escapeHtml(variable.value ?? "—");
        return `<div class="work-var${wide ? " wide" : ""}${changed ? " changed" : ""}${variable.value == null ? " unset" : ""}"><dt><span>${escapeHtml(variable.name)}</span><small>${escapeHtml(variable.label)}</small></dt><dd>${value}</dd></div>`;
      })
      .join("");
    renderAnimation(root, step, examples[Number(selector.value)]);
    terminal.render(examples[Number(selector.value)], Number(selector.value), step, current === steps.length - 1);
    const line = currentCode().lines?.[step.line];
    if (!Number.isInteger(line) || line < 1 || line > codeLines.length)
      throw new Error(`缺少 ${currentCode().id} 的执行阶段映射：${step.line}`);
    codeLines.forEach((el, i) => el.classList.toggle("active", i + 1 === line));
    const active = codeLines[line - 1];
    if (active && !$("solution").hidden && !$("code-view").hidden) {
      const code = $("code");
      const offset =
        active.getBoundingClientRect().top - code.getBoundingClientRect().top;
      if (offset < 0 || offset + active.offsetHeight > code.clientHeight)
        code.scrollTop += offset - code.clientHeight / 2;
    }
  }
  function go(index) {
    current = Math.max(0, Math.min(steps.length - 1, index));
    render();
  }
  function switchView(view) {
    languageDropdown.close();
    for (const name of ["code", "animation"]) {
      const selected = name === view;
      $(name + "-view").hidden = !selected;
      $(name + "-tab").setAttribute("aria-selected", String(selected));
      $(name + "-tab").tabIndex = selected ? 0 : -1;
    }
    if (view !== "code") resetFocus();
    render();
  }
  // 将 Shadow DOM 内的按钮状态传给宿主，联动文章中的题目分隔线。
  const reveal = $("reveal");
  root.host.setAttribute("data-solution-open", "false");
  let revealHovered = false;
  root.host.removeAttribute("data-reveal-active");
  const syncReveal = () =>
    root.host.toggleAttribute(
      "data-reveal-active",
      revealHovered || reveal.matches(":focus-visible"),
    );
  listen(reveal, "pointerenter", () => {
    revealHovered = true;
    syncReveal();
  });
  listen(reveal, "pointerleave", () => {
    revealHovered = false;
    syncReveal();
  });
  listen(reveal, "focus", syncReveal);
  listen(reveal, "blur", syncReveal);
  const divider = mountProblemDivider(root.host, signal, () => {
    if ($("solution").hidden) return;
    reveal.click();
    reveal.focus({ preventScroll: true });
    root.host.scrollIntoView({ block: "start", behavior: "instant" });
  });
  listen(reveal, "click", () => {
    const opening = $("solution").hidden;
    $("solution").hidden = !opening;
    $("reveal").setAttribute("aria-expanded", String(opening));
    root.host.setAttribute("data-solution-open", String(opening));
    divider.setOpen(opening);
    $("reveal").textContent = opening ? "收起解答" : "展开解答";
    if (opening) switchView("code");
    else {
      resetFocus();
      languageDropdown.close();
      }
  });
  function updateExample() {
    const example = examples[Number(selector.value)];
    steps = buildTrace(example);
    if (!steps?.length) throw new Error("执行轨迹不能为空");
    clearAnimationLayout?.();
    clearAnimationLayout = prepareAnimation?.(root, steps, example);
    onExampleChange?.(root, example, Number(selector.value));
    go(0);
  }
  listen($("prev"), "click", () => {
    go(current - 1);
  });
  listen($("next"), "click", () => {
    go(current + 1);
  });
  listen(selector, "change", updateExample);
  listen($("progress"), "input", (event) => {
    go(Number(event.target.value));
  });
  listen(language, "change", () => {
    renderCode();
    render();
  });
  listen(copyButton, "click", async () => {
    const code = currentCode();
    let message;
    try {
      await navigator.clipboard.writeText(code.source);
      message = "已复制";
    } catch {
      message = "复制失败，请手动选择代码复制";
    }
    if (signal.aborted || disposed || currentCode() !== code) return;
    clearTimeout(copyTimer);
    copyButton.textContent = message === "已复制" ? "✓" : "!";
    copyButton.setAttribute("aria-label", message);
    copyButton.title = message;
    copyTimer = setTimeout(resetCopy, 1200);
  });
  for (const name of ["code", "animation"]) {
    listen($(name + "-tab"), "click", () => switchView(name));
    listen($(name + "-tab"), "keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
        return;
      event.preventDefault();
      const next =
        event.key === "Home"
          ? "code"
          : event.key === "End"
            ? "animation"
            : name === "code"
              ? "animation"
              : "code";
      switchView(next);
      $(next + "-tab").focus();
    });
  }
  function toggleCode() {
    expanded = !expanded;
    focusCode();
  }
  listen($("code-block"), "dblclick", toggleCode);
  listen($("expand-code"), "click", toggleCode);
  listen($("solution"), "keydown", (event) => {
    if (event.key === "Escape") resetFocus();
  });
  renderCode();
  updateExample();
  return () => {
    disposed = true;
    clearAnimationLayout?.();
    clearTimeout(copyTimer);
  };
}
