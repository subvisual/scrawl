<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;

    console.log(data)
</script>

<h1>Scrawl</h1>

{#each data.notes as note}
	<p>{note.name}</p>
{/each}
