<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import NoteList from './NoteList.svelte';

	export let folder: FolderType & { notes: NoteType[] };
</script>

<Accordion>
	<AccordionItem open>
		<svelte:fragment slot="summary">
			<p class="text-surface-200">
				{folder.name}
			</p>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<NoteList notes={folder.notes} />
		</svelte:fragment>
	</AccordionItem>
</Accordion>
