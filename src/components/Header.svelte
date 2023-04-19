<script>
	import { page } from '$app/stores';
	import NoteTab from './NoteTab.svelte';
	import ViewSwitcher from './ViewSwitcher.svelte';

	$: noteRoute = $page.url.pathname.includes('/note/');
</script>

<div class="w-full bg-surface-700 flex">
	{#if noteRoute}
		<div class="tabs self-end">
			<NoteTab />
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
