<script lang="ts">
	import { routes } from '$lib/routes';
	import { unsaved } from '$lib/stores/unsaved';
	import Icon from './Icon.svelte';
	import CloseIcon from './icons/CloseIcon.svelte';

	export let note: NoteType;

	function handleClick(event: MouseEvent) {
		if ($unsaved) event.preventDefault();
	}
</script>

<div
	class="absolute h-8 w-60 -mt-8 py-1 px-4 bg-surface-900 z-20 root flex items-center justify-between"
>
	<p class="text-sm unstyled">{note.name}</p>

	<div
		class="flex items-center justify-center h-3 w-3 rounded-full hover:bg-transparent"
		class:bg-white={$unsaved}
	>
		<a href={routes.home} class="unstyled" on:click={handleClick}>
			<Icon extraSmall>
				<CloseIcon />
			</Icon>
		</a>
	</div>
</div>

<style>
	.root {
		border-radius: 8px 8px 0 0;
	}
</style>
