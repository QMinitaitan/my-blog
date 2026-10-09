import { monitorTerminalStyles } from './monitor-terminal-styles.js';

const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');

/** Bounded previews retain explicit omission markers; empty values remain real values. */
export function terminalValue(value, depth = 0) {
  if (value === undefined) return '...';
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (depth >= 5) return '…（省略嵌套内容）';
  if (Array.isArray(value)) {
    const shown = value.length > 8 ? [...value.slice(0,6), ...value.slice(-2)] : value;
    const parts = shown.map(item => terminalValue(item, depth + 1));
    if (value.length > 8) parts.splice(6,0,`…（省略 ${value.length-8} 项）`);
    return `[${parts.join(', ')}]`;
  }
  const keys = Object.keys(value), shown = keys.slice(0,8);
  const parts = shown.map(key => `${JSON.stringify(key)}: ${terminalValue(value[key], depth + 1)}`);
  if (keys.length > shown.length) parts.push(`…（省略 ${keys.length-shown.length} 项）`);
  return `{${parts.join(', ')}}`;
}

export function terminalInputs(example) {
  return Object.entries(example).filter(([name]) => !['label','note'].includes(name));
}

export function monitorTerminalTemplate({time, space}) {
  return `<section class="monitor-terminal" tabindex="0" role="group" aria-label="执行终端">
<div class="terminal-head"><span class="terminal-brand">status</span><div class="terminal-case-tools"><button id="case-current" type="button"></button></div></div>
<select id="example-select" hidden aria-label="选择算法样本"></select>
<div class="terminal-io"><div class="terminal-row" aria-label="样本输入"><span class="console-marker" aria-hidden="true">&gt;&gt;&gt;</span><div id="terminal-input"></div></div><div class="terminal-row terminal-output-row" aria-label="算法输出"><span class="console-marker" aria-hidden="true">&lt;&lt;&lt;</span><code id="terminal-output" aria-label="尚未返回">...</code></div></div>
<p id="description" class="shared-step" hidden></p>
<div class="workbench" aria-label="变量监控"><h4 hidden>States</h4><dl class="work-vars" id="variables"></dl><div class="metrics"><div class="metric"><span>time</span><code>${escape(time)}</code></div><div class="metric"><span>space</span><code>${escape(space)}</code></div></div></div>
<span class="terminal-announcement" aria-live="polite"></span></section>`;
}

export function mountMonitorTerminal(root, signal, {examples, onSelect}) {
  const terminal = root.querySelector('.monitor-terminal');
  const $ = id => root.getElementById(id);
  const style = document.createElement('style'); style.textContent = monitorTerminalStyles; root.append(style);
  const listen = (node,type,callback) => node.addEventListener(type,callback,{signal});
  const next = () => onSelect((Number($('example-select').value)+1)%examples.length);
  listen(root.querySelector('.terminal-head'),'dblclick',next);
  listen($('case-current'),'keydown',event => {
    if (!['Enter',' '].includes(event.key)) return;
    event.preventDefault();
    if (!event.repeat) next();
  });
  listen(terminal,'click',event => {
    if(!event.composedPath().some(node=>node.matches?.('button,input,select,a'))) terminal.focus({preventScroll:true});
  });
  let sampleIndex = -1;
  return {
    render(example,index,step,finished) {
      if(sampleIndex!==index) {
        sampleIndex=index;
        $('case-current').innerHTML=`<span class="case-count">${String(index+1).padStart(2,'0')}/${String(examples.length).padStart(2,'0')}</span><span>${escape(example.label || '样本')}</span>`;
        $('case-current').setAttribute('aria-label',`${index+1}/${examples.length} ${example.label || '样本'}，双击状态栏或按 Enter、空格切换到下一个样本`);
        $('terminal-input').innerHTML=terminalInputs(example).map(([name,value])=>`<span class="input-field"><span class="input-param">${escape(name)}</span><span class="input-equals">=</span><code>${escape(terminalValue(value))}</code></span>`).join('');
        terminal.querySelector('.terminal-announcement').textContent=`已切换到${example.label || '样本'}，执行回到初始步骤。`;
      }
      const returned=finished && Object.hasOwn(step,'answer');
      $('terminal-output').textContent=returned?terminalValue(step.answer):'...';
      $('terminal-output').setAttribute('aria-label',returned?'返回值':'尚未返回');
      terminal.classList.toggle('has-result',returned);
    },
  };
}
