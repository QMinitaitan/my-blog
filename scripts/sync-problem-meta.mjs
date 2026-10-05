/**
 * 同步 Hot 100 卡片题目元数据：从力扣官方接口拉取难度与技术标签，
 * 生成 public/algorithm-cards/problems/meta.js，并刷新标签配色变量。
 *
 * 用法：node scripts/sync-problem-meta.mjs
 * 需要网络访问 leetcode.cn；标签中文名与色相在下方 LABELS / HUES 维护。
 */
import fs from "node:fs/promises";

const PROBLEM_DIR = "public/algorithm-cards/problems";
const META_PATH = `${PROBLEM_DIR}/meta.js`;
const STYLE_PATH = "src/styles/variables.styl";
const THEME_PATH = "public/algorithm-cards/shared/theme.js";
const CACHE_PATH = "output/hash-cards/tags-raw.json";
const MAX_TOPICS = 6;
const TAG_COMMENT = "// 题目技术标签：浅色模式 / 深色模式";

// 标签中文名：力扣 slug -> 中文展示名。
const LABELS = {
  "0-1-knapsack": "0-1 背包", "algorithm-x": "X 算法", "array": "数组", "backtracking": "回溯",
  "binary-lifting": "倍增", "binary-search": "二分查找", "binary-search-tree": "二叉搜索树", "binary-tree": "二叉树",
  "bit-manipulation": "位运算", "boyer-moore-majority-vote-algorithm": "摩尔投票", "bracket-sequences": "括号序列",
  "breadth-first-search": "广度优先搜索", "brute-force-search": "暴力搜索", "bubble-sort": "冒泡排序", "bucket-sort": "桶排序",
  "combinatorics": "组合数学", "complete-knapsack": "完全背包", "counting": "计数", "data-stream": "数据流",
  "depth-first-search": "深度优先搜索", "design": "设计", "directed-acyclic-graph": "有向无环图", "divide-and-conquer": "分治",
  "doubly-linked-list": "双向链表", "dp-on-trees": "树形 DP", "dynamic-programming": "动态规划",
  "floyds-cycle-finding-algorithm": "弗洛伊德判圈", "graph": "图", "greedy": "贪心", "hash-table": "哈希表",
  "heap-priority-queue": "堆（优先队列）", "knapsack-problem": "背包问题", "linked-list": "链表",
  "longest-common-subsequence": "最长公共子序列", "longest-increasing-subsequence": "最长递增子序列",
  "lowest-common-ancestor": "最近公共祖先", "manacher": "马拉车算法", "math": "数学", "matrix": "矩阵",
  "memoization": "记忆化搜索", "merge-sort": "归并排序", "monotonic-queue": "单调队列", "monotonic-stack": "单调栈",
  "pigeonhole-principle": "抽屉原理", "prefix-sum": "前缀和", "queue": "队列", "quickselect": "快速选择",
  "quicksort": "快速排序", "range-minimum-maximum-query": "区间最值查询", "recursion": "递归", "simulation": "模拟",
  "sliding-window": "滑动窗口", "sorting": "排序", "stack": "栈", "string": "字符串", "topological-sort": "拓扑排序",
  "tournament-sort": "锦标赛排序", "tree": "树", "trie": "字典树", "two-pointers": "双指针", "union-find": "并查集",
};

// 色相：同族标签取邻近色，不同族拉开距离；浅色与深色共用同一色相。
const HUES = {
  "array": 212, "hash-table": 172, "string": 268, "sorting": 330, "two-pointers": 236, "binary-search": 195,
  "sliding-window": 200, "prefix-sum": 224, "matrix": 250, "math": 45, "simulation": 30, "dynamic-programming": 285,
  "greedy": 95, "backtracking": 15, "depth-first-search": 145, "breadth-first-search": 185, "binary-tree": 120,
  "binary-search-tree": 135, "tree": 128, "trie": 158, "graph": 190, "topological-sort": 205,
  "directed-acyclic-graph": 215, "union-find": 100, "linked-list": 240, "doubly-linked-list": 252, "stack": 275,
  "monotonic-stack": 290, "queue": 165, "monotonic-queue": 178, "heap-priority-queue": 355, "design": 310,
  "data-stream": 320, "counting": 60, "bit-manipulation": 300, "divide-and-conquer": 25, "recursion": 40,
  "memoization": 50, "quickselect": 335, "quicksort": 10, "merge-sort": 20, "bubble-sort": 5, "bucket-sort": 350,
  "tournament-sort": 340, "range-minimum-maximum-query": 260, "longest-common-subsequence": 295,
  "longest-increasing-subsequence": 280, "dp-on-trees": 130, "knapsack-problem": 70, "0-1-knapsack": 75,
  "complete-knapsack": 80, "combinatorics": 55, "pigeonhole-principle": 65,
  "boyer-moore-majority-vote-algorithm": 345, "floyds-cycle-finding-algorithm": 230, "manacher": 305,
  "binary-lifting": 210, "algorithm-x": 315, "bracket-sequences": 265, "brute-force-search": 35,
  "lowest-common-ancestor": 150,
};

const QUESTION_QUERY = `query questionData($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionFrontendId
    translatedTitle
    difficulty
    topicTags { name slug }
  }
}`;

async function collectIds() {
  const files = await fs.readdir(PROBLEM_DIR);
  const ids = files.filter((f) => /^\d+\.js$/.test(f)).map((f) => f.replace(/\.js$/, ""));
  // 4 与 208 的题干写在公共模板里，同样需要元数据。
  ids.push("4", "208");
  return [...new Set(ids)].sort((a, b) => Number(a) - Number(b));
}

async function fetchRaw(ids) {
  const list = await (await fetch("https://leetcode.cn/api/problems/all/", {
    headers: { "User-Agent": "Mozilla/5.0", Referer: "https://leetcode.cn/problemset/all/" },
  })).json();
  const slugById = new Map();
  for (const p of list.stat_status_pairs) {
    const id = String(p.stat.frontend_question_id);
    if (!slugById.has(id)) slugById.set(id, p.stat.question__title_slug);
  }
  const raw = {};
  for (const id of ids) {
    const slug = slugById.get(id);
    if (!slug) { raw[id] = null; console.log("缺少题号", id); continue; }
    const res = await fetch("https://leetcode.cn/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: `https://leetcode.cn/problems/${slug}/`, "User-Agent": "Mozilla/5.0" },
      body: JSON.stringify({ operationName: "questionData", variables: { titleSlug: slug }, query: QUESTION_QUERY }),
    });
    const item = (await res.json()).data?.question;
    raw[id] = item
      ? { slug, title: item.translatedTitle, difficulty: item.difficulty, topics: item.topicTags.map((t) => t.slug) }
      : null;
    if (!item) console.log("拉取失败", id, slug);
    await new Promise((r) => setTimeout(r, 150));
  }
  return raw;
}

function buildMeta(raw) {
  const unknown = [...new Set(Object.values(raw).filter(Boolean).flatMap((v) => v.topics))]
    .filter((slug) => !LABELS[slug] || !HUES[slug]);
  if (unknown.length) throw new Error(`标签缺少中文名或色相：${unknown.join("、")}`);

  const meta = {};
  for (const [id, info] of Object.entries(raw)) {
    if (!info) continue;
    meta[id] = { difficulty: info.difficulty, topics: info.topics.slice(0, MAX_TOPICS) };
  }
  const slugs = [...new Set(Object.values(meta).flatMap((m) => m.topics))].sort();
  const sortedIds = Object.keys(meta).sort((a, b) => Number(a) - Number(b));

  return `// 由 LeetCode 官方数据生成：难度分级与题目技术标签。请勿手工编辑，运行 node scripts/sync-problem-meta.mjs 重新生成。

export const topicLabels = {
${slugs.map((s) => `\t"${s}": "${LABELS[s]}",`).join("\n")}
};

export const problemMeta = {
${sortedIds.map((id) => `\t"${id}": { difficulty: "${meta[id].difficulty}", topics: [${meta[id].topics.map((t) => `"${t}"`).join(", ")}] },`).join("\n")}
};

const difficultyLabels = { Easy: "简单", Medium: "中等", Hard: "困难" };
const difficultyLevels = { Easy: "easy", Medium: "medium", Hard: "hard" };

export function problemIdFromTitle(title) {
\tconst match = /^(\\d+)\\./.exec(String(title).trim());
\treturn match ? match[1] : null;
}

export function problemBadges(title) {
\tconst id = problemIdFromTitle(title);
\tconst info = id ? problemMeta[id] : null;
\tif (!info) return "";
\tconst level = difficultyLevels[info.difficulty] ?? "medium";
\tconst difficulty = \`<span class="badge difficulty \${level}">\${difficultyLabels[info.difficulty] ?? "中等"}</span>\`;
\tconst topics = info.topics
\t\t.filter((slug) => topicLabels[slug])
\t\t.map((slug) => \`<span class="badge topic" data-topic="\${slug}">\${topicLabels[slug]}</span>\`)
\t\t.join("");
\treturn difficulty + topics;
}
`;
}

async function syncStyles(slugs) {
  const hsl = (h, s, l) => `hsl(${h} ${s}% ${l}%)`;
  const varLines = slugs.map((slug) => `  --algorithm-topic-${slug}: ${hsl(HUES[slug], 52, 33)} ${hsl(HUES[slug], 72, 74)}`);

  const raw = await fs.readFile(STYLE_PATH, "utf8");
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const lines = raw.split(/\r?\n/).filter((line) => !/^  --algorithm-topic-/.test(line) && line.trim() !== TAG_COMMENT);
  const anchor = lines.findIndex((line) => line.startsWith("  --algorithm-hard-text:"));
  if (anchor === -1) throw new Error("variables.styl 未找到 --algorithm-hard-text 锚点");
  lines.splice(anchor + 1, 0, TAG_COMMENT, ...varLines);
  await fs.writeFile(STYLE_PATH, lines.join(eol));

  const rules = slugs.map((slug) => `.badge.topic[data-topic="${slug}"]{--topic-color:var(--algorithm-topic-${slug})}`);
  const theme = await fs.readFile(THEME_PATH, "utf8");
  const themeEol = theme.includes("\r\n") ? "\r\n" : "\n";
  const themeLines = theme.split(/\r?\n/);
  const themeAt = themeLines.findIndex((line) => line.startsWith(".badge.topic{"));
  if (themeAt === -1) throw new Error("theme.js 未找到标签配色块");
  const themeKept = themeLines.filter((line, i) => i < themeAt || !line.startsWith(".badge.topic"));
  themeKept.splice(themeAt, 0, ".badge.topic{background:color-mix(in srgb,var(--topic-color) 12%,transparent);color:var(--topic-color)}", ...rules);
  await fs.writeFile(THEME_PATH, themeKept.join(themeEol));
}

async function main() {
  const ids = await collectIds();
  const raw = await fetchRaw(ids);
  await fs.mkdir("output/hash-cards", { recursive: true });
  await fs.writeFile(CACHE_PATH, JSON.stringify(raw, null, 1));
  await fs.writeFile(META_PATH, buildMeta(raw));
  const slugs = [...new Set(Object.values(raw).filter(Boolean).flatMap((v) => v.topics.slice(0, MAX_TOPICS)))].sort();
  await syncStyles(slugs);
  console.log(`已同步 ${ids.length} 道题，${slugs.length} 个技术标签。`);
}

await main();
