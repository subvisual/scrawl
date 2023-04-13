<script lang="ts">
	import type { ComponentType, SvelteComponent } from 'svelte';
	import Icon from './Icon.svelte';

	export let text: string;
	export let key: string;
	export let icon: ComponentType | undefined = undefined;
	export let variant: string | 'primary' | 'secondary' | 'tertiary' | 'ghost';
	export let href = '';

	let el = href ? 'a' : 'button';

	let props =
		el === 'button'
			? {
					type: 'button'
			  }
			: {
					href
			  };
</script>

<svelte:element
	this={el}
	{...props}
	class="btn btn-sm {variant} sm flex gap-2"
	on:click
>
	{text}

	{#if icon}
		<p
			class="flex items-center gap-1 text-sm py-1 px-2 text-white bg-white/30 rounded-container-token unstyled leading-none"
		>
			<Icon extraSmall>
				<svelte:component this={icon} />
			</Icon>
			<span class="leading-none">{key}</span>
		</p>
	{/if}
</svelte:element>
