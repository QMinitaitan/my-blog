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
// Formal audio URLs and covers are supplied by the site owner; empty URLs are
// intentional and show a truthful unavailable state, never simulated playback.
export const navbarPlaylist = [
 {name:'学习小调',artist:'本站原创',url:'/music/study-demo.wav',cover:'/images/champloo-night-v2.png'},
 {name:'battlecry',artist:'Nujabes · Shing02',url:'',cover:'/images/champloo-night-v2.png'},
 {name:'aruarian dance',artist:'Nujabes',url:'',cover:'/images/champloo-night.png'},
 {name:'四季ノ唄',artist:'MINMI',url:'',cover:'/images/champloo-night-v2.png'},
 {name:'who’s theme',artist:'Nujabes · MINMI',url:'',cover:'/images/champloo-night.png'},
];
