<script>
	import { page } from '$app/stores';
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import SidebarFolder from './SidebarFolder.svelte';
	import NoteList from './NoteList.svelte';

	$: orphanNotes = $page.data.notes.filter((item) => !item.folder);
	$: foldersWithNotes = $page.data.folders.map((folder) => ({
		...folder,
		notes: $page.data.notes?.filter((note) => note.folder === folder.id)
	}));
</script>

<aside class="flex min-h-full w-[320px] bg-surface-800">
	<div class="sticky top-0 h-fit">
		<AppRail>
			<AppRailTile>N</AppRailTile>
		</AppRail>
	</div>
	<nav
		class="py-10 px-2 flex-1 flex flex-col gap-4 border-l border-surface-700"
	>
		{#each foldersWithNotes as folder}
			<SidebarFolder {folder} />
		{/each}
		<NoteList notes={orphanNotes} />
	</nav>
</aside>
