<script lang="ts">
	import { routes } from '$lib/routes';
	import { unsaved } from '$lib/stores/unsaved';
	import { modalStore } from '@skeletonlabs/skeleton';
	import Icon from './Icon.svelte';
	import CloseIcon from './icons/CloseIcon.svelte';
	import { goto } from '$app/navigation';
	import { editStore } from '$lib/stores/edit';
	import tabsStore from '$lib/stores/tabs';
	import viewStore from '$lib/stores/view';

	export let note: Pick<NoteType, 'id' | 'name' | 'slug'>;
	export let index: number;

	function handleCloseActiveTab() {
		if ($tabsStore.notes.length > 1) {
			let nextTab = $tabsStore.notes.find((item) => item.id !== note.id);

			if (nextTab) {
				goto(nextTab.slug);
				tabsStore.closeTab(note.id);
			}
		}
	}

	function handleClick(event: MouseEvent) {
		if ($unsaved) {
			event.preventDefault();

			modalStore.trigger({
				type: 'confirm',
				title: 'Are you sure?',
				body: 'All unsaved changes will be lost',
				response: (yes) => {
					if (yes) {
						handleCloseActiveTab();
					}
				}
			});
		} else {
			handleCloseActiveTab();
		}
	}

	$: isActiveNote = note.id === $editStore.id;
</script>

<div
	class="absolute bottom-0 left-0 h-8 w-60 py-1 px-4 z-20 root flex items-center justify-between transition transition-all"
	class:active={isActiveNote && $viewStore !== 'preview'}
	class:active-preview={isActiveNote && $viewStore === 'preview'}
	style="transform: translateX({index * 240}px)"
>
	<svelte:element
		this={isActiveNote ? 'p' : 'a'}
		class="flex-1 unstyled"
		title={note.name}
		href={routes.note(note.slug)}
	>
		<p class="text-sm unstyled">{note.name}</p>
	</svelte:element>

	{#if isActiveNote}
		<div
			class="flex items-center justify-center h-3 w-3 rounded-full hover:bg-transparent"
			class:bg-white={$unsaved && isActiveNote}
		>
			{#if $tabsStore.notes.length > 1}
				<button type="button" on:click={handleClick}>
					<Icon extraSmall>
						<CloseIcon />
					</Icon>
				</button>
			{:else}
				<a href={routes.home} class="unstyled" on:click={handleClick}>
					<Icon extraSmall>
						<CloseIcon />
					</Icon>
				</a>
			{/if}
		</div>
	{:else}
		<button type="button" on:click={() => tabsStore.closeTab(note.id)}>
			<Icon extraSmall>
				<CloseIcon />
			</Icon>
		</button>
	{/if}
</div>

<style>
	.root {
		border-radius: 8px 8px 0 0;
	}
	.active-preview {
		background: rgb(var(--color-surface-900));
	}
	.active {
		background: var(--color-editor-bg);
	}
</style>
