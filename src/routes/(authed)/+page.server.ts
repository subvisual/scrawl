import { clearUser, getUserFromCookies } from '$lib/cookies';
import { createFolder } from '$lib/db';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	create_folder: async ({ cookies, request }) => {
		const user = getUserFromCookies(cookies);

		if (!user) {
			return {
				error: true,
				message: 'no user'
			};
		}

		const data = await request.formData();
		const title = data.get('name') as string;

		const folder = await createFolder(user, {
			title,
			user: user.username
		});

		if (!folder.data) {
			return {
				error: true,
				message: 'failed to create folder'
			};
		}

		return { success: true };
	},

	signOut: async ({ cookies }) => {
		clearUser(cookies);

		throw redirect(302, '/')
	}
};
