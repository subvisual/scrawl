import { saveUser } from '$lib/cookies';
import { encrypt } from '$lib/crypto';
import { createUser } from '$lib/db';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	signUp: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const key = data.get('key') as string;
		const hashedKey = encrypt(key, import.meta.env.VITE_RC4_KEY);

		const user = await createUser({ username, key: hashedKey });

		console.log(user);

		if (user.error) {
			let message = 'Something went wrong';

			if (user.error.code === '23505') {
				message = 'That username is already taken';
			}

			return {
				status: user.status,
				error: true,
				message
			};
		}

		saveUser(cookies, {
			username,
			key
		});

		throw redirect(303, '/');
	}
};
