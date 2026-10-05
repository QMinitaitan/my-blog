# 日历与文章热力图（备用）

组件位于 `src/components/widget/Calendar.astro`，已适配 Fuwari，目前没有导入任何正式页面，因此不会显示或加载到首页。

## 以后启用

在 `src/components/widget/SideBar.astro` 的 frontmatter 中添加：

```astro
import Calendar from "./Calendar.astro";
```

在希望显示的位置（例如 `<Profile />` 后面）添加：

```astro
<Calendar />
```

只显示日历、不显示热力图时使用 `<Calendar showHeatmap={false} />`。也支持 `class`、`style` 属性。一个页面放一个实例。

## 功能与数据

- 日历有上一月、下一月、回到今天，以及点击月份标题选择月份、年份的功能。
- 热力图沿用 Firefly 的 12 列 × 4 行设计，列对应月份，行对应每月的 1–7、8–14、15–21、22–月底。这是四个日期区间，并非 ISO 日历周。
- 每个区间的文章数决定颜色深浅；悬停显示文章数量，点击切换到该月份。点击有文章的日期可以筛选下方文章列表。
- 构建时读取 Fuwari 的 `posts` 集合，用 `slug` 生成文章链接，排除草稿。新增文章后需重新构建。统计日期采用 `published` 的 UTC 日期部分，访客所在时区不会改变归属日期。
- 文章数据随组件嵌入，不需要额外 API、网络服务或新增依赖。未挂载组件时不会收集或嵌入数据。
- 月份与星期名称使用站点语言；中文站点使用中文说明，其他语言的标题与数量提示使用英文。颜色使用 Fuwari 主题变量，支持亮色和暗色模式。

## 来源

移植自本地 `E:\Firefly\src\components\widget\Calendar.astro`，源仓库为 CuteLeaf/Firefly，参考提交 `b6590cb9652a322a1d74305847805b703b6b1a31`。保留日历与热力图交互，适配了 Fuwari 的 WidgetLayout、Tailwind 3 语法、fa6 图标、文章 slug 与 Swup 切页初始化。

MIT 版权和许可见同目录 `firefly-calendar-LICENSE.txt`。
