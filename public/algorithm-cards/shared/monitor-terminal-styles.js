export const monitorTerminalStyles = `
.monitor-terminal{margin:8px 28px 0;background:var(--codeblock-bg);border:1px solid #ffffff09;border-radius:8px;overflow:hidden;--ink:#d7dce5;--muted:#858a9a;color:var(--ink);font:12px/1.6 'JetBrains Mono Variable',ui-monospace,Consolas,monospace;outline:none}
.monitor-terminal:focus-visible{border-color:#bca7fa66}
.modern .monitor-terminal .terminal-head{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:30px;margin:0;padding:0;background:#08080d;border-bottom:1px solid #ffffff06;border-radius:0}
.monitor-terminal .terminal-brand{align-self:stretch;display:flex;align-items:center;padding:5px 14px;border-bottom:1px solid #bca7fa;color:#cbd0dc;font-size:11px}
.monitor-terminal .terminal-case-tools{display:flex;align-items:center;gap:8px;padding:3px 10px;min-width:0}
.modern .monitor-terminal #case-current{display:flex;align-items:center;gap:8px;border:0;background:transparent;color:#b9bccb;font-family:inherit;font-size:12px;line-height:1.5;padding:2px 4px;min-height:22px;border-radius:3px;cursor:pointer;min-width:0;text-align:left}
.monitor-terminal #case-current>span:last-child{overflow-wrap:anywhere}.monitor-terminal #case-current:hover{background:#ffffff08;color:#d8c8ff}.monitor-terminal #case-current:focus-visible{outline:1px solid #bca7fa;outline-offset:1px}
.monitor-terminal .case-count{color:#777e91;font-size:11px;white-space:nowrap}.monitor-terminal .case-shortcut{color:#8991a6;font-size:11px;white-space:nowrap}
.monitor-terminal .terminal-io{display:grid;gap:6px;padding:11px 14px 9px}.monitor-terminal .terminal-row{display:grid;grid-template-columns:27px minmax(0,1fr);gap:9px;align-items:baseline;min-width:0}
.monitor-terminal .console-marker{color:#bca7fa;user-select:none}.monitor-terminal .terminal-output-row .console-marker{color:#8aad9d}
.monitor-terminal #terminal-input{display:flex;flex-wrap:wrap;gap:4px 20px;min-width:0}.monitor-terminal .input-field{display:inline-flex;align-items:baseline;gap:6px;min-width:0;max-width:100%}.monitor-terminal .input-param{color:#8aadf4}.monitor-terminal .input-equals{color:#626b7d}
.monitor-terminal .input-field code,.monitor-terminal #terminal-output{background:none;font:inherit;white-space:normal;overflow-wrap:anywhere;min-width:0;padding:0;color:#c7cfdf}.monitor-terminal #terminal-output{color:#626b7f;max-height:160px;overflow:auto;scrollbar-width:thin;scrollbar-color:#ffffff20 transparent}.monitor-terminal.has-result #terminal-output{color:#a6da95}
.modern .monitor-terminal .workbench{margin:0!important;border-top:1px solid #ffffff06;border-radius:0!important;padding:8px 14px 7px!important;background:transparent}
.modern .monitor-terminal .workbench h4,.modern .monitor-terminal .shared-step{display:none!important}
.modern .monitor-terminal .work-vars{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px 20px;margin:0 0 4px}
.modern .monitor-terminal .work-var,.modern .monitor-terminal .work-var.changed{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:baseline;gap:6px;padding:1px 0;border:0;background:none;min-width:0}
.modern .monitor-terminal .work-var dt{font-size:11px;color:#8aadf4}.modern .monitor-terminal .work-var dt::before{content:none}.modern .monitor-terminal .work-var dt::after{content:'=';color:#657082}.modern .monitor-terminal .work-var dt small{display:none}
.modern .monitor-terminal .work-var dd{margin:0;text-align:left;font-size:11px;color:#f5a97f;overflow-wrap:anywhere;max-height:64px;overflow:auto;scrollbar-width:thin;min-width:0}.modern .monitor-terminal .work-var.unset dd{color:#657082}.modern .monitor-terminal .work-var.changed dd{color:#a6da95}.modern .monitor-terminal .map-entry{background:none;padding:0}.modern .monitor-terminal .map-entry b{color:#f5a97f}.modern .monitor-terminal .map-entry em{color:#657082}
.modern .monitor-terminal .metrics{padding-top:2px;font-size:10px;gap:20px;border:0}.modern .monitor-terminal .metric span{color:#939aa7}.modern .monitor-terminal .metric code{font-size:10px;color:#b9c0cc}
.monitor-terminal .terminal-announcement{position:absolute;width:1px;height:1px;clip-path:inset(50%);overflow:hidden;white-space:nowrap}
.reading-area.code-focused .monitor-terminal{visibility:hidden;pointer-events:none}
:host([article-level]) .monitor-terminal{margin-inline:0;margin-top:16px}
:host([article-level]) .modern .monitor-terminal .terminal-io{padding:12px 16px;gap:6px}
:host([article-level]) .modern .monitor-terminal .workbench{padding:10px 16px!important}
:host([article-level]) .modern .monitor-terminal .work-vars{row-gap:6px;margin-bottom:0}
:host([article-level]) .modern .monitor-terminal .metrics{padding-top:8px}
@media(max-width:760px){.monitor-terminal{margin-inline:20px}.monitor-terminal .terminal-brand{padding:4px 10px;font-size:10px}.monitor-terminal .terminal-case-tools{padding:3px 6px;gap:7px}.modern .monitor-terminal #case-current{font-size:11px;gap:4px;padding:2px}.monitor-terminal .case-count,.monitor-terminal .case-shortcut{font-size:10px}.monitor-terminal .terminal-io{padding:9px 10px;gap:5px}.monitor-terminal .terminal-row{font-size:11px;grid-template-columns:24px minmax(0,1fr);gap:6px}.monitor-terminal #terminal-input{column-gap:12px}.modern .monitor-terminal .workbench{padding:7px 10px!important}.modern .monitor-terminal .work-vars{grid-template-columns:repeat(2,minmax(0,1fr));gap:1px 14px}}
`;
