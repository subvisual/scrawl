<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { routes } from '$lib/routes';
	import { Autocomplete, modalStore } from '@skeletonlabs/skeleton';

	export let hiddenOnStart = false;

	let input = '';

	let files = $page.data.notes.map((note) => ({
		label: note.name,
		value: note.slug
	}));

	function onSelect(event: any): void {
		goto(routes.note(event.detail.value));
		modalStore.close();
	}
</script>

<div
	on:keydown={(e) => {
		if (input.length > 0) e.stopPropagation();
	}}
>
	<input
		class="input py-2 px-4 autocomplete"
		type="search"
		name="autocomplete-search"
		bind:value={input}
		placeholder="Search notes..."
	/>

	<div
		class="relative"
		style="visibility: {hiddenOnStart && input.length === 0
			? 'hidden'
			: 'visible'} "
	>
		<div class="absolute top-4 w-full bg-surface-700 p-4 rounded">
			<Autocomplete bind:input options={files} on:selection={onSelect} />
		</div>
	</div>
</div>
