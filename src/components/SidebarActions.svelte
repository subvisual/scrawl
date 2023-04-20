<script lang="ts">
	import NoteIcon from './icons/NoteIcon.svelte';
	import FolderIcon from './icons/FolderIcon.svelte';
	import LayoutIcon from './icons/LayoutIcon.svelte';
	import Icon from './Icon.svelte';
	import { routes } from '$lib/routes';

	export let toggle: () => void;
	export let onNewFolder: () => void;
</script>

<div class="sticky flex flex-col top-0 h-fit bg-surface-800 text-surface-300">
	<button
		type="button"
		class="p-4 focus:bg-surface-900 focus:outline-none focus:text-white unstyled"
		on:click={toggle}
		title="Toggle sidebar (Ctrl + \)"
	>
		<Icon>
			<LayoutIcon />
		</Icon>
	</button>
	<a
		href={routes.newNote}
		title="New note"
		class="p-4 focus:bg-surface-900 focus:outline-none focus:text-white unstyled"
	>
		<Icon>
			<NoteIcon />
		</Icon>
	</a>
	<button
		type="button"
		title="New folder"
		class="p-4 focus:bg-surface-900 focus:outline-none focus:text-white unstyled"
		on:click={onNewFolder}
	>
		<Icon>
			<FolderIcon />
		</Icon>
	</button>
</div>
