# 内容层

config.ts 定义 posts 和 spec 的 schema。posts/ 保存 Markdown、MDX 文章；spec/about.md 提供关于页正文。

文章必须提供 title 和 published；draft 在生产内容查询中用于过滤草稿。MDX 使用 @components/fuwari-mdx 导入正文组件。不要同时创建同 slug 的 .md 与 .mdx。

这里维护正文和元数据，不维护动画实现或站点布局。保留 mdx-components-preview.mdx、code-block-preview.mdx 两篇草稿用于回归；它们不是废弃设计比较页。不要在 posts/spec 放说明 README，避免被当作内容收集。
