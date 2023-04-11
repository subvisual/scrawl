<script lang="ts">
	import { page } from '$app/stores';

	export let notes: NoteType[];
</script>

<div class="flex flex-col gap-4 px-4">
	{#each notes as note}
		<a
			href="/{note.slug}"
			class:active={$page.url.pathname === `/${note.slug}`}
			class="unstyled max-w-[150px] whitespace-nowrap text-ellipsis overflow-hidden text-surface-300"
            title={note.name}
		>
			{note.name}
		</a>
	{/each}
</div>

<style>
	.active {
		color: #fff;
	}
</style>
