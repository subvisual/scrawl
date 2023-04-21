<script>
	import { AppShell } from '@skeletonlabs/skeleton';
	import Header from '$components/Header.svelte';
	import Sidebar from '$components/Sidebar.svelte';
	import keybinderStore from '$lib/stores/keybinder';
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import sidebarStore from '$lib/stores/sidebar';

	if (browser) {
		keybinderStore.init();
	}

	keybinderStore.listen({
		signature: {
			key: 'Backslash',
			ctrlOrMeta: true
		},
		action: sidebarStore.toggle
	});

	onDestroy(() => {
		if (browser) {
			keybinderStore.cleanup();
		}
	});
</script>

<svelte:head>
	<title>Scrawl</title>
</svelte:head>
<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Sidebar />
	</svelte:fragment>

	<slot />
</AppShell>
