<script>
	import { page } from '$app/stores';
	import tabsStore from '$lib/stores/tabs';
	import NoteTab from './NoteTab.svelte';
	import ViewSwitcher from './ViewSwitcher.svelte';

	$: noteRoute = $page.url.pathname.includes('/note/');

	$: console.log($tabsStore.notes);
</script>

<div class="w-full bg-surface-700 flex">
	{#if noteRoute}
		<div class="tabs flex self-end">
			{#each $tabsStore.notes as note (note.id)}
				<NoteTab {note} />
				<!-- <p>{tab.name}</p> -->
			{/each}
		</div>
		<div class="px-4 py-2 ml-auto">
			<ViewSwitcher />
		</div>
	{/if}
</div>

<style>
	.tabs {
		margin-left: var(--sidebar-width);
	}
</style>
