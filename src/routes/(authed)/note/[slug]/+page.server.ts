import { getUserFromCookies } from '$lib/cookies';
import { getNote, updateNote } from '$lib/db';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({
	params,
	url,
	cookies,
	depends
}) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		throw redirect(302, '/');
	}

	const data = await getNote(user, params.slug);
	const note = data?.[0] as NoteType;

	depends(`note:${params.slug}`);

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
