/* import { ExternalProvider } from '@ethersproject/providers'; */

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	interface Window {
		ethereum: any;
	}

	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				address: string;
				key: string;
			};
		}
		interface PageData {
			user?: {
				address: string;
				key: string;
			};
			notes: NoteType[];
			folders: FolderType[];
			note?: NoteType;
		}
		// interface Platform {}
	}
}

export {};
