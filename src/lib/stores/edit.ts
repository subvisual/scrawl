import { goto, invalidate } from '$app/navigation';
import { api } from '$lib/api';
import { get, writable } from 'svelte/store';
import { unsaved } from './unsaved';
import { modalStore } from '@skeletonlabs/skeleton';
import { routes } from '$lib/routes';
import keybinderStore from './keybinder';
import type { BeforeNavigate } from '@sveltejs/kit';

type EditStore = {
	original: Partial<NoteType>;
	local: Partial<NoteType>;
	id: string;
	ready: boolean;
	onReset: (() => void)[];
	usingLocalStorageVersion: boolean;
};

const store = writable<EditStore>({
	id: '',
	ready: false,
	original: {
		content: '',
		name: '',
		slug: ''
	},
	local: {
		content: '',
		name: '',
		slug: ''
	},
	onReset: [],
	usingLocalStorageVersion: false
});

function createEditStore() {
	function resetState(note: Partial<NoteType>) {
		let local = { ...note };
		let usingLocal = false;
		const stored = localStorage.getItem(`note-${note.id}`);

		if (stored) {
			// TODO: compare DB note updated_at with stored timestamp
			local = JSON.parse(stored)?.local || local;
			usingLocal = true;
		}

		store.update((state) => ({
			...state,
			original: { ...note },
			local,
			id: note.id || '',
			ready: true,
			usingLocalStorageVersion: usingLocal
		}));

		emitReset();
	}

	function onReset(fn: () => void) {
		store.update((store) => ({
			...store,
			onReset: [...store.onReset, fn]
		}));
	}

	function emitReset() {
		get(store).onReset.forEach((fn) => fn());
	}

	async function saveChanges() {
		const data = get(store);
		const hasChanges = get(unsaved);

		if (!hasChanges) return;

		const op = await api.put<{ id: string; slug: string }>('/api/note', {
			id: data.local.id,
			...data.local
		});

		if (!op) {
			// handle error
			return;
		}

		console.log(data);

		await invalidate(`note:${data.local.slug}`);

		localStorage.removeItem(`note-${data.id}`);

		if (data.local.slug && data.local.slug !== data.original.slug) {
			await invalidate('notes:all');

			goto(routes.note(data.local.slug), {
				replaceState: true
			});
			console.log('slug change');
		} else if (data.local.name !== data.original.name) {
			await invalidate('notes:all');
		}

		resetState({
			...data.original,
			...data.local
		});
	}

	function handleBeforeNav(state: BeforeNavigate) {
		if (state.to?.url.pathname.includes('note') && get(unsaved)) {
			const st = get(store);

			localStorage.setItem(
				`note-${st.id}`,
				JSON.stringify({
					local: st.local,
					timestamp: Date.now()
				})
			);
		}
	}

	function setup() {
		keybinderStore.listen({
			signature: {
				key: 'k',
				ctrlOrMeta: true
			},
			route: '/note/:slug',
			action: () =>
				modalStore.trigger({
					type: 'component',
					component: 'NoteQuickActions'
				})
		});

		keybinderStore.listen({
			signature: {
				key: 's',
				ctrlOrMeta: true
			},
			route: '/note/:slug',
			action: saveChanges
		});
	}

	return {
		subscribe: store.subscribe,
		set: store.set,
		update: store.update,
		resetState,
		setup,
		saveChanges,
		onReset,
		handleBeforeNav
	};
}

export const editStore = createEditStore();
