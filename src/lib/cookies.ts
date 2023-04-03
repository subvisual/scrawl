import type { Cookies } from '@sveltejs/kit';

export function getUserFromCookies(
	cookies: Cookies
): null | App.Locals['user'] {
	const user = cookies.get('user');

	if (!user) {
		return null;
	}

	return JSON.parse(user);
}

export async function saveUser(cookies: Cookies, user: any) {
	cookies.set('user', JSON.stringify(user), {
		path: '/',
		sameSite: 'strict',
		httpOnly: true
	});
}
