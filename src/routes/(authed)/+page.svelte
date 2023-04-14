<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import ButtonWithKey from '$components/ButtonWithKey.svelte';
	import CmdIcon from '$components/icons/CmdIcon.svelte';
	import { routes } from '$lib/routes';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { onDestroy, onMount } from 'svelte';

	function openSearchModal() {
		modalStore.trigger({
			type: 'component',
			component: 'RootQuickActions'
		});
	}

	function newNote() {
		goto(routes.newNote);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'k' && event.metaKey) {
			openSearchModal();
		}

		if (event.key === 'n') {
			newNote();
		}
	}

	onMount(() => {
		if (browser) document.addEventListener('keydown', handleKeyDown);
	});
	onDestroy(() => {
		if (browser) document.removeEventListener('keydown', handleKeyDown);
	});
</script>

<div class="flex h-full items-center">
	<div class="max-w-md ml-52 mb-52">
		<h2>Get started</h2>
		<div class="flex flex-col items-start gap-4 mt-8">
			<ButtonWithKey
				text="Search notes"
				key="K"
				icon={CmdIcon}
				variant="variant-soft-secondary"
				on:click={openSearchModal}
			/>
			<ButtonWithKey
				text="New note"
				key="N"
				variant="variant-soft-secondary"
				href={routes.newNote}
			/>
		</div>
	</div>
</div>
