import { getUserFromCookies } from '$lib/cookies';
import { getNote } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		throw redirect(302, '/');
	}

	const data = await getNote(user.address, user.key, params.id);
	const note = data?.[0];

	if (!note) {
		return {
			id: params.id,
			notFound: true
		};
	}

	return {
		id: params.id,
		note: {
			name: note.name,
			content: note.content
		}
	};
};
