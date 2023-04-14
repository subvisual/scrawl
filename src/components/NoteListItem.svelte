<script lang="ts">
	import { page } from '$app/stores';
	import { routes } from '$lib/routes';

	export let note: NoteType;

	const path = routes.note(note.slug);

	function handleDragStart(event: DragEvent, note: NoteType) {
		event.dataTransfer?.setData(
			'text/plain',
			JSON.stringify({
				id: note.id,
				folder: note.folder || ''
			})
		);
	}
</script>

<a
	draggable="true"
	on:dragstart={(ev) => handleDragStart(ev, note)}
	href={path}
	class:active={$page.url.pathname === path}
	class="unstyled max-w-[200px] whitespace-nowrap text-ellipsis overflow-hidden text-surface-300 text-sm"
	title={note.name}
	data-sveltekit-keepfocus
>
	{note.name}
</a>

<style>
	.active {
		color: #fff;
	}
</style>
