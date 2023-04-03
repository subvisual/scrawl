import { getUserFromCookies } from '$lib/cookies';
import { createNote, updateNote } from '$lib/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { generateSlug } from 'random-word-slugs';

export const POST = (async ({ cookies }) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		throw error(401, 'No user');
	}

	const slug = generateSlug();
	const note = await createNote(user, { user: user.address, slug });

	if (!note.data) {
		throw error(500, 'Failed to create note');
	}

	return json({ id: note.data[0].id, slug });
}) satisfies RequestHandler;

export const PUT = (async ({ request, cookies }) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		throw error(401, 'No user');
	}

	const data = await request.json();

	const update = await updateNote(user, data.id, data);

	return json(update);
}) satisfies RequestHandler;
