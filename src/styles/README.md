# 样式层

GlobalStyles.astro 引入 variables.styl、markdown-extend.styl 和 global.css。global.css 汇总 main、markdown、transition、scrollbar、photoswipe、expressive-code 样式。

variables.styl 提供主题变量；main.css 管理全站共用工具；markdown 系列管理正文；expressive-code.css 适配代码展示。组件局部样式留在组件文件中。

算法 Shadow DOM 内样式位于 public/algorithm-cards/shared，通过 :host 和主题变量接入全站。正文与卡片代码渲染设置共享 src/config/code-style.mjs。

改变全局选择器前检查普通文章、MDX 和窄屏；避免为了单个实验覆盖 body、button、pre 等全站元素。
