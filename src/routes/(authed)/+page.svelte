<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ButtonWithKey from '$components/ButtonWithKey.svelte';
	import CmdIcon from '$components/icons/CmdIcon.svelte';
	import { routes } from '$lib/routes';
	import keybinderStore from '$lib/stores/keybinder';
	import sidebarStore from '$lib/stores/sidebar';
	import { modalStore } from '@skeletonlabs/skeleton';

	function openSearchModal() {
		modalStore.trigger({
			type: 'component',
			component: 'RootQuickActions'
		});
	}

	keybinderStore.listen({
		signature: {
			key: 'k',
			ctrlOrMeta: true
		},
		route: '/',
		action: openSearchModal
	});

	keybinderStore.listen({
		signature: {
			key: 'n'
		},
		route: '/',
		action: () => {
			//goto(routes.newNote);
			console.log('NEW');
		}
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
