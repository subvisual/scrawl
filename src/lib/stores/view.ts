import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { get, writable } from 'svelte/store';

type Store = {
	view?: View;
};

const store = writable<Store>({
	view: undefined
});

function createStore() {
	function setView(val: View) {
		store.set({
			view: val
		});

		const url = new URL(get(page).url);
		url.searchParams.set('view', val);

		goto(url, {
			noScroll: true,
			replaceState: true
		});
	}

	return {
		...store,
		setView
	};
}

const viewStore = createStore();

export default viewStore;
