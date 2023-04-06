<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Folder {data?.name}</h1>

{#each $page.data.notes || [] as note}
	<p>
		<a href={`/${note.slug}`}>
			{note.name}
		</a>
	</p>
{/each}
