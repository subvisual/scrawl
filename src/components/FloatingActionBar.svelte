<script lang="ts">
	import CmdIcon from './icons/CmdIcon.svelte';
	import ButtonWithKey from './ButtonWithKey.svelte';
	import { editStore } from '$lib/stores/edit';
</script>

<div
	class="fixed right-8 bottom-4 m-auto bg-surface-700 shadow-xl w-fit rounded-container-token px-4 py-4 flex items-stretch justify-center gap-4"
>
	<ButtonWithKey
		text="Save"
		key="S"
		icon={CmdIcon}
		variant="variant-ghost-secondary"
		on:click={editStore.saveChanges}
	/>
	<ButtonWithKey
		text="Options"
		key="K"
		icon={CmdIcon}
		variant="variant-soft-secondary"
	/>
</div>
