# 项目分层说明

本项目在 Fuwari 上扩展 MDX、算法卡片、日历和音乐。先沿下面两条链路定位代码，再阅读所在目录的 README。

## 内容到页面

文章（src/content）→ schema 与内容查询（src/utils/content-utils.ts）→ 路由（src/pages）→ 页面骨架（src/layouts）→ 正文及站点组件（src/components）。

astro.config.mjs 组织 Markdown/MDX 插件、Expressive Code、Svelte、Swup 和站点输出。MDX 集成排在 Expressive Code 之后。正文组件从 src/components/fuwari-mdx.ts 统一导入。

## 算法卡片

problems/*-code.js → scripts/build-algorithm-code.mjs → src/components/algorithms/code/*.json → AlgorithmCard.astro 的模板 → public/algorithm-cards/algorithm-card.js → registry.js 按题号加载 → problems/<题号>.js 与 shared/ 完成交互。

生成器在 dev/start/build 前运行；运行中的开发服务修改代码源后需要手动重新生成。高亮引擎只在构建期运行。329 保留独立实现，不走普通代码资源流程。

## 每层入口

| 层 | 说明 |
| --- | --- |
| 内容与 schema | [content](../src/content/README.md) |
| 路由与订阅 | [pages](pages.md) |
| 页面布局 | [layouts](../src/layouts/README.md) |
| 组件 | [components](../src/components/README.md) |
| MDX 接口 | [mdx](../src/components/mdx/README.md) |
| 卡片构建期包装 | [algorithms](../src/components/algorithms/README.md) |
| 音乐交互 | [music](../src/components/music/README.md) |
| 配置 | [config](../src/config/README.md) |
| 样式 | [styles](../src/styles/README.md) |
| 内容编译插件 | [plugins](../src/plugins/README.md) |
| 共用工具 | [utils](../src/utils/README.md) |
| 静态资源 | [public](../public/README.md) |
| 卡片浏览器运行时 | [algorithm-cards](../public/algorithm-cards/README.md) |
| 生成与维护脚本 | [scripts](../scripts/README.md) |
| 验证 | [tests](../tests/README.md) |

## 边界

- 文章负责内容和组件引用；页面负责路由和文章数据；布局负责全站骨架。
- src 下由 Astro/Vite 处理的代码与 public 下直接发布的文件分开维护；public JavaScript 不在当前 TypeScript 检查范围内。
- 静态展示使用 Astro；需要响应式交互时使用 Svelte 或已有 custom element。离开 Swup 页面后清理监听、观察器和计时器。
- 图片源在 src/assets，直接按 URL 发布的资源在 public。生成目录 .astro、dist 不手工维护。
- 类型约定在 src/types；常量在 src/constants；翻译在 src/i18n。业务配置不散落在页面里。
- 修改算法卡片遵守 AGENTS.md 和 algorithm-card-development.md，进度栏只能包含上一步、下一步、进度条。

## 已知待讨论项

RSS 已采用摘要订阅，仅输出标题、简介、日期和文章链接，不输出 MDX 原文。
长篇文章提前嵌入四种语言模板；开发响应体积偏大，生产压缩及加载表现尚待测量。
当前 build 不自动执行测试，lint 会写入文件；统一只读验证入口尚未实施。
