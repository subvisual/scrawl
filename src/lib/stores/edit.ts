import { goto, invalidate } from '$app/navigation';
import { api } from '$lib/api';
import { get, writable } from 'svelte/store';
import { unsaved } from './unsaved';
import { modalStore } from '@skeletonlabs/skeleton';
import { routes } from '$lib/routes';

type EditStore = {
	original: Partial<NoteType>;
	local: Partial<NoteType>;
	id: string;
	ready: boolean;
	onReset: (() => void)[];
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
	onReset: []
});

function createEditStore() {
	function resetState(note: Partial<NoteType>) {
		store.update((state) => ({
			...state,
			original: { ...note },
			local: { ...note },
			id: note.id || '',
			ready: true
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

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 's' && (event.metaKey || event.ctrlKey)) {
			event.preventDefault();
			saveChanges();

			return;
		}

		if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
			modalStore.trigger({
				type: 'component',
				component: 'NoteQuickActions'
			});
		}
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

	function setup() {
		document.addEventListener('keydown', editStore.handleKeyDown);
	}

	function cleanUp() {
		document.removeEventListener('keydown', editStore.handleKeyDown);
	}

	return {
		subscribe: store.subscribe,
		set: store.set,
		update: store.update,
		resetState,
		handleKeyDown,
		setup,
		cleanUp,
		saveChanges,
		onReset
	};
}

export const editStore = createEditStore();
