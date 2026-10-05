/// <reference types="svelte" />
// Match Firefly's barrel-export support for the standalone TypeScript checker.
declare module "*.astro" {
	import type { AstroComponentFactory } from "astro/runtime/server/index.js";
	const component: AstroComponentFactory;
	export default component;
}
