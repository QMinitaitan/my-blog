# Hot 100 本地开发与验证记录

2026-10-05 北京时间 06:00 一次性定时任务触发后开始。成果保留在 E:\fuwari，没有发布或提交，保留任务开始前已有的工作区修改。

## 覆盖

17 个原专题、100 个唯一题号全部接入 AlgorithmCard，保留原题标题、链接、ProblemDivider、articleLevel 和原路由。每题具有中文题意、算法直觉、实际复杂度、多个小样本、真实轨迹、状态监控、四语言解法和独立行映射，共 400 份语言源码。哈希专题 1、49、128 全部补齐，无链接占位计数。

精确清单见 hot100-development-progress.md，文章与登记核对见 ../output/hot100-coverage.json。

## 自动验证

- node --test tests/*.test.mjs：100 项通过，包含要求的 algorithm-card.test.mjs。覆盖独立暴力/枚举/排序/图连通性参考、随机输入、边界、节点身份、深复制指针、快照不变性及约束内压力数据。
- node scripts/verify-algorithm-languages.mjs：Python 403 组样例执行通过，100 份 C++ 源码通过 C++17 语法编译。
- pnpm check：0 errors、0 warnings，1 条已有 hint（languagebadge_cssVar 未使用）。
- pnpm build：代码高亮资源、Astro 和 Pagefind 全部完成。
- git diff --check：通过。LF/CRLF 提示属于 Git 换行策略，不是空白错误。
- 最后修改树指针标签后补跑算法卡片和树/堆/缓存回归：13 项通过，并再次构建。

Java 没有可用编译器，没有做编译或执行验证。C++ 当前是语法编译，不是样例执行，不能描述为四语言均运行通过。TreeNode、ListNode、Node 使用力扣平台定义，本地验证脚本提供兼容定义。

## 浏览器验收

- 全部 17 页逐页打开，DOM 中共 100 张卡片，展开按钮均可用，无加载失败。证据：../output/hot100-browser-coverage.json。
- 哈希、双指针、堆：展开、播放/暂停、样本切换暂停归零、前后步进、重置、速度控件、多卡片独立状态。
- 样本菜单键盘 Enter 选择，代码/动画切换，代码展开/收起及 Escape。
- 编辑距离 horse→ros 返回 3，真实二维表和三个依赖格可见；Python/Java/C++/JS 分别高亮自己的 return 行 18/21/36/19。
- N 皇后 n=4 返回两种方案，上一步还原中间状态，下一步恢复终态。390×844 手机视口：页面 scrollWidth=390，卡片与控件宽 348，控件 scrollWidth=348，无横向溢出。
- Trie 的 apple/app 共享路径、完整词星号标记，search 和 startsWith 的不同输出；方法返回记录为 [null,null,true,false,true,null,true]。
- 课程表依赖图、入度和队列显示真实状态，最终队列为空、结果 true。
- 随机链表 N/C 身份分开，next 蓝线、random 橙色虚线。新副本刚创建时指针为空，自动测试检查所有副本指针都属于新链。
- 树展开最终沿 right 连接，重置恢复原树；辅助指针分别显示实际角色。
- 复制：早期 Java 数组解法读取完整剪贴板；最终 Trie 复制后在搜索输入框实际粘贴核对完整源码，再清空测试输入。
- 亮/暗主题实际切换，card-bg 由 white 变为暗色；已恢复跟随系统，临时手机视口已恢复。代表页面未记录控制台错误。

截图：../output/hot100-trie-preview.jpg、../output/hot100-mobile-queens.jpg。本地预览 http://127.0.0.1:4322/，哈希页面保留供查看。

## 组件审查及实际边界

数据、四语言代码、轨迹、结构渲染、公共操作和构建高亮分开。公共接口拒绝缺失阶段或越界行号；AbortSignal 与清理函数管理播放、复制反馈、事件和异步加载。短暂 DOM 移动复用实例，真正离开页面清理，迟到模块不能挂到已移除节点。数组、矩阵、图、链表、频率桶和缓存窗口保留原编号与省略标记；教学样本显示小规模完整过程。

接入步骤及字段契约见 mdx-components.md。覆盖和代表性交互已验收；没有在浏览器逐一播放全部 403 组样本，该部分由自动算法和阶段映射验证覆盖。

构建有已有 Browserslist 数据过旧提示、Pagefind 不支持中文词干提取提示；构建成功，未因此更新无关依赖。阶段日志在 ../output/hot100-*.log。

本任务仅运行一次，结束后自动化设为 PAUSED，不安排每日重复生成。
