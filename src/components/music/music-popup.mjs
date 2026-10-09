/** Pointer focus never pins a hovered popup; keyboard focus keeps it reachable. */
export function mountMusicPopup(host, trigger, document, onOpen = () => {}) {
 let hovered=false, keyboard=false;
 const update=()=>{
  const open=hovered || (keyboard && host.matches(':focus-within'));
  host.dataset.open=String(open);trigger.setAttribute('aria-expanded',String(open));
  if(open) onOpen();
 };
 document.addEventListener('keydown',()=>{keyboard=true;update();});
 document.addEventListener('pointerdown',()=>{keyboard=false;update();});
 host.addEventListener('mouseenter',()=>{hovered=true;update();});
 host.addEventListener('mouseleave',()=>{hovered=false;update();});
 host.addEventListener('focusin',update);
 host.addEventListener('focusout',()=>queueMicrotask(update));
 update();
}
