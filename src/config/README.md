# 配置层

src/config.ts 是站点、导航、个人资料及代码主题等主要配置；本目录 code-style.mjs 共享正文与算法代码的字体、背景、行高和外框；musicConfig.ts 保存音乐设置。

astro.config.mjs 负责构建集成、site/base、Markdown 插件与 Swup；tailwind.config.cjs 负责样式工具配置。类型约定见 src/types，固定常量见 src/constants。

主题默认值不覆盖浏览器已保存的用户选择。修改代码外观优先改共用配置，不在每张卡片追加覆盖。正式域名需在发布前核实。
