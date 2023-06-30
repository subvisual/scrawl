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
	import { enhance } from '$app/forms';

	let showNewFolderForm = false;

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
		class="sidebar-nav min-h-full py-[2px] flex flex-col flex-1 border-l border-surface-700 overflow-hidden w-[290px]"
		class:hidden={!$sidebarStore.open}
	>
		<div class="flex-1">
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
		</div>
		<form action="/?/signOut" method="post" class="p-4 mt-auto" use:enhance>
			<button type="submit" class="text-secondary-500">Sign out</button>
		</form>
	</nav>
</section>
