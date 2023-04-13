<script lang="ts">
	// Your selected Skeleton theme:
	import '../style/theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	import { Modal } from '@skeletonlabs/skeleton';
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

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Modal components={modalComponentRegistry} />
<slot />
