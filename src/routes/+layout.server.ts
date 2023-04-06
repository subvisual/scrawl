import { getFolders, getNotes } from '$lib/db';
import { getUserFromCookies } from '$lib/cookies';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, cookies, depends }) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		return {};
	}

	depends('notes:all');

	const notes = await getNotes(user);
	const folders = await getFolders(user) || [];

	return {
		user: locals.user,
		notes: notes || [],
		folders: folders || []
	};
}) satisfies LayoutServerLoad;
