<script lang="ts">
	import { goto } from '$app/navigation';
	import { api } from '$lib/api';
	import { onMount } from 'svelte';

	onMount(async () => {
		const note = await api.post<{ id: string }>('/api/note', {
			method: 'post'
		});

		if (note?.id) {
			goto(`/${note.id}`);
		}
	});
</script>

<div>
	<h1>New note</h1>
	<p>loading...</p>
</div>
