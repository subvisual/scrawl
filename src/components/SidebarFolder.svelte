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
	import NoteIcon from './icons/NoteIcon.svelte';
	import { routes } from '$lib/routes';

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
			<section class="border-l border-surface-600 pl-2">
				{#if folder.notes.length}
					<div class="flex flex-col gap-4 px-2">
						{#each folder.notes as note}
							<NoteListItem {note} />
						{/each}
					</div>
				{:else}
					<span class="text-sm text-surface-300 px-4">No notes yet</span>
				{/if}
				<a
					href={routes.newNote}
					class="unstyled flex justify-between gap-2 w-full items-center text-secondary-500 pl-2 mt-3"
				>
					<span class="text-sm"> Add a note </span>
					<Icon small>
						<NoteIcon />
					</Icon>
				</a>
				<button
					type="button"
					on:click={handleDelete}
					class="flex justify-between gap-2 w-full items-center text-red-500 pl-2 mt-3"
				>
					<span class="text-sm"> Delete folder </span>
					<Icon small>
						<TrashIcon />
					</Icon>
				</button>
			</section>
		</svelte:fragment>
	</AccordionItem>
</DragDrop>
