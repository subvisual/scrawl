<script lang="ts">
	import { api } from '$lib/api';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ note } = data);

	let local = {
		name: data.note?.name || 'Untitled',
		content: data.note?.content || 'Nothing yet'
	};

	async function saveChanges() {
		const op = await api.put('/api/note', {
			id: data.id,
			...local
		});
	}
</script>

{#if data.notFound}
	<p>not found</p>
{:else if note}
	<h1 contenteditable="true" bind:textContent={local.name} />
	<div contenteditable="true" bind:textContent={local.content} />
	<button on:click={saveChanges}>Save</button>
{/if}
