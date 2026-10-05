# 算法卡片构建期包装

AlgorithmCard.astro 读取题号对应代码源与 code/<题号>.json，把四语言 HTML/CSS 放进 template，并接入浏览器 custom element。

code/ 是 scripts/build-algorithm-code.mjs 的生成结果，不手工编辑。实际代码源、阶段标记位于 public/algorithm-cards/problems/*-code.js。329 使用独立模板，保留特例。

这里只负责资源接入，不实现轨迹或交互。缺少普通题目代码资源时构建应报错。当前所有语言模板随文章下载；按需加载优化尚未实施。

开发约束见 docs/algorithm-card-development.md，运行时说明见 public/algorithm-cards/README.md。
