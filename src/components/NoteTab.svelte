<script lang="ts">
	import { routes } from '$lib/routes';
	import Icon from './Icon.svelte';
	import CloseIcon from './icons/CloseIcon.svelte';

	export let note: NoteType;
</script>

<div
	class="absolute h-8 w-60 -mt-8 py-1 px-4 bg-surface-900 z-20 root flex items-center justify-between"
>
	<p class="text-sm unstyled">{note.name}</p>
	<a href={routes.home} class="unstyled">
		<Icon small>
			<CloseIcon />
		</Icon>
	</a>
</div>

<style>
	.root {
		border-radius: 8px 8px 0 0;
	}
</style>
