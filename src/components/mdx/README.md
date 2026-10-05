# MDX 正文组件

fuwari-mdx.ts 导出 Badge、Steps/StepItem、Timeline/TimelineItem、TabGroup、Visualization、ProblemDivider 和算法卡片。

Astro 组件处理属性和插槽；TabGroup 是 Svelte 标签页，需要 client:load，labels 与直接子内容一一对应。Visualization 用 iframe 嵌入 /visualizations/ 下的独立动画，通过 firefly:ready/resize/theme 协议同步主题与高度。

Visualization 使用沙箱并检查消息来源，断开时清理事件与观察器。ProblemDivider 负责题间分隔，不承担卡片内部交互。

完整属性及示例见 docs/mdx-components.md。接口调整时同步文档和草稿预览；迁移协议保留兼容命名。
