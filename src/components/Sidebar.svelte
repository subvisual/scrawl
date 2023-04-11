<script lang="ts">
	import { page } from '$app/stores';
	import { Accordion } from '@skeletonlabs/skeleton';
	import SidebarFolder from './SidebarFolder.svelte';
	import SidebarActions from './SidebarActions.svelte';
	import FolderForm from './FolderForm.svelte';
	import NoteListItem from './NoteListItem.svelte';
	import DragDrop from './DragDrop.svelte';
	import { routes } from '$lib/routes';

	let isOpen = true;
	let showNewFolderForm = false;

	$: orphanNotes = $page.data.notes.filter((item) => !item.folder);
	$: foldersWithNotes = $page.data.folders.map((folder) => ({
		...folder,
		notes: $page.data.notes?.filter((note) => note.folder === folder.id)
	}));
	$: activeFolder = $page.data.notes.find(
		(item) => routes.note(item.slug) === $page.url.pathname
	)?.folder;

	const toggleFolderForm = () => (showNewFolderForm = !showNewFolderForm);
</script>

<aside class="flex min-h-full bg-surface-800">
	<SidebarActions
		toggle={() => (isOpen = !isOpen)}
		onNewFolder={toggleFolderForm}
	/>
	<nav
		class="py-10 flex-1 border-l border-surface-700 overflow-hidden transition-all w-[320px]"
		style="max-width: {isOpen ? '300px' : '0'}"
	>
		{#if showNewFolderForm}
			<FolderForm {toggleFolderForm} />
		{/if}

		<Accordion>
			{#each foldersWithNotes as folder (folder.id)}
				<SidebarFolder {folder} active={folder.id === activeFolder} />
			{/each}
		</Accordion>

		<DragDrop folderId={null}>
			<div class="flex flex-col gap-4 p-3">
				{#each orphanNotes as note (note.id)}
					<NoteListItem {note} />
				{/each}
			</div>
		</DragDrop>
	</nav>
</aside>
