<script lang="ts">
	import type { PageData } from './$types';
	import NoteTab from '$components/NoteTab.svelte';
	import NoteBody from '$components/NoteBody.svelte';
	import { afterNavigate } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { editStore } from '$lib/stores/edit';
	import { unsaved } from '$lib/stores/unsaved';

	export let data: PageData;

	afterNavigate(() => {
		if (data.note) {
			editStore.resetState(data.note);
		}
	});
	onMount(() => {
		if (data.note) {
			editStore.resetState(data.note);
			unsaved.listen();
		}
		if (browser) editStore.setup();
	});
	onDestroy(() => {
		if (browser) editStore.cleanUp();
	});
</script>

{#if data.notFound}
	<p>not found</p>
{:else if data?.note}
	<main>
		<NoteTab note={data.note} />
		<NoteBody />
	</main>
{/if}
