<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let notes = data?.notes || [];

	console.log(data);
</script>

<h1>Scrawl</h1>
<a href="/new">New note</a>

{#each notes as note}
	<p>{note.name}</p>
{/each}
