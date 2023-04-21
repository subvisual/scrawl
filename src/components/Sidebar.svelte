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
	<SidebarActions toggle={sidebarStore.toggle} onNewFolder={toggleFolderForm} />
	<nav
		class="py-10 flex-1 border-l border-surface-700 overflow-hidden sidebar max-w-[290px] w-[290px] opacity-1 visible"
		class:collapsed={!$sidebarStore.open}
		class:expanded={$sidebarStore.open}
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

<style>
	.sidebar {
		transition: max-width 0.3s ease;
	}

	@keyframes collapse {
		0% {
			opacity: 1;
			visibility: visible;
		}
		100% {
			opacity: 0;
			visibility: hidden;
		}
	}

	@keyframes expand {
		0% {
			opacity: 0;
			visibility: hidden;
		}
		100% {
			opacity: 1;
			visibility: visible;
		}
	}

	.collapsed {
		animation: collapse 0.3s ease forwards;
		max-width: 0;
	}

	.expanded {
		animation: expand 0.3s ease forwards;
		max-width: 290px;
	}
</style>
