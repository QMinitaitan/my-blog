# MDX 正文组件

从 `E:\Firefly` 迁移了统一导入入口、Badge、Steps、StepItem、Timeline、TimelineItem、TabGroup 和 Visualization。已适配 Fuwari 的 Astro 5 与 Tailwind 3：MDX 集成使用兼容版本 4，放在 Expressive Code 之后；Badge 使用局部 CSS，步骤条和时间线为 Firefly 的间距变量提供默认值。

## 插入算法卡片

正文保存为 `.mdx`，保留原有 frontmatter，在正文开头导入：

```mdx
import { AlgorithmCard } from "@components/fuwari-mdx";

## 两数之和

<AlgorithmCard id="1" />
```

入口：`src/components/fuwari-mdx.ts`；普通 MDX 组件：`src/components/mdx/`；算法卡片包装：`src/components/algorithms/AlgorithmCard.astro`。

算法卡片文件集中放在 `public/algorithm-cards/`：

- `shared/`：共用外观、控制栏、状态变量展示。
- `problems/1.js`：两数之和的样例、轨迹、数组和字典展示。
- `problems/1-code.js`：Python 3、Java、C++、JavaScript 的完整解法和高亮行对应关系。
- `problems/329.js`：用户提供的原始卡片。
- `algorithm-card.js`：按题号加载组件，并在文章离开时清理事件和复制提示计时器。

已登记卡片由 `public/algorithm-cards/registry.js` 统一维护。当前覆盖情况见 `output/hot100-coverage.json` 和 `docs/hot100-development-progress.md`。每张新卡片分别维护 Python 3、Java、C++、JavaScript 的完整代码与执行阶段映射；49 和 128 已补齐四种语言。不能把专题标题、链接或未登记的模块算作已完成。

新版卡片跟随博客的深浅色、背景和主题色。监控区统一使用紧凑的深色终端：顶部 status 栏展示样本编号与名称，双击状态栏循环切换样本，单击不切换；聚焦样本入口后按 Enter 或空格也可切换，Shift+Tab 保持正常反向焦点导航。>>> 显示当前样本输入，<<< 仅在执行结束后显示真实返回值，尚未返回时显示 ...。解答顶部不再提供独立样本选择栏。前后步进及进度条仍是终端外的原公共控制栏，不由终端组件改写；进度栏永久只允许上一步、下一步和拖动进度条，禁止添加播放、暂停、重置及速度控制。语言选择仍使用共用主题浮层。代码使用真正的 Expressive Code，在构建时生成带原生行号、缩进与折行布局的 `pre > code`。正文与卡片共用 `src/config/code-style.mjs` 的 GitHub Dark 主题、黑色背景、圆角、JetBrains Mono 字体和行高。卡片代码顶栏左侧保留语言选择，右侧保留固定展开和复制；复制的是完整源代码，不带行号。渲染引擎只在构建期间运行，不进入卡片的浏览器脚本。

代码区域双击或点击展开按钮可切换最大化，Escape、切换到动画或收起解答会还原。鼠标移入移出不改变展开状态。展开保留布局占位，避免文章高度跳动。

`scripts/build-algorithm-code.mjs` 在 `dev`、`start`、`build` 前自动更新 `src/components/algorithms/code/<题号>.json`。修改语言解法后，开发服务器运行期间也可单独执行该脚本刷新。生成结果包含四种语言的 Expressive Code HTML 与样式；Shadow DOM 的主题变量挂载在 `:host`，每张卡片复制模板后独立控制执行行。

普通正文直接写带语言的 Markdown 代码围栏即可，无需导入组件。支持 `title="solution.py"` 文件标签、`{5-9}` 行标记、`collapse={1-3}` 折叠，以及 `bash` 终端外框。开发预览：`/posts/code-block-preview/`；设计对照记录见 `docs/code-block-design.md`。

样本选择器提供规模小、有代表性的输入，覆盖常规、重复值、负数、零、最小输入、数值边界及特定执行分支。两数之和包含 9 个教学样本，不在选择器中提供大规模压力输入。各语言必须是对应的完整解法，并维护执行阶段到代码行的映射。10,000 个元素的压力输入仅用于自动测试，验证完整轨迹和有限展示窗口。

验证：`node --test tests/*.test.mjs`，覆盖边界样例、独立暴力解交叉验证、快照不变性、窗口外匹配和压力输入。

## 题目分隔线

`ProblemDivider` 使用通栏紫色粗实线分隔题目，线宽 4px，默认紧凑模式上方留白 10px（`compact={false}` 时为 1rem），下方与下一题标题的间距统一为 1.5rem。组件同时兼容直接相邻的标题和 MDX 自动生成的 `section` 包装，避免标题默认顶部留白撑大间距，所有引用该组件的章节统一生效。在 `.mdx` 正文中使用：

```mdx
import { ProblemDivider } from "@components/fuwari-mdx";

## 第一题

题目内容。

<ProblemDivider />

## 第二题

题目内容。

<ProblemDivider />
```

解答展开后，所属题目末尾的原有紫线可点击收起，也可聚焦后按 Enter 或空格。悬停或聚焦时粗线围绕中心变细，透明命中区域不增加布局高度。收起复用本题解答入口，恢复代码最大化状态，并将焦点和视口返回本题；已收起时分隔线恢复普通分隔语义。

每道题（包括最后一题）都以该分隔线收尾，写完题目后补一行 `<ProblemDivider />`，让整套 Hot 100 专题保持一致。`scripts/sync-hot100-cards.mjs` 在插入卡片时会统一重建这些分隔线，17 个专题已全部对齐。

卡片内部“题目”和“解答”之间的分隔线同样使用该紫色（`#a78bfa`，1px 实线），展开解答后显示在解答内容上方，所有文章级卡片统一。

默认紧凑文章级卡片中，「展开 / 收起解答」按钮底边到下方分隔线中心统一为 12px：收起时为 10px 留白加 4px 粗线的半线宽，展开时为 11.5px 留白加 1px 细线的半线宽。`data-solution-open` 表示实际展开状态。悬停或键盘聚焦解答按钮时，题间粗线以中心为轴缩成 1px 细线，移开后恢复，线中心和布局保持不变；进度栏样式及交互保持原样。

展开后悬停或键盘聚焦「收起解答」时，题干与解答之间的细线以中心为轴变成 4px 粗线，移开恢复 1px；通过伪元素叠加实现，边框占位和 12px 中心距离保持不变。

## 其他迁移组件

```mdx
import { Badge, Steps, StepItem, Timeline, TimelineItem, TabGroup, Visualization } from "@components/fuwari-mdx";

<Badge type="tip">哈希表</Badge>

<Steps>
  <StepItem title="查询">先寻找 target - num。</StepItem>
  <StepItem title="存入">没有匹配时，再记录数字的下标。</StepItem>
</Steps>

<Timeline>
  <TimelineItem date="2026-10-04" title="开始学习" icon="code">算法笔记。</TimelineItem>
</Timeline>
```

TabGroup 保留 Firefly 的 `labels` 属性，使用时加 `client:load`；每个直接子元素对应一个标签。

Visualization 用于已有的独立动画，`src` 必须指向 `public/visualizations/` 对应的 `/visualizations/...` 地址。保留 `firefly:ready`、`firefly:resize`、`firefly:theme` 消息协议，兼容从 Firefly 导出的动画。算法卡片使用用户提供的 Shadow DOM 实现，通过 AlgorithmCard 插入。

参考：[Astro 官方 MDX 集成](https://docs.astro.build/en/guides/integrations-guide/mdx/)。


## 新增题目的开发步骤

1. 阅读项目根目录 AGENTS.md。建立 `problems/<id>-code.js`，使用 `defineCode` 或 `solutionCodes`。在各语言的关键行添加 `# @step phase` 或 `// @step phase`；生成时标记会被移除，阶段行号独立计算，避免新增注释使映射失效。
2. 建立 `problems/<id>.js`，导出 `examples`、`buildTrace`、`template`、`mount`。样本只放原题约束内的小输入，附观察说明；大规模压力数据留给开发验证。
3. 数组、指针和一维 DP 可使用 `shared/sequence-card.js`；柱高与接水使用 `display: 'bars'`；树使用 `shared/tree-card.js`。其他结构应增加对应渲染器，不强行使用数组外观。`recorder()` 每步深复制，不能保留后续会变化的数据引用。
4. 每一步用阶段名关联代码，逐个记录条件、更新和分支；只有执行的分支可以高亮。提前返回必须标记最终状态。递归内的局部返回不等于整题结束。
5. 先用独立算法验证结果、样本约束、各语言阶段、输入不变性和旧状态；再把完成的题号添加到 `registry.js`。不要登记占位模块。
6. 执行 `node scripts/build-algorithm-code.mjs` 生成 Expressive Code 资源；执行 `node scripts/sync-hot100-cards.mjs` 将已登记卡片插入已有专题，保留标题、链接及路由，生成 100 题覆盖清单。已含卡片的文章保留现有内容。
7. 运行 `node --test tests/*.test.mjs`、`pnpm check`、`pnpm build`、`git diff --check`。开发环境可运行 `node scripts/verify-algorithm-languages.mjs` 验证 Python 样本和 C++ 编译；该脚本目前使用本机 D 盘的 Python 与编译器，博客本身不依赖它们，Java 验证需另行配置编译器。
8. 在浏览器中检查多卡片独立状态、样本切换归零、拖动进度条、前后步进、逐语言高亮、复制、双击展开、Escape、主题和窄屏。记录实际已检查的内容，不用构建成功代替界面验收。

公共接入遇到未知题号或缺失代码资源时会明确报错；不会回退到不对应的行号。329 原始独立卡片保留旧入口。共享卡片用 AbortSignal 管理监听器，卸载会清理复制反馈计时器，异步加载和复制结果会检查当前实例是否仍有效。

### 公共接口和展示职责

`examples` 每项包含原题输入、`label` 和一句 `note`。`buildTrace(example)` 不修改样本，返回按代码执行顺序排列的快照。`line` 是阶段名，`text` 是原因说明；`final` 只用于最外层返回或整题提前结束。递归内部返回要用局部变量监控，不能伪装成最终答案。`answer: null` 表示尚未产生结果，空列表、0 和 false 都是已赋值的正常状态。

`codes` 每项提供 `id`、完整 `source` 和 `lines`。阶段标记支持同一行的多个操作，但必须按实际顺序拆步。各语言由 `defineCode` 独立提取行号；有辅助方法、构造器或库调用时也维护各自位置。轨迹以 Python 学习解法的变量和顺序为基准，库堆操作按一次完整调用显示前后状态，JavaScript 的 head 队列额外空间等语言差异在复杂度中明确说明。

稳定能力分在 `shared/`：`card-ui` 管理操作和高亮；`sequence-card` 管理数组、窗口和一维 DP；`matrix-card` 管理网格和二维状态；`tree-card` 管理树及共享引用；`linked-list-card` 管理带稳定节点 id 的 next/random；`backtracking-card` 管理选择路径；`graph-card` 管理有向边与入度；`trie-card` 管理共享前缀和终止标记；`heap-card` 管理真实堆数组对应的完全二叉树。合并有序链表的语言正文和轨迹分别由 `merge-list-code`、`merge-list-trace` 复用。公共渲染器不按题号判断算法。

监控变量可使用 `[name, label, phases]`，第三项可选，仅在相关执行阶段显示辅助变量。例如扩展回文函数的 left/right 不会出现在主调用的变量区域。`state-value` 统一区分尚未赋值和有效空值，并标记局部窗口中的省略项。

压力数据只在开发验证中使用。算法继续计算完整输入，展示快照对大数组、队列、矩阵、节点、频率桶和缓存保存相关窗口，并保留原下标、节点身份及省略说明；结束状态保存完整真实答案。窗口化只降低展示成本，不改变算法本身的时间或空间复杂度。教学样本仍是少量数据的完整过程，不能把一次性生成几十万步作为常规学习入口。

页面过渡在同一轮 DOM 操作中移动卡片时复用当前实例；真正移出页面后清理资源。延迟完成的模块加载不能挂载已移除实例。相关回归检查在 `tests/card-lifecycle.test.mjs`，避免重复挂载清空刚点击的步骤。

## 题目难度与技术标签

Hot 100 全部题卡在题目头部自动展示难度徽章和技术标签。数据来自力扣官方题目接口，集中在 `public/algorithm-cards/problems/meta.js`：`problemMeta` 保存每题的难度与标签 slug，`topicLabels` 保存中文名，`problemBadges(title)` 从题干标题解析题号并输出徽章 HTML。题数较多时只取前 6 个标签，避免头部换行过多。

徽章分两类，样式定义在 `public/algorithm-cards/shared/theme.js`，颜色变量在 `src/styles/variables.styl`：

- 难度 `.badge.difficulty.easy / medium / hard`：简单绿色、中等黄色、困难红色，使用 `--algorithm-easy/medium/hard-bg` 与 `-text`，不随博客主题色变化，浅色与深色模式各有取值。
- 技术标签 `.badge.topic[data-topic="<slug>"]`：每个 slug 对应一个固定的 `--algorithm-topic-<slug>` 色相，同族标签取邻近色（例如树、二叉树、二叉搜索树、树形 DP 都是绿色系）。底色为 `color-mix(in srgb, var(--topic-color) 12%, transparent)`，即约 12% 不透明度的浅底，文字使用同一色相的实色，表示该题涉及的 LeetCode 技术分类，不限于当前展示解法。

各题模板通过 `problemBadges(title)` 统一渲染，编号写死在模板中的题（4 二分分割、208 前缀树）显式传入标题字符串；题号缺失时只有 `sequence-card` 回退到旧的单难度徽章。新增题目时把题号登记进 `problemMeta` 即可，颜色会自动套用。

维护方式：运行 `node scripts/sync-problem-meta.mjs` 从力扣接口重新拉取难度与标签，并刷新 `meta.js`、`variables.styl` 与 `theme.js` 中的配色；新增标签需要在脚本的 `LABELS` 与 `HUES` 中补上中文名和色相。哈希专题的对照截图保存在 `output/hash-cards/`。

### 公共监控终端

公共组件位于 public/algorithm-cards/shared/monitor-terminal.js，外观位于 monitor-terminal-styles.js，由 card-ui.js 的模板和渲染循环统一接入。全部 17 篇 Hot 100 专题的 100 张卡片复用它，无需逐篇复制组件。独立设计 demo 也复用同一组件。原始独立 329 卡片不在这些专题中，保留其原有入口。

组件从样本实际字段生成输入，排除 label/note；真实步骤的 answer 在最外层结束时才作为输出。0、false、空数组及 null 与尚未返回的 ... 区分。大型数据预览限制可见项并明确标记省略。切样本通过公共选择事件归零，快捷键只作用于有焦点的当前卡片，输入控件保留正常键盘行为。
