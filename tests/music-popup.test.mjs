import test from 'node:test';
import assert from 'node:assert/strict';
import { mountMusicPopup } from '../src/components/music/music-popup.mjs';
class Surface extends EventTarget {dataset={};attributes={};focused=false;matches(){return this.focused;}setAttribute(name,value){this.attributes[name]=value;}}
test('pointer leave closes after clicking, keyboard focus keeps popup open',()=>{
 const host=new Surface(),trigger=new Surface(),document=new Surface();
 mountMusicPopup(host,trigger,document);
 host.dispatchEvent(new Event('mouseenter'));assert.equal(host.dataset.open,'true');
 host.focused=true;document.dispatchEvent(new Event('pointerdown'));host.dispatchEvent(new Event('mouseleave'));assert.equal(host.dataset.open,'false');
 document.dispatchEvent(new Event('keydown'));host.dispatchEvent(new Event('focusin'));assert.equal(host.dataset.open,'true');
 host.dispatchEvent(new Event('mouseleave'));assert.equal(host.dataset.open,'true');
});
test('touch can open the popup and an outside tap closes it',()=>{
 const host=new Surface(),trigger=new Surface(),document=new Surface();host.contains=target=>target===host;
 mountMusicPopup(host,trigger,document);
 const inside=new Event('pointerdown');Object.defineProperties(inside,{pointerType:{value:'touch'},target:{value:host}});document.dispatchEvent(inside);assert.equal(host.dataset.open,'true');
 const outside=new Event('pointerdown');Object.defineProperty(outside,'pointerType',{value:'touch'});document.dispatchEvent(outside);assert.equal(host.dataset.open,'false');
});
