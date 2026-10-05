import { mkdir, writeFile } from 'node:fs/promises';
import { createRenderer } from 'astro-expressive-code';
import { toHtml } from 'astro-expressive-code/hast';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { codeTheme, codeStyleOverrides } from '../src/config/code-style.mjs';
import { problemIds as problems } from '../public/algorithm-cards/registry.js';
import { decorateCodes } from '../public/algorithm-cards/shared/code-ideas.js';

const renderer = await createRenderer({
	themes: [codeTheme],
	plugins: [pluginLineNumbers()],
	defaultProps: { wrap: true, showLineNumbers: true },
	styleOverrides: codeStyleOverrides,
	// The card owns copy and language switching, independently per instance.
	frames: { showCopyToClipboardButton: false },
});
const folder = new URL('../src/components/algorithms/code/', import.meta.url);
await mkdir(folder, { recursive: true });
for (const id of problems) {
	const { codes } = await import(`../public/algorithm-cards/problems/${id}-code.js`);
	const decorated = decorateCodes(id, codes);
	const html = {};
	const styles = new Set([renderer.baseStyles, renderer.themeStyles]);
	for (const code of decorated) {
		const result = await renderer.ec.render({ code: code.source, language: code.id });
		html[code.id] = toHtml(result.renderedGroupAst);
		for (const style of result.styles) styles.add(style);
	}
	// Shadow roots need their theme variables on the host rather than :root.
	html.styles = [...styles].join('\n').replaceAll(':root', ':host');
	await writeFile(new URL(`${id}.json`, folder), `${JSON.stringify(html, null, 2)}\n`);
	console.log(`Algorithm code: generated ${codes.length} Expressive Code blocks.`);
}
