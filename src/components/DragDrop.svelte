<script lang="ts">
	import { getDragData, updateNoteFolder } from '$lib/noteDrag';

	export let folderId: string | null;

	let hovered = false;

	function handleDrop(event: DragEvent) {
		hovered = false;
		const note = getDragData(event);

		if (!note || note.folder === folderId) {
			return;
		}

		updateNoteFolder(note.id, folderId);
	}

	function handleDragEnter(event: DragEvent) {
		if (event.dataTransfer) {
			hovered = true;
			event.dataTransfer.dropEffect = 'none';
		}
	}

	function handleDragLeave() {
		hovered = false;
	}
</script>

<div
	on:dragover|preventDefault={() => false}
	on:dragenter={handleDragEnter}
	on:dragleave={handleDragLeave}
	on:drop={handleDrop}
	class="p-1 rounded"
	class:hovered
>
	<slot />
</div>

<style>
	.hovered {
		background: rgb(var(--color-surface-900));
	}
	:global(.hovered *) {
		pointer-events: none;
	}
</style>
