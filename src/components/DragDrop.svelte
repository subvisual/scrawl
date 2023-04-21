<script lang="ts">
	import { getDragData, updateNoteFolder } from '$lib/noteDrag';
	import { toastStore } from '@skeletonlabs/skeleton';

	export let folderId: string | null;
	export let className: string = '';

	let hovered = false;

	async function handleDrop(event: DragEvent) {
		hovered = false;
		const note = getDragData(event);

		if (!note || note.folder === folderId) {
			return;
		}

		const update = await updateNoteFolder(note.id, folderId);

		if (update) {
			toastStore.trigger({
				message: 'Folder updated'
			});

			return;
		}

		toastStore.trigger({
			message: 'Something went wrong',
			background: 'variant-filled-error'
		});
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
	class="p-1 rounded {className}"
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
