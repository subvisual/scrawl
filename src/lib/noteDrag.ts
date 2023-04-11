import { invalidate } from '$app/navigation';
import { api } from './api';

export async function updateNoteFolder(
	noteId: string,
	folderId: string | null
) {
	const req = await api.put('/api/note', {
		id: noteId,
		folder: folderId
	});

	if (req) {
		invalidate('notes:all');
	}
}

export function getDragData(
	event: DragEvent
): { id: string; folder: string } | null {
	const data = event.dataTransfer?.getData('text/plain');

	if (!data) {
		return null;
	}

	try {
		return JSON.parse(data);
	} catch {
		return null;
	}
}
