import { page } from '$app/stores';
import { routes } from '$lib/routes';
import type { BeforeNavigate } from '@sveltejs/kit';
import { get, writable } from 'svelte/store';
import keybinderStore from './keybinder';

const views = ['editor', 'preview', 'split'];

const store = writable<View>(undefined);

function createStore() {
	function setView(val: View) {
		store.set(val);

		const url = new URL(get(page).url);
		url.searchParams.set('view', val);

		window.history.replaceState('', '', url);
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

	function init() {
		setDefault();

		keybinderStore.listen({
			signature: {
				key: 'KeyE',
				ctrlKey: true,
				altKey: true
			},
			action: () => {
				setView('editor');
			},
			route: '/note/:id'
		});
		keybinderStore.listen({
			signature: {
				key: 'KeyW',
				ctrlKey: true,
				altKey: true
			},
			action: () => {
				setView('split');
			},
			route: '/note/:id'
		});
		keybinderStore.listen({
			signature: {
				key: 'KeyP',
				ctrlKey: true,
				altKey: true
			},
			action: () => {
				setView('preview');
			},
			route: '/note/:id'
		});
	}

	return {
		...store,
		init,
		setView,
		preserveView
	};
}

const viewStore = createStore();

export default viewStore;
