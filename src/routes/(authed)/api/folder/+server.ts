import { getUserFromCookies } from '$lib/cookies';
import { createFolder, deleteFolder } from '$lib/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request, cookies }) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		throw error(401, 'No user');
	}

	const data = await request.json();
	const folder = await createFolder(user, {
		name: data.name
	});

	if (!folder.data) {
		throw error(500, 'Failed to create folder');
	}

	return json({ id: folder.data[0].id });
}) satisfies RequestHandler;

export const DELETE = (async ({ url, cookies }) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		throw error(401, 'No user');
	}

	const id = url.searchParams.get('id');

	if (!id) {
		throw error(401, 'No id');
	}

	const update = await deleteFolder(id);

	return json(update);
}) satisfies RequestHandler;
