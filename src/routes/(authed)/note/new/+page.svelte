<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { api } from '$lib/api';
	import { routes } from '$lib/routes';
	import { onMount } from 'svelte';

	onMount(async () => {
		const note = await api.post<{ id: string; slug: string }>('/api/note', {
			method: 'post'
		});

		if (note?.id) {
			await invalidate('notes:all');
			goto(routes.note(note.slug));
		}
	});
</script>

<div>
	<h1>New note</h1>
	<p>loading...</p>
</div>
