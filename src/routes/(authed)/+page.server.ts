import { getUserFromCookies } from '$lib/cookies';
import { createFolder } from '$lib/db';
import type { Actions } from '@sveltejs/kit';

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
		const name = data.get('name') as string;

		const folder = await createFolder(user, {
			name,
			user: user.address
		});

		if (!folder.data) {
			return {
				error: true,
				message: 'failed to create folder'
			};
		}

		return { success: true };
	}
};
