import { getUserFromCookies } from '$lib/cookies';
import { getFolder, getNote, updateNote } from '$lib/db';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		throw redirect(302, '/');
	}

	const data = await getFolder(user, params.slug);
	const folder = data?.[0];

	if (!folder) {
		return {
			notFound: true
		};
	}

	return {
		id: folder.id,
		name: folder.name,
		notes: folder.notes
	};

	/* 
	if (!folder) {
		return {
			slug: params.slug,
			notFound: true
		};
	}

	return {
		slug: params.slug,
        id: folder.id,
		 folder 
	}; */
};
