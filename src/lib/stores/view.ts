import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { routes } from '$lib/routes';
import type { BeforeNavigate } from '@sveltejs/kit';
import { get, writable } from 'svelte/store';

const views = ['editor', 'preview', 'split'];

const store = writable<View>(undefined);

function createStore() {
	function setView(val: View) {
		store.set(val);

		const url = new URL(get(page).url);
		url.searchParams.set('view', val);

		goto(url, {
			noScroll: true,
			replaceState: true
		});
	}

	function setDefault() {
		const urlView = new URL(window.location.href).searchParams.get('view');

		if (!urlView || !views.includes(urlView)) {
			setView('split');
		}
	}

	function preserveView(state: BeforeNavigate) {
		if (state.to?.url.pathname === routes.home) {
			return;
		}

		const s = state.from?.url.searchParams.get('view') || 'split';

		state.to?.url.searchParams.set('view', s);
	}

	return {
		...store,
		setView,
		setDefault,
		preserveView
	};
}

const viewStore = createStore();

export default viewStore;
