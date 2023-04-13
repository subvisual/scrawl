<script lang="ts">
	import CmdIcon from './icons/CmdIcon.svelte';
	import ButtonWithKey from './ButtonWithKey.svelte';
	import { routes } from '$lib/routes';
	import { editStore } from '$lib/stores/edit';
</script>

<div>
	<section class="relative py-12 px-8 max-w-5xl mx-auto">
		<div class="mb-8">
			<input
				type="text"
				class="text-4xl font-bold w-full edible"
				bind:value={$editStore.local.name}
			/>
		</div>
		<div>
			<textarea
				rows="30"
				class="w-full max-h-full edible"
				bind:value={$editStore.local.content}
			/>
		</div>

		<div
			class="absolute left-0 right-0 bottom-20 m-auto bg-surface-700 shadow-xl w-fit rounded-container-token px-4 py-4 flex items-stretch justify-center gap-4"
		>
			<ButtonWithKey
				text="Save"
				key="S"
				icon={CmdIcon}
				variant="variant-ghost-secondary"
				on:click={editStore.saveChanges}
			/>
			<ButtonWithKey
				text="New note"
				key="N"
				variant="variant-soft-secondary"
				href={routes.newNote}
			/>
			<ButtonWithKey
				text="Options"
				key="K"
				icon={CmdIcon}
				variant="variant-soft-secondary"
			/>
		</div>
	</section>

	<style>
		.edible:focus {
			outline: none;
		}
	</style>
</div>
