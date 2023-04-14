import type { ModalComponent } from '@skeletonlabs/skeleton';
import NoteQuickActions from '../NoteQuickActions.svelte';
import RootQuickActions from '../RootQuickActions.svelte';

export const modalComponentRegistry: Record<string, ModalComponent> = {
	// Custom Modal 1
	NoteQuickActions: {
		// Pass a reference to your custom component
		ref: NoteQuickActions
		// Add the component properties as key/value pairs
	},
	RootQuickActions: {
		ref: RootQuickActions
	}
};
