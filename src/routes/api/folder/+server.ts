import { getUserFromCookies } from '$lib/cookies';
import { createFolder } from '$lib/db';
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
