# 算法卡片浏览器运行时

algorithm-card.js 注册 custom element，异步加载题目并挂载 Shadow DOM；registry.js 是题号登记和动态加载入口。断开连接时中止监听并调用题目的清理函数，临时 DOM 移动不重复挂载。

problems/<题号>.js 保存样例、轨迹与画面；*-code.js 保存四语言解法和执行阶段标记；meta.js、statement-examples-data.js 是共享题目资料。

shared/card-ui.js 管理公共交互；base-template/theme/solution-styles 管理外观；monitor-terminal 管理状态终端；code-resource/code-ideas 处理代码标记与注释；tree、graph、matrix、linked-list 等模块复用同类展示及轨迹能力。

每一步保存独立快照，代码高亮、说明和状态同步。只能使用上一步、下一步和拖动进度条；不更改控制栏布局。事件绑定使用实例 signal，计时器和额外资源提供清理函数。

生成资源在 src/components/algorithms/code；修改解法后重新生成。public JavaScript 不被当前 TypeScript 配置覆盖，需运行 tests 并检查实际浏览器交互。ui-demo 演示分支已从正式入口移除。
