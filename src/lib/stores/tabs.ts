import { routes } from '$lib/routes';
import type { AfterNavigate, BeforeNavigate } from '@sveltejs/kit';
import { writable } from 'svelte/store';

type Store = {
	notes: { id: string; slug: string; name: string }[];
};

const store = writable<Store>({
	notes: []
});

function createStore() {
	let saved: string[] = [];

	function handleNav(state: AfterNavigate, note: NoteType | undefined) {
		console.log(state);
        console.log(note?.name);

		if (state.to?.url.pathname.includes('/note/') && note) {
			saveAsTab(note);
		}
	}

	function saveAsTab(note: NoteType) {
		if (saved.includes(note.id)) return;

		store.update((state) => ({
			notes: [
				...state.notes,
				{
					id: note.id,
					name: note.name,
					slug: note.slug
				}
			]
		}));

		saved.push(note.id);
	}

	function closeTab(id: string) {
		store.update((state) => ({
			notes: state.notes.filter((item) => item.id !== id)
		}));

		saved = saved.filter((val) => val !== id);
	}

	return {
		...store,
		saveAsTab,
		handleNav,
		closeTab
	};
}

const tabsStore = createStore();

export default tabsStore;
