import { writable } from 'svelte/store';

const sidebar = writable({
	open: true
});

function createStore() {
	function toggle() {
		sidebar.update((state) => ({
			open: !state.open
		}));
	}

	return {
		...sidebar,
		toggle
	};
}

const sidebarStore = createStore();

export default sidebarStore;
