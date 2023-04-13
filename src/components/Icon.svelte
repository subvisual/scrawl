<script lang="ts">
	export let small = false;
	export let extraSmall = false;
	export let solid = false;
</script>

<span class="root" class:small class:solid class:extraSmall>
	<slot />
</span>

<style>
	.root {
		display: block;
		width: 20px;
		height: 20px;
		stroke-width: 2px;
	}
	.small {
		width: 16px;
		height: 16px;
		stroke-width: 1.5px;
	}
	.extraSmall {
		width: 14px;
		height: 14px;
		stroke-width: 1.5px;
	}
	:global(.solid svg) {
		fill: currentColor;
	}
</style>
