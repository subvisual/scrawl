<script lang="ts">
	import { page } from '$app/stores';
	import { routes } from '$lib/routes';
	import { unsaved } from '$lib/stores/unsaved';
	import { modalStore } from '@skeletonlabs/skeleton';
	import Icon from './Icon.svelte';
	import CloseIcon from './icons/CloseIcon.svelte';
	import { goto } from '$app/navigation';

	export let note: Partial<NoteType>;

	function handleClick(event: MouseEvent) {
		if ($unsaved) {
			event.preventDefault();

			modalStore.trigger({
				type: 'confirm',
				title: 'Are you sure?',
				body: 'All unsaved changes will be lost',
				response: (yes) => {
					if (yes) goto(routes.home);
				}
			});
		}
	}
</script>

<div class="h-8 w-60 py-1 px-4 z-20 root flex items-center justify-between">
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
		background: var(--color-editor-bg);
	}
</style>
