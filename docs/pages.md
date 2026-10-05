# 路由层

[...page].astro 生成分页首页，posts/[...slug].astro 生成文章页；archive.astro、about.astro 为归档和关于页。rss.xml.ts 与 robots.txt.ts 生成订阅及爬虫入口。

路由从 content-utils 查询内容，选择布局并传入数据。页面不应复制算法执行或主题持久化逻辑。文章通过 entry.render() 获取 Content、标题目录与阅读统计。

RSS 使用摘要订阅，不解析或输出 MDX 原文。正式域名由 astro.config.mjs 的 site 决定。设计比较页已清理；新实验不默认创建可发布路由。
