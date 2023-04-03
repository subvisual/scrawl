import { getUserFromCookies } from '$lib/cookies';
import { createNote, updateNote } from '$lib/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ cookies }) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		throw error(401, 'No user');
	}

	const note = await createNote({});

	if (!note.data) {
		throw error(500, 'Failed to create note');
	}

	return json({ id: note.data[0].id });
}) satisfies RequestHandler;

export const PUT = (async ({ request, cookies }) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		throw error(401, 'No user');
	}

	const data = await request.json();

	console.log(data);

	const update = await updateNote(data.id, user.key, data);

	return json(update);
}) satisfies RequestHandler;
