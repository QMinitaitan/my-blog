# 内容编译插件

remark 插件处理 Markdown/MDX 语法树：数学、指令、摘要与阅读时间；rehype 插件处理输出 HTML：提示框和 GitHub 卡片。expressive-code/language-badge.ts 扩展正文代码语言标记。

插件由 astro.config.mjs 登记，按顺序运行。它们属于构建期，不负责浏览器状态或按钮交互。

MDX 的组件内容未必进入普通 Markdown 文本统计；修改摘要和阅读时间需检查两种正文格式。旧 custom-copy-button 插件未登记且已由原生复制按钮替代，已清理。
