<script lang="ts">
	// Your selected Skeleton theme:
	import '../style/theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	import { Modal, Toast } from '@skeletonlabs/skeleton';
	import { modalComponentRegistry } from '$components/Modals/registry';
	import { storePopup } from '@skeletonlabs/skeleton';
	import {
		computePosition,
		autoUpdate,
		flip,
		shift,
		offset,
		arrow
	} from '@floating-ui/dom';
	import { toastComponentRegistry } from '$components/Toasts/registry';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<svelte:head>
	<title>Scrawl</title>
</svelte:head>

<Modal components={modalComponentRegistry} />
<Toast
	components={toastComponentRegistry}
	position="bl"
	padding="py-2 px-4"
	background="variant-filled-primary"
	color="text-surface-900"
	buttonDismiss="btn-icon-sm"
	spacing="space-x-2"
/>
<slot />
