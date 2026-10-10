import test from 'node:test';
import assert from 'node:assert/strict';
import { mountMonitorTerminal } from '../public/algorithm-cards/shared/monitor-terminal.js';
class Node extends EventTarget {
  constructor(){super();this.value='0';this.classList={toggle(){}};this.attributes={};}
  setAttribute(name,value){this.attributes[name]=value;}
  querySelector(){return this.announcement;}
  focus(){}
}
function terminalFixture(){
  const nodes=Object.fromEntries(['case-current','example-select','terminal-input','terminal-output'].map(id=>[id,new Node()]));
  const terminal=new Node(),head=new Node();terminal.announcement=new Node();
  const host=new Node(), controller=new AbortController();
  const root={host,getElementById:id=>nodes[id],querySelector:selector=>selector==='.terminal-head'?head:terminal,append(){}};
  const previous=globalThis.document;globalThis.document={createElement:()=>new Node()};
  let selected=0;
  const view=mountMonitorTerminal(root,controller.signal,{examples:[{label:'第一例',nums:[2,7]},{label:'第二例',nums:[3,3]}],onSelect:index=>{selected=index;nodes['example-select'].value=String(index);}});
  globalThis.document=previous;
  return {nodes,head,host,view,controller,get selected(){return selected;}};
}
test('status requires one double click and leaves single clicks and Shift+Tab unchanged',()=>{
  const fixture=terminalFixture();
  fixture.nodes['case-current'].dispatchEvent(new Event('click'));
  assert.equal(fixture.selected,0);
  fixture.head.dispatchEvent(new Event('dblclick'));
  assert.equal(fixture.selected,1);
  fixture.head.dispatchEvent(new Event('dblclick'));
  assert.equal(fixture.selected,0);
  const tab=new Event('keydown',{cancelable:true});Object.assign(tab,{key:'Tab',shiftKey:true});
  fixture.host.dispatchEvent(tab);assert.equal(tab.defaultPrevented,false);assert.equal(fixture.selected,0);
  fixture.controller.abort();fixture.head.dispatchEvent(new Event('dblclick'));assert.equal(fixture.selected,0);
});
test('focused sample entry accepts Enter and space without repeated switches; output resets',()=>{
 const a=terminalFixture(),b=terminalFixture();
 for(const key of ['Enter',' ']){const event=new Event('keydown',{cancelable:true});Object.assign(event,{key,repeat:false});a.nodes['case-current'].dispatchEvent(event);assert.equal(event.defaultPrevented,true);}
 assert.equal(a.selected,0);assert.equal(b.selected,0);
 const repeat=new Event('keydown',{cancelable:true});Object.assign(repeat,{key:'Enter',repeat:true});a.nodes['case-current'].dispatchEvent(repeat);assert.equal(a.selected,0);
 a.view.render({label:'第一例',nums:[2,7]},0,{answer:[0,1]},true);assert.equal(a.nodes['terminal-output'].textContent,'[0, 1]');
 a.view.render({label:'第二例',nums:[3,3]},1,{},false);assert.equal(a.nodes['terminal-output'].textContent,'...');assert.match(a.nodes['terminal-input'].innerHTML,/3, 3/);
});
