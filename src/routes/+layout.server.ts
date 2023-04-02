import { getNotes } from '$lib/db';
import { getUserFromCookies } from '$lib/cookies';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, cookies }) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		return {};
	}

	const notes = await getNotes(user.address, user.key);

	return {
		user: locals.user,
		notes: notes || []
	};
}) satisfies LayoutServerLoad;
