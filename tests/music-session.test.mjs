import test from 'node:test';
import assert from 'node:assert/strict';
import { MusicSession } from '../src/components/music/music-session.mjs';
class AudioBoundary extends EventTarget {
 paused=true; currentTime=0; duration=100;
 set src(value){this.source=new URL(value,'https://example.org').href;} get src(){return this.source||'';}
 load() {} pause(){this.paused=true;this.dispatchEvent(new Event('pause'));}
 async play(){this.paused=false;this.dispatchEvent(new Event('playing'));}
}
test('missing resource never reports playing',async()=>{
 const session=new MusicSession(new AudioBoundary(),[{name:'missing',url:''}]);
 await session.toggle(); assert.equal(session.state.status,'missing'); assert.equal(session.state.playing,false);
});
test('real playback events drive pause, resume, seek, song reset and failures',async()=>{
 const audio=new AudioBoundary();const session=new MusicSession(audio,[{url:'/one.wav'},{url:'/two.wav'}]);
 await session.toggle();assert.equal(session.state.playing,true);
 session.seek(42);await session.toggle();assert.equal(session.state.time,42);assert.equal(session.state.playing,false);
 await session.toggle();assert.equal(session.state.time,42);assert.equal(session.state.playing,true);
 await session.select(1);assert.equal(session.state.time,0);assert.equal(session.state.index,1);
 audio.dispatchEvent(new Event('error'));assert.equal(session.state.status,'error');assert.equal(session.state.playing,false);
 audio.pause();audio.play=async()=>{throw Error('blocked');};await session.toggle();assert.equal(session.state.status,'error');
});
test('selecting the current song resumes without restarting',async()=>{
 const audio=new AudioBoundary();const session=new MusicSession(audio,[{url:'/one.wav'}]);
 await session.toggle();session.seek(18);await session.select(0);assert.equal(session.state.time,18);
});

test('a superseded play rejection cannot overwrite the new song state',async()=>{
 const audio=new AudioBoundary();let reject;
 audio.play=()=>new Promise((_,r)=>reject=r);
 const session=new MusicSession(audio,[{url:'/one.wav'},{url:'/two.wav'}]);const pending=session.toggle();
 audio.play=AudioBoundary.prototype.play;await session.select(1);reject(Error('old request'));await pending;
 assert.equal(session.state.playing,true);assert.equal(session.state.index,1);
});
test('pending play stays stopped until the audio reports playback',async()=>{
 const audio=new AudioBoundary();let resolve;audio.play=()=>new Promise(r=>resolve=r);
 const session=new MusicSession(audio,[{url:'/one.wav'}]);const pending=session.toggle();
 assert.equal(session.state.playing,false);assert.equal(session.state.status,'loading');
 audio.paused=false;audio.dispatchEvent(new Event('playing'));resolve();await pending;assert.equal(session.state.playing,true);
 audio.paused=true;audio.dispatchEvent(new Event('ended'));assert.equal(session.state.playing,false);
});
