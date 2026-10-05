# 工作产物目录

保存开发服务日志、验证记录、截图、语言检查产物和样例缓存，不是发布目录。

dev-current.log/dev-current.err.log 是当前服务日志，不在运行时删除。statement-examples-raw.json 被样例同步脚本的 --cached 模式读取；hot100-coverage.json 被开发记录引用。其他文件需先判断是否还有验证或排查价值，再清理。

一次性源码补丁已清理，维护脚本应放入 scripts 并说明作用。清理清单见 docs/cleanup-2026-10-05.md。
