<script lang="ts">
	import { AccordionItem } from '@skeletonlabs/skeleton';
	import Icon from './Icon.svelte';
	import FolderIcon from './icons/FolderIcon.svelte';
	import NoteListItem from './NoteListItem.svelte';
	import DragDrop from './DragDrop.svelte';

	export let folder: FolderType & { notes: NoteType[] };
	export let active: boolean;
</script>

<DragDrop folderId={folder.id}>
	<AccordionItem open={active}>
		<svelte:fragment slot="summary">
			<p class="text-surface-200 text-sm unstyled" class:text-white={active}>
				{folder.name}
			</p>
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
		</svelte:fragment>
	</AccordionItem>
</DragDrop>
