<script lang="ts">
	import type { PageData } from './$types';
	import NoteTab from '$components/NoteTab.svelte';
	import NoteBody from '$components/NoteBody.svelte';

	export let data: PageData;
</script>

{#if data.notFound}
	<p>not found</p>
{:else if data?.note}
	<main>
		<NoteTab note={data.note} />
		<NoteBody note={data.note} />
	</main>
{/if}
