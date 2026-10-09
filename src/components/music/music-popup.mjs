/** Pointer focus never pins a hovered popup; keyboard focus keeps it reachable. */
export function mountMusicPopup(host, trigger, document, onOpen = () => {}) {
 let hovered=false, keyboard=false, touchOpen=false;
 const update=()=>{
  const open=hovered || touchOpen || (keyboard && host.matches(':focus-within'));
  host.dataset.open=String(open);trigger.setAttribute('aria-expanded',String(open));
  if(open) onOpen();
 };
 document.addEventListener('keydown',()=>{keyboard=true;update();});
 document.addEventListener('pointerdown',event=>{keyboard=false;touchOpen=event.pointerType==='touch' && host.contains(event.target);update();});
 host.addEventListener('mouseenter',()=>{hovered=true;update();});
 host.addEventListener('mouseleave',()=>{hovered=false;update();});
 host.addEventListener('focusin',update);
 host.addEventListener('focusout',()=>queueMicrotask(update));
 update();
}
