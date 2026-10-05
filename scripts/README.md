# 生成与维护脚本

| 脚本 | 用途及写入位置 |
| --- | --- |
| build-algorithm-code.mjs | 构建四语言高亮资源到 src/components/algorithms/code |
| new-post.js | 创建文章 |
| sync-hot100-cards.mjs | 同步专题卡片、分隔线并输出 output/hot100-coverage.json |
| sync-problem-meta.mjs | 更新题目资料 |
| sync-statement-examples.mjs | 获取/解析题目样例，写缓存与正式样例模块 |
| verify-algorithm-languages.mjs | 执行多语言验证并写 output/language-check |

同步脚本会改源文件，不当作只读检查。样例同步的 --cached 依赖 output/statement-examples-raw.json，不能按临时文件随意删除。多语言验证依赖机器上配置的编译器路径，迁移机器前核实。

dev/start/build 先运行代码生成；build 再运行 Astro 和 Pagefind。当前 build 不自动运行 tests。启动端口和后台日志严格遵守 AGENTS.md。
