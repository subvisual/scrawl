import { getUserFromCookies } from '$lib/cookies';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const user = getUserFromCookies(event.cookies);

	if (event.url.pathname.startsWith('/api/')) {
		return resolve(event);
	}

	if (user) {
		event.locals.user = user;
	}

	if (!user && !['/log-in', '/sign-up'].includes(event.url.pathname)) {
		throw redirect(302, '/log-in');
	}

	if (user && ['/log-in', '/sign-up'].includes(event.url.pathname)) {
		throw redirect(302, '/');
	}

	return resolve(event);
}) satisfies Handle;
