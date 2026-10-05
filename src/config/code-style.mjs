// Shared by article code fences and the algorithm card's build-time renderer.
export const codeTheme = 'github-dark';
export const codeStyleOverrides = {
	codeBackground: 'var(--codeblock-bg)',
	borderRadius: '0.75rem',
	borderColor: 'transparent',
	codeFontSize: '0.875rem',
	codeFontFamily: "'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
	codeLineHeight: '1.5rem',
	frames: {
		editorBackground: 'var(--codeblock-bg)',
		terminalBackground: 'var(--codeblock-bg)',
		terminalTitlebarBackground: 'var(--codeblock-topbar-bg)',
		editorTabBarBackground: 'var(--codeblock-topbar-bg)',
		editorActiveTabBackground: 'none',
		editorActiveTabIndicatorBottomColor: 'var(--primary)',
		editorActiveTabIndicatorTopColor: 'none',
		editorTabBarBorderBottomColor: 'var(--codeblock-topbar-bg)',
		terminalTitlebarBorderBottomColor: 'transparent',
		frameBoxShadowCssValue: 'none',
	},
	textMarkers: { delHue: 0, insHue: 180, markHue: 250 },
};
