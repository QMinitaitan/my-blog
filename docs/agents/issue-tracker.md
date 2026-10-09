# Issue tracker: GitHub

本项目的规格和任务使用 GitHub 仓库 `QMinitaitan/my-blog` 的 Issues。通过 `gh` CLI 操作；所有命令显式指定 `--repo QMinitaitan/my-blog`，API 路径使用 `repos/QMinitaitan/my-blog/`。

## 操作约定

- 发布规格或任务：创建 GitHub Issue；先查找已有相关 Issue，更新已有条目，避免重复。
- 创建：`gh issue create --repo QMinitaitan/my-blog --title "标题" --body-file <文件>`。多行正文使用 UTF-8 文件保留换行。
- 读取：`gh issue view <编号> --repo QMinitaitan/my-blog --comments`。
- 列表：`gh issue list --repo QMinitaitan/my-blog --state open --json number,title,body,labels,assignees`，按需要筛选标签。
- 评论：`gh issue comment <编号> --repo QMinitaitan/my-blog --body-file <文件>`。
- 标签：`gh issue edit <编号> --repo QMinitaitan/my-blog --add-label <标签>` 或 `--remove-label <标签>`。
- 完成：完成验收后关闭对应 Issue，附上验证结果；关闭子任务不会自动关闭父规格。
- 父子关系：使用 GitHub 原生 sub-issues；当前 CLI 不支持时使用 API。不可用时在子任务正文标明 `Part of #<父编号>`，在父条目维护任务列表。
- 依赖关系：优先使用 GitHub 原生 issue dependencies。API 为 `POST repos/QMinitaitan/my-blog/issues/<被阻塞编号>/dependencies/blocked_by`，参数 `issue_id` 是阻塞 Issue 的数据库 ID，通过 `gh api repos/QMinitaitan/my-blog/issues/<编号> --jq .id` 获取。不可用时在正文维护 `Blocked by: #<编号>`。
- 可执行任务：所有前置任务均关闭，且没有待解决的外部前提。标签映射见 `triage-labels.md`。
- wayfinder：总览使用 `wayfinder:map`，子任务使用 `wayfinder:research`、`wayfinder:prototype`、`wayfinder:grilling` 或 `wayfinder:task`，维护父子关系和依赖；领取任务时将自己设为 assignee。

## Pull requests as a triage surface

PRs as a request surface: no.

## 发布前提

核实 GitHub CLI、登录状态及目标仓库访问权限。缺失时说明具体阻碍，保留本地文档和草案。
