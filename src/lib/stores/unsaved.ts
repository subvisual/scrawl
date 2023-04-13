import { writable } from 'svelte/store';
import { editStore } from './edit';

const store = writable(false);

function createUnsavedStore() {
	function changed(original?: string, local?: string) {
		if (original === undefined || local === undefined) return false;

		return original !== local;
	}

	function hasChanges(original: Partial<NoteType>, local: Partial<NoteType>) {
		const keys = Object.keys(original) as (keyof NoteType)[];

		for (let i = 0; i < keys.length; i++) {
			const val = changed(original[keys[i]], local?.[keys[i]]);

			if (val) return true;
		}

		return false;
	}

	editStore.subscribe((edit) => {
		store.set(hasChanges(edit.original, edit.local));
	});

	return {
		...store
	};
}

export const unsaved = createUnsavedStore();
