<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import EyeIcon from '$components/icons/EyeIcon.svelte';
	import ColumnsIcon from '$components/icons/ColumnsIcon.svelte';
	import EditIcon from '$components/icons/EditIcon.svelte';
	import { page } from '$app/stores';
	import viewStore from '$lib/stores/view';

	const buttons = [
		{
			view: 'editor',
			icon: EditIcon,
			title: 'Editor view (Ctrl+Alt+E)'
		},
		{
			view: 'split',
			icon: ColumnsIcon,
			title: 'Split view (Ctrl+Alt+W)'
		},
		{
			view: 'preview',
			icon: EyeIcon,
			title: 'Preview (Ctrl+Alt+P)'
		}
	] as const;
</script>

<slot />
<div class="flex btn-group variant-ghost">
	{#each buttons as button (button.view)}
		<button
			type="button"
			class:variant-filled-surface={$page.url.searchParams.get('view') ===
				button.view}
			title={button.title}
			on:click={() => viewStore.setView(button.view)}
		>
			<Icon small>
				<svelte:component this={button.icon} />
			</Icon>
		</button>
	{/each}
</div>
