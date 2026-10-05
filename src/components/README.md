# 组件层

顶层组件负责站点导航、搜索、文章卡片及文章元信息；control/ 是共用操作组件；widget/ 是侧栏与设置部件；misc/ 是正文容器、图片和许可证包装。

mdx/ 面向文章作者；algorithms/ 连接构建资源与浏览器卡片；music/ 分离播放管理和视图。fuwari-mdx.ts 是公开正文组件入口。

优先复用已有组件，属性定义清楚，实例状态独立。全局事件与异步任务说明归属和清理方式。组件专用样式留在组件内，共用主题变量由 styles 层提供。

日历、音乐的功能及开关见 docs/calendar-heatmap.md、docs/music-player.md；关闭配置不代表功能废弃。
