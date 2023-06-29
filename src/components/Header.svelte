<script>
	import { page } from '$app/stores';
	import { routes } from '$lib/routes';
	import { editStore } from '$lib/stores/edit';
	import sidebarStore from '$lib/stores/sidebar';
	import tabsStore from '$lib/stores/tabs';
	import NoteTab from './NoteTab.svelte';
	import ViewSwitcher from './ViewSwitcher.svelte';

	$: noteRoute =
		$page.url.pathname.includes('/note/') &&
		$page.url.pathname !== routes.newNote;
</script>

<div class="w-full bg-surface-700 flex justify-between min-h-[48px]">
	{#if noteRoute}
		<div
			class="tabs relative flex self-end"
			class:tabs-expanded={$sidebarStore.open}
		>
			{#each $tabsStore.notes as note, index (note.id)}
				<NoteTab {note} {index} />
			{/each}
		</div>
		{#if $editStore.usingLocalStorageVersion}
			<div class="ml-auto self-center">
				<span class="chip variant-ghost-secondary">
					Using local version of note
				</span>
			</div>
		{/if}
		<div class="px-4 py-2">
			<ViewSwitcher />
		</div>
	{/if}
</div>

<style>
	.tabs {
		margin-left: 53px;
		max-width: 80%;
		height: 2rem;
		width: 100%;
		overflow: hidden;
	}
	.tabs-expanded {
		margin-left: var(--sidebar-width);
	}
</style>
