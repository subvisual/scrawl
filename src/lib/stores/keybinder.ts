import { get, writable } from 'svelte/store';

type KeySignature = {
	key: string;
	metaKey?: boolean;
	ctrlKey?: boolean;
	ctrlOrMeta?: boolean;
	altKey?: boolean;
};
type Action = () => void;
type ListenerOptions = {
	signature: KeySignature;
	action: Action;
	route?: string;
};

type Store = {
	bindings: Record<
		string,
		{
			action: Action;
			route?: string;
		}
	>;
};

const store = writable<Store>({ bindings: {} });

function createStore() {
	function genSigKey(val: KeySignature) {
		const ctrlOrMeta = val.ctrlOrMeta || val.ctrlKey || val.metaKey || false;

		return JSON.stringify({
			key: val.key,
			ctrlOrMeta,
			altKey: val.altKey || false
		});
	}

	function listen(options: ListenerOptions) {
		const key = genSigKey(options.signature);

		store.update((st) => ({
			...st,
			bindings: {
				...st.bindings,
				[key]: { action: options.action, route: options.route || '' }
			}
		}));
	}

	function matchRoute(route: string, path: string) {
		const regex = new RegExp(
			'^' + route.replace(/:[^\s/]+/g, '([^\\s/]+)') + '$'
		);
		const match = path.match(regex);

		return !!match;
	}

	function eventListener(event: KeyboardEvent) {
		const { key, metaKey, ctrlKey, altKey } = event;
		const evtKey = genSigKey({ ctrlKey, metaKey, key, altKey });
		const match = get(store).bindings?.[evtKey];

		if (match) {
			if (match.route && !matchRoute(match.route, window.location.pathname)) {
				return;
			}

			event.preventDefault();
			match.action();
		}
	}

	function init() {
		document.addEventListener('keydown', eventListener);
	}

	function cleanup() {
		store.update((st) => ({
			...st,
			bindings: {}
		}));

		document.removeEventListener('keydown', eventListener);
	}

	return {
		listen,
		init,
		cleanup
	};
}

const keybinderStore = createStore();

export default keybinderStore;
