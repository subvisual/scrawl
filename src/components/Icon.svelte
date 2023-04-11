<script lang="ts">
	export let small = false;
	export let solid = false;
</script>

<span class="root" class:small class:solid>
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
		stroke-width: 1px;
	}
	:global(.solid svg) {
		fill: currentColor;
	}
</style>
