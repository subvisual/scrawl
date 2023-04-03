<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let notes = data?.notes || [];
</script>

<h1>Scrawl</h1>
<a href="/new">New note</a>

<div>
	{#each notes as note}
		<p>
			<a href="/{note.slug}">{note.name}</a>
		</p>
	{/each}
</div>
