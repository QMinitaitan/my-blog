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
