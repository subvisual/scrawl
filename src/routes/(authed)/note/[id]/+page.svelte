<script lang="ts">
	import type { PageData } from './$types';
	import NoteTab from '$components/NoteTab.svelte';
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { editStore } from '$lib/stores/edit';
	import { unsaved } from '$lib/stores/unsaved';
	import Editor from '$components/Editor.svelte';
	import Preview from '$components/Preview.svelte';
	import FloatingActionBar from '$components/FloatingActionBar.svelte';
	import { page } from '$app/stores';
	import viewStore from '$lib/stores/view';
	import tabsStore from '$lib/stores/tabs';

	export let data: PageData;

	$: view = $viewStore || $page.url.searchParams.get('view') || 'split';

	afterNavigate(() => {
		if (data.note) {
			editStore.resetState(data.note);
		}
	});
	beforeNavigate((state) => {
		viewStore.preserveView(state);
		editStore.handleBeforeNav(state);
	});
	afterNavigate((state) => tabsStore.handleNav(state, data.note));
	onMount(() => {
		if (data.note) {
			editStore.resetState(data.note);
			unsaved.listen();
			tabsStore.saveAsTab(data.note);
		}
		if (browser) {
			editStore.setup();
			viewStore.init();
		}
	});
</script>

<svelte:head>
	<title>{data.note ? data.note.title : 'Note not found'}</title>
</svelte:head>

{#if data.notFound}
	<p>not found</p>
{:else if data?.note}
	<div class="relative h-full grid" class:grid-cols-2={view === 'split'}>
		<section class:hidden={view === 'preview'} class="w-full">
			<Editor note={data?.note} />
		</section>
		<section class:hidden={view === 'editor'} class="w-full">
			<Preview />
		</section>
	</div>

	<FloatingActionBar />
{/if}
