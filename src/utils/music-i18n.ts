import { siteConfig } from "../config";

const zh = {
	music: "音乐",
	musicNoPlaying: "暂未播放",
	musicLyrics: "歌词",
	musicVolume: "音量",
	musicPlayMode: "切换播放模式",
	musicPrev: "上一首",
	musicNext: "下一首",
	musicPlaylist: "列表",
	musicNoLyrics: "暂无歌词",
	musicLoadingLyrics: "正在加载歌词...",
	musicFailedLyrics: "歌词加载失败",
	musicNoSongs: "暂无歌曲",
	musicError: "播放器错误",
	musicPlay: "播放",
	musicPause: "暂停",
	musicProgress: "播放进度",
	musicCover: "封面",
	musicNoCover: "暂无封面",
};

const en: typeof zh = {
	music: "Music",
	musicNoPlaying: "Not playing",
	musicLyrics: "Lyrics",
	musicVolume: "Volume",
	musicPlayMode: "Playback mode",
	musicPrev: "Previous track",
	musicNext: "Next track",
	musicPlaylist: "Playlist",
	musicNoLyrics: "No lyrics",
	musicLoadingLyrics: "Loading lyrics...",
	musicFailedLyrics: "Failed to load lyrics",
	musicNoSongs: "No songs",
	musicError: "Player error",
	musicPlay: "Play",
	musicPause: "Pause",
	musicProgress: "Playback progress",
	musicCover: "Cover",
	musicNoCover: "No cover",
};

export const musicText: typeof zh = siteConfig.lang.startsWith("zh") ? zh : en;
