import { getUserFromCookies } from '$lib/cookies';
import { getNote } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies, depends }) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		throw redirect(302, '/');
	}

	const data = await getNote(user, params.id);
	const note = data?.[0] as NoteType;

	depends(`note:${params.id}`);

	if (!note) {
		return {
			id: params.id,
			notFound: true
		};
	}

	return {
		id: note.id,
		note
	};
};
