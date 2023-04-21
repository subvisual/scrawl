import type { ModalComponent } from '@skeletonlabs/skeleton';
import InfoToast from './InfoToast.svelte';

export const toastComponentRegistry: Record<string, any> = {
	// Custom Modal 1
	Info: {
		// Pass a reference to your custom component
		ref: InfoToast
		// Add the component properties as key/value pairs
	}
};
