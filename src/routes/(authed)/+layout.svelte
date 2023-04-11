<script>
	import { AppShell } from '@skeletonlabs/skeleton';
	import Header from '$components/Header.svelte';
	import Sidebar from '$components/Sidebar.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Sidebar />
	</svelte:fragment>
	
	<svelte:fragment slot="pageHeader">Page Header</svelte:fragment>

	<slot />

	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>	
</AppShell>
