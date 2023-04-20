<script>
	import { page } from '$app/stores';
	import sidebarStore from '$lib/stores/sidebar';
	import tabsStore from '$lib/stores/tabs';
	import NoteTab from './NoteTab.svelte';
	import ViewSwitcher from './ViewSwitcher.svelte';

	$: noteRoute = $page.url.pathname.includes('/note/');
</script>

<div class="w-full bg-surface-700 flex">
	{#if noteRoute}
		<div
			class="tabs relative flex self-end"
			class:tabs-expanded={$sidebarStore.open}
		>
			{#each $tabsStore.notes as note, index (note.id)}
				<NoteTab {note} {index} />
			{/each}
		</div>
		<div class="px-4 py-2 ml-auto">
			<ViewSwitcher />
		</div>
	{/if}
</div>

<style>
	.tabs {
		margin-left: 53px;
		transition: margin 0.3s ease;
	}
	.tabs-expanded {
		margin-left: var(--sidebar-width);
	}
</style>
