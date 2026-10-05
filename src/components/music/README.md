# 音乐组件

MusicManager.astro 管理共享音频、播放状态及播放事件；MusicPlayer.astro 提供单个播放器结构；MusicPlayerView.astro 为页面中的播放器绑定操作和同步状态。widget/Music.astro 组合它们，配置来自 src/config/musicConfig.ts。

多个视图共用播放管理器，避免每份视图创建独立播放状态。局部导航移除视图时清理窗口监听和计时器；持久管理器与短生命周期视图区分维护。

功能、持久化和迁移许可证见 docs/music-player.md、docs/firefly-music-LICENSE.txt。配置关闭的播放器仍是保留功能。
