import { getUserFromCookies } from '$lib/cookies';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const user = getUserFromCookies(event.cookies);

	if (event.url.pathname.startsWith('/api/')) {
		return resolve(event);
	}

	console.log(`HOOK for ${event.url.pathname}, has user? ${!!user}`);

	if (user) {
		event.locals.user = user;
	}

	if (!user && event.url.pathname !== '/log-in') {
		throw redirect(302, '/log-in');
	}

	if (user && event.url.pathname === '/log-in') {
		throw redirect(302, '/');
	}

	return resolve(event);
}) satisfies Handle;
