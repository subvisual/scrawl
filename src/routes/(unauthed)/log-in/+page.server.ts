import { saveUser } from '$lib/cookies';
import { encrypt } from '$lib/crypto';
import { getUser } from '$lib/db';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	signIn: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const key = data.get('key') as string;
		const hashedKey = encrypt(key, '123456');

		const user = await getUser({ username, key: hashedKey });

		if (user.data?.length === 0) {
			return {
				error: true,
				message: 'User not found',
				status: 404
			};
		}

		saveUser(cookies, {
			username,
			key
		});

		throw redirect(303, '/');
	}
};
