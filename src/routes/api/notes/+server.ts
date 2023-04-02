import { getUserFromCookies } from '$lib/cookies';
import { getNotes } from '$lib/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import type { ServerResponse } from 'http';

export const GET = async ({ cookies }) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		throw error(403, 'no user');
	}

	const notes = await getNotes(user.address);

    console.log(notes.data)

	return json(notes.data);
};
