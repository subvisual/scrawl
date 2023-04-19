<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import EyeIcon from '$components/icons/EyeIcon.svelte';
	import ColumnsIcon from '$components/icons/ColumnsIcon.svelte';
	import EditIcon from '$components/icons/EditIcon.svelte';
	import { page } from '$app/stores';
	import viewStore from '$lib/stores/view';

	const views = ['editor', 'split', 'preview'] as const;
	const icons = {
		editor: EditIcon,
		split: ColumnsIcon,
		preview: EyeIcon
	};
</script>

<slot />
<div class="flex btn-group variant-ghost">
	{#each views as view}
		<button
			type="button"
			class:variant-filled-surface={$page.url.searchParams.get('view') === view}
			on:click={() => viewStore.setView(view)}
		>
			<Icon small>
				<svelte:component this={icons[view]} />
			</Icon>
		</button>
	{/each}
</div>
