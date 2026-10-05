// Reusable native scroll area. Add .scroll-area to any scrollable surface;
// .code-scroll connects the existing code viewer without changing its DOM.
// The code viewer deliberately keeps default scroll chaining: once the code
// reaches its end the wheel must continue scrolling the article page, instead
// of trapping the reader inside the code box.
export const scrollAreaStyles = `<style>
.scroll-area,.modern .code-view .code-scroll {
 --scroll-thumb:#707386;
 --scroll-thumb-hover:color-mix(in oklch,var(--primary) 65%,#707386);
 overflow:auto;scrollbar-gutter:stable;
 scrollbar-width:thin;scrollbar-color:var(--scroll-thumb) transparent;
 color-scheme:dark;
}
.scroll-area{overscroll-behavior:contain}
.scroll-area:focus-visible,.modern .code-view .code-scroll:focus-visible {
 outline:2px solid color-mix(in oklch,var(--primary) 60%,transparent);
 outline-offset:-2px;
}
@supports selector(::-webkit-scrollbar) {
 .scroll-area,.modern .code-view .code-scroll {scrollbar-width:auto;scrollbar-color:auto}
 .scroll-area::-webkit-scrollbar,.modern .code-view .code-scroll::-webkit-scrollbar {width:12px;height:12px}
 .scroll-area::-webkit-scrollbar-track,.modern .code-view .code-scroll::-webkit-scrollbar-track {
  background:#ffffff04;border:3px solid transparent;background-clip:padding-box;border-radius:12px;
 }
 .scroll-area::-webkit-scrollbar-thumb,.modern .code-view .code-scroll::-webkit-scrollbar-thumb {
  background:var(--scroll-thumb);border:3px solid transparent;background-clip:padding-box;border-radius:12px;
 }
 .scroll-area::-webkit-scrollbar-thumb:hover,.modern .code-view .code-scroll::-webkit-scrollbar-thumb:hover {
  background-color:var(--scroll-thumb-hover);
 }
 .scroll-area::-webkit-scrollbar-thumb:active,.modern .code-view .code-scroll::-webkit-scrollbar-thumb:active {
  background-color:var(--primary);
 }
 .scroll-area::-webkit-scrollbar-corner,.modern .code-view .code-scroll::-webkit-scrollbar-corner {background:transparent}
}
@media(forced-colors:active) {
 .scroll-area,.modern .code-view .code-scroll {scrollbar-color:auto;scrollbar-width:auto}
}
</style>`;
