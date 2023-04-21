<script lang="ts">
	import { page } from '$app/stores';
	import { Accordion } from '@skeletonlabs/skeleton';
	import SidebarFolder from './SidebarFolder.svelte';
	import SidebarActions from './SidebarActions.svelte';
	import FolderForm from './FolderForm.svelte';
	import NoteListItem from './NoteListItem.svelte';
	import DragDrop from './DragDrop.svelte';
	import { routes } from '$lib/routes';
	import sidebarStore from '$lib/stores/sidebar';

	let showNewFolderForm = false;
	let className = '';

	$: orphanNotes = $page.data.notes.filter((item) => !item.folder);
	$: foldersWithNotes = $page.data.folders.map((folder) => ({
		...folder,
		notes: $page.data.notes?.filter((note) => note.folder === folder.id)
	}));
	$: activeFolder = $page.data.notes.find(
		(item) => routes.note(item.id) === $page.url.pathname
	)?.folder;

	const toggleFolderForm = () => (showNewFolderForm = !showNewFolderForm);
</script>

<section class="flex min-h-full bg-surface-800">
	<SidebarActions toggle={sidebarStore.toggle} onNewFolder={toggleFolderForm} />
	<nav
		class="sidebar-nav min-h-full py-10 flex-1 border-l border-surface-700 overflow-hidden w-[290px]"
		class:hidden={!$sidebarStore.open}
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
</section>

<style>
	.sidebar {
		transition: max-width 0.3s ease;
	}
</style>
