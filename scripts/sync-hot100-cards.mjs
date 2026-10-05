import { readdir, readFile, writeFile, rename } from 'node:fs/promises';
import { problemIds } from '../public/algorithm-cards/registry.js';

// 只为已登记且验证完成的题目插入卡片，保留标题、原题链接及文章路由。
const folder = new URL('../src/content/posts/', import.meta.url);
const entries = (await readdir(folder)).filter(name => /^leetcode-hot100-.*\.mdx?$/.test(name));
const coverage = [];

// 每道题（包括最后一题）都以分隔线收尾。先清掉旧位置，再统一放到小节末尾。
function normalizeDividers(text) {
	const isHeading = line => /^##\s+\d+\s/.test(line);
	const lines = text
		.split(/\r?\n/)
		.filter(line => line.trim() !== '<ProblemDivider />');
	while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
	const output = [];
	let started = false;
	for (let index = 0; index < lines.length; index += 1) {
		const line = lines[index];
		if (isHeading(line)) started = true;
		output.push(line);
		const nextContent = lines.slice(index + 1).find(item => item.trim() !== '');
		const endsProblem = started && line.trim() !== '' && !isHeading(line) && (nextContent === undefined || isHeading(nextContent));
		if (endsProblem) output.push('', '<ProblemDivider />');
	}
	return output.join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
}

for (const name of entries) {
	const file = new URL(name, folder);
	const original = await readFile(file, 'utf8');
	const chapters = [...original.matchAll(/^##\s+(\d+)\s+(.+)$/gm)];
	let content = original;
	for (const [, number, title] of chapters) {
		const id = String(Number(number));
		coverage.push({ id, title, topic: name.replace(/\.mdx?$/, ''), card: problemIds.includes(id) });
		if (problemIds.includes(id) && !content.includes(`<AlgorithmCard id="${id}"`)) {
			content = content.replace(`## ${number} ${title}`, `## ${number} ${title}\n\n<AlgorithmCard id="${id}" articleLevel />`);
		}
	}
	if (content.includes('<AlgorithmCard ')) {
		if (!content.includes('import { AlgorithmCard')) {
			const end = content.indexOf('\n---', 3) + 4;
			content = content.slice(0, end) + '\n\nimport { AlgorithmCard, ProblemDivider } from "@components/fuwari-mdx";' + content.slice(end);
		}
		content = normalizeDividers(content);
	}
	if (content !== original) await writeFile(file, content);
	if (content.includes('<AlgorithmCard ') && name.endsWith('.md')) await rename(file, new URL(name.replace(/\.md$/, '.mdx'), folder));
}
const seen = new Set();
for (const item of coverage) {
	if (seen.has(item.id)) throw new Error(`重复题号 ${item.id}`);
	seen.add(item.id);
}
if (coverage.length !== 100) throw new Error(`Hot 100 清单实际有 ${coverage.length} 题`);
await writeFile(new URL('../output/hot100-coverage.json', import.meta.url), JSON.stringify({ complete: coverage.filter(i=>i.card).length, total: coverage.length, problems: coverage }, null, 2) + '\n');
const progress=['# Hot 100 开发进度','',`当前接入 **${problemIds.length}/100** 道交互卡片，保留原有 17 个专题。此清单记录接入状态，不替代执行、构建和浏览器验证。`,'','## 题目覆盖',''];
for(const topic of [...new Set(coverage.map(p=>p.topic))]){
 const problems=coverage.filter(p=>p.topic===topic);
 progress.push(`### ${topic}`,'',...problems.map(p=>`- [${p.card?'x':' '}] ${p.id} ${p.title}`),'');
}
progress.push('## 验证入口','','- `node --test tests/*.test.mjs`：算法结果、真实轨迹、边界与阶段映射。','- `node scripts/verify-algorithm-languages.mjs`：Python 样例执行及 C++ 语法编译。','- `pnpm check`、`pnpm build`、`git diff --check`。','- 浏览器检查记录见 `docs/hot100-verification.md`。','- Java 编译器尚未配置，不能将 Java 执行描述为已验证。','');
await writeFile(new URL('../docs/hot100-development-progress.md',import.meta.url),progress.join('\n'));
console.log(`Hot 100 cards: ${problemIds.length}/100; topics: ${entries.length}`);