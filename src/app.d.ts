// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
}
import type { SvelteComponentTyped } from "svelte";

declare module 'simple-svelte-autocomplete' {
	export default class AutoComplete extends SvelteComponentTyped<{propertyName: string;}> {
		$$prop_def: any;
		$$events_def: any;
		$$slot_def: any;
	}
}
