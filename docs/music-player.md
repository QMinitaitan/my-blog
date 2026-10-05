# 音乐播放器（备用）

播放器由 Firefly 移植，已适配 Fuwari，目前未导入正式页面，且 `showInSidebar` 为 `false`。因此首页不会显示播放器、创建音频对象或请求在线歌单。

## 以后启用

1. 编辑 `src/config/musicConfig.ts`，把 `showInSidebar` 改为 `true`，在 `local.playlist` 填入歌曲。
2. 在 `src/components/widget/SideBar.astro` 的 frontmatter 导入 `Music`，并在想显示的位置添加 `<Music />`。

```astro
import Music from "./Music.astro";
```

```astro
<Music />
```

音乐文件可以放在 `public/music/`，配置中使用网站路径。例如文件 `public/music/song.mp3` 对应 `/music/song.mp3`。封面和歌词文件同理。

```ts
local: {
  playlist: [
    {
      name: "歌曲名",
      artist: "歌手",
      url: "/music/song.mp3",
      cover: "/music/cover.jpg",
      lrc: "/music/song.lrc",
    },
  ],
},
```

`cover` 和 `lrc` 可省略。`lrc` 也支持直接填 LRC 文本，如 `[00:00.00]第一行歌词\n[00:05.00]第二行歌词`。站点 base 路径会自动加到本地文件路径前。

也可以给 `<Music config={自定义配置} />` 传入配置，类型为 `MusicPlayerConfig`。一个页面放一个 Music 包装组件；同一浏览器文档使用一个共享播放器和歌单。

## 功能和结构

- 播放、暂停、上一首、下一首、列表循环、单曲循环和随机播放。
- 歌单抽屉、歌词显示及同步、点击歌词定位、音量、静音和点击进度条定位。
- 不自动播放；需要访客点击播放。音量会存入浏览器本地存储。
- `src/components/widget/Music.astro` 是入口，按顺序包含播放管理器、界面和视图脚本，不需要在全局 Layout 另加脚本。
- `src/components/music/MusicManager.astro` 管理一个持久的 HTML Audio 对象，Fuwari 的 Swup 切页时继续保留播放状态。
- `src/components/music/MusicPlayer.astro` 定义播放器外观；`MusicPlayerView.astro` 同步歌曲、歌词和控制按钮。
- `src/config/musicConfig.ts` 管理开关与歌曲，`src/types/musicConfig.ts` 定义配置类型，`src/utils/music-i18n.ts` 提供中文和英文提示。

## 在线歌单

保留了 Firefly 的 Meting 模式。需要将 `mode` 改为 `"meting"` 并自行配置 `meting.api`、`server`、`type` 和 `id`，也支持 `fallbackApis`。API 模板支持 `:server`、`:type`、`:id`、`:r` 占位符。

当前默认使用空的本地歌单，没有预设在线 API，没有复制 Firefly 示例歌曲。在线模式的可用性、第三方接口和跨域配置未做联网验证。客户端配置会公开到页面，不能填写私密凭据。

`showInNavbar` 类型字段保留供以后扩展；此次没有移植导航栏按钮。启用侧栏只需上述两步。

## 来源与验证

源文件来自本地 CuteLeaf/Firefly，参考提交 `b6590cb9652a322a1d74305847805b703b6b1a31`。版权和 MIT 许可见 `firefly-music-LICENSE.txt`。

移植适配了 Fuwari 的 WidgetLayout、Tailwind 3 主题变量语法、已有图标集合、站点路径和中文提示；播放管理器使用独立的 `__fuwariMusic` 名称。视图清理会先检查节点是否仍连接，避免 Fuwari 移动节点时误移除监听器。

在临时页面使用两首本地静音测试音频验证了播放、暂停、切歌、音量、进度、歌词、播放模式和切页后恢复。测试页面及音频已移除，不进入正式站点。
