import { getUserFromCookies } from '$lib/cookies';
import { getNote } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		throw redirect(302, '/');
	}

	const data = await getNote(user, params.slug);
	const note = data?.[0] as NoteType;

	if (!note) {
		return {
			slug: params.slug,
			notFound: true
		};
	}

	return {
		slug: params.slug,
		id: note.id,
		note
	};
};
