import test from 'node:test';
import assert from 'node:assert/strict';
import { mountProblemDivider } from '../public/algorithm-cards/shared/problem-divider.js';
class Element extends EventTarget{
 constructor(kind){super();this.kind=kind;this.attributes=new Map();}
 matches(selector){return this.kind===selector;}
 setAttribute(name,value){this.attributes.set(name,String(value));}
 removeAttribute(name){this.attributes.delete(name);}
 getAttribute(name){return this.attributes.get(name)??null;}
}
test('divider only collapses its preceding card while open, and releases listeners on disposal',()=>{
 const card=new Element('algorithm-card'),script=new Element('script'),divider=new Element('.problem-divider');card.nextElementSibling=script;script.nextElementSibling=divider;
 let collapsed=0;const controller=new AbortController();const binding=mountProblemDivider(card,controller.signal,()=>collapsed++);
 binding.setOpen(true);assert.equal(divider.getAttribute('role'),'button');assert.equal(divider.getAttribute('tabindex'),'0');
 divider.dispatchEvent(new Event('click'));assert.equal(collapsed,1);
 for(const key of ['Enter',' ']){const event=new Event('keydown',{cancelable:true});Object.assign(event,{key});divider.dispatchEvent(event);assert.equal(event.defaultPrevented,true);}assert.equal(collapsed,3);
 binding.setOpen(false);divider.dispatchEvent(new Event('click'));assert.equal(collapsed,3);assert.equal(divider.getAttribute('role'),'separator');assert.equal(divider.getAttribute('tabindex'),null);
 binding.setOpen(true);controller.abort();divider.dispatchEvent(new Event('click'));assert.equal(collapsed,3);assert.equal(divider.getAttribute('role'),'separator');
});
test('two cards keep independent dividers and never claim a divider beyond another card',()=>{
 const a=new Element('algorithm-card'),b=new Element('algorithm-card'),lineA=new Element('.problem-divider'),lineB=new Element('.problem-divider');a.nextElementSibling=lineA;b.nextElementSibling=lineB;
 const controller=new AbortController();let countA=0,countB=0;const first=mountProblemDivider(a,controller.signal,()=>countA++),second=mountProblemDivider(b,controller.signal,()=>countB++);first.setOpen(true);second.setOpen(true);
 lineB.dispatchEvent(new Event('click'));assert.equal(countA,0);assert.equal(countB,1);first.setOpen(false);assert.equal(lineB.getAttribute('role'),'button');
 const missing=new Element('algorithm-card');missing.nextElementSibling=b;const unowned=mountProblemDivider(missing,controller.signal,()=>countA++);unowned.setOpen(true);lineB.dispatchEvent(new Event('click'));assert.equal(countA,0);assert.equal(countB,2);
 const repeat=new Event('keydown',{cancelable:true});Object.assign(repeat,{key:' ',repeat:true});lineB.dispatchEvent(repeat);assert.equal(countB,2);
});
