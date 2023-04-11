<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { onMount } from 'svelte';

	export let toggleFolderForm: () => void;

	let input: HTMLInputElement;

	onMount(() => {
		input.focus();
	});

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			toggleFolderForm();
		}
	}
</script>

<form
	class="px-3"
	action="/?/create_folder"
	method="post"
	on:keydown={handleKeyDown}
	use:enhance={() => {
		return async ({ update }) => {
			await update();
			toggleFolderForm();
		};
	}}
>
	<input
		type="text"
		name="name"
		class="px-2 py-1 mt-1 text-sm outline outline-1 outline-surface-700 focus:outline-none ring-primary-500 focus:primary-500 focus:ring-1 focus:primary-500"
		placeholder="New folder"
		bind:this={input}
	/>
</form>
