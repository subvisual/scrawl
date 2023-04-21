<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { api } from '$lib/api';
	import { routes } from '$lib/routes';
	import { onMount } from 'svelte';

	onMount(async () => {
		const folderId = $page.url.searchParams.get('folder') || null;

		const note = await api.post<{ id: string; name: string }>('/api/note', {
			folder: folderId
		});

		if (note?.id) {
			await invalidate('notes:all');
			goto(routes.note(note.id));
		}
	});
</script>

<svelte:head>
	<title>New Note...</title>
</svelte:head>
<article class="p-4">
	<h3>Creating the note...</h3>
</article>
