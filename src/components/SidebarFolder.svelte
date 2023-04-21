<script lang="ts">
	import {
		AccordionItem,
		modalStore,
		toastStore
	} from '@skeletonlabs/skeleton';
	import Icon from './Icon.svelte';
	import FolderIcon from './icons/FolderIcon.svelte';
	import NoteListItem from './NoteListItem.svelte';
	import DragDrop from './DragDrop.svelte';
	import TrashIcon from './icons/TrashIcon.svelte';
	import { api } from '$lib/api';
	import { invalidate } from '$app/navigation';

	export let folder: FolderType & { notes: NoteType[] };
	export let active: boolean;

	async function deleteFolder() {
		const req = await api.delete<number>(`/api/folder?id=${folder.id}`);

		if (req) {
			toastStore.trigger({
				message: 'Folder deleted'
			});

			await invalidate('notes:all');

			return;
		}

		toastStore.trigger({
			message: 'Somethng went wrong',
			background: 'variant-filled-error'
		});
	}

	function handleDelete() {
		modalStore.trigger({
			type: 'confirm',
			title: 'Are you sure?',
			body: 'The folder will be gone forever',
			response: (yes) => {
				if (yes) {
					deleteFolder();
				}
			}
		});
	}
</script>

<DragDrop folderId={folder.id} className="group">
	<AccordionItem open={active}>
		<svelte:fragment slot="summary">
			<span class="text-surface-200 text-sm unstyled" class:text-white={active}>
				{folder.name}
			</span>
		</svelte:fragment>
		<svelte:fragment slot="lead">
			<Icon small solid={active}>
				<FolderIcon />
			</Icon>
		</svelte:fragment>
		<svelte:fragment slot="content">
			{#if folder.notes.length}
				<div class="flex flex-col gap-4 px-2">
					{#each folder.notes as note}
						<NoteListItem {note} />
					{/each}
				</div>
			{:else}
				<span class="text-sm text-surface-300 px-4">No notes yet</span>
			{/if}
			<button
				type="button"
				on:click={handleDelete}
				class="flex gap-2 w-full items-center text-red-500 pl-2"
			>
				<Icon small>
					<TrashIcon />
				</Icon>
				<span class=" text-sm"> Delete folder </span>
			</button>
		</svelte:fragment>
	</AccordionItem>
</DragDrop>
