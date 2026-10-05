import type { MusicPlayerConfig } from "../types/musicConfig";

// 挂载 Music 组件后，再打开此开关；目前只保存备用。
export const musicPlayerConfig: MusicPlayerConfig = {
	showInNavbar: false,
	showInSidebar: false,
	mode: "local",
	volume: 0.7,
	playMode: "list",
	showLyrics: true,
	local: { playlist: [] },
};
